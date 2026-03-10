"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search, Filter, ShoppingCart,
    CheckCircle, Clock, Truck,
    XCircle, MoreHorizontal, ExternalLink,
    ChevronRight, CreditCard, MapPin,
    ArrowUpDown, PackageCheck, Send
} from "lucide-react"

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

// --- Mock Orders ---
const initialOrders = [
    {
        id: "#1254",
        customer: "Fatou NDIAYE",
        email: "fatou@example.com",
        date: "2024-03-10",
        total: "25,000 FCFA",
        status: "DELIVERED",
        items: 2,
        avatar: "https://i.pravatar.cc/150?u=fatou"
    },
    {
        id: "#1253",
        customer: "Moussa SOW",
        email: "moussa@example.com",
        date: "2024-03-09",
        total: "18,000 FCFA",
        status: "SHIPPED",
        items: 1,
        avatar: "https://i.pravatar.cc/150?u=moussa"
    },
    {
        id: "#1252",
        customer: "Khady DIOP",
        email: "khady@example.com",
        date: "2024-03-09",
        total: "32,500 FCFA",
        status: "PROCESSING",
        items: 3,
        avatar: "https://i.pravatar.cc/150?u=khady"
    },
    {
        id: "#1251",
        customer: "Amadou FALL",
        email: "amadou@example.com",
        date: "2024-03-08",
        total: "12,500 FCFA",
        status: "PENDING",
        items: 1,
        avatar: "https://i.pravatar.cc/150?u=amadou"
    },
    {
        id: "#1250",
        customer: "Sokhna GUEYE",
        email: "sokhna@example.com",
        date: "2024-03-07",
        total: "55,000 FCFA",
        status: "CANCELLED",
        items: 5,
        avatar: "https://i.pravatar.cc/150?u=sokhna"
    },
]

export default function SellerOrdersPage() {
    const [orders] = useState(initialOrders)
    const [searchQuery, setSearchQuery] = useState("")

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'DELIVERED': return <CheckCircle className="w-4 h-4" />
            case 'SHIPPED': return <Truck className="w-4 h-4" />
            case 'PROCESSING': return <Clock className="w-4 h-4" />
            case 'PENDING': return <CreditCard className="w-4 h-4" />
            case 'CANCELLED': return <XCircle className="w-4 h-4" />
            default: return null
        }
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'DELIVERED': return 'bg-green-500/10 text-green-600'
            case 'SHIPPED': return 'bg-blue-500/10 text-blue-600'
            case 'PROCESSING': return 'bg-amber-500/10 text-amber-600'
            case 'PENDING': return 'bg-slate-500/10 text-slate-600'
            case 'CANCELLED': return 'bg-red-500/10 text-red-600'
            default: return ''
        }
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Orders Management</h2>
                    <p className="text-muted-foreground text-lg mt-2">Track your sales, shipping status, and order fulfillment.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold bg-white shadow-sm hover:bg-black/5 border-none ring-1 ring-black/5">
                        <ArrowUpDown className="w-4 h-4 mr-2" /> Export Orders
                    </Button>
                </div>
            </div>

            {/* Stats Cards for Orders */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <OrderStat label="Total Orders" value="156" color="bg-primary/5 text-primary" icon={ShoppingCart} />
                <OrderStat label="Processing" value="12" color="bg-amber-500/5 text-amber-600" icon={Clock} />
                <OrderStat label="In Transit" value="28" color="bg-blue-500/5 text-blue-600" icon={Truck} />
                <OrderStat label="Fulfillment Rate" value="98%" color="bg-green-500/5 text-green-600" icon={PackageCheck} />
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm ring-1 ring-black/5">
                <div className="relative w-full md:w-[450px]">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search by Order ID, Customer Name..."
                        className="pl-12 h-14 bg-[#F8F9FA] border-none rounded-2xl shadow-inner focus-visible:ring-primary/20 text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="outline" className="rounded-xl h-14 px-6 font-bold border-none bg-[#FDFBF7] hover:bg-black/5 group">
                        <Filter className="w-4 h-4 mr-2 text-primary transition-transform group-hover:rotate-180" /> All Status
                    </Button>
                    <Button variant="outline" className="rounded-xl h-14 px-6 font-bold border-none bg-[#FDFBF7] hover:bg-black/5">
                        <ArrowUpDown className="w-4 h-4 mr-2 text-primary" /> Date Range
                    </Button>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white group overflow-hidden">
                                <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-8">
                                    {/* Order Main Info */}
                                    <div className="flex items-center gap-6 flex-shrink-0">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center font-bold text-lg text-primary shadow-inner">
                                            {order.id}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-xl font-bold text-[#2D241E]">{order.customer}</h3>
                                                <Badge className={cn("rounded-full border-none font-bold text-[10px] gap-1.5 px-3 py-1", getStatusStyles(order.status))}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground font-medium mt-1 flex items-center gap-4">
                                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {order.date}</span>
                                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Dakar, SN</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Details Preview */}
                                    <div className="flex-grow flex flex-wrap gap-8 md:justify-center">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Amount</p>
                                            <p className="text-xl font-bold text-primary">{order.total}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Items</p>
                                            <p className="text-xl font-bold">{order.items} items</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Contact</p>
                                            <button className="flex items-center gap-2 font-bold text-sm hover:text-primary transition-colors">
                                                <ExternalLink className="w-4 h-4" /> {order.email}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <Button className="flex-grow md:flex-none rounded-[1.2rem] h-12 px-6 font-bold bg-[#2D241E] hover:bg-black text-white shadow-lg transition-all group">
                                            Manage Order <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 bg-muted/50 hover:bg-muted">
                                                    <MoreHorizontal className="w-6 h-6" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl p-3 w-64 shadow-2xl border-none ring-1 ring-black/5">
                                                <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold">
                                                    <Send className="w-5 h-5 text-primary" /> Send Invoice
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold">
                                                    <Truck className="w-5 h-5 text-primary" /> Update Shipping
                                                </DropdownMenuItem>
                                                <Separator className="my-2" />
                                                <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold text-red-500">
                                                    <XCircle className="w-5 h-5" /> Cancel Order
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Pagination / Footer Info */}
            <div className="pt-10 flex items-center justify-between text-sm text-muted-foreground">
                <p>Showing <span className="font-bold text-[#2D241E]">1-5</span> of <span className="font-bold text-[#2D241E]">156</span> orders</p>
                <div className="flex gap-2">
                    <Button variant="ghost" className="rounded-xl font-bold px-6 border-none" disabled>Previous</Button>
                    <Button variant="outline" className="rounded-xl font-bold px-6 shadow-sm bg-white hover:bg-primary hover:text-white transition-all text-primary border-primary/20">Next</Button>
                </div>
            </div>
        </div>
    )
}

function OrderStat({ label, value, color, icon: Icon }: { label: string, value: string, color: string, icon: any }) {
    return (
        <Card className="rounded-3xl shadow-xl shadow-black/5 border-none p-6 space-y-3 bg-white hover:shadow-primary/5 transition-all group overflow-hidden">
            <div className={cn("p-3 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", color)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold text-[#2D241E] mt-1">{value}</p>
            </div>
        </Card>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
