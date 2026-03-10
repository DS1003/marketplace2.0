"use client"

"use client"
import NextImage from "next/image"
import { Star, Quote } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { TiltCard } from "@/components/ui/tilt-card"

const testimonials = [
  {
    name: "Sophie Laurent",
    location: "Paris, France",
    avatar: "/images/founder-1.jpg",
    rating: 5,
    text: "The shea butter from Moomel is absolutely incredible. My skin has never felt so soft and nourished. I love supporting local artisans!",
    product: "Pure Shea Butter",
  },
  {
    name: "Aicha Mbaye",
    location: "Dakar, Senegal",
    avatar: "/images/founder-2.jpg",
    rating: 5,
    text: "Finally, a platform that celebrates our beautiful Senegalese beauty traditions. The quality is exceptional and delivery was fast.",
    product: "Baobab Hair Oil",
  },
  {
    name: "Emma Wilson",
    location: "London, UK",
    avatar: "/images/founder-3.jpg",
    rating: 5,
    text: "I discovered Moomel through a friend and now I can't stop ordering! The African black soap has transformed my skincare routine.",
    product: "African Black Soap",
  },
]

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section ref={ref} className="py-32 bg-secondary/5 overflow-hidden relative border-t border-border/30">
      {/* Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.02, 0.05, 0.02],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.6),transparent_70%)] blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <FadeContent direction="up" delay={0}>
            <span className="inline-block text-xs font-semibold text-primary tracking-[0.2em] uppercase mb-4">
              Community Voices
            </span>
          </FadeContent>

          <BlurText
            text="Loved by Our Customers"
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance text-foreground mb-6"
            animateBy="words"
            delay={0.1}
          />

          <FadeContent direction="up" delay={0.3}>
            <p className="text-muted-foreground text-lg font-light">
              Read authentic experiences from our growing community of beauty enthusiasts around the world.
            </p>
          </FadeContent>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full"
            >
              <TiltCard
                className="h-full w-full"
                maxTilt={4}
                scale={1.01}
                glareEnable={true}
                glareMaxOpacity={0.05}
              >
                <div className="group bg-card/40 backdrop-blur-md px-6 py-8 md:px-8 md:py-10 rounded-[2.5rem] border border-border/50 hover:border-primary/20 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 h-full relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div>
                    {/* Header: Quote & Rating */}
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      >
                        <Quote className="h-10 w-10 text-primary/20 group-hover:text-primary/40 transition-colors duration-500" />
                      </motion.div>

                      <div className="flex gap-1 bg-background/50 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                            transition={{ delay: 0.6 + index * 0.1 + i * 0.05 }}
                          >
                            <Star className={`h-3 w-3 ${i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`} />
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-foreground leading-relaxed text-lg font-light relative z-10 mb-8">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>

                  {/* Footer Context */}
                  <div className="relative z-10 mt-auto">
                    {/* Product Tag */}
                    <p className="text-xs text-primary font-medium mb-6 flex items-center gap-2 uppercase tracking-wider">
                      <span className="w-4 h-[1px] bg-primary/60" />
                      {testimonial.product}
                    </p>

                    {/* Author Profile */}
                    <div className="flex items-center gap-4 pt-6 border-t border-border/50 group-hover:border-border/80 transition-colors duration-500">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="relative h-20 w-20 rounded-2xl overflow-hidden ring-4 ring-primary/10 ring-offset-4 group-hover:scale-105 transition-transform duration-700">
                          <NextImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                      </motion.div>
                      <div>
                        <p className="font-medium text-foreground text-base tracking-tight">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-light">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
