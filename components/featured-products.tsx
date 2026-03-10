"use client"

import NextImage from "next/image"
import { Star, ShoppingBag, Heart, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Magnet } from "@/components/ui/magnet"

const products = [
  {
    id: 1,
    name: "Pure Shea Butter",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.9,
    reviews: 124,
    image: "/images/product-1.jpg",
    seller: "Fatou Natural",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Baobab Facial Oil",
    price: 34.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 89,
    image: "/images/product-2.jpg",
    seller: "Senegal Oils",
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "African Black Soap",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.7,
    reviews: 256,
    image: "/images/product-3.jpg",
    seller: "Dakar Organics",
    badge: null,
  },
  {
    id: 4,
    name: "Moringa Hair Serum",
    price: 28.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 67,
    image: "/images/product-4.jpg",
    seller: "Natural Glow",
    badge: "Trending",
  },
]

export function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section ref={ref} className="py-32 bg-secondary/5 relative overflow-hidden">
      {/* Background soft glowing orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <FadeContent direction="up" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <Star className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Curated Selection</span>
              </div>
            </FadeContent>

            <BlurText
              text="Premium Essentials"
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              animateBy="words"
              delay={0.08}
            />

            <FadeContent direction="up" delay={0.2}>
              <p className="text-muted-foreground mt-4 text-lg font-light max-w-lg">
                Handpicked organic favorites from our luxury African beauty collections.
              </p>
            </FadeContent>
          </div>

          <FadeContent direction="left" delay={0.3}>
            <Magnet padding={40} magnetStrength={3}>
              <Button variant="ghost" className="group rounded-full px-6 hover:bg-primary/5 hover:text-primary transition-colors text-base font-medium">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnet>
          </FadeContent>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group"
            >
              <SpotlightCard
                className="h-full rounded-[2rem]"
                spotlightColor="rgba(var(--primary-rgb), 0.1)"
              >
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden rounded-[2rem] h-full flex flex-col group-hover:-translate-y-2">
                  <div className="relative aspect-[4/5] overflow-hidden p-2">
                    <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-muted/20">
                      <NextImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Minimal Badge */}
                    {product.badge && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-6 left-6 px-3 py-1.5 bg-background/90 backdrop-blur-md text-foreground text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm border border-border/50"
                      >
                        {product.badge}
                      </motion.div>
                    )}

                    {/* Elegant Wishlist Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredId === product.id ? 1 : 0,
                        scale: hoveredId === product.id ? 1 : 0.8,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-6 right-6 h-10 w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-background hover:text-red-500 border border-border/50 shadow-sm text-foreground/70"
                    >
                      <Heart className="h-4 w-4" />
                    </motion.button>

                    {/* Quick Add To Cart */}
                    <div className="absolute bottom-6 left-6 right-6 overflow-hidden">
                      <AnimatePresence>
                        {hoveredId === product.id && (
                          <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground backdrop-blur-md rounded-xl py-6 shadow-xl transition-colors duration-300 group/btn">
                              <ShoppingBag className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:rotate-12" />
                              <span className="font-medium tracking-wide">Quick Add</span>
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Seller Micro UI */}
                    <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground font-medium">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                      {product.seller}
                    </div>

                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Rating Micro UI */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex -space-x-[2px]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-foreground ml-1">{product.rating}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="mt-auto pt-6 flex items-baseline gap-3">
                      <span className="text-xl font-semibold tracking-tight text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm font-medium text-muted-foreground line-through decoration-muted-foreground/50">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
