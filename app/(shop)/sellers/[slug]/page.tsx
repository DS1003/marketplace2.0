import { getPublicSellerById } from "@/lib/actions/public"
import SellerShopClient from "./seller-shop-client"
import { notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function SellerShopPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const sellerRes = await getPublicSellerById(slug)
    
    if (!sellerRes.success || !sellerRes.data) {
        notFound()
    }

    return <SellerShopClient initialSeller={sellerRes.data} />
}
