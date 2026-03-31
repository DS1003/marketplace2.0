import { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole
  id: string
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
