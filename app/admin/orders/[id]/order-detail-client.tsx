"use client"

import { useState } from "react"
import { ArrowLeft2, Clock, TickCircle, TruckFast, Danger, Import, Shop, User, Box } from "reicon-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { updateOrderStatus } from "@/lib/actions/admin"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function OrderDetailClient({ order }: { order: any }) {
    const router = useRouter()
    const [isUpdating, setIsUpdating] = useState(false)
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
    const [newStatus, setNewStatus] = useState(order.status)

    const handleUpdateStatus = async () => {
        setIsUpdating(true)
        try {
            await updateOrderStatus(order.id, newStatus)
            toast.success("Statut de la commande mis à jour")
            setIsStatusDialogOpen(false)
            router.refresh()
        } catch (error) {
            toast.error("Erreur lors de la mise à jour")
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.push('/admin/orders')} className="h-10 w-10 rounded-full bg-white shadow-sm border border-zinc-100 hover:bg-slate-50 text-slate-500">
                        <ArrowLeft2 className="h-5 w-5" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Commande #{order.id.slice(0, 8)}</h1>
                            <Badge variant="outline" className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border-0 ${
                                order.status === "PENDING" ? "bg-amber-50 text-amber-600" :
                                order.status === "PAID" ? "bg-blue-50 text-blue-600" :
                                order.status === "DELIVERED" ? "bg-emerald-50 text-emerald-600" :
                                order.status === "SHIPPED" ? "bg-indigo-50 text-indigo-600" :
                                "bg-rose-50 text-rose-600"
                            }`}>
                                {order.status === "PENDING" && <Clock className="h-3 w-3 mr-1.5 inline-block" />}
                                {order.status === "DELIVERED" && <TickCircle className="h-3 w-3 mr-1.5 inline-block" />}
                                {order.status === "SHIPPED" && <TruckFast className="h-3 w-3 mr-1.5 inline-block" />}
                                {order.status === "CANCELLED" && <Danger className="h-3 w-3 mr-1.5 inline-block" />}
                                {order.status === "PAID" && <TickCircle className="h-3 w-3 mr-1.5 inline-block" />}
                                {order.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-slate-500">Passée le {format(new Date(order.createdAt), "dd MMMM yyyy, HH:mm")}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setIsStatusDialogOpen(true)} className="h-12 px-6 rounded-xl border-zinc-200 text-slate-700 hover:bg-slate-50 font-bold tracking-wide text-xs">
                        MODIFIER STATUT
                    </Button>
                    <Button asChild className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20 font-bold tracking-wide text-xs">
                        <a href={`/api/invoice/${order.id}`} download>
                            <Import className="h-4 w-4 mr-2" />
                            TELECHARGER FACTURE
                        </a>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Items */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6 rounded-3xl border-none shadow-sm shadow-zinc-200/50">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                            <Box className="h-4 w-4 mr-2" /> Articles Commandés
                        </h2>
                        
                        <div className="space-y-4">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-zinc-100 hover:bg-slate-50/50 transition-colors">
                                    <div className="h-20 w-20 bg-slate-100 rounded-xl flex-shrink-0 relative overflow-hidden border border-zinc-200/50">
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                            <Box className="h-8 w-8" />
                                        </div>
                                    </div>
                                    <div className="flex-1 flex justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-base">{item.product?.name || "Produit Inconnu"}</h3>
                                            <div className="flex items-center mt-1 text-xs text-slate-500 font-medium">
                                                <Shop className="h-3.5 w-3.5 mr-1" />
                                                {item.product?.shop?.name || "Vendeur Inconnu"}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-slate-900">{item.price} FCFA</p>
                                            <p className="text-sm font-bold text-slate-500 mt-1">Qté: {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Customer & Summary */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <Card className="p-6 rounded-3xl border-none shadow-sm shadow-zinc-200/50">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center">
                            <User className="h-4 w-4 mr-2" /> Client
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-lg">
                                {order.user?.name?.charAt(0) || "U"}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800">{order.user?.name || "Utilisateur Inconnu"}</p>
                                <p className="text-sm text-slate-500">{order.user?.email}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-zinc-100 space-y-3">
                             <div className="flex justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase">Méthode Paiement</span>
                                <span className="text-xs font-bold text-slate-700 uppercase">{order.paymentMethod}</span>
                             </div>
                             <div className="flex flex-col gap-1 mt-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Adresse de livraison (Simulée)</span>
                                <span className="text-sm text-slate-700">Dakar, Sénégal<br/>Quartier Almadies, Rue 12</span>
                             </div>
                        </div>
                    </Card>

                    {/* Order Summary */}
                    <Card className="p-6 rounded-3xl border-none shadow-sm shadow-zinc-200/50 bg-slate-900 text-white relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/20 rounded-full blur-3xl"></div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 relative z-10">Résumé</h2>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Sous-total</span>
                                <span className="font-medium">{order.total} FCFA</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400">Livraison</span>
                                <span className="font-medium">Gratuit</span>
                            </div>
                            <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                                <span className="font-bold">Total</span>
                                <span className="text-2xl font-black text-primary">{order.total} FCFA</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Status Dialog */}
            <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
                <DialogContent className="bg-white border-none shadow-2xl rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Modifier le statut de la commande</DialogTitle>
                        <DialogDescription>
                            Sélectionnez le nouveau statut pour la commande #{order.id.slice(0, 8)}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <Select value={newStatus} onValueChange={setNewStatus}>
                            <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">En attente (PENDING)</SelectItem>
                                <SelectItem value="PAID">Payée (PAID)</SelectItem>
                                <SelectItem value="SHIPPED">Expédiée (SHIPPED)</SelectItem>
                                <SelectItem value="DELIVERED">Livrée (DELIVERED)</SelectItem>
                                <SelectItem value="CANCELLED">Annulée (CANCELLED)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsStatusDialogOpen(false)} className="rounded-xl">Annuler</Button>
                        <Button onClick={handleUpdateStatus} disabled={isUpdating} className="rounded-xl px-8 shadow-lg shadow-primary/20">
                            {isUpdating ? "Mise à jour..." : "Confirmer"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}
