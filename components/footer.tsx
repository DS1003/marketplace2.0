"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const footerLinks = {
  marketplace: [
    { label: "All Products", href: "/marketplace" },
    { label: "Categories", href: "/categories" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "New Arrivals", href: "/new" },
    { label: "Deals", href: "/deals" },
  ],
  sellers: [
    { label: "Become a Seller", href: "/sell" },
    { label: "Seller Dashboard", href: "/dashboard" },
    { label: "Success Stories", href: "/stories" },
    { label: "Seller FAQ", href: "/seller-faq" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/mission" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/track" },
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
                Subscribe to Our Newsletter
              </h3>
              <p className="text-background/70 mt-3 text-lg">
                Get updates on new products, exclusive deals, and beauty tips.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <div className="relative flex-1 lg:w-96">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-background/50" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-12 py-6 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary rounded-xl text-base"
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 rounded-xl px-6 py-6">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-2 md:col-span-3 lg:col-span-2"
          >
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Moomel"
                width={140}
                height={45}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-background/70 mt-6 max-w-xs leading-relaxed text-base">
              Discover the beauty of Senegal through our curated marketplace of
              natural, organic beauty products crafted by local artisans.
            </p>
            <div className="flex items-center gap-3 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="h-12 w-12 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-background" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Marketplace Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-background mb-6 text-lg">Marketplace</h4>
            <ul className="space-y-4">
              {footerLinks.marketplace.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.3 + index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Sellers Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h4 className="font-semibold text-background mb-6 text-lg">For Sellers</h4>
            <ul className="space-y-4">
              {footerLinks.sellers.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.35 + index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-background mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.4 + index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <h4 className="font-semibold text-background mb-6 text-lg">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.45 + index * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-primary transition-colors text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
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
            <p>&copy; {new Date().getFullYear()} Moomel. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-background transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
