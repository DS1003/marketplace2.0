"use client"

import { useState } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    ShoppingBag, Trash2, Plus, Minus, ArrowRight, Heart,
    ShieldCheck, Truck, CornerDownLeft, ArrowLeft, Info, HelpCircle, Leaf
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FadeContent } from "@/components/ui/fade-content"

// --- Mock Cart Items ---
const initialCart = [
    {
        id: 1,
        name: "Pure Shea Butter",
        price: 24.99,
        quantity: 1,
        seller: "Koba Skin",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400",
        organic: true
    },
    {
        id: 2,
        name: "Baobab Oil Serum",
        price: 38.50,
        quantity: 2,
        seller: "Senegal Beauty Co.",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400",
        organic: true
    }
]

export default function CartPage() {
    const [cartItems, setCartItems] = useState(initialCart)
    const [promoCode, setPromoCode] = useState("")

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ))
    }

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shipping = 5.00
    const tax = subtotal * 0.05
    const total = subtotal + shipping + tax

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FDFBF7]">
                <Header />
                <main className="pt-48 pb-24 px-4 flex flex-col items-center justify-center text-center space-y-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-bold text-[#2D241E]">Your cart is empty</h1>
                    <p className="text-muted-foreground max-w-md italic">
                        Discover our premium selection of organic Senegalese beauty rituals and start your journey today.
                    </p>
                    <Link href="/marketplace">
                        <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-95 group">
                            Browse Marketplace <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
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

                    {/* Left Side: Cart Items */}
                    <div className="w-full lg:w-[65%] space-y-12">
                        <div className="flex items-center justify-between pb-6 border-b border-border/40">
                            <h1 className="text-4xl font-bold tracking-tight text-[#2D241E]">Ritual Shopping Bag</h1>
                            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{cartItems.length} items</span>
                        </div>

                        <div className="space-y-8">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="group py-8 first:pt-0 border-b border-border/40 last:border-none flex items-start gap-6 md:gap-10"
                                    >
                                        <Link href={`/product/\${item.id}`} className="relative w-24 h-32 md:w-32 md:h-44 flex-shrink-0 rounded-2xl overflow-hidden bg-muted shadow-sm hover:shadow-xl transition-shadow duration-500">
                                            <NextImage src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                        </Link>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary italic">{item.seller}</span>
                                                    <Link href={`/product/\${item.id}`} className="text-xl font-bold text-[#2D241E] hover:text-primary transition-colors block">
                                                        {item.name}
                                                    </Link>
                                                    {item.organic && (
                                                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-700 grayscale hover:grayscale-0 transition-all">
                                                            <Leaf className="w-3 h-3" /> 100% Organic
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-xl font-light text-[#2D241E] underline decoration-primary/20 decoration-2 underline-offset-4">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="flex items-center border border-border/60 rounded-full p-0.5 bg-stone-50 group-hover:bg-white group-hover:border-primary/20 transition-all duration-500 shadow-sm">
                                                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white" onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3 h-3" /></Button>
                                                    <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                                                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white" onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3 h-3" /></Button>
                                                </div>

                                                <div className="flex gap-4">
                                                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500 rounded-full text-xs font-bold uppercase tracking-widest gap-2 py-5" onClick={() => removeItem(item.id)}>
                                                        <Trash2 className="w-4 h-4" /> Remove
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-full text-xs font-bold uppercase tracking-widest gap-2 py-5 px-6">
                                                        <Heart className="w-4 h-4" /> Save
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="pt-10 space-y-6">
                            <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-bold text-[#2D241E] hover:text-primary transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Keep Exploring Marketplace
                            </Link>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
                                <div className="flex items-center gap-4 p-6 bg-white border border-[#E9E1D6] rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><ShieldCheck className="w-5 h-5" /></div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#2D241E] leading-tight">Secure Payment</span>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-white border border-[#E9E1D6] rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Truck className="w-5 h-5" /></div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#2D241E] leading-tight">Fast Logistics</span>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-white border border-[#E9E1D6] rounded-3xl shadow-sm hover:shadow-xl transition-all h-full">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><CornerDownLeft className="w-5 h-5" /></div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#2D241E] leading-tight">Easy Returns</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Order Summary */}
                    <aside className="w-full lg:w-[35%] lg:sticky lg:top-32">
                        <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                            <div className="p-10 space-y-10">
                                <h2 className="text-2xl font-bold text-[#2D241E]">Ritual Summary</h2>

                                <div className="space-y-6">
                                    <div className="flex justify-between text-muted-foreground text-sm font-medium">
                                        <span>Subtotal</span>
                                        <span className="text-[#2D241E] italic underline decoration-primary/10 decoration-2 underline-offset-4">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground text-sm font-medium">
                                        <div className="flex items-center gap-1.5">Shipping <HelpCircle className="w-3.5 h-3.5 opacity-50" /></div>
                                        <span className="text-[#2D241E] italic decoration-primary/10 underline-offset-4 decoration-2 underline">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground text-sm font-medium">
                                        <span>Taxes (5%)</span>
                                        <span className="text-[#2D241E] italic decoration-primary/10 underline-offset-4 decoration-2 underline">${tax.toFixed(2)}</span>
                                    </div>
                                    <Separator className="bg-border/40" />
                                    <div className="flex justify-between items-end text-[#2D241E]">
                                        <span className="text-lg font-bold italic tracking-tighter uppercase">Total Amount</span>
                                        <span className="text-4xl font-light tracking-tighter decoration-primary/20 underline underline-offset-8">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Input
                                            placeholder="Promotion Code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="h-14 rounded-2xl bg-[#FDFBF7] border-[#E9E1D6] pr-20 text-sm font-medium focus:ring-primary/20 transition-all duration-500 group-hover:bg-white"
                                        />
                                        <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/5 transition-all">Apply</Button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-10">
                                    <Link href="/checkout">
                                        <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 text-lg font-bold gap-3 transition-transform active:scale-95 group">
                                            Enter Checkout <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                    <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-bold tracking-widest uppercase">
                                        <Info className="w-3 h-3" /> Secure Ritual Protected by SSL
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-stone-50 border-t border-border/40 flex justify-center gap-6 opacity-30">
                                <div className="w-10 h-6 bg-stone-600 rounded grayscale-0" />
                                <div className="w-10 h-6 bg-stone-500 rounded grayscale-0" />
                                <div className="w-10 h-6 bg-stone-400 rounded grayscale-0" />
                            </div>
                        </Card>

                        {/* Recommendation Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 p-10 bg-[#2D241E] rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group border border-[#2D241E] hover:border-primary/50 transition-all duration-700"
                        >
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-xl font-bold italic">Perfect for you</h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    Our <span className="text-primary italic">Baobab Serum</span> is the perfect companion to your Shea Butter ritual. Add it now and get <strong>10% off</strong> on your entire bag.
                                </p>
                                <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black mt-4 h-10 px-6 text-xs uppercase tracking-widest font-bold">
                                    Add + $38.50
                                </Button>
                            </div>
                            {/* Decorative Pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </motion.div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}
