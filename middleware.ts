import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
  const isPublicRoute = ["/", "/marketplace", "/about", "/contact", "/become-seller", "/sell"].includes(nextUrl.pathname) || nextUrl.pathname.startsWith("/categories") || nextUrl.pathname.startsWith("/product")
  const isAuthRoute = ["/account"].includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", nextUrl))
    }
    return
  }

  // Add protection for admin/seller routes if needed
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/account", nextUrl))
  }

  return
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
