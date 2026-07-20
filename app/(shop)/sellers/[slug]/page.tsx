import { getPublicSellerById } from "@/lib/actions/public"
import SellerShopClient from "./seller-shop-client"
import { notFound } from "next/navigation"

import { Metadata, ResolvingMetadata } from "next"

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const sellerRes = await getPublicSellerById(slug)
  
  if (!sellerRes.success || !sellerRes.data) {
    return {
      title: "Boutique Introuvable | Moomel",
    }
  }

  const shop = sellerRes.data
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${shop.name} - Boutique sur Moomel`,
    description: shop.description || `Découvrez les produits bio de ${shop.name} sur Moomel, la marketplace de la beauté naturelle du Sénégal.`,
    openGraph: {
      title: `${shop.name} | Moomel`,
      description: shop.description || `Découvrez les produits bio de ${shop.name} sur Moomel.`,
      images: shop.image ? [{ url: shop.image }, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${shop.name} | Moomel`,
      description: shop.description || `Découvrez les produits bio de ${shop.name} sur Moomel.`,
      images: shop.image ? [shop.image] : [],
    },
  }
}

export default async function SellerShopPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const sellerRes = await getPublicSellerById(slug)
    
    if (!sellerRes.success || !sellerRes.data) {
        notFound()
    }

    return <SellerShopClient initialSeller={sellerRes.data} />
}
