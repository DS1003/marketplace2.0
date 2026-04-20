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
import { Loader2, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react"

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
})

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const result = await register(values)
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
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-[#2D241E] italic">Rejoindre Moomel</h1>
        <p className="text-muted-foreground text-sm italic leading-relaxed">
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
                      className="bg-white border-stone-200/60 rounded-2xl h-14 pl-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
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
                      className="bg-white border-stone-200/60 rounded-2xl h-14 pl-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
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
                      type="password" 
                      placeholder="••••••••" 
                      {...field} 
                      className="bg-white border-stone-200/60 rounded-2xl h-14 pl-12 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
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
            className="w-full h-14 rounded-full bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#2D241E]/10 flex items-center justify-center gap-2 group"
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
