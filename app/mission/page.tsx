"use client"

import { motion } from "framer-motion"
import NextImage from "next/image"
import { Shield, Sparkles, Heart, Leaf, Award, Globe, ArrowRight, CheckCircle2, History, Users, Target } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const pillars = [
    {
        icon: Leaf,
        title: "Pureté Botanique",
        description: "Nous n'acceptons que des produits 100% naturels, sans compromis sur la qualité des ingrédients sourcés au Sénégal."
    },
    {
        icon: Shield,
        title: "Équité Radicale",
        description: "Chaque artisan perçoit une rémunération juste, valorisant son savoir-faire ancestral et son temps de création."
    },
    {
        icon: Users,
        title: "Impact Communautaire",
        description: "Moomel réinvestit une partie de ses bénéfices dans la formation et l'équipement des coopératives de femmes rurales."
    },
    {
        icon: Globe,
        title: "Héritage Moderne",
        description: "Nous transformons les traditions sénégalaises en une expérience de luxe contemporaine pour le monde entier."
    }
]

export default function MissionPage() {
    return (
        <div className="min-h-screen bg-white text-[#2D241E]">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center space-y-8"
                    >
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary uppercase tracking-[0.3em] text-[10px] font-bold px-6 py-2 rounded-full">
                            Notre Manifeste
                        </Badge>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#2D241E] leading-none italic">
                            Honorer la <span className="text-primary not-italic block mt-2">Terre.</span>
                            Valoriser l&apos;<span className="text-[#7B5B3F]">Humain.</span>
                        </h1>
                        <p className="text-xl text-[#2D241E]/50 max-w-2xl mx-auto leading-relaxed italic">
                            Moomel n&apos;est pas seulement une marketplace. C&apos;est un pont entre le savoir-faire ancestral du Sénégal et une conscience globale de la beauté.
                        </p>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 -left-20 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -z-10" />
                    <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#7B5B3F]/5 blur-[120px] rounded-full -z-10" />
                </section>

                {/* Core Philosophy */}
                <section className="py-32 bg-[#FDFBF7] border-y border-stone-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl group"
                        >
                            <NextImage 
                                src="https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=800&auto=format&fit=crop" 
                                alt="Artisan working" 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/40 to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-white">
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                                    <p className="text-sm italic leading-relaxed">
                                        &quot;Notre mission est de faire en sorte que chaque goutte d&apos;huile de baobab ou chaque gramme de beurre de karité raconte l&apos;histoire de la personne qui l&apos;a patiemment élaboré.&quot;
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-12">
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Pourquoi nous existons.</h2>
                                <p className="text-lg text-[#2D241E]/60 leading-relaxed italic">
                                    Le Sénégal regorge de ressources botaniques uniques et d&apos;artisans talentueux. Pourtant, ces créateurs n&apos;ont souvent pas accès aux plateformes de distribution haut de gamme. Moomel change cette dynamique en offrant une vitrine d&apos;excellence qui respecte l&apos;environnement et l&apos;humain.
                                </p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { icon: Filter, text: "Curating l'excellence sans intermédiaire" },
                                    { icon: ShieldCheck, text: "Authentification de chaque source d'ingrédient" },
                                    { icon: History, text: "Protection du patrimoine immatériel sénégalais" },
                                    { icon: Target, text: "Objectif : 100% de neutralité plastique d'ici 2026" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary border border-stone-100 group-hover:bg-primary group-hover:text-white transition-all">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-sm text-[#2D241E]/80 uppercase tracking-widest leading-none">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Button asChild size="lg" className="h-16 rounded-full bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-[0.2em] text-xs px-10 transition-all hover:translate-x-2">
                                <Link href="/sellers">Découvrir nos Artisans <ArrowRight className="ml-2 w-4 h-4" /></Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Pillars Grid */}
                <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <Badge variant="outline" className="mb-6 border-stone-200">Valeurs Fondamentales</Badge>
                        <h2 className="text-4xl font-bold tracking-tight">Nos Piliers Éthiques.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {pillars.map((pillar, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="p-8 rounded-[2.5rem] bg-white border border-stone-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 group ring-1 ring-stone-100 ring-offset-4 ring-offset-transparent hover:ring-primary/10"
                            >
                                <div className="w-16 h-16 rounded-3xl bg-primary/5 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    <pillar.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black mb-4 uppercase tracking-tight">{pillar.title}</h3>
                                <p className="text-sm text-[#2D241E]/60 leading-relaxed italic">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 bg-[#2D241E] text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
                    </div>
                    
                    <div className="max-w-4xl mx-auto px-4 text-center space-y-12 relative z-10">
                        <h2 className="text-5xl md:text-7xl font-bold italic tracking-tight">
                            Rejoignez la <br />
                            <span className="text-primary not-italic">Révolution Douce.</span>
                        </h2>
                        <p className="text-xl text-white/50 leading-relaxed max-w-2xl mx-auto italic">
                            Chaque achat sur Moomel est une voix pour la durabilité, le respect et la mise en lumière des talents cachés du Sénégal.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-white text-black hover:bg-stone-100 font-bold uppercase tracking-widest text-xs">
                                <Link href="/marketplace">Explorer les rituels</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-16 px-10 rounded-full border-white/20 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs">
                                <Link href="/sell">Devenir un Artisan</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
