"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Plus, Upload, X, ChevronRight,
    ArrowLeft, Check, Sparkles, Image as ImageIcon,
    Tag, Package, Info, DollarSign, Layout
} from "lucide-react"
import Link from "next/link"
import NextImage from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function AddProductPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const nextStep = () => setStep(s => s + 1)
    const prevStep = () => setStep(s => s - 1)

    const handleSubmit = () => {
        setIsSubmitting(true)
        setTimeout(() => {
            setIsSubmitting(false)
            toast.success("Product published successfully!")
            router.push("/seller/dashboard/products")
        }, 2000)
    }

    const handleImageUpload = () => {
        // Mock upload
        const mockImages = [
            "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400",
            "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400"
        ]
        setImages([...images, mockImages[images.length % 2]])
    }

    const steps = [
        { id: 1, label: "Basic Info", icon: Info },
        { id: 2, label: "Media & Pricing", icon: ImageIcon },
        { id: 3, label: "Detailed View", icon: Layout },
    ]

    return (
        <div className="max-w-5xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/seller/dashboard/products">
                        <Button variant="ghost" size="icon" className="rounded-2xl h-14 w-14 bg-white shadow-sm hover:bg-black hover:text-white transition-all">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Create Product</h2>
                        <p className="text-muted-foreground text-lg italic">Add its magic to the marketplace.</p>
                    </div>
                </div>

                {/* Stepper Display */}
                <div className="hidden md:flex items-center gap-4 bg-white/70 backdrop-blur-md rounded-3xl p-2 pr-8 shadow-sm border border-border/40">
                    {steps.map((s, i) => (
                        <div key={s.id} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${step >= s.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>
                                {step > s.id ? <Check className="w-5 h-5 font-bold" /> : <s.icon className="w-5 h-5" />}
                            </div>
                            {i < steps.length - 1 && <div className={`w-8 h-1 rounded-full ${step > s.id ? 'bg-primary' : 'bg-muted'}`} />}
                        </div>
                    ))}
                    <div className="ml-4">
                        <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Current Stage</p>
                        <p className="text-sm font-bold text-[#2D241E]">{steps[step - 1].label}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Form Area */}
                <div className="lg:col-span-2 space-y-8">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <Card className="p-10 rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white space-y-8">
                                    <div className="space-y-3">
                                        <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Product Name</Label>
                                        <Input placeholder="e.g. Pure Artisanal Shea Butter" className="h-16 rounded-[1.5rem] border-none bg-[#F8F9FA] shadow-inner px-8 text-lg font-bold focus-visible:ring-primary/20" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Category</Label>
                                            <Select>
                                                <SelectTrigger className="h-16 rounded-[1.5rem] border-none bg-[#F8F9FA] shadow-inner px-8 text-lg font-bold focus:ring-primary/20">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-none shadow-2xl">
                                                    <SelectItem value="skincare">Skincare</SelectItem>
                                                    <SelectItem value="haircare">Haircare</SelectItem>
                                                    <SelectItem value="oils">Essential Oils</SelectItem>
                                                    <SelectItem value="soaps">Natural Soaps</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Brand / Collection</Label>
                                            <Input disabled defaultValue="Koba Skin Care" className="h-16 rounded-[1.5rem] border-none bg-muted px-8 text-lg font-bold opacity-60" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Short Teaser Description</Label>
                                        <Textarea placeholder="Describe the soul of this product in 2 sentences..." className="min-h-[120px] rounded-[2rem] border-none bg-[#F8F9FA] shadow-inner p-8 text-lg font-medium leading-relaxed focus-visible:ring-primary/20" />
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <Card className="p-10 rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white space-y-10">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Product Gallery</Label>
                                            <span className="text-xs font-bold text-primary">Up to 5 images</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                            {images.map((img, i) => (
                                                <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden border-2 border-white shadow-xl group">
                                                    <NextImage src={img} alt="Preview" fill className="object-cover transition-all group-hover:scale-110" />
                                                    <button
                                                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                            {images.length < 5 && (
                                                <button
                                                    onClick={handleImageUpload}
                                                    className="aspect-square rounded-[2rem] border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 bg-[#F8F9FA] hover:bg-primary/5 hover:border-primary/30 transition-all group"
                                                >
                                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all">
                                                        <Plus className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Upload Image</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <Separator className="bg-border/40" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4 text-primary">Price (FCFA)</Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                                                <Input type="number" placeholder="0.00" className="h-16 pl-16 rounded-[1.5rem] border-none bg-primary/5 shadow-inner text-xl font-black text-primary border-2 border-primary/10" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Initial Stock</Label>
                                            <div className="relative">
                                                <Package className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                                                <Input type="number" placeholder="50" className="h-16 pl-16 rounded-[1.5rem] border-none bg-[#F8F9FA] shadow-inner text-xl font-bold" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <Card className="p-10 rounded-[3rem] border-none shadow-2xl shadow-black/5 bg-white space-y-8">
                                    <div className="space-y-3">
                                        <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Full Product Story</Label>
                                        <Textarea placeholder="Tell the customer about the heritage, ingredients, and soul of this product..." className="min-h-[250px] rounded-[2rem] border-none bg-[#F8F9FA] shadow-inner p-10 text-lg font-medium leading-relaxed focus-visible:ring-primary/20" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3 text-center p-8 bg-green-50/30 rounded-[2.5rem] border border-green-500/20">
                                            <Sparkles className="w-10 h-10 text-green-500 mx-auto mb-4" />
                                            <h4 className="font-black text-xs uppercase tracking-widest text-green-600 mb-2">Automagic SEO</h4>
                                            <p className="text-sm text-green-800/60 font-medium">We'll automatically optimize your listing for search engines.</p>
                                        </div>
                                        <div className="space-y-3 text-center p-8 bg-primary/10 rounded-[2.5rem] border border-primary/20">
                                            <Tag className="w-10 h-10 text-primary mx-auto mb-4" />
                                            <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-2">Smart Tags</h4>
                                            <p className="text-sm text-primary/60 font-medium">Auto-tags will be applied based on your description.</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-6">
                        <Button
                            variant="ghost"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="rounded-2xl h-14 px-8 font-black text-xs uppercase tracking-widest disabled:opacity-0 transition-all text-muted-foreground hover:bg-black/5"
                        >
                            Back
                        </Button>
                        {step < 3 ? (
                            <Button
                                onClick={nextStep}
                                className="rounded-[1.8rem] h-16 px-10 gap-3 bg-[#2D241E] hover:bg-black text-white shadow-2xl shadow-black/10 transition-all active:scale-95 text-xs font-black uppercase tracking-widest"
                            >
                                Continue Details <ChevronRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="rounded-[1.8rem] h-16 px-12 gap-3 bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 transition-all active:scale-95 text-xs font-black uppercase tracking-widest"
                            >
                                {isSubmitting ? "Magic in progress..." : "Publish Product Now"}
                            </Button>
                        )}
                    </div>
                </div>

                {/* Live Preview Sidebar */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-[#2D241E] italic">Live <span className="text-primary not-italic">Preview</span></h3>
                    <Card className="rounded-[3rem] border-none shadow-2xl shadow-black/10 bg-white overflow-hidden p-0 group sticky top-32">
                        <div className="aspect-[4/5] relative overflow-hidden">
                            {images.length > 0 ? (
                                <NextImage src={images[0]} alt="Preview" fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-[#F8F9FA] flex flex-col items-center justify-center p-12 text-center space-y-6">
                                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center shadow-xl">
                                        <ImageIcon className="w-10 h-10 text-muted-foreground/30 font-bold" />
                                    </div>
                                    <p className="font-bold text-muted-foreground/50 italic leading-relaxed">Your product visuals will appear here...</p>
                                </div>
                            )}
                            <div className="absolute top-6 left-6">
                                <Badge className="bg-white/90 backdrop-blur-md text-[#2D241E] border-none font-black text-[10px] tracking-widest uppercase py-1.5 px-4 shadow-xl">New Arrival</Badge>
                            </div>
                        </div>
                        <div className="p-10 space-y-6 bg-white">
                            <div className="space-y-2">
                                <p className="text-[10px] uppercase font-black tracking-widest text-primary">Koba Skin Care</p>
                                <h4 className="text-3xl font-black text-[#2D241E]">Artisanal Shea...</h4>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                <p className="text-2xl font-black text-primary">00,000 FCFA</p>
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-muted overflow-hidden">
                                            <NextImage src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="avatar" width={40} height={40} />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-4 border-white bg-primary flex items-center justify-center text-[10px] font-black text-white">
                                        +5
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
