"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import NextImage from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  User, Package, MapPin, CreditCard, Settings,
  LogOut, Heart, ShoppingBag, ChevronRight, Star,
  ShieldCheck, ArrowRight, MessageCircle, Clock, Award,
  LayoutDashboard, Activity, CheckCircle2, Truck, RefreshCw, X, Eye
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FadeContent } from "@/components/ui/fade-content"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { useSession } from "next-auth/react"
import { logout } from "@/lib/actions/auth"
import { formatPrice } from "@/lib/utils"
import { getCustomerDashboard, updateCustomerProfile } from "@/lib/actions/customer"
import { toggleWishlist } from "@/lib/actions/wishlist"
import { Suspense } from "react"
import { toast } from "sonner"

function AccountPageContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "orders")
  const [authMode, setAuthMode] = useState<"login" | "register">("login")
  const { data: session, status } = useSession()

  // Dynamic state from DB
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editName, setEditName] = useState("")
  const [isSavingProfile, setIsSavingProfile] = useState(false)

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    const res = await getCustomerDashboard()
    if (res.success && res.data) {
      setDashboardData(res.data)
      setEditName(res.data.user.name || "")
    } else {
      console.error(res.error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) setActiveTab(tab)
  }, [searchParams])

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData()
    }
  }, [session, fetchDashboardData])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    const res = await updateCustomerProfile(editName)
    if (res.success) {
      toast.success("Profil mis à jour avec succès")
      setIsEditingProfile(false)
      fetchDashboardData()
    } else {
      toast.error(res.error || "Erreur lors de la mise à jour")
    }
    setIsSavingProfile(false)
  }

  const handleRemoveWishlist = async (productId: string) => {
    const res = await toggleWishlist(productId)
    if (res.success) {
      toast.success("Favori retiré")
      fetchDashboardData()
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <NextImage src="/images/logo.png" alt="Moomel" width={150} height={50} className="animate-pulse" />
          <div className="flex items-center gap-2 text-stone-400 font-bold uppercase tracking-widest text-[10px]">
            <Clock className="w-4 h-4 animate-spin" /> Préparation du Rituel...
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#FDFBF7]">
        <main className="pt-24 lg:pt-0 min-h-screen flex flex-col lg:flex-row w-full">
          {/* Left: Image side */}
          <div className="hidden lg:flex lg:w-1/2 relative bg-stone-100">
            <NextImage 
              src="/images/hero-products.jpg" 
              alt="Moomel Rituals" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-16 xl:p-24 text-white">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-4xl xl:text-5xl font-semibold mb-6 leading-tight">
                  Le Rituel de la<br/>Sélection Naturelle
                </h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-md font-light">
                  Découvrez les secrets de beauté ancestraux préservés pour les esprits modernes. Pur, biologique et directement du cœur du Sénégal.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right: Form side */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 bg-white relative">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,165,116,0.05)_0%,transparent_50%)] pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md z-10"
            >
              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)} className="w-full">
                <TabsList className="grid grid-cols-2 w-full max-w-[240px] h-11 bg-stone-100 rounded-full p-1 mb-10 mx-auto">
                  <TabsTrigger value="login" className="rounded-full font-semibold uppercase tracking-wider text-[10px] data-[state=active]:bg-[#2D241E] data-[state=active]:text-white">Connexion</TabsTrigger>
                  <TabsTrigger value="register" className="rounded-full font-semibold uppercase tracking-wider text-[10px] data-[state=active]:bg-[#2D241E] data-[state=active]:text-white">Rejoindre</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="mt-0">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                  <RegisterForm onSuccess={() => setAuthMode("login")} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    )
  }

  const user = dashboardData?.user || session.user
  const stats = dashboardData?.stats || { totalOrders: 0, totalSpent: 0, points: 0, rank: "Silver Ritualist", artisanImpactFamilies: 1 }
  const orders = dashboardData?.orders || []
  const wishlist = dashboardData?.wishlist || []
  const addresses = dashboardData?.addresses || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
      case "DELIVERED":
        return <Badge className="bg-emerald-100 text-emerald-800 uppercase font-bold text-[9px] h-5 tracking-widest border-none">Payé / Livré</Badge>
      case "SHIPPED":
        return <Badge className="bg-blue-100 text-blue-800 uppercase font-bold text-[9px] h-5 tracking-widest border-none">Expédié</Badge>
      case "CANCELLED":
        return <Badge className="bg-rose-100 text-rose-800 uppercase font-bold text-[9px] h-5 tracking-widest border-none">Annulé</Badge>
      default:
        return <Badge className="bg-amber-100 text-amber-800 uppercase font-bold text-[9px] h-5 tracking-widest border-none">En cours</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <main className="pt-32 lg:pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* Left Side: Profile Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-8">
            <Card className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-white">
              <div className="p-8 sm:p-10 flex flex-col items-center text-center space-y-6">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-primary/10 ring-offset-4 overflow-hidden shadow-2xl group cursor-pointer">
                  {user.image ? (
                    <NextImage src={user.image} alt={user.name || "User"} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="128px" />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold uppercase italic">
                      {user.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white" onClick={() => setActiveTab("settings")}>
                    <Settings className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#2D241E]">{user.name}</h2>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground italic">
                    Membre depuis {user.createdAtFormatted || "Fév 2026"}
                  </p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex gap-3 justify-center items-center">
                    <Badge className="bg-[#2D241E] text-white px-3 py-1 font-bold text-[10px] uppercase tracking-wider">{stats.rank}</Badge>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{stats.points} pts</span>
                    </div>
                  </div>
                  
                  {((session.user as any)?.role === "SELLER" || (session.user as any)?.role === "SUPER_ADMIN") && (
                    <Link href={(session.user as any)?.role === "SUPER_ADMIN" ? "/admin" : "/seller"} className="w-full mt-2">
                      <Button className="w-full h-11 rounded-2xl bg-primary text-white hover:bg-primary/90 font-bold uppercase tracking-widest text-[9px] shadow-lg shadow-primary/10 flex items-center justify-center gap-2">
                        <LayoutDashboard className="h-3.5 w-3.5" />
                        {(session.user as any)?.role === "SUPER_ADMIN" ? "Panel Admin" : "Espace Artisan"}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-6 bg-stone-50 space-y-2">
                {[
                  { id: "orders", icon: Package, label: "Vos Commandes", count: orders.length },
                  { id: "wishlist", icon: Heart, label: "Vos Favoris", count: wishlist.length },
                  { id: "addresses", icon: MapPin, label: "Adresses", count: addresses.length },
                  { id: "payment", icon: CreditCard, label: "Modes de Paiement" },
                  { id: "settings", icon: Settings, label: "Paramètres" }
                ].map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-between h-12 rounded-2xl px-6 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-white text-primary shadow-sm border border-primary/5' : 'text-muted-foreground hover:bg-white hover:text-[#2D241E]'}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="h-5 px-2 rounded-full bg-stone-200 text-stone-700 text-[10px] font-bold flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </Button>
                ))}

                <Separator className="my-4 bg-border/20" />

                <Button 
                  variant="ghost" 
                  onClick={() => logout()}
                  className="w-full justify-start h-12 rounded-2xl gap-4 px-6 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </Button>
              </div>
            </Card>

            {/* Impact Badge */}
            <div className="p-8 bg-[#2D241E] rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl">
              <div className="relative z-10 space-y-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Award className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold italic">Impact Artisan</h3>
                <p className="text-xs text-white/70 leading-relaxed italic">
                  Vos achats ont directement soutenu <strong>{stats.artisanImpactFamilies} familles sénégalaises</strong> grâce au commerce équitable Moomel.
                </p>
                <Link href="/about" className="inline-flex items-center text-primary font-bold text-xs uppercase group">
                  Voir notre charte d'impact <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            </div>
          </aside>

          {/* Right Side: Content Area */}
          <div className="flex-1 w-full space-y-12">
            <FadeContent blur={true} duration={0.4}>

              {/* TAB: ORDERS */}
              {activeTab === "orders" && (
                <div className="space-y-10">
                  <div className="flex justify-between items-end pb-4 border-b border-border/40">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-[#2D241E]">Commandes Récentes</h2>
                      <p className="text-xs text-muted-foreground mt-1">Historique de vos rituels et achats d'artisanat.</p>
                    </div>
                    <Link href="/marketplace" className="text-xs font-bold text-primary flex items-center gap-2 hover:underline uppercase tracking-wider">
                      <ShoppingBag className="w-4 h-4" /> Nouvelle Commande
                    </Link>
                  </div>

                  {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Chargement de vos commandes...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 text-center space-y-6 shadow-sm border border-stone-100">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                        <Package className="w-8 h-8" />
                      </div>
                      <div className="space-y-2 max-w-sm mx-auto">
                        <h3 className="text-xl font-bold text-[#2D241E]">Aucune commande pour le moment</h3>
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                          Vous n'avez pas encore passé de commande. Explorez notre catalogue pour découvrir nos rituels faits main.
                        </p>
                      </div>
                      <Link href="/marketplace">
                        <Button className="rounded-full bg-[#2D241E] text-white hover:bg-black px-8 h-12 font-bold uppercase tracking-widest text-xs">
                          Découvrir le Marché <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order: any) => (
                        <Card 
                          key={order.id} 
                          className="border-none shadow-sm hover:shadow-xl bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 group border border-transparent hover:border-primary/10"
                        >
                          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center">
                            <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100">
                              <NextImage 
                                src={order.firstImage} 
                                alt="Product" 
                                fill 
                                className="object-cover transition-transform group-hover:scale-110 duration-700" 
                                sizes="80px" 
                              />
                            </div>
                            <div className="flex-1 space-y-2 text-center md:text-left">
                              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <span className="text-lg font-bold text-[#2D241E]">{order.displayId}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                                <Clock className="w-3.5 h-3.5 text-stone-400" /> Commandé le {order.date}
                              </p>
                            </div>
                            <div className="space-y-1 text-center md:text-right">
                              <div className="text-xl font-bold text-[#2D241E]">{formatPrice(order.total)}</div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {order.itemCount} article{order.itemCount > 1 ? "s" : ""} inclus
                              </p>
                            </div>
                            <div className="md:pl-6 border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 w-full md:w-auto">
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setSelectedOrder(order)
                                  setIsDetailsOpen(true)
                                }}
                                className="w-full md:w-auto rounded-full border-[#2D241E] h-12 px-6 text-xs font-bold uppercase tracking-widest hover:bg-[#2D241E] hover:text-white transition-all group/btn"
                              >
                                Voir Détails <Eye className="w-4 h-4 ml-2 transition-transform group-hover/btn:scale-110" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  <div className="p-8 sm:p-10 bg-[#F6EBE1] rounded-[2.5rem] border border-[#E9E1D6] flex flex-col md:flex-row items-center gap-8">
                    <div className="p-5 bg-white rounded-3xl shadow-lg flex items-center justify-center text-primary shrink-0">
                      <MessageCircle className="w-8 h-8" />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h3 className="text-xl font-bold text-[#2D241E] italic">Besoin d'aide sur une commande ?</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-md italic">
                        Notre équipe est disponible 7j/7 pour vous assister sur la livraison, les retours ou des conseils personnalisés.
                      </p>
                    </div>
                    <div className="md:ml-auto shrink-0">
                      <Link href="/contact">
                        <Button className="rounded-full bg-[#2D241E] text-white hover:bg-black px-8 h-12 font-bold uppercase tracking-widest text-xs">
                          Contacter le support
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: WISHLIST */}
              {activeTab === "wishlist" && (
                <div className="space-y-10">
                  <div className="flex justify-between items-end pb-4 border-b border-border/40">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-[#2D241E]">Vos Favoris</h2>
                      <p className="text-xs text-muted-foreground mt-1">Vos produits enregistrés et rituels préférés.</p>
                    </div>
                  </div>

                  {wishlist.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 text-center space-y-6 shadow-sm border border-stone-100">
                      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-400 mx-auto">
                        <Heart className="w-8 h-8" />
                      </div>
                      <div className="space-y-2 max-w-sm mx-auto">
                        <h3 className="text-xl font-bold text-[#2D241E]">Aucun favori enregistré</h3>
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                          Cliquez sur le cœur d'un produit dans le marché pour l'ajouter à vos coup de cœur.
                        </p>
                      </div>
                      <Link href="/marketplace">
                        <Button className="rounded-full bg-[#2D241E] text-white hover:bg-black px-8 h-12 font-bold uppercase tracking-widest text-xs">
                          Explorer le Marché
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((item: any) => (
                        <Card key={item.id} className="border-none shadow-sm hover:shadow-xl bg-white rounded-[2rem] overflow-hidden p-5 space-y-4 group">
                          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-stone-100">
                            <NextImage src={item.images?.[0] || "/images/placeholder.jpg"} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            <button 
                              onClick={() => handleRemoveWishlist(item.id)}
                              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.shop?.name}</p>
                            <h4 className="text-base font-bold text-[#2D241E] line-clamp-1">{item.name}</h4>
                            <p className="text-sm font-bold text-[#2D241E]">{formatPrice(item.price)}</p>
                          </div>
                          <Link href={`/marketplace`}>
                            <Button className="w-full rounded-full bg-[#2D241E] text-white hover:bg-black h-10 font-bold uppercase tracking-widest text-[10px]">
                              Commander
                            </Button>
                          </Link>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: ADDRESSES */}
              {activeTab === "addresses" && (
                <div className="space-y-10">
                  <div className="flex justify-between items-end pb-4 border-b border-border/40">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-[#2D241E]">Adresses de Livraison</h2>
                      <p className="text-xs text-muted-foreground mt-1">Adresses enregistrées lors de vos commandes précédentes.</p>
                    </div>
                  </div>

                  {addresses.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-12 text-center space-y-6 shadow-sm border border-stone-100">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mx-auto">
                        <MapPin className="w-8 h-8" />
                      </div>
                      <p className="text-xs text-muted-foreground italic max-w-sm mx-auto">
                        Vos adresses de livraison seront automatiquement enregistrées ici lors de votre première commande.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((addr: any, idx: number) => (
                        <Card key={idx} className="border-none shadow-sm bg-white rounded-[2rem] p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-[#2D241E] text-sm">Adresse #{idx + 1}</h4>
                              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Vérifiée</p>
                            </div>
                          </div>
                          <div className="space-y-1 text-xs text-stone-600 pt-2 border-t border-stone-100">
                            <p><strong>Adresse :</strong> {addr.address}</p>
                            <p><strong>Ville :</strong> {addr.city}</p>
                            <p><strong>Téléphone :</strong> {addr.phone}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: PAYMENT METHODS */}
              {activeTab === "payment" && (
                <div className="space-y-10">
                  <div className="pb-4 border-b border-border/40">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#2D241E]">Méthodes de Paiement</h2>
                    <p className="text-xs text-muted-foreground mt-1">Options de règlement disponibles sur la plateforme.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm bg-white rounded-[2rem] p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                          💵
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2D241E]">Paiement à la Livraison</h4>
                          <p className="text-xs text-muted-foreground">Réglez en espèces à la réception de votre commande.</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[9px]">Disponible par défaut</Badge>
                    </Card>

                    <Card className="border-none shadow-sm bg-white rounded-[2rem] p-6 space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                          📱
                        </div>
                        <div>
                          <h4 className="font-bold text-[#2D241E]">PayDunya (Wave, Orange Money)</h4>
                          <p className="text-xs text-muted-foreground">Paiement Mobile Money sécurisé et instantané.</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[9px]">Disponible</Badge>
                    </Card>
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-10 animate-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-end pb-4 border-b border-border/40">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-[#2D241E]">Paramètres du Compte</h2>
                      <p className="text-xs text-muted-foreground mt-1">Gérez vos informations personnelles et votre sécurité.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 space-y-6">
                      <h3 className="text-lg font-bold text-[#2D241E] flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" /> Statistiques du Profil
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Commandes Effectuées</span>
                          <span className="text-xl font-bold text-[#2D241E]">{stats.totalOrders}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Dépensé</span>
                          <span className="text-xl font-bold text-[#2D241E]">{formatPrice(stats.totalSpent)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Points Fidélité</span>
                          <span className="text-xl font-bold text-amber-600">{stats.points} pts</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-stone-50 rounded-2xl">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Rang Mécène</span>
                          <span className="text-xl font-bold text-primary italic">{stats.rank}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="rounded-[2.5rem] border-none shadow-xl bg-white p-8 space-y-6">
                      <h3 className="text-lg font-bold text-[#2D241E] flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" /> Sécurité & Confidentialité
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-stone-50 rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#2D241E]">Notifications Email</p>
                            <p className="text-[10px] text-muted-foreground font-light italic">Recevoir les confirmations et suivis.</p>
                          </div>
                          <Badge className="bg-emerald-100 text-emerald-800 border-none font-bold text-[9px]">Activé</Badge>
                        </div>
                        <div className="p-4 bg-stone-50 rounded-2xl flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-[#2D241E]">Compte Moomel</p>
                            <p className="text-[10px] text-muted-foreground font-light italic">Authentification sécurisée v2.</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 border-none font-bold text-[9px]">Vérifié</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Profile Edit Card */}
                  <div className="p-8 sm:p-10 bg-[#2D241E] rounded-[2.5rem] text-white space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary"><Settings className="w-6 h-6" /></div>
                      <h3 className="text-2xl font-bold italic">Détails d'identité</h3>
                    </div>

                    {!isEditingProfile ? (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Nom Complet</p>
                            <p className="text-sm font-medium">{user.name || "Non spécifié"}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Adresse Email</p>
                            <p className="text-sm font-medium">{user.email}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Statut Membre</p>
                            <p className="text-sm font-medium text-emerald-400 flex items-center gap-2"><Award className="w-4 h-4" /> Membre Actif</p>
                          </div>
                        </div>
                        <Button 
                          onClick={() => setIsEditingProfile(true)}
                          variant="outline" 
                          className="rounded-full border-white/20 text-white hover:bg-white hover:text-[#2D241E] h-12 px-8 font-bold uppercase tracking-widest text-[9px]"
                        >
                          Modifier mes informations
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSaveProfile} className="space-y-6 max-w-md pt-2">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold text-white/80 uppercase tracking-widest">Nom Complet</Label>
                          <Input 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl h-12"
                          />
                        </div>
                        <div className="flex gap-4">
                          <Button 
                            type="submit" 
                            disabled={isSavingProfile}
                            className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 h-11 font-bold uppercase tracking-widest text-[9px]"
                          >
                            {isSavingProfile ? "Enregistrement..." : "Enregistrer"}
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => setIsEditingProfile(false)}
                            className="rounded-full text-white/70 hover:text-white hover:bg-white/10 h-11 px-6 font-bold uppercase tracking-widest text-[9px]"
                          >
                            Annuler
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

            </FadeContent>
          </div>
        </div>
      </main>

      {/* ORDER DETAILS MODAL */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="w-[94vw] max-w-2xl bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-5 sm:p-8 border-none shadow-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <div className="space-y-6">
              <DialogHeader className="border-b border-stone-100 pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pr-6">
                  <div>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-[#2D241E] break-words">
                      Commande {selectedOrder.displayId}
                    </DialogTitle>
                    <DialogDescription className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                      Effectuée le {selectedOrder.date}
                    </DialogDescription>
                  </div>
                  <div>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                </div>
              </DialogHeader>

              {/* Shipping & Payment Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-stone-50 rounded-2xl text-xs text-stone-700">
                <div>
                  <p className="font-bold text-[#2D241E] uppercase text-[10px] tracking-widest mb-1 text-muted-foreground">Livraison</p>
                  <p className="font-semibold">{selectedOrder.shippingAddress || "Adresse principale"}</p>
                  <p>{selectedOrder.city} • {selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-[#2D241E] uppercase text-[10px] tracking-widest mb-1 text-muted-foreground">Paiement</p>
                  <p className="font-semibold">{selectedOrder.paymentMethod === "CASH" ? "Paiement à la livraison (CASH)" : "PayDunya"}</p>
                  <p className="text-emerald-700 font-bold">{selectedOrder.paymentStatus === "PAID" ? "Payé" : "À régler lors du dépôt"}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#2D241E] uppercase tracking-widest">Articles de la commande ({selectedOrder.items?.length || 0})</h4>
                <div className="space-y-3 divide-y divide-stone-100">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <NextImage src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-primary">{item.shopName}</p>
                        <h5 className="text-sm font-bold text-[#2D241E] truncate">{item.name}</h5>
                        <p className="text-xs text-stone-500">Qté: {item.quantity} × {formatPrice(item.price)}</p>
                      </div>
                      <div className="text-right font-bold text-sm text-[#2D241E]">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-stone-200 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total articles :</span>
                  <span className="font-semibold">{formatPrice(selectedOrder.total - 2500 - Math.round((selectedOrder.total - 2500) * 0.05))}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Frais de livraison :</span>
                  <span className="font-semibold">{formatPrice(2500)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Frais de service & TVA :</span>
                  <span className="font-semibold">{formatPrice(Math.round((selectedOrder.total - 2500) * 0.05))}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2D241E] pt-2 border-t border-stone-200">
                  <span>Total Réglé :</span>
                  <span className="text-primary">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <AccountPageContent />
    </Suspense>
  )
}
