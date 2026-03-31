import { getAllShops } from "@/lib/actions/admin"
import AdminSellersClient from "./sellers-client"

export default async function AdminSellersPage() {
  const shops = await getAllShops()
  
  return <AdminSellersClient initialShops={shops} />
}
