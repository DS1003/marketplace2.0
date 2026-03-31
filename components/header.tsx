"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import NextImage from "next/image"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, ChevronRight, Instagram, Facebook, Command as CommandIcon, LogOut, Settings, LayoutDashboard, Heart, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useCart } from "@/providers/cart-provider"
import { logout } from "@/lib/actions/auth"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { NotificationBell } from "./notifications/NotificationBell"

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
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const { data: session } = useSession()
  const { totalItems } = useCart()

  const isScrolledValue = isHomePage ? isScrolled : true
  const shouldBeTransparent = isHomePage && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setIsSearchOpen(false)
    command()
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
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-all relative group py-2 px-1",
                        isActive 
                          ? (!shouldBeTransparent ? "text-primary" : "text-white")
                          : (!shouldBeTransparent ? "text-foreground/70 hover:text-primary" : "text-white/70 hover:text-white")
                      )}
                    >
                      {link.label}
                      <motion.span 
                        layoutId="nav-underline"
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                          !shouldBeTransparent ? "bg-primary" : "bg-white"
                        )} 
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Right Section: Actions & Menu */}
            <div className="flex items-center justify-end gap-2 lg:flex-1">
              {/* Become a Seller CTA */}
              {(!session?.user || session.user.role === "CUSTOMER") && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="hidden xl:block"
                >
                  <Link href="/become-seller">
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "h-9 rounded-full px-4 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:bg-primary/5 group",
                        !shouldBeTransparent ? "text-primary" : "text-white hover:bg-white/10"
                      )}
                    >
                      <Store className={cn("h-3.5 w-3.5 transition-transform group-hover:scale-110", !shouldBeTransparent ? "text-primary" : "text-white")} />
                      Vendre sur Moomel
                    </Button>
                  </Link>
                </motion.div>
              )}

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
                    onClick={() => setIsSearchOpen(true)}
                    className={cn(
                      "rounded-full transition-all hover:scale-110 active:scale-95",
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
                  <NotificationBell />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mr-2"
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
                        key={totalItems}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          "absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] flex items-center justify-center font-bold shadow-xl shadow-primary/20",
                          !shouldBeTransparent ? "bg-primary text-primary-foreground" : "bg-white text-black"
                        )}
                      >
                        {totalItems}
                      </motion.span>
                      <span className="sr-only">Cart</span>
                    </Button>
                  </Link>
                </motion.div>
                {session?.user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ml-2 border border-border/50">
                        <Avatar className="h-full w-full">
                          <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                          <AvatarFallback className="bg-primary/10 text-primary uppercase font-bold text-xs">
                            {session.user.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 mt-2 rounded-[2rem] p-4 shadow-2xl border-none bg-background/95 backdrop-blur-xl" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal px-2 pb-4">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-bold leading-none">{session.user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                          {(session.user.role as string) === "SUPER_ADMIN" && (
                            <span className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary max-w-fit">
                              SUPER ADMINISTRATOR
                            </span>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/30 mx-2" />
                      <div className="py-2">
                        <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 focus:bg-primary/5 group transition-all duration-300">
                          <Link href="/account" className="flex items-center gap-3 w-full">
                            <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">My Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 focus:bg-primary/5 group transition-all duration-300">
                          <Link href="/account/wishlist" className="flex items-center gap-3 w-full">
                            <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Heart className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">Wishlist</span>
                          </Link>
                        </DropdownMenuItem>
                        {((session.user.role as string) === "SUPER_ADMIN" || (session.user.role as string) === "SELLER") && (
                          <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 focus:bg-primary/5 group transition-all duration-300">
                            <Link href={(session.user.role as string) === "SUPER_ADMIN" ? "/admin" : "/seller"} className="flex items-center gap-3 w-full">
                              <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                <LayoutDashboard className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium">{(session.user.role as string) === "SUPER_ADMIN" ? "Admin Panel" : "Seller Lab"}</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild className="rounded-2xl cursor-pointer py-3 px-4 focus:bg-primary/5 group transition-all duration-300">
                          <Link href="/settings" className="flex items-center gap-3 w-full">
                            <div className="h-8 w-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                              <Settings className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">Settings</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator className="bg-border/30 mx-2" />
                      <DropdownMenuItem 
                        onClick={() => logout()}
                        className="rounded-2xl cursor-pointer py-3 px-4 focus:bg-destructive/10 text-destructive group transition-all duration-300 mt-2 hover:translate-x-1"
                      >
                        <div className="flex items-center gap-3 w-full capitalize">
                          <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                            <LogOut className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-bold">Sign Out</span>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55, duration: 0.4 }}
                  >
                    <Link href="/account">
                      <Button className={cn(
                        "rounded-full px-6 ml-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/10",
                        !shouldBeTransparent ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-white hover:bg-white/90 text-black"
                      )}>
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center gap-1 mr-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(
                    "rounded-full h-9 w-9",
                    !shouldBeTransparent ? "text-foreground" : "text-white"
                  )}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
                <Link href="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "relative rounded-full h-9 w-9",
                      !shouldBeTransparent ? "text-foreground" : "text-white"
                    )}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span className={cn(
                      "absolute top-0 right-0 h-4 w-4 rounded-full text-[10px] flex items-center justify-center font-bold",
                      !shouldBeTransparent ? "bg-primary text-primary-foreground" : "bg-white text-black"
                    )}>0</span>
                  </Button>
                </Link>
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
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between py-4 text-xl font-semibold border-b border-border/30 last:border-none transition-all",
                            isActive ? "text-primary translate-x-1" : "text-foreground hover:translate-x-1"
                          )}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="flex items-center gap-3">
                            {isActive && <motion.div layoutId="active-dot" className="h-2 w-2 rounded-full bg-primary" />}
                            {link.label}
                          </span>
                          <ChevronRight className={cn("h-5 w-5 transition-transform", isActive ? "text-primary opacity-100" : "opacity-30")} />
                        </Link>
                      </motion.div>
                    )
                  })}
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
                {(!session?.user || session.user.role === "CUSTOMER") && (
                  <Link href="/become-seller" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-[9px] mb-4 flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                      <Store className="h-4 w-4" /> Devenir Artisan
                    </Button>
                  </Link>
                )}
                <Button 
                  onClick={() => !session?.user ? router.push("/account") : logout()}
                  className="w-full h-14 rounded-2xl bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-[10px] mb-6"
                >
                  {!session?.user ? "Sign In to Account" : "Sign Out"}
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

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Search products, categories, sellers..." />
        <CommandList className="max-h-[70vh]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/marketplace"))}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Browse All Products</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/categories"))}>
              <Menu className="mr-2 h-4 w-4" />
              <span>View Categories</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Popular Categories">
            <CommandItem onSelect={() => runCommand(() => router.push("/categories/clothing"))}>Clothing</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/categories/jewelry"))}>Jewelry</CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/categories/home"))}>Home Decor</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => router.push("/account"))}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>P
              </kbd>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
