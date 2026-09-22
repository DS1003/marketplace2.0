import { Metadata, ResolvingMetadata } from "next"
import { notFound } from "next/navigation"
import { getProductById, getRelatedProducts } from "@/lib/actions/public"
import { getProductReviews } from "@/lib/actions/reviews"
import ProductClient from "./product-client"

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const res = await getProductById(id)
  
  if (!res.success || !res.data) {
    return {
      title: "Produit Introuvable | Moomel",
    }
  }

  const product = res.data
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${product.name} | Moomel`,
    description: product.description || `Achetez ${product.name} sur Moomel.`,
    openGraph: {
      title: `${product.name} | Moomel`,
      description: product.description || `Achetez ${product.name} sur Moomel.`,
      images: product.images?.[0] ? [{ url: product.images[0] }, ...previousImages] : previousImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Moomel`,
      description: product.description || `Achetez ${product.name} sur Moomel.`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const productRes = await getProductById(id)
  
  if (!productRes.success || !productRes.data) {
    notFound()
  }

  const product = productRes.data
  
  const [relatedRes, reviewsRes] = await Promise.all([
    getRelatedProducts(id, product.categoryId),
    getProductReviews(id)
  ])

  const relatedProducts = relatedRes.success ? (relatedRes.data || []) : []
  const initialReviews = reviewsRes.success ? (reviewsRes.data || []) : []

  return (
    <ProductClient 
      product={product} 
      relatedProducts={relatedProducts} 
      initialReviews={initialReviews} 
    />
  )
}
