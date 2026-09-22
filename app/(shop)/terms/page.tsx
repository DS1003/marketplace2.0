"use client"

import { motion } from "framer-motion"
import { FileText, Gavel, ShieldAlert, CheckSquare, Zap } from "lucide-react"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#2D241E]">
            <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mx-auto border border-primary/10">
                            <Gavel className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black italic tracking-tight uppercase">Conditions <br /><span className="text-primary not-italic inline-flex items-center gap-4">d&apos;Utilisation <Zap className="w-12 h-12 text-primary fill-primary opacity-20" /></span></h1>
                        <p className="text-[#2D241E]/40 font-bold uppercase tracking-[0.2em] text-[10px]">Accord de Rituel Moomel</p>
                    </div>

                    <div className="prose prose-stone max-w-none text-[#2D241E]/70 space-y-10 font-bold text-sm tracking-widest leading-loose uppercase">
                        <section className="space-y-6 pb-10 border-b border-primary/5">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 tracking-tighter not-italic opacity-90">
                                <CheckSquare className="w-5 h-5 text-primary" /> 1. Acceptation du Protocole
                            </h2>
                            <p className="opacity-60 italic">
                                En accédant à la marketplace Moomel, vous acceptez tacitement les règles régissant notre plateforme d&apos;excellence artisanale. Moomel est un espace de respect et de valorisation de l&apos;humain.
                            </p>
                        </section>

                        <section className="space-y-6 pb-10 border-b border-primary/5">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 tracking-tighter not-italic opacity-90">
                                <FileText className="w-5 h-5 text-primary" /> 2. Commandes & Paiements
                            </h2>
                            <p className="opacity-60 italic">
                                Chaque commande passée est un engagement ferme. Les paiements transitent par nos vecteurs de confiance sécurisés. Moomel se réserve le droit d&apos;annuler tout rituel de transaction suspect.
                            </p>
                        </section>

                        <section className="space-y-6 pb-10 border-b border-primary/5">
                            <h2 className="text-2xl font-black text-[#2D241E] flex items-center gap-3 tracking-tighter not-italic opacity-90">
                                <ShieldAlert className="w-5 h-5 text-primary" /> 3. Responsabilité Artisanale
                            </h2>
                            <p className="opacity-60 italic">
                                Moomel agit comme un curateur. Bien que nous vérifiions l&apos;authenticité de chaque artisan partenaire, la fabrication finale de l&apos;objet de soin relève de la responsabilité du laboratoire de l&apos;artisan.
                            </p>
                        </section>

                        <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 text-center opacity-60">
                            <p className="text-[10px] uppercase font-black italic">
                                Moomel SN - Bureau du Dialogue - Dakar, Sénégal.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
