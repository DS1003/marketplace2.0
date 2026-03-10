"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowRight, Star, MapPin, Globe, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"

const sellers = [
    {
        id: "koba-skin",
        name: "Anta Diouf",
        brand: "Koba Skin",
        role: "Crafting Tradition",
        location: "Dakar, Senegal",
        image: "https://images.unsplash.com/photo-1540331547168-8b63109225b7?q=80&w=600&auto=format&fit=crop",
        logo: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=400&auto=format&fit=crop",
        quote: "Our shea butter is more than a product; it's a legacy passed down through generations of West African women.",
        story: "After returning to Dakar from Paris, Anta wanted to bridge the gap between traditional Senegalese botanicals and modern skincare science.",
        productCount: 24,
        rating: 4.9,
        previewProducts: [
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200",
            "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=200"
        ]
    },
    {
        id: "baobab-essence",
        name: "Malick Sow",
        brand: "Baobab Essence",
        role: "Sustainable Innovator",
        location: "Thiès, Senegal",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
        logo: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=400&auto=format&fit=crop",
        quote: "The Baobab tree is our life-giver. My goal is to ensure its benefits reach the world while protecting its future.",
        story: "Malick spent years researching the cold-pressing techniques used in the Thiès region. His brand focuses on 100% traceability.",
        productCount: 15,
        rating: 4.8,
        previewProducts: [
            "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200",
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200",
            "https://images.unsplash.com/photo-1629198688000-71f23e74567e?q=80&w=200"
        ]
    },
    {
        id: "arona-naturals",
        name: "Fatou Ndiaye",
        brand: "Arona Naturals",
        role: "Botanical Artist",
        location: "Saint-Louis, Senegal",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
        logo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format&fit=crop",
        quote: "Beauty is an act of mindfulness. Arona is about finding that quiet moment of peace in your daily ritual.",
        story: "Fatou's backgrounds in chemistry and holistic wellness led her to create Arona Naturals in Saint-Louis.",
        productCount: 18,
        rating: 4.7,
        previewProducts: [
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200",
            "https://images.unsplash.com/photo-1629198688000-71f23e74567e?q=80&w=200",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200"
        ]
    },
    // Adding mock sellers to demonstrate grid
    ...Array.from({ length: 12 }).map((_, i) => ({
        id: `seller-${i}`,
        name: `Artisan ${i + 4}`,
        brand: `Brand ${i + 4}`,
        role: "Local Producer",
        location: "Senegal",
        image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=600`,
        logo: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=200`,
        quote: "Dedicated to quality and tradition.",
        story: "Authentic production from local communities.",
        productCount: Math.floor(Math.random() * 30) + 5,
        rating: 4.5 + Math.random() * 0.5,
        previewProducts: [
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200",
            "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=200"
        ]
    }))
]

export default function SellersPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const filteredSellers = sellers.filter(seller =>
        seller.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seller.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Header />

            {/* Hero Section */}
            <section className="pt-24 pb-12 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeContent blur={true} duration={0.8}>
                    <div className="flex flex-col items-center text-center space-y-8">
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">The Collective</Badge>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-[#2D241E] leading-tight">
                            Senegal's Finest <br />
                            <span className="text-primary italic">Creators</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                            Discover the visionary artisans behind our curated marketplace of natural beauty.
                        </p>

                        {/* Search Bar */}
                        <div className="w-full max-w-xl relative group mt-8">
                            <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl group-focus-within:bg-primary/10 transition-colors" />
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search brands or creators..."
                                    className="w-full bg-white/80 backdrop-blur-md border border-[#E9E1D6] rounded-full py-5 px-14 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-lg transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </FadeContent>
            </section>

            {/* Sellers Grid */}
            <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y border-[#E9E1D6]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <div className="space-y-1">
                            <h2 className="text-3xl font-bold text-[#2D241E] flex items-center gap-3">
                                <Globe className="w-6 h-6 text-primary" /> All Brands
                            </h2>
                            <p className="text-muted-foreground">{filteredSellers.length} sellers currently on Moomel</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                            <Select defaultValue="newest">
                                <SelectTrigger className="w-[180px] rounded-full border-[#E9E1D6]">
                                    <SelectValue placeholder="Newest first" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Latest Brands</SelectItem>
                                    <SelectItem value="alphabetical">Name (A-Z)</SelectItem>
                                    <SelectItem value="popular">Top Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredSellers.map((seller, index) => (
                                <motion.div
                                    key={seller.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <Card className="h-full group overflow-hidden border-[#E9E1D6] bg-[#FDFBF7]/50 hover:bg-white transition-all duration-500 rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <NextImage
                                                src={seller.image}
                                                alt={seller.brand}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            {/* Circular Logo Overlay */}
                                            <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full border-4 border-white overflow-hidden shadow-lg z-10 transition-transform duration-500 group-hover:scale-110">
                                                <NextImage src={seller.logo} alt={seller.brand} fill className="object-cover" />
                                            </div>

                                            <Link href={`/sellers/${seller.id}`} className="absolute inset-0 z-20" />
                                        </div>

                                        <CardContent className="p-6 flex flex-col flex-grow space-y-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border-none px-2 rounded-full">
                                                        {seller.role}
                                                    </Badge>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                                                        <Star className="w-3.5 h-3.5 fill-current" /> {seller.rating.toFixed(1)}
                                                    </div>
                                                </div>
                                                <h3 className="text-xl font-bold text-[#2D241E] group-hover:text-primary transition-colors">{seller.brand}</h3>
                                                <div className="flex items-center text-xs text-muted-foreground gap-1">
                                                    <MapPin className="w-3 h-3" /> {seller.location}
                                                </div>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2 italic flex-grow">
                                                "{seller.story}"
                                            </p>

                                            {/* Product Preview Thumbnails */}
                                            <div className="grid grid-cols-3 gap-2 pt-2">
                                                {seller.previewProducts?.map((pUrl: string, i: number) => (
                                                    <div key={i} className="aspect-square relative rounded-xl overflow-hidden border border-[#E9E1D6]/50">
                                                        <NextImage src={pUrl} alt="Product preview" fill className="object-cover" />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="pt-4 flex items-center justify-between border-t border-[#E9E1D6]/50">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-primary">{seller.productCount}</span>
                                                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Products</span>
                                                </div>
                                                <Link href={`/sellers/${seller.id}`}>
                                                    <Button size="sm" variant="outline" className="rounded-full border-[#E9E1D6] group-hover:bg-primary group-hover:text-white transition-all">
                                                        Visit Shop <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredSellers.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="w-8 h-8 text-primary/40" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#2D241E]">No sellers found</h3>
                            <p className="text-muted-foreground">Try a different search term or browse our categories.</p>
                            <Button variant="link" onClick={() => setSearchQuery("")} className="mt-4 text-primary font-bold">
                                Clear search
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Community Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#2D241E] text-white">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <Badge className="mb-6 bg-white/10 text-white border-white/20">The Impact</Badge>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Building a Sustainable Beauty Ecosystem</h2>
                    <p className="text-xl text-white/70 max-w-3xl mb-16 leading-relaxed">
                        By spotlighting local sellers, we ensure that the economic benefits of Senegal's botanicals remain within our communities, fostering growth and pride.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl">
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">12+</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Partner Brands</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">450+</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Local Artisans</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">100%</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Ethical Sourcing</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-5xl font-bold text-primary">5</div>
                            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Regions Covered</div>
                        </div>
                    </div>

                    <div className="mt-20">
                        <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white px-12 h-14 text-lg">
                            Apply to Sell on Moomel
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
