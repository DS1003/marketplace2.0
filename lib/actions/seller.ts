"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



export async function registerSeller(formData: { name: string; description: string; image?: string }) {
  const session = await auth()
  
  if (!session || !session.user?.id) {
    throw new Error("You must be logged in to become an artisan.")
  }

  const userId = session.user.id

  // Check if shop already exists
  const existingShop = await prisma.shop.findUnique({
    where: { ownerId: userId }
  })

  if (existingShop) {
    throw new Error("You already have an active artisan boutique.")
  }

  // Create shop in PENDING status
  const shop = await (prisma as any).shop.create({
    data: {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      ownerId: userId,
      status: "PENDING"
    }
  })

  // Notify of submission
  await (prisma as any).notification.create({
    data: {
      userId: userId,
      title: "Candidature Reçue",
      message: `Votre demande pour la boutique "${formData.name}" a été transmise aux administrateurs. Vous recevrez une notification d'approbation d'ici peu.`,
      type: "INFO"
    }
  })

  // Simulate Email submission
  console.log(`[EMAIL SIMULATION] Application Submitted for ${userId}`)

  revalidatePath("/become-seller")
  
  return shop
}

export async function getSellerDashboardData() {
  const session = await auth()
  if (!session || ((session.user?.role as string) !== "SELLER" && (session.user?.role as string) !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  const shop = await prisma.shop.findUnique({
    where: { ownerId: session.user.id },
    include: {
      owner: { select: { name: true, image: true, email: true } },
      products: {
         include: { category: true }
      },
      _count: {
        select: { products: true }
      }
    }
  })

  if (!shop) throw new Error("Shop not found")
  if ((shop as any).status !== "APPROVED" && (session.user.role as string) !== "SUPER_ADMIN") {
    throw new Error("Votre boutique est toujours en cours d'approbation par nos conservateurs.")
  }

  // Recalculate stats for the specific shop
  const sales = await prisma.orderItem.aggregate({
    _sum: {
        quantity: true,
        price: true
    },
    where: {
        product: { shopId: shop.id },
        order: { status: "DELIVERED" }
    }
  })

  return {
    shop,
    revenue: sales._sum.price || 0,
    salesCount: sales._sum.quantity || 0,
    productCount: shop._count.products
  }
}

export async function createProduct(data: { name: string; description: string; price: number; stock: number; categoryId?: string; images: string[] }) {
  const session = await auth()
  if (!session || ((session.user.role as string) !== "SELLER" && (session.user.role as string) !== "SUPER_ADMIN")) {
    throw new Error("Unauthorized")
  }

  const shop = await prisma.shop.findUnique({
    where: { ownerId: session.user.id }
  })

  if (!shop) throw new Error("No boutique found. Please establish your lab first.")

  const product = await prisma.product.create({
    data: {
      ...data,
      shopId: shop.id
    }
  })

  revalidatePath("/seller/products")
  revalidatePath("/marketplace")
  return product
}

export async function updateProduct(id: string, data: Partial<{ name: string; description: string; price: number; stock: number; categoryId: string; images: string[] }>) {
    const session = await auth()
    if (!session || ((session.user.role as string) !== "SELLER" && (session.user.role as string) !== "SUPER_ADMIN")) {
      throw new Error("Unauthorized")
    }

    const shop = await prisma.shop.findUnique({
        where: { ownerId: session.user.id }
    })

    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product || (product.shopId !== shop?.id && (session.user.role as string) !== "SUPER_ADMIN")) {
        throw new Error("Unauthorized to edit this ritual")
    }

    const updated = await prisma.product.update({
        where: { id },
        data
    })

    revalidatePath("/seller/products")
    revalidatePath(`/product/${id}`)
    return updated
}

export async function deleteProduct(id: string) {
    const session = await auth()
    if (!session || ((session.user.role as string) !== "SELLER" && (session.user.role as string) !== "SUPER_ADMIN")) {
        throw new Error("Unauthorized")
    }

    const shop = await prisma.shop.findUnique({
        where: { ownerId: session.user.id }
    })

    const product = await prisma.product.findUnique({
        where: { id }
    })

    if (!product || (product.shopId !== shop?.id && (session.user.role as string) !== "SUPER_ADMIN")) {
        throw new Error("Unauthorized")
    }

    await prisma.product.delete({
        where: { id }
    })

    revalidatePath("/seller/products")
    return { success: true }
}

export async function getSellerOrders() {
    const session = await auth()
    if (!session || ((session.user.role as string) !== "SELLER" && (session.user.role as string) !== "SUPER_ADMIN")) {
        throw new Error("Unauthorized")
    }

    const shop = await prisma.shop.findUnique({
        where: { ownerId: session.user.id }
    })

    if (!shop) throw new Error("Shop not found")

    const orders = await prisma.order.findMany({
        where: {
            items: {
                some: {
                    product: { shopId: shop.id }
                }
            }
        },
        include: {
            user: { select: { name: true, email: true, image: true } },
            items: {
                where: { product: { shopId: shop.id } },
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    })

    return orders
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" }
  })
}

export async function uploadImage(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64String, {
    folder: "moomel_marketplace",
  });

  return result.secure_url;
}
