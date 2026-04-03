"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star, ShoppingBag, Package, MessageCircle, Clock, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import NextImage from "next/image"
import { getProductFullDetails } from "@/lib/actions/public"
import { formatPrice } from "@/lib/utils"

interface ProductQuickViewProps {
  productId: string
  onClose: () => void
}

export default function ProductQuickView({ productId, onClose }: ProductQuickViewProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const res = await getProductFullDetails(productId)
      if (res.success) {
        setProduct(res.data)
      }
      setLoading(false)
    }
    loadData()
  }, [productId])

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            className={`w-3 h-3 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-white transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 min-h-[400px]">
            <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-slate-400 font-medium animate-pulse uppercase tracking-[0.2em] text-[10px]">Loading Ritual...</p>
          </div>
        ) : !product ? (
          <div className="flex-1 p-12 text-center flex flex-col items-center justify-center">
             <Package className="w-12 h-12 text-slate-200 mb-4" />
             <p className="text-slate-500 font-bold">Produit non trouvé.</p>
          </div>
        ) : (
          <>
            {/* Image Gallery Column */}
            <div className="w-full md:w-[45%] h-64 md:h-auto bg-slate-100 relative shrink-0">
              <NextImage 
                src={product.images?.[0] || "/placeholder.png"} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className="bg-white/90 backdrop-blur-sm text-slate-800 border-none px-3 py-1 text-[10px] uppercase font-black tracking-widest mb-2 shadow-sm">
                  {product.category?.name || "Général"}
                </Badge>
                <h3 className="text-white text-2xl font-bold leading-tight drop-shadow-sm">{product.name}</h3>
              </div>
            </div>

            {/* Details Column */}
            <div className="flex-1 flex flex-col bg-white overflow-y-auto">
              {/* Product Header */}
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#f5a524]">Statut Artisan</p>
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden relative border border-slate-200">
                          <NextImage src={product.shop?.image || "/placeholder.png"} alt={product.shop?.name} fill className="object-cover" />
                       </div>
                       <span className="text-xs font-bold text-slate-800">{product.shop?.name}</span>
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Prix suggéré</p>
                    <p className="text-2xl font-black text-slate-900">{formatPrice(product.price)}</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 flex gap-6 border border-zinc-100">
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Note Globale</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-800">{product.avgRating.toFixed(1)}</span>
                        {renderStars(Math.round(product.avgRating))}
                      </div>
                   </div>
                   <div className="w-px h-8 bg-slate-200 self-center" />
                   <div className="space-y-1">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Total Avis</p>
                      <p className="text-sm font-black text-slate-800 flex items-center gap-1.5 leading-none">
                        <MessageCircle className="w-3.5 h-3.5 text-primary" /> {product.reviewCount}
                      </p>
                   </div>
                </div>
              </div>

              {/* Description */}
              <div className="px-8 py-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-2">Description</h4>
                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-primary/20 pl-4 py-1">
                  "{product.description || 'Apportant l\'héritage culturel à travers des créations intemporelles.'}"
                </p>
              </div>

              {/* Reviews Section */}
              <div className="px-8 py-6 bg-slate-50/50 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-800">Avis des Clients</h4>
                  <span className="text-[9px] font-bold bg-white px-2 py-1 rounded-md border border-zinc-200 text-slate-400">Dernières publications</span>
                </div>

                <div className="space-y-3">
                  {product.reviews?.length > 0 ? (
                    product.reviews.map((r: any) => (
                      <div key={r.id} className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-slate-100 overflow-hidden relative">
                               <NextImage src={r.user?.image || "/placeholder.png"} alt={r.user?.name} fill className="object-cover" />
                            </div>
                            <div>
                               <p className="text-xs font-bold text-slate-800 leading-none mb-0.5">{r.user?.name}</p>
                               <div className="flex items-center gap-2">
                                  {renderStars(r.rating)}
                                  <span className="text-[8px] font-bold text-slate-300 uppercase">{new Date(r.createdAt).toLocaleDateString()}</span>
                               </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-[12px] text-slate-600 leading-normal pl-9">
                          "{r.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                       <Clock className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aucun avis pour l'instant</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer/Actions */}
              <div className="p-8 bg-white border-t border-zinc-100 flex gap-3">
                <Button onClick={onClose} variant="outline" className="flex-1 rounded-xl h-12 uppercase text-[10px] font-black tracking-widest border-zinc-200">
                  Fermer
                </Button>
                <Button className="flex-1 rounded-xl h-12 bg-[#2D241E] text-white uppercase text-[10px] font-black tracking-widest shadow-lg shadow-black/10">
                  Voir en Boutique <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
