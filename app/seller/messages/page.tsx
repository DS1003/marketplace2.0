import { getInbox } from "@/lib/actions/messages"
import MessagesClient from "./messages-client"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SellerMessagesPage() {
    const session = await auth()
    if (!session || session.user.role !== "SELLER") {
        redirect("/login")
    }

    const inbox = await getInbox()
    
    return <MessagesClient initialConversations={inbox} currentUserId={session.user.id} />
}
