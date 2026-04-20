"use client"

import { useState } from "react"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronLeft, Store, Mail, Calendar, Package, ShieldCheck,
    MessageCircle, MoreVertical, Edit, Search, Settings2, SlidersHorizontal, EyeOff, Eye, Send,
    CheckCircle, Clock, Info, Check, X, Globe, ShoppingBag
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { toggleProductStatus, approveShop, rejectShop } from "@/lib/actions/admin"
import { sendMessage, getConversation } from "@/lib/actions/messages"
import { formatPrice } from "@/lib/utils"

export default function SellerDetailClient({ shop }: { shop: any }) {
    const [messagesOpen, setMessagesOpen] = useState(false)
    const [messageText, setMessageText] = useState("")
    const [messages, setMessages] = useState<any[]>([])
    const [loadingMessages, setLoadingMessages] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isActionPending, setIsActionPending] = useState(false)
    const router = useRouter()

    const handleApprove = async () => {
        setIsActionPending(true)
        try {
            const res = await approveShop(shop.id)
            if (res.success) {
                toast.success(`Le lab ${shop.name} est maintenant actif !`)
                router.push("/admin/sellers")
                router.refresh()
            }
        } catch (err: any) {
            toast.error(err.message || "Erreur lors de l'approbation")
        } finally {
            setIsActionPending(false)
        }
    }

    const handleReject = async () => {
        if (!confirm(`Êtes-vous sûr de vouloir rejeter ${shop.name} ?`)) return
        setIsActionPending(true)
        try {
            const res = await rejectShop(shop.id)
            if (res.success) {
                toast.success(`Le lab ${shop.name} a été rejeté.`)
                router.push("/admin/sellers")
                router.refresh()
            }
        } catch (err: any) {
            toast.error(err.message || "Erreur lors du rejet")
        } finally {
            setIsActionPending(false)
        }
    }

    const handleToggleProduct = async (productId: string) => {
        try {
            const res = await toggleProductStatus(productId)
            if (res.success) {
                toast.success(`Le produit a été ${res.status === 'ACTIVE' ? 'réactivé' : 'suspendu'}.`)
                window.location.reload()
            }
        } catch (err: any) {
            toast.error(err.message || "Erreur de modération")
        }
    }

    const openMessageDialog = async (product?: any) => {
        setMessagesOpen(true)
        setSelectedProduct(product || null)
        setLoadingMessages(true)
        try {
            const msgs = await getConversation(shop.ownerId)
            setMessages(msgs)
        } catch (e) {
            toast.error("Erreur lors de la récupération des messages")
        }
        setLoadingMessages(false)
    }

    const handleSendMessage = async () => {
        if (!messageText.trim()) return
        try {
            await sendMessage(shop.ownerId, messageText, selectedProduct?.id)
            setMessageText("")
            toast.success("Message envoyé à l'artisan")
            const msgs = await getConversation(shop.ownerId)
            setMessages(msgs)
        } catch (err) {
            toast.error("Échec de l'envoi du message")
        }
    }

    return (
        <div className="space-y-8 pb-32 max-w-7xl mx-auto">
            <Link href="/admin/sellers" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-800 transition-colors">
                <ChevronLeft className="h-4 w-4" /> Retour aux partenaires
            </Link>

            {shop.status === 'PENDING' && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 animate-pulse">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-900">En attente de revue</h3>
                            <p className="text-sm text-amber-700">Cet artisan attend votre approbation pour ouvrir son laboratoire sur Moomel.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button
                            disabled={isActionPending}
                            onClick={handleReject}
                            variant="outline"
                            className="flex-1 md:w-40 h-12 rounded-xl text-rose-500 border-rose-200 hover:bg-rose-50 font-black uppercase tracking-widest text-[9px]"
                        >
                            <X className="mr-2 h-4 w-4" /> Rejeter
                        </Button>
                        <Button
                            disabled={isActionPending}
                            onClick={handleApprove}
                            className="flex-1 md:w-56 h-12 rounded-xl bg-[#2D241E] text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-black/10 transition-all hover:scale-[1.02]"
                        >
                            <Check className="mr-2 h-5 w-5" /> Manifest Lab
                        </Button>
                    </div>
                </div>
            )}

            {/* Profile Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 border border-zinc-200/50 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Store className="w-64 h-64" />
                    </div>
                    <div className="relative h-32 w-32 rounded-3xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner border-4 border-white shadow-xl">
                        <NextImage src={shop.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=300"} alt={shop.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-4 z-10 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black text-slate-800 tracking-tighter">{shop.name}</h1>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className={`border-none text-[10px] uppercase font-bold tracking-widest ${shop.status === 'PENDING' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>{shop.status}</Badge>
                                    <span className="text-sm font-medium text-slate-400 flex items-center gap-1"><Mail className="w-3 h-3" /> {shop.owner?.email}</span>
                                </div>
                            </div>
                            <Button onClick={() => openMessageDialog()} variant="outline" className="rounded-xl shadow-sm hover:bg-slate-50 border-zinc-200 gap-2 font-bold uppercase tracking-widest text-[10px]">
                                <MessageCircle className="w-4 h-4 text-primary" /> Contacter
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-1 bg-primary rounded-full" />
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">The Ritual Manifesto</h4>
                            </div>
                            <p className="text-slate-600 italic max-w-3xl leading-relaxed text-lg font-serif">
                                "{shop.description || 'Apportant l\'héritage culturel à travers des créations intemporelles.'}"
                            </p>
                        </div>
                        <div className="flex gap-6 mt-4 pt-4 border-t border-zinc-100">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Catalogue</span>
                                <p className="text-xl font-bold text-slate-800">{shop.products.length} Items</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Membre depuis</span>
                                <p className="text-sm font-medium text-slate-800 mt-1">{new Date(shop.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Région</span>
                                <p className="text-sm font-medium text-slate-800 mt-1">Sénégal</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="p-6 rounded-[2rem] border-zinc-200/50 shadow-sm space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Integrity Assessment</h4>
                        <div className="space-y-3">
                            {[
                                { label: "Heritage Alignment", ok: true },
                                { label: "Authentic Sourcing", ok: true },
                                { label: "Market Viability", ok: false },
                                { label: "Ethical Commitment", ok: true },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-zinc-100">
                                    <span className="text-xs font-bold text-slate-700">{item.label}</span>
                                    {item.ok ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Clock className="w-4 h-4 text-amber-400" />}
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-zinc-100">
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 text-primary">
                                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                                <p className="text-[9px] font-bold leading-tight uppercase tracking-wider">Identity & Artisan Ritual verified by Moomel Security</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>


            {/* Products List & Moderation */}
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h2 className="text-xl font-bold text-slate-800">Catalogue des produits</h2>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="Filtrer les produits..." className="h-10 rounded-xl border border-zinc-200/50 bg-white pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 w-full md:w-64" />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl"><SlidersHorizontal className="w-4 h-4 text-slate-500" /></Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {shop.products.map((product: any) => (
                        <Card key={product.id} className="p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center shadow-sm border-zinc-200/50 bg-white group hover:shadow-md transition-all">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shadow-inner flex-shrink-0">
                                <NextImage src={product.images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80"} alt={product.name} fill className={`object-cover ${product.status === 'SUSPENDED' && 'grayscale opacity-50'}`} />
                            </div>
                            <div className="flex-1 space-y-2 w-full text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2">
                                    <h3 className={`font-bold text-lg ${product.status === 'SUSPENDED' ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{product.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="font-bold whitespace-nowrap">{formatPrice(product.price)}</div>
                                        {product.status === 'SUSPENDED' ? (
                                            <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200 text-[9px]">SUSPENDU</Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 text-[9px]">ACTIF</Badge>
                                        )}
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 md:pr-12">{product.description}</p>
                            </div>
                            
                            <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6 justify-center">
                                <Button 
                                    onClick={() => handleToggleProduct(product.id)}
                                    variant={product.status === 'SUSPENDED' ? 'default' : 'outline'} 
                                    className={`h-9 w-full sm:w-36 rounded-lg text-[10px] uppercase font-bold tracking-widest ${product.status === 'SUSPENDED' ? 'bg-primary text-white hover:bg-primary/90' : 'text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-rose-200'}`}
                                >
                                    {product.status === 'SUSPENDED' ? <><Eye className="w-3.5 h-3.5 flex-shrink-0 mr-1.5"/> Réactiver</> : <><EyeOff className="w-3.5 h-3.5 flex-shrink-0 mr-1.5"/> Suspendre</>}
                                </Button>
                                <Button 
                                    onClick={() => openMessageDialog(product)}
                                    variant="ghost" 
                                    className="h-9 w-full sm:w-36 rounded-lg text-slate-500 hover:text-primary hover:bg-primary/5 text-[10px] uppercase font-bold tracking-widest"
                                >
                                    <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 mr-1.5"/> Discussion
                                </Button>
                            </div>
                        </Card>
                    ))}
                    {shop.products.length === 0 && (
                        <div className="h-32 rounded-2xl border border-dashed border-zinc-200 flex items-center justify-center text-slate-400 text-sm font-medium">
                            Cet artisan n'a pas encore publié de produit.
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky/Fixed Message Dialog - Basic Overlay */}
            {messagesOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
                    <Card className="w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
                        <div className="p-4 border-b border-zinc-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="font-bold text-slate-800">Discussion avec {shop.owner?.name}</h3>
                                {selectedProduct && (
                                    <p className="text-xs text-primary font-medium flex items-center gap-1 mt-1">
                                        Surveillance du produit: {selectedProduct.name}
                                    </p>
                                )}
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setMessagesOpen(false)} className="rounded-full"><XCircle className="w-5 h-5 text-slate-400" /></Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                            {loadingMessages ? (
                                <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-12 text-sm text-slate-400 italic">Aucun message précédent. Commencez la discussion.</div>
                            ) : (
                                messages.map((m) => (
                                    <div key={m.id} className={`flex flex-col ${m.senderId === shop.ownerId ? 'items-start' : 'items-end'}`}>
                                        {m.product && <div className="text-[10px] uppercase font-bold text-primary mb-1 bg-primary/10 px-2 py-0.5 rounded-full inline-block">Sujet: {m.product.name}</div>}
                                        <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${m.senderId === shop.ownerId ? 'bg-white border border-zinc-200 text-slate-800 rounded-tl-sm' : 'bg-primary text-white rounded-tr-sm shadow-md shadow-primary/20'}`}>
                                            {m.content}
                                        </div>
                                        <span className="text-[9px] text-slate-400 mt-1 font-medium">{new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-zinc-100 bg-white">
                            <div className="flex gap-2">
                                <input 
                                    value={messageText} 
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    type="text" 
                                    placeholder="Écrivez un message à l'artisan..." 
                                    className="flex-1 h-12 rounded-xl bg-slate-50 border border-zinc-200/50 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30"
                                />
                                <Button onClick={handleSendMessage} className="h-12 w-12 rounded-xl bg-[#2D241E] text-white shadow-md hover:scale-105 transition-transform" size="icon">
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}

function XCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
    )
}
