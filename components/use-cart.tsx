"use client"

import { useState, useEffect } from "react"
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

  return { cart, total, itemCount }
}
