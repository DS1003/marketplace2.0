"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Store, 
  MapPin, 
  Globe, 
  Instagram, 
  Facebook, 
  Twitter, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Info,
  ChevronRight,
  ChevronLeft,
  Clock,
  Image as ImageIcon
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { registerSeller } from "@/lib/actions/seller"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function BecomeSellerPage() {
    const [step, setStep] = useState(1)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        startTransition(async () => {
            try {
                await registerSeller({
                    name: formData.name,
                    description: formData.description,
                    image: formData.image
                })
                toast.success("Demande reçue ! Votre laboratoire est en cours de révision.")
                setStep(3)
                router.refresh()
            } catch (error: any) {
                toast.error(error.message || "Failed to establish lab.")
            }
        })
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-[#2D241E]">
            <Header />

            <main className="pt-32 pb-32">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-20">
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-6 py-1.5 rounded-full font-bold uppercase tracking-widest text-[9px]">
                            Join the Moomel Artisan Lab
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none italic">
                            Empower Your <span className="text-primary not-italic">Heritage</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium italic underline decoration-primary/10">
                            Translate your West African artisanal rituals into a global digital presence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* Status Sidebar */}
                        <div className="lg:col-span-2 space-y-6 sticky top-40">
                             <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] p-10 overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-8 text-primary/20 transition-transform group-hover:scale-110 duration-700"><Sparkles className="h-20 w-20" /></div>
                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-bold tracking-tight">Institutional Onboarding</h3>
                                        <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] italic">Step {step > 2 ? 3 : step} of 3</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((s) => (
                                            <div key={s} className="flex items-center gap-4">
                                                <div className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-primary' : 'bg-white/5'}`} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-white/5">
                                        <p className="text-xs text-white/50 leading-relaxed font-medium italic underline underline-offset-4 decoration-primary/20">
                                            "Craft is the language of our ancestors; commerce is how we sustain their legacy."
                                        </p>
                                    </div>
                                </div>
                             </Card>
                             
                             {step < 3 && (
                                <div className="px-8 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                       <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary"><ShieldCheck className="h-4 w-4" /></div>
                                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Institutional Review Ready</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary"><Globe className="h-4 w-4" /></div>
                                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Global Registry Indexed</span>
                                    </div>
                                 </div>
                             )}
                        </div>

                        {/* Form Container */}
                        <div className="lg:col-span-3">
                            <Card className="border-none shadow-2xl bg-white rounded-[3rem] p-12 relative overflow-hidden">
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <AnimatePresence mode="wait">
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-10"
                                            >
                                                <div className="space-y-2">
                                                    <h2 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
                                                        <Store className="w-8 h-8 text-primary" />
                                                        Boutique Identity
                                                    </h2>
                                                    <p className="text-slate-400 font-medium italic text-base">Manifest the name and soul of your artisanal lab.</p>
                                                </div>

                                                <div className="space-y-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-slate-500">Boutique Nom de Plume</Label>
                                                        <Input
                                                            required
                                                            placeholder="e.g. Koba Skin Lab"
                                                            className="h-14 rounded-2xl bg-slate-50 border-zinc-100 focus:ring-1 focus:ring-primary/20 text-lg font-bold"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-slate-500">Brand Vibe / Bio</Label>
                                                        <Textarea
                                                            required
                                                            placeholder="Translate the alchemy of your process into words..."
                                                            className="min-h-[160px] rounded-3xl bg-slate-50 border-zinc-100 p-6 text-sm font-semibold leading-relaxed"
                                                            value={formData.description}
                                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex justify-end pt-6 border-t border-zinc-50">
                                                    <Button type="button" onClick={() => setStep(2)} className="rounded-2xl h-14 px-10 text-[10px] font-bold uppercase tracking-widest bg-slate-900 group shadow-xl shadow-slate-900/10 text-white">
                                                        Next Ritual <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-10"
                                            >
                                                <div className="space-y-2">
                                                    <h2 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
                                                        <ImageIcon className="w-8 h-8 text-primary" />
                                                        Lab Visuals
                                                    </h2>
                                                    <p className="text-slate-400 font-medium italic text-base">Secure your high-fidelity storefront imagery.</p>
                                                </div>

                                                <div className="space-y-8">
                                                    <div className="space-y-4">
                                                        <Label className="text-[10px] font-bold uppercase tracking-widest ml-1 text-slate-500">Identity Visual (URL)</Label>
                                                        <Input
                                                            placeholder="High-resolution image URL..."
                                                            className="h-14 rounded-2xl bg-slate-50 border-zinc-100"
                                                            value={formData.image}
                                                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                                                        />
                                                    </div>

                                                    <div className="p-8 border-2 border-dashed border-zinc-100 rounded-[2rem] bg-slate-50/50 flex flex-col items-center justify-center text-center space-y-6">
                                                        <div className="h-16 w-16 rounded-full bg-white shadow-xl flex items-center justify-center"><Info className="h-6 w-6 text-primary" /></div>
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-bold text-slate-800">Final Verification</p>
                                                            <p className="text-[11px] text-slate-400 font-medium italic underline underline-offset-4 decoration-primary/10">
                                                                By establishing your lab, you join the global Moomel institutional registry for artisanal excellence.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center pt-6 border-t border-zinc-50">
                                                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-800 font-bold uppercase tracking-widest text-[9px] px-6">
                                                        <ChevronLeft className="mr-2 h-4 w-4" /> Relire l'Essence
                                                    </Button>
                                                    <Button disabled={isPending} type="submit" className="rounded-2xl h-14 px-12 text-[10px] font-bold uppercase tracking-widest bg-primary text-white shadow-2xl shadow-primary/20 group">
                                                        {isPending ? "Manifesting..." : "Launch Artisan Lab"} <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-center py-10 space-y-8"
                                            >
                                                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto animate-bounce">
                                                    <Clock className="w-12 h-12" />
                                                </div>
                                                <div className="space-y-4">
                                                    <h2 className="text-4xl font-bold tracking-tight">Candidature en cours d'Examen</h2>
                                                    <p className="text-slate-400 font-medium italic max-w-sm mx-auto">
                                                        Votre laboratoire est maintenant entre les mains de nos conservateurs. 
                                                        Vous recevrez une notification et un e-mail une fois votre rituel approuvé.
                                                    </p>
                                                </div>
                                                <div className="pt-8">
                                                    <Button onClick={() => router.push("/")} className="rounded-full px-10 h-14 bg-[#2D241E] text-white font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-black/10">
                                                        Retour au Marché
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
