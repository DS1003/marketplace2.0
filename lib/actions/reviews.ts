"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const AddReviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  comment: z.string().min(3, "Comment must be at least 3 characters").max(500, "Comment is too long"),
})

export async function addReview(productId: string, rating: number, comment: string) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: "Non autorisé" }
    }

    const validated = AddReviewSchema.safeParse({ productId, rating, comment })
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0]?.message || "Invalid input" }
    }
    const validData = validated.data

    // Optional Check if the user bought this product : 
    // Usually it would check Orders, but we'll bypass strict buy-only check for now, or we can check
    const hasBought = await prisma.order.findFirst({
        where: {
            userId: session.user.id,
            status: { not: 'CANCELLED' },
            items: {
                some: { productId: validData.productId }
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
          productId: validData.productId,
          userId: session.user.id
        }
      },
      update: {
        rating: validData.rating,
        comment: validData.comment
      },
      create: {
        productId: validData.productId,
        userId: session.user.id,
        rating: validData.rating,
        comment: validData.comment
      }
    })

    revalidatePath(`/product/${validData.productId}`)
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
