"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Leaf, Globe,
    Truck, CornerDownLeft, ChevronRight, Share2, Plus, Minus, Info, Award,
    MapPin, ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"

// --- Mock Data (Should be shared in a real app) ---
const products = [
    {
        id: 1,
        name: "Pure Shea Butter",
        price: 24.99,
        rating: 4.9,
        reviews: 128,
        seller: "Koba Skin",
        location: "Dakar",
        category: "Skincare",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200",
        images: [
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200",
            "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1200",
            "https://images.unsplash.com/photo-1551632432-c735e8306917?q=80&w=1200"
        ],
        organic: true,
        description: "Our Pure Shea Butter is 100% unrefined and hand-crafted by a women's cooperative in rural Senegal. This multi-purpose butter is rich in vitamins A, E, and F, offering intense hydration and powerful skin-repairing properties.",
        benefits: [
            "Deeply hydrates and nourishes extremely dry skin",
            "Soothes irritation and inflammation",
            "Natural anti-aging properties",
            "Promotes skin elasticity and reduces appearance of scars"
        ],
        ingredients: "100% Organic, Unrefined Butyrospermum Parkii (Shea) Butter. No additives, no preservatives, no fragrances.",
        ritual: "Warm a small amount in your palms until it melts into a smooth oil. Apply to clean, damp skin for maximum absorption. Ideal for face, body, and even hair tips."
    },
    {
        id: 2,
        name: "Baobab Oil Serum",
        price: 38.50,
        rating: 4.8,
        reviews: 94,
        seller: "Senegal Beauty Co.",
        location: "Thiès",
        category: "Serums",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200",
        images: ["https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200"],
        organic: true,
        description: "Known as the 'Tree of Life', the Baobab provides one of the most nutrient-dense oils on the planet. This lightweight serum absorbs instantly, delivering a high concentration of antioxidants and omega fatty acids.",
        benefits: ["Boosts collagen production", "Protects against environmental stressors", "Non-comedogenic (won't clog pores)", "Instantly improves skin radiance"],
        ingredients: "100% Cold-pressed Baobab (Adansonia Digitata) Seed Oil. Single-origin and sustainably harvested.",
        ritual: "Apply 3-5 drops to clean, slightly damp face and neck every morning and evening. Can be used alone or mixed with your favorite moisturizer."
    }
]

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const [product, setProduct] = useState<typeof products[0] | null>(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        const id = Number(params.id)
        const found = products.find(p => p.id === id) || products[0] // Fallback to first if not found for demo
        setProduct(found)
    }, [params.id])

    if (!product) return null

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
                    <button onClick={() => router.push('/marketplace')} className="hover:text-primary transition-colors">Marketplace</button>
                    <ChevronRight className="w-4 h-4" />
                    <button className="hover:text-primary transition-colors">{product.category}</button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left: Product Gallery */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden bg-muted group cursor-zoom-in shadow-2xl"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImage}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                    <NextImage
                                        src={product.images ? product.images[selectedImage] : product.image}
                                        alt={product.name}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {product.organic && (
                                <Badge className="absolute top-6 left-6 bg-white/90 text-green-700 backdrop-blur-md px-4 py-2 text-sm font-bold shadow-sm">
                                    <Leaf className="w-4 h-4 mr-2" /> Certified Organic
                                </Badge>
                            )}

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-6 right-6 bg-white/50 backdrop-blur-md rounded-full text-foreground hover:bg-white hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                                onClick={() => setIsLiked(!isLiked)}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                        </motion.div>

                        {/* Thumbnail Navigation */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 ${selectedImage === idx ? 'ring-2 ring-primary ring-offset-4 scale-95' : 'opacity-60 hover:opacity-100'}`}
                                    >
                                        <NextImage src={img} alt={`${product.name} view ${idx}`} fill className="object-cover" sizes="100px" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Story Teaser (Desktop only) */}
                        <div className="hidden lg:block p-8 bg-[#FDFBF7] border border-[#E9E1D6] rounded-[2.5rem] mt-12 space-y-4">
                            <div className="flex items-center gap-3 text-primary">
                                <Award className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Heritage Guarantee</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                "Our production process supports 4 cooperative groups and provides stable income for 218 Senegalese women in the Casamance region." — <strong>{product.seller}</strong>
                            </p>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <FadeContent blur={true} duration={0.6}>
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <span className="text-sm font-bold text-primary uppercase tracking-widest hover:underline">{product.seller}</span>
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                    <span className="text-xs text-muted-foreground flex items-center"><MapPin className="w-3 h-3 mr-1" /> {product.location}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2D241E]">{product.name}</h1>
                            </div>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="text-4xl font-light text-[#2D241E]">${product.price.toFixed(2)}</div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
                                    <div className="flex text-amber-500">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                                    <span className="text-xs text-amber-700/60 font-medium">({product.reviews} reviews)</span>
                                </div>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                {product.description}
                            </p>

                            {/* Purchase Actions */}
                            <div className="space-y-6 pt-6 border-t border-border/40">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#2D241E]">Quantity</span>
                                        <div className="flex items-center border border-border rounded-full p-1 bg-background">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full w-10 h-10 hover:bg-secondary"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="w-12 text-center font-bold">{quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full w-10 h-10 hover:bg-secondary"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex justify-end">
                                        <div className="text-right">
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Subtotal</span>
                                            <div className="text-2xl font-bold">${(product.price * quantity).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button className="flex-[2] h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 text-lg font-bold gap-3 transition-transform active:scale-95 group">
                                        <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" /> Add to Cart
                                    </Button>
                                    <Button variant="outline" size="icon" className="w-16 h-16 rounded-2xl border-border/50 hover:bg-red-50 hover:border-red-200 group">
                                        <Heart className={`w-6 h-6 transition-colors group-hover:text-red-500 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                    </Button>
                                    <Button variant="outline" size="icon" className="w-16 h-16 rounded-2xl border-border/50 hover:bg-blue-50 hover:border-blue-200">
                                        <Share2 className="w-6 h-6 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>

                            {/* Delivery info */}
                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-[#2D241E]">Fast Delivery</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">2-4 Business Days</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                        <CornerDownLeft className="w-5 h-5 text-stone-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-[#2D241E]">Easy Returns</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">30 Days Policy</div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Tabs (Dynamic Content) */}
                            <div className="mt-12">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className="border-b-border/40">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline py-6">Key Benefits</AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {product.benefits.map((b, i) => (
                                                    <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                                                        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                                                        <span className="text-sm">{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2" className="border-b-border/40">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline py-6">The Ritual</AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <p className="text-muted-foreground leading-relaxed text-sm bg-stone-50 p-6 rounded-2xl border border-stone-100 italic">
                                                "{product.ritual}"
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3" className="border-none">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline py-6">Full Ingredients</AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <p className="text-sm text-muted-foreground font-mono leading-relaxed p-6 border border-dashed rounded-2xl">
                                                {product.ingredients}
                                            </p>
                                            <div className="mt-4 flex gap-6">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">
                                                    <Leaf className="w-3 h-3 text-green-600" /> 100% Organic
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">
                                                    <Globe className="w-3 h-3 text-blue-600" /> Eco-Responsible
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        </FadeContent>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-32 border-t border-border/40 pt-24">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="space-y-4">
                            <Badge className="bg-[#2D241E] text-white">Guest Reviews</Badge>
                            <h2 className="text-4xl font-bold text-[#2D241E]">Rave Reviews from <br /> our Community.</h2>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-5xl font-light">4.9<span className="text-xl text-muted-foreground">/5.0</span></div>
                            <div className="flex text-amber-500">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                            </div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Based on 128 Reviews</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { author: "Sarah B.", date: "2 days ago", content: "The best Shea Butter I've ever used. The texture is so creamy and it melts perfectly into my skin. Love the story behind it!", rating: 5 },
                            { author: "Amadou L.", date: "1 week ago", content: "Very high quality. You can tell it's authentic and unrefined. I use it for my beard and it works wonders.", rating: 5 },
                            { author: "Elise M.", date: "3 weeks ago", content: "Shipping was fast to France. The packaging is beautiful, very premium feel. My skin has never felt softer.", rating: 4 }
                        ].map((review, i) => (
                            <Card key={i} className="border-none shadow-sm bg-stone-50 rounded-[2rem] p-8 hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex text-amber-500">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground">{review.date}</span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                                    "{review.content}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                        {review.author[0]}
                                    </div>
                                    <span className="text-xs font-bold text-[#2D241E]">{review.author}</span>
                                    <Badge variant="outline" className="bg-green-100 text-green-700 text-[9px] h-5">Verified Buyer</Badge>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center mt-16">
                        <Button variant="outline" className="rounded-full px-12 h-14 border-[#2D241E] text-[#2D241E] hover:bg-[#2D241E] hover:text-white transition-all">
                            Load More Reviews
                        </Button>
                    </div>
                </section>

                {/* Similar Products Recommendation */}
                <section className="mt-32 pt-24 border-t border-border/40">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl font-bold text-[#2D241E]">You might also love...</h2>
                        <Button variant="link" className="text-primary font-bold group">View All Marketplace <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" /></Button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map(p => (
                            <Card key={p.id} className="group border-none shadow-none bg-transparent cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 bg-muted">
                                    <NextImage src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{p.seller}</span>
                                    <h3 className="font-bold text-[#2D241E] group-hover:text-primary transition-colors">{p.name}</h3>
                                    <div className="text-sm font-light">${p.price.toFixed(2)}</div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}
