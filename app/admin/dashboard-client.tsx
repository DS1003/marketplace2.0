"use client"

import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Store,
  Activity,
  Calendar,
} from "lucide-react"
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface DashboardProps {
  stats: any
}

const data = [
  { name: 'Mon', revenue: 4000, orders: 24 },
  { name: 'Tue', revenue: 3000, orders: 18 },
  { name: 'Wed', revenue: 2000, orders: 12 },
  { name: 'Thu', revenue: 2780, orders: 20 },
  { name: 'Fri', revenue: 1890, orders: 15 },
  { name: 'Sat', revenue: 2390, orders: 22 },
  { name: 'Sun', revenue: 3490, orders: 28 },
]

export default function AdminDashboardClient({ stats }: DashboardProps) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Business Overview</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Live data from your ritualist marketplace engine.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-lg text-slate-600 font-bold uppercase tracking-widest text-[9px] px-6 bg-white hover:bg-slate-50">
            <Calendar className="mr-2 h-3.5 w-3.5" /> Reports
          </Button>
          <Button className="h-10 rounded-lg bg-primary text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm hover:translate-y-[-1px] transition-all">
             Export Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Gross Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, change: "+12.5%", trending: "up", icon: DollarSign, color: "bg-emerald-50 text-emerald-600" },
          { label: "Total Orders", value: stats.totalOrders.toString(), change: "+8.2%", trending: "up", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
          { label: "Active Shops", value: stats.totalShops.toString(), change: "+2.4%", trending: "up", icon: Store, color: "bg-amber-50 text-amber-600" },
          { label: "Avg Ticket", value: `$${stats.avgTicket.toFixed(2)}`, change: "+5.1%", trending: "up", icon: Activity, color: "bg-violet-50 text-violet-600" },
        ].map((stat, idx) => (
          <motion.div 
            key={stat.label} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="border-zinc-200/50 shadow-sm rounded-2xl overflow-hidden bg-white hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-2.5 rounded-lg", stat.color)}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  {stat.trending === "up" ? (
                    <span className="text-emerald-500 text-[11px] font-bold flex items-center bg-emerald-50 px-2 py-0.5 rounded-md"><ArrowUpRight className="mr-0.5 h-3 w-3" /> {stat.change}</span>
                  ) : (
                    <span className="text-rose-500 text-[11px] font-bold flex items-center bg-rose-50 px-2 py-0.5 rounded-md"><ArrowDownRight className="mr-0.5 h-3 w-3" /> {stat.change}</span>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="p-6 border-b border-zinc-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-slate-800 tracking-tight">Revenue Trends</CardTitle>
                <p className="text-[11px] text-slate-400 tracking-tight mt-0.5">Weekly volume and gross metrics.</p>
              </div>
              <div className="flex gap-1 bg-slate-50 p-1 rounded-lg">
                <Button size="sm" variant="ghost" className="h-7 rounded-md px-3 text-[10px] font-bold uppercase tracking-widest bg-white shadow-sm hover:bg-white text-slate-800">Sales</Button>
                <Button size="sm" variant="ghost" className="h-7 rounded-md px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800">Volume</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4a574" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#d4a574" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                    itemStyle={{ fontSize: '11px', fontWeight: 600 }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#d4a574" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="p-6 border-b border-zinc-100">
            <CardTitle className="text-base font-bold text-slate-800 tracking-tight">Performance</CardTitle>
            <p className="text-[11px] text-slate-400 tracking-tight mt-0.5">Top-selling artisan categories.</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={[
                  { name: 'Rituals', value: 85, fill: '#d4a574' },
                  { name: 'Beauty', value: 72, fill: '#D1BDAB' },
                  { name: 'Decor', value: 64, fill: '#94a3b8' },
                  { name: 'Essences', value: 45, fill: '#cbd5e1' },
                ]} margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }}
                    width={70}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardHeader className="p-6 pb-4 border-b border-zinc-50 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-800 tracking-tight">Recent Orders</CardTitle>
              <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-primary h-8 px-3">View Full Register</Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-zinc-50">
                  <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-400">Order ID</th>
                  <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-400">Customer</th>
                  <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-400">Time</th>
                  <th className="px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-slate-400 text-right">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                       <span className="text-[13px] font-bold text-slate-800">#{order.id.slice(0, 8)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {order.user.charAt(0)}
                        </div>
                        <span className="text-[13px] font-semibold text-slate-700">{order.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-slate-400 font-medium">{format(new Date(order.createdAt), "MMM d, HH:mm")}</td>
                    <td className="px-6 py-4 text-right text-[13px] font-bold text-slate-800">${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Market Status and Growth */}
        <div className="space-y-6">
           <Card className="border-none shadow-sm rounded-2xl bg-slate-900 text-white p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="h-9 w-9 rounded-lg bg-white/10 flex items-center justify-center text-primary"><TrendingUp className="h-4 w-4" /></div>
                <h3 className="text-xl font-bold tracking-tight">Market Growth</h3>
                <p className="text-[13px] text-white/40 leading-relaxed italic">You have {stats.totalUsers} manual ritualists and artisans in your ecosystem.</p>
                <div className="flex items-end gap-1">
                   <span className="text-3xl font-bold tracking-tight text-white">{stats.totalProducts}</span>
                   <span className="text-[10px] font-bold uppercase text-white/40 mb-1 leading-none tracking-widest">Active Rituals</span>
                </div>
              </div>
           </Card>

           <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white p-6">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Database Health</h4>
              <div className="space-y-3">
                 <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">100%</span>
                    <span className="text-[10px] font-bold uppercase text-emerald-500">Normal</span>
                 </div>
                 <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} className="h-full bg-primary rounded-full" />
                 </div>
                 <p className="text-[11px] text-slate-400 italic">Connected to Neon DB Cluster</p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  )
}
