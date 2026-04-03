"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlurText } from "@/components/ui/blur-text"
import { FadeContent } from "@/components/ui/fade-content"
import { Magnet } from "@/components/ui/magnet"
import { Mail, ArrowRight, Check, Sparkles } from "lucide-react"

export function Newsletter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-secondary/50 py-24 lg:py-32">
      {/* Background Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 bottom-10 h-60 w-60 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeContent direction="up" delay={0}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10"
          >
            <Mail className="h-8 w-8 text-primary" />
          </motion.div>
        </FadeContent>

        <BlurText
          text="Restez Informés"
          className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl"
          animateBy="words"
          delay={0.08}
        />

        <FadeContent direction="up" delay={0.2}>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Recevez un accès exclusif aux nouveaux produits, des offres spéciales et des conseils de beauté du Sénégal directement dans votre boîte mail.
          </p>
        </FadeContent>

        <FadeContent direction="up" delay={0.3}>
          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="relative">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Entrez votre e-mail"
                    aria-label="Adresse e-mail pour la newsletter"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-full border-border/50 bg-background pl-12 pr-4 text-base shadow-sm transition-shadow focus:shadow-md"
                    disabled={isSubscribed}
                  />
                </div>
                <Magnet padding={30} magnetStrength={4}>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubscribed}
                    className="h-14 rounded-full px-8 font-semibold"
                  >
                    {isSubscribed ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Abonné
                      </>
                    ) : (
                      <>
                        S&apos;abonner
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </Magnet>
              </div>
            </div>
          </form>
        </FadeContent>

        <FadeContent direction="up" delay={0.4}>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Rejoignez plus de 10 000 passionnés de beauté</span>
          </div>
        </FadeContent>
      </div>
    </section>
  )
}
