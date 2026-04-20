import { getSellerDashboardData } from "@/lib/actions/seller"
import SellerDashboardClient from "./seller-dashboard-client"

export default async function SellerOverviewPage() {
    let dashboardData;
    let pendingError = null;

    dashboardData = await getSellerDashboardData();
    if (dashboardData.isPending) {
        pendingError = "Votre boutique est toujours en cours d'approbation par nos conservateurs.";
    }

    return (
        <SellerDashboardClient dashboardData={dashboardData} pendingError={pendingError} />
    )
}
