"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { Magnet } from "@/components/ui/magnet"
import Link from "next/link"
import { ArrowRight, Store, TrendingUp, Users, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Store,
    title: "Votre Propre Boutique",
    description: "Créez et personnalisez votre vitrine digitale",
  },
  {
    icon: Users,
    title: "Portée Mondiale",
    description: "Connectez-vous avec des clients du monde entier",
  },
  {
    icon: TrendingUp,
    title: "Développez Votre Marque",
    description: "Analyses et outils pour faire croître votre entreprise",
  },
]

export function BecomeSeller() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-foreground py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,165,116,0.1),transparent_50%)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <div className="text-center lg:text-left">
            <FadeContent direction="up" delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <Sparkles className="h-4 w-4" />
                Rejoignez Notre Communauté
              </div>
            </FadeContent>

            <BlurText
              text="Devenir Vendeur"
              className="mb-4 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl"
              animateBy="words"
              delay={0.08}
            />

            <FadeContent direction="up" delay={0.2}>
              <p className="mb-8 text-lg text-background/70 lg:text-xl">
                Partagez vos produits de beauté naturels avec le monde entier. Rejoignez des centaines d&apos;entrepreneurs sénégalais qui développent déjà leur activité sur Moomel.
              </p>
            </FadeContent>

            <FadeContent direction="up" delay={0.3}>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Magnet padding={50} magnetStrength={3}>
                  <Link href="/become-seller">
                    <Button
                      size="lg"
                      className="group h-14 rounded-full bg-primary px-8 text-lg font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      Rejoignez le Lab des Artisans
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </Magnet>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-full border-background/30 bg-transparent px-8 text-lg text-background hover:bg-background/10"
                  >
                    Explorer Notre Éthique
                  </Button>
                </Link>
              </div>
            </FadeContent>
          </div>

          {/* Benefits Cards */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ x: 10 }}
                className="group flex items-center gap-6 rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm transition-colors hover:bg-background/10"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/20 text-primary"
                >
                  <benefit.icon className="h-7 w-7" />
                </motion.div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-background">{benefit.title}</h3>
                  <p className="text-background/60">{benefit.description}</p>
                </div>
                <ArrowRight className="ml-auto h-5 w-5 text-background/40 transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
