"use client"

import { useState } from "react"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search, Filter, ChevronDown, Heart, ShoppingBag, Star, ShieldCheck, MapPin,
    Leaf, Package, Award, ArrowRight, X, SlidersHorizontal
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/newsletter"

import { FadeContent } from "@/components/ui/fade-content"
import { Magnet } from "@/components/ui/magnet"
import { useCart } from "@/providers/cart-provider"
import { toast } from "sonner"

// --- Data ---
const categories = ["All Products", "Skincare", "Haircare", "Natural Soaps", "Essential Oils", "Accessories"]

const productsList = [
    {
        id: 1,
        name: "Pure Shea Butter",
        price: 24.99,
        rating: 4.9,
        reviews: 128,
        seller: "Koba Skin",
        location: "Dakar",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop",
        organic: true,
        category: "Skincare",
        description: "100% pure, unrefined shea butter sourced directly from Senegalese cooperatives. Perfect for intense hydration and skin repair."
    },
    {
        id: 2,
        name: "Baobab Oil Serum",
        price: 38.50,
        rating: 4.8,
        reviews: 94,
        seller: "Senegal Beauty Co.",
        location: "Thiès",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
        organic: true,
        category: "Skincare",
        description: "Cold-pressed baobab oil rich in vitamins A, D, E, and F. A lightweight, fast-absorbing serum for a radiant complexion."
    },
    {
        id: 3,
        name: "Hibiscus Clay Mask",
        price: 32.00,
        rating: 4.7,
        reviews: 65,
        seller: "Arona Naturals",
        location: "Saint-Louis",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
        organic: true,
        category: "Skincare",
        description: "Gentle pink clay infused with organic hibiscus powder. Cleanses pores and gently exfoliates for incredibly soft skin."
    },
    {
        id: 4,
        name: "Neem Healing Soap",
        price: 12.00,
        rating: 4.9,
        reviews: 210,
        seller: "Koba Skin",
        location: "Dakar",
        image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=600&auto=format&fit=crop",
        organic: false,
        category: "Natural Soaps",
        description: "Traditional handmade soap with cold-pressed neem oil. Ideal for problematic skin, providing deep cleansing and antimicrobial properties."
    },
    {
        id: 5,
        name: "Moringa Glow Oil",
        price: 45.00,
        rating: 4.9,
        reviews: 55,
        seller: "Arona Naturals",
        location: "Saint-Louis",
        image: "https://images.unsplash.com/photo-1629198688000-71f23e74567e?q=80&w=600&auto=format&fit=crop",
        organic: true,
        category: "Essential Oils",
        description: "Nutrient-dense moringa oil that instantly absorbs. Protects skin barrier while providing an exceptional dewy glow."
    },
    {
        id: 6,
        name: "African Black Soap Liquid",
        price: 18.50,
        rating: 4.6,
        reviews: 189,
        seller: "Senegal Beauty Co.",
        location: "Thiès",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
        organic: true,
        category: "Natural Soaps",
        description: "Authentic African black soap in a convenient liquid formula. Deeply clarifying for both face and body."
    }
]

const sellers = [
    { id: 1, name: "Koba Skin", description: "Minimalist skincare rooted in Senegalese traditions.", image: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=400&auto=format&fit=crop" },
    { id: 2, name: "Senegal Beauty", description: "Harnessing the power of indigenous flora.", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop" },
    { id: 3, name: "Arona Naturals", description: "100% organic, hand-crafted botanical formulas.", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=400&auto=format&fit=crop" },
]

export default function MarketplacePage() {
    const [activeCategory, setActiveCategory] = useState("All Products")
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
    const [priceRange, setPriceRange] = useState([0, 100])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedProduct, setSelectedProduct] = useState<typeof productsList[0] | null>(null)
    const { addItem } = useCart()

    const filteredProducts = productsList.filter(product => {
        const matchesCategory = activeCategory === "All Products" || product.category === activeCategory
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             product.seller.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesPrice && matchesSearch
    })

    const handleAddToCart = (product: any) => {
        addItem({
            id: product.id.toString(),
            name: product.name,
            price: product.price,
            images: [product.image],
            shop: { name: product.seller }
        })
        toast.success(`${product.name} added to your ritual bag.`)
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* 1️⃣ Marketplace Header */}
            <section className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeContent blur={true} duration={0.8}>
                    <div className="flex flex-col items-center text-center mb-8 md:mb-10">
                        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs">
                            <SparklesIcon className="w-3 h-3 mr-2" /> Our Assortment
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Marketplace
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl px-2">
                            Discover premium organic beauty products crafted from the heart of Africa. Meticulously selected for quality, purity, and efficacy.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                className="w-full pl-11 md:pl-12 h-12 md:h-14 rounded-full border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors text-sm md:text-base"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Quick Filters */}
                    <div className="flex overflow-x-auto pb-4 pt-8 md:pt-10 gap-2 hide-scrollbar justify-start md:justify-center px-4 md:px-0">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                className={`rounded-full whitespace-nowrap transition-all text-xs md:text-sm h-9 md:h-10 px-4 md:px-6 ${activeCategory === category ? 'shadow-md scale-105' : 'bg-background hover:bg-primary/5'}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </FadeContent>
            </section>

            {/* Separator */}
            <div className="max-w-7xl mx-auto px-4"><Separator className="opacity-50" /></div>

            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

                {/* Mobile Filters Toggle */}
                <div className="lg:hidden flex items-center justify-between mb-4">
                    <Button variant="outline" size="sm" onClick={() => setIsMobileFiltersOpen(true)} className="flex items-center gap-2 rounded-full px-4 h-10 border-border/60">
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </Button>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">Sort by</span>
                        <Select defaultValue="popular">
                            <SelectTrigger className="w-[120px] h-10 border-none bg-background shadow-sm rounded-full px-3 text-xs font-medium">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="popular">Most Popular</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                <SelectItem value="rating">Best Rated</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* 2️⃣ Advanced Filters Sidebar */}
                <aside className={`${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-background p-6 overflow-y-auto' : 'hidden'} lg:block lg:w-1/4 lg:sticky lg:top-28 lg:h-[calc(100vh-120px)] lg:overflow-y-auto hide-scrollbar`}>
                    {isMobileFiltersOpen && (
                        <div className="flex justify-between items-center mb-8 lg:hidden">
                            <h2 className="text-xl font-bold">Filters</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    )}

                    <div className="space-y-8 pr-4">
                        <div>
                            <h3 className="font-semibold mb-4 text-base">Price Range</h3>
                            <Slider
                                defaultValue={[0, 100]}
                                max={200}
                                step={1}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="mb-3"
                            />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>

                        <Separator />

                        <Accordion type="multiple" defaultValue={["type", "organic", "rating"]}>
                            <AccordionItem value="type" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-3 px-0 font-semibold">Product Type</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-1">
                                        {["Oils & Serums", "Creams & Butters", "Cleansers", "Masks"].map(item => (
                                            <div key={item} className="flex items-center space-x-3">
                                                <Checkbox id={`type-${item}`} className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                                <label htmlFor={`type-${item}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="organic" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-3 px-0 font-semibold">Certifications</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-1">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox id="organic" className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                            <label htmlFor="organic" className="text-sm font-medium leading-none flex items-center gap-2">
                                                <Leaf className="w-3.5 h-3.5 text-green-600" /> 100% Organic / Bio
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox id="cruelty" className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                            <label htmlFor="cruelty" className="text-sm font-medium leading-none">
                                                Cruelty-Free
                                            </label>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="location" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-3 px-0 font-semibold">Seller Location</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-1">
                                        {["Dakar", "Thiès", "Saint-Louis", "Ziguinchor"].map(item => (
                                            <div key={item} className="flex items-center space-x-3">
                                                <Checkbox id={`loc-${item}`} className="rounded-[4px] border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                                <label htmlFor={`loc-${item}`} className="text-sm font-medium leading-none">
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {isMobileFiltersOpen && (
                        <div className="mt-8 sticky bottom-0 bg-background pt-4 pb-2">
                            <Button className="w-full" onClick={() => setIsMobileFiltersOpen(false)}>Apply Filters</Button>
                        </div>
                    )}
                </aside>

                {/* Main Content Area */}
                <div className="lg:w-3/4 flex flex-col">

                    {/* 4️⃣ Sorting Options (Desktop) */}
                    <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                        <p className="text-sm text-muted-foreground font-medium">Showing {filteredProducts.length} of {productsList.length} products</p>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-foreground font-medium">Sort by</span>
                            <Select defaultValue="popular">
                                <SelectTrigger className="w-[180px] bg-background/50 rounded-full border-border/50">
                                    <SelectValue placeholder="Select..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="popular">Most Popular</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                    <SelectItem value="rating">Best Rated</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* 3️⃣ Product Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-12">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <Card className="h-full overflow-hidden border-border/50 bg-background hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 rounded-2xl flex flex-col group/card">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                        {product.organic && (
                                            <Badge className="absolute top-3 left-3 z-10 bg-white/90 text-green-700 hover:bg-white backdrop-blur-md shadow-sm pointer-events-none">
                                                <Leaf className="w-3 h-3 mr-1" /> Organic
                                            </Badge>
                                        )}
                                        <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-white hover:text-red-500 transition-colors opacity-0 group-hover/card:opacity-100 duration-300">
                                            <Heart className="w-4 h-4" />
                                        </button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <div
                                                    className="w-full h-full cursor-pointer"
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    <NextImage
                                                        src={product.image}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>
                                            </DialogTrigger>
                                            {/* Detailed Dialog Content */}
                                            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-[2rem] border-none bg-background">
                                                {selectedProduct && selectedProduct.id === product.id && (
                                                    <div className="flex flex-col md:flex-row h-full">
                                                        <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto h-64 md:h-[500px]">
                                                            <NextImage src={product.image} alt={product.name} fill className="object-cover" />
                                                            {product.organic && (
                                                                <Badge className="absolute top-4 left-4 bg-white/90 text-green-700 backdrop-blur-md"><Leaf className="w-3 h-3 mr-1" /> Certified Organic</Badge>
                                                            )}
                                                        </div>
                                                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.seller}</span>
                                                                <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                                                <span className="flex items-center text-xs text-muted-foreground"><MapPin className="w-3 h-3 mr-1" /> {product.location}</span>
                                                            </div>
                                                            <h2 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h2>

                                                            <div className="flex items-center gap-2 mb-6">
                                                                <div className="flex items-center text-amber-500">
                                                                    <Star className="w-4 h-4 fill-current" />
                                                                    <Star className="w-4 h-4 fill-current" />
                                                                    <Star className="w-4 h-4 fill-current" />
                                                                    <Star className="w-4 h-4 fill-current" />
                                                                    <Star className="w-4 h-4 fill-current opacity-50" />
                                                                </div>
                                                                <span className="text-sm font-medium">{product.rating}</span>
                                                                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                                                            </div>

                                                            <p className="text-base text-muted-foreground leading-relaxed mb-8">
                                                                {product.description}
                                                            </p>

                                                            <div className="mt-auto">
                                                                <div className="text-3xl font-light mb-4">${product.price.toFixed(2)}</div>
                                                                <div className="flex gap-3">
                                                                    <Button 
                                                                        className="flex-1 h-12 rounded-full text-base" 
                                                                        size="lg"
                                                                        onClick={() => handleAddToCart(product)}
                                                                    >
                                                                        <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                                                                    </Button>
                                                                    <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-border/50">
                                                                        <Heart className="w-5 h-5" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>

                                         {/* Quick Add Overlay */}
                                        <div className="absolute inset-x-4 bottom-4 translate-y-[200%] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-300 ease-out z-10 hidden md:block">
                                            <Button 
                                                onClick={() => handleAddToCart(product)}
                                                className="w-full bg-white/90 hover:bg-white text-black backdrop-blur-md shadow-lg rounded-xl h-10 gap-2"
                                            >
                                                <ShoppingBag className="w-4 h-4" /> Quick Add
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <CardContent className="p-3 md:p-5 flex-1 flex flex-col">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1 md:gap-2">
                                            <div className="flex-1">
                                                <span className="text-[10px] md:text-xs font-medium text-muted-foreground mb-1 block">{product.seller}</span>
                                                <h3 className="font-semibold text-sm md:text-base line-clamp-1 group-hover/card:text-primary transition-colors cursor-pointer">{product.name}</h3>
                                            </div>
                                            <span className="font-bold text-sm md:text-base text-primary md:text-foreground md:font-medium">${product.price.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center gap-1 mt-auto pt-2 md:pt-3">
                                            <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-amber-500 text-amber-500" />
                                            <span className="text-[10px] md:text-xs font-semibold">{product.rating}</span>
                                            <span className="text-[9px] md:text-xs text-muted-foreground">({product.reviews})</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* 6️⃣ Pagination / Load More */}
                    <div className="flex justify-center mb-16">
                        <Magnet padding={40} magnetStrength={2}>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-border/50 bg-background hover:bg-primary/5 hover:text-primary transition-all">
                                Load More Products <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </Magnet>
                    </div>

                </div>
            </section>

            {/* 7️⃣ Featured Sellers Section */}
            <section className="bg-primary/5 py-20 px-4 sm:px-6 lg:px-8 border-y border-border/40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Featured Artisans</h2>
                            <p className="text-muted-foreground text-lg">Meet the creators behind the magic.</p>
                        </div>
                        <Button variant="link" className="hidden md:flex text-primary">View All Brands <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {sellers.map((seller, idx) => (
                            <motion.div
                                key={seller.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <Card className="bg-background border-none shadow-sm hover:shadow-md transition-shadow h-full rounded-3xl overflow-hidden group cursor-pointer">
                                    <div className="relative h-48 w-full">
                                        <NextImage src={seller.image} alt={seller.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-6 text-white">
                                            <h3 className="text-xl font-bold mb-1">{seller.name}</h3>
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <p className="text-muted-foreground">{seller.description}</p>
                                        <div className="mt-4 flex font-medium text-sm items-center text-primary group-hover:underline">
                                            Explore Brand <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8️⃣ Trust Section */}
            <section className="py-16 px-4 bg-background border-b border-border/40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border/40 font-jakarta">
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">100% Natural</h4>
                            <p className="text-sm text-muted-foreground">Ethically sourced ingredients</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">Made in Senegal</h4>
                            <p className="text-sm text-muted-foreground">Supporting local artisans</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">Secure Payments</h4>
                            <p className="text-sm text-muted-foreground">Safe & encrypted checkout</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Package className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">Fast Delivery</h4>
                            <p className="text-sm text-muted-foreground">National & international</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9️⃣ Newsletter Section */}
            <Newsletter />

            {/* 🔟 Footer */}
            <Footer />
        </div>
    )
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
        </svg>
    )
}
