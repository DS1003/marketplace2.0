import { getSingleSellerProduct } from "@/lib/actions/seller"
import { notFound } from "next/navigation"
import Link from "next/link"
import NextImage from "next/image"
import { 
  ChevronLeft, Edit, Package, BadgeCheck, 
  Trash2, ArrowLeft, MoreVertical, Sparkles,
  Award, ShieldCheck, Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"

export default async function ViewProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    
    try {
        const product = await getSingleSellerProduct(id)
        
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {/* Header Navigation */}
                <div className="flex items-center justify-between">
                    <Link href="/seller/products">
                        <Button variant="ghost" className="rounded-xl gap-2 text-slate-500 hover:text-slate-800 font-black uppercase tracking-widest text-[10px]">
                            <ChevronLeft className="w-4 h-4" /> Retour aux Rituels
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href={`/seller/products/edit/${id}`}>
                            <Button className="rounded-xl bg-[#0F172A] hover:bg-black text-white h-11 px-6 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-[10px] gap-2">
                                <Edit className="w-4 h-4" /> Modifier le Rituel
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Product Media */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-slate-100 relative group">
                            <div className="aspect-square relative">
                                {product.images?.[0] ? (
                                    <NextImage 
                                        src={product.images[0]} 
                                        alt={product.name} 
                                        fill 
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Package className="w-20 h-20" />
                                    </div>
                                )}
                                <div className="absolute top-6 left-6">
                                     <Badge className="bg-white/80 backdrop-blur-md text-teal-600 border-none px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                                        <Zap className="w-3 h-3 mr-2 fill-teal-500" /> Rituel Actif
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                        
                        <div className="grid grid-cols-4 gap-4">
                            {product.images?.slice(1).map((img: string, idx: number) => (
                                <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/50">
                                    <NextImage src={img} alt="Gallery" fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="border-teal-500/20 bg-teal-500/5 text-teal-600 font-black text-[9px] uppercase tracking-widest rounded-full px-4">
                                    {product.category?.name || "Catégorie inconnue"}
                                </Badge>
                                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">UID: {id.slice(-8).toUpperCase()}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight italic">{product.name}</h1>
                            <div className="text-3xl font-light text-teal-600 underline underline-offset-8 decoration-teal-500/10 decoration-4">
                                {formatPrice(product.price)}
                            </div>
                        </div>

                        <Card className="border-none shadow-sm bg-slate-50 rounded-[2.5rem] p-10">
                            <div className="space-y-6">
                                <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Genèse du Rituel</h3>
                                <p className="text-slate-600 leading-relaxed italic text-lg opacity-80">
                                    {product.description || "Aucune description fournie pour ce rituel."}
                                </p>
                            </div>
                        </Card>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm flex flex-col gap-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Disponible</span>
                                </div>
                                <span className="text-3xl font-black text-slate-800">{product.stock}</span>
                                <p className="text-[9px] font-bold text-slate-300 uppercase italic">Unités en laboratoire</p>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm flex flex-col gap-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note Globale</span>
                                </div>
                                <span className="text-3xl font-black text-slate-800">4.9<span className="text-lg opacity-20">/5</span></span>
                                <p className="text-[9px] font-bold text-slate-300 uppercase italic">Basé sur 42 retours clients</p>
                            </div>
                        </div>

                        <div className="p-8 bg-[#0F172A] rounded-[2.5rem] text-white flex items-center justify-between gap-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 blur-[50px] rounded-full group-hover:scale-125 transition-transform duration-700" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400 border border-white/5 shadow-inner">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest">Protocol de Qualité</h4>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase italic mt-1">Sourcing éthique & biologique certifié.</p>
                                </div>
                            </div>
                            <Sparkles className="w-6 h-6 text-teal-500 opacity-20 relative z-10" />
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (e) {
        notFound()
    }
}
