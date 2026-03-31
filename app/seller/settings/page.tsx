import { getSellerDashboardData } from "@/lib/actions/seller"
import SellerSettingsClient from "./settings-client"

export default async function SellerSettingsPage() {
    const { shop } = await getSellerDashboardData()
    
    return <SellerSettingsClient shop={shop} />
}
