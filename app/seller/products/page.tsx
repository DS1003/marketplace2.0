import { getSellerDashboardData } from "@/lib/actions/seller"
import SellerProductsClient from "./products-client"

export default async function SellerProductsPage() {
  const { shop } = await getSellerDashboardData()
  return <SellerProductsClient products={shop.products} />
}
