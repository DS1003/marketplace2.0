"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle, 
  Clock, 
  Truck, 
  ShieldAlert,
  ChevronRight,
  Printer,
  Download,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const orders = [
  { id: "MOO-8829", customer: "Awa Gueye", date: "Mar 30, 2026", total: 145.00, items: 3, status: "Processing", method: "Orange Money" },
  { id: "MOO-8828", customer: "Mame Diouf", date: "Mar 29, 2026", total: 92.40, items: 1, status: "Delivered", method: "Visa Card" },
  { id: "MOO-8827", customer: "Ibrahim Fall", date: "Mar 29, 2026", total: 230.00, items: 4, status: "Shipped", method: "Wave" },
  { id: "MOO-8826", customer: "Fatou Kane", date: "Mar 28, 2026", total: 12.00, items: 1, status: "Cancelled", method: "Cash" },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Order Fulfilment</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Manage and track ritual sales through the marketplace.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-10 rounded-lg border-zinc-200 text-slate-700 font-bold uppercase tracking-widest text-[9px] px-6 bg-white shadow-sm">
             <Download className="mr-2 h-3.5 w-3.5" /> CSV Report
           </Button>
           <Button className="h-10 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm">
              <Printer className="mr-2 h-3.5 w-3.5" /> Print All
           </Button>
        </div>
      </div>

       {/* Filters */}
       <div className="flex flex-col md:flex-row items-center gap-3 bg-white/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-200/50 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by ID, customer name..." 
            className="bg-white border-none rounded-lg h-10 pl-10 text-[13px] font-medium focus:ring-1 focus:ring-primary/10 transition-all w-full shadow-inner"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-200 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700 shadow-sm">
            <Filter className="h-3.5 w-3.5" /> Status
          </Button>
           <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-200 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700 shadow-sm">
            Today
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-50/50 border-b border-zinc-50 font-bold text-slate-400">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Rituals</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Value</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">State</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Method</th>
                  <th className="px-6 py-4 text-right"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/20 transition-all duration-300">
                  <td className="px-6 py-4">
                     <span className="text-[13px] font-bold text-slate-900 tracking-tight">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-slate-700 leading-none">{order.customer}</span>
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1">{order.date}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">{order.items} Items</span>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[14px] font-bold text-slate-900 underline decoration-primary/20 underline-offset-4">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="ghost" className={cn(
                      "h-5 rounded-md uppercase text-[8px] font-bold px-2 tracking-widest",
                      order.status === "Processing" ? "bg-amber-50 text-amber-600" :
                      order.status === "Delivered" ? "bg-emerald-50 text-emerald-600" :
                      order.status === "Shipped" ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
                    )}>
                       {order.status === "Processing" && <Clock className="h-2.5 w-2.5 mr-1" />}
                       {order.status === "Delivered" && <CheckCircle className="h-2.5 w-2.5 mr-1" />}
                       {order.status === "Shipped" && <Truck className="h-2.5 w-2.5 mr-1" />}
                       {order.status === "Cancelled" && <AlertCircle className="h-2.5 w-2.5 mr-1" />}
                       {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.method}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white shadow-none transition-all group-hover:border border-zinc-100">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 p-2 rounded-xl shadow-2xl border-none bg-white">
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700">
                             <Eye className="h-3.5 w-3.5 mr-2 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Order Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700">
                             <Truck className="h-3.5 w-3.5 mr-2 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Track Shipping</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-50 mx-1 my-1" />
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-rose-50 text-rose-500 group transition-all">
                             <ShieldAlert className="h-3.5 w-3.5 mr-2" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Fraud Check</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Empty State Mockup */}
      <div className="flex bg-slate-50 border border-dashed border-zinc-200 rounded-2xl h-16 items-center px-6 justify-between">
         <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Live order flow active. Listening for new rituals...</span>
         <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </div>
  )
}
