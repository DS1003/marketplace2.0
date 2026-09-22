"use client"

import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, ShoppingBag, Menu, User } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

interface SearchCommandProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function SearchCommand({ isOpen, setIsOpen }: SearchCommandProps) {
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [isOpen, setIsOpen])

  const runCommand = useCallback((command: () => void) => {
    setIsOpen(false)
    command()
  }, [setIsOpen])

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <CommandInput placeholder="Rechercher des produits, catégories, artisans..." />
      <CommandList className="max-h-[70vh]">
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => runCommand(() => router.push("/marketplace"))}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Parcourir tous les produits</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/categories"))}>
            <Menu className="mr-2 h-4 w-4" />
            <span>Voir les catégories</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Catégories populaires">
          <CommandItem onSelect={() => runCommand(() => router.push("/marketplace?category=Skincare"))}>Soins du Visage</CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/marketplace?category=Haircare"))}>Soins Capillaires</CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/marketplace?category=Oils"))}>Huiles Naturelles</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Paramètres">
          <CommandItem onSelect={() => runCommand(() => router.push("/account"))}>
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>P
            </kbd>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
