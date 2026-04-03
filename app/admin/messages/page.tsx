import { getInbox } from "@/lib/actions/messages"
import AdminMessagesClient from "./admin-messages-client"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminMessagesPage() {
    const session = await auth()
    if (!session || session.user.role !== "SUPER_ADMIN") {
        redirect("/account")
    }

    const inbox = await getInbox()
    
    return <AdminMessagesClient initialConversations={inbox} currentUserId={session.user.id} />
}
