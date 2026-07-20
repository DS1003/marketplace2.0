export const dynamic = 'force-dynamic';
import { getPublicProducts, getPublicSellers } from "@/lib/actions/public"
import MarketplaceClient from "../marketplace/marketplace-client"

export const metadata = {
  title: "Promotions | Moomel",
  description: "Nos rituels d'exception à prix préférentiels.",
}

export default async function DealsPage() {
    const productsRes = await getPublicProducts()
    const sellersRes = await getPublicSellers()

    const products = productsRes.success ? productsRes.data : []
    const sellers = sellersRes.success ? sellersRes.data : []

    // If there is no specific 'sale' field yet, we might want to just show all for now
    // or if you have some discount logic, apply it here.
    return <MarketplaceClient initialProducts={products} initialSellers={sellers} />
}

