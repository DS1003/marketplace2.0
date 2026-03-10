"use client"

import { motion } from "framer-motion"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Leaf, Droplets, Wind, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"
import { FadeContent } from "@/components/ui/fade-content"

const mainCategories = [
    {
        id: "skincare",
        name: "Skincare",
        description: "Nourishing formulas for a radiant, healthy complexion.",
        icon: Sparkles,
        color: "bg-amber-50",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
        subcategories: ["Serums", "Moisturizers", "Cleansers", "Masks"]
    },
    {
        id: "haircare",
        name: "Haircare",
        description: "Revitalize your hair with the power of African plants.",
        icon: Wind,
        color: "bg-emerald-50",
        image: "https://images.unsplash.com/photo-1527799822340-47baf0d46a46?q=80&w=800&auto=format&fit=crop",
        subcategories: ["Oils", "Shampoos", "Conditioners", "Scalp Care"]
    },
    {
        id: "bodycare",
        name: "Body Care",
        description: "Pure indulgence for your skin from head to toe.",
        icon: Droplets,
        color: "bg-rose-50",
        image: "https://images.unsplash.com/photo-1552046122-03184de85ec0?q=80&w=800&auto=format&fit=crop",
        subcategories: ["Soaps", "Body Butters", "Exfoliants", "Oils"]
    },
    {
        id: "wellness",
        name: "Wellness",
        description: "Essential oils and accessories for mindful living.",
        icon: Leaf,
        color: "bg-stone-50",
        image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=800&auto=format&fit=crop",
        subcategories: ["Essential Oils", "Diffusers", "Herbal Teas"]
    }
]

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeContent blur={true} duration={0.8}>
                    <div className="flex flex-col items-center text-center mb-16">
                        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary">
                            Browse Collections
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Shop by Category
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Explore our curated selection of premium beauty and wellness products, organized to help you find exactly what your ritual needs.
                        </p>
                    </div>
                </FadeContent>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mainCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={`/marketplace?category=${category.id}`}>
                                <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-700 h-[500px] relative rounded-[2.5rem]">
                                    <NextImage
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                <category.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-sm font-medium tracking-widest uppercase opacity-80">Collection</span>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.name}</h2>
                                        <p className="text-lg text-white/70 max-w-md mb-8">
                                            {category.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {category.subcategories.map(sub => (
                                                <span key={sub} className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm">
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>

                                        <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 flex items-center gap-2 group/btn">
                                            Explore Collection <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Trends Section */}
            <section className="bg-primary/5 py-24 px-4 sm:px-6 lg:px-8 border-y border-border/40 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-8">
                        <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">Seasonal Focus</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold font-jakarta text-[#1A1A1A]">Skin Radiance Ritual</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Discover our award-winning combination of Baobab serum and Hibiscus rose water, designed to deeply hydrate and brighten your complexion using only the purest Senegalese botanicals.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Button size="lg" className="rounded-full px-8 bg-[#2D3436] hover:bg-[#1A1A1A] text-white">Shop the Ritual</Button>
                            <Button size="lg" variant="ghost" className="rounded-full group">
                                Learn More <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-square w-full max-w-md mx-auto"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                            <NextImage
                                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
                                alt="Radiance Ritual"
                                width={600}
                                height={600}
                                className="relative z-10 rounded-3xl object-cover shadow-2xl"
                            />
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Leaf className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold">100% Organic</div>
                                    <div className="text-xs text-muted-foreground">Certified Sourced</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grid of smaller categories or ingredients */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Shop by Ingredient</h2>
                    <p className="text-muted-foreground">The soul of our formulas, sourced from sustainable Senegalese cooperatives.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[
                        { name: "Shea Butter", icon: "✨" },
                        { name: "Baobab Oil", icon: "💧" },
                        { name: "Moringa", icon: "🌿" },
                        { name: "Hibiscus", icon: "🌺" },
                        { name: "Neem", icon: "🍃" },
                        { name: "Aloe Vera", icon: "🌵" }
                    ].map((ingredient, idx) => (
                        <motion.div
                            key={ingredient.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-background border border-border/50 rounded-2xl p-6 text-center hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="text-3xl mb-3 transition-transform group-hover:scale-125 duration-500">{ingredient.icon}</div>
                            <h3 className="text-sm font-semibold">{ingredient.name}</h3>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Newsletter />
            <Footer />
        </div>
    )
}
