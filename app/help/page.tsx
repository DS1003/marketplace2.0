"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { HelpCircle, Search, MessageCircle, Truck, ShieldCheck, CreditCard, User, ArrowRight, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
    {
        question: "Comment suivre ma commande ?",
        answer: "Une fois votre commande expédiée par l'artisan, vous recevrez un email avec un lien de suivi DHL ou FedEx. Vous pouvez aussi consulter l'état dans votre espace 'Mon Compte'."
    },
    {
        question: "Les produits sont-ils vraiment 100% naturels ?",
        answer: "Absolument. Chaque produit sur Moomel passe par une curation rigoureuse. Nous vérifions la provenance des ingrédients et l'absence de composants synthétiques nocifs."
    },
    {
        question: "Quels sont les délais de livraison ?",
        answer: "Pour le Sénégal, comptez 24h à 48h. Pour l'international, les délais varient entre 3 et 7 jours ouvrés selon votre zone géographique."
    },
    {
        question: "Comment devenir vendeur sur Moomel ?",
        answer: "Si vous êtes un artisan produisant des soins naturels de haute qualité au Sénégal, vous pouvez postuler via notre page 'Devenir Vendeur'. Notre équipe étudiera votre laboratoire sous 72h."
    }
]

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
            <Header />
            <main className="pt-40 pb-24">
                {/* Hero Search */}
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8 mb-20">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight italic">
                        Comment pouvons-nous <br />
                        <span className="text-primary not-italic inline-flex items-center gap-4">vous accompagner ? <Zap className="w-10 h-10 text-primary opacity-20" /></span>
                    </h1>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2D241E]/30" />
                        <Input 
                            placeholder="Rechercher une réponse, un protocole..." 
                            className="h-16 pl-14 pr-8 rounded-full border-stone-200 bg-white shadow-xl shadow-black/5 text-lg font-medium focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {[
                        { icon: Truck, title: "Livraison", text: "Suivi, délais et zones de vecteur." },
                        { icon: ShieldCheck, title: "Sécurité", text: "Protection des données et authenticité." },
                        { icon: CreditCard, title: "Paiements", text: "Moyens de paiement et facturation." },
                        { icon: User, title: "Compte", text: "Gérer vos rituels et préférences." }
                    ].map((cat, idx) => (
                        <Card key={idx} className="border-none shadow-sm bg-white rounded-[2rem] p-8 hover:shadow-xl hover:translate-y-[-4px] transition-all cursor-pointer group">
                            <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <cat.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-black uppercase tracking-tight mb-2">{cat.title}</h3>
                            <p className="text-[11px] text-[#2D241E]/50 font-bold uppercase tracking-widest italic">{cat.text}</p>
                        </Card>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto px-4 space-y-12">
                    <h2 className="text-3xl font-bold italic text-center">Questions <span className="text-primary not-italic">Fréquentes</span></h2>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, idx) => (
                            <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-white rounded-3xl px-8 py-2 shadow-sm">
                                <AccordionTrigger className="hover:no-underline text-left font-bold text-base md:text-lg">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-[#2D241E]/60 text-base leading-relaxed italic pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                {/* Contact CTA */}
                <div className="max-w-5xl mx-auto px-4 mt-32">
                    <div className="p-12 md:p-20 bg-[#2D241E] rounded-[4rem] text-white text-center space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                        <h2 className="text-4xl md:text-5xl font-bold italic">Toujours en <span className="text-primary not-italic">Transition ?</span></h2>
                        <p className="text-white/50 text-xl italic max-w-xl mx-auto">Nos curateurs sont disponibles pour une assistance personnalisée en temps réel.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-[10px] border-none">
                                <Link href="/contact" className="flex items-center gap-3">Parler à un humain <MessageCircle className="w-4 h-4" /></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
