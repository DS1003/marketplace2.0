"use client"

import NextImage from "next/image"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { TiltCard } from "@/components/ui/tilt-card"
import { Magnet } from "@/components/ui/magnet"

const founders = [
  {
    name: "Aminata Diallo",
    brand: "Fatou Natural",
    story: "Crée des soins bio à partir de recettes traditionnelles sénégalaises transmises de génération en génération.",
    image: "/images/founder-1.jpg",
    products: 24,
  },
  {
    name: "Mariama Sow",
    brand: "Dakar Organics",
    story: "Fabrique à la main du savon noir africain selon des méthodes ancestrales et des ingrédients locaux purs.",
    image: "/images/founder-2.jpg",
    products: 18,
  },
  {
    name: "Awa Ndiaye",
    brand: "Senegal Oils",
    story: "Extrait des huiles premium de baobab, de moringa et d'autres plantes indigènes.",
    image: "/images/founder-3.jpg",
    products: 15,
  },
]

export function Founders() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-20 bg-background overflow-hidden relative border-t border-border/30">
      {/* Background Element */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-10%] top-1/4 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.5),transparent_60%)] blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <FadeContent direction="up" delay={0}>
              <span className="inline-block text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-6">
                Rencontrer les Artisanes
              </span>
            </FadeContent>

            <BlurText
              text="Les Visionnaires derrière la Beauté"
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground"
              animateBy="words"
              delay={0.1}
            />

            <FadeContent direction="up" delay={0.3}>
              <p className="text-muted-foreground mt-6 text-lg font-light leading-relaxed">
                Découvrez les entrepreneuses passionnées qui préservent l&apos;héritage sénégalais à travers des créations de beauté durables.
              </p>
            </FadeContent>
          </div>

          <FadeContent direction="left" delay={0.4}>
            <Magnet padding={40} magnetStrength={3}>
              <Button variant="ghost" className="group rounded-full px-6 hover:bg-primary/5 hover:text-primary transition-colors text-base font-medium">
                Voir toutes les fondatrices
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-2" />
              </Button>
            </Magnet>
          </FadeContent>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.9,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group cursor-pointer flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Image Portrait */}
              <div className="w-full relative px-4 lg:px-0 mb-8">
                <TiltCard
                  className="relative aspect-[3/4] rounded-t-[100px] rounded-b-[100px] overflow-hidden shadow-sm border border-border/40 w-full max-w-[320px] mx-auto lg:max-w-none"
                  maxTilt={8}
                  scale={1.03}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                >
                  <div className="relative w-full h-full bg-muted/20">
                    <NextImage
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover transition-all duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-110 filter group-hover:contrast-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Artistic overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700" />

                    {/* View Profile Button appearing on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-[0.6s] ease-[0.22,1,0.36,1]">
                        <ArrowUpRight className="text-white w-6 h-6" />
                      </div>
                    </div>

                    {/* Brand badge float */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="absolute bottom-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 px-5 py-2.5 bg-background/90 backdrop-blur-xl rounded-full text-xs font-semibold tracking-widest uppercase text-foreground shadow-xl border border-border/50"
                    >
                      {founder.brand}
                    </motion.div>
                  </div>
                </TiltCard>
              </div>

              {/* Storytelling Content */}
              <div className="max-w-[320px] lg:max-w-none">
                <h3 className="text-2xl font-medium text-foreground tracking-tight group-hover:text-primary transition-colors duration-500">
                  {founder.name}
                </h3>
                <p className="text-muted-foreground mt-4 leading-relaxed font-light">
                  {founder.story}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 text-sm font-medium tracking-wide uppercase text-primary">
                  <span className="w-8 h-[1px] bg-primary/60" />
                  {founder.products} produits exclusifs
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
