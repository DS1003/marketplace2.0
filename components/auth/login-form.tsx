"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { login, loginWithGoogle } from "@/lib/actions/auth"
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
import { Chrome, Loader2, Mail, Lock, ArrowRight } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

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
        toast.success("Successfully logged in!")
        window.location.href = "/" // Force a full page load to fix session hydration
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-[#2D241E] italic">Welcome Back</h1>
        <p className="text-muted-foreground text-sm italic leading-relaxed">
          Sign in to access your curated rituals and track your artisan impact.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                      placeholder="your@email.com" 
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
                <div className="flex items-center justify-between ml-1">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]/60">Password</FormLabel>
                  <Button variant="link" size="sm" className="h-auto p-0 text-[10px] font-bold text-primary uppercase tracking-widest hover:no-underline">
                    Forgot Ritual?
                  </Button>
                </div>
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
                Sign In to Moomel
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-stone-200" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
          <span className="bg-[#FDFBF7] px-4 text-muted-foreground">Digital Connection</span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={() => loginWithGoogle()}
        className="w-full h-14 rounded-full border-stone-200 bg-white text-[#2D241E] hover:bg-stone-50 font-bold uppercase tracking-widest text-xs transition-all shadow-sm flex items-center justify-center gap-3"
      >
        <Chrome className="h-4 w-4 text-primary" />
        Continue with Google
      </Button>
    </div>
  )
}
