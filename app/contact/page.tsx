"use client"

import { motion } from "framer-motion"
import NextImage from "next/image"
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, ExternalLink, MessageCircle, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Header />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <FadeContent blur={true} duration={0.8}>
                    <div className="flex flex-col items-center text-center mb-16 space-y-4">
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">Contactez-Nous</Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E]">
                            Nous Serions Ravis de <br />
                            <span className="italic text-primary font-medium">Vous Lire.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
                            Que vous ayez une question sur nos produits, une proposition commerciale ou que vous souhaitiez simplement nous dire bonjour, notre équipe est là pour vous aider.
                        </p>
                    </div>
                </FadeContent>
            </section>

            {/* Contact Content Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                    {/* Left Side: Contact Information */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 hover:shadow-xl transition-all duration-500">
                                    <div className="w-12 h-12 bg-primary/10 rounded-[1.2rem] flex items-center justify-center text-primary mb-6">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">E-mail</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Notre équipe est là pour vous aider.</p>
                                    <a href="mailto:hello@moomel.sn" className="text-primary font-bold hover:underline">hello@moomel.sn</a>
                                </Card>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 hover:shadow-xl transition-all duration-500">
                                    <div className="w-12 h-12 bg-primary/10 rounded-[1.2rem] flex items-center justify-center text-primary mb-6">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Appelez-nous</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Du lundi au vendredi, 9h - 18h.</p>
                                    <a href="tel:+221338883333" className="text-primary font-bold hover:underline">+221 33 888 33 33</a>
                                </Card>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 hover:shadow-xl transition-all duration-500">
                                    <div className="w-12 h-12 bg-primary/10 rounded-[1.2rem] flex items-center justify-center text-primary mb-6">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Bureau de Dakar</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Visitez notre siège social.</p>
                                    <p className="text-[#2D241E] font-medium">Plateau, Avenue Hassan II <br /> Dakar, Sénégal</p>
                                </Card>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                                <Card className="border-none shadow-sm bg-white rounded-[2rem] p-8 hover:shadow-xl transition-all duration-500">
                                    <div className="w-12 h-12 bg-primary/10 rounded-[1.2rem] flex items-center justify-center text-primary mb-6">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Support en Direct</h3>
                                    <p className="text-sm text-muted-foreground mb-4">Discutez avec nos experts beauté.</p>
                                    <a href="#" className="flex items-center text-primary font-bold hover:underline"><MessageCircle className="w-4 h-4 mr-2" /> Démarrer le Chat</a>
                                </Card>
                            </motion.div>
                        </div>

                        <div className="p-10 bg-[#2D241E] rounded-[2.5rem] text-white space-y-8">
                            <h3 className="text-2xl font-bold italic">Suivez-nous sur les réseaux</h3>
                            <p className="text-white/60 leading-relaxed max-w-sm">
                                Suivez notre aventure alors que nous mettons en lumière le meilleur des rituels de beauté bio sénégalais.
                            </p>
                            <div className="flex gap-6">
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#2D241E] transition-all duration-500"><Instagram className="w-5 h-5" /></a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#2D241E] transition-all duration-500"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#2D241E] transition-all duration-500"><Facebook className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl border border-[#E9E1D6] space-y-10"
                    >
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold tracking-tight text-[#2D241E]">Envoyez-nous un message</h3>
                            <p className="text-muted-foreground">Demandes générales ? Opportunités commerciales ? Nous sommes à votre écoute.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nom complet</label>
                                    <Input placeholder="Anta Diop" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] focus:ring-primary/20" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Adresse E-mail</label>
                                    <Input placeholder="anta@exemple.sn" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] focus:ring-primary/20" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Type de demande</label>
                                <Input placeholder="Demande générale" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] focus:ring-primary/20" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Votre Message</label>
                                <Textarea placeholder="Comment pouvons-nous vous aider aujourd'hui ?" className="min-h-[160px] rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] focus:ring-primary/20 p-4" />
                            </div>

                            <Button className="w-full h-16 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3">
                                Envoyer le Message <Send className="w-5 h-5" />
                            </Button>
                        </form>

                        <div className="pt-6 border-t border-[#E9E1D6] flex items-center justify-center gap-2 text-sm text-muted-foreground italic">
                            <ExternalLink className="w-4 h-4" />
                            <span>Temps de réponse : Généralement sous 24 heures.</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Map or Office Image Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
                <div className="relative h-[500px] w-full rounded-[4rem] overflow-hidden group shadow-2xl">
                    <NextImage
                        src="https://images.unsplash.com/photo-1471341971476-3bc3a2d59f77?q=80&w=1200&auto=format&fit=crop"
                        alt="Our Dakar Office"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-20 text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20 uppercase tracking-widest">Notre Présence</Badge>
                            <h2 className="text-4xl font-bold text-white mb-4">Né au Sénégal, <br /> Distribué dans le Monde Entier.</h2>
                            <p className="text-white/60 text-lg max-w-xl mx-auto">
                                Opérant depuis le cœur de Dakar, nous veillons à ce que nos standards mondiaux rencontrent l&apos;esprit local.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
