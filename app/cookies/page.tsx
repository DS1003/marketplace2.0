"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Cookie, Settings, Eye, Info } from "lucide-react"

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#2D241E]">
            <Header />
            <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto font-medium">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mx-auto border border-primary/10">
                            <Cookie className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tight uppercase">Politique de <br /><span className="text-primary not-italic">Cookies</span></h1>
                        <p className="text-[#2D241E]/40 font-bold uppercase tracking-[0.2em] text-[10px]">Gestion du Flux Digital Moomel</p>
                    </div>

                    <div className="prose prose-stone max-w-none text-[#2D241E]/70 space-y-8 italic leading-relaxed uppercase tracking-widest text-[11px] font-black">
                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic opacity-90">
                                <Info className="w-5 h-5 text-primary" /> 1. Qu&apos;est-ce qu&apos;un cookie Moomel ?
                            </h2>
                            <p className="opacity-60">
                                Un &quot;cookie&quot; est un petit fragment de données qui nous permet de vous reconnaître lors de vos rituels de soin sur notre plateforme. Ils sont stockés sur votre terminal pour fluidifier votre immersion.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic opacity-90">
                                <Settings className="w-5 h-5 text-primary" /> 2. Usage des Traceurs
                            </h2>
                            <p className="opacity-60">
                                Nous utilisons des cookies pour conserver votre panier actif, mémoriser vos préférences de langue et analyser le flux de navigation pour optimiser l&apos;accessibilité de nos artisans.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic opacity-90">
                                <Eye className="w-5 h-5 text-primary" /> 3. Consentement
                            </h2>
                            <p className="opacity-60">
                                En continuant votre navigation, vous acceptez le dépot de ces rituels digitaux indispensables. Vous pouvez toutefois désactiver les cookies non essentiels depuis les réglages de votre navigateur.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}
