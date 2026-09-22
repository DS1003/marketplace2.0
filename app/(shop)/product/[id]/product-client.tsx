"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Leaf, Globe,
    Truck, CornerDownLeft, ChevronRight, Share2, Plus, Minus, Info, Award,
    MapPin, ArrowRight, Loader2, Sparkles
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { FadeContent } from "@/components/ui/fade-content"
import { getProductReviews, addReview } from "@/lib/actions/reviews"
import { useCart } from "@/providers/cart-provider"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"
import { toggleWishlist } from "@/lib/actions/wishlist"
import { useSession } from "next-auth/react"

export default function ProductClient({ 
    product, 
    relatedProducts, 
    initialReviews 
}: { 
    product: any, 
    relatedProducts: any[], 
    initialReviews: any[] 
}) {
    const router = useRouter()
    const { data: session } = useSession()
    const { addItem } = useCart()
    
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isLiked, setIsLiked] = useState(!!product.isWishlisted)
    const [reviews, setReviews] = useState<any[]>(initialReviews)
    
    const [newReviewRating, setNewReviewRating] = useState(0)
    const [newReviewComment, setNewReviewComment] = useState("")
    const [submittingReview, setSubmittingReview] = useState(false)
    const [togglingWishlist, setTogglingWishlist] = useState(false)

    const handleAddToCart = () => {
        if (!product) return
        
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.images?.[0] || "",
                seller: product.shop?.name || "Boutique Artisanale",
                organic: true
            })
        }
        
        toast.success(`${quantity} ${product.name} ajouté à votre panier ritual.`, {
            action: {
                label: "Voir le panier",
                onClick: () => router.push("/cart")
            }
        })
    }

    const handleToggleWishlist = async () => {
        if (!session) {
            toast.error("Vous devez être connecté pour ajouter en favori.")
            router.push("/account")
            return
        }

        if (!product || togglingWishlist) return

        setTogglingWishlist(true)
        try {
            const res = await toggleWishlist(product.id)
            if (res.success) {
                setIsLiked(!!res.isWishlisted)
                toast.success(res.isWishlisted ? "Ajouté aux favoris" : "Retiré des favoris")
            } else {
                toast.error(res.error)
            }
        } catch (error) {
            toast.error("Une erreur est survenue")
        } finally {
            setTogglingWishlist(false)
        }
    }

    const reviewsCount = reviews.length
    const rating = reviewsCount > 0 ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewsCount).toFixed(1) : "0.0"
    const mockBenefits = [
        "Sourcing éthique et récolte durable",
        "Soutient les coopératives d'artisans locaux",
        "100% naturel, sans additifs synthétiques",
        "Testé dermatologiquement pour sa pureté"
    ]

    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
                    <button onClick={() => router.push('/marketplace')} className="hover:text-primary transition-colors">Marché</button>
                    <ChevronRight className="w-4 h-4" />
                    <button className="hover:text-primary transition-colors cursor-default">{product.category?.name || "Général"}</button>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-foreground font-medium">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left: Product Gallery */}
                    <div className="space-y-6 lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                                        src={product.images?.[selectedImage] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1200"}
                                        alt={product.name}
                                        fill
                                        priority
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            <Badge className="absolute top-6 left-6 bg-white/90 text-green-700 backdrop-blur-md px-4 py-2 text-sm font-bold shadow-sm">
                                <Leaf className="w-4 h-4 mr-2" /> 100% Qualité Ritual
                            </Badge>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-6 right-6 bg-white/50 backdrop-blur-md rounded-full text-foreground hover:bg-white hover:text-red-500 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                disabled={togglingWishlist}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleToggleWishlist()
                                }}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                        </motion.div>

                        {/* Thumbnail Navigation */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img: string, idx: number) => (
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
                                <span className="text-xs font-bold uppercase tracking-widest">Héritage Garanti</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                "L'achat de ce produit soutient directement les artisans sénégalais derrière <strong>{product.shop?.name || "la coopérative"}</strong>." — Rituels Durables
                            </p>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <FadeContent blur={true} duration={0.6}>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => product.shop?.id ? router.push(`/sellers/${product.shop.id}`) : null}>
                                        <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:underline">{product.shop?.name || "Boutique Artisan"}</span>
                                        <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest flex items-center"><MapPin className="w-3 h-3 mr-1" /> Patrimoine Sénégal</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                        <span className="text-xs font-bold text-amber-700">{rating}</span>
                                        <span className="text-[10px] text-amber-700/60 font-medium uppercase tracking-widest">({reviewsCount} avis)</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#2D241E] leading-tight">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="mb-8">
                                <div className="text-3xl font-medium tracking-tight text-primary">{formatPrice(product.price)}</div>
                            </div>

                            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed mb-10 italic border-l border-primary/20 pl-5">
                                {product.description || "Un produit d'exception, fabriqué avec soin par des artisans locaux passionnés, garantissant une qualité supérieure et un respect des traditions."}
                            </p>

                            {/* Purchase Actions */}
                            <div className="bg-white/40 border border-[#E9E1D6] backdrop-blur-sm rounded-[2rem] p-6 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E]/50">Quantité</span>
                                        <div className="flex items-center border border-[#E9E1D6] rounded-full p-1 bg-white">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full w-8 h-8 hover:bg-[#FDFBF7] text-[#2D241E]"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </Button>
                                            <span className="w-10 text-center font-medium text-sm">{quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="rounded-full w-8 h-8 hover:bg-[#FDFBF7] text-[#2D241E]"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex justify-end">
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E]/50 mb-1 block">Sous-total</span>
                                            <div className="text-2xl font-medium tracking-tight text-[#2D241E]">{formatPrice(product.price * quantity)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button 
                                        onClick={handleAddToCart}
                                        className="flex-[2] h-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/10 text-sm font-medium gap-2 transition-transform active:scale-95 group"
                                    >
                                        <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" /> Ajouter au rituel
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="w-14 h-14 rounded-full border-[#E9E1D6] bg-white hover:bg-red-50 hover:border-red-200 group disabled:opacity-50 transition-all shadow-sm" 
                                        disabled={togglingWishlist}
                                        onClick={handleToggleWishlist}
                                    >
                                        <Heart className={`w-5 h-5 transition-colors group-hover:text-red-500 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                    </Button>
                                    <Button variant="outline" size="icon" className="hidden sm:flex w-14 h-14 rounded-full border-[#E9E1D6] bg-white hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm">
                                        <Share2 className="w-5 h-5 text-[#2D241E]" />
                                    </Button>
                                </div>
                            </div>

                            {/* Delivery info */}
                            <div className="grid grid-cols-2 gap-4 mt-12">
                                <div className="flex items-center gap-4 p-5 bg-white/50 border border-[#E9E1D6] rounded-[2rem] hover:bg-white transition-colors duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#2D241E] shadow-sm border border-stone-100">
                                        <Truck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E] mb-1">Logistique</div>
                                        <div className="text-xs text-muted-foreground">Livraison 2-4 jours</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-white/50 border border-[#E9E1D6] rounded-[2rem] hover:bg-white transition-colors duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center text-[#2D241E] shadow-sm border border-stone-100">
                                        <CornerDownLeft className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E] mb-1">Garantie</div>
                                        <div className="text-xs text-muted-foreground">Retours 30 jours</div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Details Accordion */}
                            <div className="mt-16">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className="border-b-[#E9E1D6]">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.2em] hover:no-underline py-6 group">
                                            <span className="group-hover:text-primary transition-colors">Avantages Clés</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <ul className="grid grid-cols-1 gap-4">
                                                {mockBenefits.map((b, i) => (
                                                    <li key={i} className="flex gap-4 items-center text-muted-foreground">
                                                        <div className="w-2 h-2 rounded-full bg-primary/40 flex-shrink-0" />
                                                        <span className="text-[15px] font-light">{b}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2" className="border-b-[#E9E1D6]">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.2em] hover:no-underline py-6 group">
                                            <span className="group-hover:text-primary transition-colors">Rituel d'Application</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <div className="relative p-8 rounded-[2rem] bg-[#FDFBF7] border border-[#E9E1D6] overflow-hidden">
                                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                                    <Sparkles className="w-24 h-24" />
                                                </div>
                                                <p className="text-[#2D241E]/80 leading-relaxed text-[15px] font-light italic relative z-10">
                                                    "Incorporer ce produit dans votre rituel quotidien pour bénéficier pleinement de ses vertus naturelles. Appliquer une petite quantité sur la zone souhaitée et masser délicatement jusqu'à absorption complète."
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3" className="border-none">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-[0.2em] hover:no-underline py-6 group">
                                            <span className="group-hover:text-primary transition-colors">Traçabilité & Éthique</span>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <div className="mt-2 flex gap-8">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700">
                                                        <Leaf className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E] text-center">100%<br/>Naturel</div>
                                                </div>
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                                                        <Globe className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E] text-center">Éco<br/>Responsable</div>
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
                            <Badge className="bg-[#2D241E] text-white">Avis Clients</Badge>
                            <h2 className="text-4xl font-bold text-[#2D241E]">Ce que dit <br /> notre communauté.</h2>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-5xl font-light">{rating}<span className="text-xl text-muted-foreground">/5.0</span></div>
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star 
                                        key={s} 
                                        className={`w-4 h-4 ${s <= Math.round(Number(rating)) ? "fill-amber-500 text-amber-500" : "text-stone-200"}`} 
                                    />
                                ))}
                            </div>
                            <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Basé sur {reviewsCount} Avis</div>
                        </div>
                    </div>

                    {/* Add Review Form */}
                    <div className="mb-16 bg-white p-8 rounded-[2rem] border border-border/50 shadow-sm">
                        <h3 className="text-xl font-bold text-[#2D241E] mb-4">Laissez un avis sur ce produit</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star} 
                                        onClick={() => setNewReviewRating(star)}
                                        className={`transition-colors ${newReviewRating >= star ? 'text-amber-500' : 'text-stone-300'}`}
                                    >
                                        <Star fill="currentColor" className="w-8 h-8" />
                                    </button>
                                ))}
                            </div>
                            <textarea
                                className="w-full min-h-[120px] p-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-light"
                                placeholder="Partagez votre expérience avec ce rituel..."
                                value={newReviewComment}
                                onChange={(e) => setNewReviewComment(e.target.value)}
                            />
                            <Button 
                                onClick={async () => {
                                    if (newReviewRating === 0) { toast.error("Veuillez donner une note."); return; }
                                    setSubmittingReview(true);
                                    const res = await addReview(product.id, newReviewRating, newReviewComment);
                                    if (res.success) {
                                        toast.success("Votre avis a été publié!");
                                        setNewReviewRating(0);
                                        setNewReviewComment("");
                                        const rRes = await getProductReviews(product.id);
                                        if (rRes.success) setReviews(rRes.data || []);
                                    } else {
                                        toast.error(res.error || "Une erreur s'est produite.");
                                    }
                                    setSubmittingReview(false);
                                }}
                                disabled={submittingReview}
                                className="w-fit px-8 rounded-xl bg-[#2D241E] text-white"
                            >
                                {submittingReview ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                Publier mon avis
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.length > 0 ? reviews.map((review, i) => (
                            <Card key={i} className="border-none shadow-sm bg-stone-50 rounded-[2rem] p-8 hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star 
                                                key={s} 
                                                className={`w-3 h-3 ${s <= review.rating ? "fill-amber-500 text-amber-500" : "text-stone-300"}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                                        {new Date(review.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
                                    "{review.comment}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                        {review.user?.name?.[0] || "U"}
                                    </div>
                                    <span className="text-xs font-bold text-[#2D241E]">{review.user?.name || "Utilisateur"}</span>
                                    <Badge variant="outline" className="bg-green-100 text-green-700 text-[9px] h-5 border-green-200">Acheteur</Badge>
                                </div>
                            </Card>
                        )) : (
                            <p className="text-sm text-muted-foreground italic col-span-full">Aucun avis pour l'instant. Soyez le premier à donner votre avis !</p>
                        )}
                    </div>
                </section>

                {/* Similar Products Recommendation */}
                <section className="mt-32 pt-24 border-t border-border/40">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl font-bold text-[#2D241E]">Vous pourriez aussi aimer...</h2>
                        <Button variant="link" className="text-primary font-bold group" onClick={() => router.push('/marketplace')}>
                            Voir toute la marketplace <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.slice(0, 4).map((p: any) => (
                            <Card key={p.id} className="group border-none shadow-none bg-transparent cursor-pointer" onClick={() => router.push(`/product/${p.id}`)}>
                                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 bg-muted text-foreground">
                                    <NextImage src={p.images?.[0] || "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200"} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{p.shop?.name || "Artisan"}</span>
                                    <h3 className="font-bold text-[#2D241E] group-hover:text-primary transition-colors">{p.name}</h3>
                                    <div className="text-sm font-light">{formatPrice(p.price)}</div>
                                </div>
                            </Card>
                        ))}
                        {relatedProducts.length === 0 && (
                            <p className="text-sm text-stone-400 italic">Aucun produit similaire trouvé pour le moment.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}
