"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Package, 
  Plus, 
  Search, 
  MoreVertical, 
  Filter, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  Edit,
  Trash,
  Tag,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const products = [
  { id: "1", name: "Pure Shea Butter", price: 25.00, stock: 142, category: "Skincare", status: "Active", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200", sales: 450, rating: 4.8 },
  { id: "2", name: "Traditional Incense Kit", price: 45.00, stock: 24, category: "Rituals", status: "Low Stock", img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200", sales: 120, rating: 4.9 },
  { id: "3", name: "African Clay Mask", price: 32.50, stock: 0, category: "Beauty", status: "Out of Stock", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200", sales: 230, rating: 4.7 },
]

export default function AdminProductsPage() {
  return (
    <div className="space-y-8">
      {/* Header - Refined */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Product Catalog</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Curate and manage your marketplace inventory and artisan rituals.</p>
        </div>
        <Button className="h-10 rounded-lg bg-primary text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm hover:translate-y-[-1px] transition-all">
          <Plus className="mr-2 h-3.5 w-3.5" /> Add Ritual Item
        </Button>
      </div>

      {/* Filters Area - Refined */}
      <div className="flex flex-col md:flex-row items-center gap-3 bg-white/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-200/50 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search products..." 
            className="bg-white border-none rounded-lg h-10 pl-10 text-[13px] font-medium focus:ring-1 focus:ring-primary/10 transition-all w-full shadow-inner"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-100 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700 shadow-none">
            <Filter className="h-3.5 w-3.5" /> Category
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg bg-white border border-zinc-100 shadow-none text-slate-400 hover:text-primary">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Products Table - Slimmer Rows */}
      <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left bg-slate-50/50 border-b border-zinc-50">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Ritual Item</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Price / Stock</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Velocity</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">State</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50/20 transition-all duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100 group-hover:scale-105 transition-transform duration-500 shadow-sm">
                        <NextImage src={product.img} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[14px] font-bold text-slate-800 tracking-tight">{product.name}</p>
                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">MOO-{product.id}849</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="ghost" className="h-5 rounded-md bg-slate-100 text-slate-700 font-bold uppercase text-[8px] px-2 tracking-widest">
                      <Tag className="mr-1.5 h-3 w-3" /> {product.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="text-[13px] font-bold text-slate-800 underline decoration-primary/20 decoration-2 underline-offset-4">${product.price.toFixed(2)}</p>
                      <p className={cn(
                        "text-[9px] font-bold flex items-center gap-1",
                        product.stock === 0 ? "text-rose-500" : product.stock < 30 ? "text-amber-500" : "text-emerald-500"
                      )}>
                        {product.stock === 0 ? <AlertCircle className="h-2.5 w-2.5" /> : <CheckCircle className="h-2.5 w-2.5" />}
                        {product.stock} Units
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800 italic">
                           <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {product.rating}
                        </div>
                        <p className="text-[9px] font-bold italic text-slate-400 uppercase tracking-tight">{product.sales}+ Sales</p>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn(
                      "uppercase text-[8px] h-5 px-2 font-bold tracking-widest border-none",
                      product.status === "Active" ? "bg-emerald-50 text-emerald-600" : 
                      product.status === "Low Stock" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {product.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-[12px]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white shadow-none transition-all group-hover:border border-zinc-100">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 p-2 rounded-xl shadow-2xl border-none bg-white">
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all">
                          <Eye className="mr-2 h-3.5 w-3.5 text-primary" /> <span className="text-[9px] font-bold uppercase tracking-widest">Preview Ritual</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all">
                          <Edit className="mr-2 h-3.5 w-3.5 text-primary" /> <span className="text-[9px] font-bold uppercase tracking-widest">Refine Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-50 mx-1 my-1" />
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-rose-50 text-rose-500 group transition-all">
                          <Trash className="mr-2 h-3.5 w-3.5" /> <span className="text-[9px] font-bold uppercase tracking-widest">Archive Item</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
