import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronLeft,
  Store,
  Sparkles,
  MessageCircle,
  Activity,
  Plus,
  Wallet
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HeaderSearch } from "@/components/admin/header-search"
import { logout } from "@/lib/actions/auth"

const sellerNavItems = [
  { href: "/seller", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/seller/wallet", label: "Portefeuille", icon: Wallet },
  { href: "/seller/messages", label: "Messagerie", icon: MessageCircle },
  { href: "/seller/products", label: "Mes Créations", icon: Package },
  { href: "/seller/orders", label: "Commandes", icon: ShoppingBag },
  { href: "/seller/analytics", label: "Performances", icon: Activity },
  { href: "/seller/settings", label: "Paramètres", icon: Settings },
]

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || (session.user.role !== "SELLER" && session.user.role !== "SUPER_ADMIN")) {
    redirect("/account")
  }

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] text-slate-800 font-sans antialiased overflow-x-hidden">
      {/* Sidebar - Artisan Laboratory (Deep Slate/Teal Theme) */}
      <aside className="w-60 fixed inset-y-0 bg-[#0F172A] text-slate-400 overflow-hidden shadow-2xl border-r border-white/5 z-50 flex flex-col transition-all duration-300">
          <div className="p-5 flex flex-col items-start gap-4">
            <Link href="/" className="group flex items-center gap-2">
                <ChevronLeft className="h-3 w-3 text-slate-500 group-hover:text-[#0D9488] transition-all" />
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-400">Sortir</span>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#0D9488] flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Store className="h-3.5 w-3.5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white uppercase italic leading-none">Moomel</h1>
                <p className="text-[8px] text-[#0D9488] uppercase tracking-[0.2em] font-black mt-0.5">Artisan Lab</p>
              </div>
            </div>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-0.5 overflow-y-auto custom-scrollbar">
          {sellerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl text-[12px] font-bold transition-all group",
                "hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#0D9488]/10 group-hover:text-[#0D9488] transition-colors">
                <item.icon className="h-3.5 w-3.5" />
              </div>
              <span className="flex-1 tracking-tight text-slate-400 group-hover:text-slate-200">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3">
           <div className="bg-white/[0.03] rounded-2xl p-4 space-y-3 border border-white/5">
              <div className="flex items-center gap-3">
                 <Avatar className="h-8 w-8 rounded-xl ring-1 ring-white/10">
                    <AvatarImage src={session.user.image || ""} className="rounded-xl" />
                    <AvatarFallback className="bg-[#0D9488]/20 text-[#0D9488] text-[10px] font-black">{session.user.name?.charAt(0)}</AvatarFallback>
                 </Avatar>
                 <div className="min-w-0">
                    <p className="text-[11px] font-black text-white truncate leading-none mb-1">{session.user.name}</p>
                    <p className="text-[7px] uppercase tracking-[0.2em] text-[#0D9488] font-black">Grade Artisan</p>
                 </div>
              </div>
              <form action={async () => { "use server"; await logout(); }}>
                <Button variant="ghost" className="w-full justify-start h-8 rounded-lg gap-2 text-slate-500 hover:text-rose-400 hover:bg-rose-400/5 text-[9px] font-black uppercase tracking-widest px-2 shadow-none border-none">
                   <LogOut className="h-3 w-3" /> Quitter
                </Button>
              </form>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-60 flex flex-col min-w-0">
        <header className="h-14 bg-white/40 backdrop-blur-md border-b border-zinc-200/50 flex items-center justify-between px-8 sticky top-0 z-30">
           <div className="flex items-center gap-6 flex-1">
              <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hidden lg:block">System Status: <span className="text-teal-500">Active</span></h2>
              <div className="relative group max-w-xs w-full">
                <HeaderSearch placeholder="Rechercher..." />
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <Link href="/seller/products/new">
                <Button className="h-8 rounded-lg bg-[#0D9488] text-white font-black uppercase tracking-widest text-[8px] px-5 shadow-lg shadow-teal-500/10 hover:translate-y-[-1px] transition-all border-none">
                    <Plus className="mr-1.5 h-3 w-3" /> Nouveau Rituel
                </Button>
              </Link>
           </div>
        </header>
        <section className="p-3 md:p-4 bg-[#F9FAFB] flex-1 flex flex-col overflow-hidden">
          <div className="w-full flex-1 flex flex-col">
            {children}
          </div>
        </section>
      </main>
    </div>
  )
}
