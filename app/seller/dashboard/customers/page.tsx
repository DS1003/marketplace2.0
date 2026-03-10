"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search, Filter, Users, Star,
    MoreHorizontal, Mail, MapPin,
    Calendar, ArrowUpRight, ShoppingBag,
    Award, ShieldCheck, ChevronRight, MessageSquare, ShoppingCart
} from "lucide-react"
import NextImage from "next/image"

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

// --- Mock Customers ---
const initialCustomers = [
    {
        id: "c-1",
        name: "Fatou NDIAYE",
        email: "fatou.n@example.com",
        orders: 12,
        ltv: "450,000 FCFA",
        lastOrder: "2024-03-10",
        location: "Dakar",
        avatar: "https://i.pravatar.cc/150?u=fatou",
        tier: "PLATINUM"
    },
    {
        id: "c-2",
        name: "Moussa SOW",
        email: "m.sow@thies.sn",
        orders: 4,
        ltv: "85,000 FCFA",
        lastOrder: "2024-03-09",
        location: "Thiès",
        avatar: "https://i.pravatar.cc/150?u=moussa",
        tier: "SILVER"
    },
    {
        id: "c-3",
        name: "Khady DIOP",
        email: "khady.diop@dakar.sn",
        orders: 22,
        ltv: "1,240,000 FCFA",
        lastOrder: "2024-03-09",
        location: "Dakar",
        avatar: "https://i.pravatar.cc/150?u=khady",
        tier: "PLATINUM"
    },
    {
        id: "c-4",
        name: "Anta GUEYE",
        email: "anta.g@example.sn",
        orders: 1,
        ltv: "12,500 FCFA",
        lastOrder: "2024-02-15",
        location: "Saint-Louis",
        avatar: "https://i.pravatar.cc/150?u=anta",
        tier: "NEW"
    },
    {
        id: "c-5",
        name: "Abdou FALL",
        email: "abdou88@example.com",
        orders: 8,
        ltv: "215,000 FCFA",
        lastOrder: "2024-03-01",
        location: "Ziguinchor",
        avatar: "https://i.pravatar.cc/150?u=abdou",
        tier: "GOLD"
    },
]

export default function SellerCustomersPage() {
    const [customers] = useState(initialCustomers)
    const [searchQuery, setSearchQuery] = useState("")

    const getTierBadge = (tier: string) => {
        switch (tier) {
            case 'PLATINUM': return <Badge className="bg-primary/20 text-primary border-none font-bold text-[10px] uppercase gap-1.5"><Award className="w-3.5 h-3.5" /> Platinum Customer</Badge>
            case 'GOLD': return <Badge className="bg-amber-500/10 text-amber-600 border-none font-bold text-[10px] uppercase gap-1.5"><Star className="w-3.5 h-3.5" /> Gold Tier</Badge>
            case 'SILVER': return <Badge className="bg-slate-500/10 text-slate-600 border-none font-bold text-[10px] uppercase">Silver Tier</Badge>
            case 'NEW': return <Badge className="bg-green-500/10 text-green-600 border-none font-bold text-[10px] uppercase">New Member</Badge>
            default: return null
        }
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Customer Base</h2>
                    <p className="text-muted-foreground text-lg mt-2">Manage your relationships and understand customer loyalty.</p>
                </div>
                <div className="flex gap-4">
                    <Button className="rounded-2xl h-12 px-8 font-bold bg-[#2D241E] hover:bg-black text-white shadow-xl shadow-black/10">
                        <MessageSquare className="w-5 h-5 mr-3" /> Send Marketing Email
                    </Button>
                </div>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <MetricCard icon={Users} label="Total Customers" value="1,284" sub="Last 30 days: +24" />
                <MetricCard icon={Award} label="Repeat Customers" value="38%" sub="+5% from last month" />
                <MetricCard icon={ShoppingBag} label="Average Order Value" value="18,500 FCFA" sub="Consistent growth" />
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-[450px] group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search by name, email, or ID..."
                        className="pl-14 h-16 bg-white border-none rounded-[1.5rem] shadow-sm ring-1 ring-black/5 focus-visible:ring-primary/20 text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none h-16 px-8 rounded-[1.5rem] font-bold border-none bg-white shadow-sm ring-1 ring-black/5 hover:bg-primary/5 transition-all text-muted-foreground hover:text-primary">
                        <Filter className="w-5 h-5 mr-3" /> Filter Members
                    </Button>
                </div>
            </div>

            {/* Customer List Section */}
            <Card className="rounded-[3rem] border-none shadow-xl shadow-black/5 bg-white overflow-hidden">
                <div className="p-4 md:p-10 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {customers.map((customer, index) => (
                            <motion.div
                                key={customer.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="p-6 rounded-[2rem] border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all group relative overflow-hidden flex flex-col md:flex-row md:items-center gap-8">
                                    {/* Glass Decorator */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Profile Avatar & Info */}
                                    <div className="flex items-center gap-6 flex-shrink-0 min-w-0">
                                        <div className="relative h-20 w-20 flex-shrink-0">
                                            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] scale-110 blur-sm group-hover:blur-md transition-all" />
                                            <div className="h-full w-full rounded-[1.8rem] overflow-hidden border-4 border-white relative shadow-lg">
                                                <NextImage src={customer.avatar} alt={customer.name} fill className="object-cover" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-2xl font-bold text-[#2D241E] truncate group-hover:text-primary transition-colors">{customer.name}</h3>
                                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                                <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><Mail className="w-4 h-4" /> {customer.email}</p>
                                                <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><MapPin className="w-4 h-4" /> {customer.location}, SN</p>
                                            </div>
                                            <div className="mt-3">
                                                {getTierBadge(customer.tier)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics Grid */}
                                    <div className="flex-grow grid grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60">Total Expenditure</p>
                                            <p className="text-xl font-bold text-primary">{customer.ltv}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60">Orders Count</p>
                                            <p className="text-xl font-bold flex items-center gap-2">{customer.orders} <ShoppingCart className="w-4 h-4 text-muted-foreground" /></p>
                                        </div>
                                        <div className="space-y-1 hidden lg:block">
                                            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-muted-foreground/60">Last Engagement</p>
                                            <p className="text-xl font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /> {customer.lastOrder}</p>
                                        </div>
                                    </div>

                                    {/* Action Column */}
                                    <div className="flex items-center gap-3 w-full md:w-auto">
                                        <Button className="flex-grow md:flex-none rounded-2xl h-14 px-8 font-bold bg-[#F8F9FA] hover:bg-black text-[#2D241E] hover:text-white transition-all group shadow-sm border-none">
                                            Profile Details <ArrowUpRight className="w-5 h-5 ml-2 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-2xl h-14 w-14 hover:bg-primary/10">
                                                    <MoreHorizontal className="w-6 h-6 text-muted-foreground" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl p-4 w-64 shadow-2xl border-none ring-1 ring-black/5">
                                                <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold">
                                                    <MessageSquare className="w-5 h-5 text-primary" /> Send Message
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold">
                                                    <Award className="w-5 h-5 text-primary" /> Update Tier
                                                </DropdownMenuItem>
                                                <Separator className="my-2" />
                                                <DropdownMenuItem className="rounded-xl gap-4 py-3 font-bold text-red-500">
                                                    <ShieldCheck className="w-5 h-5" /> Ban Member
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </Card>
        </div>
    )
}

function MetricCard({ icon: Icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
    return (
        <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 bg-white p-8 flex items-center gap-8 group overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="h-20 w-20 rounded-3xl bg-secondary/50 flex items-center justify-center relative flex-shrink-0 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
            </div>
            <div className="relative">
                <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-muted-foreground">{label}</p>
                <p className="text-3xl font-bold mt-2 text-[#2D241E]">{value}</p>
                <div className="flex items-center gap-1.5 mt-2 font-bold text-xs text-green-500">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    {sub}
                </div>
            </div>
        </Card>
    )
}
