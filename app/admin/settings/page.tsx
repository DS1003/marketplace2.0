"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  CreditCard, 
  CheckCircle, 
  Smartphone,
  Save,
  Lock,
  Mail,
  MoreVertical,
  ChevronRight,
  LogOut,
  SlidersHorizontal,
  Palette
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "general", label: "General", icon: SlidersHorizontal },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Alerts", icon: Bell },
  { id: "branding", label: "Design", icon: Palette },
  { id: "api", label: "Engine", icon: Database },
]

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Engine</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Global configuration and platform fine-tuning.</p>
        </div>
        <Button className="h-10 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm hover:translate-y-[-1px] transition-all">
           <Save className="mr-2 h-3.5 w-3.5" /> Save Configuration
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav - Slimmer */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-200/50 shadow-sm sticky top-24 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  activeTab === tab.id 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 active-scale-down" 
                    : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-800"
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
                  activeTab === tab.id ? "bg-white/10 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                )}>
                  <tab.icon className="h-4 w-4" />
                </div>
                <span className="text-[13px] font-bold tracking-tight">{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area - Clean Tabs */}
        <div className="flex-1 space-y-6">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               transition={{ duration: 0.3 }}
               className="space-y-6"
             >
                {/* General Settings */}
                {activeTab === "general" && (
                    <>
                        <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden p-6 md:p-8">
                           <div className="space-y-8">
                              <div>
                                 <h3 className="text-base font-bold text-slate-800 tracking-tight mb-1">Marketplace Identity</h3>
                                 <p className="text-[11px] text-slate-400 font-medium italic">Configure how your brand appears across the platform rituals.</p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-none mb-2 block">Platform Name</Label>
                                    <Input defaultValue="Moomel Marketplace" className="h-10 rounded-lg bg-slate-50/50 border-zinc-200 focus:ring-1 focus:ring-primary/20 text-[13px] font-medium" />
                                 </div>
                                 <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-none mb-2 block">Support Email</Label>
                                    <Input defaultValue="concierge@moomel.sn" className="h-10 rounded-lg bg-slate-50/50 border-zinc-200 focus:ring-1 focus:ring-primary/20 text-[13px] font-medium" />
                                 </div>
                                 <div className="space-y-2 md:col-span-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-none mb-2 block">Business Slogan</Label>
                                    <Input defaultValue="Curating the most rare and pure artisan rituals from Casamance." className="h-10 rounded-lg bg-slate-50/50 border-zinc-200 focus:ring-1 focus:ring-primary/20 text-[13px] font-medium" />
                                 </div>
                              </div>
                           </div>
                        </Card>

                        <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden p-6 md:p-8">
                           <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                 <div>
                                    <h3 className="text-base font-bold text-slate-800 tracking-tight">Regional Controls</h3>
                                    <p className="text-[11px] text-slate-400 font-medium italic">Currency, timezones and local language defaults.</p>
                                 </div>
                                 <Globe className="h-5 w-5 text-slate-200" />
                              </div>
                              
                              <Separator className="bg-slate-100" />

                              <div className="space-y-4">
                                 {[
                                    { label: "Commission Fee", value: "12%", desc: "Platform cut from total sale ritual amount." },
                                    { label: "Base Currency", value: "CFA / USD", desc: "Primary checkout currency for artisan rituals." },
                                    { label: "Default Timezone", value: "GMT (Dakar)", desc: "System time for order processing logs." },
                                 ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between group py-2">
                                       <div className="space-y-0.5">
                                          <p className="text-[13px] font-bold text-slate-700 leading-tight">{item.label}</p>
                                          <p className="text-[11px] text-slate-400 font-medium italic leading-none">{item.desc}</p>
                                       </div>
                                       <div className="flex items-center gap-3">
                                          <span className="text-[12px] font-bold text-slate-900 underline decoration-slate-200 underline-offset-4">{item.value}</span>
                                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><ChevronRight className="h-3.5 w-3.5" /></Button>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </Card>
                    </>
                )}

                {/* Security Tab Mockup */}
                {activeTab === "security" && (
                    <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden p-6 md:p-8">
                       <div className="space-y-8">
                          <div className="flex items-center justify-between">
                             <div>
                                <h3 className="text-base font-bold text-slate-800 tracking-tight">Security Hardening</h3>
                                <p className="text-[11px] text-slate-400 font-medium italic">Protect the ritualist ecosystem and artisan secrets.</p>
                             </div>
                             <Lock className="h-5 w-5 text-primary" />
                          </div>

                          <div className="space-y-6">
                             {[
                                { title: "Two-Factor Auth", desc: "Mandatory for all admin and seller lab accounts.", icon: Smartphone, status: true },
                                { title: "API Session Lock", desc: "Automatically sign out after 30 mins of inactivity.", icon: Lock, status: true },
                                { title: "IP Whitelisting", desc: "Restrict management panel access to specific IPs.", icon: Globe, status: false },
                             ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 bg-slate-50/20 shadow-sm shadow-slate-900/5">
                                   <div className="flex items-center gap-4">
                                      <div className="h-10 w-10 rounded-lg bg-white border border-zinc-100 flex items-center justify-center text-slate-400"><item.icon className="h-4 w-4" /></div>
                                      <div className="space-y-0.5">
                                         <p className="text-[13px] font-bold text-slate-800 leading-tight">{item.title}</p>
                                         <p className="text-[11px] text-zinc-400 font-medium italic leading-none">{item.desc}</p>
                                      </div>
                                   </div>
                                   <Switch checked={item.status} className="data-[state=checked]:bg-primary" />
                                </div>
                             ))}
                          </div>
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
