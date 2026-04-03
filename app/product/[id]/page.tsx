"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Star, Heart, ShoppingBag, ArrowLeft, ShieldCheck, Leaf, Globe,
    Truck, CornerDownLeft, ChevronRight, Share2, Plus, Minus, Info, Award,
    MapPin, ArrowRight, Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"
import { getProductById, getRelatedProducts } from "@/lib/actions/public"
import { getProductReviews, addReview } from "@/lib/actions/reviews"
import { useCart } from "@/providers/cart-provider"
import { toast } from "sonner"
import { formatPrice } from "@/lib/utils"
import { toggleWishlist } from "@/lib/actions/wishlist"
import { useSession } from "next-auth/react"

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const { data: session } = useSession()
    const { addItem } = useCart()
    const [product, setProduct] = useState<any>(null)
    const [relatedProducts, setRelatedProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isLiked, setIsLiked] = useState(false)
    const [reviews, setReviews] = useState<any[]>([])
    const [newReviewRating, setNewReviewRating] = useState(0)
    const [newReviewComment, setNewReviewComment] = useState("")
    const [submittingReview, setSubmittingReview] = useState(false)
    const [togglingWishlist, setTogglingWishlist] = useState(false)

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true)
            const id = params.id as string
            const res = await getProductById(id)
            
            if (res.success && res.data) {
                setProduct(res.data)
                setIsLiked(!!(res.data as any).isWishlisted)
                // Fetch related products
                const relatedRes = await getRelatedProducts(id, res.data.categoryId)
                if (relatedRes.success) {
                    setRelatedProducts(relatedRes.data || [])
                }
                const reviewsRes = await getProductReviews(id)
                if (reviewsRes.success) {
                    setReviews(reviewsRes.data || [])
                }
            } else {
                toast.error("Produit non trouvé")
                router.push("/marketplace")
            }
            setLoading(false)
        }

        if (params.id) {
            fetchProductData()
        }
    }, [params.id, router])

    const handleAddToCart = () => {
        if (!product) return
        
        // Add to cart with quantity
        for (let i = 0; i < quantity; i++) {
            addItem({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.images?.[0] || "",
                seller: product.shop?.name || "Artisan Shop",
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
            setTogglingWishlist(null as any)
            setTogglingWishlist(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Chargement du Rituel...</p>
                </div>
            </div>
        )
    }

    if (!product) return null

    // Prepare content for UI
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
            <Header />

            <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                                <span className="text-xs font-bold uppercase tracking-widest">Garantie Héritage</span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                "L'achat de ce produit soutient directement les artisans sénégalais derrière <strong>{product.shop?.name || "la coopérative"}</strong>." — Rituels Durables
                            </p>
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <FadeContent blur={true} duration={0.6}>
                            <div className="space-y-2 mb-6">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <span className="text-sm font-bold text-primary uppercase tracking-widest hover:underline">{product.shop?.name || "Boutique Artisan"}</span>
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                    <span className="text-xs text-muted-foreground flex items-center"><MapPin className="w-3 h-3 mr-1" /> Patrimoine Sénégal</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#2D241E]">{product.name}</h1>
                            </div>

                            <div className="flex items-center gap-6 mb-8">
                                <div className="text-4xl font-light text-[#2D241E]">{formatPrice(product.price)}</div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star 
                                                key={s} 
                                                className={`w-4 h-4 ${s <= Math.round(Number(rating)) ? "fill-amber-500 text-amber-500" : "text-stone-300"}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-amber-700">{rating}</span>
                                    <span className="text-xs text-amber-700/60 font-medium">({reviewsCount} avis)</span>
                                </div>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                                {product.description || "Un produit d'exception, fabriqué avec soin par des artisans locaux passionnés, garantissant une qualité supérieure et un respect des traditions."}
                            </p>

                            {/* Purchase Actions */}
                            <div className="space-y-6 pt-6 border-t border-border/40">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-xs font-bold uppercase tracking-widest text-[#2D241E]">Quantité</span>
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
                                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Sous-total</span>
                                            <div className="text-2xl font-bold">{formatPrice(product.price * quantity)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button 
                                        onClick={handleAddToCart}
                                        className="flex-[2] h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 text-lg font-bold gap-3 transition-transform active:scale-95 group"
                                    >
                                        <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" /> Ajouter au panier
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="icon" 
                                        className="w-16 h-16 rounded-2xl border-border/50 hover:bg-red-50 hover:border-red-200 group disabled:opacity-50" 
                                        disabled={togglingWishlist}
                                        onClick={handleToggleWishlist}
                                    >
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
                                        <div className="text-xs font-bold uppercase text-[#2D241E]">Livraison Rapide</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">2-4 jours ouvrables</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                                        <CornerDownLeft className="w-5 h-5 text-stone-600" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase text-[#2D241E]">Retours Faciles</div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Politique de 30 jours</div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Details Accordion */}
                            <div className="mt-12">
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className="border-b-border/40">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline py-6">Avantages Clés</AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {mockBenefits.map((b, i) => (
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
                                                "Incorporer ce produit dans votre rituel quotidien pour bénéficier pleinement de ses vertus naturelles. Appliquer une petite quantité sur la zone souhaitée et masser délicatement jusqu'à absorption complète."
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3" className="border-none">
                                        <AccordionTrigger className="text-sm font-bold uppercase tracking-widest hover:no-underline py-6">Transparency</AccordionTrigger>
                                        <AccordionContent className="pb-8 pt-2">
                                            <div className="mt-4 flex gap-6">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">
                                                    <Leaf className="w-3 h-3 text-green-600" /> 100% Bio
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">
                                                    <Globe className="w-3 h-3 text-blue-600" /> Éco-responsable
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

            <Footer />
        </div>
    )
}
