"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Shield, Sparkles, Heart, Leaf, Award, Globe, ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"
import { Newsletter } from "@/components/newsletter"

const values = [
    {
        icon: Leaf,
        title: "100% Organic",
        description: "Every ingredient we source is grown without synthetic pesticides or fertilizers, preserving the integrity of the soil and the plant."
    },
    {
        icon: Shield,
        title: "Ethically Sourced",
        description: "We work directly with cooperatives in Senegal to ensure fair wages and sustainable harvesting practices that protect our local forests."
    },
    {
        icon: Heart,
        title: "Community Growth",
        description: "A portion of every sale is reinvested into local entrepreneurship and educational initiatives for our partner artisans."
    },
    {
        icon: Award,
        title: "Premium Quality",
        description: "Our standards meet the highest international luxury skincare benchmarks, proving the exceptional efficacy of African botanicals."
    }
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
                <FadeContent blur={true} duration={1}>
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2 relative space-y-10 group">
                            <div className="relative aspect-square w-full max-w-lg mx-auto transform hover:rotate-2 transition-transform duration-1000">
                                <div className="absolute inset-4 border-2 border-primary/10 rounded-[3rem]" />
                                <Image
                                    src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop"
                                    alt="Traditional extraction"
                                    fill
                                    className="rounded-[3rem] object-cover shadow-2xl z-10"
                                />
                            </div>
                            {/* Floating element */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute -top-10 -right-10 hidden lg:block z-20"
                            >
                                <div className="bg-[#F6EBE1] p-10 rounded-full w-48 h-48 flex items-center justify-center text-center shadow-lg border border-primary/10 transition-transform hover:scale-105 duration-500">
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl font-bold text-primary">100%</span>
                                        <span className="text-xs font-bold uppercase tracking-tight text-[#7B5B3F]">Organic Ingredients</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 space-y-8">
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">Our Story</Badge>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E] leading-tight">
                                Authentic <br />
                                Beauty <span className="italic text-primary font-medium">Redefined.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Moomel was born from a simple realization: the finest beauty secrets of the world were already present in our own soil, waiting to be shared with the world in a way that respects the land and its people.
                            </p>
                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-4 text-sm font-bold text-[#2D241E] uppercase tracking-widest">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    Founded in Dakar, Senegal
                                </div>
                                <div className="flex items-center gap-4 text-sm font-bold text-[#2D241E] uppercase tracking-widest">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Leaf className="w-6 h-6" />
                                    </div>
                                    100% Botanical Formulations
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeContent>
            </section>

            {/* Mission & Vision */}
            <section className="bg-primary/5 py-32 border-y border-border/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-[#2D241E] leading-snug lg:max-w-md">Our Mission is to empower local creators.</h2>
                            <p className="text-lg text-muted-foreground leading-loose">
                                We curate the best Senegalese organic beauty brands, providing them with a platform that meets global standards of luxury and sustainability.
                                Moomel is a marketplace that fosters a holistic connection between the conscious consumer and the artisan.
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    "Supporting 10+ local cooperatives",
                                    "Ensuring 100% price transparency",
                                    "Carbon neutral shipping by 2027",
                                    "Direct impact reinvestment programs"
                                ].map(item => (
                                    <div key={item} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl group">
                            <Image
                                src="https://images.unsplash.com/photo-1551632432-c735e8306917?q=80&w=800&auto=format&fit=crop"
                                alt="Sustainable harvest"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Grid */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-24 space-y-4">
                    <Badge className="bg-primary/10 text-primary border-primary/20">Our Principles</Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#2D241E]">What we stand for.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {values.map((value, idx) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group p-8 bg-white border border-[#E9E1D6] rounded-[2.5rem] hover:shadow-2xl transition-all duration-700 hover:border-primary/20"
                        >
                            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
                                <value.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D241E] mb-4">{value.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trust & Certifications */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2D241E] text-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16">
                    <div className="max-w-xl space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold italic">The Purity Guarantee.</h2>
                        <p className="text-white/70 text-lg leading-relaxed">
                            Every product listed on Moomel goes through a rigorous vetting process to ensure it matches our commitment to 100% botanical ingredients and ethical production.
                        </p>
                        <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 gap-2 font-bold px-10 h-14 text-lg group">
                            View Our Standards <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-8 w-full max-w-md">
                        <div className="p-8 border border-white/10 rounded-3xl text-center space-y-4 hover:border-white/40 transition-colors">
                            <div className="text-3xl font-bold text-primary">A+</div>
                            <div className="text-xs uppercase font-bold tracking-widest text-white/50">Ingredient Grade</div>
                        </div>
                        <div className="p-8 border border-white/10 rounded-3xl text-center space-y-4 hover:border-white/40 transition-colors">
                            <Sparkles className="w-10 h-10 text-primary mx-auto" />
                            <div className="text-xs uppercase font-bold tracking-widest text-white/50">Bio-Certified</div>
                        </div>
                        <div className="p-8 border border-white/10 rounded-3xl text-center space-y-4 hover:border-white/40 transition-colors">
                            <div className="text-3xl font-bold text-primary">12+</div>
                            <div className="text-xs uppercase font-bold tracking-widest text-white/50">Vetted Brands</div>
                        </div>
                        <div className="p-8 border border-white/10 rounded-3xl text-center space-y-4 hover:border-white/40 transition-colors">
                            <Shield className="w-10 h-10 text-primary mx-auto" />
                            <div className="text-xs uppercase font-bold tracking-widest text-white/50">Tested Rituals</div>
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
            <Footer />
        </div>
    )
}
