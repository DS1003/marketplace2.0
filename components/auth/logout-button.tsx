"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton({ children, className }: { children?: React.ReactNode, className?: string }) {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: true })
    window.location.href = "/" // Force full refresh/redirect
  }

  return (
    <Button 
      variant="ghost" 
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="h-3 w-3" /> Quitter
    </Button>
  )
}
