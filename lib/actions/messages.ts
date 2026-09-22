"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const SendMessageSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  content: z.string().min(1, "Message content cannot be empty").max(2000, "Message too long"),
  productId: z.string().optional(),
})

export async function sendMessage(receiverId: string, content: string, productId?: string) {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }
    const validated = SendMessageSchema.safeParse({ receiverId, content, productId })
    if (!validated.success) {
        throw new Error(validated.error.errors[0]?.message || "Invalid input")
    }
    const validData = validated.data

    const message = await (prisma as any).message.create({
        data: {
            senderId: session.user.id,
            receiverId: validData.receiverId,
            content: validData.content,
            productId: validData.productId || null,
        }
    })

    // Notify the receiver
    await (prisma as any).notification.create({
        data: {
            userId: receiverId,
            title: "Nouveau Message",
            message: `${session.user.name} vous a envoyé un message.`,
            type: "INFO"
        }
    })

    revalidatePath("/admin/sellers")
    revalidatePath("/seller/messages")
    revalidatePath("/admin/messages")
    return { success: true, data: message }
}

// Get conversation between the current user and another specific user
export async function getConversation(otherUserId: string) {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const currentUserId = session.user.id

    const messages = await (prisma as any).message.findMany({
        where: {
            OR: [
                { senderId: currentUserId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: currentUserId }
            ]
        },
        include: {
            sender: { select: { id: true, name: true, image: true, role: true } },
            product: { select: { id: true, name: true, images: true } }
        },
        orderBy: { createdAt: 'asc' }
    })

    // Mark as read
    await (prisma as any).message.updateMany({
        where: {
            receiverId: currentUserId,
            senderId: otherUserId,
            read: false
        },
        data: { read: true }
    })

    return messages
}

// Get all conversations list for a user (Inbox view)
export async function getInbox() {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const currentUserId = session.user.id

    // 1. Get distinct partners to avoid loading thousands of messages in memory
    const userIds = await (prisma as any).message.findMany({
        where: {
            OR: [
                { senderId: currentUserId },
                { receiverId: currentUserId }
            ]
        },
        select: { senderId: true, receiverId: true },
        distinct: ['senderId', 'receiverId']
    })

    const partnerIds = new Set<string>()
    userIds.forEach((u: any) => {
        if (u.senderId !== currentUserId) partnerIds.add(u.senderId)
        if (u.receiverId !== currentUserId) partnerIds.add(u.receiverId)
    })

    // 2. Fetch only the latest message and unread count for each partner
    const inbox = await Promise.all(Array.from(partnerIds).map(async (partnerId) => {
        const lastMessage = await (prisma as any).message.findFirst({
            where: {
                OR: [
                    { senderId: currentUserId, receiverId: partnerId },
                    { senderId: partnerId, receiverId: currentUserId }
                ]
            },
            include: {
                sender: { select: { id: true, name: true, image: true, role: true } },
                receiver: { select: { id: true, name: true, image: true, role: true } },
                product: { select: { id: true, name: true } }
            },
            orderBy: { createdAt: 'desc' }
        })

        const unreadCount = await (prisma as any).message.count({
            where: {
                senderId: partnerId as string,
                receiverId: currentUserId,
                read: false
            }
        })

        const partner = lastMessage.senderId === currentUserId ? lastMessage.receiver : lastMessage.sender

        return {
            partner,
            lastMessage,
            unreadCount
        }
    }))

    // Sort by latest message date descending
    return inbox.sort((a, b) => b.lastMessage.createdAt.getTime() - a.lastMessage.createdAt.getTime())
}
export async function deleteConversation(partnerId: string) {
    const session = await auth()
    if (!session || !session.user) throw new Error("Unauthorized")

    const currentUserId = session.user.id

    await (prisma as any).message.deleteMany({
        where: {
            OR: [
                { senderId: currentUserId, receiverId: partnerId },
                { senderId: partnerId, receiverId: currentUserId }
            ]
        }
    })

    revalidatePath("/admin/messages")
    revalidatePath("/seller/messages")
    return { success: true }
}

export async function searchProductsForMessaging(query: string) {
    const session = await auth()
    if (!session) throw new Error("Unauthorized")

    const products = await prisma.product.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } }
            ]
        },
        take: 5,
        select: { id: true, name: true, images: true, price: true }
    })

    return products
}

export async function sendCandidacyFollowUp(content: string) {
    const session = await auth()
    if (!session || !session.user) throw new Error("Unauthorized")

    // Find a super admin or admin to receive the message
    const admin = await prisma.user.findFirst({
        where: {
            OR: [
                { role: "SUPER_ADMIN" },
                { role: "ADMIN" }
            ]
        },
        orderBy: { createdAt: 'asc' } // Pick the oldest admin or just any
    })

    if (!admin) throw new Error("Pas d'administrateur disponible pour recevoir votre relance.")

    return sendMessage(admin.id, content)
}

export async function getAdminPartner() {
    const admin = await prisma.user.findFirst({
        where: {
            OR: [
                { role: "SUPER_ADMIN" },
                { role: "ADMIN" }
            ]
        },
        select: { id: true, name: true, image: true, role: true }
    })
    return admin
}
