import { getAllUsers } from "@/lib/actions/admin"
import AdminUsersClient from "./users-client"

export default async function AdminUsersPage() {
    const users = await getAllUsers()
    
    return <AdminUsersClient initialUsers={users} />
}
