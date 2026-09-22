"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function getCustomerDashboard() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Non authentifié" }
    }

    const userId = session.user.id

    // Fetch user profile info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return { success: false, error: "Utilisateur non trouvé" }
    }

    // Fetch all orders for this customer
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true,
                shop: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Fetch wishlist items
    const userWishlist = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        wishlist: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true,
            shop: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    // Calculate customer stats
    const totalSpent = orders.reduce((acc, order) => acc + order.total, 0)
    const points = Math.floor(totalSpent / 500) // 1 point per 500 FCFA spent

    let rank = "Bronze Ritualist"
    if (points > 1000) rank = "Gold Ritualist"
    else if (points > 300) rank = "Silver Ritualist"

    // Extract unique addresses from orders
    const addressMap = new Map<string, { address: string; city: string; phone: string; lastUsed: Date }>()
    orders.forEach((o) => {
      if (o.shippingAddress && o.city) {
        const key = `${o.shippingAddress}-${o.city}`.toLowerCase()
        if (!addressMap.has(key)) {
          addressMap.set(key, {
            address: o.shippingAddress,
            city: o.city,
            phone: o.phone || "",
            lastUsed: o.createdAt,
          })
        }
      }
    })
    const addresses = Array.from(addressMap.values())

    return {
      success: true,
      data: {
        user: {
          ...user,
          createdAtFormatted: new Date(user.createdAt).toLocaleDateString("fr-FR", {
            month: "short",
            year: "numeric",
          }),
        },
        stats: {
          totalOrders: orders.length,
          totalSpent,
          points,
          rank,
          artisanImpactFamilies: Math.max(1, Math.floor(orders.length * 2.5)),
        },
        orders: orders.map((order) => {
          const firstImage = order.items[0]?.product?.images?.[0] || "/images/placeholder.jpg"
          return {
            id: order.id,
            displayId: `#ORD-${order.id.slice(-6).toUpperCase()}`,
            date: new Date(order.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            status: order.status,
            paymentStatus: order.paymentStatus,
            paymentMethod: order.paymentMethod,
            total: order.total,
            shippingAddress: order.shippingAddress,
            city: order.city,
            phone: order.phone,
            itemCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
            firstImage,
            items: order.items.map((item) => ({
              id: item.id,
              name: item.product.name,
              price: item.price,
              quantity: item.quantity,
              image: item.product.images?.[0] || "/images/placeholder.jpg",
              shopName: item.product.shop?.name || "Artisan Moomel",
            })),
          }
        }),
        wishlist: userWishlist?.wishlist || [],
        addresses,
      },
    }
  } catch (error: any) {
    console.error("getCustomerDashboard error:", error)
    return { success: false, error: "Erreur lors du chargement de l'espace client" }
  }
}

const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
})

export async function updateCustomerProfile(name: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: "Non authentifié" }
    }

    const validated = UpdateProfileSchema.safeParse({ name })
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    })

    revalidatePath("/account")
    return { success: true, message: "Profil mis à jour avec succès" }
  } catch (error) {
    console.error("updateCustomerProfile error:", error)
    return { success: false, error: "Erreur lors de la mise à jour" }
  }
}
