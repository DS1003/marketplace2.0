"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Search, Plus, MoreHorizontal, Edit, Trash2, 
  Eye, Package, AlertCircle, CheckCircle2,
  Filter, ArrowUpDown, ChevronLeft, ChevronRight
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

export default function SellerProductsClient({ products }: { products: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this ritual? This action cannot be undone.")) {
      try {
        await deleteProduct(productId)
        toast.success("Ritual removed from your shop.")
        // Ideally trigger a refresh or update state
        window.location.reload()
      } catch (error) {
        toast.error("Failed to delete the ritual.")
      }
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#2D241E]">Your Rituals</h2>
          <p className="text-muted-foreground mt-1 font-light">Manage your artisanal collection and store inventory.</p>
        </div>
        <Link href="/seller/products/new">
          <Button className="bg-[#2D241E] hover:bg-black text-white rounded-full px-6 shadow-lg shadow-black/10">
            <Plus className="mr-2 h-4 w-4" /> Add New Ritual
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2rem] overflow-hidden">
        <CardHeader className="border-b border-border/40 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search rituals..."
                className="pl-9 h-11 border-border/60 bg-white/50 rounded-full focus:ring-2 focus:ring-[#2D241E]/10 transition-all font-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full h-10 border-border/60 font-light hover:bg-[#2D241E]/5 transition-colors">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="rounded-full h-10 border-border/60 font-light hover:bg-[#2D241E]/5 transition-colors">
                <ArrowUpDown className="mr-2 h-4 w-4" /> Sort
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-[#2D241E]/[0.02]">
              <TableRow className="hover:bg-transparent border-border/40">
                <TableHead className="w-[80px] py-4 pl-6 font-bold uppercase tracking-widest text-[10px]">Image</TableHead>
                <TableHead className="py-4 font-bold uppercase tracking-widest text-[10px]">Product</TableHead>
                <TableHead className="py-4 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
                <TableHead className="py-4 font-bold uppercase tracking-widest text-[10px]">Price</TableHead>
                <TableHead className="py-4 font-bold uppercase tracking-widest text-[10px]">Stock</TableHead>
                <TableHead className="py-4 font-bold uppercase tracking-widest text-[10px] text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-[#2D241E]/[0.02] transition-colors border-border/30 group">
                    <TableCell className="py-4 pl-6">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-500">
                        {product.images && product.images[0] ? (
                          <NextImage
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#2D241E]/5">
                            <Package className="h-6 w-6 text-[#2D241E]/20" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#2D241E] text-sm group-hover:text-black transition-colors">{product.name}</span>
                        <span className="text-xs text-muted-foreground font-light">{product.category?.name || "No Category"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge className="rounded-full bg-green-500/10 text-green-600 border-none px-3 font-semibold text-[10px] uppercase tracking-wider">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 font-bold text-[#2D241E]">
                      ${Number(product.price).toFixed(2)}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-sm font-light">{product.stock || 0} in stock</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-[#2D241E]/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-2xl p-2 min-w-[160px] border-none shadow-2xl bg-white/95 backdrop-blur-xl">
                          <DropdownMenuItem className="rounded-xl cursor-pointer py-2 focus:bg-[#2D241E]/5">
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="rounded-xl cursor-pointer py-2 focus:bg-[#2D241E]/5">
                            <Edit className="mr-2 h-4 w-4" /> Edit Ritual
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/40 mx-2" />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(product.id)}
                            className="rounded-xl cursor-pointer py-2 text-red-600 focus:bg-red-50 focus:text-red-700"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <AlertCircle className="h-10 w-10 text-[#2D241E]/10" />
                      <p className="font-bold text-[#2D241E]/40 text-lg">No rituals found</p>
                      <p className="text-sm text-muted-foreground font-light">Try adjusting your search query or add a new ritual.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-xl shadow-black/5 bg-white/50 backdrop-blur-sm rounded-[2rem]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Total Stock</p>
              <h4 className="text-2xl font-bold text-[#2D241E]">
                {products.reduce((acc, p) => acc + (p.stock || 0), 0).toLocaleString()}
              </h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-black/5 bg-white/50 backdrop-blur-sm rounded-[2rem]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live Rituals</p>
              <h4 className="text-2xl font-bold text-[#2D241E]">{products.length}</h4>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl shadow-black/5 bg-[#2D241E] text-white rounded-[2rem]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Plus className="h-6 w-6" />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/60">New Listing</p>
                <h4 className="text-xl font-bold">Standard Store</h4>
              </div>
              <Link href="/seller/products/new">
                <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/20 h-10 w-10">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
