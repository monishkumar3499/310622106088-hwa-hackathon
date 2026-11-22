"use client"

import { useState, useEffect, useCallback } from "react"
import type { CartItem } from "@/lib/cart"
import { loadCart, saveCart, cartTotal } from "@/lib/cart"

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(loadCart())
  }, [])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const total = cartTotal(cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.productId === item.productId)
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
              : i
          )
        }
        return [...prev, { ...item, quantity: item.quantity ?? 1 }]
      })
    },
    []
  )

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }, [])

  const removeItem = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  return { cart, addItem, setQuantity, removeItem, total, itemCount }
}
