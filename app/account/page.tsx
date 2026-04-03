"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import NextImage from "next/image"
import { motion } from "framer-motion"
import {
    User, Package, MapPin, CreditCard, Settings,
    LogOut, Heart, ShoppingBag, ChevronRight, Star,
    ShieldCheck, ArrowRight, MessageCircle, Clock, Award, LayoutDashboard, Activity
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useSession } from "next-auth/react"
import { logout } from "@/lib/actions/auth"
import { formatPrice } from "@/lib/utils"

import { Suspense } from "react"

function AccountPageContent() {
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "orders")
    const [authMode, setAuthMode] = useState<"login" | "register">("login")
    const { data: session, status } = useSession()

    useEffect(() => {
        const tab = searchParams.get("tab")
        if (tab) setActiveTab(tab)
    }, [searchParams])

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <NextImage src="/images/logo.png" alt="Moomel" width={150} height={50} className="animate-pulse" />
                    <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-[10px]">
                        <Clock className="w-4 h-4 animate-spin" /> Préparation du Rituel...
                    </div>
                </div>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-[#FDFBF7]">
                <Header />
                <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[80vh] flex items-center justify-center">
                    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block space-y-8"
                        >
                            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                                <NextImage 
                                    src="https://images.unsplash.com/photo-1596462502278-27bfad85731d?q=80&w=800" 
                                    alt="Moomel Rituals" 
                                    fill 
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white">
                                    <h2 className="text-4xl font-bold italic mb-4">Le Rituel de la Sélection Naturelle</h2>
                                    <p className="text-white/80 text-sm leading-relaxed italic max-w-xs">
                                        Découvrez les secrets de beauté ancestraux préservés pour les esprits modernes. Pur, biologique et directement du cœur du Sénégal.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/50 backdrop-blur-xl p-10 lg:p-14 rounded-[3.5rem] shadow-xl border border-white"
                        >
                            <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)} className="w-full">
                                <TabsList className="grid grid-cols-2 w-full max-w-[280px] mx-auto h-12 bg-stone-100/50 rounded-full p-1 mb-10">
                                    <TabsTrigger value="login" className="rounded-full font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-[#2D241E] data-[state=active]:text-white">Connexion</TabsTrigger>
                                    <TabsTrigger value="register" className="rounded-full font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-[#2D241E] data-[state=active]:text-white">Rejoindre</TabsTrigger>
                                </TabsList>
                                <TabsContent value="login" className="mt-0">
                                    <LoginForm />
                                </TabsContent>
                                <TabsContent value="register" className="mt-0">
                                    <RegisterForm onSuccess={() => setAuthMode("login")} />
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Header />

            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

                    {/* Left Side: Profile Sidebar */}
                    <aside className="w-full lg:w-1/4 space-y-8">
                        <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-white">
                            <div className="p-10 flex flex-col items-center text-center space-y-6">
                                <div className="relative w-32 h-32 rounded-full ring-4 ring-primary/10 ring-offset-4 overflow-hidden shadow-2xl group cursor-pointer">
                                    {session.user.image ? (
                                        <NextImage src={session.user.image} alt={session.user.name || "User"} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="128px" />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold uppercase italic">
                                            {session.user.name?.charAt(0) || "U"}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                        <Settings className="w-6 h-6" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-[#2D241E]">{session.user.name}</h2>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground italic">Membre depuis Fév 2026</p>
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="flex gap-4 justify-center">
                                        <Badge className="bg-[#2D241E] text-white">Silver Ritualist</Badge>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="text-sm font-bold">450 pts</span>
                                        </div>
                                    </div>
                                    
                                    {((session.user as any)?.role === "SELLER" || (session.user as any)?.role === "SUPER_ADMIN") && (
                                        <Link href={(session.user as any)?.role === "SUPER_ADMIN" ? "/admin" : "/seller"} className="w-full">
                                            <Button className="w-full h-11 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-[9px] shadow-lg shadow-primary/10 flex items-center justify-center gap-2">
                                                <LayoutDashboard className="h-3.5 w-3.5" />
                                                {(session.user as any)?.role === "SUPER_ADMIN" ? "Panel Admin" : "Espace Artisan"}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 bg-stone-50 space-y-2">
                                {[
                                    { id: "orders", icon: Package, label: "Vos Commandes" },
                                    { id: "wishlist", icon: Heart, label: "Vos Favoris" },
                                    { id: "addresses", icon: MapPin, label: "Adresses Enregistrées" },
                                    { id: "payment", icon: CreditCard, label: "Méthodes de Paiement" },
                                    { id: "settings", icon: Settings, label: "Paramètres du Compte" }
                                ].map((item) => (
                                    <Button
                                        key={item.id}
                                        variant="ghost"
                                        className={`w-full justify-start h-12 rounded-2xl gap-4 px-6 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-white text-primary shadow-sm border border-primary/5' : 'text-muted-foreground hover:bg-white hover:text-[#2D241E]'}`}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </Button>
                                ))}

                                <Separator className="my-4 bg-border/20" />

                                <Button 
                                    variant="ghost" 
                                    onClick={() => logout()}
                                    className="w-full justify-start h-12 rounded-2xl gap-4 px-6 text-sm font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Déconnexion Sécurisée
                                </Button>
                            </div>
                        </Card>

                        {/* Impact Badge */}
                        <div className="p-8 bg-[#2D241E] rounded-[2.5rem] text-white relative overflow-hidden group">
                            <div className="relative z-10 space-y-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Award className="w-6 h-6" /></div>
                                <h3 className="text-xl font-bold italic">Impact Artisan</h3>
                                <p className="text-xs text-white/50 leading-relaxed italic">
                                    Vos achats ont directement soutenu <strong>14 familles sénégalaises</strong> ce mois-ci. Merci de faire la différence.
                                </p>
                                <Button variant="link" className="text-primary font-bold text-xs uppercase p-0 group">Voir le rapport d'impact <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" /></Button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                        </div>
                    </aside>

                    {/* Right Side: Content Area */}
                    <div className="flex-1 w-full space-y-12">
                        <FadeContent blur={true} duration={0.6}>
                            {activeTab === "orders" && (
                                <div className="space-y-10">
                                    <div className="flex justify-between items-end pb-4 border-b border-border/40">
                                        <h2 className="text-4xl font-bold text-[#2D241E]">Commandes Récentes</h2>
                                        <Link href="/marketplace" className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
                                            <ShoppingBag className="w-4 h-4" /> Nouvelle Commande
                                        </Link>
                                    </div>

                                    <div className="space-y-6">
                                        {[
                                            { id: "#MOO-19412", date: "10 Mars 2026", status: "En cours", total: 45000, items: 3, img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200" },
                                            { id: "#MOO-18931", date: "15 Fév 2026", status: "Livré", total: 27500, items: 1, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" }
                                        ].map((order, idx) => (
                                            <Card key={idx} className="border-none shadow-sm hover:shadow-xl bg-white rounded-[2.5rem] overflow-hidden transition-all duration-700 group cursor-pointer border border-transparent hover:border-primary/5">
                                                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center">
                                                    <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                                                        <NextImage src={order.img} alt="order" fill className="object-cover transition-transform group-hover:scale-110 duration-700" sizes="80px" />
                                                    </div>
                                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                                            <span className="text-lg font-bold text-[#2D241E]">{order.id}</span>
                                                            <Badge className={`\${order.status === 'En cours' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'} uppercase font-bold text-[9px] h-5 tracking-widest`}>
                                                                {order.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                                                            <Clock className="w-3 h-3" /> Commandé le {order.date}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-2 text-center md:text-right">
                                                        <div className="text-xl font-light text-[#2D241E] underline decoration-primary/10 decoration-2 underline-offset-4">{formatPrice(order.total)}</div>
                                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{order.items} articles inclus</p>
                                                    </div>
                                                    <div className="md:pl-8 border-t md:border-t-0 md:border-l border-border/40 pt-6 md:pt-0 w-full md:w-auto">
                                                        <Button variant="outline" className="w-full md:w-auto rounded-full border-[#2D241E] h-12 px-8 text-xs font-bold uppercase tracking-widest hover:bg-[#2D241E] hover:text-white transition-all group/btn">
                                                            Voir Détails <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="p-10 bg-[#F6EBE1] rounded-[2.5rem] border border-[#E9E1D6] flex flex-col md:flex-row items-center gap-10">
                                        <div className="p-6 bg-white rounded-3xl shadow-xl flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-500">
                                            <MessageCircle className="w-10 h-10" />
                                        </div>
                                        <div className="space-y-4 text-center md:text-left">
                                            <h3 className="text-2xl font-bold text-[#2D241E] italic">Besoin de conseils beauté ?</h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm italic">
                                                Nos experts en rituels sénégalais sont disponibles pour une consultation personnalisée basée sur votre historique d'achat.
                                            </p>
                                        </div>
                                        <div className="md:ml-auto">
                                            <Button className="rounded-full bg-[#2D241E] text-white hover:bg-black px-10 h-14 font-bold uppercase tracking-widest text-xs">
                                                Démarrer la consultation
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "settings" && (
                                <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex justify-between items-end pb-4 border-b border-border/40">
                                        <h2 className="text-4xl font-bold text-[#2D241E]">Utilisation & Paramètres</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 space-y-6">
                                            <h3 className="text-lg font-bold text-[#2D241E] flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-primary" /> Statistiques du Profil
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rituels Acquis</span>
                                                    <span className="text-xl font-bold text-[#2D241E]">24</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Points Communauté</span>
                                                    <span className="text-xl font-bold text-[#2D241E]">450 pts</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Niveau de Soutien</span>
                                                    <span className="text-xl font-bold text-primary italic">Mécène Silver</span>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 space-y-6">
                                            <h3 className="text-lg font-bold text-[#2D241E] flex items-center gap-2">
                                                <ShieldCheck className="w-5 h-5 text-primary" /> Sécurité & Confidentialité
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-stone-50 rounded-2xl flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-[#2D241E]">Notifications Email</p>
                                                        <p className="text-[10px] text-muted-foreground font-light italic">Recevoir les mises à jour des rituels.</p>
                                                    </div>
                                                    <div className="h-6 w-12 bg-primary rounded-full relative p-1 cursor-pointer">
                                                        <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                                                    </div>
                                                </div>
                                                <div className="p-4 bg-stone-50 rounded-2xl flex items-center justify-between opacity-50 grayscale pointer-events-none">
                                                    <div>
                                                        <p className="text-sm font-bold text-[#2D241E]">Auth à deux facteurs</p>
                                                        <p className="text-[10px] text-muted-foreground font-light italic">Plus grande sécurité du rituel.</p>
                                                    </div>
                                                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Bientôt disponible</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    <div className="p-10 bg-[#2D241E] rounded-[2.5rem] text-white space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary"><Settings className="w-6 h-6" /></div>
                                            <h3 className="text-2xl font-bold italic">Détails d'identité</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nom Complet</p>
                                                <p className="text-sm font-medium">{session.user.name}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Email Ritual</p>
                                                <p className="text-sm font-medium">{session.user.email}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Authenticité Membre</p>
                                                <p className="text-sm font-medium text-emerald-400 flex items-center gap-2"><Award className="w-4 h-4" /> Mécène Vérifié</p>
                                            </div>
                                        </div>
                                        <div className="pt-6">
                                            <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-[#2D241E] h-12 px-8 font-bold uppercase tracking-widest text-[9px]">
                                                Mettre à jour le profil Ritual
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab !== "orders" && activeTab !== "settings" && (
                                <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/30">
                                        <ShieldCheck className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-[#2D241E]">Section bientôt disponible.</h2>
                                    <p className="text-muted-foreground max-w-sm italic leading-relaxed">
                                        Nous façonnons cette expérience pour répondre aux standards les plus élevés de notre communauté.
                                        Pour l'instant, explorez notre Marché pour de nouveaux rituels.
                                    </p>
                                    <Link href="/marketplace">
                                        <Button variant="outline" className="rounded-full px-12 h-14 border-[#2D241E] text-[#2D241E] hover:bg-[#2D241E] hover:text-white transition-all font-bold uppercase tracking-widest text-xs">
                                            Retour au Marché <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </FadeContent>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default function AccountPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        }>
            <AccountPageContent />
        </Suspense>
    )
}
