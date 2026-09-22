"use client"

import { motion } from "framer-motion"
import { Package, Search, Truck, CheckCircle2, MapPin, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [orderData, setOrderData] = useState<any>(null)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!orderId) return
        setIsSearching(true)
        // Simulate search
        setTimeout(() => {
            setOrderData({
                id: orderId.toUpperCase(),
                status: "En transit",
                lastUpdate: "Il y a 2 heures",
                location: "Centre de tri - Dakar",
                steps: [
                    { label: "Commande Validée", date: "15 Avril, 09:12", completed: true },
                    { label: "En cours de préparation", date: "15 Avril, 14:30", completed: true },
                    { label: "Remis au vecteur", date: "16 Avril, 08:00", completed: true },
                    { label: "En cours de livraison", date: "En cours", completed: false }
                ]
            })
            setIsSearching(false)
        }, 1200)
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#2D241E]">
            <main className="pt-40 pb-32">
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 rounded-[2rem] bg-primary/5 text-primary flex items-center justify-center mx-auto border border-primary/10 shadow-sm"
                    >
                        <Package className="w-8 h-8" />
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Suivez Votre <br /><span className="text-primary not-italic">Rituel.</span></h1>
                    <p className="text-xl text-[#2D241E]/40 font-bold italic max-w-xl mx-auto">
                        Inscrivez votre numéro de commande pour localiser le flux de votre colis artisanal.
                    </p>

                    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mt-12 bg-white rounded-full shadow-2xl shadow-black/5 p-2 border border-stone-100 flex items-center gap-2">
                        <Search className="absolute left-6 w-5 h-5 text-stone-300" />
                        <Input 
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="ex: MOOMEL-8472-SN" 
                            className="h-14 pl-14 pr-8 rounded-full border-none bg-transparent text-lg font-bold placeholder:text-stone-200 focus:ring-0"
                        />
                        <Button 
                            type="submit" 
                            disabled={isSearching}
                            className="h-14 px-8 rounded-full bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-black/10 transition-all active:scale-95 group border-none"
                        >
                            {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Localiser <Truck className="w-4 h-4 ml-2" /></>}
                        </Button>
                    </form>
                </div>

                {orderData && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto px-4"
                    >
                        <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
                            <CardContent className="p-10 md:p-16 space-y-12">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="space-y-1">
                                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.2em] font-black text-[9px] px-3">Signal Actif</Badge>
                                        <h3 className="text-3xl font-black italic tracking-tight uppercase">Commande <span className="text-primary not-italic">#{orderData.id}</span></h3>
                                        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest italic flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-primary" /> {orderData.location} • {orderData.lastUpdate}
                                        </p>
                                    </div>
                                    <div className="px-6 py-3 rounded-2xl bg-stone-50 border border-stone-100 text-center">
                                         <p className="text-[8px] font-black uppercase text-stone-400 tracking-widest mb-1">État actueal</p>
                                         <p className="text-lg font-black text-emerald-500 uppercase italic tracking-tighter">{orderData.status}</p>
                                    </div>
                                </div>

                                <div className="space-y-8 relative">
                                    <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-stone-100" />
                                    {orderData.steps.map((step: any, idx: number) => (
                                        <div key={idx} className="flex gap-8 relative z-10 group">
                                            <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center transition-all ${step.completed ? 'bg-primary text-white' : 'bg-stone-50 text-stone-300'}`}>
                                                {step.completed ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                                            </div>
                                            <div className="pb-8">
                                                <h4 className={`text-md font-black uppercase tracking-tight ${step.completed ? 'text-[#2D241E]' : 'text-stone-300'} transition-colors`}>{step.label}</h4>
                                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest italic mt-1">{step.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-8 bg-[#0F172A] rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                                    <div className="space-y-2 relative z-10">
                                        <h4 className="text-xl font-black text-white italic tracking-tight">Besoin d&apos;aide ?</h4>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest italic">Contactez nos curateurs de rituels.</p>
                                    </div>
                                    <Button asChild variant="outline" className="h-14 px-10 rounded-full border-white/20 text-white hover:bg-white/5 font-black uppercase tracking-widest text-[9px] relative z-10">
                                        <a href="mailto:support@moomel.sn">Ouvrir Ticket <Zap className="w-3.5 h-3.5 ml-2 text-primary" /></a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </main>
        </div>
    )
}
