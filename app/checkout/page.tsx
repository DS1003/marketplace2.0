"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    ChevronRight, Lock, MapPin, CreditCard, ShoppingBag,
    ArrowLeft, CheckCircle2, ShieldCheck, Truck, Package,
    Info, Sparkles, Plus, AlertCircle
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

export default function CheckoutPage() {
    const [step, setStep] = useState(1) // 1: Shipping, 2: Payment, 3: Success

    // Simple state for totals (mocked)
    const subtotal = 102.50
    const shipping = 5.00
    const tax = 5.12
    const total = subtotal + shipping + tax

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
                        <Badge className="bg-green-100 text-green-700 animate-pulse transition-all">Order ID: #MOO-19412</Badge>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#2D241E]">
                            Success, <br />
                            <span className="italic text-primary font-medium tracking-normal font-jakarta">Your Ritual is Coming.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic leading-relaxed">
                            Thank you for choosing Moomel. Your order has been placed successfully and our artisans are preparing your organic selection with care.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 pt-10">
                        <Button size="lg" className="rounded-full px-12 h-14 text-lg bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-95 group">
                            Track Your Order <Package className="w-5 h-5 ml-2 transition-transform group-hover:scale-110" />
                        </Button>
                        <Link href="/marketplace">
                            <Button variant="outline" size="lg" className="rounded-full px-12 h-14 text-lg border-[#2D241E] text-[#2D241E] hover:bg-[#2D241E] hover:text-white transition-all">
                                Back to Marketplace
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
            {/* Simple header for checkout to minimize distractions */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/40 py-6">
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/images/logo.png" alt="Moomel" width={100} height={30} className="h-8 w-auto" />
                    </Link>
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="hidden md:inline">Secure Ritual Checkout</span>
                    </div>
                    <Link href="/cart" className="text-xs font-bold uppercase tracking-widest text-[#2D241E] flex items-center gap-2 hover:text-primary transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Bag
                    </Link>
                </div>
            </header>

            <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

                    {/* Left Column: Form Sections */}
                    <div className="w-full lg:w-[60%] space-y-12">

                        {/* Steps indicator */}
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                            <div className={`flex items-center gap-3 \${step >= 1 ? 'text-[#2D241E]' : 'text-muted-foreground opacity-50'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center \${step >= 1 ? 'bg-[#2D241E] text-white' : 'border border-[#2D241E] text-[#2D241E]'}`}>1</span>
                                Shipping
                            </div>
                            <div className="w-10 h-[1px] bg-border/40" />
                            <div className={`flex items-center gap-3 \${step >= 2 ? 'text-[#2D241E]' : 'text-muted-foreground opacity-50'}`}>
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center \${step >= 2 ? 'bg-[#2D241E] text-white' : 'border border-[#2D241E] text-[#2D241E]'}`}>2</span>
                                Payment
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
                                            <h2 className="text-3xl font-bold text-[#2D241E]">Shipping Ritual</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">First Name</Label>
                                                <Input placeholder="Anta" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Last Name</Label>
                                                <Input placeholder="Diop" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" />
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Address Line 1</Label>
                                                <Input placeholder="Rue Joseph Gomis, Plateau" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">City</Label>
                                                <Input placeholder="Dakar" className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Country</Label>
                                                <Select defaultValue="senegal">
                                                    <SelectTrigger className="h-14 rounded-2xl border-[#E9E1D6] bg-[#FDFBF7] transition-all focus:bg-white">
                                                        <SelectValue placeholder="Select Country" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl">
                                                        <SelectItem value="senegal">Senegal</SelectItem>
                                                        <SelectItem value="france">France</SelectItem>
                                                        <SelectItem value="usa">USA</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="pt-8 flex flex-col gap-6">
                                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2D241E]">Delivery Speed</h3>
                                            <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Label htmlFor="standard" className="flex items-center justify-between p-6 border border-[#E9E1D6] rounded-2xl cursor-pointer hover:bg-[#FDFBF7] transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <RadioGroupItem value="standard" id="standard" />
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-bold uppercase">Standard Delivery</div>
                                                            <div className="text-xs text-muted-foreground">2-5 Business Days</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-bold">$5.00</div>
                                                </Label>
                                                <Label htmlFor="express" className="flex items-center justify-between p-6 border border-[#E9E1D6] rounded-2xl cursor-pointer hover:bg-[#FDFBF7] transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <RadioGroupItem value="express" id="express" />
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-bold uppercase">Express Ritual</div>
                                                            <div className="text-xs text-muted-foreground">Next Day Delivery</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-bold">$12.00</div>
                                                </Label>
                                            </RadioGroup>
                                        </div>

                                        <div className="pt-10">
                                            <Button onClick={() => setStep(2)} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 text-lg font-bold gap-3 transition-transform active:scale-95 group">
                                                Continue to Payment <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
                                            <h2 className="text-3xl font-bold text-[#2D241E]">Secure Payment</h2>
                                        </div>

                                        <div className="space-y-8 pt-4">
                                            <RadioGroup defaultValue="card" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Label htmlFor="card" className="flex flex-col items-center justify-center gap-4 p-8 border border-[#E9E1D6] rounded-3xl cursor-pointer hover:bg-[#FDFBF7] transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                                    <RadioGroupItem value="card" id="card" className="sr-only" />
                                                    <CreditCard className="w-8 h-8 opacity-60" />
                                                    <div className="text-xs font-bold uppercase tracking-widest leading-tight text-center">Credit Card</div>
                                                </Label>
                                                <Label htmlFor="momo" className="flex flex-col items-center justify-center gap-4 p-8 border border-[#E9E1D6] rounded-3xl cursor-pointer hover:bg-[#FDFBF7] transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                                    <RadioGroupItem value="momo" id="momo" className="sr-only" />
                                                    <Sparkles className="w-8 h-8 text-primary" />
                                                    <div className="text-xs font-bold uppercase tracking-widest leading-tight text-center">Mobile Money</div>
                                                </Label>
                                                <Label htmlFor="paypal" className="flex flex-col items-center justify-center gap-4 p-8 border border-[#E9E1D6] rounded-3xl cursor-pointer hover:bg-[#FDFBF7] transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                                    <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                                    <Lock className="w-8 h-8 text-blue-600" />
                                                    <div className="text-xs font-bold uppercase tracking-widest leading-tight text-center">PayPal Secure</div>
                                                </Label>
                                            </RadioGroup>

                                            <div className="space-y-8 p-10 bg-stone-50 rounded-[2.5rem] border border-stone-100">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Card Number</Label>
                                                    <div className="relative">
                                                        <Input placeholder="0000 0000 0000 0000" className="h-14 rounded-2xl border-[#E9E1D6] pl-12 pr-4 transition-all focus:bg-white" />
                                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Expiry Date</Label>
                                                        <Input placeholder="MM / YY" className="h-14 rounded-2xl border-[#E9E1D6] transition-all focus:bg-white" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">CVC Code</Label>
                                                        <Input placeholder="•••" className="h-14 rounded-2xl border-[#E9E1D6] transition-all focus:bg-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3 pt-4">
                                                <Checkbox id="save" className="rounded-[4px] border-[#E9E1D6] data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                                <Label htmlFor="save" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 italic">
                                                    Save payment information for future rituals.
                                                </Label>
                                            </div>
                                        </div>

                                        <div className="pt-10 flex gap-4">
                                            <Button variant="ghost" onClick={() => setStep(1)} className="h-16 rounded-2xl px-8 font-bold text-muted-foreground gap-2">
                                                <ArrowLeft className="w-4 h-4" /> Back
                                            </Button>
                                            <Button onClick={() => setStep(3)} className="flex-1 h-16 rounded-2xl bg-[#1A1A1A] hover:bg-black text-white shadow-xl text-lg font-bold gap-3 transition-transform active:scale-95 group">
                                                Confirm & Pay ${(total).toFixed(2)} <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
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
                                    <h2 className="text-xl font-bold text-[#2D241E]">Your Selection</h2>
                                    <Link href="/cart" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">Edit Bag</Link>
                                </div>

                                {/* Mini item list */}
                                <div className="space-y-6">
                                    {[
                                        { name: "Pure Shea Butter", price: 24.99, qty: 1, img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=200" },
                                        { name: "Baobab Oil Serum", price: 38.50, qty: 2, img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=200" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                                <Image src={item.img} alt={item.name} fill className="object-cover transition-transform group-hover:scale-110 duration-700" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <h4 className="text-sm font-bold truncate pr-4">{item.name}</h4>
                                                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Qty: {item.qty}</div>
                                                    </div>
                                                    <div className="text-sm font-light text-[#2D241E]">${(item.price * item.qty).toFixed(2)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="bg-border/40" />

                                <div className="space-y-4">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="text-[#2D241E]">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Ritual Shipping</span>
                                        <span className="text-[#2D241E]">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Import Taxes</span>
                                        <span className="text-[#2D241E]">${tax.toFixed(2)}</span>
                                    </div>
                                    <Separator className="bg-border/40" />
                                    <div className="flex justify-between items-end text-[#2D241E]">
                                        <span className="text-sm font-bold tracking-tighter uppercase italic">Total Ritual</span>
                                        <span className="text-4xl font-light tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 flex items-start gap-4">
                                        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <p className="text-xs text-muted-foreground leading-relaxed italic">
                                            By confirming your order, you agree to our <strong>Artisan Ethical Policies</strong> and <strong>Return Guidelines</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Secondary Help Card */}
                        <div className="mt-10 p-10 bg-white border border-[#E9E1D6] rounded-[2.5rem] shadow-sm flex flex-col items-center text-center space-y-4">
                            <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-500"><AlertCircle className="w-6 h-6" /></div>
                            <h3 className="text-sm font-bold uppercase tracking-widest">Need Assistance?</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                                Our ritual experts are available for live consultation if you have questions about your selection.
                            </p>
                            <Button variant="link" className="text-primary font-bold text-xs uppercase tracking-[0.2em] p-0">Call us now</Button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    )
}
