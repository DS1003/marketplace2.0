"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronRight, Lock, MapPin, CreditCard, ShoppingBag,
    ArrowLeft, CheckCircle2, ShieldCheck, Truck, Package,
    Info, Sparkles, Plus, AlertCircle, Leaf, Award, Loader2, Smartphone
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"
import { useCart } from "@/providers/cart-provider"
import { createOrder } from "@/lib/actions/order"
import { initiatePaytechPayment } from "@/lib/actions/paytech"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
    const { items, totalItems, clearCart } = useCart()
    const { data: session } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("PAYTECH")
    
    // Form States
    const [shippingData, setShippingData] = useState({
        firstName: session?.user?.name?.split(' ')[0] || "",
        lastName: session?.user?.name?.split(' ')[1] || "",
        address: "",
        city: "Dakar",
        phone: ""
    })

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = items.length > 0 ? 2500 : 0 // En FCFA désormais
    const tax = Math.round(subtotal * 0.05)
    const total = subtotal + shipping + tax

    useEffect(() => {
        // Si on revient de Paytech avec succès
        if (searchParams.get("step") === "3") {
            setStep(3)
            clearCart()
        }
    }, [searchParams, clearCart])

    const handleConfirmOrder = async () => {
        if (!session) {
            toast.error("Veuillez vous connecter pour commander")
            return
        }

        if (!shippingData.address || !shippingData.phone) {
            toast.error("Veuillez remplir les informations de livraison")
            setStep(1)
            return
        }

        setLoading(true)
        
        try {
            // 1. Créer la commande dans la DB
            const orderRes = await createOrder({
                items: items.map(i => ({ id: i.id, price: i.price, quantity: i.quantity })),
                total: total,
                paymentMethod: paymentMethod,
                shippingAddress: shippingData.address,
                city: shippingData.city,
                phone: shippingData.phone
            })

            if (!orderRes.success) {
                toast.error(orderRes.error || "Erreur lors de la création de la commande")
                setLoading(false)
                return
            }

            // 2. Gérer le paiement
            if (paymentMethod === "PAYTECH") {
                const paytechRes = await initiatePaytechPayment(orderRes.orderId!, total)
                if (paytechRes.success && paytechRes.redirect_url) {
                    window.location.href = paytechRes.redirect_url
                } else {
                    toast.error(paytechRes.error || "Erreur lors de l'initiation du paiement")
                    setLoading(false)
                }
            } else {
                // Cash on Delivery
                setStep(3)
                clearCart()
                setLoading(false)
            }
        } catch (error) {
            console.error("Checkout process error:", error)
            toast.error("Une erreur inattendue est survenue")
            setLoading(false)
        }
    }

    if (step === 3) {
        return (
            <div className="min-h-screen bg-[#FDFBF7]">
                <Header />
                <main className="pt-48 pb-24 px-4 flex flex-col items-center justify-center text-center space-y-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="w-32 h-32 bg-green-50 border border-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-xl"
                    >
                        <CheckCircle2 className="w-16 h-16" />
                    </motion.div>
                    <div className="space-y-4">
                        <Badge className="bg-green-100 text-green-700 animate-pulse transition-all">Commande #{searchParams.get("orderId")?.slice(-6).toUpperCase() || "MOOMEL"}</Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E]">
                            Succès ! <br />
                            <span className="italic text-primary font-medium tracking-normal font-jakarta">Votre Rituel arrive bientôt.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic leading-relaxed">
                            Merci d'avoir choisi Moomel. Votre commande a été enregistrée avec succès. Nos artisans préparent vos produits avec le plus grand soin.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 pt-10">
                        <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-95 group">
                            Suivre ma commande <Package className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
                        </Button>
                        <Link href="/marketplace">
                            <Button variant="outline" size="lg" className="rounded-full px-12 h-14 text-lg border-[#2D241E] text-[#2D241E] hover:bg-[#2D241E] hover:text-white transition-all">
                                Retour au Marché
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-20 opacity-30 flex gap-8 grayscale brightness-50">
                        <Sparkles className="w-12 h-12" />
                        <Leaf className="w-12 h-12" />
                        <Award className="w-12 h-12" />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Simple header for checkout */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/40 py-6">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <NextImage src="/images/logo.png" alt="Moomel" width={100} height={30} className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="hidden md:inline">Checkout Sécurisé</span>
                    </div>
                    <Link href="/cart" className="text-xs font-bold uppercase tracking-widest text-[#2D241E] flex items-center gap-2 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Retour au panier
                    </Link>
                </div>
            </header>

            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

                    {/* Left Column: Form Sections */}
                    <div className="w-full lg:w-[60%] space-y-12">

                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                            <div className={`flex items-center gap-3 ${step >= 1 ? 'text-[#2D241E]' : 'text-muted-foreground opacity-50'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#2D241E] text-white' : 'border border-[#2D241E] text-[#2D241E]'}`}>1</span>
                                Livraison
                            </div>
                            <div className="w-10 h-[1px] bg-border/40" />
                            <div className={`flex items-center gap-3 ${step >= 2 ? 'text-[#2D241E]' : 'text-muted-foreground opacity-50'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#2D241E] text-white' : 'border border-[#2D241E] text-[#2D241E]'}`}>2</span>
                                Paiement
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="shipping"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-8 p-12 bg-white rounded-[3.5rem] shadow-2xl border border-[#E9E1D6]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><MapPin className="w-6 h-6" /></div>
                                            <h2 className="text-3xl font-bold text-[#2D241E]">Informations de Livraison</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Prénom</Label>
                                                <Input 
                                                    placeholder="Prénom" 
                                                    value={shippingData.firstName}
                                                    onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                                                    className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Nom</Label>
                                                <Input 
                                                    placeholder="Nom"
                                                    value={shippingData.lastName}
                                                    onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                                                    className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" 
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Adresse Complète</Label>
                                                <Input 
                                                    placeholder="Ex: Rue Joseph Gomis, Plateau"
                                                    value={shippingData.address}
                                                    onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                                                    className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Ville</Label>
                                                <Input 
                                                    placeholder="Dakar" 
                                                    value={shippingData.city}
                                                    onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                                                    className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" 
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Téléphone</Label>
                                                <Input 
                                                    placeholder="+221 ..." 
                                                    value={shippingData.phone}
                                                    onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                                                    className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" 
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-10">
                                            <Button onClick={() => setStep(2)} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 text-lg font-bold gap-3 transition-transform active:scale-95 group">
                                                Continuer vers le Paiement <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-12"
                                >
                                    <div className="space-y-8 p-12 bg-white rounded-[3.5rem] shadow-2xl border border-[#E9E1D6]">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary"><CreditCard className="w-6 h-6" /></div>
                                            <h2 className="text-3xl font-bold text-[#2D241E]">Méthode de Paiement</h2>
                                        </div>

                                        <div className="space-y-8 pt-4">
                                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Label htmlFor="paytech" className={`flex flex-col items-center justify-center gap-4 p-8 border border-[#E9E1D6] rounded-3xl cursor-pointer hover:bg-[#FDFBF7] transition-all ${paymentMethod === 'PAYTECH' ? 'border-primary bg-primary/5' : ''}`}>
                                                    <RadioGroupItem value="PAYTECH" id="paytech" className="sr-only" />
                                                    <Smartphone className="w-8 h-8 text-primary" />
                                                    <div className="text-center">
                                                        <div className="text-xs font-bold uppercase tracking-widest leading-tight">Mobile Money</div>
                                                        <div className="text-[10px] text-muted-foreground mt-1 font-medium">Orange Money, Wave, Free Money</div>
                                                    </div>
                                                </Label>
                                                <Label htmlFor="cash" className={`flex flex-col items-center justify-center gap-4 p-8 border border-[#E9E1D6] rounded-3xl cursor-pointer hover:bg-[#FDFBF7] transition-all ${paymentMethod === 'CASH' ? 'border-primary bg-primary/5' : ''}`}>
                                                    <RadioGroupItem value="CASH" id="cash" className="sr-only" />
                                                    <Truck className="w-8 h-8 opacity-60" />
                                                    <div className="text-center">
                                                        <div className="text-xs font-bold uppercase tracking-widest leading-tight">Paiement à la livraison</div>
                                                        <div className="text-[10px] text-muted-foreground mt-1 font-medium">Espèces au livreur</div>
                                                    </div>
                                                </Label>
                                            </RadioGroup>

                                            <div className="p-8 bg-stone-50 rounded-[2.5rem] border border-stone-100 flex items-start gap-4">
                                                <Info className="w-5 h-5 text-primary mt-0.5" />
                                                <div className="text-xs text-muted-foreground leading-relaxed italic">
                                                    {paymentMethod === 'PAYTECH' 
                                                        ? "Vous serez redirigé vers l'interface de Paytech pour effectuer votre paiement mobile en toute sécurité."
                                                        : "Veuillez préparer le montant exact de votre commande pour faciliter la livraison par nos agents."}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-10 flex gap-4">
                                            <Button variant="ghost" onClick={() => setStep(1)} className="h-16 rounded-2xl px-8 font-bold text-muted-foreground gap-2">
                                                <ArrowLeft className="w-4 h-4" /> Retour
                                            </Button>
                                            <Button 
                                                onClick={handleConfirmOrder}
                                                disabled={loading}
                                                className="flex-1 h-16 rounded-2xl bg-[#1A1A1A] hover:bg-black text-white shadow-xl text-lg font-bold gap-3 transition-transform active:scale-95 group"
                                            >
                                                {loading ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    <>
                                                        Confirmer & Payer {formatPrice(total)} <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: Mini Summary */}
                    <aside className="w-full lg:w-[40%] lg:sticky lg:top-32 h-fit">
                        <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-white">
                            <div className="p-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-[#2D241E]">Récapitulatif</h2>
                                    <Link href="/cart" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">Modifier</Link>
                                </div>

                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                                <NextImage src={item.image || ""} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-bold truncate pr-4">{item.name}</h4>
                                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Qté: {item.quantity} unités</div>
                                                    </div>
                                                    <div className="text-sm font-light text-[#2D241E]">{formatPrice(item.price * item.quantity)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="text-center py-6">
                                            <p className="text-xs text-muted-foreground italic">Votre panier est vide.</p>
                                        </div>
                                    )}
                                </div>

                                <Separator className="bg-border/40" />

                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Sous-total</span>
                                        <span className="text-[#2D241E]">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Livraison Ritual</span>
                                        <span className="text-[#2D241E]">{formatPrice(shipping)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Taxes (5%)</span>
                                        <span className="text-[#2D241E]">{formatPrice(tax)}</span>
                                    </div>
                                    <Separator className="bg-border/40" />
                                    <div className="flex justify-between items-end text-[#2D241E]">
                                        <span className="text-sm font-bold tracking-tighter uppercase italic">Total Ritual</span>
                                        <span className="text-4xl font-light tracking-tighter">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4">
                                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                                            En confirmant, vous acceptez nos <strong>Politiques Éthiques d'Artisanat</strong> et nos <strong>Conditions de Retour</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}
