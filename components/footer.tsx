"use client"

import NextImage from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

const footerLinks = {
  marché: [
    { label: "Tous les produits", href: "/marketplace" },
    { label: "Catégories", href: "/categories" },
    { label: "Meilleures ventes", href: "/best-sellers" },
    { label: "Nouveautés", href: "/new" },
    { label: "Promotions", href: "/deals" },
  ],
  artisans: [
    { label: "Nos Artisans", href: "/sellers" },
    { label: "Devenir Vendeur", href: "/sell" },
    { label: "Tableau de bord", href: "/seller/dashboard" },
    { label: "FAQ Vendeur", href: "/seller-faq" },
  ],
  entreprise: [
    { label: "À propos", href: "/about" },
    { label: "Notre Mission", href: "/mission" },
    { label: "Carrières", href: "/careers" },
    { label: "Presse", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Centre d'aide", href: "/help" },
    { label: "Livraison", href: "/shipping" },
    { label: "Retours", href: "/returns" },
    { label: "Suivi de commande", href: "/track" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <footer ref={ref} className="bg-foreground text-background">
      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-background/10"
      >
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-background">
                Inscrivez-vous à notre Newsletter
              </h3>
              <p className="text-background/70 mt-3 text-lg">
                Recevez des mises à jour sur les nouveaux produits, des offres exclusives et des conseils beauté.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <div className="relative flex-1 lg:w-96">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-background/50" />
                <Input
                  type="email"
                  placeholder="Entrez votre email"
                  className="pl-12 py-6 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary rounded-xl text-base"
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-xl px-6 py-6">
                  S'abonner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        {/* Desktop Links Grid */}
        <div className="hidden lg:grid grid-cols-6 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-2"
          >
            <Link href="/" className="inline-block">
              <NextImage
                src="/images/logo.png"
                alt="Moomel Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                sizes="120px"
              />
            </Link>
            <p className="text-background/70 mt-6 max-w-xs leading-relaxed text-base">
              Découvrez la beauté du Sénégal à travers notre marché de
              soins naturels et biologiques, fabriqués par des artisans locaux.
            </p>
            <div className="flex items-center gap-3 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-background" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([key, links], sectionIdx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIdx * 0.05 }}
            >
              <h4 className="font-semibold text-background mb-6 text-base uppercase tracking-widest">{key}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/60 hover:text-primary transition-colors text-sm font-light inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-12">
          <div className="text-center space-y-6">
            <Link href="/" className="inline-block">
              <NextImage
                src="/images/logo.png"
                alt="Moomel Logo"
                width={140}
                height={45}
                className="h-12 w-auto brightness-0 invert mx-auto"
              />
            </Link>
            <p className="text-background/70 max-w-sm mx-auto leading-relaxed text-sm font-light">
              Produits de beauté bio haut de gamme fabriqués par des artisans sénégalais locaux.
            </p>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-background" />
                </a>
              ))}
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-background/10">
            {Object.entries(footerLinks).map(([key, links]) => (
              <AccordionItem key={key} value={key} className="border-background/10">
                <AccordionTrigger className="text-background hover:no-underline py-4 uppercase tracking-[0.2em] text-[10px] font-bold">
                  {key}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 pb-4">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-background/60 text-sm font-light block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="border-t border-background/10"
      >
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} Moomel. Tous droits réservés.</p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Conditions d'utilisation
              </Link>
              <Link href="/cookies" className="hover:text-background transition-colors">
                Politique de cookies
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
