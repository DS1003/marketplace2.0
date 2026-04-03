"use client"

import { motion } from "framer-motion"
import { 
  Activity, TrendingUp, Users, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, Calendar,
  BarChart3, PieChart, MousePointer2, Zap,
  Search, ShieldCheck, Target
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { name: 'Lun', visits: 400, sales: 240, flow: 2400 },
  { name: 'Mar', visits: 300, sales: 139, flow: 2210 },
  { name: 'Mer', visits: 200, sales: 980, flow: 2290 },
  { name: 'Jeu', visits: 278, sales: 390, flow: 2000 },
  { name: 'Ven', visits: 189, sales: 480, flow: 2181 },
  { name: 'Sam', visits: 239, sales: 380, flow: 2500 },
  { name: 'Dim', visits: 349, sales: 430, flow: 2100 },
]

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-teal-600 fill-teal-600" />
                <h2 className="text-xl font-black tracking-tight text-slate-800 uppercase">Analytique & Flux</h2>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Rapport métrique du protocole artisanal moomel.</p>
        </div>
        <div className="flex bg-white rounded-xl p-1 border border-zinc-100 shadow-sm shrink-0">
          <Button variant="ghost" size="sm" className="rounded-lg px-4 font-black text-[9px] uppercase tracking-widest text-slate-500 hover:bg-slate-50">
            <Calendar className="mr-2 h-3.5 w-3.5" /> 30 Derniers Jours
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Visites Flux", value: "2,842", change: "+14.2%", icon: MousePointer2, color: "text-blue-500", bg: "bg-blue-50/50" },
          { label: "Conversion", value: "3.2%", change: "+2.1%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50/50" },
          { label: "Rétention Client", value: "85%", change: "+5.4%", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50/50" },
          { label: "Temps Immersion", value: "12min", change: "-0.5%", icon: Zap, color: "text-teal-500", bg: "bg-teal-50/50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-2xl border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className={cn("p-3 rounded-xl shadow-inner", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className={cn("flex items-center text-[9px] font-black uppercase tracking-widest", stat.change.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
                  {stat.change.startsWith('+') ? <ArrowUpRight className="w-2.5 h-2.5 mr-1" /> : <ArrowDownRight className="w-2.5 h-2.5 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-5">
                <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 rounded-[1.5rem] border-none shadow-sm bg-white p-6 lg:p-8">
          <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
            <div className="space-y-1">
                <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-widest">Activité du Flux</CardTitle>
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Usage mensuel par ségment temporel</p>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Immersion</span>
                </div>
            </div>
          </CardHeader>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 900 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fill: '#94a3b8', fontWeight: 900 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area type="monotone" dataKey="flow" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorFlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Secondary Insights */}
        <Card className="rounded-[1.5rem] border-none shadow-sm bg-[#0F172A] text-white p-6 lg:p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />
          
          <CardHeader className="p-0 mb-8">
            <CardTitle className="text-sm font-black text-white uppercase tracking-widest">Performances Produits</CardTitle>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Ségmentation par catégorie</p>
          </CardHeader>
          
          <div className="space-y-6 flex-1">
            {[
              { label: "Savons Rituel", value: 85, color: "bg-teal-500" },
              { label: "Huiles Essentielles", value: 62, color: "bg-indigo-500" },
              { label: "Crèmes Artisanales", value: 45, color: "bg-blue-500" },
              { label: "Accessoires", value: 28, color: "bg-slate-600" },
            ].map((cat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
                  <span className="text-slate-400">{cat.label}</span>
                  <span className="text-white">{cat.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.value}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                        className={cn("h-full rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)]", cat.color)} 
                    />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-5 bg-white/5 rounded-2xl border border-white/5 relative z-10 backdrop-blur-sm">
             <div className="flex items-center gap-3 mb-3">
                <Activity className="h-4 w-4 text-teal-400" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400">Insight Artisant</span>
             </div>
             <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-tight italic opacity-80">
                "Vos clients sont 40% plus actifs le week-end entre 18h et 22h. Pensez à synchroniser vos publications."
             </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
