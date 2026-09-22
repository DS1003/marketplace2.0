"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"

function GoogleLogoSVG({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  )
}

export async function handleGoogleSignInPopup() {
  const width = 500
  const height = 650
  const left = typeof window !== "undefined" ? Math.max(0, window.screen.width / 2 - width / 2) : 100
  const top = typeof window !== "undefined" ? Math.max(0, window.screen.height / 2 - height / 2) : 100

  try {
    const res = await signIn("google", {
      callbackUrl: "/account",
      redirect: false,
    })

    if (res?.url) {
      const popup = window.open(
        res.url,
        "GoogleSignInPopup",
        `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=yes`
      )

      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        window.location.href = res.url
        return
      }

      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup)
          window.location.href = "/account"
        }
      }, 1000)
    } else {
      await signIn("google", { callbackUrl: "/account" })
    }
  } catch (error) {
    console.error("Google sign in error:", error)
    await signIn("google", { callbackUrl: "/account" })
  }
}

export function GoogleOneTapPrompt() {
  const { data: session, status } = useSession()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      const isDismissed = sessionStorage.getItem("moomel_google_prompt_dismissed")
      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 1200)
        return () => clearTimeout(timer)
      }
    } else {
      setIsVisible(false)
    }
  }, [session, status])

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem("moomel_google_prompt_dismissed", "true")
  }

  if (!isVisible || session?.user) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.9 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-20 right-4 sm:right-6 z-[100] max-w-[340px] w-full"
      >
        <div className="relative bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-[2rem] p-5 shadow-2xl shadow-[#2D241E]/15 overflow-hidden">
          {/* Top ambient gold line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-primary to-amber-400" />

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 h-7 w-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-[#2D241E] transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-stone-100/90 border border-stone-200/60 flex items-center justify-center shrink-0 shadow-sm">
                <GoogleLogoSVG className="h-5 w-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-primary">
                  <Sparkles className="h-3 w-3" /> Connexion Rapide
                </div>
                <h4 className="text-sm font-extrabold text-[#2D241E]">Continuer avec Google ?</h4>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 leading-relaxed font-light">
              Accédez directement à votre espace membre Moomel en un seul clic sans ressaisir vos identifiants.
            </p>

            <Button
              onClick={() => {
                handleGoogleSignInPopup()
                handleDismiss()
              }}
              className="w-full h-11 rounded-2xl bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-[#2D241E]/15 flex items-center justify-center gap-2.5 cursor-pointer group transition-all"
            >
              <GoogleLogoSVG className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span>Se connecter avec Google</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
