"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Plus, MoreHorizontal, Edit, Trash2, 
  Eye, Package, AlertCircle, CheckCircle2,
  Filter, ArrowUpDown, ChevronLeft, ChevronRight,
  Zap, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NextImage from "next/image"
import Link from "next/link"
import { deleteProduct } from "@/lib/actions/seller"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"

export default function SellerProductsClient({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (productId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rituel ? Cette action est irréversible.")) {
      try {
        await deleteProduct(productId)
        toast.success("Rituel retiré de votre boutique.")
        window.location.reload()
      } catch (error) {
        toast.error("Échec de la suppression.")
      }
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
                <h2 className="text-xl font-black tracking-tight text-slate-800 uppercase">Vos Rituels</h2>
            </div>
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Gérez votre collection artisanale et vos stocks.</p>
        </div>
        <Link href="/seller/products/new">
          <Button className="bg-[#0F172A] hover:bg-black text-white rounded-xl h-11 px-6 shadow-xl shadow-black/10 font-black uppercase tracking-widest text-[10px]">
            <Plus className="mr-2 h-3.5 w-3.5" /> Nouveau Rituel
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-[1.5rem] overflow-hidden">
        <CardHeader className="p-4 border-b border-zinc-50 bg-slate-50/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                placeholder="Filtrer les rituels..."
                className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-zinc-100 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-teal-500/20 transition-all placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-xl h-10 border-zinc-100 font-black text-[9px] uppercase tracking-widest hover:bg-slate-50">
                <Filter className="mr-2 h-3.5 w-3.5 text-slate-400" /> Filtrer
              </Button>
              <Button variant="outline" className="rounded-xl h-10 border-zinc-100 font-black text-[9px] uppercase tracking-widest hover:bg-slate-50">
                <ArrowUpDown className="mr-2 h-3.5 w-3.5 text-slate-400" /> Trier
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
                <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-zinc-50">
                    <TableHead className="w-[70px] h-12 pl-6 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Objet</TableHead>
                    <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Désignation</TableHead>
                    <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">État</TableHead>
                    <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Prix Unit.</TableHead>
                    <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Inventaire</TableHead>
                    <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400 text-right pr-6">Gestion</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-slate-50/50 transition-colors border-zinc-50 group">
                        <TableCell className="py-3 pl-6">
                        <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-slate-100 group-hover:scale-105 transition-transform duration-500 border border-zinc-100">
                            {product.images && product.images[0] ? (
                            <NextImage
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            ) : (
                            <div className="flex h-full w-full items-center justify-center bg-slate-50">
                                <Package className="h-5 w-5 text-slate-300" />
                            </div>
                            )}
                        </div>
                        </TableCell>
                        <TableCell className="py-3">
                        <div className="flex flex-col">
                            <span className="font-bold text-slate-800 text-[12px] group-hover:text-black transition-colors uppercase tracking-tight">{product.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{product.category?.name || "Sans Catégorie"}</span>
                        </div>
                        </TableCell>
                        <TableCell className="py-3">
                        <Badge className="rounded-md bg-emerald-500/10 text-emerald-600 border-none px-2 py-0.5 font-black text-[8px] uppercase tracking-[0.2em]">
                            Actif
                        </Badge>
                        </TableCell>
                        <TableCell className="py-3 font-black text-slate-800 text-[11px]">
                        {formatPrice(product.price)}
                        </TableCell>
                        <TableCell className="py-3">
                        <div className="flex items-center gap-2">
                            <div className={cn("h-1 w-1 rounded-full", (product.stock || 0) > 0 ? "bg-emerald-500" : "bg-rose-500")} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{product.stock || 0} en stock</span>
                        </div>
                        </TableCell>
                        <TableCell className="py-3 text-right pr-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 hover:bg-slate-100">
                                <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl p-1 min-w-[160px] border-zinc-100 shadow-xl">
                            <Link href={`/seller/products/view/${product.id}`}>
                                <DropdownMenuItem className="rounded-lg cursor-pointer py-2 focus:bg-slate-50 text-[10px] font-bold uppercase tracking-widest">
                                    <Eye className="mr-2 h-3.5 w-3.5" /> Voir Détails
                                </DropdownMenuItem>
                            </Link>
                            <Link href={`/seller/products/edit/${product.id}`}>
                                <DropdownMenuItem className="rounded-lg cursor-pointer py-2 focus:bg-slate-50 text-[10px] font-bold uppercase tracking-widest">
                                    <Edit className="mr-2 h-3.5 w-3.5" /> Modifier
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator className="bg-zinc-50 mx-1" />
                            <DropdownMenuItem 
                                onClick={() => handleDelete(product.id)}
                                className="rounded-lg cursor-pointer py-2 text-rose-500 focus:bg-rose-50 focus:text-rose-600 text-[10px] font-bold uppercase tracking-widest"
                            >
                                <Trash2 className="mr-2 h-3.5 w-3.5" /> Supprimer
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                        <AlertCircle className="h-8 w-8 text-slate-300" />
                        <p className="font-black text-slate-800 text-[11px] uppercase tracking-widest">Aucun rituel trouvé</p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Ajustez votre recherche ou ajoutez un produit.</p>
                        </div>
                    </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Stock Total</p>
              <h4 className="text-lg font-black text-slate-800">
                {products.reduce((acc, p) => acc + (p.stock || 0), 0).toLocaleString()}
              </h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Rituels Actifs</p>
              <h4 className="text-lg font-black text-slate-800">{products.length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-[#0F172A] text-white rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shadow-inner">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-teal-500/60">Demande</p>
                <h4 className="text-[11px] font-black uppercase tracking-widest text-white/90">Expansion Boutique</h4>
              </div>
              <Link href="/seller/products/new">
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10 h-8 w-8 transition-transform group-hover:translate-x-1">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
}
