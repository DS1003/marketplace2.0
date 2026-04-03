"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function getPendingShops() {
    const session = await auth()
    if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
        throw new Error("Unauthorized access to administrative rituals.")
    }

    return (prisma as any).shop.findMany({
        where: { status: "PENDING" },
        include: { owner: { select: { name: true, email: true, image: true } } },
        orderBy: { createdAt: 'desc' }
    })
}

export async function approveShop(shopId: string) {
    const session = await auth()
    if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
        throw new Error("Unauthorized")
    }

    const shop = await prisma.shop.findUnique({
        where: { id: shopId }
    })

    if (!shop) throw new Error("Boutique not found")

    // Upgrade shop and owner
    const updatedShop = await (prisma as any).shop.update({
        where: { id: shopId },
        data: { status: "APPROVED" }
    })

    await prisma.user.update({
        where: { id: shop.ownerId },
        data: { role: "SELLER" }
    })

    // Notify user
    await (prisma as any).notification.create({
        data: {
            userId: shop.ownerId,
            title: "Boutique Approuvée !",
            message: `Félicitations, votre demande pour "${shop.name}" a été acceptée. Vous avez maintenant accès au Seller Lab.`,
            type: "SUCCESS"
        }
    })

    // Simulate Email
    console.log(`[EMAIL SIMULATION] Sending Approval Email to ${shop.ownerId}... Subject: Votre boutique Moomel est prête !`)

    revalidatePath("/admin")
    revalidatePath("/seller")
    revalidatePath("/")
    
    return { success: true }
}

export async function rejectShop(shopId: string, reason: string) {
    const session = await auth()
    if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
        throw new Error("Unauthorized")
    }

    const shop = await prisma.shop.findUnique({
        where: { id: shopId }
    })

    if (!shop) throw new Error("Boutique not found")

    await (prisma as any).shop.update({
        where: { id: shopId },
        data: { status: "REJECTED" }
    })

    // Notify user
    await (prisma as any).notification.create({
        data: {
            userId: shop.ownerId,
            title: "Demande Refusée",
            message: `Votre demande pour "${shop.name}" a été déclinée. Motif : ${reason}`,
            type: "ERROR"
        }
    })

    // Simulate Email
    console.log(`[EMAIL SIMULATION] Sending Rejection Email to ${shop.ownerId}... Reason: ${reason}`)

    revalidatePath("/admin")
    
    return { success: true }
}

export async function getAllShops() {
  const session = await auth()
  if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
      throw new Error("Unauthorized")
  }

  return prisma.shop.findMany({
      include: { 
          owner: { select: { name: true, email: true, image: true } },
          _count: { select: { products: true } }
      },
      orderBy: { createdAt: 'desc' }
  })
}

export async function getDashboardStats() {
  const session = await auth()
  if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
      throw new Error("Unauthorized")
  }

  const [totalShops, totalProducts, totalOrders, totalUsers] = await Promise.all([
      prisma.shop.count(),
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count()
  ])

  // Revenue overview
  const orders = await prisma.order.findMany({
      where: { status: "DELIVERED" },
      select: { total: true }
  })
  const revenue = orders.reduce((acc, curr) => acc + curr.total, 0)
  const avgTicket = orders.length > 0 ? revenue / orders.length : 0

  const recentOrdersData = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
          user: { select: { name: true } }
      }
  })

  return {
      totalShops,
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: revenue,
      avgTicket,
      recentOrders: recentOrdersData.map((order: any) => ({
          id: order.id,
          user: order.user?.name || 'Unknown',
          createdAt: order.createdAt,
          total: order.total
      }))
  }
}

export async function getAllProducts() {
  const session = await auth()
  if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
      throw new Error("Unauthorized")
  }

  return prisma.product.findMany({
      include: { 
          shop: { select: { name: true } },
          category: true
      },
      orderBy: { createdAt: 'desc' }
  })
}

export async function getAllOrders() {
  const session = await auth()
  if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
      throw new Error("Unauthorized")
  }

  return prisma.order.findMany({
      include: {
          user: { select: { name: true, email: true } },
          items: {
              include: { product: true }
          }
      },
      orderBy: { createdAt: 'desc' }
  })
}

export async function getAllUsers() {
  const session = await auth()
  if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
      throw new Error("Unauthorized")
  }

  return prisma.user.findMany({
      select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          _count: {
              select: { orders: true }
          }
      },
      orderBy: { createdAt: 'desc' }
  })
}

export async function getShopById(id: string) {
    const session = await auth()
    if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
        throw new Error("Unauthorized")
    }

    return prisma.shop.findUnique({
        where: { id },
        include: {
            owner: true,
            products: {
                include: { category: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })
}

export async function toggleProductStatus(productId: string) {
    const session = await auth()
    if (!session || (session.user.role as string) !== "SUPER_ADMIN") {
        throw new Error("Unauthorized")
    }

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) throw new Error("Product not found")

    const newStatus = product.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
    const updated = await prisma.product.update({
        where: { id: productId },
        data: { status: newStatus }
    })

    revalidatePath(`/admin/sellers/${product.shopId}`)
    return { success: true, status: newStatus }
}
