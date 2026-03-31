"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Info, AlertTriangle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { getNotifications, markAsRead } from "@/lib/actions/notifications"

export function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<any[]>([])

    useEffect(() => {
        const fetchNotifications = async () => {
            const data = await getNotifications()
            setNotifications(data)
        }
        fetchNotifications()
        // Simple polling for a live feel in the lab
        const interval = setInterval(fetchNotifications, 30000)
        return () => clearInterval(interval)
    }, [])

    const unreadCount = notifications.filter(n => !n.read).length

    const handleRead = async (id: string) => {
        await markAsRead(id)
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }

    return (
        <div className="relative">
            <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-primary/5 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bell className="h-5 w-5 text-slate-600" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 mt-4 w-80 z-50 origin-top-right"
                        >
                            <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden ring-1 ring-black/5">
                                <div className="p-4 border-b border-zinc-50 flex items-center justify-between bg-slate-50/50">
                                    <h3 className="text-sm font-bold tracking-tight">Ritual Notifications</h3>
                                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest bg-white">{unreadCount} New</Badge>
                                </div>

                                <div className="max-h-[24rem] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((n) => (
                                            <div 
                                                key={n.id}
                                                className={cn(
                                                    "p-4 border-b border-zinc-50 flex gap-4 transition-colors cursor-pointer hover:bg-slate-50",
                                                    !n.read && "bg-primary/5"
                                                )}
                                                onClick={() => handleRead(n.id)}
                                            >
                                                <div className={cn(
                                                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                                    n.type === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' :
                                                    n.type === 'ERROR' ? 'bg-rose-100 text-rose-600' :
                                                    'bg-blue-100 text-blue-600'
                                                )}>
                                                    {n.type === 'SUCCESS' ? <Check className="h-4 w-4" /> : 
                                                     n.type === 'ERROR' ? <X className="h-4 w-4" /> : 
                                                     <Info className="h-4 w-4" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-slate-800 leading-none">{n.title}</p>
                                                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 italic">{n.message}</p>
                                                    <p className="text-[9px] text-slate-300 font-medium uppercase tracking-[0.05em]">{new Date(n.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 flex flex-col items-center justify-center text-center px-4 space-y-3">
                                            <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                                                <Bell className="h-6 w-6" />
                                            </div>
                                            <p className="text-xs font-semibold text-slate-400 italic">Silence... No platform rituals manifest yet.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="p-3 bg-slate-50/50 border-t border-zinc-100 text-center">
                                    <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline transition-all">Clear Registry</button>
                                </div>
                            </Card>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
