"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard, Users, Store, ShoppingBag,
    CheckCircle, XCircle, Clock, Search,
    MoreVertical, ExternalLink, Mail, MapPin,
    Check, X, Filter, SlidersHorizontal
} from "lucide-react"
import NextImage from "next/image"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

// --- Mock Applications ---
const initialApplications = [
    {
        id: "app-1",
        brandName: "Ninki Nanka Oils",
        fullName: "Amadou FALL",
        email: "amadou@ninkinka.sn",
        location: "Ziguinchor, Casamance",
        category: "Essential Oils",
        date: "2024-03-08",
        status: "PENDING",
        logo: "https://images.unsplash.com/photo-1629198688000-71f23e74567e?q=80&w=200",
        bio: "Ethically sourced essential oils from the deep forests of Casamance. We focus on rare botanical species and local women empowerment."
    },
    {
        id: "app-2",
        brandName: "Thiès Ceramics",
        fullName: "Moussa SOW",
        email: "moussa@thiesceramics.com",
        location: "Thiès",
        category: "Home Accessories",
        date: "2024-03-09",
        status: "PENDING",
        logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200",
        bio: "Hand-crafted ceramic diffusers and accessories inspired by West African geometry and modernist design."
    }
]

export default function AdminSellersPage() {
    const [applications, setApplications] = useState(initialApplications)
    const [activeTab, setActiveTab] = useState("all")

    const handleApprove = (id: string, brandName: string) => {
        setApplications(apps => apps.filter(app => app.id !== id))
        toast.success(`Successfully approved ${brandName}! They now have access to the Seller Panel.`)
    }

    const handleReject = (id: string, brandName: string) => {
        setApplications(apps => apps.filter(app => app.id !== id))
        toast.error(`${brandName} application has been rejected.`)
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            {/* Minimal Header for Admin */}
            <header className="fixed top-0 w-full z-50 bg-white border-b border-border/50 h-20 px-6 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-bold text-[#2D241E] italic">Moomel <span className="text-primary not-italic">Admin</span></h1>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <a href="/admin" className="hover:text-primary transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg">
                            <LayoutDashboard className="w-4 h-4" /> Overview
                        </a>
                        <a href="/admin/sellers" className="text-primary bg-primary/5 flex items-center gap-2 px-3 py-1.5 rounded-lg">
                            <Store className="w-4 h-4" /> Sellers
                        </a>
                        <a href="/admin/products" className="hover:text-primary transition-colors flex items-center gap-2 px-3 py-1.5 rounded-lg">
                            <ShoppingBag className="w-4 h-4" /> Products
                        </a>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                        <Users className="w-5 h-5" />
                    </Button>
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                        AD
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Seller Management</h2>
                        <p className="text-muted-foreground text-lg">Review and manage seller applications and active boutiques.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button className="rounded-xl h-12 px-6 gap-2">
                            <Mail className="w-4 h-4" /> Invite Seller
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-white rounded-[1.5rem] border-none shadow-sm p-6 space-y-2">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Sellers</p>
                        <p className="text-4xl font-bold">128</p>
                        <div className="flex items-center text-xs text-green-500 font-bold gap-1 mt-2">
                            <CheckCircle className="w-3 h-3" /> +12 this month
                        </div>
                    </Card>
                    <Card className="bg-white rounded-[1.5rem] border-none shadow-sm p-6 space-y-2">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Active Products</p>
                        <p className="text-4xl font-bold">2.4k</p>
                        <div className="flex items-center text-xs text-primary font-bold gap-1 mt-2">
                            <ShoppingBag className="w-3 h-3" /> Growth: 8%
                        </div>
                    </Card>
                    <Card className="bg-white rounded-[1.5rem] border-none shadow-sm p-6 space-y-2 border-l-4 border-amber-400">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Pending Apps</p>
                        <p className="text-4xl font-bold text-amber-500">{applications.length}</p>
                        <div className="flex items-center text-xs text-amber-500 font-bold gap-1 mt-2">
                            <Clock className="w-3 h-3" /> Response time: 2h
                        </div>
                    </Card>
                    <Card className="bg-white rounded-[1.5rem] border-none shadow-sm p-6 space-y-2">
                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Rejection Rate</p>
                        <p className="text-4xl font-bold">14%</p>
                        <div className="flex items-center text-xs text-red-500 font-bold gap-1 mt-2">
                            <XCircle className="w-3 h-3" /> Quality control
                        </div>
                    </Card>
                </div>

                {/* Applications Table/List Area */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex bg-white rounded-full p-1 border border-border/60 shadow-sm gap-1">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-[#2D241E] text-white shadow-lg' : 'text-muted-foreground hover:bg-black/5'}`}
                            >
                                All Applications
                            </button>
                            <button
                                onClick={() => setActiveTab("pending")}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'pending' ? 'bg-amber-500 text-white shadow-lg' : 'text-muted-foreground hover:bg-black/5'}`}
                            >
                                Pending Review
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input placeholder="Search applicants..." className="pl-12 rounded-full h-11 bg-white border-none shadow-sm" />
                            </div>
                            <Button variant="outline" size="icon" className="rounded-full h-11 w-11 shadow-sm">
                                <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {applications.length > 0 ? (
                                applications.map((app, index) => (
                                    <motion.div
                                        key={app.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white group">
                                            <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-8">
                                                {/* Logo/Image */}
                                                <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-[2rem] overflow-hidden bg-muted flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                                    <NextImage src={app.logo} alt={app.brandName} fill className="object-cover" />
                                                </div>

                                                {/* Application Info */}
                                                <div className="flex-grow space-y-4">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <h3 className="text-2xl font-bold text-[#2D241E]">{app.brandName}</h3>
                                                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 font-bold">Pending Review</Badge>
                                                        <span className="text-sm text-muted-foreground font-medium flex items-center gap-1.5 ml-auto">
                                                            Applied on {app.date}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Founder</p>
                                                            <p className="font-bold flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> {app.fullName}</p>
                                                            <p className="text-sm text-muted-foreground">{app.email}</p>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Focus</p>
                                                            <p className="font-bold flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-primary" /> {app.category}</p>
                                                            <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.location}</p>
                                                        </div>
                                                        <div className="space-y-1 md:col-span-1">
                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Bio Preview</p>
                                                            <p className="text-sm text-muted-foreground italic line-clamp-2">"{app.bio}"</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-3 w-full md:w-auto">
                                                    <Button
                                                        onClick={() => handleApprove(app.id, app.brandName)}
                                                        className="rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold h-12 px-8 shadow-lg shadow-green-500/20"
                                                    >
                                                        <Check className="w-4 h-4 mr-2" /> Approve
                                                    </Button>
                                                    <div className="flex gap-3">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => handleReject(app.id, app.brandName)}
                                                            className="flex-1 rounded-xl border-red-100 text-red-500 hover:bg-red-50 font-bold h-11"
                                                        >
                                                            <X className="w-4 h-4 mr-2" /> Reject
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-[#FDFBF7]">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-border/50"
                                >
                                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-primary/30" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#2D241E]">Inbox Zero!</h3>
                                    <p className="text-muted-foreground mt-2">All applications have been processed. Great job!</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    )
}
