"use client"

import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Calendar,
  MessageCircle,
  MoreHorizontal,
  Edit,
  Eye,
  Clock,
  ExternalLink,
  ChevronRight,
  Box,
  Wallet,
  Zap,
  Plus,
  ShieldCheck,
  Star
} from "lucide-react"
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn, formatPrice } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import NextImage from "next/image"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// Mock chart data for seller (re-using admin style)
const chartData = [
  { name: 'Lun', revenue: 45000, orders: 12 },
  { name: 'Mar', revenue: 52000, orders: 15 },
  { name: 'Mer', revenue: 38000, orders: 8 },
  { name: 'Jeu', revenue: 61000, orders: 19 },
  { name: 'Ven', revenue: 48000, orders: 14 },
  { name: 'Sam', revenue: 75000, orders: 22 },
  { name: 'Dim', revenue: 92000, orders: 28 },
]

export default function SellerDashboardClient({
    dashboardData,
    pendingError
}: {
    dashboardData?: any;
    pendingError?: string | null;
}) {
    if (pendingError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-teal-50 text-teal-600 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-teal-500/10 border border-teal-100/50">
                    <Clock className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">Curation en cours</h1>
                  <p className="text-slate-400 text-[11px] font-bold leading-relaxed max-w-xs mx-auto uppercase tracking-widest opacity-80">
                      {pendingError}
                  </p>
                </div>
                <Link href="/account">
                    <Button variant="outline" className="rounded-xl h-10 px-8 bg-white hover:bg-slate-50 text-[9px] font-black uppercase tracking-[0.2em] text-slate-800 border-zinc-200 shadow-sm">
                        Retourner au profil
                    </Button>
                </Link>
            </div>
        )
    }

    const { shop, revenue, salesCount, productCount, recentOrders } = dashboardData!;
    const recentProducts = shop.products.slice(0, 4)

    const statsCards = [
        { label: "Chiffre d'Affaires", value: formatPrice(revenue), change: "+12.5%", trending: "up", icon: Wallet, color: "bg-teal-50 text-teal-600" },
        { label: "Ventes Totales", value: salesCount.toString(), change: "+8.2%", trending: "up", icon: ShoppingBag, color: "bg-sky-50 text-sky-600" },
        { label: "Mes Créations", value: productCount.toString(), change: "+2.4%", trending: "up", icon: Package, color: "bg-orange-50 text-orange-600" },
        { label: "Note Artisan", value: "4.8", change: "Expert", trending: "up", icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600" },
    ]

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {/* Minimalist Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
                    <span className="text-[9px] font-black text-teal-600 uppercase tracking-[0.2em]">Live Artisan Dashboard</span>
                  </div>
                  <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2 italic uppercase leading-none">
                    Atelier : <span className="text-teal-600 not-italic">{shop.name}</span>
                  </h1>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Générez l'excellence artisanale au Sénégal.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-8 rounded-lg text-slate-500 font-black uppercase tracking-widest text-[8px] px-4 bg-white border-zinc-200 hover:bg-slate-50 shadow-sm">
                    <Calendar className="mr-2 h-3 w-3" /> Rapports
                  </Button>
                  <Button className="h-8 rounded-lg bg-[#0F172A] text-white font-black uppercase tracking-widest text-[8px] px-5 shadow-lg shadow-black/10 hover:translate-y-[-0.5px] transition-all border-none">
                     <ExternalLink className="mr-2 h-3 w-3" /> Ma Boutique
                  </Button>
                </div>
            </div>

            {/* Refined Stats Grid (Smaller) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, idx) => (
                  <motion.div 
                    key={stat.label} 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card className="border-zinc-200/50 shadow-sm rounded-2xl overflow-hidden bg-white hover:border-teal-500/20 hover:shadow-xl hover:shadow-black/[0.02] transition-all duration-300 group">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn("p-2.5 rounded-xl transition-all group-hover:scale-110", stat.color)}>
                            <stat.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-none">{stat.value}</h3>
                          </div>
                        </div>
                        <div className={cn(
                          "text-[9px] font-black flex items-center px-1.5 py-0.5 rounded-lg uppercase transition-opacity opacity-0 group-hover:opacity-100",
                          stat.trending === "up" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                        )}>
                           {stat.change}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {/* Charts & Mini Table View (Refined Sizes) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-zinc-200/50 shadow-sm rounded-[1.5rem] bg-white overflow-hidden flex flex-col">
                  <CardHeader className="p-6 border-b border-zinc-50 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">Analytique de Revenu</CardTitle>
                        <p className="text-[10px] text-slate-400 tracking-tight italic mt-0.5 opacity-70">Volume d'affaires temps réel sur 7 jours.</p>
                      </div>
                      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-zinc-50">
                        <Button size="sm" variant="ghost" className="h-6 rounded-md px-3 text-[8px] font-black uppercase tracking-widest bg-white shadow-sm hover:bg-white text-slate-800 border-none">Ventes</Button>
                        <Button size="sm" variant="ghost" className="h-6 rounded-md px-3 text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">Flux</Button>
                      </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-1">
                    <div className="h-[240px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorSellerRevenueTeal" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0D9488" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 800 }}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 800 }}
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                            itemStyle={{ fontSize: '10px', fontWeight: 800, color: '#0F172A' }}
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#0D9488" strokeWidth={2} fillOpacity={1} fill="url(#colorSellerRevenueTeal)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Score Artisan & Performance (Refined) */}
                <Card className="border-zinc-200/50 shadow-sm rounded-[1.5rem] bg-white overflow-hidden flex flex-col p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">Artisan Master Score</h4>
                            <p className="text-[10px] text-slate-400 tracking-tight italic mt-0.5 opacity-70">Moyenne de satisfaction globale.</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                            <Star className="w-4 h-4 fill-teal-600" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-4xl font-black text-slate-800 tracking-tighter">4.8</span>
                        <div>
                            <div className="flex gap-0.5 mb-1">
                                {[1,2,3,4].map(s => <Star key={s} className="w-2.5 h-2.5 fill-teal-600 text-teal-600" />)}
                                <Star className="w-2.5 h-2.5 text-teal-200" />
                            </div>
                            <p className="text-[8px] font-black text-teal-600 uppercase tracking-widest">Grade Expert Actif</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-zinc-50 flex-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">Répartition Performance</p>
                        {recentProducts.slice(0, 3).map((p: any, i: number) => (
                            <div key={p.id} className="space-y-1.5">
                                <div className="flex justify-between items-end">
                                    <span className="text-[9px] font-bold text-slate-500 truncate max-w-[150px] uppercase tracking-wide">{p.name}</span>
                                    <span className="text-[9px] font-black text-teal-600">{85 - (i * 15)}%</span>
                                </div>
                                <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${85 - (i * 15)}%` }}
                                        className="h-full bg-teal-600 rounded-full" 
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-[#0F172A] p-4 rounded-xl text-white flex items-center gap-3">
                        <Zap className="w-4 h-4 text-teal-400 flex-shrink-0" />
                        <p className="text-[10px] font-medium leading-tight opacity-90 tracking-tight">Vos créations ont touché <span className="text-teal-400 font-bold">1.2k personnes</span> cette semaine.</p>
                    </div>
                </Card>
            </div>

            {/* Recent Orders & Inventory List (Smaller, Refined) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
                <Card className="lg:col-span-2 border-zinc-200/50 shadow-sm rounded-[1.5rem] bg-white overflow-hidden">
                    <CardHeader className="p-6 border-b border-zinc-50 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">Registre Historique</CardTitle>
                            <p className="text-[10px] text-slate-400 tracking-tight italic mt-0.5 opacity-70">Suivis des dernières transactions du lab.</p>
                        </div>
                        <Link href="/seller/orders">
                            <Button variant="ghost" className="text-[8px] font-black uppercase tracking-widest text-[#0D9488] h-6 px-3 hover:bg-teal-50 rounded-lg">Registre</Button>
                        </Link>
                    </CardHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-zinc-100">
                                    <th className="px-6 py-3 text-[8px] uppercase font-black tracking-widest text-slate-400">ID Unique</th>
                                    <th className="px-6 py-3 text-[8px] uppercase font-black tracking-widest text-slate-400">Patron</th>
                                    <th className="px-6 py-3 text-[8px] uppercase font-black tracking-widest text-slate-400">Horodatage</th>
                                    <th className="px-6 py-3 text-[8px] uppercase font-black tracking-widest text-slate-400 text-right">Somme</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-50">
                                {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-teal-50/20 transition-all group">
                                        <td className="px-6 py-3.5">
                                            <span className="text-[11px] font-black text-slate-800">#{order.id.slice(0, 6).toUpperCase()}</span>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="h-6 w-6 rounded-lg bg-teal-50 flex items-center justify-center text-[9px] font-black text-teal-600 border border-teal-100/50">
                                                    {(order.user.name || 'P').charAt(0)}
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-600">{order.user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-[10px] text-slate-400 font-bold uppercase tracking-tight">{format(new Date(order.createdAt), "dd MMM")}</td>
                                        <td className="px-6 py-3.5 text-right text-[11px] font-black text-slate-800">{formatPrice(order.shopTotal)}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest italic opacity-50">Registre vide.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Vertical Inventory Summary (Refined) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-700">Stocks Critique</h3>
                        <Link href="/seller/products">
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 hover:text-teal-600 transition-colors cursor-pointer">Gestion <ChevronRight className="w-2.5 h-2.5 inline-block" /></span>
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentProducts.map((p: any) => (
                            <motion.div key={p.id} whileHover={{ x: 2 }} className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl overflow-hidden shrink-0 border border-zinc-50 relative bg-slate-50">
                                    <NextImage src={p.images?.[0] || ""} alt={p.name} fill className="object-cover transition-all group-hover:scale-105" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-[10px] font-black text-slate-800 truncate leading-none uppercase mb-1">{p.name}</h4>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-bold text-teal-600">{formatPrice(p.price)}</span>
                                        <span className={cn(
                                          "text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md",
                                          p.stock < 10 ? "bg-rose-50 text-rose-500" : "bg-slate-50 text-slate-400"
                                        )}>{p.stock} UNITÉS</span>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg hover:bg-slate-100">
                                            <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-xl p-1.5 w-40 shadow-xl border-zinc-100 ring-1 ring-black/5 animate-in fade-in slide-in-from-right-1">
                                        <DropdownMenuItem asChild className="rounded-lg px-3 py-2 font-black text-[8px] uppercase tracking-widest cursor-pointer focus:bg-teal-50 focus:text-teal-700">
                                            <Link href={`/seller/products/edit/${p.id}`}>
                                                <Edit className="w-3 h-3 mr-2" /> Édition
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>
                        ))}
                        
                        <Link href="/seller/products/new" className="block pt-2">
                            <Button className="w-full h-10 rounded-xl bg-teal-600 text-white font-black uppercase tracking-widest text-[8px] shadow-lg shadow-teal-500/20 hover:bg-teal-700 hover:-translate-y-0.5 transition-all outline-none border-none">
                                <Plus className="w-3.5 h-3.5 mr-2" /> Nouveau Rituel
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
