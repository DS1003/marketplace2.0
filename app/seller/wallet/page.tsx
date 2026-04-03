import { auth } from "@/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building2, 
  Smartphone, 
  Download, 
  DollarSign,
  History,
  TrendingUp,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Zap,
  Activity,
  Clock
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { cn, formatPrice } from "@/lib/utils"

export default async function WalletPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/account")
  }
  
  // Fetch wallet balance
  const wallet = await (prisma as any).wallet.findUnique({
    where: { userId: session.user.id }
  })
  
  const balance = wallet ? wallet.balance : 0
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-10">
      {/* Minimalist Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            <span className="text-[9px] font-black text-teal-600 uppercase tracking-[0.2em]">Flux Financiers Artisan Lab</span>
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight italic uppercase leading-none">
            Portefeuille : <span className="text-teal-600 not-italic">Actif</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Gérez vos revenus et optimisez vos flux de trésorerie.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-8 rounded-lg text-slate-500 font-black uppercase tracking-widest text-[8px] px-4 bg-white border-zinc-200 hover:bg-slate-50 shadow-sm">
            <History className="mr-2 h-3 w-3" /> Relevés
          </Button>
          <Button className="h-8 rounded-lg bg-[#0F172A] text-white font-black uppercase tracking-widest text-[8px] px-5 shadow-lg shadow-black/10 hover:translate-y-[-0.5px] transition-all border-none">
             <Download className="mr-2 h-3 w-3" /> Demander un Retrait
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance Card - High Fidelity */}
        <Card className="col-span-1 md:col-span-2 overflow-hidden rounded-[2rem] border-0 shadow-2xl bg-[#0F172A] text-white relative group min-h-[220px]">
          {/* Glassmorphism Background Pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
            <Wallet className="w-40 h-40" />
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <CardContent className="p-8 relative z-10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-400 opacity-80">Solde Total Disponible</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black tracking-tighter">{balance.toLocaleString('fr-FR')}</span>
                    <span className="text-lg text-teal-500 font-black tracking-widest">FCFA</span>
                  </div>
               </div>
               <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-500">
                  <ShieldCheck className="w-5 h-5" />
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 mb-0.5">
                  <ArrowDownRight className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] opacity-60">Entrées Hebdo</span>
                </div>
                <div className="text-lg font-black text-slate-100">{formatPrice(125000)}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-rose-400 mb-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] opacity-60">Sorties Hebdo</span>
                </div>
                <div className="text-lg font-black text-slate-100">{formatPrice(45000)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Method Card */}
        <Card className="rounded-[2rem] border-zinc-200/50 shadow-sm bg-white flex flex-col items-center justify-center p-8 text-center hover:border-teal-500/20 hover:shadow-xl transition-all duration-500 group">
          <div className="h-12 w-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform border border-teal-100/50 mb-4">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest leading-none mb-2">Méthode de Retrait</h3>
          <p className="text-[10px] font-medium text-slate-400 leading-relaxed uppercase tracking-wider mb-6">Wave, Orange Money<br/>ou Virement Bancaire</p>
          <Button variant="outline" className="rounded-xl h-9 font-black uppercase tracking-widest text-[9px] hover:bg-slate-50 border-zinc-200 px-6 w-full">
             Configurer
          </Button>
        </Card>
      </div>

      {/* Stats Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Commission Moomel", value: "2.5%", icon: Activity, color: "text-blue-500 bg-blue-50" },
            { label: "Délai de Retrait", value: "24-48H", icon: Clock, color: "text-amber-500 bg-amber-50" },
            { label: "Plafond Mensuel", value: "5.0M", icon: TrendingUp, color: "text-emerald-500 bg-emerald-50" },
            { label: "Retraits Actifs", value: "1", icon: Zap, color: "text-teal-500 bg-teal-50" },
          ].map((s, i) => (
             <Card key={i} className="p-4 border-zinc-200/50 shadow-sm rounded-2xl bg-white/50 backdrop-blur-sm flex items-center gap-4">
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", s.color)}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{s.label}</p>
                  <p className="text-sm font-black text-slate-800 leading-none">{s.value}</p>
                </div>
             </Card>
          ))}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.2em]">Registre des Opérations</h2>
            <Badge variant="outline" className="rounded-md border-zinc-200 text-[8px] font-black uppercase tracking-widest text-slate-400 bg-white">Mise à jour 14:30</Badge>
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-1 transition-colors">Exporter CSV <Download className="w-3 h-3" /></span>
        </div>
        
        <Card className="rounded-[1.5rem] border-zinc-200/50 shadow-sm bg-white overflow-hidden">
          <div className="divide-y divide-zinc-50">
             {[
               { id: 1, title: 'Vente d\'article', ref: 'ORD-2026-X8Y9', amount: 35000, type: 'in', date: '12 Min' },
               { id: 2, title: 'Retrait vers Wave', ref: 'WDR-9921-X', amount: -45000, type: 'out', date: 'Hier, 09:15' },
               { id: 3, title: 'Vente d\'article', ref: 'ORD-2026-A1B2', amount: 15000, type: 'in', date: '01 Avr 2026' },
               { id: 4, title: 'Paiement Service', ref: 'SVC-1102-L', amount: -5000, type: 'out', date: '30 Mars 2026' },
             ].map((tx) => (
                <div key={tx.id} className="p-5 flex items-center justify-between hover:bg-teal-50/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-9 w-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105", 
                      tx.type === 'in' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' : 'bg-rose-50 text-rose-600 border border-rose-100/50'
                    )}>
                       {tx.type === 'in' ? <DollarSign className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-[11px] font-black text-slate-800 uppercase tracking-tight leading-none mb-1.5">{tx.title}</p>
                      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">Réf: <span className="font-bold">{tx.ref}</span> • {tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={cn("font-black text-xs uppercase tracking-tight", tx.type === 'in' ? 'text-emerald-600' : 'text-slate-800')}>
                      {tx.type === 'in' ? '+' : '-'}{Math.abs(tx.amount).toLocaleString('fr-FR')} <span className={cn("text-[9px]", tx.type === 'in' ? 'text-emerald-400' : 'text-slate-400')}>FCFA</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-200 group-hover:text-teal-600 transition-colors" />
                  </div>
                </div>
             ))}
          </div>
          <div className="p-4 bg-slate-50/50 text-center border-t border-zinc-100 hover:bg-teal-50/40 transition-colors cursor-pointer group">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-teal-600 flex items-center justify-center gap-2 transition-colors">
              Synchroniser l'historique complet <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
