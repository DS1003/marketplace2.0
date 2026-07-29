import AdminProductsClient from "./products-client"
import { getAllProducts } from "@/lib/actions/admin"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  const products = await getAllProducts()
  return <AdminProductsClient initialProducts={products} />
}
