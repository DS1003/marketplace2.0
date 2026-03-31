import { getDashboardStats } from "@/lib/actions/admin"
import AdminDashboardClient from "./dashboard-client"

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats()
  
  return <AdminDashboardClient stats={stats} />
}
