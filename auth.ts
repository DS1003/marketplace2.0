import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import authConfig from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/account",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Internal update of role & shop status from DB for dynamic promotion
      if (user) {
        token.role = (user as any).role
      } 
      
      // Always verify shop status for customers and promote role in session if shop exists
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { role: true, shop: { select: { id: true } } }
      })
      
      if (dbUser) {
        // If they have a shop, they should be treated as SELLER for dashboard access
        token.role = dbUser.shop ? "SELLER" : dbUser.role
        token.hasShop = !!dbUser.shop
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as any
        (session.user as any).hasShop = token.hasShop
      }
      return session
    },
  },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Auth attempt for:", credentials?.email)
        if (!credentials?.email || !credentials?.password) return null

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          })

          console.log("User found in DB:", !!user)

          if (!user || !user.password) return null

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          console.log("Password valid:", isValid)
          if (!isValid) {
            console.log("BCRYPT FAILED: The provided password doesn't match the DB hash.")
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          return null
        }
      },
    }),
  ],
})
