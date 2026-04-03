import { getPublicSellers } from "@/lib/actions/public"
import SellersClient from "./sellers-client"

export default async function SellersPage() {
    const sellersRes = await getPublicSellers()
    const sellers = sellersRes.success ? sellersRes.data : []

    return <SellersClient initialSellers={sellers} />
}
