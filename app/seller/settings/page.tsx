import { getSellerDashboardData } from "@/lib/actions/seller"
import SellerSettingsClient from "./settings-client"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SellerSettingsPage() {
    const session = await auth()
    if (!session) redirect("/login")
    
    const { shop } = await getSellerDashboardData()
    
    if (!shop) redirect("/seller/register")

    return (
        <div className="py-10">
            <SellerSettingsClient shop={shop} />
        </div>
    )
}
