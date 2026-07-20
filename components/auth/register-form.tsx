"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { register } from "@/lib/actions/auth"
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
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide.",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères.",
  }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
})

const calculateStrength = (pass: string) => {
  let strength = 0;
  if (!pass) return 0;
  if (pass.length >= 8) strength += 25;
  if (pass.match(/[A-Z]/)) strength += 25;
  if (pass.match(/[0-9]/)) strength += 25;
  if (pass.match(/[^A-Za-z0-9]/)) strength += 25;
  return strength;
};

const getStrengthColor = (val: number) => {
  if (val === 0) return "bg-stone-200";
  if (val <= 25) return "bg-red-500";
  if (val <= 50) return "bg-orange-500";
  if (val <= 75) return "bg-yellow-500";
  return "bg-green-500";
};

const getStrengthText = (val: number) => {
  if (val === 0) return "";
  if (val <= 25) return "Très faible";
  if (val <= 50) return "Faible";
  if (val <= 75) return "Moyen";
  return "Fort";
};

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      })
      if (result?.error) {
        toast.error("Une erreur est survenue lors de la création du compte.")
      } else {
        toast.success("Compte créé avec succès !")
        onSuccess()
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-[#2D241E]">Rejoindre Moomel</h1>
        <p className="text-muted-foreground text-sm font-light leading-relaxed">
          Commencez votre rituel de beauté naturelle dès aujourd'hui et soutenez les artisans sénégalais.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/60 ml-1">Votre Nom Complet</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <Input 
                      placeholder="Anta Diop" 
                      {...field} 
                      className="bg-white border-stone-200/60 rounded-2xl h-12 pl-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/60 ml-1">Email Ritual</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                    </div>
                    <Input 
                      placeholder="votre@email.com" 
                      {...field} 
                      className="bg-white border-stone-200/60 rounded-2xl h-12 pl-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/60 ml-1">Mot de passe Ritual</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-white border-stone-200/60 rounded-2xl h-12 pl-12 pr-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                {field.value.length > 0 && (
                  <div className="mt-2 space-y-1.5 px-1">
                    <div className="flex gap-1 h-1.5">
                      <div className={`h-full flex-1 rounded-full transition-colors ${calculateStrength(field.value) > 0 ? getStrengthColor(calculateStrength(field.value)) : 'bg-stone-200'}`} />
                      <div className={`h-full flex-1 rounded-full transition-colors ${calculateStrength(field.value) > 25 ? getStrengthColor(calculateStrength(field.value)) : 'bg-stone-200'}`} />
                      <div className={`h-full flex-1 rounded-full transition-colors ${calculateStrength(field.value) > 50 ? getStrengthColor(calculateStrength(field.value)) : 'bg-stone-200'}`} />
                      <div className={`h-full flex-1 rounded-full transition-colors ${calculateStrength(field.value) > 75 ? getStrengthColor(calculateStrength(field.value)) : 'bg-stone-200'}`} />
                    </div>
                    <p className={`text-[10px] font-semibold text-right ${calculateStrength(field.value) > 75 ? 'text-green-600' : calculateStrength(field.value) > 50 ? 'text-yellow-600' : calculateStrength(field.value) > 25 ? 'text-orange-600' : 'text-red-600'}`}>
                      {getStrengthText(calculateStrength(field.value))}
                    </p>
                  </div>
                )}
                <FormMessage className="text-[10px] font-bold text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/60 ml-1">Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-white border-stone-200/60 rounded-2xl h-12 pl-12 pr-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-destructive" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 rounded-full bg-[#2D241E] text-white hover:bg-black font-semibold uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#2D241E]/10 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Créer Mon Compte
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="p-6 bg-[#FDF1E8] rounded-3xl border border-[#F4E3D4]/50 flex items-start gap-4">
        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">Promesse Artisan</h4>
          <p className="text-[11px] text-muted-foreground leading-relaxed italic">
            En rejoignant Moomel, vous vous engagez à soutenir une beauté éthique et des échanges directs avec les familles d'artisans sénégalais.
          </p>
        </div>
      </div>
    </div>
  )
}
