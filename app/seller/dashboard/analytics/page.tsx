"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    BarChart3, TrendingUp, TrendingDown,
    ArrowUpRight, ArrowDownRight, Globe,
    Monitor, Smartphone, UserPlus, ShoppingBag,
    Zap, MousePointer2, Calendar
} from "lucide-react"
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar,
    Cell, PieChart, Pie
} from 'recharts'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// --- Mock Data ---
const revenueData = [
    { name: 'Mon', value: 120000 },
    { name: 'Tue', value: 450000 },
    { name: 'Wed', value: 300000 },
    { name: 'Thu', value: 650000 },
    { name: 'Fri', value: 800000 },
    { name: 'Sat', value: 950000 },
    { name: 'Sun', value: 500000 },
]

const categoryData = [
    { name: 'Skincare', value: 45, color: '#D4AF37' },
    { name: 'Oils', value: 30, color: '#2D241E' },
    { name: 'Soaps', value: 15, color: '#7C6F64' },
    { name: 'Other', value: 10, color: '#A89984' },
]

export default function SellerAnalyticsPage() {
    const [timeRange, setTimeRange] = useState("7D")

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h2 className="text-5xl font-bold tracking-tight text-[#2D241E] italic">Business <span className="text-primary not-italic">Insights</span></h2>
                    <p className="text-muted-foreground text-xl mt-3 font-medium">Deep dive into your store's performance metrics.</p>
                </div>
                <div className="flex bg-white/70 backdrop-blur-md rounded-[2rem] p-2 border shadow-xl shadow-black/5 ring-1 ring-black/5">
                    {["24H", "7D", "30D", "1Y"].map((range) => (
                        <Button
                            key={range}
                            variant="ghost"
                            size="sm"
                            onClick={() => setTimeRange(range)}
                            className={cn(
                                "rounded-[1.5rem] px-8 py-6 font-black text-xs uppercase tracking-widest transition-all",
                                timeRange === range ? "bg-primary text-white shadow-2xl shadow-primary/30" : "text-muted-foreground hover:bg-black/5"
                            )}
                        >
                            {range}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Performance Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <InsightCard
                    label="Growth Rate"
                    value="+24.8%"
                    icon={TrendingUp}
                    color="text-green-500"
                    sub="Higher than usual"
                    bg="bg-green-500/5"
                />
                <InsightCard
                    label="Active Sessions"
                    value="1,482"
                    icon={Zap}
                    color="text-primary"
                    sub="Real-time view"
                    bg="bg-primary/5"
                />
                <InsightCard
                    label="Avg. Session"
                    value="4m 32s"
                    icon={Monitor}
                    color="text-blue-500"
                    sub="Desktop & Mobile"
                    bg="bg-blue-500/5"
                />
                <InsightCard
                    label="New Signups"
                    value="84"
                    icon={UserPlus}
                    color="text-amber-500"
                    sub="This week only"
                    bg="bg-amber-500/5"
                />
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Revenue Evolution */}
                <Card className="lg:col-span-2 rounded-[3.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden p-10">
                    <div className="flex justify-between items-center mb-10">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-[#2D241E]">Revenue Evolution</h3>
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Weekly Performance</p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold text-primary">3,850,000 FCFA</p>
                            <p className="text-xs font-bold text-green-500 flex items-center justify-end gap-1 mt-1">
                                <ArrowUpRight className="w-4 h-4" /> +15.4% VS PREV. WEEK
                            </p>
                        </div>
                    </div>
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 12, fontWeight: 'bold' }}
                                    dy={20}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A0AEC0', fontSize: 12, fontWeight: 'bold' }}
                                    tickFormatter={(val) => `${val / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '1.5rem',
                                        border: 'none',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                                        padding: '1.5rem',
                                        fontWeight: 'bold'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#D4AF37"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Categories Mix */}
                <Card className="rounded-[3.5rem] border-none shadow-2xl shadow-black/5 bg-white p-10 flex flex-col items-center justify-center">
                    <div className="text-center w-full mb-10">
                        <h3 className="text-2xl font-bold text-[#2D241E]">Category Mix</h3>
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.2em] mt-2">Sales Distribution</p>
                    </div>
                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-3xl font-black text-[#2D241E]">100%</p>
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Global</p>
                        </div>
                    </div>
                    <div className="w-full space-y-4 mt-10">
                        {categoryData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="font-bold text-sm text-[#4A3D36]">{item.name}</span>
                                </div>
                                <span className="font-black text-sm text-primary">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Bottom Section: Geography & Retention */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card className="rounded-[3rem] border-none shadow-xl shadow-black/5 bg-[#2D241E] text-white p-10 group overflow-hidden relative">
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                    <div className="relative space-y-8">
                        <div className="flex justify-between items-start">
                            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl">
                                <Globe className="w-10 h-10 text-primary" />
                            </div>
                            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 font-black text-[10px] tracking-[0.2em] uppercase">Detailed Map <ArrowUpRight className="ml-2 w-4 h-4" /></Button>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold italic">Global <span className="text-primary not-italic">Reach</span></h3>
                            <p className="text-white/40 text-lg font-medium">Your products are trending in 4 major regions.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <GeoMetric label="Dakar & Suburbs" value="65%" />
                            <GeoMetric label="Saint-Louis" value="15%" />
                            <GeoMetric label="Casamance" value="12%" />
                            <GeoMetric label="International (FR/US)" value="8%" />
                        </div>
                    </div>
                </Card>

                <Card className="rounded-[3rem] border-none shadow-xl shadow-black/5 bg-white p-10 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <MousePointer2 className="w-6 h-6 text-primary" />
                            <h3 className="text-2xl font-bold text-[#2D241E]">Customer Retention</h3>
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed">Anta, your loyalty programs are boosting repeat purchases by <span className="text-green-500 font-bold">+18% compared to last quarter</span>.</p>
                    </div>
                    <div className="pt-10 flex items-center gap-8">
                        <div className="flex-grow space-y-3">
                            <div className="flex justify-between items-end border-b pb-2 border-border/50">
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">LTV (Lifetime Value)</p>
                                <p className="text-2xl font-bold text-primary">125k FCFA</p>
                            </div>
                            <div className="flex justify-between items-end border-b pb-2 border-border/50">
                                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Churn Rate</p>
                                <p className="text-2xl font-bold text-[#2D241E]">4.2%</p>
                            </div>
                        </div>
                        <div className="w-24 h-24 rounded-full border-8 border-primary/20 flex items-center justify-center p-2">
                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-xl font-black">A+</div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

function InsightCard({ label, value, icon: Icon, color, sub, bg }: { label: string, value: string, icon: any, color: string, sub: string, bg: string }) {
    return (
        <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 bg-white p-8 group hover:shadow-primary/10 transition-all overflow-hidden relative">
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", bg)} />
            <div className="relative space-y-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", bg.replace('/5', '/10'))}>
                    <Icon className={cn("w-6 h-6", color)} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground mb-1">{label}</p>
                    <p className={cn("text-3xl font-black", color)}>{value}</p>
                </div>
                <p className="text-xs font-bold text-muted-foreground/60 flex items-center gap-1.5 pt-2 border-t border-border/40">
                    <Calendar className="w-3.5 h-3.5" /> {sub}
                </p>
            </div>
        </Card>
    )
}

function GeoMetric({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>{label}</span>
                <span className="text-primary">{value}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: value }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                />
            </div>
        </div>
    )
}
