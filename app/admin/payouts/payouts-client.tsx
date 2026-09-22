"use client"

import { useState } from "react"
import { TickCircle, CloseCircle, DollarCircle, Clock, ArrowRight, ShieldCross } from "reicon-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { toast } from "sonner"

const MOCK_PAYOUTS = [
  { id: "PAY-1", shopName: "Atelier Dakar", amount: 125000, method: "Wave", status: "PENDING", date: "Il y a 2h" },
  { id: "PAY-2", shopName: "Bijoux Touba", amount: 45000, method: "Orange Money", status: "PENDING", date: "Il y a 4h" },
  { id: "PAY-3", shopName: "Artisans du Nord", amount: 250000, method: "Virement Bancaire", status: "APPROVED", date: "Hier" },
]

export default function AdminPayoutsClient() {
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setLoadingId(id)
    setTimeout(() => {
      setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: "APPROVED" } : p))
      toast.success(`Le retrait ${id} a été approuvé.`)
      setLoadingId(null)
    }, 1000)
  }

  const handleReject = (id: string) => {
    setLoadingId(id)
    setTimeout(() => {
      setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: "REJECTED" } : p))
      toast.error(`Le retrait ${id} a été rejeté.`)
      setLoadingId(null)
    }, 1000)
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Gestion des Retraits</h1>
        <p className="text-[11px] font-bold text-slate-400 mt-0.5 tracking-widest uppercase italic">Contrôle des flux financiers vers les artisans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">En Attente</p>
              <h3 className="text-2xl font-black text-slate-800">2</h3>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-[#0F172A] text-white p-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="h-10 w-10 bg-white/10 text-emerald-400 rounded-xl flex items-center justify-center">
              <TickCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Approuvés Ce Mois</p>
              <h3 className="text-2xl font-black text-white">{formatPrice(1250000)}</h3>
            </div>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
              <ShieldCross className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Signalements</p>
              <h3 className="text-2xl font-black text-slate-800">0</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-zinc-200/50 shadow-sm rounded-2xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">ID / Date</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Artisan</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Montant</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400">Méthode</th>
                <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {payouts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-black text-[11px] text-slate-800">{p.id}</p>
                    <p className="text-[9px] font-bold text-slate-400">{p.date}</p>
                  </td>
                  <td className="px-6 py-4 font-black text-[12px] text-slate-700">
                    {p.shopName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-black text-[12px] text-slate-800">{formatPrice(p.amount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-zinc-200">
                      {p.method}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {p.status === "PENDING" ? (
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => handleApprove(p.id)}
                          disabled={loadingId !== null}
                          size="sm" 
                          className="h-8 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-black text-[9px] uppercase tracking-widest"
                        >
                          Approuver
                        </Button>
                        <Button 
                          onClick={() => handleReject(p.id)}
                          disabled={loadingId !== null}
                          size="sm" 
                          variant="outline"
                          className="h-8 border-rose-200 text-rose-500 hover:bg-rose-50 rounded-lg font-black text-[9px] uppercase tracking-widest"
                        >
                          Rejeter
                        </Button>
                      </div>
                    ) : (
                      <Badge className={
                        p.status === "APPROVED" 
                          ? "bg-emerald-50 text-emerald-600 border-none"
                          : "bg-rose-50 text-rose-600 border-none"
                      }>
                        {p.status}
                      </Badge>
                    )}
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
