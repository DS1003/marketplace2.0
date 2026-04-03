"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Trash2, Star, MoreVertical, Mail, CheckCircle2, Send, ExternalLink, Plus, X, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { sendMessage, getConversation, getInbox, deleteConversation, searchProductsForMessaging } from "@/lib/actions/messages"
import { toast } from "sonner"
import NextImage from "next/image"
import ProductQuickView from "@/components/ProductQuickView"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const ADMIN_TEMPLATES = [
    "Bonjour, votre demande est en cours de traitement par nos services.",
    "Votre boutique a été approuvée avec succès. Bienvenue sur Moomel !",
    "Nous avons relevé une non-conformité sur vos produits. Merci de les corriger.",
    "Votre retrait de fonds a été validé.",
    "Merci de nous fournir des documents complémentaires pour votre vérification."
]

export default function AdminMessagesClient({ initialConversations, currentUserId }: { initialConversations: any[], currentUserId: string }) {
    const [conversations, setConversations] = useState(initialConversations)
    const [activePartner, setActivePartner] = useState<any>(null)
    const [messages, setMessages] = useState<any[]>([])
    const [messageText, setMessageText] = useState("")
    const [loading, setLoading] = useState(false)
    const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null)
    const [sidebarSearch, setSidebarSearch] = useState("")

    // Product Link State
    const [productSearch, setProductSearch] = useState("")
    const [foundProducts, setFoundProducts] = useState<any[]>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isProductPopoverOpen, setIsProductPopoverOpen] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null)

    // Polling for updates
    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedInbox = await getInbox()
            setConversations(updatedInbox)
            
            if (activePartner) {
                const updatedMsgs = await getConversation(activePartner.id)
                if (updatedMsgs.length !== messages.length) {
                    setMessages(updatedMsgs)
                }
            }
        }, 8000) // Slightly faster for admin
        return () => clearInterval(interval)
    }, [activePartner, messages.length])

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Product search
    useEffect(() => {
        if (productSearch.length > 1) {
            const delay = setTimeout(async () => {
                const res = await searchProductsForMessaging(productSearch)
                setFoundProducts(res)
            }, 300)
            return () => clearTimeout(delay)
        } else {
            setFoundProducts([])
        }
    }, [productSearch])

    const getInitials = (name: string) => name ? name.substring(0, 2).toUpperCase() : "U"

    const selectPartner = async (partner: any) => {
        setActivePartner(partner)
        setLoading(true)
        setSelectedProduct(null)
        try {
            const msgs = await getConversation(partner.id)
            setMessages(msgs)
            setConversations(prev => prev.map(c => c.partner.id === partner.id ? { ...c, unreadCount: 0 } : c))
        } catch (e) {
            toast.error("Erreur de chargement")
        }
        setLoading(false)
    }

    const handleSend = async () => {
        if (!messageText.trim() && !selectedProduct) return
        if (!activePartner) return
        try {
            await sendMessage(activePartner.id, messageText, selectedProduct?.id)
            setMessageText("")
            setSelectedProduct(null)
            const msgs = await getConversation(activePartner.id)
            setMessages(msgs)
            const updatedInbox = await getInbox()
            setConversations(updatedInbox)
        } catch (err) {
            toast.error("Erreur d'envoi")
        }
    }

    const handleDelete = async (partnerId: string) => {
        if (!confirm("Supprimer cette conversation définitivement ?")) return
        try {
            await deleteConversation(partnerId)
            setConversations(prev => prev.filter(c => c.partner.id !== partnerId))
            if (activePartner?.id === partnerId) {
                setActivePartner(null)
                setMessages([])
            }
            toast.success("Conversation supprimée")
        } catch (e) {
            toast.error("Erreur")
        }
    }

    const filteredConversations = conversations.filter(c => 
        c.partner.name?.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
        c.lastMessage.content.toLowerCase().includes(sidebarSearch.toLowerCase())
    )

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6 w-full mx-auto overflow-hidden text-slate-800 animate-in fade-in duration-500">
            
            {/* Admin Sidebar */}
            <div className="w-[340px] flex flex-col bg-transparent shrink-0">
                <div className="bg-white rounded-[2rem] border border-zinc-200/50 shadow-sm flex-1 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-zinc-50 shrink-0">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[11px] font-black tracking-[0.2em] text-slate-800 uppercase">Administration Inbox</h2>
                            <Filter className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                            <input 
                                value={sidebarSearch}
                                onChange={(e) => setSidebarSearch(e.target.value)}
                                type="text" 
                                placeholder="Rechercher artisan..." 
                                className="w-full h-11 pl-10 pr-4 bg-slate-50/50 rounded-2xl text-[12px] font-bold border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 placeholder:text-slate-400 uppercase tracking-widest" 
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 mt-4 custom-scrollbar">
                        {filteredConversations.length === 0 ? (
                            <div className="text-center p-10 opacity-40">
                                <Mail className="w-10 h-10 text-slate-100 mx-auto mb-2" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Aucun message</p>
                            </div>
                        ) : (
                            filteredConversations.map((conv) => {
                                const isActive = activePartner?.id === conv.partner.id
                                const lastMsg = conv.lastMessage
                                const isUnread = conv.unreadCount > 0
                                
                                return (
                                    <div 
                                        key={conv.partner.id}
                                        onClick={() => selectPartner(conv.partner)}
                                        className={cn(
                                            "p-4 rounded-[1.5rem] cursor-pointer transition-all flex gap-3 relative border",
                                            isActive 
                                                ? "bg-[#1e1b4b] border-[#1e1b4b] shadow-xl shadow-indigo-900/10" 
                                                : "bg-white border-zinc-100 hover:border-zinc-200"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ring-4",
                                            isActive ? "bg-indigo-500/20 text-indigo-300 ring-white/5" : "bg-indigo-50 text-indigo-700 ring-indigo-50/50"
                                        )}>
                                            {getInitials(conv.partner.name)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className={cn("font-black text-[12px] truncate uppercase", isActive ? "text-white" : "text-slate-800")}>
                                                    {conv.partner.name || "Artisan"}
                                                </h4>
                                                <span className={cn("text-[9px] font-black uppercase tracking-widest", isActive ? "text-slate-400" : "text-slate-400")}>
                                                    {new Date(lastMsg.createdAt).toLocaleDateString([], {day:'2-digit', month:'short'})}
                                                </span>
                                            </div>
                                            <p className={cn("text-[11px] line-clamp-1 font-medium opacity-80", isActive ? "text-slate-300" : "text-slate-500")}>
                                                {lastMsg.content}
                                            </p>
                                        </div>
                                        {isUnread && <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />}
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-white rounded-[2.5rem] border border-zinc-200/50 shadow-sm flex flex-col overflow-hidden relative">
                {activePartner ? (
                    <>
                        <div className="h-20 border-b border-zinc-50 flex items-center justify-between px-10 bg-white shrink-0 relative z-10 transition-all">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-[1.25rem] bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm border border-indigo-100/50">
                                    {getInitials(activePartner.name)}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-black text-sm text-slate-800 uppercase tracking-widest leading-none mb-1.5">{activePartner.name}</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5 text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Signal Actif
                                        </span>
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest group cursor-pointer hover:text-indigo-600 transition-colors">
                                           {activePartner.email}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-xl hover:bg-slate-50">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl">
                                        <DropdownMenuItem 
                                            onClick={() => handleDelete(activePartner.id)}
                                            className="text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-xl p-3"
                                        >
                                            <Trash2 className="w-4 h-4 mr-3" /> Supprimer Discussion
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-6 bg-slate-50/[0.2] custom-scrollbar scroll-smooth">
                            {loading ? (
                                <div className="flex justify-center p-10"><div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>
                            ) : (
                                messages.map((m) => {
                                    const isSent = m.senderId === currentUserId
                                    return (
                                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key={m.id} className={cn("flex", isSent ? "justify-end" : "justify-start")}>
                                            <div className={cn("flex flex-col max-w-[80%] lg:max-w-[65%]", isSent ? "items-end" : "items-start")}>
                                                <div className={cn(
                                                    "p-6 rounded-[2rem] shadow-sm relative transition-all duration-300",
                                                    isSent ? "bg-[#1e1b4b] text-white rounded-tr-none" : "bg-white border border-zinc-100 text-slate-800 rounded-tl-none shadow-indigo-900/[0.02]"
                                                )}>
                                                    {m.product && (
                                                        <div 
                                                          onClick={() => setQuickViewProductId(m.product.id)}
                                                          className={cn(
                                                              "cursor-pointer transition-all mb-4 p-3 rounded-2xl border flex items-center gap-4",
                                                              isSent ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-zinc-100 hover:border-indigo-500/20"
                                                          )}
                                                        >
                                                            {m.product.images?.[0] && (
                                                                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 relative opacity-90">
                                                                    <NextImage src={m.product.images[0]} alt={m.product.name} fill className="object-cover" />
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col overflow-hidden max-w-[200px]">
                                                                <span className={cn("text-[8px] uppercase font-black tracking-[0.2em]", isSent ? "text-indigo-300 opacity-60" : "text-indigo-600")}>Objet de Référence</span>
                                                                <span className={cn("text-[12px] font-black truncate uppercase", isSent ? "text-white" : "text-slate-900")}>{m.product.name}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <p className="text-[13px] leading-relaxed font-bold opacity-90">{m.content}</p>
                                                </div>
                                                <span className="text-[9px] font-black text-slate-300 mt-2 uppercase tracking-widest px-2">
                                                    {new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            )}
                        </div>

                        <div className="p-8 bg-white border-t border-zinc-50 shrink-0 relative z-10 space-y-4">
                            <AnimatePresence>
                                {selectedProduct && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl w-fit shadow-sm">
                                        <div className="h-6 w-6 rounded-lg bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-600 overflow-hidden relative">
                                            {selectedProduct.images?.[0] ? <NextImage src={selectedProduct.images[0]} alt="" fill className="object-cover" /> : "P"}
                                        </div>
                                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest truncate max-w-[200px]">{selectedProduct.name}</span>
                                        <button onClick={() => setSelectedProduct(null)} className="text-indigo-400 hover:text-indigo-600 transition-colors p-1"><X className="w-3 h-3" /></button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="bg-slate-50 border border-zinc-200 rounded-[2rem] p-1.5 flex items-center gap-2 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all duration-300 shadow-inner">
                                <Popover open={isProductPopoverOpen} onOpenChange={setIsProductPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-full hover:bg-white hover:text-indigo-600 border-none shrink-0 transition-transform active:scale-90">
                                            <Plus className="w-5 h-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side="top" align="start" className="w-[320px] p-0 rounded-[2rem] overflow-hidden shadow-2xl border-zinc-100">
                                        <div className="p-4 border-b border-zinc-50 bg-slate-50/50">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Référence Produit</h4>
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                <input 
                                                    value={productSearch}
                                                    onChange={(e) => setProductSearch(e.target.value)}
                                                    autoFocus
                                                    placeholder="Lier un rituel..." 
                                                    className="w-full h-10 pl-10 pr-4 bg-white text-[12px] font-bold rounded-xl border border-zinc-100 focus:outline-none focus:ring-1 focus:ring-indigo-500/20 shadow-sm uppercase tracking-widest"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto p-2 space-y-1 custom-scrollbar">
                                            {foundProducts.map(p => (
                                                <div 
                                                    key={p.id} 
                                                    onClick={() => { setSelectedProduct(p); setIsProductPopoverOpen(false); setProductSearch(""); }}
                                                    className="p-3 flex items-center gap-4 hover:bg-indigo-50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-indigo-100 group"
                                                >
                                                    <div className="h-10 w-10 rounded-xl bg-slate-100 shrink-0 overflow-hidden relative shadow-sm">
                                                        {p.images?.[0] && <NextImage src={p.images[0]} alt="" fill className="object-cover" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight truncate">{p.name}</p>
                                                        <p className="text-[9px] font-bold text-indigo-600">{p.price} FCFA</p>
                                                    </div>
                                                    <Plus className="w-4 h-4 text-slate-200 group-hover:text-indigo-400 transition-colors" />
                                                </div>
                                            ))}
                                            {productSearch.length > 1 && foundProducts.length === 0 && <p className="p-10 text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Aucun objet détecté</p>}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <input 
                                    type="text" 
                                    className="flex-1 bg-transparent px-5 py-3 text-[13px] font-bold uppercase tracking-widest focus:outline-none placeholder:text-slate-300 transition-all" 
                                    placeholder="Réponse Administrative..." 
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 rounded-full hover:bg-white hover:text-indigo-600 border-none shrink-0 transition-transform active:scale-90">
                                            <ExternalLink className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="top" align="end" className="rounded-[2rem] p-3 w-80 shadow-2xl border-zinc-100 mb-2">
                                        <p className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">ADMIN PROTOCOLS</p>
                                        <div className="space-y-1">
                                            {ADMIN_TEMPLATES.map(t => (
                                                <DropdownMenuItem 
                                                    key={t} 
                                                    onClick={() => setMessageText(t)}
                                                    className="text-[11px] font-bold text-slate-600 p-3.5 rounded-2xl focus:bg-indigo-50 focus:text-indigo-700 cursor-pointer transition-all"
                                                >
                                                    {t}
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button 
                                    onClick={handleSend}
                                    disabled={!messageText.trim() && !selectedProduct}
                                    className="h-12 w-12 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-900/20 active:scale-90 transition-all p-0 disabled:opacity-30 border-none shrink-0"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-200 gap-4 bg-slate-50/10">
                        <div className="w-16 h-16 rounded-[2rem] bg-white border border-zinc-50 flex items-center justify-center shadow-indigo-900/[0.02]">
                            <Mail className="w-7 h-7 text-slate-100" />
                        </div>
                        <div className="text-center">
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Central Management Link</p>
                            <p className="text-[10px] font-bold text-slate-300 opacity-60 uppercase tracking-widest italic">Sélectionnez un artisan pour initier le protocole.</p>
                        </div>
                    </div>
                )}
            </div>

            <AnimatePresence>
              {quickViewProductId && (
                <ProductQuickView 
                  productId={quickViewProductId} 
                  onClose={() => setQuickViewProductId(null)} 
                />
              )}
            </AnimatePresence>
        </div>
    )
}
