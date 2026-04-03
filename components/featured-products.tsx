"use client"

import NextImage from "next/image"
import Link from "next/link"
import { Star, ShoppingBag, Heart, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Magnet } from "@/components/ui/magnet"
import { usePathname, useRouter } from "next/navigation"
import { useCart } from "@/providers/cart-provider"
import { toast } from "sonner"
import { formatPrice, cn } from "@/lib/utils"
import { toggleWishlist } from "@/lib/actions/wishlist"
import { useSession } from "next-auth/react"

export function FeaturedProducts({ 
  initialProducts, 
  limit = 4, 
  title = "Essentiels Premium",
  subtitle = "Une sélection de nos coups de cœur biologiques parmi les collections de luxe africaines.",
  hideHeader = false
}: { 
  initialProducts: any[], 
  limit?: number | null, 
  title?: string | null,
  subtitle?: string | null,
  hideHeader?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const products = (limit ? initialProducts.slice(0, limit) : initialProducts).map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.price * 1.2, // mock original price
    rating: p.avgRating || 0,
    reviews: p.reviewCount || 0,
    image: p.images?.[0] || "/images/product-1.jpg",
    seller: p.shop?.name || "Premium Artisan",
    badge: "Trending",
  }))
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [isLoadingWishlist, setIsLoadingWishlist] = useState<string | null>(null)
  const { data: session } = useSession()
  const { addItem } = useCart()

  // Sync wishlistIds with props whenever initialProducts change
  useEffect(() => {
    if (initialProducts) {
      const ids = initialProducts.filter((p: any) => p.isWishlisted).map((p: any) => p.id)
      setWishlistIds(ids)
    }
  }, [initialProducts])

  const handleAddToCart = (product: any) => {
    addItem({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
        seller: product.seller,
        organic: true
    })
    toast.success(`${product.name} ajouté à votre rituel.`)
  }

  const handleToggleWishlist = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!session) {
        toast.error("Vous devez être connecté pour ajouter en favori.")
        router.push("/account")
        return
    }

    setIsLoadingWishlist(productId)
    try {
        const result = await toggleWishlist(productId)
        if (result.success) {
            if (result.isWishlisted) {
                setWishlistIds(prev => [...prev, productId])
                toast.success("Ajouté à vos favoris")
            } else {
                setWishlistIds(prev => prev.filter(id => id !== productId))
                toast.success("Retiré de vos favoris")
            }
        } else {
            toast.error(result.error)
        }
    } catch (error) {
        toast.error("Une erreur est survenue")
    } finally {
        setIsLoadingWishlist(null)
    }
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-secondary/5 relative overflow-hidden">
      {/* Background soft glowing orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        {!hideHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl px-2">
            <FadeContent direction="up" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 md:mb-6">
                <Star className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider">Sélection Exclusive</span>
              </div>
            </FadeContent>

            {title && (
              <BlurText
                text={title}
                className="text-[clamp(2rem,10vw,4rem)] md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                animateBy="words"
                delay={0.08}
              />
            )}

            {subtitle && (
              <FadeContent direction="up" delay={0.2}>
                <p className="text-muted-foreground mt-4 text-sm md:text-lg font-light max-w-lg">
                  {subtitle}
                </p>
              </FadeContent>
            )}
          </div>

          <FadeContent direction="left" delay={0.3} className="hidden md:block">
            <Magnet padding={40} magnetStrength={3}>
              <Button variant="ghost" className="group rounded-full px-6 hover:bg-primary/5 hover:text-primary transition-colors text-base font-medium" onClick={() => router.push('/marketplace')}>
                Voir tous les produits
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnet>
          </FadeContent>
        </div>
        )}

        {/* Products Grid / Mobile Carousel */}
        <div className="relative group/carousel">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {products.map((product, idx) => (
              <FadeContent key={product.id} direction="up" delay={0.1 * (idx + 1)}>
                <SpotlightCard className="group relative bg-background border border-border/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  <Card className="border-none bg-transparent shadow-none">
                    <div 
                      className="relative aspect-[4/5] overflow-hidden bg-secondary/20"
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <Link href={`/product/${product.id}`} className="block h-full">
                        <NextImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                      </Link>

                      {product.badge && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute top-5 left-5 md:top-6 md:left-6 px-2.5 py-1 bg-background/90 backdrop-blur-md text-foreground text-[9px] md:text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm border border-border/50"
                        >
                          {product.badge}
                        </motion.div>
                      )}

                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        whileHover={{ scale: 1.1 }}
                        disabled={isLoadingWishlist === product.id}
                        onClick={(e) => handleToggleWishlist(product.id, e)}
                        className={cn(
                            "absolute top-5 right-5 md:top-6 md:right-6 h-9 w-9 md:h-10 md:w-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border border-border/50 shadow-sm z-20",
                            wishlistIds.includes(product.id) 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "bg-background/80 text-foreground/70 hover:bg-background hover:text-red-500"
                        )}
                      >
                        <Heart className={cn("h-4 w-4", wishlistIds.includes(product.id) && "fill-current")} />
                      </motion.button>

                      <div className="absolute bottom-5 left-5 right-5 md:bottom-6 md:left-6 md:right-6 overflow-hidden hidden md:block">
                        <AnimatePresence>
                          {hoveredId === product.id && (
                            <motion.div
                              initial={{ y: "100%", opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: "100%", opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <Button 
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground backdrop-blur-md rounded-xl py-6 shadow-xl transition-colors duration-300 group/btn"
                              >
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                <span className="font-medium tracking-wide">Ajout Rapide</span>
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <CardContent className="p-6 md:p-8">
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1">
                          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{product.seller}</p>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="text-base md:text-xl font-bold tracking-tight text-foreground line-clamp-1 hover:text-primary transition-colors cursor-pointer">{product.name}</h3>
                          </Link>
                        </div>
                        <div className="text-right">
                          <p className="text-base md:text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-1.5 mt-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star 
                                key={s} 
                                className={`h-2.5 w-2.5 md:h-3 md:w-3 ${s <= Math.round(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} 
                              />
                            ))}
                          </div>
                          <span className="text-[10px] md:text-xs font-semibold text-foreground ml-1">{product.rating.toFixed(1)}</span>
                          <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">
                            ({product.reviews})
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/20" />
                          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-muted-foreground">En Stock</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </FadeContent>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 md:mt-32 border-t border-border/10 pt-20">
        {/* Decorative divider */}
      </div>
    </section>
  )
}
