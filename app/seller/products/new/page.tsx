import { getAllCategories } from "@/lib/actions/seller"
import ProductForm from "@/components/seller/product-form"

export default async function NewProductPage() {
    const categories = await getAllCategories()
    
    return (
        <div className="max-w-5xl mx-auto py-10">
            <div className="mb-12 space-y-2">
                <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Créer un Rituel</h1>
                <p className="text-[15px] font-medium text-slate-400 italic">Initialisez votre création artisanale dans le marketplace Moomel.</p>
            </div>
            
            <ProductForm categories={categories} />
        </div>
    )
}
