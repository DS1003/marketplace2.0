import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/marketplace",
  "/about",
  "/contact",
  "/become-seller",
  "/sell",
  "/account",
  "/help",
  "/mission",
  "/press",
  "/careers",
  "/privacy",
  "/terms",
  "/cookies",
  "/returns",
  "/shipping",
  "/seller-faq",
  "/best-sellers",
  "/new",
  "/deals",
]

// Route prefixes that are always public
const publicPrefixes = [
  "/categories",
  "/product",
  "/sellers",
  "/account",
]

// API routes that should not be intercepted
const ignoredPrefixes = [
  "/api/auth",
  "/api/webhook",
  "/_next",
]

function isPublicRoute(pathname: string): boolean {
  if (publicRoutes.includes(pathname)) return true
  return publicPrefixes.some((prefix) => pathname.startsWith(prefix))
}

function isIgnoredRoute(pathname: string): boolean {
  return ignoredPrefixes.some((prefix) => pathname.startsWith(prefix))
}

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const pathname = nextUrl.pathname

  // Skip auth routes and webhooks
  if (isIgnoredRoute(pathname)) return

  // Skip static files
  if (pathname.includes(".")) return

  // Admin routes: require SUPER_ADMIN role
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/account", nextUrl))
    }
    // Role check is handled by the layout since middleware only has basic auth info
    return
  }

  // Seller routes: require authenticated user
  if (pathname.startsWith("/seller")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/account", nextUrl))
    }
    return
  }

  // Checkout: require authenticated user
  if (pathname.startsWith("/checkout")) {
    if (!isLoggedIn) {
      return Response.redirect(new URL("/account", nextUrl))
    }
    return
  }

  // Public routes: allow everyone
  if (isPublicRoute(pathname)) return

  // All other routes: require authentication
  if (!isLoggedIn) {
    return Response.redirect(new URL("/account", nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)"],
}
