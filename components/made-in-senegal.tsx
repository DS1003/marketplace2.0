"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { Magnet } from "@/components/ui/magnet"

export function MadeInSenegal() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const cardY = useTransform(scrollYProgress, [0, 1], [100, -50])

  return (
    <section ref={ref} className="py-32 bg-background overflow-hidden relative">
      {/* Background Element */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -left-40 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl"
      />
      
      <div ref={containerRef} className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/senegal-story.jpg"
                alt="Senegalese artisan crafting beauty products"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Quote Card */}
            <motion.div
              style={{ y: cardY }}
              initial={{ opacity: 0, x: 40, y: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -right-8 lg:bottom-12 lg:-right-12 max-w-sm bg-card p-8 rounded-3xl shadow-2xl border border-border/50 backdrop-blur-sm"
            >
              <Quote className="h-10 w-10 text-primary/30 mb-4" />
              <p className="text-foreground italic leading-relaxed text-lg">
                &quot;Every product tells a story of tradition, love, and the rich heritage of Senegal.&quot;
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="h-12 w-12 rounded-full bg-secondary overflow-hidden ring-2 ring-primary/20"
                >
                  <Image
                    src="/images/founder-1.jpg"
                    alt="Founder"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </motion.div>
                <div>
                  <p className="font-semibold text-foreground">Aminata Diallo</p>
                  <p className="text-sm text-muted-foreground">Founder, Fatou Natural</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl"
            />
          </motion.div>

          {/* Content Side */}
          <div className="space-y-8">
            <FadeContent direction="up" delay={0}>
              <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase">
                Our Story
              </span>
            </FadeContent>
            
            <BlurText
              text="Made with Love in Senegal"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              animateBy="words"
              delay={0.08}
            />
            
            <FadeContent direction="up" delay={0.2}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Moomel connects you directly with talented Senegalese artisans who craft 
                premium organic beauty products using ancestral techniques passed down 
                through generations.
              </p>
            </FadeContent>
            
            <FadeContent direction="up" delay={0.3}>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every purchase supports local communities, empowers women entrepreneurs, 
                and celebrates the rich beauty traditions of West Africa.
              </p>
            </FadeContent>

            {/* Stats Row */}
            <FadeContent direction="up" delay={0.4}>
              <div className="grid grid-cols-3 gap-8 py-8 border-y border-border">
                {[
                  { value: "150+", label: "Local Artisans" },
                  { value: "100%", label: "Natural Ingredients" },
                  { value: "50+", label: "Communities" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </FadeContent>

            <FadeContent direction="up" delay={0.5}>
              <Magnet padding={50} magnetStrength={2}>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group rounded-full px-8"
                >
                  Meet Our Artisans
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Magnet>
            </FadeContent>
          </div>
        </div>
      </div>
    </section>
  )
}
