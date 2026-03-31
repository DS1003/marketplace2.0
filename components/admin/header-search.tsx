"use client"

import { Search, Command as CommandIcon } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

interface HeaderSearchProps {
  placeholder?: string
  className?: string
}

export function HeaderSearch({ placeholder = "Search...", className }: HeaderSearchProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "relative w-full max-w-md flex items-center gap-3 px-4 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-white hover:border-zinc-200 hover:shadow-lg hover:shadow-zinc-200/40 transition-all group",
          className
        )}
      >
        <Search className="h-4 w-4 text-zinc-400 group-hover:text-primary transition-colors" />
        <span className="text-[13px] font-medium text-zinc-400 group-hover:text-zinc-600 transition-colors flex-1 text-left">
          {placeholder}
        </span>
        <kbd className="pointer-events-none hidden h-6 select-none items-center gap-1 rounded-lg border border-zinc-200 bg-white px-1.5 font-mono text-[10px] font-bold text-zinc-400 sm:flex group-hover:border-zinc-300 group-hover:text-zinc-500 transition-all">
          <span className="text-[12px]">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search records, products, analytics..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick Access">
            <CommandItem onSelect={() => runCommand(() => router.push("/seller"))}>
              <CommandIcon className="mr-2 h-4 w-4 text-primary" />
              <span>Dashboard Overview</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/seller/products"))}>
              <CommandIcon className="mr-2 h-4 w-4 text-primary" />
              <span>Manage Products</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/seller/orders"))}>
              <CommandIcon className="mr-2 h-4 w-4 text-primary" />
              <span>Order Fulfilment</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => router.push("/seller/products/new"))}>
              <CommandIcon className="mr-2 h-4 w-4 text-zinc-400" />
              <span>Add New Product</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/seller/settings"))}>
              <CommandIcon className="mr-2 h-4 w-4 text-zinc-400" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
