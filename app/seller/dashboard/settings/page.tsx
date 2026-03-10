"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Store, User, Bell, Shield,
    CreditCard, Globe, Camera,
    CheckCircle2, AlertCircle, Save,
    ChevronRight, ExternalLink, Mail,
    MapPin, Instagram, Facebook, Twitter
} from "lucide-react"
import NextImage from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function SellerSettingsPage() {
    const [activeTab, setActiveTab] = useState("store")
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            toast.success("Settings saved successfully!")
        }, 1500)
    }

    const tabs = [
        { id: "store", icon: Store, label: "Store Profile" },
        { id: "account", icon: User, label: "Personal Info" },
        { id: "notifications", icon: Bell, label: "Preferences" },
        { id: "payouts", icon: CreditCard, label: "Banking & Payouts" },
        { id: "security", icon: Shield, label: "Password & Security" },
    ]

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <h2 className="text-5xl font-bold tracking-tight text-[#2D241E]">Store <span className="text-primary italic">Configurations</span></h2>
                    <p className="text-muted-foreground text-xl font-medium">Fine-tune your brand's digital presence and operations.</p>
                </div>
                <Button
                    onClick={handleSave}
                    className="rounded-[1.8rem] h-16 px-10 font-black text-xs uppercase tracking-widest bg-[#2D241E] hover:bg-black text-white shadow-2xl shadow-black/10 transition-all active:scale-95 group"
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                            Optimizing...
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Save className="w-5 h-5 transition-transform group-hover:scale-110" />
                            Synchronize Settings
                        </div>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Vertical Navigation Tabs */}
                <div className="lg:col-span-1 space-y-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-8 py-5 rounded-[1.8rem] transition-all duration-300 font-bold group",
                                activeTab === tab.id
                                    ? "bg-white text-primary shadow-xl shadow-primary/5 ring-1 ring-black/5"
                                    : "text-muted-foreground hover:bg-black/5 hover:text-[#2D241E]"
                            )}
                        >
                            <tab.icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", activeTab === tab.id ? "text-primary scale-110" : "text-muted-foreground")} />
                            {tab.label}
                            {activeTab === tab.id && <ChevronRight className="ml-auto w-5 h-5 animate-pulse" />}
                        </button>
                    ))}

                    <Card className="mt-12 rounded-[2.5rem] border-none shadow-xl shadow-black/5 bg-primary p-8 text-white relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative space-y-4">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold italic leading-tight">Live Store Preview</h3>
                            <p className="text-white/60 text-sm font-medium">Instantly see how your customers see your boutique.</p>
                            <Button variant="ghost" className="w-full mt-4 justify-between bg-white/10 hover:bg-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl h-12 px-6">
                                Launch Site <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Main Settings Form Container */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            {activeTab === 'store' && (
                                <Card className="rounded-[3.5rem] border-none shadow-2xl shadow-black/5 bg-white p-12 space-y-12">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-[#2D241E] italic">Store <span className="text-primary not-italic">Identity</span></h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed">Update your public profile, banner images, and contact information.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4 flex flex-col items-center justify-center p-8 bg-[#FDFBF7] rounded-[2.5rem] border-2 border-dashed border-border group cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                                            <div className="relative h-40 w-40">
                                                <div className="h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white transition-transform group-hover:scale-105 duration-500">
                                                    <NextImage src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=200" alt="Store Logo" fill className="object-cover" />
                                                </div>
                                                <div className="absolute -bottom-2 -right-2 bg-primary w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-white ring-4 ring-white animate-bounce-slow">
                                                    <Camera className="w-6 h-6" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="font-black text-sm uppercase tracking-widest">Master Logo</p>
                                                <p className="text-xs text-muted-foreground">Recommend 512x512 PNG</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 flex flex-col items-center justify-center p-8 bg-[#FDFBF7] rounded-[2.5rem] border-2 border-dashed border-border group cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all">
                                            <div className="relative h-40 w-full">
                                                <div className="h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative border-4 border-white transition-transform group-hover:scale-105 duration-500">
                                                    <NextImage src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400" alt="Banner" fill className="object-cover" />
                                                </div>
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="font-black text-sm uppercase tracking-widest">Hero Banner</p>
                                                <p className="text-xs text-muted-foreground">Landscape hi-res image</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                                        <div className="space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Brand Display Name</Label>
                                            <Input defaultValue="Koba Skin Care" className="h-16 rounded-[1.5rem] border-none bg-[#F8F9FA] shadow-inner px-8 text-lg font-bold focus-visible:ring-primary/20" />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Primary Category</Label>
                                            <Input defaultValue="Organic Cosmetics" className="h-16 rounded-[1.5rem] border-none bg-[#F8F9FA] shadow-inner px-8 text-lg font-bold focus-visible:ring-primary/20" />
                                        </div>
                                        <div className="md:col-span-2 space-y-3">
                                            <Label className="font-extrabold text-xs uppercase tracking-[0.3em] text-muted-foreground px-4">Brand Story & Mission</Label>
                                            <Textarea
                                                defaultValue="Crafting pure beauty with artisanal wisdom. Our products are sourced directly from West African fields, bringing the sun's magic to your skin."
                                                className="min-h-[150px] rounded-[2rem] border-none bg-[#F8F9FA] shadow-inner p-8 text-lg font-medium leading-relaxed focus-visible:ring-primary/20"
                                            />
                                        </div>
                                    </div>

                                    <Separator className="bg-border/40" />

                                    <div className="space-y-8">
                                        <h4 className="text-xl font-black text-[#2D241E] flex items-center gap-3"><Globe className="w-6 h-6 text-primary" /> Global Presence</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <SocialField icon={Instagram} label="Instagram Handle" value="@koba_skin_sn" />
                                            <SocialField icon={Facebook} label="Facebook Page" value="fb.com/koba-skin" />
                                            <SocialField icon={Twitter} label="Twitter / X" value="@kobaskin_official" />
                                            <SocialField icon={MapPin} label="Physical Studio" value="Les Almadies, Dakar, SN" />
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {activeTab === 'notifications' && (
                                <Card className="rounded-[3.5rem] border-none shadow-2xl shadow-black/5 bg-white p-12 space-y-12">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-[#2D241E] italic">Preference <span className="text-primary not-italic">Control</span></h3>
                                        <p className="text-muted-foreground text-lg">Define how and when you receive critical platform updates.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <PreferenceSwitch
                                            label="Instant Sales Alerts"
                                            desc="Get notified immediately when someone places an order."
                                            active={true}
                                        />
                                        <PreferenceSwitch
                                            label="Weekly Insights Report"
                                            desc="Receive a summary of your store's performance every Monday."
                                            active={true}
                                        />
                                        <PreferenceSwitch
                                            label="Stock Level Warnings"
                                            desc="Alerts for products with less than 5 units remaining."
                                            active={false}
                                        />
                                        <PreferenceSwitch
                                            label="Customer Reviews"
                                            desc="Be notified when a customer leaves a new rating or comment."
                                            active={true}
                                        />
                                        <PreferenceSwitch
                                            label="Global Marketing Mails"
                                            desc="Receive tips and marketing trends from Moomel network."
                                            active={false}
                                        />
                                    </div>

                                    <div className="bg-[#2D241E] rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                                        <div className="h-20 w-20 rounded-3xl bg-primary/20 flex items-center justify-center flex-shrink-0 backdrop-blur-xl">
                                            <Shield className="w-10 h-10 text-primary" />
                                        </div>
                                        <div className="flex-grow space-y-2 text-center md:text-left">
                                            <h4 className="text-2xl font-bold italic">Identity <span className="text-primary not-italic">Verification</span></h4>
                                            <p className="text-white/60 font-medium">Your account is currently <span className="text-green-500 font-black">FULLY VERIFIED</span>. You can manage $10k+ in monthly transactions.</p>
                                        </div>
                                        <Button className="rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest bg-white text-[#2D241E] hover:bg-primary hover:text-white transition-all">Verify Levels</Button>
                                    </div>
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

function SocialField({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="space-y-2 group">
            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-focus-within:text-primary transition-colors px-4">{label}</Label>
            <div className="relative">
                <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input defaultValue={value} className="h-16 pl-16 rounded-2xl border-none bg-[#F8F9FA] shadow-inner font-bold text-[#2D241E] focus-visible:ring-primary/20" />
            </div>
        </div>
    )
}

function PreferenceSwitch({ label, desc, active }: { label: string, desc: string, active: boolean }) {
    return (
        <div className="flex items-center justify-between p-8 rounded-[2rem] bg-white border border-border/40 hover:border-primary/20 hover:shadow-xl shadow-black/5 transition-all group">
            <div className="space-y-1 pr-10">
                <h5 className="text-xl font-bold text-[#2D241E] group-hover:text-primary transition-colors">{label}</h5>
                <p className="text-sm text-muted-foreground font-medium">{desc}</p>
            </div>
            <Switch defaultChecked={active} className="scale-125 data-[state=checked]:bg-primary" />
        </div>
    )
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ')
}
