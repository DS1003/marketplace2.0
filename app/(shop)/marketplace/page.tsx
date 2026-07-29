export const dynamic = 'force-dynamic';
import { getPublicProducts, getPublicSellers } from "@/lib/actions/public"
import MarketplaceClient from "./marketplace-client"

export default async function MarketplacePage({ searchParams }: { searchParams: Promise<{ category?: string }> | { category?: string } }) {
    const resolvedParams = await searchParams;
    const initialCategory = resolvedParams.category || "Tous les produits"
    
    const productsRes = await getPublicProducts()
    const sellersRes = await getPublicSellers()

    const products = productsRes.success ? (productsRes.data || []) : []
    const sellers = sellersRes.success ? (sellersRes.data || []) : []

    return <MarketplaceClient initialProducts={products} initialSellers={sellers} initialCategory={initialCategory} />
}
