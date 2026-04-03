"use client"

import { useState, useMemo } from "react"
import NextImage from "next/image"
import Link from "next/link"
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
import { formatPrice } from "@/lib/utils"

// --- Data ---
// Categories should ideally be fetched and dynamic as well, but for simplicity here's a dynamic extract
// const categories = ["All Products", "Skincare", "Haircare", "Natural Soaps", "Essential Oils", "Accessories"]

export default function MarketplaceClient({ initialProducts, initialSellers }: { initialProducts: any[], initialSellers: any[] }) {
    const categories = ["Tous les produits", ...Array.from(new Set(initialProducts.map((p: any) => p.category?.name).filter(Boolean))) as string[]]
    
    const productsList = initialProducts.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        rating: 4.8, // Mocking rating
        reviews: Math.floor(Math.random() * 100) + 10,
        seller: p.shop?.name || "Boutique Inconnue",
        location: "Sénégal", // Mocking location
        image: p.images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop",
        organic: true,
        category: p.category?.name || "Non classé",
        description: p.description || "Produit naturel premium."
    }))

    const sellers = initialSellers.map((s: any) => ({
        id: s.id,
        name: s.owner?.name || s.name,
        description: s.description || "Soins minimalistes ancrés dans les traditions sénégalaises.",
        image: s.image || "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=400&auto=format&fit=crop"
    }))
    const maxPrice = useMemo(() => {
        if (productsList.length === 0) return 100000
        return Math.ceil(Math.max(...productsList.map(p => p.price)) * 1.2)
    }, [productsList])

    const [activeCategory, setActiveCategory] = useState("Tous les produits")
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
    const [priceRange, setPriceRange] = useState([0, maxPrice])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedProduct, setSelectedProduct] = useState<typeof productsList[0] | null>(null)
    const { addItem } = useCart()

    const filteredProducts = productsList.filter(product => {
        const matchesCategory = activeCategory === "Tous les produits" || product.category === activeCategory
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
            image: product.image,
            seller: product.seller,
            organic: product.organic
        })
        toast.success(`${product.name} ajouté à votre panier ritual.`)
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* 1️⃣ Marketplace Header */}
            <section className="pt-20 pb-6 md:pt-28 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeContent blur={true} duration={0.8}>
                    <div className="flex flex-col items-center text-center mb-8 md:mb-10">
                        <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs">
                            <SparklesIcon className="w-3 h-3 mr-2" /> Notre Assortiment
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                            Marché
                        </h1>
                        <p className="text-muted-foreground text-sm md:text-lg max-w-2xl px-2">
                            Découvrez des produits de beauté bio haut de gamme, fabriqués au cœur de l'Afrique. Méticuleusement sélectionnés pour leur qualité, leur pureté et leur efficacité.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher des produits..."
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

            <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

                {/* Mobile Filters Toggle */}
                <div className="lg:hidden flex items-center justify-between mb-4">
                    <Button variant="outline" size="sm" onClick={() => setIsMobileFiltersOpen(true)} className="flex items-center gap-2 rounded-full px-4 h-10 border-border/60">
                        <SlidersHorizontal className="w-4 h-4" /> Filtres
                    </Button>
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">Trier par</span>
                        <Select defaultValue="popular">
                            <SelectTrigger className="w-[120px] h-10 border-none bg-background shadow-sm rounded-full px-3 text-xs font-medium">
                                <SelectValue placeholder="Trier" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="popular">Le plus populaire</SelectItem>
                                <SelectItem value="newest">Nouveautés</SelectItem>
                                <SelectItem value="price-asc">Prix : Croissant</SelectItem>
                                <SelectItem value="price-desc">Prix : Décroissant</SelectItem>
                                <SelectItem value="rating">Mieux notés</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* 2️⃣ Advanced Filters Sidebar */}
                <aside className={`${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-background p-6 overflow-y-auto' : 'hidden'} lg:block lg:w-1/4 lg:sticky lg:top-28 lg:h-[calc(100vh-120px)] lg:overflow-y-auto hide-scrollbar`}>
                    {isMobileFiltersOpen && (
                        <div className="flex justify-between items-center mb-8 lg:hidden">
                            <h2 className="text-xl font-bold">Filtres</h2>
                            <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    )}

                    <div className="space-y-8 pr-4">
                        <div>
                            <h3 className="font-semibold mb-4 text-base">Fourchette de prix</h3>
                            <Slider
                                defaultValue={[0, maxPrice]}
                                max={maxPrice}
                                step={100}
                                value={priceRange}
                                onValueChange={setPriceRange}
                                className="mb-3"
                            />
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{formatPrice(priceRange[0])}</span>
                                <span>{formatPrice(priceRange[1])}</span>
                            </div>
                        </div>

                        <Separator />

                        <Accordion type="multiple" defaultValue={["type", "organic", "rating"]}>
                            <AccordionItem value="type" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-3 px-0 font-semibold">Type de produit</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-3 pt-1">
                                        {["Huiles & Sérums", "Crèmes & Beurres", "Nettoyants", "Masques"].map(item => (
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
                                                Sans cruauté (Cruelty-Free)
                                            </label>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="location" className="border-none">
                                <AccordionTrigger className="hover:no-underline py-3 px-0 font-semibold">Emplacement de l'artisan</AccordionTrigger>
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
                            <Button className="w-full" onClick={() => setIsMobileFiltersOpen(false)}>Appliquer les filtres</Button>
                        </div>
                    )}
                </aside>

                {/* Main Content Area */}
                <div className="lg:w-3/4 flex flex-col">

                    {/* 4️⃣ Sorting Options (Desktop) */}
                    <div className="hidden lg:flex items-center justify-between mb-8 pb-4 border-b border-border/40">
                        <p className="text-sm text-muted-foreground font-medium">Affichage de {filteredProducts.length} sur {productsList.length} produits</p>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-foreground font-medium">Trier par</span>
                            <Select defaultValue="popular">
                                <SelectTrigger className="w-[180px] bg-background/50 rounded-full border-border/50">
                                    <SelectValue placeholder="Sélectionner..." />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="popular">Le plus populaire</SelectItem>
                                    <SelectItem value="newest">Nouveautés</SelectItem>
                                    <SelectItem value="price-asc">Prix : Croissant</SelectItem>
                                    <SelectItem value="price-desc">Prix : Décroissant</SelectItem>
                                    <SelectItem value="rating">Mieux notés</SelectItem>
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
                                <Link href={`/product/${product.id}`}>
                                <Card className="h-full overflow-hidden border-border/50 bg-background hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 rounded-2xl flex flex-col group/card">
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                        {product.organic && (
                                            <Badge className="absolute top-3 left-3 z-10 bg-white/90 text-green-700 hover:bg-white backdrop-blur-md shadow-sm pointer-events-none">
                                                <Leaf className="w-3 h-3 mr-1" /> Bio
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
                                                                <Badge className="absolute top-4 left-4 bg-white/90 text-green-700 backdrop-blur-md"><Leaf className="w-3 h-3 mr-1" /> Certifié Biologique</Badge>
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
                                                                <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                                                            </div>

                                                            <p className="text-base text-muted-foreground leading-relaxed mb-8">
                                                                {product.description}
                                                            </p>

                                                            <div className="mt-auto">
                                                                <div className="text-3xl font-light mb-4">{formatPrice(product.price)}</div>
                                                                <div className="flex gap-3">
                                                                    <Button 
                                                                        className="flex-1 h-12 rounded-full text-base" 
                                                                        size="lg"
                                                                        onClick={() => handleAddToCart(product)}
                                                                    >
                                                                        <ShoppingBag className="w-4 h-4 mr-2" /> Ajouter au panier
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
                                                <ShoppingBag className="w-4 h-4" /> Ajout Rapide
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
                                            <span className="font-bold text-sm md:text-base text-primary md:text-foreground md:font-medium">{formatPrice(product.price)}</span>
                                        </div>

                                        <div className="flex items-center gap-1 mt-auto pt-2 md:pt-3">
                                            <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-amber-500 text-amber-500" />
                                            <span className="text-[10px] md:text-xs font-semibold">{product.rating}</span>
                                            <span className="text-[9px] md:text-xs text-muted-foreground">({product.reviews})</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* 6️⃣ Pagination / Load More */}
                    <div className="flex justify-center mb-12">
                        <Magnet padding={40} magnetStrength={2}>
                            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-border/50 bg-background hover:bg-primary/5 hover:text-primary transition-all">
                                Charger plus de produits <ChevronDown className="w-4 h-4 ml-2" />
                            </Button>
                        </Magnet>
                    </div>

                </div>
            </section>

            {/* 7️⃣ Featured Sellers Section */}
            <section className="bg-primary/5 py-12 px-4 sm:px-6 lg:px-8 border-y border-border/40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Artisans à la une</h2>
                            <p className="text-muted-foreground text-lg">Découvrez les créateurs derrière la magie.</p>
                        </div>
                        <Button variant="link" className="hidden md:flex text-primary">Voir toutes les marques <ArrowRight className="w-4 h-4 ml-1" /></Button>
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
                                            Explorer la marque <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8️⃣ Trust Section */}
            <section className="py-10 px-4 bg-background border-b border-border/40">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-border/40 font-jakarta">
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">100% Naturel</h4>
                            <p className="text-sm text-muted-foreground">Ingrédients sourcés éthiquement</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">Fabriqué au Sénégal</h4>
                            <p className="text-sm text-muted-foreground">Soutien aux artisans locaux</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">Paiements Sécurisés</h4>
                            <p className="text-sm text-muted-foreground">Checkout sûr et crypté</p>
                        </div>
                        <div className="flex flex-col items-center text-center px-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Package className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold mb-1">Livraison Rapide</h4>
                            <p className="text-sm text-muted-foreground">National & International</p>
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
