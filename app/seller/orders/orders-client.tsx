"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Eye, Clock, Truck, 
  CheckCircle2, XCircle, Filter, 
  MapPin, ShoppingBag, CreditCard,
  Phone, User, Calendar, ChevronRight,
  Zap, Package, ArrowRight, TrendingUp
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
import { updateOrderStatus } from "@/lib/actions/seller"
import { toast } from "sonner"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { formatPrice, cn } from "@/lib/utils"

export default function SellerOrdersClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.shippingAddress?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge className="bg-amber-500/10 text-amber-600 border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em]"><Clock className="mr-1 h-2.5 w-2.5" /> En Attente</Badge>
      case "SHIPPED":
        return <Badge className="bg-blue-500/10 text-blue-600 border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em]"><Truck className="mr-1 h-2.5 w-2.5" /> Expédié</Badge>
      case "DELIVERED":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em]"><CheckCircle2 className="mr-1 h-2.5 w-2.5" /> Livré</Badge>
      case "CANCELLED":
        return <Badge className="bg-rose-500/10 text-rose-600 border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em]"><XCircle className="mr-1 h-2.5 w-2.5" /> Annulé</Badge>
      default:
        return <Badge className="bg-slate-500/10 text-slate-600 border-none px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.2em]">{status}</Badge>
    }
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const onUpdateStatus = async (orderId: string, status: string) => {
    try {
        setUpdating(orderId)
        const res = await updateOrderStatus(orderId, status)
        if (res.success) {
            toast.success(`Flux mis à jour: ${status}`)
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
            if (selectedOrder?.id === orderId) {
                setSelectedOrder((prev: any) => ({ ...prev, status }))
            }
        } else {
            toast.error("Échec de synchronisation.")
        }
    } catch (e) {
        toast.error("Erreur protocole.")
    } finally {
        setUpdating(null)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <div className="flex items-center gap-2 mb-1">
                <ShoppingBag className="w-4 h-4 text-teal-600 fill-teal-600" />
                <h2 className="text-xl font-black tracking-tight text-slate-800 uppercase">Flux de Commandes</h2>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">Synchronisation des transactions artisanales moomel.</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="h-9 px-4 rounded-xl bg-slate-50 flex items-center gap-2 border border-zinc-100 shadow-inner">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-[0.2em]">Signal Actif</span>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            placeholder="N° Commande ou Client..."
            className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-zinc-100 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-teal-500/20 transition-all placeholder:text-slate-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl h-10 border-zinc-100 font-black text-[9px] uppercase tracking-widest hover:bg-slate-50">
                <Filter className="mr-2 h-3.5 w-3.5 text-slate-400" /> Tous les Statuts
            </Button>
            <Button variant="outline" className="rounded-xl h-10 border-zinc-100 font-black text-[9px] uppercase tracking-widest hover:bg-slate-50">
                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400" /> Période
            </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm bg-white rounded-[1.5rem] overflow-hidden">
        <div className="overflow-x-auto">
            <Table>
            <TableHeader className="bg-slate-50/50">
                <TableRow className="border-zinc-50 hover:bg-transparent">
                <TableHead className="h-12 pl-8 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Référence</TableHead>
                <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Horodatage</TableHead>
                <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Client / Flux</TableHead>
                <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Total (FCFA)</TableHead>
                <TableHead className="h-12 font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Statut</TableHead>
                <TableHead className="h-12 pr-8 text-right font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Gestion</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-zinc-50 hover:bg-slate-50/30 transition-colors group">
                    <TableCell className="py-4 pl-8">
                    <span className="font-mono text-[10px] font-black text-slate-600 uppercase tracking-widest">#{order.id.slice(-6).toUpperCase()}</span>
                    </TableCell>
                    <TableCell className="py-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{format(new Date(order.createdAt), "dd MMM yyyy", { locale: fr })}</span>
                    </TableCell>
                    <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-black text-[10px] border border-teal-100/50">
                            {order.user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-[12px] text-slate-800 uppercase tracking-tight">{order.user?.name || "Client"}</span>
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{order.location || "Dakar"}</span>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell className="py-4 font-black text-slate-800 text-[11px]">
                    {formatPrice(order.total)}
                    </TableCell>
                    <TableCell className="py-4">
                    {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="py-4 pr-8 text-right">
                    <Button 
                        onClick={() => handleViewOrder(order)}
                        variant="ghost" 
                        size="sm" 
                        className="rounded-lg h-8 px-4 hover:bg-slate-100 transition-all font-black text-[9px] uppercase tracking-widest group-hover:bg-[#0F172A] group-hover:text-white"
                    >
                        Détails <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-30">
                        <ShoppingBag className="h-10 w-10 text-slate-200" />
                        <p className="font-black text-[11px] uppercase tracking-widest text-slate-500">Aucune commande détectée</p>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300">Votre boutique attend ses premiers rituels.</p>
                    </div>
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      </Card>

      {/* Analytics Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-10">
          {[
              { label: "Ventes Jour", value: "84,500 F", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50/50" },
              { label: "Expéditions", value: "14", icon: Truck, color: "text-blue-500", bg: "bg-blue-50/50" },
              { label: "Incidents", value: "0", icon: XCircle, color: "text-teal-500", bg: "bg-teal-50/50" },
              { label: "Volume Mensuel", value: "1.2M F", icon: Package, color: "text-indigo-500", bg: "bg-indigo-50/50", dark: true },
          ].map((stat, i) => (
            <Card key={i} className={cn("border-none shadow-sm rounded-2xl p-5 overflow-hidden relative", stat.dark ? "bg-[#0F172A] text-white" : "bg-white")}>
                {stat.dark && <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 blur-2xl rounded-full" />}
                <p className={cn("text-[8px] font-black uppercase tracking-[0.2em] mb-1.5", stat.dark ? "text-slate-400" : "text-slate-300")}>{stat.label}</p>
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-black tracking-tight">{stat.value}</h4>
                    <stat.icon className={cn("w-4 h-4 opacity-50", stat.color)} />
                </div>
            </Card>
          ))}
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden rounded-[2rem] border-none bg-white shadow-2xl">
          {selectedOrder && (
            <div className="flex flex-col h-full overflow-y-auto max-h-[85vh] custom-scrollbar">
              <div className="bg-[#0F172A] p-10 text-white relative">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/5 blur-3xl rounded-full" />
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                        <DialogHeader className="p-0 border-none space-y-0 text-left">
                            <h3 className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 mb-2">Protocol de Livraison</h3>
                            <DialogTitle className="text-xl font-black uppercase tracking-tight text-white mb-1">Rituel #{selectedOrder.id.slice(-6).toUpperCase()}</DialogTitle>
                        </DialogHeader>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                            <Calendar className="h-4 w-4 text-teal-400" />
                            <div>
                                <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Horodatage</p>
                                <p className="text-[10px] font-black uppercase">{format(new Date(selectedOrder.createdAt), "dd MMMM yyyy", { locale: fr })}</p>
                            </div>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                            <CreditCard className="h-4 w-4 text-teal-400" />
                            <div>
                                <p className="text-[7px] font-black text-white/40 uppercase tracking-widest">Transaction</p>
                                <p className="text-[10px] font-black uppercase">Paytech / Mobile</p>
                            </div>
                      </div>
                  </div>
              </div>

              <div className="p-10 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-800">
                            <User className="h-3.5 w-3.5 text-teal-600" />
                            <h4 className="font-black text-[9px] uppercase tracking-widest">Coordonnées Client</h4>
                        </div>
                        <div className="pl-6 space-y-1.5">
                            <p className="font-black text-[12px] text-slate-800 uppercase tracking-tight">{selectedOrder.user?.name || "Client Moomel"}</p>
                            <p className="text-[10px] text-slate-400 font-bold">{selectedOrder.user?.email}</p>
                            <p className="text-[10px] text-slate-400 font-bold flex items-center gap-2"><Phone className="h-3 w-3" /> +221 Signal Secret</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-800">
                            <MapPin className="h-3.5 w-3.5 text-teal-600" />
                            <h4 className="font-black text-[9px] uppercase tracking-widest">Vecteur d'Expédition</h4>
                        </div>
                        <div className="pl-6">
                            <p className="text-[11px] leading-relaxed text-slate-500 font-bold uppercase tracking-tight italic">
                                {selectedOrder.shippingAddress || "N/A - Boutique"}
                            </p>
                        </div>
                    </div>
                  </div>

                  <Separator className="bg-zinc-50" />

                  {/* Items */}
                  <div className="space-y-4">
                      <div className="flex items-center gap-2 text-slate-800">
                          <ShoppingBag className="h-3.5 w-3.5 text-teal-600" />
                          <h4 className="font-black text-[9px] uppercase tracking-widest">Composition du Panier</h4>
                      </div>
                      <div className="space-y-3">
                          {selectedOrder.items?.map((item: any) => (
                              <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 group border border-transparent hover:border-zinc-100 transition-all">
                                  <div className="flex items-center gap-4">
                                      <div className="h-10 w-10 rounded-xl bg-white border border-zinc-100 flex items-center justify-center font-black text-slate-800 text-[10px] shadow-sm">
                                          {item.product?.name?.charAt(0) || "P"}
                                      </div>
                                      <div className="flex flex-col">
                                          <span className="font-black text-[11px] text-slate-800 uppercase tracking-tight">{item.product?.name}</span>
                                          <span className="text-[8px] uppercase tracking-widest text-slate-400 font-bold">Quantité: {item.quantity}</span>
                                      </div>
                                  </div>
                                  <span className="font-black text-[11px] text-slate-800">{formatPrice(item.price * item.quantity)}</span>
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="bg-slate-50/50 p-6 rounded-[1.5rem] border border-zinc-100 space-y-3">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>Sous-total</span>
                          <span>{formatPrice(selectedOrder.total)}</span>
                      </div>
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                          <span>Frais de Protocol</span>
                          <span className="text-emerald-500">OFFERT</span>
                      </div>
                      <Separator className="bg-zinc-100/50 my-1" />
                      <div className="flex justify-between font-black text-[15px] text-slate-800">
                          <span className="uppercase tracking-[0.2em] text-[10px] self-center">Total de la Transaction</span>
                          <span>{formatPrice(selectedOrder.total)}</span>
                      </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                      {selectedOrder.status === "PENDING" && (
                        <Button 
                            onClick={() => onUpdateStatus(selectedOrder.id, "SHIPPED")}
                            disabled={!!updating}
                            className="flex-1 h-12 bg-[#0F172A] hover:bg-black text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-black/10 transition-transform active:scale-95"
                        >
                            {updating === selectedOrder.id ? "Sync..." : <><Truck className="mr-2 h-4 w-4 text-teal-400" /> Expédier le Rituel</>}
                        </Button>
                      )}
                      
                      {selectedOrder.status === "SHIPPED" && (
                        <Button 
                            onClick={() => onUpdateStatus(selectedOrder.id, "DELIVERED")}
                            disabled={!!updating}
                            className="flex-1 h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-teal-500/10 transition-transform active:scale-95"
                        >
                            {updating === selectedOrder.id ? "Sync..." : <><CheckCircle2 className="mr-2 h-4 w-4" /> Marquer Comme Livré</>}
                        </Button>
                      )}

                      <Button variant="outline" className="h-12 w-12 rounded-xl border-zinc-100 font-bold uppercase tracking-widest text-[10px] hover:bg-slate-50 p-0">
                          <Phone className="h-4 w-4 text-slate-400" />
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
