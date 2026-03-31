"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageCircle, 
  Search, 
  Send, 
  User, 
  Star,
  CheckCircle,
  Clock,
  ExternalLink,
  Mail,
  Smartphone,
  ChevronRight,
  MoreVertical,
  Filter,
  Trash
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const inbox = [
  { id: 1, user: "Awa Diop", email: "awa@example.com", subject: "Inquiry about Shea Butter source", lastMessage: "Hello, I wanted to know if your shea butter is truly unrefined...", time: "2 mins ago", status: "unread", priority: "high" },
  { id: 2, user: "Mamadou Fall", email: "mamadou@ninkinka.sn", subject: "Artisan Verification help", lastMessage: "Thank you for the guidance, I've updated the documents...", time: "45 mins ago", status: "read", priority: "normal" },
  { id: 3, user: "Fatou Gueye", email: "fatou@ritual.com", subject: "Bulk order for wedding event", lastMessage: "I am interested in ordering 50 incense kits for...", time: "3 hours ago", status: "unread", priority: "high" },
  { id: 4, user: "Serigne Saliou", email: "serigne@baol.sn", subject: "Feedback on last delivery", lastMessage: "The delivery was excellent, but the packaging could...", time: "Yesterday", status: "read", priority: "normal" },
]

export default function AdminMessagesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1)

  const selectedMessage = inbox.find(m => m.id === selectedId)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Concierge Hub</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Manage communications between ritualists and artisan partners.</p>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-4 h-full bg-emerald-50 rounded-lg py-2 border border-emerald-100 shadow-sm shadow-emerald-500/5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">Live Support Engaged</span>
            </div>
          <Button className="h-10 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm">
             <Send className="mr-2 h-3.5 w-3.5" /> Broadcast Support
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[720px]">
        {/* Inbox List - Left Column */}
        <Card className="lg:col-span-1 border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden flex flex-col">
          <div className="p-4 border-b border-zinc-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold uppercase tracking-widest text-slate-800">Inbox</h3>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400"><Filter className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400"><Trash className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input 
                placeholder="Find ritualist..." 
                className="bg-white border-zinc-200/50 rounded-lg h-10 pl-10 text-[13px] font-medium focus:ring-1 focus:ring-primary/10 transition-all w-full shadow-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1 scrollbar-hide">
            {inbox.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all relative group",
                  selectedId === msg.id 
                    ? "bg-slate-900 shadow-xl shadow-slate-900/10 active-scale-down" 
                    : "hover:bg-slate-50 border border-transparent hover:border-zinc-100"
                )}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 rounded-xl shadow-sm border border-zinc-100 shrink-0">
                    <AvatarFallback className={cn(
                      "font-bold text-xs",
                      selectedId === msg.id ? "bg-white/10 text-white" : "bg-primary/10 text-primary"
                    )}>
                      {msg.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={cn(
                        "text-[14px] font-bold tracking-tight truncate shrink-0",
                        selectedId === msg.id ? "text-white" : "text-slate-900"
                      )}>
                        {msg.user}
                      </span>
                      <span className={cn(
                        "text-[10px] font-medium shrink-0",
                        selectedId === msg.id ? "text-white/40" : "text-slate-400"
                      )}>
                        {msg.time}
                      </span>
                    </div>
                    <p className={cn(
                      "text-[12px] font-bold mb-1 truncate tracking-tight uppercase text-[9px] tracking-widest",
                      selectedId === msg.id ? "text-primary italic" : "text-slate-500"
                    )}>
                      {msg.subject}
                    </p>
                    <p className={cn(
                      "text-[12px] font-medium line-clamp-1 truncate leading-tight",
                      selectedId === msg.id ? "text-white/60" : "text-slate-400"
                    )}>
                      {msg.lastMessage}
                    </p>
                  </div>
                </div>
                {msg.status === "unread" && (
                   <span className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-white" />
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Conversation Area - Right Columns */}
        <Card className="lg:col-span-2 border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden flex flex-col">
          {selectedMessage ? (
            <>
              {/* Converation Header */}
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-xl shadow-md border border-white ring-1 ring-zinc-200/50">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                      {selectedMessage.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                       <h3 className="text-base font-bold text-slate-800 tracking-tight leading-none">{selectedMessage.user}</h3>
                       <Badge variant="ghost" className="h-5 rounded-md bg-stone-100 text-stone-600 font-bold uppercase text-[8px] px-2 tracking-widest flex items-center gap-1.5 shadow-none border border-stone-200/50">
                          <CheckCircle className="h-2.5 w-2.5" /> ID-V72
                       </Badge>
                    </div>
                    <p className="text-[11px] font-medium text-slate-400 italic flex items-center gap-2 tracking-tight underline decoration-slate-200 decoration-1 underline-offset-2">
                       <Mail className="h-2.5 w-2.5" /> {selectedMessage.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="h-10 rounded-lg text-[9px] font-bold uppercase tracking-widest px-6 border-zinc-100 shadow-none hover:bg-white text-slate-700">
                     <Star className="mr-2 h-3.5 w-3.5" /> Flag Priority
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg text-slate-400"><MoreVertical className="h-4 w-4" /></Button>
                </div>
              </div>

              {/* Chat Viewport Mockup */}
              <div className="flex-1 p-8 bg-white/20 overflow-y-auto space-y-8 scrollbar-hide">
                <div className="flex flex-col items-center justify-center py-6">
                   <div className="h-px w-24 bg-zinc-100" />
                   <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-2">March 30, 2026</span>
                </div>

                {/* Left Message */}
                <div className="flex items-start gap-4 max-w-[80%]">
                   <Avatar className="h-8 w-8 rounded-lg mt-1"><AvatarFallback className="bg-slate-100 text-slate-400 text-[10px]">AD</AvatarFallback></Avatar>
                   <div className="space-y-2">
                      <div className="bg-[#F8F9FA] p-5 rounded-2xl rounded-tl-none border border-zinc-100 shadow-sm relative group">
                         <p className="text-[14px] text-slate-700 leading-relaxed tracking-tight group-hover:scale-[1.005] origin-top-left transition-transform duration-300">
                           "{selectedMessage.lastMessage}"
                         </p>
                         <p className="text-[10px] text-zinc-400 font-medium italic mt-3 opacity-50 underline decoration-zinc-200 decoration-1">Sent from iPhone Ritual App</p>
                      </div>
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pl-1">2:45 PM</span>
                   </div>
                </div>

                {/* Right Message (Admin Reply Mockup) */}
                <div className="flex flex-row-reverse items-start gap-4 max-w-[80%] ml-auto">
                   <Avatar className="h-8 w-8 rounded-lg mt-1"><AvatarFallback className="bg-slate-900 text-white text-[10px]">MA</AvatarFallback></Avatar>
                   <div className="space-y-2 items-end flex flex-col">
                      <div className="bg-slate-900 p-5 rounded-2xl rounded-tr-none shadow-xl shadow-slate-900/10 text-white relative group">
                         <p className="text-[14px] leading-relaxed tracking-tight group-hover:scale-[0.995] origin-top-right transition-transform duration-300">
                           Hello, our Shea Butter comes directly from our artisan partner in Casamance. It's cold-pressed and holds a certifed Organic label.
                         </p>
                      </div>
                      <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest pr-1">3:12 PM - Delivered</span>
                   </div>
                </div>
              </div>

              {/* Message Input - Slimmer Footer */}
              <div className="p-6 border-t border-zinc-50 bg-[#F9FAFB]/50">
                 <div className="bg-white border-none rounded-2xl p-2 flex items-center gap-2 shadow-2xl shadow-slate-900/5 border border-zinc-100 ring-1 ring-zinc-200/50">
                    <Input 
                        placeholder="Type premium ritualistic response..." 
                        className="bg-transparent border-none rounded-none h-10 px-4 text-[13px] font-medium shadow-none focus-visible:ring-0"
                    />
                    <Button size="icon" className="h-10 w-10 rounded-xl bg-slate-900 text-white hover:translate-y-[-2px] transition-all">
                       <Send className="h-4 w-4" />
                    </Button>
                 </div>
                 <div className="flex items-center justify-between mt-3 px-2">
                    <div className="flex gap-4">
                       <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1.5 leading-none bg-white p-1 rounded-md shadow-sm border border-zinc-100">
                          <ExternalLink className="h-3 w-3" /> Quick Template
                       </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium italic underline decoration-slate-100 decoration-1 underline-offset-2">Press Enter to send directly</p>
                 </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/20">
               <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mb-6">
                  <MessageCircle className="h-10 w-10" />
               </div>
               <h3 className="text-xl font-bold text-slate-800 tracking-tight">Ritualist Connection</h3>
               <p className="text-slate-400 text-sm max-w-sm mt-2 font-medium italic">Select a ritualist or artisan partner to start the concierge conversation.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
