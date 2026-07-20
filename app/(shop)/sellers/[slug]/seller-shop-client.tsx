"use client"

import { useState, useMemo } from "react"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
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

export default function SellerShopClient({ initialSeller }: { initialSeller: any }) {
    const router = useRouter()
    
    // Convert real DB data to match the UI shape, maximizing dynamic values
    const seller = {
        id: initialSeller.id,
        name: initialSeller.owner?.name || "Artisan Inconnu",
        brand: initialSeller.name,
        role: "Artisan Partenaire",
        location: "Sénégal", 
        banner: initialSeller.products?.[0]?.images?.[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600&auto=format&fit=crop", 
        logo: initialSeller.image || initialSeller.owner?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(initialSeller.name)}&background=2D241E&color=fff&size=400&bold=true`,
        bio: initialSeller.description || "Un artisan passionné par les produits naturels et le bien-être de ses clients. Nous croyons au pouvoir des ingrédients simples et de haute qualité.",
        founderQuote: initialSeller.description ? initialSeller.description.slice(0, 100) + (initialSeller.description.length > 100 ? "..." : "") : "Chaque produit est fabriqué avec amour et respect pour la nature.",
        rating: (() => {
            let totalRating = 0;
            let totalReviews = 0;
            initialSeller.products?.forEach((p: any) => {
                if (p.reviews && p.reviews.length > 0) {
                    totalRating += p.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
                    totalReviews += p.reviews.length;
                }
            });
            return totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : "4.8";
        })(), 
        reviews: initialSeller.products?.reduce((acc: number, p: any) => acc + (p.reviews?.length || 0), 0) || 0, 
        joined: new Date(initialSeller.createdAt || Date.now()).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
        stats: {
            sales: `${(initialSeller.products?.length || 1) * 15}+`,
            shipTime: "1-3 jours",
            identity: "Artisan Vérifié"
        },
        featuredProduct: initialSeller.products?.[0] ? {
            id: initialSeller.products[0].id,
            name: initialSeller.products[0].name,
            description: initialSeller.products[0].description || "Notre produit vedette. Conçu avec soin pour vous offrir le meilleur.",
            price: initialSeller.products[0].price,
            image: initialSeller.products[0].images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800"
        } : {
            id: "fake", name: "Bientôt disponible", description: "Cet artisan prépare ses meilleurs produits.", price: 0, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800"
        }
    }

    const [activeCategory, setActiveCategory] = useState("Tous")
    const [searchQuery, setSearchQuery] = useState("")

    const productCategories = useMemo(() => {
        if (!initialSeller.products) return ["Tous"]
        const cats = initialSeller.products.map((p: any) => p.category?.name || "Non classé")
        return ["Tous", ...Array.from(new Set(cats))] as string[]
    }, [initialSeller])

    const filteredProducts = useMemo(() => {
        const products = initialSeller.products || []
        return products.filter((p: any) => {
            const catName = p.category?.name || "Non classé"
            const matchesCategory = activeCategory === "Tous" || catName === activeCategory
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        }).map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            image: p.images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600",
            category: p.category?.name || "Non classé",
            rating: p.reviews?.length > 0 ? p.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / p.reviews.length : 4.8,
            reviews: p.reviews?.length || 0,
            organic: true
        }))
    }, [initialSeller, activeCategory, searchQuery])

    if (!seller) return <div className="min-h-screen flex items-center justify-center italic">Chargement du Rituel...</div>

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">

            {/* Immersive Banner */}
            <div className="relative h-[250px] md:h-[350px] w-full group overflow-hidden">
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
            <section className="relative -mt-20 md:-mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-40">
                <div className="bg-white/80 backdrop-blur-3xl rounded-[2rem] p-5 md:p-8 shadow-2xl shadow-primary/10 border border-white/60 flex flex-col items-center">

                    {/* Logo & Main Identity */}
                    <div className="relative group -mt-12 md:-mt-16 mb-3">
                        <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/40 transition-colors animate-pulse" />
                        <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full border-[3px] border-white overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-105 bg-white">
                            <NextImage src={seller.logo} alt={seller.brand} fill className="object-contain p-1" />
                        </div>
                    </div>

                    <div className="text-center space-y-3 max-w-4xl mx-auto w-full">
                        <div className="space-y-1.5">
                            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 font-bold px-3 py-0.5 rounded-full text-xs">{seller.role}</Badge>
                            <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-none italic">{seller.brand}</h1>
                            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground font-semibold text-base md:text-lg">
                                <span className="flex items-center gap-2 bg-primary/5 px-4 py-1.5 rounded-full"><MapPin className="w-5 h-5 text-primary" /> {seller.location}</span>
                                <span className="flex items-center gap-2 font-bold text-[#2D241E]">
                                    <Award className="w-5 h-5 text-primary" />
                                    Dirigé par {seller.name}
                                </span>
                            </div>
                        </div>

                        <div className="relative py-2">
                            <Quote className="absolute -top-2 -left-2 w-5 h-5 text-primary/10 -scale-x-100" />
                            <p className="text-sm md:text-base text-[#4A3D36] leading-relaxed font-medium italic">
                                "{seller.founderQuote}"
                            </p>
                            <Quote className="absolute -bottom-2 -right-2 w-5 h-5 text-primary/10" />
                        </div>

                        <Separator className="bg-primary/10 w-24 mx-auto" />

                        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                            {seller.bio}
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                            <div className="flex bg-white/50 backdrop-blur-md rounded-full p-1 border border-primary/20 shadow-inner gap-0.5">
                                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 hover:bg-primary hover:text-white transition-all"><Facebook className="w-3.5 h-3.5" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 hover:bg-primary hover:text-white transition-all"><Instagram className="w-3.5 h-3.5" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 hover:bg-primary hover:text-white transition-all"><Twitter className="w-3.5 h-3.5" /></Button>
                            </div>
                            <Button size="sm" className="rounded-full h-10 px-5 text-sm shadow-md shadow-primary/20 group hover:scale-105 transition-transform">
                                Suivre la Marque <Heart className="w-3.5 h-3.5 ml-1.5 group-hover:fill-current" />
                            </Button>
                        </div>
                    </div>

                    {/* Trust Badges - Compact Inline version */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12 w-full mt-6 pt-5 border-t border-primary/10">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-[#2D241E]">{seller.stats.identity}</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Origine Vérifiée</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Package className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-[#2D241E]">{seller.stats.shipTime}</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Livraison Rapide</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Star className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-bold text-[#2D241E]">{seller.rating} / 5.0</div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Avis Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Product Spotlight */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-[#2D241E] rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center">
                    <div className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto h-[300px] lg:h-[400px]">
                        <NextImage
                            src={seller.featuredProduct.image}
                            alt={seller.featuredProduct.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                        <div className="absolute top-6 left-6">
                            <Badge className="bg-primary text-white h-8 px-4 rounded-full border-none shadow-lg">Focus Boutique</Badge>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 p-8 md:p-12 text-white space-y-6">
                        <div className="space-y-3">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">{seller.featuredProduct.name}</h2>
                            <p className="text-white/70 text-base md:text-lg font-light">
                                {seller.featuredProduct.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="text-3xl md:text-4xl font-bold text-primary">{formatPrice(seller.featuredProduct.price)}</div>
                            <Button size="lg" className="bg-white text-[#2D241E] hover:bg-primary hover:text-white rounded-full h-14 px-8 text-lg font-bold transition-all shadow-xl">
                                <ShoppingBag className="w-6 h-6 mr-3" /> J&apos;en profite
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop Experience */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">

                {/* Search & Category Ribbon */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Package className="w-6 h-6 text-primary" />
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
                                className="pl-11 pr-4 h-10 rounded-full w-full sm:w-64 border-primary/10 bg-white/50 focus:bg-white shadow-sm transition-all"
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                            {productCategories.map(cat => (
                                <Button
                                    key={cat}
                                    variant={activeCategory === cat ? "default" : "outline"}
                                    onClick={() => setActiveCategory(cat)}
                                    className="rounded-full h-10 px-5 text-sm whitespace-nowrap transition-all"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Boutique Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                                <Card className="h-full group overflow-hidden border-primary/5 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-3xl flex flex-col">
                                    <div className="relative aspect-[4/5] overflow-hidden">
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
                                            <Button className="w-full bg-white text-primary hover:bg-primary hover:text-white rounded-xl h-10 shadow-xl backdrop-blur-md font-semibold">
                                                <ShoppingBag className="w-4 h-4 mr-2" /> Au panier
                                            </Button>
                                        </div>
                                    </div>

                                    <CardContent className="p-5 flex flex-col flex-grow space-y-2">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                            <span>{product.category}</span>
                                            <div className="flex items-center gap-1 text-amber-500">
                                                <Star className="w-3 h-3 fill-current" /> {product.rating}
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">{product.name}</h3>
                                        <div className="mt-auto pt-3 flex items-center justify-between">
                                            <span className="text-lg md:text-xl font-bold text-primary">{formatPrice(product.price)}</span>
                                            <Badge variant="outline" className="text-[9px] font-bold border-primary/10 px-1.5">{product.reviews} avis</Badge>
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

        </div>
    )
}
