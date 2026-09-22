import { MetadataRoute } from "next"
import prisma from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.moomel.sn"

  // Static routes
  const staticRoutes = [
    "",
    "/marketplace",
    "/cart",
    "/checkout",
    "/about",
    "/contact",
    "/become-seller",
    "/terms",
    "/privacy",
    "/cookies",
    "/help",
    "/mission",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  try {
    // Dynamic Product routes
    const products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }))

    // Dynamic Seller (Shop) routes
    const shops = await prisma.shop.findMany({
      where: { status: "APPROVED" },
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const shopRoutes = shops.map((shop) => ({
      url: `${baseUrl}/sellers/${shop.id}`,
      lastModified: shop.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))

    return [...staticRoutes, ...productRoutes, ...shopRoutes]
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Fallback to static routes if DB connection fails during build
    return staticRoutes
  }
}
