"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { login } from "@/lib/actions/auth"
import { handleGoogleSignInPopup } from "@/components/auth/google-one-tap-prompt"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Sms, Lock, Eye, EyeSlash, ArrowRight2, ShieldTick } from "reicon-react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est requis.",
  }),
})

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

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await login(values)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Connexion réussie ! Ravie de vous revoir.")
        window.location.href = "/account"
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-7">
      {/* Header */}
      <div className="space-y-2.5 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F6EBE1] border border-[#E9E1D6]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#2D241E]">Espace Membre</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2D241E]">
          Bon retour parmi nous
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
          Accédez à votre rituel personnalisé, vos commandes et votre suivi d'impact artisan.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/70 ml-1">
                  Adresse Email
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#2D241E] transition-colors">
                      <Sms className="h-4.5 w-4.5" />
                    </div>
                    <Input 
                      placeholder="votre.email@domaine.com" 
                      {...field} 
                      className="bg-[#FBF9F5] border border-stone-200/80 rounded-2xl h-13 pl-12 focus:bg-white focus:ring-2 focus:ring-[#2D241E]/10 focus:border-[#2D241E] transition-all text-sm font-medium text-[#2D241E] placeholder:text-stone-400 shadow-inner"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-destructive ml-1" />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/70">
                    Mot de passe
                  </FormLabel>
                  <Button variant="link" size="sm" type="button" className="h-auto p-0 text-[10px] font-bold text-primary uppercase tracking-widest hover:no-underline hover:opacity-80 transition-opacity">
                    Mot de passe oublié ?
                  </Button>
                </div>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-[#2D241E] transition-colors">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••••••" 
                      {...field} 
                      className="bg-[#FBF9F5] border border-stone-200/80 rounded-2xl h-13 pl-12 pr-12 focus:bg-white focus:ring-2 focus:ring-[#2D241E]/10 focus:border-[#2D241E] transition-all text-sm font-medium text-[#2D241E] placeholder:text-stone-400 shadow-inner"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-stone-400 hover:text-[#2D241E] transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeSlash className="h-4.5 w-4.5" />
                      ) : (
                        <Eye className="h-4.5 w-4.5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-destructive ml-1" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-13 rounded-2xl bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#2D241E]/15 flex items-center justify-center gap-2.5 group active:scale-[0.99] cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <>
                <span>Se connecter</span>
                <ArrowRight2 className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-stone-200/70" />
        </div>
        <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-bold">
          <span className="bg-white px-4 text-stone-400">Ou continuer avec</span>
        </div>
      </div>

      {/* Official Google Login Button */}
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => handleGoogleSignInPopup()}
        className="w-full h-13 rounded-2xl border border-stone-200/90 bg-white text-[#2D241E] hover:bg-stone-50/80 hover:border-stone-300 font-bold uppercase tracking-wider text-xs transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer group"
      >
        <GoogleLogoSVG className="h-5 w-5 transition-transform group-hover:scale-110 duration-300" />
        <span>Continuer avec Google</span>
      </Button>

      {/* Trust Notice */}
      <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-stone-400 font-medium">
        <ShieldTick className="h-3.5 w-3.5 text-emerald-600" />
        <span>Connexion sécurisée SSL 256-bit</span>
      </div>
    </div>
  )
}
