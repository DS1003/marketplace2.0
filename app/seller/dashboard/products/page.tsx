"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus, Search, Filter, MoreHorizontal,
    Edit, Trash2, Eye, Download, ArrowUpDown,
    CheckCircle2, AlertTriangle, XCircle
} from "lucide-react"
import NextImage from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

// --- Mock Data ---
const initialProducts = [
    { id: 1, name: "Pure Shea Butter", category: "Skincare", price: "12,500 FCFA", stock: 45, sales: 88, status: "ACTIVE", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200" },
    { id: 2, name: "Baobab Oil Serum", category: "Oils", price: "18,000 FCFA", stock: 12, sales: 56, status: "ACTIVE", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" },
    { id: 3, name: "Hibiscus Clay Mask", category: "Face", price: "15,000 FCFA", stock: 0, sales: 120, status: "OUT_OF_STOCK", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200" },
    { id: 4, name: "Moringa Glow Oil", category: "Oils", price: "22,000 FCFA", stock: 8, sales: 210, status: "LOW_STOCK", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=200" },
    { id: 5, name: "Black Soap Bar", category: "Soaps", price: "5,000 FCFA", stock: 120, sales: 450, status: "ACTIVE", image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=200" },
]

export default function SellerProductsPage() {
    const [products, setProducts] = useState(initialProducts)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return <Badge className="bg-green-500/10 text-green-600 border-none px-3 py-1 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Published</Badge>
            case 'LOW_STOCK':
                return <Badge className="bg-amber-500/10 text-amber-600 border-none px-3 py-1 font-bold flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Low Stock</Badge>
            case 'OUT_OF_STOCK':
                return <Badge className="bg-red-500/10 text-red-600 border-none px-3 py-1 font-bold flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" /> Sold Out</Badge>
            default:
                return <Badge className="bg-slate-500/10 text-slate-600 border-none px-3 py-1 font-bold">Draft</Badge>
        }
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Product Catalog</h2>
                    <p className="text-muted-foreground text-lg mt-2">Manage your inventory, pricing, and product visibility.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-[1.2rem] h-12 px-6 font-bold border-2 hover:bg-black/5">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </Button>
                    <Link href="/seller/dashboard/products/new">
                        <Button className="rounded-[1.2rem] h-12 px-8 font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                            <Plus className="w-5 h-5 mr-2" /> Add New Product
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-[400px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search product name or SKU..."
                        className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm ring-1 ring-black/5 focus-visible:ring-primary/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none rounded-xl h-14 px-6 font-bold border-none shadow-sm ring-1 ring-black/5 bg-white">
                        <Filter className="w-4 h-4 mr-2" /> Categories
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none rounded-xl h-14 px-6 font-bold border-none shadow-sm ring-1 ring-black/5 bg-white">
                        <ArrowUpDown className="w-4 h-4 mr-2" /> Sort By
                    </Button>
                </div>
            </div>

            {/* Products Table */}
            <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border/50 bg-[#F8F9FA]/50 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                                <th className="px-8 py-6">Product</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Price</th>
                                <th className="px-8 py-6 text-center">In Stock</th>
                                <th className="px-8 py-6 text-center">Total Sales</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((p, index) => (
                                    <motion.tr
                                        key={p.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-[#FDFBF7]/50 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="h-16 w-16 rounded-2xl overflow-hidden relative border shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                                    <NextImage src={p.image} alt={p.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-[#2D241E] text-lg">{p.name}</p>
                                                    <p className="text-sm text-muted-foreground font-medium">{p.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            {getStatusBadge(p.status)}
                                        </td>
                                        <td className="px-8 py-6 text-right font-bold text-primary">
                                            {p.price}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={p.stock < 10 ? 'text-red-500 font-bold' : 'font-bold'}>{p.stock}</span>
                                        </td>
                                        <td className="px-8 py-6 text-center font-bold">
                                            {p.sales}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 hover:bg-black/5">
                                                        <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-2xl p-3 w-56 shadow-2xl border-none ring-1 ring-black/5">
                                                    <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold group">
                                                        <Edit className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" /> Edit Product
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold group">
                                                        <Eye className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" /> Preview in Store
                                                    </DropdownMenuItem>
                                                    <Separator className="my-2 bg-border/50" />
                                                    <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold text-red-500 hover:bg-red-50 focus:bg-red-50">
                                                        <Trash2 className="w-5 h-5" /> Archive Product
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto">
                                <Search className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold">No products found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                            </div>
                            <Button variant="outline" className="rounded-xl" onClick={() => setSearchQuery("")}>Clear Search</Button>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
