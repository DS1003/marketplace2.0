"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function addReview(productId: string, rating: number, comment: string) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Non autorisé" }
    }

    // Optional Check if the user bought this product : 
    // Usually it would check Orders, but we'll bypass strict buy-only check for now, or we can check
    const hasBought = await prisma.order.findFirst({
        where: {
            userId: session.user.id,
            status: { not: 'CANCELLED' },
            items: {
                some: { productId: productId }
            }
        }
    });

    // To allow demo we will not enforce it right now if they didn't buy, or we can?
    // Let's enforce it since the spec said "aux clients qui achètent des produits".
    if (!hasBought) {
        return { success: false, error: "Vous devez acheter ce produit pour laisser un avis." }
    }

    const review = await prisma.review.upsert({
      where: {
        productId_userId: {
          productId,
          userId: session.user.id
        }
      },
      update: {
        rating,
        comment
      },
      create: {
        productId,
        userId: session.user.id,
        rating,
        comment
      }
    })

    revalidatePath(`/product/${productId}`)
    return { success: true, data: review }
  } catch (error: any) {
    console.error("Error adding review:", error)
    return { success: false, error: "Une erreur s'est produite lors de l'ajout de l'avis." }
  }
}

export async function getProductReviews(productId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: { select: { name: true, image: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: reviews }
  } catch (error) {
    return { success: false, error: "Erreur fetching reviews" }
  }
}
