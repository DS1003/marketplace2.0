import { getAllProducts } from "@/lib/actions/admin"
import AdminProductsClient from "./products-client"

export default async function AdminProductsPage() {
  const products = await getAllProducts()
  
  return <AdminProductsClient initialProducts={products} />
}
