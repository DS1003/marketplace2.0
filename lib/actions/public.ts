"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function getPublicProducts() {
  try {
    const session = await auth()
    const userId = session?.user?.id

    const products = await prisma.product.findMany({
      include: {
        shop: {
          select: {
            name: true,
            owner: {
              select: {
                name: true
              }
            }
          }
        },
        category: true,
        wishlistedBy: {
          select: { id: true }
        } as any,
        reviews: {
          select: { rating: true }
        } as any
      } as any,
      orderBy: {
        createdAt: "desc"
      }
    })

    const productsWithWishlist = products.map((product: any) => {
      const avgRating = product.reviews.length > 0 
        ? product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length 
        : 0

      return {
        ...product,
        avgRating,
        reviewCount: product.reviews.length,
        isWishlisted: userId 
          ? product.wishlistedBy?.some((u: any) => u.id === userId)
          : false
      }
    })

    return { success: true, data: productsWithWishlist }
  } catch (error) {
    console.error("Failed to fetch public products:", error)
    return { success: false, error: "Failed to fetch products" }
  }
}

export async function getPublicSellers() {
  try {
    const shops = await prisma.shop.findMany({
      where: {
        status: "APPROVED" // Only approved shops
      },
      include: {
        owner: {
          select: {
            name: true,
            image: true
          }
        },
        products: {
          take: 3,
          select: {
            images: true
          }
        },
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return { success: true, data: shops }
  } catch (error) {
    console.error("Failed to fetch public sellers:", error)
    return { success: false, error: "Failed to fetch sellers" }
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
            owner: {
              select: {
                name: true,
                image: true
              }
            }
          }
        },
        category: true,
        reviews: {
          select: { rating: true }
        } as any
      } as any
    })
    if (!product) return { success: false, error: "Product not found" }
    
    const avgRating = (product as any).reviews.length > 0 
      ? (product as any).reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / (product as any).reviews.length 
      : 0

    const session = await auth()
    const userId = session?.user?.id
    const isWishlisted = userId 
      ? (product as any).wishlistedBy?.some((u: any) => u.id === userId)
      : false

    return { 
      success: true, 
      data: {
        ...product,
        avgRating,
        reviewCount: (product as any).reviews.length,
        isWishlisted
      } 
    }
  } catch (error) {
    console.error("Failed to fetch product:", error)
    return { success: false, error: "Failed to fetch product" }
  }
}

export async function getRelatedProducts(productId: string, categoryId?: string | null) {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: { not: productId },
        ...(categoryId ? { categoryId } : {})
      },
      include: {
        shop: {
          select: { name: true }
        }
      },
      take: 4,
      orderBy: { createdAt: "desc" }
    })
    return { success: true, data: products }
  } catch (error) {
    console.error("Failed to fetch related products:", error)
    return { success: false, error: "Failed to fetch related products" }
  }
}

export async function getProductFullDetails(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        category: true,
        wishlistedBy: {
          select: { id: true }
        } as any
      } as any
    })

    if (!product) return { success: false, error: "Product not found" }

    const avgRating = (product as any).reviews.length > 0 
      ? (product as any).reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / (product as any).reviews.length 
      : 0

    const session = await auth()
    const userId = session?.user?.id
    const isWishlisted = userId 
      ? (product as any).wishlistedBy.some((u: any) => u.id === userId)
      : false

    return { 
      success: true, 
      data: {
        ...product,
        avgRating,
        reviewCount: (product as any).reviews.length,
        isWishlisted
      } 
    }
  } catch (error) {
    console.error("Failed to fetch product full details:", error)
    return { success: false, error: "Failed to fetch product details" }
  }
}
