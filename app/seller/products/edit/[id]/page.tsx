import { getSingleSellerProduct, getAllCategories } from "@/lib/actions/seller"
import ProductForm from "@/components/seller/product-form"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = params
    
    try {
        const product = await getSingleSellerProduct(id)
        const categories = await getAllCategories()
        
        return (
            <div className="max-w-5xl mx-auto py-10">
                <ProductForm categories={categories} initialData={product} />
            </div>
        )
    } catch (e) {
        notFound()
    }
}
