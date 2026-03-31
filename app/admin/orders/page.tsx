import { getAllOrders } from "@/lib/actions/admin"
import AdminOrdersClient from "./orders-client"

export default async function AdminOrdersPage() {
  const orders = await getAllOrders()
  
  return <AdminOrdersClient initialOrders={orders} />
}
