"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Users, 
  Search, 
  MoreVertical, 
  Filter, 
  ChevronRight,
  UserCheck,
  UserX,
  Mail,
  ShoppingBag,
  Calendar,
  Star,
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const customers = [
  { id: "1", name: "Awa Diop", email: "awa@example.com", role: "CUSTOMER", orders: 12, spent: 450.00, joined: "Feb 2026", status: "Active", img: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?q=80&w=200" },
  { id: "2", name: "Ibrahim FALL", email: "ibrahim@example.com", role: "CUSTOMER", orders: 5, spent: 120.40, joined: "Mar 2026", status: "Active", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200" },
  { id: "3", name: "Mame Gueye", email: "mame@example.com", role: "SELLER", orders: 45, spent: 2300.00, joined: "Jan 2026", status: "Active", img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=200" },
]

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      {/* Header - Refined */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Customer Network</h1>
          <p className="text-[13px] font-medium text-slate-500 mt-0.5 tracking-tight italic">Manage your community of ritualists and artisan partners.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="h-10 rounded-lg border-zinc-200 text-slate-700 font-bold uppercase tracking-widest text-[9px] px-6 bg-white shadow-sm">
             <Mail className="mr-2 h-3.5 w-3.5" /> Message All
           </Button>
           <Button className="h-10 rounded-lg bg-slate-900 text-white font-bold uppercase tracking-widest text-[9px] px-6 shadow-sm flex items-center gap-2 group">
             Export Members <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
           </Button>
        </div>
      </div>

       {/* FiltersArea - Refined */}
       <div className="flex flex-col md:flex-row items-center gap-3 bg-white/50 backdrop-blur-xl p-3 rounded-2xl border border-zinc-200/50 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Find ritualist..." 
            className="bg-white border-none rounded-lg h-10 pl-10 text-[13px] font-medium focus:ring-1 focus:ring-primary/10 transition-all w-full shadow-inner"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-200 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700">
            <Filter className="h-3.5 w-3.5" /> Role
          </Button>
           <Button variant="outline" className="h-10 rounded-lg px-6 gap-2 border-zinc-200 font-bold uppercase tracking-widest text-[8px] bg-white text-slate-700">
            Status
          </Button>
        </div>
      </div>

      {/* Users List - Slimmer Table */}
      <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
               <tr className="bg-slate-50/50 border-b border-zinc-50 font-bold text-slate-400">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Identity</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Engagement</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Total Impact</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">Timeline</th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-widest">State</th>
                  <th className="px-6 py-4 text-right"></th>
               </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {customers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/30 transition-all duration-300">
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 rounded-xl shadow-sm border border-zinc-50">
                          <AvatarImage src={user.img} className="rounded-xl" />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                           <span className="text-[14px] font-bold text-slate-800 tracking-tight leading-none">{user.name}</span>
                           <span className="text-[10px] text-slate-400 font-medium italic mt-1">{user.email}</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-[12px]">
                     <div className="flex flex-col gap-1">
                        <Badge variant="ghost" className="h-5 rounded-md bg-secondary/50 text-slate-800 font-bold uppercase text-[8px] px-2 tracking-widest w-fit">
                           {user.role}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold italic text-slate-400 uppercase tracking-tight">
                           <ShoppingBag className="h-3 w-3" /> {user.orders} Rituals
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex flex-col gap-0.5">
                        <span className="text-[14px] font-bold text-slate-800 underline decoration-primary/20 decoration-2 underline-offset-4">${user.spent.toFixed(2)}</span>
                        <div className="flex items-center gap-1 text-primary">
                           <Star className="h-2.5 w-2.5 fill-current" />
                           <span className="text-[8px] font-bold uppercase tracking-widest">Ritualist Gold</span>
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 italic">
                        <Calendar className="h-3.5 w-3.5" /> Joined {user.joined}
                     </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-emerald-50 text-emerald-600 border-none uppercase text-[8px] h-5 px-2 font-bold tracking-widest">
                       {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white shadow-none transition-all group-hover:border border-zinc-100">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 p-2 rounded-xl shadow-2xl border-none bg-white">
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700">
                             <Settings className="h-3.5 w-3.5 mr-2 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Manage Privileges</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-primary/5 group transition-all text-slate-700">
                             <Mail className="h-3.5 w-3.5 mr-2 text-primary" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Send Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-50 mx-1 my-1" />
                        <DropdownMenuItem className="rounded-lg py-2.5 px-3 focus:bg-rose-50 text-rose-500 group transition-all">
                             <UserX className="h-3.5 w-3.5 mr-2" />
                          <span className="text-[9px] font-bold uppercase tracking-widest">Restrict Access</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
