"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Newspaper, Mail, Download, Star, ExternalLink, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PressPage() {
    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#2D241E]">
            <Header />
            <main className="pt-40 pb-24">
                <section className="max-w-4xl mx-auto px-4 text-center space-y-12 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.3em] text-[10px] font-black px-6 py-2 rounded-full">
                            Espace Presse & Média
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">Moomel dans <br /><span className="text-primary not-italic">les Titres.</span></h1>
                        <p className="text-xl text-[#2D241E]/40 font-bold italic max-w-2xl mx-auto underline decoration-primary/10 underline-offset-8">
                            Retrouvez les communiqués, les mentions média et les kits de marque du marketplace d&apos;excellence artisanale.
                        </p>
                    </motion.div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                    {[
                        { outlet: "Vogue Africa", date: "Jan 2026", title: "Moomel : L'alchimie du Karité rencontre le digital.", link: "#" },
                        { outlet: "Dakar News", date: "Dec 2025", title: "Comment Moomel digitalise les laboratoires du Sénégal.", link: "#" },
                        { outlet: "Tech Africa", date: "Nov 2025", title: "La marketplace qui valorise le patrimoine sahélien.", link: "#" }
                    ].map((press, idx) => (
                        <div key={idx} className="p-12 rounded-[3.5rem] bg-white border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 space-y-8 flex flex-col justify-between group">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-6 border-b border-stone-100">
                                    <span className="text-[10px] font-black uppercase text-primary tracking-[0.2em]">{press.outlet}</span>
                                    <span className="text-[9px] font-bold uppercase text-stone-300 tracking-widest">{press.date}</span>
                                </div>
                                <h3 className="text-2xl font-black tracking-tight italic opacity-90 group-hover:text-primary transition-colors">{press.title}</h3>
                            </div>
                            <Button variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent text-[#2D241E] font-black uppercase tracking-widest text-[9px] gap-2 underline underline-offset-4 decoration-primary/20">
                                Lire l&apos;article <ExternalLink className="w-3 h-3 text-primary" />
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto px-4">
                    <div className="p-16 md:p-24 bg-[#0F172A] rounded-[5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[120px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
                        <div className="space-y-6 relative z-10 max-w-lg">
                            <h2 className="text-4xl md:text-5xl font-black italic tracking-tight uppercase leading-none">Le Kit <br /><span className="text-primary not-italic">Média 2026.</span></h2>
                            <p className="text-white/40 text-sm font-bold italic max-w-sm">Logos, typographies et visuels haute fidélité pour vos publications.</p>
                            <Button className="h-14 px-8 rounded-full bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-[10px] border-none shadow-xl shadow-primary/20">
                                Télécharger le Pack <Download className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                        <div className="w-64 h-64 rounded-full bg-white/5 border border-white/5 flex items-center justify-center relative z-10">
                            <Zap className="w-24 h-24 text-primary fill-primary opacity-20" />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
