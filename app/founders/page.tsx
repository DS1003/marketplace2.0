"use client"

import { motion } from "framer-motion"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight, Quote, Heart, Award, Globe, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"

const founders = [
    {
        id: 1,
        name: "Anta Diouf",
        brand: "Koba Skin",
        role: "Crafting Tradition",
        image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=600&auto=format&fit=crop",
        quote: "Our shea butter is more than a product; it's a legacy passed down through generations of West African women.",
        story: "After returning to Dakar from Paris, Anta wanted to bridge the gap between traditional Senegalese botanicals and modern skincare science. She focuses on high-purity, small-batch formulas that honor the spirit of local cooperatives."
    },
    {
        id: 2,
        name: "Malick Sow",
        brand: "Baobab Essence",
        role: "Sustainable Innovator",
        image: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=600&auto=format&fit=crop",
        quote: "The Baobab tree is our life-giver. My goal is to ensure its benefits reach the world while protecting its future.",
        story: "Malick spent years researching the cold-pressing techniques used in the Thiès region. His brand focuses on 100% traceability and community reinvestment, ensuring that every bottle supports the ecosystem it came from."
    },
    {
        id: 3,
        name: "Fatou Ndiaye",
        brand: "Arona Naturals",
        role: "Botanical Artist",
        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=600&auto=format&fit=crop",
        quote: "Beauty is an act of mindfulness. Arona is about finding that quiet moment of peace in your daily ritual.",
        story: "Fatou's backgrounds in chemistry and holistic wellness led her to create Arona Naturals in Saint-Louis. She blends complex botanical profiles into simple, powerful skincare that focuses on the sensory experience and organic purity."
    }
]

export default function FoundersPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Header />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeContent blur={true} duration={0.8}>
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">The Visionaries</Badge>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E] leading-tight">
                                Crafted by <br />
                                <span className="text-primary italic">Soul & Science</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                                Behind every bottle on Moomel is a story of tradition, innovation, and a passion for the incredible botanicals of Senegal.
                            </p>
                            <div className="flex items-center gap-6 pt-4">
                                <Button size="lg" className="rounded-full px-8 bg-[#2D3436] hover:bg-[#1A1A1A] text-white">Join the Community</Button>
                                <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                    <div className="w-10 h-[1px] bg-muted-foreground" />
                                    Explore Stories
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative aspect-[4/5] w-full max-w-md mx-auto group">
                                <div className="absolute inset-4 border border-primary/20 transform group-hover:inset-0 transition-all duration-700 rounded-3xl" />
                                <NextImage
                                    src="https://images.unsplash.com/photo-1523450031586-f4017182aed3?q=80&w=800&auto=format&fit=crop"
                                    alt="Founders gathering"
                                    width={600}
                                    height={800}
                                    className="rounded-3xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>
                </FadeContent>
            </section>

            {/* Meet the Creators Grid */}
            <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-y border-[#E9E1D6]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-bold text-[#2D241E]">Meet our Creators</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We handpick entrepreneurs who share our commitment to organic purity and ethical Senegalese production.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {founders.map((founder, index) => (
                            <motion.div
                                key={founder.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
                            >
                                <div className="w-full lg:w-1/2 relative">
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] shadow-2xl group">
                                        <NextImage
                                            src={founder.image}
                                            alt={founder.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>
                                    {/* Floating Badge */}
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className={`absolute -bottom-8 ${index % 2 !== 0 ? '-left-8' : '-right-8'} bg-white p-8 rounded-[2rem] shadow-xl max-w-[280px] hidden md:block border border-[#E9E1D6]`}
                                    >
                                        <Quote className="w-8 h-8 text-primary/30 mb-4" />
                                        <p className="text-sm italic font-medium text-[#2D241E] leading-relaxed">
                                            "{founder.quote}"
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="space-y-2">
                                        <Badge variant="secondary" className="bg-[#F6EBE1] text-[#7B5B3F] font-bold text-xs uppercase tracking-widest border-none">{founder.role}</Badge>
                                        <h2 className="text-5xl font-bold text-[#2D241E]">{founder.name}</h2>
                                        <h3 className="text-2xl font-medium text-[#7B5B3F] italic">Founder of {founder.brand}</h3>
                                    </div>

                                    <div className="w-20 h-1 bg-primary/20 rounded-full" />

                                    <p className="text-lg text-muted-foreground leading-relaxed italic">
                                        {founder.story}
                                    </p>

                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Button variant="outline" className="rounded-full border-[#E9E1D6] hover:bg-[#F6EBE1] hover:text-[#7B5B3F]">
                                            <Globe className="w-4 h-4 mr-2" /> Website
                                        </Button>
                                        <Button variant="outline" className="rounded-full border-[#E9E1D6] hover:bg-[#F6EBE1] hover:text-[#7B5B3F]">
                                            <MessageSquare className="w-4 h-4 mr-2" /> Interview
                                        </Button>
                                    </div>

                                    <Link href="/marketplace" className="inline-flex items-center text-primary font-bold group pt-4">
                                        Shop collection from {founder.brand}
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Community Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2D241E] text-white">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <Badge className="mb-6 bg-white/10 text-white border-white/20">The Impact</Badge>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Building a Sustainable Beauty Ecosystem</h2>
                    <p className="text-xl text-white/70 max-w-3xl mb-16 leading-relaxed">
                        By spotlighting local creators, we ensure that the economic benefits of Senegal's botanicals remain within our communities, fostering growth and pride.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl">
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">12+</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Local Brands</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">450+</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Co-op Partners</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">100%</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Organic Sourced</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">5</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Senegal Regions</div>
                        </div>
                    </div>

                    <div className="mt-20">
                        <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-12 h-14 text-lg">
                            Join as a Creator
                        </Button>
                    </div>
                </div>
            </section>

            {/* Success Badges */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-12 opacity-40">
                    <div className="flex items-center gap-3">
                        <Award className="w-8 h-8" />
                        <span className="font-bold text-xl uppercase tracking-tighter">Bio Senegal</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Heart className="w-8 h-8" />
                        <span className="font-bold text-xl uppercase tracking-tighter">Ethical Beauty</span>
                    </div>
                    <div className="flex items-center gap-3 text-primary grayscale">
                        <span className="font-bold text-3xl italic">Vogue</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-xl uppercase tracking-tighter">Africa Craft</span>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
