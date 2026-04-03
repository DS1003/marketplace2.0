import { getWishlist } from "@/lib/actions/wishlist"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedProducts } from "@/components/featured-products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"

export default async function WishlistPage() {
  const wishlistRes = await getWishlist()
  const products = wishlistRes.success ? wishlistRes.data : []

  // Map products to the format FeaturedProducts expects
  const mappedProducts = products.map((p: any) => ({
    ...p,
    isWishlisted: true
  }))

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <Link 
              href="/account" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-3 h-3" />
              Retour au profil
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground flex items-center gap-4">
              Mes Favoris
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary fill-primary" />
            </h1>
            <p className="text-muted-foreground mt-4 text-base md:text-lg font-light max-w-lg">
              Retrouvez ici tous les produits que vous avez aimés pour les commander plus tard.
            </p>
          </div>
          
          {products.length > 0 && (
            <Link href="/marketplace">
              <Button variant="outline" className="rounded-full px-8 h-12 border-border/50 text-sm font-bold uppercase tracking-widest">
                Continuer mes achats
              </Button>
            </Link>
          )}
        </div>

        {products.length > 0 ? (
          <FeaturedProducts 
            initialProducts={mappedProducts} 
            limit={null} 
            hideHeader={true} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Votre liste est vide</h2>
            <p className="text-muted-foreground max-w-sm mb-8">
              Il semblerait que vous n'ayez pas encore ajouté de coups de cœur à votre liste.
            </p>
            <Link href="/marketplace">
              <Button className="rounded-full px-8 h-14 bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                Découvrir nos rituels
                <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
        
        {/* If we have products, we'll use a modified display logic or the FeaturedProducts component if I adjust its constraints.
            Let's adjust FeaturedProducts to allow showing all products passed without slice(0,4).
        */}
      </div>

      <Footer />
    </main>
  )
}
