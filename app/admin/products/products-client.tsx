"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Box, Add, SearchNormal, More, Filter, SliderHorizontal, Eye, Edit2, Trash, Tag, TickCircle, Danger, Shop } from "reicon-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { updateProductStatus, deleteProduct } from "@/lib/actions/admin"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

export default function AdminProductsClient({ initialProducts = [] }: { initialProducts?: any[] }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [suspendDialog, setSuspendDialog] = useState<{ open: boolean, productId: string, reason: string }>({ open: false, productId: "", reason: "" })
  const [isUpdating, setIsUpdating] = useState(false)
  
  // Extract unique categories
  const categories = ["ALL", ...Array.from(new Set(initialProducts.map(p => p.category?.name).filter(Boolean)))]

  // Filter products
  const filteredProducts = initialProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(search.toLowerCase()) || 
      product.id.toLowerCase().includes(search.toLowerCase()) ||
      product.shop?.name?.toLowerCase().includes(search.toLowerCase())
    
    const matchesCategory = categoryFilter === "ALL" || product.category?.name === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleUpdateStatus = async (id: string, newStatus: "ACTIVE" | "SUSPENDED", reason?: string) => {
    setIsUpdating(true)
    try {
      await updateProductStatus(id, newStatus, reason)
      toast.success("Statut mis à jour avec succès")
      if (newStatus === "SUSPENDED") {
        setSuspendDialog({ open: false, productId: "", reason: "" })
      }
      router.refresh()
    } catch (e) {
      toast.error("Erreur lors de la mise à jour")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return
    try {
      await deleteProduct(id)
      toast.success("Produit supprimé")
      router.refresh()
    } catch (e) {
      toast.error("Erreur lors de la suppression")
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Catalogue Produits</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Gérez l'inventaire de la marketplace et les créations des artisans.</p>
        </div>
        <Button className="h-10 rounded-lg bg-primary text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm hover:translate-y-[-1px] transition-all">
          <Add className="mr-2 h-3.5 w-3.5" /> AJOUTER UN PRODUIT
        </Button>
      </div>

      {/* Filters Area */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-white/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-200/50 shadow-sm">
        <div className="relative flex-1 group">
          <SearchNormal className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Rechercher par nom, ID, ou artisan..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-none rounded-lg h-10 pl-10 text-[13px] font-medium focus:ring-1 focus:ring-primary/10 transition-all w-full shadow-inner"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-100 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700 shadow-none">
                <Filter className="h-3.5 w-3.5" /> {categoryFilter === "ALL" ? "CATÉGORIES" : categoryFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
              {categories.map((cat: any) => (
                <DropdownMenuItem key={cat} onClick={() => setCategoryFilter(cat)} className="text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                  {cat === "ALL" ? "TOUTES LES CATÉGORIES" : cat}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Products Table */}
      <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-slate-50/50 border-b border-zinc-50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Produit</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Catégorie / Artisan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Prix / Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Statut</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50/20 transition-all duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                        <NextImage src={product.images?.[0] || "/images/placeholder.png"} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-0.5 max-w-[200px]">
                        <p className="text-[14px] font-bold text-slate-800 tracking-tight truncate">{product.name}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">#{product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <Badge className="w-fit h-5 rounded-md bg-slate-100 text-slate-700 font-bold uppercase text-[8px] px-2 tracking-widest">
                        <Tag className="mr-1.5 h-3 w-3" /> {product.category?.name || "Sans Catégorie"}
                      </Badge>
                      <span className="text-[10px] flex items-center text-slate-400 font-medium">
                        <Shop className="h-3 w-3 mr-1" /> {product.shop?.name || "Inconnu"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="text-[13px] font-bold text-slate-800 underline decoration-primary/20 decoration-2 underline-offset-4">{product.price.toLocaleString("fr-SN")} FCFA</p>
                      <p className={cn(
                        "text-[9px] font-bold flex items-center gap-1",
                        product.stock === 0 ? "text-rose-500" : product.stock < 10 ? "text-amber-500" : "text-emerald-500"
                      )}>
                        {product.stock === 0 ? <Danger className="h-2.5 w-2.5" /> : <TickCircle className="h-2.5 w-2.5" />}
                        {product.stock} {product.stock > 1 ? "Unités" : "Unité"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn(
                      "uppercase text-[8px] h-5 px-2 font-bold tracking-widest border-none",
                      product.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {product.status === "ACTIVE" ? "ACTIF" : "SUSPENDU"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-[12px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white shadow-none transition-all group-hover:border border-zinc-100">
                          <More className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-2 rounded-xl shadow-2xl border-none bg-white">
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all" onClick={() => window.open(`/product/${product.id}`, "_blank")}>
                          <Eye className="mr-2 h-3.5 w-3.5 text-primary" /> <span className="text-[9px] font-bold uppercase tracking-widest">Voir le produit</span>
                        </DropdownMenuItem>
                        {product.status === "ACTIVE" ? (
                          <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-amber-50 group transition-all text-amber-600" onClick={() => setSuspendDialog({ open: true, productId: product.id, reason: "" })}>
                            <Danger className="mr-2 h-3.5 w-3.5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Suspendre</span>
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-emerald-50 group transition-all text-emerald-600" onClick={() => handleUpdateStatus(product.id, "ACTIVE")}>
                            <TickCircle className="mr-2 h-3.5 w-3.5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Activer</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-slate-50 mx-1 my-1" />
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-rose-50 text-rose-500 group transition-all" onClick={() => handleDelete(product.id)}>
                          <Trash className="mr-2 h-3.5 w-3.5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm font-medium">
                    Aucun produit trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Dialog for Suspending */}
      <Dialog open={suspendDialog.open} onOpenChange={(open) => setSuspendDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">Suspendre le produit</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Veuillez indiquer la raison de la suspension. Cette raison sera envoyée à l'artisan.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Raison de la suspension (ex: Image non conforme, prix abusif...)"
              value={suspendDialog.reason}
              onChange={(e) => setSuspendDialog(prev => ({ ...prev, reason: e.target.value }))}
              className="resize-none h-24 rounded-xl bg-slate-50 border-zinc-200 focus:ring-amber-500/20"
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" className="rounded-xl font-bold text-slate-500" onClick={() => setSuspendDialog({ open: false, productId: "", reason: "" })}>
              Annuler
            </Button>
            <Button 
              className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold" 
              onClick={() => handleUpdateStatus(suspendDialog.productId, "SUSPENDED", suspendDialog.reason)}
              disabled={isUpdating || !suspendDialog.reason.trim()}
            >
              {isUpdating ? "Suspension..." : "Confirmer la suspension"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
