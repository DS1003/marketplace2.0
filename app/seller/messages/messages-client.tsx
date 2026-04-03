"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
    Search, 
    Send, 
    MessageCircle, 
    AlertCircle, 
    ShieldCheck, 
    Filter, 
    Trash2, 
    MoreVertical, 
    Mail, 
    ExternalLink,
    Zap,
    Clock,
    User,
    ChevronRight,
    Plus,
    X,
    Check
} from "lucide-react"
import { 
    sendMessage, 
    getConversation, 
    getInbox, 
    deleteConversation, 
    searchProductsForMessaging 
} from "@/lib/actions/messages"
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

const QUICK_TEMPLATES = [
    "Bonjour ! Votre commande est en cours de préparation.",
    "Merci pour votre intérêt pour ce rituel.",
    "L'expédition sera effectuée d'ici 24 heures.",
    "Avez-vous besoin d'informations supplémentaires ?",
    "Rituel expédié ! Vous recevrez le lien de suivi sous peu."
]

export default function MessagesClient({ initialConversations, currentUserId }: { initialConversations: any[], currentUserId: string }) {
    const [conversations, setConversations] = useState(initialConversations)
    const [activePartner, setActivePartner] = useState<any>(null)
    const [messages, setMessages] = useState<any[]>([])
    const [messageText, setMessageText] = useState("")
    const [loading, setLoading] = useState(false)
    const [quickViewProductId, setQuickViewProductId] = useState<string | null>(null)
    const [sidebarSearch, setSidebarSearch] = useState("")
    
    // Product Linking State
    const [productSearch, setProductSearch] = useState("")
    const [foundProducts, setFoundProducts] = useState<any[]>([])
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isProductPopoverOpen, setIsProductPopoverOpen] = useState(false)

    const scrollRef = useRef<HTMLDivElement>(null)

    // Poll for new messages/conversations
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
        }, 10000)
        return () => clearInterval(interval)
    }, [activePartner, messages.length])

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Product search logic
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
            toast.error("Échec du chargement")
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
            toast.error("Échec de l'envoi")
        }
    }

    const handleDelete = async (partnerId: string) => {
        if (!confirm("Effacer tout l'historique avec cet utilisateur ?")) return
        try {
            await deleteConversation(partnerId)
            toast.success("Discussion effacée")
            setConversations(prev => prev.filter(c => c.partner.id !== partnerId))
            if (activePartner?.id === partnerId) {
                setActivePartner(null)
                setMessages([])
            }
        } catch (e) {
            toast.error("Erreur")
        }
    }

    const filteredConversations = conversations.filter(c => 
        c.partner.name?.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
        c.lastMessage.content.toLowerCase().includes(sidebarSearch.toLowerCase())
    )

    return (
        <div className="flex flex-1 w-full gap-4 overflow-hidden text-slate-800 animate-in fade-in duration-700 pb-2">
            
            {/* Sidebar Inbox */}
            <div className="w-[280px] lg:w-[320px] flex flex-col bg-transparent shrink-0">
                <div className="bg-white rounded-[1.5rem] border border-zinc-200/50 shadow-sm flex-1 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-zinc-50 shrink-0">
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex items-center gap-2">
                                <Zap className="w-2.5 h-2.5 text-teal-600 fill-teal-600" />
                                <h2 className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">Communications</h2>
                            </div>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-300" />
                            <input 
                                value={sidebarSearch}
                                onChange={(e) => setSidebarSearch(e.target.value)}
                                type="text" 
                                placeholder="Filtrer..." 
                                className="w-full h-8 pl-8 pr-4 bg-slate-50/50 rounded-lg text-[10px] font-bold border border-zinc-100 focus:outline-none focus:ring-1 focus:ring-teal-500/20 placeholder:text-slate-300 uppercase tracking-widest transition-all" 
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 mt-2 custom-scrollbar">
                        {filteredConversations.length === 0 ? (
                            <div className="text-center py-10 opacity-30">
                                <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">Vide</p>
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
                                            "p-3 rounded-xl cursor-pointer transition-all flex gap-3 relative border items-center group/item",
                                            isActive 
                                                ? "bg-[#0F172A] border-[#0F172A] shadow-lg shadow-black/10" 
                                                : "bg-white border-transparent hover:bg-slate-50"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0 ring-4",
                                            isActive ? "bg-teal-600/30 text-teal-400 ring-white/5" : "bg-slate-50 text-slate-600 ring-slate-50"
                                        )}>
                                            {getInitials(conv.partner.name)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-0.5">
                                                <h4 className={cn("font-black text-[10px] uppercase tracking-tight truncate", isActive ? "text-white" : "text-slate-700")}>
                                                    {conv.partner.name || "Artisan"}
                                                </h4>
                                                <span className={cn("text-[7px] font-black uppercase tracking-widest", isActive ? "text-slate-500" : "text-slate-400")}>
                                                    {new Date(lastMsg.createdAt).toLocaleDateString([], {day:'2-digit', month:'short'})}
                                                </span>
                                            </div>
                                            <p className={cn("text-[9px] line-clamp-1 font-bold leading-none opacity-80 truncate", isActive ? "text-slate-400" : "text-slate-400")}>
                                                {lastMsg.content}
                                            </p>
                                        </div>
                                        {isUnread && <span className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />}
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>


            {/* Chat Panel */}
            <div className="flex-1 bg-white rounded-[1.5rem] border border-zinc-200/50 shadow-sm flex flex-col overflow-hidden relative">
                {activePartner ? (
                    <>
                        {/* Header */}
                        <div className="h-14 border-b border-zinc-50 flex items-center justify-between px-6 bg-white shrink-0 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-black text-[10px] border border-teal-100/50">
                                    {getInitials(activePartner.name)}
                                </div>
                                <div>
                                    <h3 className="font-black text-[11px] text-slate-800 uppercase tracking-widest leading-none mb-1">{activePartner.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 text-[7px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Signal Actif
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 rounded-lg hover:bg-slate-50">
                                            <MoreVertical className="w-3 h-3" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="rounded-xl p-1 w-40">
                                        <DropdownMenuItem 
                                            onClick={() => handleDelete(activePartner.id)}
                                            className="text-rose-500 text-[9px] font-black uppercase tracking-widest rounded-lg"
                                        >
                                            <Trash2 className="w-3 h-3 mr-2" /> Effacer Historique
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 bg-slate-50/[0.15] custom-scrollbar scroll-smooth">
                            {loading ? (
                                <div className="flex justify-center p-8"><div className="w-4 h-4 border border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>
                            ) : (
                                messages.map((m) => {
                                    const isSent = m.senderId === currentUserId
                                    return (
                                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} key={m.id} className={cn("flex", isSent ? "justify-end" : "justify-start")}>
                                            <div className={cn("flex flex-col max-w-[85%] lg:max-w-[70%]", isSent ? "items-end" : "items-start")}>
                                                <div className={cn(
                                                    "p-3.5 rounded-2xl shadow-sm relative transition-all duration-300",
                                                    isSent ? "bg-[#0F172A] text-white rounded-tr-none" : "bg-white border border-zinc-100 text-slate-700 rounded-tl-none ring-1 ring-black/[0.01]"
                                                )}>
                                                    {m.product && (
                                                        <div 
                                                          onClick={() => setQuickViewProductId(m.product.id)}
                                                          className={cn(
                                                              "cursor-pointer transition-all mb-3 p-2 rounded-lg border flex items-center gap-2",
                                                              isSent ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50/50 border-zinc-100 hover:border-teal-500/20"
                                                          )}
                                                        >
                                                            {m.product.images?.[0] && (
                                                                <div className="w-7 h-7 rounded-md overflow-hidden shrink-0 relative opacity-80">
                                                                    <NextImage src={m.product.images[0]} alt={m.product.name} fill className="object-cover" />
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col overflow-hidden max-w-[120px]">
                                                                <span className={cn("text-[6px] uppercase font-black tracking-[0.2em]", isSent ? "text-teal-400 opacity-60" : "text-teal-600")}>Produit</span>
                                                                <span className={cn("text-[9px] font-black truncate uppercase", isSent ? "text-white/80" : "text-slate-800")}>{m.product.name}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <p className="text-[11px] leading-relaxed font-bold opacity-90">{m.content}</p>
                                                </div>
                                                <span className="text-[7px] font-black text-slate-300 mt-1.5 uppercase tracking-widest px-1">
                                                    {new Date(m.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            )}
                        </div>

                        {/* Advanced Input Area */}
                        <div className="p-4 bg-white border-t border-zinc-50 shrink-0 relative z-10 space-y-2">
                            {/* Selected Product Tag */}
                            <AnimatePresence>
                                {selectedProduct && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-2 bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-lg w-fit">
                                        <div className="h-5 w-5 rounded bg-teal-100 flex items-center justify-center text-[8px] font-black text-teal-600 overflow-hidden relative">
                                            {selectedProduct.images?.[0] ? <NextImage src={selectedProduct.images[0]} alt="" fill className="object-cover" /> : "P"}
                                        </div>
                                        <span className="text-[8px] font-black text-teal-600 uppercase tracking-widest truncate max-w-[150px]">{selectedProduct.name}</span>
                                        <button onClick={() => setSelectedProduct(null)} className="text-teal-400 hover:text-teal-600 transition-colors"><X className="w-2.5 h-2.5" /></button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="bg-slate-50 border border-zinc-200 rounded-[1.25rem] p-1 flex items-center gap-1 focus-within:ring-1 focus-within:ring-teal-500/10 transition-all">
                                <Popover open={isProductPopoverOpen} onOpenChange={setIsProductPopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg hover:bg-white hover:text-teal-600 border-none shrink-0">
                                            <Plus className="w-3.5 h-3.5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent side="top" align="start" className="w-64 p-0 rounded-2xl overflow-hidden shadow-2xl border-zinc-100">
                                        <div className="p-3 border-b border-zinc-50">
                                            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Attacher un rituel</h4>
                                            <div className="relative">
                                                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300" />
                                                <input 
                                                    value={productSearch}
                                                    onChange={(e) => setProductSearch(e.target.value)}
                                                    autoFocus
                                                    placeholder="Chercher..." 
                                                    className="w-full h-8 pl-7 pr-3 bg-slate-50 text-[10px] font-bold rounded-lg border-none focus:ring-1 focus:ring-teal-500/20"
                                                />
                                            </div>
                                        </div>
                                        <div className="max-h-48 overflow-y-auto">
                                            {foundProducts.map(p => (
                                                <div 
                                                    key={p.id} 
                                                    onClick={() => { setSelectedProduct(p); setIsProductPopoverOpen(false); setProductSearch(""); }}
                                                    className="p-3 flex items-center gap-3 hover:bg-slate-50 cursor-pointer transition-colors border-b border-zinc-50 last:border-0"
                                                >
                                                    <div className="h-8 w-8 rounded bg-slate-100 shrink-0 overflow-hidden relative">
                                                        {p.images?.[0] && <NextImage src={p.images[0]} alt="" fill className="object-cover" />}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight truncate">{p.name}</p>
                                                        <p className="text-[8px] font-bold text-teal-600">{p.price} FCFA</p>
                                                    </div>
                                                    <Plus className="w-3 h-3 text-slate-200" />
                                                </div>
                                            ))}
                                            {productSearch.length > 1 && foundProducts.length === 0 && <p className="p-4 text-center text-[9px] font-bold text-slate-300">Aucun résultat</p>}
                                        </div>
                                    </PopoverContent>
                                </Popover>

                                <input 
                                    type="text" 
                                    className="flex-1 bg-transparent px-3 py-2 text-[10px] font-black uppercase tracking-widest focus:outline-none placeholder:text-slate-300" 
                                    placeholder="Répondre..." 
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                />

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg hover:bg-white hover:text-teal-600 border-none shrink-0">
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="top" align="end" className="rounded-2xl p-2 w-64 shadow-2xl border-zinc-100">
                                        <p className="px-3 py-2 text-[9px] font-black uppercase tracking-widest text-slate-300">Réponses Rapides</p>
                                        {QUICK_TEMPLATES.map(t => (
                                            <DropdownMenuItem 
                                                key={t} 
                                                onClick={() => setMessageText(t)}
                                                className="text-[10px] font-bold text-slate-600 p-2.5 rounded-xl focus:bg-teal-50 focus:text-teal-700 cursor-pointer"
                                            >
                                                {t}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button 
                                    onClick={handleSend}
                                    disabled={!messageText.trim() && !selectedProduct}
                                    className="h-8 w-8 rounded-lg bg-[#0D9488] text-white hover:bg-[#0F766E] shadow-sm active:scale-95 transition-all p-0 disabled:opacity-20 border-none shrink-0"
                                >
                                    <Send className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50/10">
                        <div className="w-10 h-10 rounded-xl bg-white border border-zinc-50 flex items-center justify-center shadow-xs">
                            <Mail className="w-4 h-4 text-slate-100" />
                        </div>
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 opacity-40 uppercase">Lab Protocol Offline</p>
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
