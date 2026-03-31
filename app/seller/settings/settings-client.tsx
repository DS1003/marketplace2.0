"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Store, MapPin, Globe, Camera, 
  Trash2, Shield, Bell, CreditCard,
  Save, ChevronRight, User, Mail,
  Phone, Briefcase, CameraIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function SellerSettingsClient({ shop }: { shop: any }) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
        setIsSaving(false)
        toast.success("Boutique identity alignment synchronized.")
    }, 1500)
  }

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-[#2D241E]">Lab Settings</h2>
          <p className="text-muted-foreground mt-2 font-light">Evolve your artisanal identity and technical preferences.</p>
        </div>
        <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-[#2D241E] hover:bg-black text-white h-12 px-8 rounded-2xl shadow-xl shadow-black/10 transition-all active:scale-95 group font-bold uppercase tracking-widest text-[10px]"
        >
            {isSaving ? (
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Synchronizing...
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" /> Save Configuration
                </div>
            )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Sidebar Nav */}
          <div className="md:col-span-1 space-y-2">
              {[
                  { id: 'identity', icon: Store, label: 'Identity & Brand' },
                  { id: 'profile', icon: User, label: 'Artisan Profile' },
                  { id: 'ops', icon: Briefcase, label: 'Operations' },
                  { id: 'notifications', icon: Bell, label: 'Sensory Alerts' },
                  { id: 'security', icon: Shield, label: 'Security' },
                  { id: 'payment', icon: CreditCard, label: 'Commerce Strategy' }
              ].map((item) => (
                  <Button 
                    key={item.id}
                    variant="ghost" 
                    className={`w-full justify-between h-14 rounded-2xl px-6 font-bold uppercase tracking-widest text-[10px] group transition-all duration-300 ${item.id === 'identity' ? 'bg-[#2D241E] text-white shadow-xl shadow-[#2D241E]/10' : 'hover:bg-[#2D241E]/5 text-[#2D241E]/60'}`}
                  >
                    <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </div>
                    <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-all ${item.id === 'identity' ? 'opacity-100' : ''}`} />
                  </Button>
              ))}
          </div>

          {/* Main Form */}
          <div className="md:col-span-2 space-y-8">
              <Card className="border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                      <CardTitle className="text-xl font-bold text-[#2D241E]">Identity & Brand</CardTitle>
                      <CardDescription className="font-light">Manifest your boutique's visual and textual essence.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-8">
                      {/* Brand Logo Card */}
                      <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#2D241E]/[0.02] border border-[#2D241E]/5 group transition-colors hover:bg-white shadow-sm">
                          <div className="relative">
                            <Avatar className="h-24 w-24 border-4 border-white shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
                                <AvatarImage src={shop.image || ""} />
                                <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl rounded-none">
                                    {shop.name?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <Button size="icon" className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-[#2D241E] hover:bg-black border-4 border-white">
                                <CameraIcon className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                          <div className="space-y-1">
                              <h4 className="font-bold text-sm text-[#2D241E]">Brand Signature</h4>
                              <p className="text-xs text-muted-foreground font-light max-w-[200px]">Optimal dimension 400x400px. Minimal textures preferred.</p>
                              <div className="flex gap-2 mt-3">
                                  <Button variant="outline" size="sm" className="h-8 px-4 rounded-full text-[10px] uppercase font-bold tracking-widest border-[#2D241E]/20 text-[#2D241E]">Upload</Button>
                                  <Button variant="ghost" size="sm" className="h-8 px-4 rounded-full text-[10px] uppercase font-bold tracking-widest text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
                              </div>
                          </div>
                      </div>

                      <div className="space-y-6">
                          <div className="space-y-2">
                              <label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-widest ml-4">Boutique Name</label>
                              <Input 
                                defaultValue={shop.name} 
                                className="h-14 px-6 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light text-[#2D241E]"
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-widest ml-4">Manifesto (Bio)</label>
                              <Textarea 
                                defaultValue={shop.description} 
                                placeholder="Describe the soul of your artisanal enterprise..."
                                className="min-h-[120px] px-6 py-4 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light text-[#2D241E] resize-none"
                              />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-widest ml-4">Origin (Location)</label>
                                  <div className="relative">
                                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input 
                                        defaultValue="Dakar, Senegal" 
                                        className="h-14 pl-12 pr-6 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light text-[#2D241E]"
                                      />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-[10px] font-bold text-[#2D241E] uppercase tracking-widest ml-4">Digital Domain</label>
                                  <div className="relative">
                                      <Globe className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                      <Input 
                                        defaultValue="moomel.co/shop" 
                                        className="h-14 pl-12 pr-6 rounded-2xl border-none bg-white shadow-xl shadow-black/5 font-light text-[#2D241E]"
                                      />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </CardContent>
              </Card>

              {/* Notification Toggles */}
              <Card className="border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] p-8 space-y-6">
                   <div className="flex items-center gap-3 mb-2">
                       <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                           <Bell className="h-5 w-5" />
                       </div>
                       <div>
                           <h4 className="font-bold text-[#2D241E] text-base">Sensory Alerts</h4>
                           <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-light">Configure how you receive ritual triggers.</p>
                       </div>
                   </div>
                   <div className="space-y-4 pt-2">
                       {[
                           { label: "New Ritual Acquisition", desc: "Notify when a community member claims a product.", active: true },
                           { label: "Community Manifesto", desc: "Notify when you receive a message ritual.", active: true },
                           { label: "Manifesto Reviews", desc: "Notify when a ritual review is manifested.", active: false }
                       ].map((item, idx) => (
                           <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#2D241E]/5 shadow-sm hover:shadow-md transition-all">
                               <div className="space-y-1">
                                   <p className="text-sm font-bold text-[#2D241E]">{item.label}</p>
                                   <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
                               </div>
                               <Switch defaultChecked={item.active} className="data-[state=checked]:bg-[#2D241E]" />
                           </div>
                       ))}
                   </div>
              </Card>
          </div>
      </div>
    </div>
  )
}
