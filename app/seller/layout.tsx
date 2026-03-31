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
  Plus
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HeaderSearch } from "@/components/admin/header-search"
import { logout } from "@/lib/actions/auth"

const sellerNavItems = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "My Products", icon: Package },
  { href: "/seller/orders", label: "Shop Orders", icon: ShoppingBag },
  { href: "/seller/analytics", label: "Performance", icon: Activity },
  { href: "/seller/settings", label: "Lab Settings", icon: Settings },
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
    <div className="flex min-h-screen bg-[#FDFCFB] text-slate-900">
      {/* Sidebar - High Fidelity Artisan Lab */}
      <aside className="w-64 border-r border-zinc-100 bg-white flex flex-col sticky top-0 h-screen z-40 shrink-0 transition-all duration-500">
        <div className="p-8 pb-10 flex flex-col items-center">
            <Link href="/" className="group flex items-center gap-2 mb-8">
                <ChevronLeft className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-800">Exit Lab</span>
            </Link>
            <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center text-primary shadow-xl shadow-slate-900/10 mb-4 group hover:rotate-3 transition-transform">
                <Store className="h-6 w-6" />
            </div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">Artisan Lab</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 italic">Merchant Space</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sellerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <item.icon className="h-4 w-4" />
              </div>
              <span className="text-[13px] font-bold tracking-tight">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-50">
           <div className="bg-slate-50 rounded-2xl p-4 space-y-4">
              <div className="flex items-center gap-3">
                 <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarImage src={session.user.image || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">{session.user.name?.charAt(0)}</AvatarFallback>
                 </Avatar>
                 <div className="flex flex-col min-w-0">
                    <span className="text-[12px] font-bold text-slate-800 truncate">{session.user.name}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Artisan</span>
                 </div>
              </div>
              <form action={async () => { "use server"; await logout(); }}>
                <Button variant="ghost" className="w-full justify-start h-9 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all font-bold uppercase tracking-widest text-[9px] px-3">
                   <LogOut className="mr-2 h-3.5 w-3.5" /> Sign Out
                </Button>
              </form>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="h-24 flex items-center justify-between px-10 bg-white/70 backdrop-blur-xl sticky top-0 z-30 border-b border-zinc-50 gap-10">
           <div className="flex-1 max-w-xl">
              <HeaderSearch placeholder="Search your ritual records..." />
           </div>
           
           <div className="flex items-center gap-4">
              <Link href="/seller/products/new">
                <Button className="h-12 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest text-[9px] px-8 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                    <Plus className="mr-2 h-4 w-4" /> Initialiser Rituel
                </Button>
              </Link>
           </div>
        </header>
        <div className="flex-1 p-10 max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
