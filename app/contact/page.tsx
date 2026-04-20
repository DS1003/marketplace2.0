"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, ShieldCheck, Globe, Zap } from "lucide-react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        // Simulate sending
        await new Promise(resolve => setTimeout(resolve, 1500))
        toast.success("Votre message a été transmis à nos curateurs. Nous vous répondrons sous peu.")
        setIsSubmitting(false)
        const form = e.target as HTMLFormElement
        form.reset()
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
            <Header />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* Left: Content and Info */}
                    <div className="lg:w-1/2 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary uppercase tracking-widest text-[10px] font-bold px-4 py-1.5 rounded-full">
                                Contact & Dialogue
                            </Badge>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E] leading-tight italic">
                                Entrons en <br />
                                <span className="text-primary not-italic">Résonance.</span>
                            </h1>
                            <p className="text-lg text-[#2D241E]/60 leading-relaxed max-w-md italic">
                                Que vous soyez un artisan passionné ou un amateur de rituels naturels, notre équipe est à votre écoute pour honorer la beauté du Sénégal.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                        >
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary border border-[#E9E1D6]">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#2D241E]/40 mb-1">Email Ritual</h3>
                                    <p className="font-bold">contact@moomel.sn</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary border border-[#E9E1D6]">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#2D241E]/40 mb-1">Ligne Directe</h3>
                                    <p className="font-bold">+221 33 800 00 00</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary border border-[#E9E1D6]">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#2D241E]/40 mb-1">Siège Social</h3>
                                    <p className="font-bold">Point E, Dakar, Sénégal</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary border border-[#E9E1D6]">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold uppercase tracking-widest text-[10px] text-[#2D241E]/40 mb-1">Connectivité</h3>
                                    <div className="flex gap-4 mt-2">
                                        <Instagram className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                                        <Facebook className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                                        <Twitter className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="p-8 bg-[#F6EBE1] rounded-[2.5rem] border border-primary/10 relative overflow-hidden group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-1000" />
                            <div className="flex items-start gap-4 relative z-10">
                                <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                                <div className="space-y-2">
                                    <h4 className="font-bold uppercase tracking-widest text-[11px]">Support Vendeur</h4>
                                    <p className="text-[12px] text-[#2D241E]/60 leading-relaxed italic">
                                        Vous êtes un artisan et souhaitez rejoindre notre marketplace ? Précisez "Candidature" dans le sujet de votre message.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form Card */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
                                <CardContent className="p-10 md:p-16">
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <LabelInput label="Votre Nom Nom" placeholder="ex: Anta Diop" name="name" required />
                                            </div>
                                            <div className="space-y-2">
                                                <LabelInput label="Vecteur Email" placeholder="votre@email.com" name="email" type="email" required />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <LabelInput label="Objet du Dialogue" placeholder="Candidature, Partenariat, Question..." name="subject" required />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E]/50 ml-2 mb-2 block">
                                                Votre Message
                                            </label>
                                            <Textarea 
                                                name="message"
                                                required
                                                placeholder="Partagez vos pensées avec nous..." 
                                                className="min-h-[180px] rounded-3xl border-stone-100 bg-stone-50/50 focus:ring-primary/20 focus:border-primary px-6 py-5 text-[14px] font-medium placeholder:text-[#2D241E]/20"
                                            />
                                        </div>

                                        <Button 
                                            disabled={isSubmitting}
                                            type="submit" 
                                            className="w-full h-16 rounded-full bg-[#2D241E] text-white hover:bg-black font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-black/10 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            {isSubmitting ? (
                                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Transmettre le Message
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

function LabelInput({ label, placeholder, name, type = "text", required }: { label: string, placeholder: string, name: string, type?: string, required?: boolean }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D241E]/50 ml-2 block">
                {label}
            </label>
            <Input 
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                className="h-14 rounded-2xl border-stone-100 bg-stone-50/50 focus:ring-primary/20 focus:border-primary px-6 font-bold text-[13px] placeholder:text-[#2D241E]/20"
            />
        </div>
    )
}
