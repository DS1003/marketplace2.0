"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Plus, X, Image as ImageIcon, CheckCircle2, 
  Leaf, Info, AlertCircle, ChevronLeft, Save,
  UploadCloud, Loader2, Zap, ArrowRight,
  TrendingUp, Package
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createProduct, updateProduct, uploadImage } from "@/lib/actions/seller"
import { cn } from "@/lib/utils"

export default function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        categoryId: formData.get("categoryId") as string,
        images: images,
        stock: parseInt(formData.get("inventory") as string) || 0,
        status: formData.get("status") === "on" ? "ACTIVE" : "SUSPENDED"
    }

    try {
        if (initialData) {
            await updateProduct(initialData.id, data)
            toast.success("Mise à jour effectuée avec succès.")
        } else {
            await createProduct(data)
            toast.success("Votre création a été ajoutée avec succès.")
        }
        router.push("/seller/products")
        router.refresh()
    } catch (error) {
        toast.error("Une erreur s'est produite. Veuillez réessayer.")
    } finally {
        setIsLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    
    setIsUploading(true)
    for (let i = 0; i < files.length; i++) {
        if (images.length + i >= 5) {
            toast.error("Maximum 5 images autorisées.")
            break
        }
        const file = files[i]
        const formData = new FormData()
        formData.append("file", file)
        try {
            const url = await uploadImage(formData)
            setImages(prev => [...prev, url])
        } catch(err) {
            toast.error(`Échec du téléchargement pour ${file.name}`)
        }
    }
    setIsUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <div className="flex items-center gap-2 mb-8">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="h-9 w-9 rounded-xl hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
          </Button>
          <div>
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                {initialData ? "Modifier le Rituel" : "Nouveau Rituel"}
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic flex items-center gap-2 mt-0.5">
                <Zap className="w-2.5 h-2.5 text-teal-600" /> Identification du flux artisanal dans le protocole Moomel.
            </p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm bg-white rounded-[1.5rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
                <div className="space-y-2.5">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" /> Désignation de la Création
                    </Label>
                    <Input 
                        name="name" 
                        required 
                        defaultValue={initialData?.name}
                        placeholder="ex: Essence Eclat de Baobab" 
                        className="h-12 px-6 rounded-xl border border-zinc-100 bg-slate-50 font-black text-[12px] text-slate-800 uppercase tracking-widest placeholder:text-slate-200"
                    />
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-teal-600" /> Description Narrative
                    </Label>
                    <Textarea 
                        name="description" 
                        required 
                        defaultValue={initialData?.description}
                        placeholder="Racontez l'âme et la composition de ce rituel..."
                        className="min-h-[160px] px-6 py-5 rounded-2xl border border-zinc-100 bg-white font-bold text-slate-700 text-[12px] resize-none focus:ring-1 focus:ring-teal-500/10 placeholder:text-slate-200"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2.5">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center gap-2">
                            Valeur Commerciale (FCFA)
                        </Label>
                        <Input 
                            name="price" 
                            type="number" 
                            step="0.01" 
                            required 
                            defaultValue={initialData?.price}
                            placeholder="0.00" 
                            className="h-12 px-6 rounded-xl border border-zinc-100 bg-slate-50 font-black text-[12px] text-teal-600"
                        />
                    </div>
                    <div className="space-y-2.5">
                        <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Ségment Catégoriel</Label>
                        <Select name="categoryId" defaultValue={initialData?.categoryId} required>
                            <SelectTrigger className="h-12 px-6 rounded-xl border border-zinc-100 bg-slate-50 font-black text-[10px] uppercase tracking-widest">
                                <SelectValue placeholder="Choisir" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl p-1 border-zinc-100">
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id} className="rounded-lg py-2 focus:bg-slate-50 text-[10px] font-black uppercase tracking-widest">
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
          </Card>

          {/* Media Section */}
          <Card className="border-none shadow-sm bg-white rounded-[1.5rem] p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                     <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Manifestation Visuelle</Label>
                     <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">Images haute définition requises (Format 1:1 idéal).</p>
                </div>
                <Badge className="rounded-lg bg-slate-50 text-slate-400 border border-zinc-100 px-2 py-0.5 text-[9px] font-black">
                   {images.length} / 5
                </Badge>
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                multiple 
                className="hidden" 
            />

            <div 
                onClick={() => !isUploading && images.length < 5 && fileInputRef.current?.click()}
                className={cn(
                    "w-full h-24 border border-dashed rounded-2xl flex flex-col items-center justify-center transition-all group",
                    images.length >= 5 ? 'border-zinc-50 cursor-not-allowed opacity-20' : 'border-zinc-200 cursor-pointer hover:bg-slate-50 hover:border-teal-500/30'
                )}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="h-5 w-5 text-teal-600 animate-spin mb-2" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-teal-600">Uploading Signal...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <UploadCloud className="h-6 w-6 text-slate-400 mb-2 group-hover:text-teal-600" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-teal-600">Lier des images</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-5 gap-3">
                <AnimatePresence>
                    {images.map((img, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative aspect-square rounded-xl overflow-hidden bg-white border border-zinc-100 group shadow-sm"
                        >
                            <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button 
                                    type="button" 
                                    size="icon" 
                                    variant="ghost" 
                                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                    className="text-white hover:text-white hover:bg-rose-500 rounded-lg h-7 w-7 transition-all"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    {Array.from({ length: 5 - images.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="aspect-square rounded-xl bg-slate-50 border border-transparent flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-slate-100" />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
          </Card>
        </div>

        {/* Right: Management Data */}
        <div className="space-y-6">
            <Card className="border-none shadow-sm bg-[#0F172A] text-white rounded-[1.5rem] p-6 space-y-6 relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-teal-500/10 blur-3xl rounded-full" />
                
                <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/5 font-black uppercase tracking-[0.2em] text-[9px] text-teal-400">
                        <CheckCircle2 className="w-3 h-3" /> État du Protocole
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-tight">Accessibilité</p>
                            <p className="text-[8px] opacity-40 font-bold uppercase tracking-widest mt-0.5">Visibilité Moomel</p>
                        </div>
                        <Switch name="status" defaultChecked={initialData?.status !== "SUSPENDED"} className="data-[state=checked]:bg-teal-500" />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 opacity-50">
                        <div>
                            <p className="text-[11px] font-black uppercase tracking-tight">Certification Bio</p>
                            <p className="text-[8px] opacity-40 font-bold uppercase tracking-widest mt-0.5">Preuve Moomel Req.</p>
                        </div>
                        <Switch disabled className="data-[state=checked]:bg-teal-500" />
                    </div>
                </div>

                <div className="space-y-2.5 pt-2 relative z-10">
                    <Label className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] ml-2">Inventaire Disponible</Label>
                    <Input 
                        name="inventory" 
                        type="number" 
                        required
                        defaultValue={initialData?.stock}
                        placeholder="Nombre d'unités..." 
                        className="h-11 px-4 rounded-xl border-none bg-white font-black text-[11px] text-slate-800 shadow-xl"
                    />
                </div>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-[1.5rem] p-6">
                <div className="flex items-center gap-3 text-teal-600 mb-3">
                    <Info className="h-4 w-4" />
                    <h4 className="text-[9px] font-black uppercase tracking-widest">Guide Artisan</h4>
                </div>
                <p className="text-[10px] leading-relaxed text-slate-400 font-bold uppercase tracking-tight opacity-70 italic">
                    Un récit évocateur augmente l'interaction de 45%. Détaillez la source de vos ingrédients ou le temps de fabrication.
                </p>
            </Card>

            <div className="flex flex-col gap-3">
                 <Button 
                    type="submit" 
                    disabled={isLoading || isUploading}
                    className="w-full h-14 bg-teal-600 hover:bg-teal-700 text-white rounded-xl shadow-xl shadow-teal-500/10 transition-all active:scale-[0.98] font-black uppercase tracking-widest text-[10px] border-none"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                        <div className="flex items-center gap-2">
                             {initialData ? "Mettre à jour" : "Lancer le Rituel"} <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    )}
                </Button>
                <Button 
                    type="button" 
                    onClick={() => router.back()}
                    variant="ghost" 
                    className="w-full h-11 rounded-xl font-black uppercase tracking-widest text-[9px] text-slate-400 hover:bg-slate-50 transition-colors"
                >
                    Renoncer
                </Button>
            </div>
        </div>
      </div>
    </form>
  )
}
