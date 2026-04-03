"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Building2, Camera, CheckCircle2, ChevronRight, 
  MapPin, Phone, Mail, Globe, Save, Loader2, Zap,
  LayoutDashboard, ShieldCheck
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { updateShopProfile, uploadImage } from "@/lib/actions/seller"
import NextImage from "next/image"

export default function SellerSettingsClient({ shop }: { shop: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [shopImage, setShopImage] = useState(shop.image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
        name: formData.get("shopName") as string,
        description: formData.get("shopDescription") as string,
        image: shopImage
    }

    try {
        await updateShopProfile(data)
        toast.success("Profil de boutique mis à jour.")
        router.refresh()
    } catch (error) {
        toast.error("Échec de la mise à jour.")
    } finally {
        setIsLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    
    try {
        const url = await uploadImage(formData)
        setShopImage(url)
        toast.success("Image mise à jour.")
    } catch (err) {
        toast.error("Échec du téléchargement.")
    } finally {
        setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <h2 className="text-xl font-black tracking-tight text-slate-800 uppercase">Paramètres Artisant</h2>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Identité et Configuration du Flux.</p>
          </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Left: Branding */}
            <Card className="md:col-span-1 border-none shadow-sm bg-white rounded-[1.5rem] p-6 flex flex-col items-center text-center">
                <div className="relative group cursor-pointer mb-4" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-50 border-2 border-zinc-50 group-hover:border-teal-500/30 transition-all relative">
                        {shopImage ? (
                            <NextImage src={shopImage} alt={shop.name} fill className="object-cover" />
                        ) : (
                            <Building2 className="w-10 h-10 text-slate-200 m-auto mt-7" />
                        )}
                        {isUploading && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 text-teal-600 animate-spin" />
                            </div>
                        )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                        <Camera className="w-3 h-3" />
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>
                <h3 className="font-black text-[12px] text-slate-800 uppercase tracking-tight mb-1">{shop.name}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">ID Artisan: {shop.id.substring(shop.id.length-6)}</p>
                
                <div className="w-full pt-4 border-t border-zinc-50 space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        <span>Compte Vérifié</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        <span>Statut Boutique</span>
                        <Badge className="rounded-md bg-emerald-500/10 text-emerald-600 border-none px-1.5 py-0 text-[8px] font-black tracking-widest">OUVERT</Badge>
                    </div>
                </div>
            </Card>

            {/* Right: Details Form */}
            <Card className="md:col-span-2 border-none shadow-sm bg-white rounded-[1.5rem] overflow-hidden">
                <CardContent className="p-8 space-y-6">
                    <div className="space-y-2.5">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Manifestation (Nom Boutique)</Label>
                        <Input 
                            name="shopName" 
                            required 
                            defaultValue={shop.name}
                            className="h-11 px-5 rounded-xl border border-zinc-100 bg-slate-50 font-black text-[11px] text-slate-800 uppercase tracking-widest"
                        />
                    </div>

                    <div className="space-y-2.5">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Récit de l'Atelier (Description)</Label>
                        <Textarea 
                            name="shopDescription" 
                            defaultValue={shop.description}
                            className="min-h-[120px] px-5 py-4 rounded-xl border border-zinc-100 bg-white font-bold text-slate-600 text-[11px] resize-none focus:ring-1 focus:ring-teal-500/10"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2.5">
                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Flux de Contact</Label>
                            <Input 
                                disabled
                                placeholder="Email artisan..."
                                defaultValue={shop.owner?.email}
                                className="h-10 px-4 rounded-xl border border-zinc-100 bg-slate-50 font-bold text-[10px] text-slate-400"
                            />
                        </div>
                        <div className="space-y-2.5">
                             <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Signal Téléphonique</Label>
                             <Input 
                                placeholder="+221 ..."
                                className="h-10 px-4 rounded-xl border border-zinc-100 bg-white font-bold text-[10px] animate-pulse-border"
                             />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="h-11 px-8 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-lg shadow-teal-500/10 font-black uppercase tracking-widest text-[10px] border-none"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-3.5 h-3.5 mr-2" /> Synchroniser</>}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Operational Flow */}
        <Card className="border-none shadow-sm bg-[#0F172A] text-white rounded-[1.5rem] p-8 overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-white/5 shadow-inner">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-[12px] font-black uppercase tracking-[0.1em]">Protocoles de Sécurité</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Votre boutique est protégée par le Pare-feu Moomel.</p>
                    </div>
                </div>
                <Button variant="ghost" className="rounded-xl border border-white/10 hover:bg-white/5 text-[9px] font-black uppercase tracking-widest py-6 px-6">
                    Mise à jour du mot de passe
                </Button>
            </div>
        </Card>
      </form>
    </div>
  )
}
