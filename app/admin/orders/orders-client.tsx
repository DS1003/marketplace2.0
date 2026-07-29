"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, SearchNormal, Filter, More, Eye, TickCircle, Clock, TruckFast, ShieldCross, ArrowRight2, Printer, Import, Danger } from "reicon-react"
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

import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { updateOrderStatus } from "@/lib/actions/admin"
import Link from "next/link"

export default function AdminOrdersClient({ initialOrders = [] }: { initialOrders?: any[] }) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<any>(null)
  const [newStatus, setNewStatus] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const filteredOrders = initialOrders.filter((order: any) => {
    const customerName = order.user?.name || "Unknown"
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                          customerName.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleUpdateStatus = async () => {
      if (!selectedOrderStatus || !newStatus) return
      setIsUpdating(true)
      try {
          await updateOrderStatus(selectedOrderStatus.id, newStatus)
          toast.success("Status updated successfully")
          setSelectedOrderStatus(null)
      } catch (error) {
          toast.error("Error updating status")
      } finally {
          setIsUpdating(false)
      }
  }

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
             <Import className="mr-2 h-3.5 w-3.5" /> CSV Report
           </Button>
           <Button className="h-10 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm">
              <Printer className="mr-2 h-3.5 w-3.5" /> Print All
           </Button>
        </div>
      </div>

       {/* Filters */}
       <div className="flex flex-col md:flex-row items-center gap-3 bg-white/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-200/50 shadow-sm">
        <div className="relative flex-1 group">
          <SearchNormal className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search by ID, customer name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white border-none rounded-lg h-10 pl-10 text-[13px] font-medium focus:ring-1 focus:ring-primary/10 transition-all w-full shadow-inner"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-200 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700 shadow-sm">
                <Filter className="h-3.5 w-3.5" /> {statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl">
              {['ALL', 'PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((s) => (
                <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)} className="text-[10px] font-bold uppercase tracking-widest cursor-pointer">
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
              {paginatedOrders.map((order: any) => (
                <tr key={order.id} className="group hover:bg-slate-50/20 transition-all duration-300">
                  <td className="px-6 py-4">
                     <span className="text-[13px] font-bold text-slate-900 tracking-tight">#{order.id.slice(0, 8)}</span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <span className="text-[13px] font-semibold text-slate-700 leading-none">{order.user?.name || "Unknown"}</span>
                        <span className="text-[10px] text-slate-400 font-medium italic mt-1">{format(new Date(order.createdAt), "MMM d, yyyy")}</span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                         <span className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">
                            {order.items.reduce((acc: number, curr: any) => acc + curr.quantity, 0)} Items
                         </span>
                         <span className="text-[10px] text-slate-400 mt-1 truncate max-w-[150px]" title={Array.from(new Set(order.items.map((i: any) => i.product?.shop?.name))).filter(Boolean).join(", ")}>
                            {Array.from(new Set(order.items.map((i: any) => i.product?.shop?.name))).filter(Boolean).join(", ")}
                         </span>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[14px] font-bold text-slate-900 underline decoration-primary/20 underline-offset-4">{order.total.toFixed(2)} FCFA</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn(
                      "h-5 rounded-md uppercase text-[8px] font-bold px-2 tracking-widest",
                      (order.status === "PENDING" || order.status === "PAID") ? "bg-amber-50 text-amber-600" :
                      order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600" :
                      order.status === "SHIPPED" ? "bg-blue-50 text-blue-600" : "bg-rose-50 text-rose-600"
                    )}>
                       {(order.status === "PENDING" || order.status === "PAID") && <Clock className="h-2.5 w-2.5 mr-1" />}
                       {order.status === "DELIVERED" && <TickCircle className="h-2.5 w-2.5 mr-1" />}
                       {order.status === "SHIPPED" && <TruckFast className="h-2.5 w-2.5 mr-1" />}
                       {order.status === "CANCELLED" && <Danger className="h-2.5 w-2.5 mr-1" />}
                       {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white shadow-none transition-all group-hover:border border-zinc-100">
                          <More className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 p-2 rounded-xl shadow-2xl border-none bg-white">
                        <DropdownMenuItem asChild className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700 cursor-pointer">
                          <Link href={`/admin/orders/${order.id}`}>
                             <Eye className="h-3.5 w-3.5 mr-2 text-primary" />
                             <span className="text-[9px] font-bold uppercase tracking-widest">Order Details</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setSelectedOrderStatus(order); setNewStatus(order.status); }} className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700 cursor-pointer">
                             <TruckFast className="h-3.5 w-3.5 mr-2 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Update Status</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-50 mx-1 my-1" />
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700" asChild>
                          <a href={`/api/invoice/${order.id}`} download>
                             <Import className="h-3.5 w-3.5 mr-2 text-primary" />
                             <span className="text-[9px] font-bold uppercase tracking-widest">Download Invoice</span>
                          </a>
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
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-zinc-200/50 shadow-sm mt-4">
              <span className="text-[12px] text-slate-500 font-medium">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}>Previous</Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}>Next</Button>
              </div>
          </div>
      )}

      {/* Update Status Dialog */}
      <Dialog open={!!selectedOrderStatus} onOpenChange={(open) => !open && setSelectedOrderStatus(null)}>
        <DialogContent className="bg-white border-none shadow-2xl">
           <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
              <DialogDescription>Change the status of order #{selectedOrderStatus?.id.slice(0, 8)}</DialogDescription>
           </DialogHeader>
           <div className="py-4">
              <Select value={newStatus} onValueChange={setNewStatus}>
                 <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                 </SelectTrigger>
                 <SelectContent>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="PAID">PAID</SelectItem>
                    <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                    <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                    <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                 </SelectContent>
              </Select>
           </div>
           <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedOrderStatus(null)}>Cancel</Button>
              <Button onClick={handleUpdateStatus} disabled={isUpdating}>
                 {isUpdating ? "Updating..." : "Update Status"}
              </Button>
           </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Empty State Mockup */}
      <div className="flex bg-slate-50 border border-dashed border-zinc-200 rounded-2xl h-16 items-center px-6 justify-between">
         <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Live order flow active. Listening for new rituals...</span>
         <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </div>
  )
}
