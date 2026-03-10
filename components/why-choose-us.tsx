"use client"

import { Leaf, Heart, Shield, Truck } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { SpotlightCard } from "@/components/ui/spotlight-card"

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description:
      "All products are made with pure, organic ingredients sourced directly from nature.",
  },
  {
    icon: Heart,
    title: "Support Local",
    description:
      "Every purchase directly supports Senegalese artisans and local communities.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "Rigorous quality control ensures you receive only the finest products.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Reliable shipping with careful packaging to preserve product quality.",
  },
]

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-32 bg-secondary/30 overflow-hidden relative">
      {/* Background Element */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl"
      />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-20">
          <FadeContent direction="up" delay={0}>
            <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4">
              Why Moomel
            </span>
          </FadeContent>
          
          <BlurText
            text="Why Choose Us"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            animateBy="words"
            delay={0.08}
          />
          
          <FadeContent direction="up" delay={0.2}>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
              We&apos;re committed to bringing you the best of Senegalese beauty
            </p>
          </FadeContent>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <SpotlightCard
                className="h-full rounded-3xl"
                spotlightColor="rgba(212, 165, 116, 0.15)"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-card p-8 rounded-3xl border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl overflow-hidden h-full"
                >
                  {/* Animated background gradient */}
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500"
                  >
                    <feature.icon className="h-8 w-8 text-primary" />
                  </motion.div>

                  <h3 className="relative text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="relative text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[5rem] rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
