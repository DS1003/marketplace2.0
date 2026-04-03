import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Package,
  Store,
  MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/admin/sellers", label: "Artisans", icon: Store },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingBag },
  { href: "/admin/users", label: "Clients", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageCircle },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/account")
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex font-sans antialiased text-slate-900">
      {/* Desktop Sidebar - Slimmer & More Refined */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 bg-[#1A1512] text-zinc-400 overflow-hidden shadow-xl border-r border-white/5">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white italic">Moomel</h1>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-semibold">Super Administrateur</p>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group",
                "hover:bg-white/5 hover:text-white"
              )}>
                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="flex-1 tracking-tight">{item.label}</span>
                <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <div className="bg-white/5 rounded-2xl p-4 space-y-3 border border-white/5">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 rounded-xl ring-1 ring-white/10">
                <AvatarImage src={session.user.image || ""} className="rounded-xl" />
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">{session.user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{session.user.name}</p>
                <p className="text-[9px] uppercase tracking-wider text-zinc-500">Administrateur</p>
              </div>
            </div>
            <Link href="/api/auth/signout" className="block w-full">
              <Button variant="ghost" className="w-full justify-start h-9 rounded-xl gap-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-400/5 text-[11px] font-medium px-2">
                <LogOut className="h-3.5 w-3.5" /> Déconnexion
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header - Slimmer */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-zinc-200/50 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest hidden md:block">Gestion</h2>
            <div className="relative group max-w-sm w-full mx-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input 
                placeholder="Rechercher..." 
                className="bg-zinc-100/50 border-none rounded-lg h-9 pl-10 pr-4 text-[13px] font-medium focus:ring-1 focus:ring-primary/30 transition-all w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-zinc-500 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-white" />
            </Button>
            <div className="h-8 w-px bg-zinc-200 mx-1" />
            <div className="flex items-center gap-2 pl-1 cursor-pointer group">
              <span className="text-[13px] font-semibold text-zinc-700 hidden sm:block">Assistance</span>
              <div className="h-8 w-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                 <MessageCircle className="h-4 w-4" />
              </div>
            </div>
          </div>
        </header>

        <section className="p-6 md:p-8 bg-[#F9FAFB]">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  )
}
