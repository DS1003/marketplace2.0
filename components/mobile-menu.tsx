"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import NextImage from "next/image"
import { X, ChevronRight, User, ShoppingBag, LayoutDashboard, Store, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  pathname: string
  session: any
  totalItems: number
  navLinks: { href: string; label: string }[]
}

export function MobileMenu({ isOpen, setIsOpen, pathname, session, totalItems, navLinks }: MobileMenuProps) {
  const router = useRouter()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
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
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6">Actions Rapides</p>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/account" className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-3xl gap-3" onClick={() => setIsOpen(false)}>
                    <User className="h-6 w-6 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-tight">Compte</span>
                  </Link>
                  <Link href="/cart" className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-3xl gap-3" onClick={() => setIsOpen(false)}>
                    <div className="relative">
                      <ShoppingBag className="h-6 w-6 text-primary" />
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">{totalItems}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-tight">Panier</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-border/50 bg-secondary/10">
              {((session?.user?.role as string) === "SUPER_ADMIN" || (session?.user?.role as string) === "SELLER" || session?.user?.hasShop) && (
                <Link 
                  href={(session?.user?.role as string) === "SUPER_ADMIN" ? "/admin" : "/seller"} 
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full h-14 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                    <LayoutDashboard className="h-4 w-4" /> 
                    {(session?.user?.role as string) === "SUPER_ADMIN" ? "Panel Admin" : "Lab des Artisans"}
                  </Button>
                </Link>
              )}
              {(!session?.user || (session.user.role === "CUSTOMER" && !session.user.hasShop)) && (
                <Link href="/become-seller" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-14 rounded-2xl bg-[#2D241E]/10 text-[#2D241E] hover:bg-[#2D241E]/20 font-bold uppercase tracking-widest text-[9px] mb-4 flex items-center justify-center gap-2">
                    <Store className="h-4 w-4" /> Devenir Artisan
                  </Button>
                </Link>
              )}
              <Button 
                onClick={async () => {
                  setIsOpen(false)
                  if (!session?.user) {
                    router.push("/account")
                  } else {
                    await signOut({ callbackUrl: "/", redirect: true })
                  }
                }}
                className="w-full h-14 rounded-2xl bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-[10px] mb-6"
              >
                {!session?.user ? "Se Connecter" : "Déconnexion"}
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
  )
}
