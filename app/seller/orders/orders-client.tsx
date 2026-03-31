"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Eye, Clock, Truck, 
  CheckCircle2, XCircle, Filter, 
  MapPin, ShoppingBag, CreditCard,
  Phone, User, Calendar, ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { format } from "date-fns"

export default function SellerOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingAddress?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 border-none px-3 text-[10px] uppercase font-bold tracking-widest"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>
      case "SHIPPED":
        return <Badge className="bg-blue-500/10 text-blue-600 border-none px-3 text-[10px] uppercase font-bold tracking-widest"><Truck className="mr-1 h-3 w-3" /> Shipped</Badge>
      case "DELIVERED":
        return <Badge className="bg-green-500/10 text-green-600 border-none px-3 text-[10px] uppercase font-bold tracking-widest"><CheckCircle2 className="mr-1 h-3 w-3" /> Delivered</Badge>
      case "CANCELLED":
        return <Badge className="bg-red-500/10 text-red-600 border-none px-3 text-[10px] uppercase font-bold tracking-widest"><XCircle className="mr-1 h-3 w-3" /> Cancelled</Badge>
      default:
        return <Badge className="bg-gray-500/10 text-gray-600 border-none px-3 text-[10px] uppercase font-bold tracking-widest">{status}</Badge>
    }
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#2D241E]">Client Orders</h2>
          <p className="text-muted-foreground mt-1 font-light">Monitor and fulfill ritual acquisitions from your community.</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-10 px-4 rounded-full bg-[#2D241E]/5 flex items-center gap-2 border border-[#2D241E]/10">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-[#2D241E] uppercase tracking-widest">Real-time Sync</span>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Order ID or Location..."
            className="pl-9 h-12 border-border/60 bg-white/50 rounded-full focus:ring-2 focus:ring-[#2D241E]/10 transition-all font-light"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="rounded-full h-12 border-border/60 hover:bg-[#2D241E]/5 font-light transition-colors">
                <Filter className="mr-2 h-4 w-4" /> All Status
            </Button>
            <Button variant="outline" className="rounded-full h-12 border-border/60 hover:bg-[#2D241E]/5 font-light transition-colors">
                <Calendar className="mr-2 h-4 w-4" /> This Month
            </Button>
        </div>
      </div>

      <Card className="border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
        <Table>
          <TableHeader className="bg-[#2D241E]/[0.02]">
            <TableRow className="border-border/40 hover:bg-transparent">
              <TableHead className="py-6 pl-8 font-bold uppercase tracking-widest text-[10px]">Order ID</TableHead>
              <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px]">Date</TableHead>
              <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px]">Customer</TableHead>
              <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px]">Total</TableHead>
              <TableHead className="py-6 font-bold uppercase tracking-widest text-[10px]">Status</TableHead>
              <TableHead className="py-6 pr-8 text-right font-bold uppercase tracking-widest text-[10px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="border-border/30 hover:bg-[#2D241E]/[0.01] transition-colors group">
                <TableCell className="py-5 pl-8">
                  <span className="font-mono text-xs font-bold text-[#2D241E]">#{order.id.slice(-6).toUpperCase()}</span>
                </TableCell>
                <TableCell className="py-5">
                  <span className="text-sm font-light">{format(new Date(order.createdAt), "MMM dd, yyyy")}</span>
                </TableCell>
                <TableCell className="py-5">
                   <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-full bg-[#2D241E]/10 flex items-center justify-center text-[#2D241E] font-bold text-[10px]">
                        {order.user?.name?.charAt(0) || "U"}
                     </div>
                     <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#2D241E]">{order.user?.name || "Customer"}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{order.location || "Dakar"}</span>
                     </div>
                   </div>
                </TableCell>
                <TableCell className="py-5 font-bold text-[#2D241E]">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell className="py-5">
                  {getStatusBadge(order.status)}
                </TableCell>
                <TableCell className="py-5 pr-8 text-right">
                  <Button 
                    onClick={() => handleViewOrder(order)}
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full h-8 px-4 hover:bg-[#2D241E]/10 transition-colors font-bold text-[10px] uppercase tracking-widest group-hover:bg-[#2D241E] group-hover:text-white"
                  >
                    Details <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 opacity-20">
                    <ShoppingBag className="h-12 w-12" />
                    <p className="font-bold text-lg uppercase tracking-widest">No Rituals Ordered</p>
                    <p className="text-sm font-light">Your community hasn't claimed any rituals yet.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/60 backdrop-blur-sm border-none shadow-xl shadow-black/5 rounded-[2rem] p-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Daily Revenue</p>
              <h4 className="text-2xl font-bold text-[#2D241E]">$428.50</h4>
              <div className="mt-2 flex items-center text-[10px] text-green-600 font-bold uppercase">
                  +12.5% from yesterday
              </div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-none shadow-xl shadow-black/5 rounded-[2rem] p-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Active Shipments</p>
              <h4 className="text-2xl font-bold text-[#2D241E]">14</h4>
              <div className="mt-2 flex items-center text-[10px] text-blue-600 font-bold uppercase">
                  All within ETA
              </div>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-none shadow-xl shadow-black/5 rounded-[2rem] p-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Open Issues</p>
              <h4 className="text-2xl font-bold text-[#2D241E]">1</h4>
              <div className="mt-2 flex items-center text-[10px] text-amber-600 font-bold uppercase">
                  1 unread message
              </div>
          </Card>
          <Card className="bg-[#2D241E] border-none shadow-xl shadow-black/10 rounded-[2rem] p-6 text-white">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-2">Total Managed</p>
              <h4 className="text-2xl font-bold">$12,482.00</h4>
              <div className="mt-2 text-[10px] text-white/60 uppercase tracking-widest font-light">
                  Last 30 days
              </div>
          </Card>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[2.5rem] border-none bg-white shadow-2xl">
          {selectedOrder && (
            <div className="flex flex-col h-full overflow-y-auto max-h-[85vh]">
              <div className="bg-[#2D241E] p-8 text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-1">Ritual Fulfillment</h3>
                        <p className="text-white/60 font-mono text-sm tracking-widest uppercase">#{selectedOrder.id.slice(-8).toUpperCase()}</p>
                    </div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                              <Calendar className="h-5 w-5 text-white/80" />
                          </div>
                          <div>
                              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Acquired Date</p>
                              <p className="text-sm font-medium">{format(new Date(selectedOrder.createdAt), "MMMM dd, yyyy")}</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                              <CreditCard className="h-5 w-5 text-white/80" />
                          </div>
                          <div>
                              <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Payment Strategy</p>
                              <p className="text-sm font-medium">Stripe / VISA</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="p-8 space-y-8">
                  {/* Customer Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#2D241E]">
                            <User className="h-4 w-4" />
                            <h4 className="font-bold text-[10px] uppercase tracking-widest">Patron Details</h4>
                        </div>
                        <div className="pl-6 space-y-1">
                            <p className="font-bold text-sm text-[#2D241E]">{selectedOrder.user?.name || "Customer Name"}</p>
                            <p className="text-xs text-muted-foreground">{selectedOrder.user?.email || "customer@example.com"}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> +221 77 XXX XX XX</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#2D241E]">
                            <MapPin className="h-4 w-4" />
                            <h4 className="font-bold text-[10px] uppercase tracking-widest">Destination</h4>
                        </div>
                        <div className="pl-6">
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                {selectedOrder.shippingAddress || "N/A"}
                            </p>
                        </div>
                    </div>
                  </div>

                  <Separator className="bg-border/40" />

                  {/* Items */}
                  <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[#2D241E]">
                          <ShoppingBag className="h-4 w-4" />
                          <h4 className="font-bold text-[10px] uppercase tracking-widest">Manifested Rituals</h4>
                      </div>
                      <div className="space-y-4">
                          {selectedOrder.orderItems?.map((item: any) => (
                              <div key={item.id} className="flex items-center justify-between group">
                                  <div className="flex items-center gap-3">
                                      <div className="h-12 w-12 rounded-xl bg-[#2D241E]/5 flex items-center justify-center font-bold text-[#2D241E]">
                                          {item.product?.name?.charAt(0) || "P"}
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="font-bold text-sm text-[#2D241E] group-hover:text-black">{item.product?.name}</span>
                                          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Quantity: {item.quantity}</span>
                                      </div>
                                  </div>
                                  <span className="font-bold text-sm text-[#2D241E]">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="bg-[#2D241E]/[0.02] p-6 rounded-3xl space-y-3">
                      <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
                          <span>Subtotal</span>
                          <span>${(selectedOrder.total - 5).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest">
                          <span>Ritual Logistic Fee</span>
                          <span>$5.00</span>
                      </div>
                      <Separator className="bg-border/30 my-2" />
                      <div className="flex justify-between font-bold text-lg text-[#2D241E]">
                          <span className="uppercase tracking-widest text-[10px] self-center">Grand Managed Total</span>
                          <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                      <Button className="flex-1 h-14 bg-[#2D241E] hover:bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/10">
                          <Truck className="mr-2 h-4 w-4" /> Dispatch Ritual
                      </Button>
                      <Button variant="outline" className="flex-1 h-14 rounded-2xl border-border/60 font-bold uppercase tracking-widest text-[10px] hover:bg-[#2D241E]/5">
                          <Eye className="mr-2 h-4 w-4" /> Communicate With Patron
                      </Button>
                  </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
