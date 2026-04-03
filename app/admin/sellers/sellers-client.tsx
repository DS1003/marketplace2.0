"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    CheckCircle, XCircle, Clock, Search,
    ExternalLink, Mail, MapPin,
    Check, X, SlidersHorizontal,
    ShoppingBag, Store, Globe, ShieldCheck
} from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { approveShop, rejectShop } from "@/lib/actions/admin"
import { useRouter } from "next/navigation"

interface AdminSellersClientProps {
    initialShops: any[]
}

export default function AdminSellersClient({ initialShops }: AdminSellersClientProps) {
    const [shops, setShops] = useState(initialShops)
    const [activeTab, setActiveTab] = useState("pending")
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const filteredShops = shops.filter(shop => {
        if (activeTab === "pending") return shop.status === "PENDING"
        return shop.status === "APPROVED"
    })

    const handleApprove = async (id: string, brandName: string) => {
        startTransition(async () => {
           try {
               await approveShop(id)
               setShops(prev => prev.map(s => s.id === id ? { ...s, status: 'APPROVED' } : s))
               toast.success(`Ritual Approved: ${brandName} is now live.`)
               router.refresh()
           } catch (error: any) {
               toast.error(error.message)
           }
        })
    }

    const handleReject = async (id: string, brandName: string) => {
        const reason = window.prompt("Reason for rejection:")
        if (!reason) return

        startTransition(async () => {
            try {
                await rejectShop(id, reason)
                setShops(prev => prev.map(s => s.id === id ? { ...s, status: 'REJECTED' } : s))
                toast.error(`${brandName} application declined.`)
                router.refresh()
            } catch (error: any) {
                toast.error(error.message)
            }
        })
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Artisan Stewardship</h1>
                    <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Curate the future of West African heritage boutiques.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative group w-64 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <Input 
                            placeholder="Seek artisan..." 
                            className="bg-white border-zinc-200/50 rounded-lg h-10 pl-10 pr-4 text-[13px] font-medium focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Partners", value: shops.filter(s => s.status === 'APPROVED').length.toString(), icon: Store, color: "text-primary bg-primary/5" },
                    { label: "Pending Apps", value: shops.filter(s => s.status === 'PENDING').length.toString(), icon: Clock, color: "text-amber-500 bg-amber-50" },
                    { label: "Rejected", value: shops.filter(s => s.status === 'REJECTED').length.toString(), icon: XCircle, color: "text-rose-500 bg-rose-50" },
                    { label: "Trust Score", value: "100%", icon: ShieldCheck, color: "text-blue-500 bg-blue-50" },
                ].map((stat, idx) => (
                    <Card key={idx} className="border-zinc-200/50 shadow-sm rounded-xl bg-white p-4">
                        <div className="flex items-center gap-3">
                            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center transition-transform", stat.color)}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                                <p className="text-lg font-bold text-slate-800 tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Content Area */}
            <div className="space-y-6">
                <div className="flex bg-slate-100/50 p-1 rounded-lg border border-zinc-200/50 w-fit">
                    <button
                        onClick={() => setActiveTab("pending")}
                        className={cn(
                            "px-6 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                            activeTab === 'pending' ? 'bg-[#2D241E] text-white shadow-sm' : 'text-slate-400 hover:text-slate-800'
                        )}
                    >
                        Pending Rituals
                    </button>
                    <button
                        onClick={() => setActiveTab("active")}
                        className={cn(
                            "px-6 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all",
                            activeTab === 'active' ? 'bg-[#2D241E] text-white shadow-sm' : 'text-slate-400 hover:text-slate-800'
                        )}
                    >
                        Manifested Lab
                    </button>
                </div>

                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {filteredShops.length > 0 ? (
                            filteredShops.map((shop, index) => (
                                <motion.div
                                    key={shop.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    layout
                                >
                                    <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden group">
                                        <div className="p-6 md:p-8 flex flex-col lg:flex-row items-center gap-8">
                                            {/* Brand Identity */}
                                            <div className="relative h-20 w-20 md:h-28 md:w-28 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-700 shadow-inner">
                                                <NextImage src={shop.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200"} alt={shop.name} fill className="object-cover" />
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 space-y-4">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h3 className="text-xl font-bold text-slate-800">{shop.name}</h3>
                                                    <Badge variant="outline" className={cn(
                                                        "h-5 rounded-md uppercase text-[8px] font-bold px-2 tracking-widest",
                                                        shop.status === 'PENDING' ? 'border-amber-200 text-amber-600 bg-amber-50' : 'border-emerald-200 text-emerald-600 bg-emerald-50'
                                                    )}>
                                                        {shop.status}
                                                    </Badge>
                                                    <span className="ml-auto text-[10px] font-semibold text-slate-300 uppercase tracking-widest">{new Date(shop.createdAt).toLocaleDateString()}</span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    <div className="space-y-1">
                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Institutional Owner</p>
                                                        <p className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5 leading-none">
                                                            <Mail className="h-3 w-3 text-primary" /> {shop.owner?.name || "Anonymous Artisan"}
                                                        </p>
                                                        <p className="text-[11px] text-slate-500">{shop.owner?.email}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Lab Story</p>
                                                        <p className="text-[11px] text-slate-400 leading-relaxed italic line-clamp-2">
                                                            "{shop.description || "No bio provided."}"
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            {shop.status === 'PENDING' ? (
                                                <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto pt-6 lg:pt-0 lg:pl-8 lg:border-l border-zinc-100">
                                                    <Button
                                                        disabled={isPending}
                                                        onClick={() => handleApprove(shop.id, shop.name)}
                                                        className="flex-1 lg:w-40 h-10 rounded-lg bg-[#2D241E] text-white font-bold uppercase tracking-widest text-[9px] shadow-sm hover:translate-y-[-1px] transition-all"
                                                    >
                                                        <Check className="mr-2 h-3.5 w-3.5" /> Approve Lab
                                                    </Button>
                                                    <Button
                                                        disabled={isPending}
                                                        variant="ghost"
                                                        onClick={() => handleReject(shop.id, shop.name)}
                                                        className="flex-1 h-10 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 font-bold uppercase tracking-widest text-[8px] transition-all"
                                                    >
                                                        <X className="mr-2 h-3.5 w-3.5" /> Deny
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-row lg:flex-col gap-2 w-full lg:w-auto pt-6 lg:pt-0 lg:pl-8 lg:border-l border-zinc-100 items-center justify-center">
                                                    <Button asChild variant="outline" className="w-full h-10 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                                                        <Link href={`/admin/sellers/${shop.id}`}>Gérer la Boutique</Link>
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-64 flex flex-col items-center justify-center text-center space-y-4 bg-slate-50/50 border border-dashed border-zinc-200 rounded-2xl"
                            >
                                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800">Clear Stewardship</h3>
                                <p className="text-slate-400 text-sm max-w-sm">No laboratories awaiting moderation in the current registry.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
