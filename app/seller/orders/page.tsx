import { getSellerOrders } from "@/lib/actions/seller"
import SellerOrdersClient from "./orders-client"

export default async function SellerOrdersPage() {
    const orders = await getSellerOrders()
    
    return <SellerOrdersClient initialOrders={orders} />
}
