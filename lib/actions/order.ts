"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

interface CreateOrderProps {
  items: { 
    id: string; // Product ID
    price: number; 
    quantity: number; 
  }[];
  total: number;
  paymentMethod: string; // CASH, PAYDUNYA
  shippingAddress: string;
  city: string;
  phone: string;
}

export async function createOrder(props: CreateOrderProps) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Authentication required" }
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total: props.total,
        paymentMethod: props.paymentMethod,
        shippingAddress: props.shippingAddress,
        city: props.city,
        phone: props.phone,
        status: "PENDING",
        paymentStatus: props.paymentMethod === "CASH" ? "UNPAID" : "UNPAID", // Both start as unpaid
        items: {
          create: props.items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    })

    // Notify sellers
    const productIds = props.items.map(i => i.id)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { shop: true }
    })

    const sellerMap = new Map<string, any>()
    products.forEach(p => {
      const item = props.items.find(i => i.id === p.id)
      if (item) {
        const current = sellerMap.get(p.shop.ownerId) || { total: 0, shopName: p.shop.name }
        sellerMap.set(p.shop.ownerId, {
          total: current.total + (item.price * item.quantity),
          shopName: current.shopName
        })
      }
    })

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
