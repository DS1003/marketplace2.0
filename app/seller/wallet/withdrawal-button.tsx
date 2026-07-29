"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Import } from "reicon-react"
import { toast } from "sonner"

export function WithdrawalButton({ disabled }: { disabled?: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleWithdrawal = () => {
    setLoading(true)
    setTimeout(() => {
      toast.success("Votre demande de retrait a été envoyée avec succès.")
      setLoading(false)
    }, 1500)
  }

  return (
    <Button 
      onClick={handleWithdrawal}
      disabled={disabled || loading}
      className="h-8 rounded-lg bg-[#0F172A] text-white font-black uppercase tracking-widest text-[8px] px-5 shadow-lg shadow-black/10 hover:translate-y-[-0.5px] transition-all border-none"
    >
      {loading ? (
        <span className="flex items-center gap-2">
           <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
           Traitement...
        </span>
      ) : (
        <>
          <Import className="mr-2 h-3 w-3" /> Demander un Retrait
        </>
      )}
    </Button>
  )
}
