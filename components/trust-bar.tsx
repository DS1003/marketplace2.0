"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Leaf, MapPin, Shield, Truck } from "lucide-react"

const trustItems = [
  {
    icon: Leaf,
    title: "100% Naturel",
    description: "Ingrédients bio et purs",
  },
  {
    icon: MapPin,
    title: "Fait au Sénégal",
    description: "Soutien aux artisans locaux",
  },
  {
    icon: Shield,
    title: "Paiements Sécurisés",
    description: "Transactions protégées",
  },
  {
    icon: Truck,
    title: "Livraison Rapide",
    description: "Expédition nationale & inter",
  },
]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="relative border-y border-border/50 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group flex items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
              >
                <item.icon className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
