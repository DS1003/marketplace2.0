import { getShopById } from "@/lib/actions/admin"
import SellerDetailClient from "./seller-detail-client"
import { notFound } from "next/navigation"

export default async function SellerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const shop = await getShopById(id)
    if (!shop) {
        notFound()
    }
    return <SellerDetailClient shop={shop} />
}
