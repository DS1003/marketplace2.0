"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function toggleWishlist(productId: string) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return { success: false, error: "Vous devez être connecté pour ajouter en favori." }
  }

  const userId = session.user.id

  try {
    // Check if the product is already in the user's wishlist
    const currentProduct = await (prisma as any).product.findUnique({
      where: { id: productId },
      include: {
        wishlistedBy: {
          where: { id: userId },
          select: { id: true }
        }
      }
    })

    if (!currentProduct) {
      return { success: false, error: "Produit non trouvé." }
    }

    const isCurrentlyWishlisted = currentProduct.wishlistedBy.length > 0

    if (isCurrentlyWishlisted) {
      // Remove from wishlist
      await (prisma as any).user.update({
        where: { id: userId },
        data: {
          wishlist: {
            disconnect: { id: productId }
          }
        }
      })
    } else {
      // Add to wishlist
      await (prisma as any).user.update({
        where: { id: userId },
        data: {
          wishlist: {
            connect: { id: productId }
          }
        }
      })
    }

    // Revalidate relevant pages
    revalidatePath("/")
    revalidatePath("/marketplace")
    revalidatePath(`/product/${productId}`)
    revalidatePath("/account/wishlist")
    
    return { success: true, isWishlisted: !isCurrentlyWishlisted }
  } catch (error: any) {
    console.error("Wishlist error details:", error)
    return { success: false, error: "Une erreur est survenue lors de la mise à jour de vos favoris." }
  }
}

export async function getWishlist() {
  const session = await auth()
  if (!session || !session.user?.id) {
    return { success: false, error: "Non autorisé." }
  }

  try {
    const user = await (prisma as any).user.findUnique({
      where: { id: session.user.id },
      include: {
        wishlist: {
          include: {
            shop: {
              select: { name: true }
            }
          }
        }
      }
    })

    const products = (user as any)?.wishlist || []
    
    // Inject review data and wishlist status for the UI
    const mappedProducts = products.map((p: any) => ({
      ...p,
      isWishlisted: true, // We know it's wishlisted as it's coming from the wishlist
      avgRating: 4.8, // Mock if needed, or include reviews
      reviewCount: 0
    }))

    return { success: true, data: mappedProducts }
  } catch (error: any) {
    console.error("Get wishlist error:", error)
    return { success: false, error: "Erreur lors de la récupération des favoris." }
  }
}
