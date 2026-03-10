"use client"

import { motion } from "framer-motion"
import {
    ShoppingCart, Users, BarChart3, TrendingUp,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
    Edit, Trash2, Eye
} from "lucide-react"
import NextImage from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// --- Mock Data ---
const stats = [
    { label: "Total Revenue", value: "4,280,000 FCFA", change: "+12.5%", trendingUp: true, icon: TrendingUp },
    { label: "Total Orders", value: "156", change: "+5.2%", trendingUp: true, icon: ShoppingCart },
    { label: "Store Visits", value: "2,840", change: "-2.1%", trendingUp: false, icon: Users },
    { label: "Conversion Rate", value: "5.4%", change: "+0.8%", trendingUp: true, icon: BarChart3 }
]

const recentProducts = [
    { id: 1, name: "Pure Shea Butter", price: "12,500 FCFA", stock: 45, sales: 88, status: "ACTIVE", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200" },
    { id: 2, name: "Baobab Oil Serum", price: "18,000 FCFA", stock: 12, sales: 56, status: "ACTIVE", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" },
    { id: 3, name: "Hibiscus Clay Mask", price: "15,000 FCFA", stock: 0, sales: 120, status: "OUT_OF_STOCK", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200" }
]

export default function SellerOverviewPage() {
    return (
        <div className="space-y-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-end"
            >
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Welcome back, Anta!</h2>
                    <p className="text-muted-foreground text-lg">Here's what's happening with <span className="text-primary font-bold">Koba Skin</span> today.</p>
                </div>
                <div className="flex bg-white rounded-2xl p-1.5 border shadow-sm ring-1 ring-black/5">
                    <Button variant="ghost" size="sm" className="rounded-xl px-6 font-bold text-primary bg-primary/5">Today</Button>
                    <Button variant="ghost" size="sm" className="rounded-xl px-6 font-bold text-muted-foreground hover:bg-[#F8F9FA]">7 Days</Button>
                    <Button variant="ghost" size="sm" className="rounded-xl px-6 font-bold text-muted-foreground hover:bg-[#F8F9FA]">30 Days</Button>
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
                        <h3 className="text-2xl font-bold text-[#2D241E]">Your Products</h3>
                        <Button variant="ghost" className="text-primary font-bold rounded-xl px-4 hover:bg-primary/5">
                            Manage All <ArrowUpRight className="w-5 h-5 ml-1" />
                        </Button>
                    </div>

                    <Card className="rounded-[3rem] border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                        <div className="divide-y divide-border/50">
                            {recentProducts.map((p) => (
                                <div key={p.id} className="p-6 md:p-8 flex items-center hover:bg-[#FDFBF7]/50 transition-colors group">
                                    <div className="h-20 w-20 rounded-[1.5rem] overflow-hidden bg-muted relative flex-shrink-0 border-2 border-white shadow-lg">
                                        <NextImage src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="ml-8 flex-grow">
                                        <h4 className="font-bold text-xl text-[#2D241E]">{p.name}</h4>
                                        <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                            Stock: <span className={cn("font-bold px-2 py-0.5 rounded-full text-xs bg-muted", p.stock < 10 ? 'text-red-500' : 'text-foreground')}>{p.stock} units</span>
                                        </p>
                                    </div>
                                    <div className="text-right px-8">
                                        <p className="font-bold text-xl text-primary">{p.price}</p>
                                        <p className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-tight">{p.sales} sales</p>
                                    </div>
                                    <div className="px-6 hidden md:block">
                                        <Badge className={cn(
                                            "px-4 py-1.5 rounded-full border-none font-bold text-[10px]",
                                            p.status === 'ACTIVE' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                                        )}>
                                            {p.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-2xl h-12 w-12 hover:bg-black/5">
                                                <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-2xl p-3 w-56 shadow-2xl border-none ring-1 ring-black/5">
                                            <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold">
                                                <Edit className="w-5 h-5 text-primary" /> Edit Product
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold">
                                                <Eye className="w-5 h-5 text-primary" /> View Details
                                            </DropdownMenuItem>
                                            <Separator className="my-2 bg-border/50" />
                                            <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold text-red-500 hover:bg-red-50 focus:bg-red-50">
                                                <Trash2 className="w-5 h-5" /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ))}
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
                                title="New Order #1254"
                                desc="Anta, someone just bought 2x Pure Shea Butter."
                                time="12 min ago"
                            />
                            <ActivityItem
                                type="REVIEWS"
                                title="New 5-Star Review"
                                desc="Fatou N. left a glowing review on Moringa Glow Oil."
                                time="2 hours ago"
                            />
                            <ActivityItem
                                type="SYSTEM"
                                title="Security Update"
                                desc="Your store password was changed successfully."
                                time="Yesterday"
                            />
                            <ActivityItem
                                type="STOCK"
                                title="Out of stock!"
                                desc="Hibiscus Clay Mask is currently unavailable."
                                time="2 days ago"
                            />
                        </div>
                        <Button className="w-full mt-12 rounded-[1.5rem] h-14 bg-primary/5 hover:bg-primary/10 text-primary font-bold transition-all" variant="ghost">View All Activity</Button>
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
                    <span className="text-[10px] uppercase font-bold text-muted-foreground whitespace-nowrap bg-muted px-2 py-0.5 rounded-full">{time}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium line-clamp-2">{desc}</p>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
