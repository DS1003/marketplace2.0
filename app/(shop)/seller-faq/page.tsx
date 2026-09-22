"use client"

import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, Star, ShieldCheck, CreditCard, Store, Zap, ChevronRight, MessageCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const fags = [
    {
        question: "Comment mon laboratoire est-il validé ?",
        answer: "Chaque candidature est examinée par nos curateurs sous 72h. Nous vérifions l'authenticité de vos produits, la qualité de vos ingrédients (naturels/bio) et votre capacité de production artisanale."
    },
    {
        question: "Quelles sont les commissions de Moomel ?",
        answer: "Moomel prélève une commission de 15% sur chaque vente. Ce montant couvre les frais de transaction, la maintenance de la marketplace, le marketing digital et le support logistique."
    },
    {
        question: "Comment se passe la logistique de livraison ?",
        answer: "Vous préparez le colis, et notre partenaire logistique (Dakar Course ou DHL pour l'international) vient le récupérer directement à votre adresse. Tout est prépayé et synchronisé."
    },
    {
        question: "Quand suis-je payé pour mes ventes ?",
        answer: "Les paiements sont reversés sur votre compte Wave ou virement bancaire tous les lundis, pour les commandes livrées et validées de la semaine précédente."
    }
]

export default function SellerFAQPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#2D241E]">
            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* Left: Introduction */}
                    <div className="lg:w-1/3 space-y-12">
                         <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.3em] text-[10px] font-black px-6 py-2 rounded-full">
                                Guide de l&apos;Artisan
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E] leading-tight italic">
                                Alchimie <br />
                                <span className="text-primary not-italic">Artisanale.</span>
                            </h1>
                            <p className="text-xl text-[#2D241E]/40 leading-relaxed font-bold italic underline decoration-primary/10 underline-offset-8">
                                Tout ce que vous devez savoir pour porter votre savoir-faire au sommet de l&apos;excellence digitale.
                            </p>
                        </motion.div>

                        <div className="p-10 rounded-[3rem] bg-[#0F172A] text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-1000" />
                            <div className="relative z-10 space-y-6">
                                <Store className="w-10 h-10 text-primary" />
                                <h3 className="text-2xl font-black italic tracking-tight">Prêt à <br /><span className="text-primary not-italic inline-flex items-center gap-2">Lancer ? <Zap className="w-6 h-6 text-primary fill-primary opacity-20" /></span></h3>
                                <p className="text-white/40 text-sm font-bold italic italic">Rejoignez la plus prestigieuse communauté artisanale du Sénégal.</p>
                                <Button asChild className="w-full h-14 rounded-2xl bg-white text-black hover:bg-stone-100 font-bold uppercase tracking-widest text-[9px] shadow-sm">
                                    <Link href="/sell">Ouvrir mon Labo</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right: FAQ Accordion */}
                    <div className="lg:w-2/3 space-y-20">
                        <div className="space-y-6">
                             <h2 className="text-3xl font-bold italic">Réponses pour <span className="text-primary not-italic">les Créateurs</span></h2>
                             <Accordion type="single" collapsible className="w-full space-y-3">
                                {fags.map((faq, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-white rounded-3xl px-8 py-2 shadow-sm transition-all hover:translate-x-2">
                                        <AccordionTrigger className="hover:no-underline text-left font-black text-base md:text-lg uppercase tracking-tighter">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-[#2D241E]/60 text-base leading-relaxed italic pb-6 font-medium">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>

                        <div className="p-12 border-2 border-dashed border-stone-100 rounded-[4rem] bg-[#FDFBF7] flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase text-stone-300 tracking-[0.3em]">Besoin d&apos;assistance</p>
                                <h4 className="text-2xl font-black italic opacity-90 underline underline-offset-8 decoration-primary/20">Dialogue Personnalisé ?</h4>
                            </div>
                            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-[#2D241E] text-white hover:bg-black font-black uppercase tracking-widest text-[10px] border-none shadow-xl shadow-black/10">
                                <Link href="/contact" className="flex items-center gap-3">Parler à un Curateur <MessageCircle className="w-4 h-4 ml-2" /></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
