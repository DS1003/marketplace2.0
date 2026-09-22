"use client"

import { motion } from "framer-motion"
import { RefreshCcw, ShieldCheck, HelpCircle, ArrowRight, CornerDownLeft, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReturnsPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
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
                                Politique de Retour
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E] leading-tight italic">
                                La Confiance <br />
                                <span className="text-primary not-italic">au Coeur du Rituel.</span>
                            </h1>
                            <p className="text-xl text-[#2D241E]/40 leading-relaxed font-bold italic underline decoration-primary/10">
                                Nous acceptons les retours dans les 14 jours suivant la réception si le produit n&apos;est pas conforme à votre attente.
                            </p>
                        </motion.div>

                        <div className="space-y-4">
                            {[
                                { icon: CornerDownLeft, title: "Délai de réflexion", text: "Vous disposez de 14 jours calendaires pour changer d'avis sur votre rituel." },
                                { icon: ShieldCheck, title: "État du produit", text: "L'emballage original et le sceau de sécurité doivent être intacts pour les produits d'hygiène." },
                                { icon: RefreshCcw, title: "Reboursement Intégral", text: "Dès validation par l'artisan, le remboursement est crédité sur votre moyen de paiement sous 5 jours." }
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

                    {/* Right: Contact Support Card */}
                    <div className="lg:w-1/2">
                         <Card className="border-none shadow-2xl bg-white rounded-[4rem] overflow-hidden p-12 md:p-16 relative group">
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full transition-transform group-hover:scale-125 duration-1000" />
                            <div className="relative z-10 space-y-10">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-bold italic flex items-center gap-3">
                                        Démarrer une <span className="text-primary not-italic inline-flex items-center gap-2">Démarche <Zap className="w-6 h-6 text-primary" /></span>
                                    </h3>
                                    <p className="text-[#2D241E]/40 text-[10px] font-black uppercase tracking-widest leading-loose">Notre équipe support est là pour faciliter votre remboursement.</p>
                                </div>

                                <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-800">Étape 1 : Contact</h4>
                                        <p className="text-[11px] text-[#2D241E]/60 font-medium italic italic">Envoyez votre demande à <span className="text-primary font-bold">support@moomel.sn</span> avec votre numéro de commande.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-800">Étape 2 : Renvoi</h4>
                                        <p className="text-[11px] text-[#2D241E]/60 font-medium italic italic">Un bon de retour prépayé (valable au Sénégal) vous sera transmis sous 24h.</p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                     <Button asChild className="w-full h-16 rounded-full bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-black/10 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] border-none">
                                        <Link href="/contact">Contacter le Support <HelpCircle className="w-4 h-4 ml-2" /></Link>
                                    </Button>
                                </div>
                            </div>
                         </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
