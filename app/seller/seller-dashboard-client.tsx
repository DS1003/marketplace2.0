"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import NextImage from "next/image"
import { motion } from "framer-motion"
import {
    ShoppingCart, Users, BarChart3, TrendingUp,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
    Edit, Eye, Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function SellerDashboardClient({
    dashboardData,
    pendingError
}: {
    dashboardData?: any;
    pendingError?: string | null;
}) {
    if (pendingError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-24 h-24 bg-amber-100/50 text-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <Clock className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-bold text-[#2D241E] italic">Candidature en cours</h1>
                <p className="text-muted-foreground text-sm italic leading-relaxed max-w-md">
                    {pendingError}
                </p>
                <Link href="/account">
                    <Button variant="outline" className="rounded-full mt-4 bg-white hover:bg-stone-50 text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">
                        Retourner au profil
                    </Button>
                </Link>
            </div>
        )
    }

    const { shop, revenue, salesCount, productCount } = dashboardData!;

    const stats = [
        { label: "Total Revenue", value: `${revenue.toLocaleString()} FCFA`, change: "+0%", trendingUp: true, icon: TrendingUp },
        { label: "Total Orders", value: salesCount.toString(), change: "+0%", trendingUp: true, icon: ShoppingCart },
        { label: "Store Visits", value: "0", change: "+0%", trendingUp: true, icon: Users },
        { label: "Products", value: productCount.toString(), change: "+0%", trendingUp: true, icon: BarChart3 }
    ]

    const recentProducts = shop.products.slice(0, 3)

    return (
        <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
            >
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Welcome back, {(shop as any).owner?.name?.split(' ')[0] || "Artisan"}!</h2>
                    <p className="text-muted-foreground text-lg font-light">Here's what's happening with <span className="text-primary font-bold">{shop.name}</span> today.</p>
                </div>
                <div className="flex bg-white rounded-2xl p-1.5 border shadow-sm ring-1 ring-black/5">
                    <Button variant="ghost" size="sm" className="rounded-xl px-6 font-bold text-primary bg-primary/5">Activity Feed</Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 hover:shadow-black/10 transition-all group overflow-hidden bg-white">
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start">
                                    <div className="p-4 bg-[#F8F9FA] rounded-[1.5rem] group-hover:bg-primary/10 transition-colors">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <Badge variant="secondary" className={cn(
                                        "px-3 py-1 border-none font-bold text-xs rounded-full",
                                        stat.trendingUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                    )}>
                                        {stat.trendingUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-1" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-1" />}
                                        {stat.change}
                                    </Badge>
                                </div>
                                <div className="mt-6">
                                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-2 text-[#2D241E]">{stat.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
                {/* Recent Products */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-[#2D241E]">Your Rituals</h3>
                        <Link href="/seller/products">
                            <Button variant="ghost" className="text-primary font-bold rounded-xl px-4 hover:bg-primary/5">
                                Manage All <ArrowUpRight className="w-5 h-5 ml-1" />
                            </Button>
                        </Link>
                    </div>

                    <Card className="rounded-[3rem] border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                        <div className="divide-y divide-border/50">
                            {recentProducts.length > 0 ? recentProducts.map((p: any) => (
                                <div key={p.id} className="p-6 md:p-8 flex items-center hover:bg-[#FDFBF7]/50 transition-colors group">
                                    <div className="h-20 w-20 rounded-[1.5rem] overflow-hidden bg-muted relative flex-shrink-0 border-2 border-white shadow-lg">
                                        <NextImage src={p.images?.[0] || ""} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="ml-8 flex-grow">
                                        <h4 className="font-bold text-xl text-[#2D241E] group-hover:text-black transition-colors">{p.name}</h4>
                                        <p className="text-muted-foreground mt-1 flex items-center gap-2 font-light">
                                            Stock: <span className={cn("font-bold px-3 py-0.5 rounded-full text-[10px] uppercase tracking-widest bg-muted", p.stock < 10 ? 'text-red-500 bg-red-50' : 'text-foreground')}>{p.stock} units</span>
                                        </p>
                                    </div>
                                    <div className="text-right px-8">
                                        <p className="font-bold text-xl text-[#2D241E]">${p.price.toFixed(2)}</p>
                                        <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-widest">Active Creation</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-black/5">
                                                <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-[1.5rem] p-3 w-56 shadow-2xl border-none ring-1 ring-black/5">
                                            <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold text-[10px] uppercase tracking-widest focus:bg-primary/5">
                                                <Edit className="w-4 h-4 text-primary" /> Edit Product
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold text-[10px] uppercase tracking-widest focus:bg-primary/5">
                                                <Eye className="w-4 h-4 text-primary" /> View Details
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            )) : (
                                <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
                                    <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center text-primary/30">
                                        <ShoppingCart className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-lg font-bold text-[#2D241E]">No rituals manifested yet</p>
                                        <p className="text-sm text-muted-foreground font-light">Start sharing your artisanal creations with the world.</p>
                                    </div>
                                    <Link href="/seller/products/new">
                                        <Button className="mt-2 bg-[#2D241E] hover:bg-black text-white rounded-full px-8">Manifest First Ritual</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>

                {/* Recent Activity / Feed */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <h3 className="text-2xl font-bold text-[#2D241E]">Recent Notifications</h3>
                    <Card className="rounded-[3rem] border-none shadow-xl shadow-black/5 bg-white p-10">
                        <div className="space-y-10">
                            <ActivityItem
                                type="SALE"
                                title="System Online"
                                desc="Your artisanal laboratory is now synchronized with Moomel 2.0."
                                time="Just now"
                            />
                            <ActivityItem
                                type="SYSTEM"
                                title="Onboarding Complete"
                                desc="Welcome to the future of sensory commerce in Senegal."
                                time="Today"
                            />
                        </div>
                        <Button className="w-full mt-12 rounded-[1.5rem] h-14 bg-primary/5 hover:bg-primary/10 text-primary font-bold transition-all uppercase tracking-widest text-[10px]" variant="ghost">View All Manifests</Button>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

function ActivityItem({ type, title, desc, time }: { type: string, title: string, desc: string, time: string }) {
    const getColors = () => {
        switch (type) {
            case 'SALE': return 'bg-green-500 shadow-green-200';
            case 'STOCK': return 'bg-red-500 shadow-red-200';
            case 'REVIEWS': return 'bg-amber-500 shadow-amber-200';
            default: return 'bg-blue-500 shadow-blue-200';
        }
    }
    return (
        <div className="flex gap-6 items-start group">
            <div className={cn("w-3 h-3 rounded-full mt-2.5 flex-shrink-0 shadow-lg ring-4 ring-white transition-transform group-hover:scale-125", getColors())} />
            <div className="space-y-2">
                <div className="flex justify-between items-center gap-4">
                    <p className="font-bold text-lg text-[#2D241E]">{title}</p>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground whitespace-nowrap bg-muted px-2 py-0.5 rounded-full">{time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-2">{desc}</p>
            </div>
        </div>
    )
}
