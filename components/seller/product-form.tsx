"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Plus, X, Image as ImageIcon, CheckCircle2, 
  Leaf, Info, AlertCircle, ChevronLeft, Save,
  UploadCloud, Loader2
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
import { createProduct, uploadImage } from "@/lib/actions/seller"

export default function ProductForm({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
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
        stock: parseInt(formData.get("inventory") as string) || 0
    }

    try {
        await createProduct(data)
        toast.success("Votre création a été ajoutée avec succès.")
        router.push("/seller/products")
        router.refresh()
    } catch (error) {
        toast.error("Échec de la publication du rituel. Veuillez réessayer.")
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
            toast.error("Vous pouvez sélectionner un maximum de 5 images.")
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
    <form onSubmit={handleSubmit} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Essential Sensory Info */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
            <CardContent className="p-10 space-y-8">
                <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-[0.3em] ml-4">Nom de la Création</Label>
                    <Input 
                        name="name" 
                        required 
                        placeholder="ex: Essence Eclat de Baobab" 
                        className="h-16 px-8 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light text-lg text-[#2D241E]"
                    />
                </div>

                <div className="space-y-4">
                    <Label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-[0.3em] ml-4">Description Narrative</Label>
                    <Textarea 
                        name="description" 
                        required 
                        placeholder="Racontez l'histoire et l'âme de cette création..."
                        className="min-h-[200px] px-8 py-6 rounded-3xl border-none bg-white shadow-xl shadow-black/5 font-light text-[#2D241E] resize-none text-base"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-[0.3em] ml-4">Prix de Vente (FCFA)</Label>
                        <Input 
                            name="price" 
                            type="number" 
                            step="0.01" 
                            required 
                            placeholder="0.00" 
                            className="h-16 px-8 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light text-lg"
                        />
                    </div>
                    <div className="space-y-4">
                        <Label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-[0.3em] ml-4">Catégorie</Label>
                        <Select name="categoryId" required>
                            <SelectTrigger className="h-16 px-8 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light">
                                <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-none shadow-2xl p-2">
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id} className="rounded-xl py-3 focus:bg-[#2D241E]/5">
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
          </Card>

          {/* Visual Manifestation Section */}
          <Card className="border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-10 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                     <Label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-[0.3em]">Héritage Visuel</Label>
                     <p className="text-xs text-muted-foreground font-light mt-1">Ajoutez jusqu'à 5 images de haute qualité.</p>
                </div>
                <Badge variant="outline" className="rounded-full border-[#2D241E]/10 bg-[#2D241E]/5 text-[#2D241E]">
                   <ImageIcon className="w-3 h-3 mr-1" /> {images.length} / 5
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
                className={`w-full h-32 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-colors group ${
                  images.length >= 5 ? 'border-gray-200 cursor-not-allowed opacity-50' : 'border-[#2D241E]/30 cursor-pointer hover:bg-white/80 hover:border-[#2D241E]/60 bg-white/40 shadow-inner'
                }`}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center opacity-70">
                        <Loader2 className="h-8 w-8 text-[#2D241E] animate-spin mb-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">Synchronisation en cours...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center opacity-50 group-hover:opacity-100 transition-opacity">
                        <UploadCloud className="h-8 w-8 text-[#2D241E] mb-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2D241E]">Parcourir ou Déposer</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                <AnimatePresence>
                    {images.map((img, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl shadow-black/10 group ring-1 ring-black/5"
                        >
                            <img src={img} alt="Product preview" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-[#2D241E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                <Button 
                                    type="button" 
                                    size="icon" 
                                    variant="ghost" 
                                    onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                    className="text-white hover:text-rose-400 hover:bg-white/20 rounded-full h-10 w-10 transition-transform active:scale-90"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                    {images.length === 0 && (
                        <div className="col-span-full py-4 text-center">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-50">Aucune image sélectionnée</span>
                        </div>
                    )}
                </AnimatePresence>
            </div>
          </Card>
        </div>

        {/* Right: Technical Metadata */}
        <div className="space-y-8">
            <Card className="border-none shadow-2xl shadow-black/5 bg-[#2D241E] text-white rounded-[2.5rem] p-8 space-y-6">
                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">Statut & Visibilité</h4>
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10">
                        <div className="space-y-1">
                            <p className="text-sm font-bold">Boutique Publique</p>
                            <p className="text-[10px] opacity-60 font-light">Visible par la communauté Moomel</p>
                        </div>
                        <Switch className="data-[state=checked]:bg-emerald-500" defaultChecked />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">Validation Artisanale</h4>
                    <div className="flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10">
                        <div className="space-y-1 flex items-center gap-2">
                            <Leaf className="h-4 w-4 text-emerald-400" />
                            <div>
                                <p className="text-sm font-bold">Certification Bio</p>
                                <p className="text-[10px] opacity-60 font-light">Origine naturelle vérifiée</p>
                            </div>
                        </div>
                        <Switch name="isOrganic" value="true" className="data-[state=checked]:bg-emerald-500" />
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                    <Label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Stock Initial</Label>
                    <Input 
                        name="inventory" 
                        type="number" 
                        required
                        placeholder="Quantité disponible" 
                        className="h-14 px-6 rounded-2xl border-none bg-white font-light text-[#2D241E] shadow-xl"
                    />
                </div>
            </Card>

            <Card className="border-none shadow-xl shadow-black/5 bg-white/50 backdrop-blur-md rounded-[2.5rem] p-8">
                <div className="flex items-center gap-3 text-amber-600 mb-4">
                    <Info className="h-5 w-5" />
                    <h4 className="text-xs font-bold uppercase tracking-widest">Conseil d'Artisan</h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-500 font-light italic">
                    Une histoire engageante augmente l'intérêt pour votre rituel. Utilisez des descriptions évocatrices pour faire ressentir l'âme de votre création.
                </p>
            </Card>

            <div className="flex flex-col gap-3">
                 <Button 
                    type="submit" 
                    disabled={isLoading || isUploading}
                    className="w-full h-16 bg-[#2D241E] hover:bg-black text-white rounded-2xl shadow-xl shadow-[#2D241E]/20 transition-all active:scale-95 font-bold uppercase tracking-widest text-xs"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publier le Rituel"}
                </Button>
                <Button 
                    type="button" 
                    onClick={() => router.back()}
                    variant="ghost" 
                    className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-muted-foreground hover:bg-black/5"
                >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Retour à l'Espace
                </Button>
            </div>
        </div>
      </div>
    </form>
  )
}
