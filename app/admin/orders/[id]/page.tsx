import { getOrderById } from "@/lib/actions/admin"
import { notFound } from "next/navigation"
import OrderDetailClient from "./order-detail-client"

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
    const resolvedParams = await params
    const order = await getOrderById(resolvedParams.id)

    if (!order) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <OrderDetailClient order={order} />
        </div>
    )
}
