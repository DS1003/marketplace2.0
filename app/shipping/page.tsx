"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Truck, MapPin, Globe, Clock, ShieldCheck, Box } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
            <Header />
            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Left: Content */}
                    <div className="lg:w-1/2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.3em] text-[10px] font-black px-6 py-2 rounded-full">
                                Logistique Artisanale
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E] leading-tight italic">
                                Du Labo à <br />
                                <span className="text-primary not-italic">Votre Rituel.</span>
                            </h1>
                            <p className="text-xl text-[#2D241E]/40 leading-relaxed font-bold italic underline decoration-primary/10">
                                Chaque expédition est une promesse d&apos;authenticité. Nous livrons les rituels du Sénégal partout dans le monde avec un soin extrême.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                { icon: MapPin, title: "Dakar & Sénégal", text: "Livraison le jour même ou sous 24h à Dakar. Partout au Sénégal sous 48h." },
                                { icon: Globe, title: "International Flow", text: "Expéditions mondiales via DHL & FedEx. Délais de 3 à 7 jours ouvrés." },
                                { icon: ShieldCheck, title: "Tracking Protocole", text: "Suivi en temps réel de votre colis dès sa sortie du laboratoire de l&apos;artisan." }
                            ].map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-[2rem] bg-white border border-stone-100 flex items-start gap-5 group hover:shadow-xl transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black uppercase tracking-widest text-[11px] text-[#2D241E]">{item.title}</h4>
                                        <p className="text-[13px] text-[#2D241E]/60 italic font-medium leading-relaxed">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Zones Pricing Card */}
                    <div className="lg:w-1/2">
                         <Card className="border-none shadow-2xl bg-[#0F172A] text-white rounded-[4rem] overflow-hidden p-12 md:p-16 relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold italic flex items-center gap-3">
                                        Frais de <span className="text-primary not-italic">Vecteur</span>
                                        <Box className="w-6 h-6 opacity-20" />
                                    </h3>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-loose">Indication des tarifs de protocol de livraison.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-tight">Zone Dakar Center</p>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest italic mt-1">Plateau, Point E, Almadies</p>
                                        </div>
                                        <span className="text-xl font-black text-primary">2,500 FCFA</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-tight">Zone Banlieue</p>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest italic mt-1">Pikine, Guediawaye, Rufisque</p>
                                        </div>
                                        <span className="text-xl font-black text-primary">3,500 FCFA</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-white/5">
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-tight">Régions Sénégal</p>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest italic mt-1">Thiès, St-Louis, Ziguinchor</p>
                                        </div>
                                        <span className="text-xl font-black text-primary">5,000 FCFA</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4">
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-tight text-white">Livraison Mondiale</p>
                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest italic mt-1">Europe, USA, Asie</p>
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-[#2D241E] bg-primary px-3 py-1 rounded-full">Calculé au Checkout</span>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center gap-4">
                                     <Clock className="w-5 h-5 text-primary opacity-60" />
                                     <p className="text-[10px] font-bold text-white/60 leading-relaxed italic">
                                         Les commandes passées avant midi sont traitées le jour même par nos artisans partenaires.
                                     </p>
                                </div>
                            </div>
                         </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
