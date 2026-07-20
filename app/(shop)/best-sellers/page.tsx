export const dynamic = 'force-dynamic';
import { getPublicProducts, getPublicSellers } from "@/lib/actions/public"
import MarketplaceClient from "../marketplace/marketplace-client"

export const metadata = {
  title: "Meilleures Ventes | Moomel",
  description: "Découvrez les rituels les plus plébiscités de notre communauté.",
}

export default async function BestSellersPage() {
    const productsRes = await getPublicProducts()
    const sellersRes = await getPublicSellers()

    const products = productsRes.success ? productsRes.data : []
    const sellers = sellersRes.success ? sellersRes.data : []

    // Sort by review count as a proxy for popularity
    const bestSellers = [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))

    return <MarketplaceClient initialProducts={bestSellers} initialSellers={sellers} />
}

