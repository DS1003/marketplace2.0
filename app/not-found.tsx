"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-[85dvh] flex flex-col items-center justify-center px-4 bg-background relative overflow-hidden selection:bg-[#d4a574]/30">
      
      {/* Soft glowing ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] bg-[#d4a574]/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,165,116,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-3xl text-center space-y-10 z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative flex flex-col items-center"
        >
          <div className="flex items-center justify-center text-[clamp(6rem,18vw,12rem)] font-light tracking-tighter leading-none select-none">
            <motion.span 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.4 }}
              className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              4
            </motion.span>
            
            <motion.div
              initial={{ y: 30, opacity: 0, rotate: -15 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.9, type: "spring", bounce: 0.5 }}
              className="relative mx-3 sm:mx-6 lg:mx-8"
            >
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image 
                  src="/moome%20logo%201.svg" 
                  alt="0" 
                  width={180} 
                  height={180} 
                  className="w-[clamp(5.5rem,15vw,10rem)] h-auto object-contain drop-shadow-2xl" 
                  priority
                />
              </motion.div>
              {/* Subtle logo backlight */}
              <div className="absolute inset-0 bg-[#d4a574]/20 blur-3xl -z-10 rounded-full" />
            </motion.div>

            <motion.span 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
              className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
            >
              4
            </motion.span>
          </div>
          
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "circOut" }}
            className="h-[2px] w-24 sm:w-40 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent mt-10 rounded-full opacity-60" 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground/90">
            Oups ! Cette page s'est évaporée.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
            Comme une goutte d'huile précieuse dans le sable, la page que vous recherchez semble introuvable. Elle a peut-être été déplacée ou n'a jamais existé.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-14 rounded-full bg-foreground text-background hover:bg-[#d4a574] hover:text-white shadow-lg hover:shadow-xl hover:shadow-[#d4a574]/20 transition-all duration-300 hover:-translate-y-1 px-8 text-base font-medium group"
          >
            <Link href="/">
              <Home className="mr-2.5 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Retour à l'accueil
            </Link>
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-14 rounded-full border-foreground/10 hover:border-foreground/20 hover:bg-foreground/5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 px-8 text-base font-medium group"
          >
            <ArrowLeft className="mr-2.5 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Page précédente
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
