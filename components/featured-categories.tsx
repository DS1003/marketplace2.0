"use client"

"use client"
import NextImage from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { TiltCard } from "@/components/ui/tilt-card"

const categories = [
  {
    name: "Soins Visage",
    description: "Crèmes et sérums naturels",
    image: "/images/category-skincare.jpg",
    href: "/categories/skincare",
    count: 128,
  },
  {
    name: "Soins Cheveux",
    description: "Huiles et traitements",
    image: "/images/category-haircare.jpg",
    href: "/categories/haircare",
    count: 95,
  },
  {
    name: "Savons Naturels",
    description: "Artisanaux et biologiques",
    image: "/images/category-soaps.jpg",
    href: "/categories/soaps",
    count: 76,
  },
  {
    name: "Huiles",
    description: "Pures et essentielles",
    image: "/images/category-oils.jpg",
    href: "/categories/oils",
    count: 64,
  },
  {
    name: "Accessoires",
    description: "Outils de beauté",
    image: "/images/category-accessories.jpg",
    href: "/categories/accessories",
    count: 42,
  },
]

export function FeaturedCategories() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.8),transparent_70%)] blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -left-20 bottom-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.8),transparent_70%)] blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <FadeContent direction="up" delay={0}>
            <span className="inline-block text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">
              Collections Sélectionnées
            </span>
          </FadeContent>

          <BlurText
            text="Explorez les éléments de la beauté naturelle"
            className="text-[clamp(1.75rem,8vw,3.5rem)] md:text-5xl lg:text-6xl font-light tracking-tight text-balance text-foreground mb-6"
            animateBy="words"
            delay={0.1}
          />

          <FadeContent direction="up" delay={0.3}>
            <p className="text-muted-foreground text-sm md:text-lg font-light px-4 md:px-0">
              Sublimez votre rituel avec des ingrédients purs, biologiques et un savoir-faire sénégalais authentique.
            </p>
          </FadeContent>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <Link href={category.href} className="block w-full h-full">
                <TiltCard
                  className="group relative overflow-hidden rounded-[2rem] w-full h-full border border-border/40 shadow-sm"
                  maxTilt={5}
                  scale={1.01}
                  glareEnable={true}
                  glareMaxOpacity={0.08}
                >
                  <div
                    className={`relative w-full h-full overflow-hidden ${index === 0 ? "min-h-[400px] md:min-h-[600px]" : "min-h-[300px]"
                      }`}
                  >
                    <NextImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-all duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110 filter group-hover:contrast-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {/* Sophisticated Gradient Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700" />

                    {/* Soft Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4))]" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col justify-end text-white">
                      <div className="flex items-end justify-between relative z-20">
                        <motion.div
                          initial={{ y: 0 }}
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="max-w-[80%]"
                        >
                          <motion.h3
                            className={`font-medium tracking-tight md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out text-[clamp(1.5rem,7vw,3rem)]`}
                          >
                            {category.name}
                          </motion.h3>

                          <div className="overflow-hidden">
                            <motion.p className="text-white/80 mt-2 text-xs md:text-base font-light md:translate-y-full md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                              {category.description}
                            </motion.p>
                          </div>

                          <motion.div className="flex items-center gap-3 mt-4 md:opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="w-6 md:w-8 h-[1px] bg-white/60" />
                            <p className="text-white/90 text-[10px] md:text-xs font-medium tracking-wider uppercase">
                              {category.count} Produits
                            </p>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 45 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:border-white transition-all duration-500 shadow-xl shrink-0"
                        >
                          <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6 text-white group-hover:text-black transition-colors duration-500" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
