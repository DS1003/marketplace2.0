"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Store, CheckCircle2, Upload, MapPin, Globe,
    Facebook, Instagram, Twitter, ShieldCheck,
    ArrowRight, Sparkles, Send, Info
} from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function BecomeSellerPage() {
    const [step, setStep] = useState(1)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        brandName: "",
        fullName: "",
        email: "",
        location: "",
        bio: "",
        socialLink: "",
        productCategory: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate API call
        setIsSubmitted(true)
        toast.success("Application submitted successfully!")
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#FDFBF7]">
                <Header />
                <div className="pt-40 pb-20 px-4 max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-primary/10 border border-primary/5 space-y-8"
                    >
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold text-[#2D241E]">Application Sent!</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Thank you for your interest in joining Moomel, <span className="font-bold text-primary">{formData.fullName}</span>.
                                Our team will review your brand <span className="font-bold">{formData.brandName}</span> within 24-48 hours.
                            </p>
                            <p className="text-sm text-muted-foreground italic">
                                You will receive an email once your application has been processed.
                            </p>
                        </div>
                        <Button asChild className="rounded-full px-8 h-12">
                            <a href="/marketplace">Return to Marketplace</a>
                        </Button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2D241E]">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-12 md:pt-48 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-4 py-1 rounded-full">Seller Partnership</Badge>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-none italic">
                        Grow Your <span className="text-primary not-italic">Brand</span> With Us
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                        Join the most curated marketplace for Senegalese natural beauty. We help local artisans reach a global audience.
                    </p>
                </motion.div>
            </section>

            {/* Registration Form */}
            <section className="pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                <Card className="rounded-[3rem] overflow-hidden border-none shadow-2xl shadow-primary/5 bg-white relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary/20">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "33%" }}
                            animate={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    <div className="p-8 md:p-16">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                                <Store className="w-8 h-8 text-primary" />
                                                The Basics
                                            </h2>
                                            <p className="text-muted-foreground text-lg">Tell us who you are and what you call your brand.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="fullName" className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                                <Input
                                                    id="fullName"
                                                    name="fullName"
                                                    placeholder="e.g. Anta Diouf"
                                                    className="h-14 rounded-2xl border-primary/10 bg-[#FDFBF7] focus:bg-white"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="email" className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="anta@example.com"
                                                    className="h-14 rounded-2xl border-primary/10 bg-[#FDFBF7] focus:bg-white"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3 md:col-span-2">
                                                <Label htmlFor="brandName" className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Brand Name</Label>
                                                <Input
                                                    id="brandName"
                                                    name="brandName"
                                                    placeholder="What's your brand called?"
                                                    className="h-14 rounded-4xl border-primary/10 bg-[#FDFBF7] focus:bg-white text-xl font-bold"
                                                    value={formData.brandName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <Button type="button" onClick={nextStep} className="rounded-full h-14 px-10 text-lg group">
                                                Next Details <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
                                        className="space-y-8"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                                <Sparkles className="w-8 h-8 text-primary" />
                                                Brand Identity
                                            </h2>
                                            <p className="text-muted-foreground text-lg">Help us understand the soul of your production.</p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label htmlFor="bio" className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Brand Story / Bio</Label>
                                                <Textarea
                                                    id="bio"
                                                    name="bio"
                                                    placeholder="Briefly describe your brand, heritage, and what makes your products unique..."
                                                    className="min-h-[150px] rounded-3xl border-primary/10 bg-[#FDFBF7] focus:bg-white p-4"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-3">
                                                    <Label htmlFor="location" className="font-bold text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" /> Location
                                                    </Label>
                                                    <Input
                                                        id="location"
                                                        name="location"
                                                        placeholder="Dakar, Senegal"
                                                        className="h-14 rounded-2xl border-primary/10 bg-[#FDFBF7] focus:bg-white"
                                                        value={formData.location}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label htmlFor="productCategory" className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Main Category</Label>
                                                    <Input
                                                        id="productCategory"
                                                        name="productCategory"
                                                        placeholder="e.g. Skincare, Oils, Soaps"
                                                        className="h-14 rounded-2xl border-primary/10 bg-[#FDFBF7] focus:bg-white"
                                                        value={formData.productCategory}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="rounded-full h-14 px-6 text-muted-foreground">Back</Button>
                                            <Button type="button" onClick={nextStep} className="rounded-full h-14 px-10 text-lg group">
                                                Final Steps <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold flex items-center gap-3">
                                                <Globe className="w-8 h-8 text-primary" />
                                                Social & Media
                                            </h2>
                                            <p className="text-muted-foreground text-lg">Where can we see your work online?</p>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <Label className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Social Link (Instagram/Facebook)</Label>
                                                <div className="relative">
                                                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                    <Input
                                                        name="socialLink"
                                                        placeholder="https://instagram.com/your-brand"
                                                        className="h-14 pl-12 rounded-2xl border-primary/10 bg-[#FDFBF7] focus:bg-white"
                                                        value={formData.socialLink}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="border-2 border-dashed border-primary/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-primary/5 transition-colors cursor-pointer group">
                                                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Upload className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Upload Logo</p>
                                                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                                                    </div>
                                                </div>
                                                <div className="border-2 border-dashed border-primary/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-primary/5 transition-colors cursor-pointer group">
                                                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Upload className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">Boutique Banner</p>
                                                        <p className="text-xs text-muted-foreground mt-1">High resolution cover image</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-primary/5 rounded-3xl p-6 flex gap-4 items-start">
                                                <div className="p-2 bg-white rounded-xl shadow-sm">
                                                    <Info className="w-5 h-5 text-primary" />
                                                </div>
                                                <p className="text-sm text-[#4A3D36] leading-relaxed">
                                                    By submitting this application, you agree to our <span className="underline font-bold">Seller Terms & Conditions</span>.
                                                    Moomel takes a small commission on sales to cover platform maintenance and marketing.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <Button type="button" variant="ghost" onClick={prevStep} className="rounded-full h-14 px-6 text-muted-foreground">Back</Button>
                                            <Button type="submit" className="rounded-full h-14 px-12 text-lg font-bold bg-[#2D241E] hover:bg-black text-white shadow-2xl">
                                                Submit Application <Send className="w-5 h-5 ml-2" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </Card>
            </section>

            {/* Why Join Section */}
            <section className="bg-[#2D241E] py-24 px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">Quality Trusted</h3>
                        <p className="text-white/60 leading-relaxed font-light">Join a community recognized for its excellence and authentic craftsmanship.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                            <Globe className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">Global Visibility</h3>
                        <p className="text-white/60 leading-relaxed font-light">We handle the marketing and SEO to get your products in front of the right buyers.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                            <Info className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">Seller Support</h3>
                        <p className="text-white/60 leading-relaxed font-light">Access dashboards, insights, and dedicated support to help scale your business.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
