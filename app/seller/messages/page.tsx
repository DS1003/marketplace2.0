"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search, Send, MoreVertical, Paperclip, 
  Smile, User, Check, CheckCheck, 
  Clock, Filter, MessageSquare, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const conversations = [
  {
    id: "1",
    user: { name: "Awa Diop", image: "", initial: "A" },
    lastMessage: "Is the baobab oil still in stock?",
    time: "2m ago",
    unread: 2,
    online: true
  },
  {
    id: "2",
    user: { name: "Moussa Sarr", image: "", initial: "M" },
    lastMessage: "Thank you for the fast delivery!",
    time: "1h ago",
    unread: 0,
    online: false
  },
  {
    id: "3",
    user: { name: "Bineta Fall", image: "", initial: "B" },
    lastMessage: "Can I get a discount for bulk order?",
    time: "3h ago",
    unread: 0,
    online: true
  }
]

const initialMessages = [
  { id: 1, sender: "customer", text: "Hello! I saw your Pure Shea Butter.", time: "10:30 AM" },
  { id: 2, sender: "customer", text: "Is it 100% organic?", time: "10:31 AM" },
  { id: 3, sender: "seller", text: "Hello Awa! Yes, it is 100% unrefined and organic.", time: "10:35 AM" },
  { id: 4, sender: "seller", text: "We source it directly from a cooperative in Casamance.", time: "10:36 AM" },
  { id: 5, sender: "customer", text: "That sounds great. How long is the delivery to Dakar?", time: "10:40 AM" }
]

export default function SellerMessagesPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const msg = {
      id: messages.length + 1,
      sender: "seller",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, msg])
    setNewMessage("")
  }

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Sidebar - Conversations List */}
      <div className="w-80 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-[#2D241E]">Messages</h2>
            <Button variant="ghost" size="icon" className="rounded-full">
                <Filter className="h-4 w-4" />
            </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search patrons..." 
            className="pl-9 h-11 border-none bg-white shadow-xl shadow-black/5 rounded-full font-light"
          />
        </div>

        <ScrollArea className="flex-1 -mr-4 pr-4">
          <div className="space-y-2 pb-2">
            {conversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedConv(conv)}
                className={`p-4 rounded-3xl cursor-pointer transition-all duration-300 flex gap-3 ${
                  selectedConv.id === conv.id 
                    ? "bg-[#2D241E] text-white shadow-xl shadow-[#2D241E]/20" 
                    : "bg-white/60 hover:bg-white text-[#2D241E] shadow-sm"
                }`}
              >
                <div className="relative">
                    <Avatar className="h-11 w-11 border-2 border-white/10 shadow-sm">
                        <AvatarImage src={conv.user.image} />
                        <AvatarFallback className={selectedConv.id === conv.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}>
                            {conv.user.initial}
                        </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-sm truncate">{conv.user.name}</span>
                    <span className={`text-[9px] uppercase tracking-widest ${selectedConv.id === conv.id ? "text-white/60" : "text-muted-foreground"}`}>
                        {conv.time}
                    </span>
                  </div>
                  <p className={`text-xs truncate ${selectedConv.id === conv.id ? "text-white/60" : "text-muted-foreground"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unread > 0 && (
                  <Badge className="h-5 min-w-[20px] flex items-center justify-center bg-red-500 hover:bg-red-500 border-none rounded-full p-0 text-[10px]">
                    {conv.unread}
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* 2. Main Chat Area */}
      <Card className="flex-1 border-none shadow-2xl shadow-black/5 bg-white/50 backdrop-blur-xl rounded-[2.5rem] flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-6 border-b border-border/40 flex items-center justify-between bg-white/30">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src={selectedConv.user.image} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">{selectedConv.user.initial}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-sm text-[#2D241E]">{selectedConv.user.name}</h3>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" /> Live Now
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white"><MessageSquare className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white text-red-500"><Trash2 className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Messages List */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-center my-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground bg-white/50 px-4 py-1.5 rounded-full border border-border/40">
                    Today Ritual Inception
                </span>
            </div>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] group ${msg.sender === "seller" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`p-4 rounded-[2rem] text-sm shadow-sm ${
                        msg.sender === "seller" 
                        ? "bg-[#2D241E] text-white rounded-tr-none" 
                        : "bg-white text-[#2D241E] rounded-tl-none border border-border/30"
                    }`}>
                        {msg.text}
                    </div>
                    <div className="flex items-center gap-1.5 px-2">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-light">{msg.time}</span>
                        {msg.sender === "seller" && <CheckCheck className="h-3 w-3 text-blue-500" />}
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-6 bg-white/40 border-t border-border/40">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-white px-4 py-2 rounded-3xl shadow-xl shadow-black/5 border border-border/30">
            <Button type="button" variant="ghost" size="icon" className="rounded-full hover:bg-[#2D241E]/5 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Manifest a reply ritual..." 
              className="flex-1 border-none focus-visible:ring-0 bg-transparent h-10 px-0 placeholder:text-muted-foreground/50 font-light"
            />
            <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="icon" className="rounded-full hover:bg-[#2D241E]/5 text-muted-foreground">
                   <Smile className="h-4 w-4" />
                </Button>
                <Button type="submit" className="bg-[#2D241E] hover:bg-black text-white h-10 w-10 p-0 rounded-2xl shadow-lg shadow-[#2D241E]/10 transition-transform active:scale-95 group">
                   <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
            </div>
          </form>
          <div className="mt-4 flex justify-center">
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <Clock className="h-3 w-3" /> Average response time: 5 minutes
              </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
