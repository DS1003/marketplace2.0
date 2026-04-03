"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Store, ShoppingBag } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useRef } from "react"

export function CTASection() {
  const { ref, isInView } = useScrollAnimation()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/85"
      />
      
      {/* Animated decorative elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-background/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity : 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight tracking-tight text-balance"
          >
            Prêt à Découvrir la Beauté Naturelle ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary-foreground/80 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Rejoignez des milliers de clients qui ont adopté les produits de beauté sénégalais authentiques, 
            ou commencez à vendre vos créations artisanales dès aujourd&apos;hui.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 group rounded-xl px-8 py-7 text-lg shadow-2xl shadow-foreground/10"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Acheter Maintenant
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-xl px-8 py-7 text-lg backdrop-blur-sm"
              >
                <Store className="mr-2 h-5 w-5" />
                Devenir Vendeur
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16 pt-16 border-t border-primary-foreground/20"
          >
            {[
              { value: "10K+", label: "Clients Heureux" },
              { value: "500+", label: "Produits" },
              { value: "150+", label: "Vendeurs" },
              { value: "4.9", label: "Note Moyenne" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/70 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
