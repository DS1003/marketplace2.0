"use client"

import { useState, useMemo } from "react"
import NextImage from "next/image"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search, Heart, ShoppingBag, Star, MapPin,
    Package, ArrowRight, Globe, Facebook, Instagram, Twitter,
    CheckCircle2, Truck, ShieldCheck, Leaf, Quote, Award
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"
import { formatPrice } from "@/lib/utils"

// --- Data ---
const sellerData = {
    "koba-skin": {
        name: "Anta Diouf",
        brand: "Koba Skin",
        role: "Gardien de la Tradition",
        location: "Dakar, Sénégal",
        banner: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600&auto=format&fit=crop",
        logo: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=400&auto=format&fit=crop",
        bio: "Koba Skin est une marque de soins minimaliste ancrée dans les traditions sénégalaises. Nous croyons au pouvoir des ingrédients simples et de haute qualité, provenant directement de coopératives locales.",
        founderQuote: "Notre mission est d'élever les soins traditionnels africains vers un standard de luxe mondial tout en valorisant les femmes qui récoltent nos ingrédients.",
        rating: 4.9,
        reviews: 420,
        joined: "Mars 2023",
        stats: {
            sales: "5k+",
            shipTime: "1-2 jours",
            identity: "Artisan Vérifié"
        },
        featuredProduct: {
            id: 1,
            name: "Beurre de Karité Pur - Réserve d'Or",
            description: "Notre beurre de karité fouetté emblématique, filtré plusieurs fois pendant 48 heures pour une texture veloutée inégalée.",
            price: 27500,
            image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800"
        }
    },
    // For demo purposes, we define the other sellers as well to avoid undefined errors
    "baobab-essence": {
        name: "Malick Sow",
        brand: "Baobab Essence",
        role: "Innovateur Durable",
        location: "Thiès, Sénégal",
        banner: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1600&auto=format&fit=crop",
        logo: "https://images.unsplash.com/photo-1507152832244-10d45c7eda57?q=80&w=400&auto=format&fit=crop",
        bio: "Baobab Essence exploite les propriétés bienfaisantes du baobab. Nos produits sont 100% traçables et soutiennent les communautés locales.",
        founderQuote: "La durabilité est l'âme de notre marque. Chaque goutte d'huile soutient une famille à Thiès.",
        rating: 4.8,
        reviews: 310,
        joined: "Juin 2023",
        stats: {
            sales: "2.5k+",
            shipTime: "2-3 jours",
            identity: "Leader Communautaire"
        },
        featuredProduct: {
            id: 2,
            name: "Sérum à l'Huile de Baobab Premium",
            description: "Pressé à froid dans les 24 heures suivant la récolte pour préserver une densité nutritionnelle maximale.",
            price: 35000,
            image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800"
        }
    },
    "arona-naturals": {
        name: "Fatou Ndiaye",
        brand: "Arona Naturals",
        role: "Artiste Botanique",
        location: "Saint-Louis, Sénégal",
        banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1600&auto=format&fit=crop",
        logo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format&fit=crop",
        bio: "Arona Naturals mélange des profils botaniques complexes dans des rituels de soins puissants, fabriqués à la main à Saint-Louis.",
        founderQuote: "Nous croyons que le soin de la peau est un rituel sacré, un moment de connexion entre la nature et soi-même.",
        rating: 4.7,
        reviews: 280,
        joined: "Janvier 2023",
        stats: {
            sales: "1.2k+",
            shipTime: "1-3 jours",
            identity: "Maître Herboriste"
        },
        featuredProduct: {
            id: 3,
            name: "Masque au Rituel d'Hibiscus et d'Argile",
            description: "Un masque profondément purifiant qui revitalise les peaux fatiguées en utilisant d'anciennes recettes d'argile sénégalaises.",
            price: 22500,
            image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800"
        }
    }
}

const fullSellerData: any = {
    ...sellerData,
}

const allProducts = [
    // Koba Skin
    { id: 1, name: "Pure Shea Butter", price: 15500, rating: 4.9, reviews: 128, sellerId: "koba-skin", category: "Creams", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600", organic: true },
    { id: 4, name: "Neem Healing Soap", price: 7500, rating: 4.9, reviews: 210, sellerId: "koba-skin", category: "Cleansers", image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600", organic: false },
    { id: 6, name: "Deep Cleansing Butter", price: 18500, rating: 4.6, reviews: 189, sellerId: "koba-skin", category: "Creams", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600", organic: true },
    { id: 7, name: "Desert Rose Mist", price: 12500, rating: 5.0, reviews: 45, sellerId: "koba-skin", category: "Toners", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600", organic: true },

    // Baobab Essence
    { id: 2, name: "Baobab Oil Serum", price: 23500, rating: 4.8, reviews: 94, sellerId: "baobab-essence", category: "Oils", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600", organic: true },
    { id: 8, name: "Age-Defying Baobab Jam", price: 25000, rating: 4.9, reviews: 32, sellerId: "baobab-essence", category: "Creams", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600", organic: true },
    { id: 9, name: "Radiance Fruit Mask", price: 17500, rating: 4.7, reviews: 78, sellerId: "baobab-essence", category: "Masks", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600", organic: true },
    { id: 10, name: "Superseed Night Oil", price: 32000, rating: 5.0, reviews: 12, sellerId: "baobab-essence", category: "Oils", image: "https://images.unsplash.com/photo-1629198688000-71f23e74567e?q=80&w=600", organic: true },

    // Arona Naturals
    { id: 3, name: "Hibiscus Clay Mask", price: 18500, rating: 4.7, reviews: 65, sellerId: "arona-naturals", category: "Masks", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600", organic: true },
    { id: 5, name: "Moringa Glow Oil", price: 29000, rating: 4.9, reviews: 55, sellerId: "arona-naturals", category: "Oils", image: "https://images.unsplash.com/photo-1629198688000-71f23e74567e?q=80&w=600", organic: true },
    { id: 11, name: "Saint-Louis Floral Water", price: 12500, rating: 4.8, reviews: 91, sellerId: "arona-naturals", category: "Toners", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600", organic: true },
    { id: 12, name: "Exfoliating Coffee Scrub", price: 15000, rating: 4.6, reviews: 140, sellerId: "arona-naturals", category: "Scrubs", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600", organic: false }
]

export default function SellerShopPage() {
    const params = useParams()
    const slug = params?.slug as string
    const seller = fullSellerData[slug] || fullSellerData["koba-skin"]

    const [activeCategory, setActiveCategory] = useState("Tous")
    const [searchQuery, setSearchQuery] = useState("")

    const productCategories = useMemo(() => {
        const cats = allProducts.filter(p => p.sellerId === slug).map(p => p.category)
        return ["Tous", ...Array.from(new Set(cats))]
    }, [slug])

    const filteredProducts = useMemo(() => {
        return allProducts.filter(p => {
            const matchesSeller = p.sellerId === slug
            const matchesCategory = activeCategory === "Tous" || p.category === activeCategory
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesSeller && matchesCategory && matchesSearch
        })
    }, [slug, activeCategory, searchQuery])

    if (!seller) return <div className="min-h-screen flex items-center justify-center italic">Chargement du Rituel...</div>

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
            <Header />

            {/* Immersive Banner */}
            <div className="relative h-[400px] md:h-[600px] w-full group overflow-hidden">
                <NextImage
                    src={seller.banner}
                    alt={seller.brand}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#FDFBF7]" />

                {/* Banner Breadcrumbs */}
                <div className="absolute top-32 left-4 md:left-12 flex items-center gap-2 text-white/80 text-sm font-medium z-30">
                    <span className="hover:text-white cursor-pointer transition-colors" onClick={() => router.push('/sellers')}>Artisans</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="text-white font-bold">{seller.brand}</span>
                </div>
            </div>

            {/* Seller Identity Card */}
            <section className="relative -mt-40 md:-mt-64 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-40">
                <div className="bg-white/80 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-primary/10 border border-white/60 flex flex-col items-center">

                    {/* Logo & Main Identity */}
                    <div className="relative group -mt-24 md:-mt-40 mb-10">
                        <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl group-hover:bg-primary/40 transition-colors animate-pulse" />
                        <div className="relative h-40 w-40 md:h-60 md:w-60 rounded-full border-[10px] border-white overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105">
                            <NextImage src={seller.logo} alt={seller.brand} fill className="object-cover" />
                        </div>
                    </div>

                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <div className="space-y-3">
                            <Badge variant="secondary" className="bg-primary text-white font-bold px-6 py-1.5 rounded-full shadow-lg shadow-primary/20">{seller.role}</Badge>
                            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none italic">{seller.brand}</h1>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-semibold text-lg">
                                <span className="flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full"><MapPin className="w-5 h-5 text-primary" /> {seller.location}</span>
                                <span className="flex items-center gap-2 font-bold text-[#2D241E]">
                                    <Award className="w-5 h-5 text-primary" />
                                    Dirigé par {seller.name}
                                </span>
                            </div>
                        </div>

                        <div className="relative py-8">
                            <Quote className="absolute -top-4 -left-8 w-16 h-16 text-primary/10 -scale-x-100" />
                            <p className="text-xl md:text-2xl text-[#4A3D36] leading-relaxed font-medium italic">
                                "{seller.founderQuote}"
                            </p>
                            <Quote className="absolute -bottom-4 -right-8 w-16 h-16 text-primary/10" />
                        </div>

                        <Separator className="bg-primary/10 w-24 mx-auto" />

                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
                            {seller.bio}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                            <div className="flex bg-white/50 backdrop-blur-md rounded-full p-2 border border-primary/20 shadow-inner gap-1">
                                <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></Button>
                            </div>
                            <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-2xl shadow-primary/30 group hover:scale-105 transition-transform">
                                Suivre la Marque <Heart className="w-5 h-5 ml-2 group-hover:fill-current" />
                            </Button>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-20 pt-16 border-t border-primary/10">
                        <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent border border-primary/5 group hover:from-primary hover:to-primary/80 transition-all duration-700">
                            <div className="p-4 rounded-3xl bg-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-2xl font-bold group-hover:text-white mb-2">{seller.stats.identity}</div>
                            <div className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-white/60">Origine Vérifiée</div>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent border border-primary/5 group hover:from-primary hover:to-primary/80 transition-all duration-700">
                            <div className="p-4 rounded-3xl bg-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                <Truck className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-2xl font-bold group-hover:text-white mb-2">{seller.stats.shipTime}</div>
                            <div className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-white/60">Livraison Rapide</div>
                        </div>
                        <div className="flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent border border-primary/5 group hover:from-primary hover:to-primary/80 transition-all duration-700">
                            <div className="p-4 rounded-3xl bg-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                                <Star className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-2xl font-bold group-hover:text-white mb-2">{seller.rating} / 5.0</div>
                            <div className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-white/60">Avis Clients</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product Spotlight */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-[#2D241E] rounded-[4rem] overflow-hidden flex flex-col lg:flex-row items-center">
                    <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto h-[400px] lg:h-[600px]">
                        <NextImage
                            src={seller.featuredProduct.image}
                            alt={seller.featuredProduct.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        <div className="absolute top-8 left-8">
                            <Badge className="bg-primary text-white h-8 px-4 rounded-full border-none">Focus Boutique</Badge>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-10 md:p-20 text-white space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-bold leading-tight">{seller.featuredProduct.name}</h2>
                            <p className="text-white/70 text-lg md:text-xl font-light">
                                {seller.featuredProduct.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-4xl md:text-5xl font-bold text-primary">{formatPrice(seller.featuredProduct.price)}</div>
                            <Button size="lg" className="bg-white text-[#2D241E] hover:bg-primary hover:text-white rounded-full h-16 px-10 text-xl font-bold transition-all shadow-xl">
                                <ShoppingBag className="w-6 h-6 mr-3" /> J&apos;en profite
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop Experience */}
            <main className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">

                {/* Search & Category Ribbon */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold flex items-center gap-3">
                            <Package className="w-8 h-8 text-primary" />
                            La Collection
                        </h2>
                        <p className="text-muted-foreground">{filteredProducts.length} articles disponibles chez {seller.brand}</p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Rechercher des produits..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-11 pr-4 h-12 rounded-full w-full sm:w-64 border-primary/10 bg-white/50 focus:bg-white shadow-sm transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                            {productCategories.map(cat => (
                                <Button
                                    key={cat}
                                    variant={activeCategory === cat ? "default" : "outline"}
                                    onClick={() => setActiveCategory(cat)}
                                    className="rounded-full h-12 px-6 whitespace-nowrap transition-all"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Boutique Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                            >
                                <Card className="h-full group overflow-hidden border-primary/5 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-[2rem] flex flex-col">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        {product.organic && (
                                            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md text-[#2D5A27] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm border border-white/50">
                                                <Leaf className="w-3.5 h-3.5" /> Bio
                                            </div>
                                        )}
                                        <NextImage
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <button className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            <Heart className="w-5 h-5 text-muted-foreground hover:text-red-500 transition-colors" />
                                        </button>

                                        <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <Button className="w-full bg-white text-primary hover:bg-primary hover:text-white rounded-2xl h-12 shadow-xl backdrop-blur-md">
                                                <ShoppingBag className="w-4 h-4 mr-2" /> Au panier
                                            </Button>
                                        </div>
                                    </div>

                                    <CardContent className="p-6 flex flex-col flex-grow space-y-3">
                                        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                            <span>{product.category}</span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="w-3.5 h-3.5 fill-current" /> {product.rating}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                                        <div className="mt-auto pt-4 flex items-center justify-between">
                                            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                                            <Badge variant="outline" className="text-[10px] font-bold border-primary/10">{product.reviews} avis</Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-primary/10">
                        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-12 h-12 text-primary/20" />
                        </div>
                        <h3 className="text-3xl font-bold">Aucun produit trouvé</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">Essayez une autre catégorie ou un autre terme de recherche dans la collection de {seller.brand}.</p>
                        <Button variant="link" onClick={() => { setActiveCategory("Tous"); setSearchQuery("") }} className="mt-4 text-primary font-bold">
                            Réinitialiser les filtres
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
