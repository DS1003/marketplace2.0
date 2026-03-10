"use client"

import NextImage from "next/image"
import Link from "next/link"
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
    <section ref={ref} className="py-20 md:py-32 bg-secondary/5 relative overflow-hidden">
      {/* Background soft glowing orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.03),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl px-2">
            <FadeContent direction="up" delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4 md:mb-6">
                <Star className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider">Curated Selection</span>
              </div>
            </FadeContent>

            <BlurText
              text="Premium Essentials"
              className="text-[clamp(2rem,10vw,4rem)] md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              animateBy="words"
              delay={0.08}
            />

            <FadeContent direction="up" delay={0.2}>
              <p className="text-muted-foreground mt-4 text-sm md:text-lg font-light max-w-lg">
                Handpicked organic favorites from our luxury African beauty collections.
              </p>
            </FadeContent>
          </div>

          <FadeContent direction="left" delay={0.3} className="hidden md:block">
            <Magnet padding={40} magnetStrength={3}>
              <Button variant="ghost" className="group rounded-full px-6 hover:bg-primary/5 hover:text-primary transition-colors text-base font-medium">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Magnet>
          </FadeContent>
        </div>

        {/* Products Grid / Mobile Carousel */}
        <div className="relative group/carousel">
          <div className="flex overflow-x-auto pb-8 pt-2 gap-6 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:snap-none md:gap-x-8 md:gap-y-12">
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
                className="relative group min-w-[280px] sm:min-w-0 snap-center first:ml-4 last:mr-4 md:first:ml-0 md:last:mr-0"
              >
                <SpotlightCard
                  className="h-full rounded-[2rem]"
                  spotlightColor="rgba(var(--primary-rgb), 0.1)"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden rounded-[2rem] h-full flex flex-col group-hover:md:-translate-y-2">
                    <div className="relative aspect-[4/5] overflow-hidden p-2">
                      <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-muted/20">
                        <NextImage
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105"
                          sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

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
                          opacity: (hoveredId === product.id) || (typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 0,
                          scale: (hoveredId === product.id) || (typeof window !== 'undefined' && window.innerWidth < 768) ? 1 : 0.8,
                        }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute top-5 right-5 md:top-6 md:right-6 h-9 w-9 md:h-10 md:w-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-background hover:text-red-500 border border-border/50 shadow-sm text-foreground/70"
                      >
                        <Heart className="h-4 w-4" />
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
                              <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground backdrop-blur-md rounded-xl py-6 shadow-xl transition-colors duration-300 group/btn">
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                <span className="font-medium tracking-wide">Quick Add</span>
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <CardContent className="p-5 md:p-6 flex flex-col flex-grow">
                      <Link href={`/sellers/${product.seller.toLowerCase().replace(/ /g, '-')}`} className="flex items-center gap-1.5 mb-2 md:mb-3 text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider hover:text-primary transition-colors">
                        <ShieldCheck className="w-3 h-3 text-primary shrink-0" />
                        {product.seller}
                      </Link>

                      <h3 className="font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex -space-x-[1px]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-2.5 w-2.5 md:h-3 md:w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                          ))}
                        </div>
                        <span className="text-[10px] md:text-xs font-semibold text-foreground ml-1">{product.rating}</span>
                        <span className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="mt-auto pt-4 md:pt-6 flex items-center justify-between">
                        <div className="flex items-baseline gap-2 md:gap-3">
                          <span className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs md:text-sm font-medium text-muted-foreground line-through decoration-muted-foreground/50">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <Button size="icon" variant="ghost" className="md:hidden h-9 w-9 rounded-full bg-primary/10 text-primary">
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="flex lg:hidden justify-center mt-6">
            <Link href="/marketplace">
              <Button variant="outline" className="rounded-full px-8 h-12 border-border/50 text-sm font-bold uppercase tracking-widest">
                View All Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
