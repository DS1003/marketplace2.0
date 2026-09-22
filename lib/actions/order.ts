"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { z } from "zod"
import { sendOrderConfirmationEmail } from "@/lib/actions/email"

const CreateOrderSchema = z.object({
  items: z.array(z.object({
    id: z.string().min(1, "Product ID required"),
    price: z.number().positive("Price must be positive"),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
  })).min(1, "At least one item required"),
  paymentMethod: z.enum(["CASH", "PAYDUNYA"]),
  shippingAddress: z.string().min(3, "Address too short"),
  city: z.string().min(2, "City required"),
  phone: z.string().min(7, "Phone number too short"),
})

export async function createOrder(props: z.infer<typeof CreateOrderSchema>) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    // 1. Validate input
    const validated = CreateOrderSchema.safeParse(props)
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message || "Invalid input" }
    }
    const { items, paymentMethod, shippingAddress, city, phone } = validated.data

    // 2. Fetch actual product data from DB to prevent price tampering
    const productIds = items.map(i => i.id)
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, status: "ACTIVE" },
      include: { shop: true }
    })

    if (dbProducts.length !== productIds.length) {
      const foundIds = new Set(dbProducts.map(p => p.id))
      const missing = productIds.filter(id => !foundIds.has(id))
      return { success: false, error: `Produit(s) introuvable(s) ou inactif(s): ${missing.join(", ")}` }
    }

    // 3. Verify stock availability
    for (const item of items) {
      const dbProduct = dbProducts.find(p => p.id === item.id)!
      if (dbProduct.stock < item.quantity) {
        return { 
          success: false, 
          error: `Stock insuffisant pour "${dbProduct.name}". Disponible: ${dbProduct.stock}, demandé: ${item.quantity}` 
        }
      }
    }

    // 4. Recalculate total server-side from DB prices (never trust client total)
    const subtotal = items.reduce((acc, item) => {
      const dbProduct = dbProducts.find(p => p.id === item.id)!
      return acc + dbProduct.price * item.quantity
    }, 0)
    const shipping = 2500 // Fixed shipping fee in FCFA
    const tax = Math.round(subtotal * 0.05)
    const serverTotal = subtotal + shipping + tax

    // 5. Create order and decrement stock in a single transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order with server-calculated total
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          total: serverTotal,
          paymentMethod,
          shippingAddress,
          city,
          phone,
          status: "PENDING",
          paymentStatus: "UNPAID",
          items: {
            create: items.map(item => {
              const dbProduct = dbProducts.find(p => p.id === item.id)!
              return {
                productId: item.id,
                quantity: item.quantity,
                price: dbProduct.price, // Use DB price, not client price
              }
            })
          }
        }
      })

      // Decrement stock for each product
      for (const item of items) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: { decrement: item.quantity }
          }
        })
      }

      return newOrder
    })

    // 6. Notify sellers (outside transaction for performance)
    const sellerMap = new Map<string, { total: number; shopName: string }>()
    for (const item of items) {
      const dbProduct = dbProducts.find(p => p.id === item.id)!
      const current = sellerMap.get(dbProduct.shop.ownerId) || { total: 0, shopName: dbProduct.shop.name }
      sellerMap.set(dbProduct.shop.ownerId, {
        total: current.total + (dbProduct.price * item.quantity),
        shopName: current.shopName
      })
    }

    for (const [ownerId, data] of Array.from(sellerMap.entries())) {
      await (prisma as any).notification.create({
        data: {
          userId: ownerId,
          title: "Nouvelle Commande !",
          message: `Vous avez reçu une nouvelle commande pour "${data.shopName}" d'un montant de ${data.total} FCFA.`,
          type: "SUCCESS"
        }
      })
    }

    // 7. Send rich order confirmation email to customer
    try {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { email: true, name: true }
      })

      if (user?.email) {
        const emailItems = items.map(item => {
          const dbProduct = dbProducts.find(p => p.id === item.id)!
          return {
            name: dbProduct.name,
            quantity: item.quantity,
            price: dbProduct.price,
            image: dbProduct.images?.[0] || "",
            shopName: dbProduct.shop?.name || "",
          }
        })

        await sendOrderConfirmationEmail({
          to: user.email,
          customerName: user.name || session.user.name || "Client Moomel",
          orderId: order.id,
          orderDate: new Date(order.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          shippingAddress: order.shippingAddress || shippingAddress,
          city: order.city || city,
          phone: order.phone || phone,
          items: emailItems,
          subtotal,
          shippingFee: shipping,
          taxFee: tax,
          total: serverTotal,
        })
      }
    } catch (emailErr) {
      console.error("Non-blocking order email error:", emailErr)
    }

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error("Order creation error:", error)
    return { success: false, error: "Internal server error during order creation" }
  }
}

export async function updateOrderPaymentStatus(orderId: string, status: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentStatus: status }
    })
    return { success: true }
  } catch (error) {
    console.error("Update payment status error:", error)
    return { success: false, error: "Failed to update payment status" }
  }
}
