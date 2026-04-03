"use client"

import { useState, useEffect } from "react"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Magnet } from "@/components/ui/magnet"
import { ArrowRight, Play, Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/images/hero-products.jpg",
    badge: "Beauté Naturelle",
    title1: "Pure & Bio",
    title2: "Soins Visage",
    description: "Découvrez des soins bio d'exception, puisés au cœur de l'Afrique. Des ingrédients purs pour un éclat naturel et sans défaut.",
    primaryCTA: "Acheter la Collection",
    secondaryCTA: "Notre Histoire",
  },
  {
    id: 2,
    image: "/images/senegal-story.jpg",
    badge: "Fabriqué au Sénégal",
    title1: "Authentique",
    title2: "Artisanat",
    description: "Soutenir les artisans locaux et célébrer les rituels de beauté ancestraux à travers des formulations modernes et élégantes.",
    primaryCTA: "Rencontrer les Artisans",
    secondaryCTA: "En savoir plus",
  },
  {
    id: 3,
    image: "/images/category-skincare.jpg",
    badge: "Marketplace",
    title1: "Marques",
    title2: "Locales",
    description: "Votre destination privilégiée pour les meilleures marques de beauté sénégalaises, rigoureusement sélectionnées pour leur qualité.",
    primaryCTA: "Explorer les Marques",
    secondaryCTA: "Tout Voir",
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  const jumpToSlide = (index: number) => setCurrent(index)

  const currentSlide = slides[current]

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      {/* Full-width Image Background with cinematic crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <NextImage
            src={currentSlide.image}
            alt={currentSlide.title1}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Elegant dark overlay for text readability while retaining image vibrancy */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="max-w-4xl pt-12 md:pt-20"
          >
            {/* Badge */}
            <div className="mb-4 md:mb-8 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 md:px-5 py-1.5 md:py-2 text-[10px] md:text-sm font-medium tracking-wide text-white backdrop-blur-md shadow-lg"
              >
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-white/90" />
                {currentSlide.badge}
              </motion.div>
            </div>

            {/* Headers */}
            <div className="flex flex-col gap-2 mb-4 md:mb-8">
              <motion.h1
                className="text-[clamp(2rem,11vw,5.5rem)] font-light tracking-tight text-white leading-[1.1] md:leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                {currentSlide.title1} <br className="hidden md:block" />
                <span className="font-semibold text-white/90">{currentSlide.title2}</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              className="mx-auto mb-8 md:mb-12 max-w-xl md:max-w-2xl text-sm md:text-xl font-light leading-relaxed text-white/80 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {currentSlide.description}
            </motion.p>

            {/* Actions */}
            <motion.div
              className="flex flex-col gap-3 md:gap-5 sm:flex-row justify-center items-center px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group relative h-12 md:h-14 w-full sm:w-auto overflow-hidden rounded-full bg-white px-8 text-sm md:text-lg font-medium text-black shadow-2xl transition-all hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {currentSlide.primaryCTA}
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="group h-12 md:h-14 w-full sm:w-auto rounded-full border border-white/30 bg-white/5 text-white px-8 text-sm md:text-lg font-medium transition-all hover:bg-white hover:text-black backdrop-blur-md"
                >
                  <span className="flex items-center justify-center">
                    <Play className="mr-2 h-4 w-4 md:h-5 md:w-5 transition-colors duration-500" />
                    {currentSlide.secondaryCTA}
                  </span>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Navigation Controls */}
      <div className="absolute bottom-8 lg:bottom-12 inset-x-0 z-30 mx-auto w-full max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Pagination Lines */}
        <div className="flex items-center gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpToSlide(idx)}
              className="group py-4 flex items-center justify-start cursor-pointer"
              aria-label={`Go to slide ${idx + 1}`}
            >
              <motion.div
                animate={{
                  width: current === idx ? 64 : 16,
                  backgroundColor: current === idx ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)"
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[3px] rounded-full group-hover:bg-white/70 transition-colors"
                layout
              />
            </button>
          ))}
        </div>

        {/* Counter & Arrows Grid */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center text-white/50 font-mono text-sm tracking-widest">
            <span className="text-white">0{current + 1}</span>
            <span className="mx-2">/</span>
            <span>0{slides.length}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white transition-all duration-500 hover:bg-white hover:text-black hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={nextSlide}
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white transition-all duration-500 hover:bg-white hover:text-black hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

