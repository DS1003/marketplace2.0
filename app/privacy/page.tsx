"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, Scale } from "lucide-react"

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
            <Header />
            <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mx-auto border border-primary/10">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tight">Politique de <br /><span className="text-primary not-italic">Confidentialité</span></h1>
                        <p className="text-[#2D241E]/40 font-bold uppercase tracking-[0.2em] text-[10px]">Dernière mise à jour : 16 Avril 2026</p>
                    </div>

                    <div className="prose prose-stone max-w-none text-[#2D241E]/70 space-y-8 italic font-medium leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic">
                                <Eye className="w-5 h-5 text-primary" /> 1. Collecte des Données
                            </h2>
                            <p>
                                Chez Moomel, nous respectons l&apos;intégrité de vos rituels digitaux. Nous ne collectons que les informations essentielles pour assurer la livraison de vos produits et l&apos;amélioration de votre expérience artisanale : nom, email, adresse de livraison et préférences de rituels.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic">
                                <Lock className="w-5 h-5 text-primary" /> 2. Protection & Sécurité
                            </h2>
                            <p>
                                Vos données sont cryptées et stockées sur des serveurs sécurisés. Nous ne partageons jamais vos informations personnelles avec des tiers à des fins commerciales. Seuls nos partenaires logistiques ont accès aux informations nécessaires à la livraison de vos colis.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic">
                                <FileText className="w-5 h-5 text-primary" /> 3. Vos Droits
                            </h2>
                            <p>
                                Conformément aux lois sur la protection des données, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles. Vous pouvez exercer ces droits à tout moment depuis votre compte Moomel ou en nous contactant directement.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 uppercase tracking-tight not-italic">
                                <Scale className="w-5 h-5 text-primary" /> 4. Cookies & Rituels Digitaux
                            </h2>
                            <p>
                                Nous utilisons des cookies pour mémoriser vos préférences et fluidifier votre navigation. Ces petits fichiers nous aident à comprendre quels rituels vous passionnent le plus afin de personnaliser nos collections.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}
