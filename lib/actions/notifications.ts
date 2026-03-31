"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function getNotifications() {
    const session = await auth()
    if (!session || !session.user?.id) return []

    return (prisma as any).notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 10
    })
}

export async function markAsRead(notificationId: string) {
    const session = await auth()
    if (!session || !session.user?.id) throw new Error("Unauthorized")

    return (prisma as any).notification.update({
        where: { id: notificationId, userId: session.user.id },
        data: { read: true }
    })
}
