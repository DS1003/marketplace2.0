"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard, Package, ShoppingCart, Users,
    Settings, Plus, BarChart3, Bell, Search, Globe, Menu, X
} from "lucide-react"
import NextImage from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export default function SellerDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const pathname = usePathname()

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/seller/dashboard" },
        { icon: Package, label: "Products", href: "/seller/dashboard/products" },
        { icon: ShoppingCart, label: "Orders", href: "/seller/dashboard/orders" },
        { icon: Users, label: "Customers", href: "/seller/dashboard/customers" },
        { icon: BarChart3, label: "Analytics", href: "/seller/dashboard/analytics" },
    ]

    const supportItems = [
        { icon: Settings, label: "Settings", href: "/seller/dashboard/settings" },
        { icon: Globe, label: "View Boutique", href: "/sellers/koba-skin" }, // Hardcoded for demo
    ]

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex text-[#2D241E]">

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed h-screen bg-[#2D241E] text-white transition-all duration-500 z-50 flex flex-col",
                    sidebarOpen ? 'w-72' : 'w-24'
                )}
            >
                <div className="p-8 flex items-center justify-between">
                    <Link href="/" className="inline-block">
                        <AnimatePresence mode="wait">
                            {sidebarOpen ? (
                                <motion.div
                                    key="full-logo"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <NextImage
                                        src="/images/logo.png"
                                        alt="Moomel"
                                        width={120}
                                        height={40}
                                        className="h-8 w-auto brightness-0 invert"
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="small-logo"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center font-bold text-2xl italic text-primary"
                                >
                                    M
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>

                <nav className="flex-grow mt-4 px-4 space-y-2 overflow-y-auto hide-scrollbar">
                    {navItems.map((item) => (
                        <NavItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            active={pathname === item.href}
                            open={sidebarOpen}
                            href={item.href}
                        />
                    ))}

                    <div className="pt-10 pb-4">
                        {sidebarOpen && <p className="px-6 text-[10px] uppercase font-bold text-white/30 tracking-[0.3em] mb-4">Support & Store</p>}
                        {supportItems.map((item) => (
                            <NavItem
                                key={item.href}
                                icon={item.icon}
                                label={item.label}
                                open={sidebarOpen}
                                href={item.href}
                            />
                        ))}
                    </div>
                </nav>

                <div className="p-6">
                    <div className={cn(
                        "bg-white/5 rounded-[2rem] p-4 flex items-center gap-4 border border-white/10 transition-all",
                        sidebarOpen ? 'w-full' : 'w-12 mx-auto justify-center p-0 h-12 rounded-full overflow-hidden'
                    )}>
                        <div className="w-10 h-10 rounded-full bg-primary overflow-hidden border-2 border-primary/20 flex-shrink-0">
                            <NextImage src="https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=200" alt="Avatar" width={40} height={40} className="object-cover" />
                        </div>
                        {sidebarOpen && (
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-bold truncate">Anta Diouf</p>
                                <p className="text-[10px] text-white/50 truncate font-medium uppercase tracking-wider">Koba Skin Founder</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className={cn(
                "flex-grow flex flex-col transition-all duration-500",
                sidebarOpen ? 'ml-72' : 'ml-24'
            )}>
                {/* Global Header for Dashboard */}
                <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-6 flex-grow max-w-2xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search products, orders, customers..."
                                className="pl-14 h-14 bg-[#F8F9FA] border-none rounded-3xl text-base focus-visible:ring-primary/20 shadow-inner"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="relative rounded-2xl h-12 w-12 hover:bg-primary/5 transition-all">
                                <Bell className="w-6 h-6 text-[#2D241E]" />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white animate-pulse" />
                            </Button>
                        </div>
                        <Separator orientation="vertical" className="h-10" />
                        <Link href="/seller/dashboard/products/new">
                            <Button className="rounded-[1.5rem] h-14 px-8 gap-3 bg-[#2D241E] hover:bg-black text-white shadow-xl shadow-black/10 transition-all active:scale-95">
                                <Plus className="w-5 h-5 font-bold" />
                                <span className="font-bold">Add Product</span>
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="p-10 flex-grow">
                    {children}
                </main>
            </div>
        </div>
    )
}

function NavItem({
    icon: Icon,
    label,
    active = false,
    open = true,
    href
}: {
    icon: any,
    label: string,
    active?: boolean,
    open?: boolean,
    href: string
}) {
    return (
        <Link href={href}>
            <button
                className={cn(
                    "w-full flex items-center gap-5 px-6 py-4 rounded-[1.5rem] transition-all duration-300 group",
                    active
                        ? 'bg-primary text-white shadow-2xl shadow-primary/20'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                )}
            >
                <Icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", active ? 'text-white' : 'text-white/40 group-hover:text-primary')} />
                {open && <span className="font-bold text-base tracking-tight">{label}</span>}
                {active && open && (
                    <motion.div
                        layoutId="active-nav"
                        className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                    />
                )}
            </button>
        </Link>
    )
}
