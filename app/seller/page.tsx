import { getSellerDashboardData } from "@/lib/actions/seller"
import SellerDashboardClient from "./seller-dashboard-client"

export default async function SellerOverviewPage() {
    let dashboardData;
    let pendingError = null;

    try {
        dashboardData = await getSellerDashboardData();
    } catch (e: any) {
        if (e.message && e.message.includes("cours d'approbation")) {
            pendingError = e.message;
        } else {
            throw e;
        }
    }

    return (
        <SellerDashboardClient dashboardData={dashboardData} pendingError={pendingError} />
    )
}
