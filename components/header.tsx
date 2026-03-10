"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import NextImage from "next/image"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, ChevronRight, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/categories", label: "Categories" },
  { href: "/sellers", label: "Sellers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const shouldBeTransparent = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          !shouldBeTransparent
            ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-foreground/5 border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center justify-start lg:flex-1">
              <Link href="/" className="flex items-center gap-2 z-10">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NextImage
                    src="/images/logo.png"
                    alt="Moomel"
                    width={120}
                    height={40}
                    className="h-8 lg:h-10 transition-all duration-500"
                    style={{ width: 'auto', height: 'auto', maxHeight: '2.5rem' }}
                  />
                </motion.div>
              </Link>
            </div>

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
                    className={cn(
                      "text-sm font-medium transition-colors relative group py-2",
                      !shouldBeTransparent ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white"
                    )}
                  >
                    {link.label}
                    <span className={cn(
                      "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full",
                      !shouldBeTransparent ? "bg-primary" : "bg-white"
                    )} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Section: Actions & Menu */}
            <div className="flex items-center justify-end gap-2 lg:flex-1">
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
                    className={cn(
                      "rounded-full transition-colors",
                      !shouldBeTransparent ? "hover:bg-secondary text-foreground" : "text-white hover:bg-white/20"
                    )}
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
                  <Link href="/account">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "rounded-full transition-colors",
                        !shouldBeTransparent ? "hover:bg-secondary text-foreground" : "text-white hover:bg-white/20"
                      )}
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">Account</span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "relative rounded-full transition-colors",
                        !shouldBeTransparent ? "hover:bg-secondary text-foreground" : "text-white hover:bg-white/20"
                      )}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
                        className={cn(
                          "absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center font-medium",
                          !shouldBeTransparent ? "bg-primary text-primary-foreground" : "bg-white text-black"
                        )}
                      >
                        0
                      </motion.span>
                      <span className="sr-only">Cart</span>
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                >
                  <Link href="/account">
                    <Button className={cn(
                      "rounded-full px-6 ml-2 transition-all",
                      !shouldBeTransparent ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-white hover:bg-white/90 text-black shadow-xl"
                    )}>
                      Sign In
                    </Button>
                  </Link>
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
                  className={cn("lg:hidden z-[60] rounded-full", !shouldBeTransparent || isMenuOpen ? "text-foreground" : "text-white hover:bg-white/20")}
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
          </div>

        </nav>
      </motion.header>

      {/* Mobile Navigation - Moved outside transformed header */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-2xl flex flex-col"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border/50">
                <NextImage
                  src="/images/logo.png"
                  alt="Moomel"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-8">
                <div className="px-6 space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center justify-between py-4 text-xl font-medium border-b border-border/30 last:border-none",
                          pathname === link.href ? "text-primary" : "text-foreground"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                        <ChevronRight className="h-5 w-5 opacity-30" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 px-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/account" className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-3xl gap-3" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-6 w-6 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-tight">Account</span>
                    </Link>
                    <Link href="/cart" className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-3xl gap-3" onClick={() => setIsMenuOpen(false)}>
                      <div className="relative">
                        <ShoppingBag className="h-6 w-6 text-primary" />
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">0</span>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-tight">Cart</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-border/50 bg-secondary/10">
                <Button className="w-full h-14 rounded-2xl bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-xs mb-6">
                  Sign In to Account
                </Button>
                <div className="flex justify-center gap-6">
                  <div className="h-10 w-10 rounded-full bg-white border border-border/50 flex items-center justify-center text-muted-foreground"><Instagram className="h-5 w-5" /></div>
                  <div className="h-10 w-10 rounded-full bg-white border border-border/50 flex items-center justify-center text-muted-foreground"><Facebook className="h-5 w-5" /></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
