import { getPublicProducts, getPublicSellers } from "@/lib/actions/public"
import MarketplaceClient from "../marketplace/marketplace-client"

export const metadata = {
  title: "Nouveautés | Moomel",
  description: "Explorez les dernières créations artisanales du Sénégal.",
}

export default async function NewArrivalsPage() {
    const productsRes = await getPublicProducts()
    const sellersRes = await getPublicSellers()

    const products = productsRes.success ? productsRes.data : []
    const sellers = sellersRes.success ? sellersRes.data : []

    // Already sorted by createdAt desc by default in getPublicProducts
    return <MarketplaceClient initialProducts={products} initialSellers={sellers} />
}
