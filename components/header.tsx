"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/categories", label: "Categories" },
  { href: "/founders", label: "Founders" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-foreground/5 border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/images/logo.png"
                alt="Moomel"
                width={120}
                height={40}
                className="h-8 lg:h-10"
                style={{ width: 'auto', height: 'auto', maxHeight: '2.5rem' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary rounded-full"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary rounded-full"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-secondary relative rounded-full"
              >
                <ShoppingBag className="h-5 w-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                >
                  0
                </motion.span>
                <span className="sr-only">Cart</span>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 ml-2">
                Sign In
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden z-10 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 bg-background/98 backdrop-blur-xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center justify-center h-full gap-8"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-3xl font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4 mt-8"
                >
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="relative rounded-full h-12 w-12">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
                    Sign In
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
