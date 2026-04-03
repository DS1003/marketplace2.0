"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function sendMessage(receiverId: string, content: string, productId?: string) {
    const session = await auth()
    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const message = await (prisma as any).message.create({
        data: {
            senderId: session.user.id,
            receiverId,
            content,
            productId: productId || null,
        }
    })

    revalidatePath("/admin/sellers")
    revalidatePath("/seller/messages")
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

    // Find all distinct users we have messaged or received messages from
    const messages = await (prisma as any).message.findMany({
        where: {
            OR: [
                { senderId: currentUserId },
                { receiverId: currentUserId }
            ]
        },
        include: {
            sender: { select: { id: true, name: true, image: true, role: true } },
            receiver: { select: { id: true, name: true, image: true, role: true } },
            product: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    // Group by conversation partner
    const map = new Map<string, any>()
    for (const m of messages) {
        const partner = m.senderId === currentUserId ? m.receiver : m.sender
        if (!map.has(partner.id)) {
            map.set(partner.id, {
                partner,
                lastMessage: m,
                unreadCount: m.receiverId === currentUserId && !m.read ? 1 : 0
            })
        } else {
            const existing = map.get(partner.id)
            if (m.receiverId === currentUserId && !m.read) {
                existing.unreadCount += 1
            }
        }
    }

    return Array.from(map.values())
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
