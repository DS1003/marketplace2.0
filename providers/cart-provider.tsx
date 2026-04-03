"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    seller?: string
    organic?: boolean
}

interface CartContextType {
    items: CartItem[]
    addItem: (product: any) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    totalItems: number
    subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Initial load
    useEffect(() => {
        const saved = localStorage.getItem("moomel-cart")
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Persist changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("moomel-cart", JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addItem = useCallback((product: any) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === product.id)
            if (existing) {
                return prev.map(i => 
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity || 1,
                image: product.image || (product.images?.[0] || ""),
                seller: product.shop?.name || product.seller || "Artisan Lab",
                organic: product.organic || true
            }]
        })
    }, [])

    const removeItem = useCallback((id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }, [])

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) return removeItem(id)
        setItems(prev => prev.map(i => 
            i.id === id ? { ...i, quantity } : i
        ))
    }, [removeItem])

    const clearCart = useCallback(() => {
        setItems([])
    }, [])

    const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)
    const subtotal = items.reduce((acc, i) => acc + (i.price * i.quantity), 0)

    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            totalItems,
            subtotal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
