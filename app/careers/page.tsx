"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Briefcase, Sparkles, Heart, Rocket, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-white text-[#2D241E]">
            <Header />
            <main className="pt-40 pb-20">
                <section className="max-w-4xl mx-auto px-4 text-center space-y-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-20 h-20 rounded-full bg-primary/5 text-primary flex items-center justify-center mx-auto border border-primary/10 mb-8"
                    >
                        <Briefcase className="w-8 h-8" />
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">Façonnez le <br /><span className="text-primary not-italic">Futur Artisanal.</span></h1>
                    <p className="text-xl text-[#2D241E]/40 font-bold italic max-w-2xl mx-auto underline decoration-primary/10 underline-offset-8">
                        Vous êtes passionné par la beauté, le digital et le patrimoine sénégalais ? Rejoignez notre mission pour porter les artisans plus haut.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    {[
                        { title: "Sénégal / Hybrid", type: "Creative Content Strategy", badge: "Avenir" },
                        { title: "Remote / Dakar", type: "Logistics Excellence Head", badge: "Prochainement" },
                    ].map((job, idx) => (
                        <div key={idx} className="p-10 rounded-[3rem] border border-stone-100 bg-[#FDFBF7] flex justify-between items-center group hover:bg-white hover:shadow-2xl transition-all duration-700">
                            <div className="space-y-2">
                                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-primary/20 text-primary px-3">{job.badge}</Badge>
                                <h3 className="text-2xl font-black tracking-tight">{job.type}</h3>
                                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest italic">{job.title}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </div>
                    ))}
                </section>

                {/* Newsletter-ish CTA */}
                <div className="max-w-4xl mx-auto px-4 text-center space-y-8 p-20 bg-primary/5 rounded-[4rem] border border-primary/10">
                    <Sparkles className="w-10 h-10 text-primary mx-auto opacity-30" />
                    <h2 className="text-3xl font-black italic">Aucune opportunité <span className="text-primary not-italic">en vue ?</span></h2>
                    <p className="text-sm text-[#2D241E]/50 font-bold uppercase tracking-widest italic">Envoyez votre candidature spontanée à <span className="text-[#2D241E] border-b border-[#2D241E]">talents@moomel.sn</span></p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
