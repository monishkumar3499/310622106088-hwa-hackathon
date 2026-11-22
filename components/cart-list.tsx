"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Minus, Trash2 } from "lucide-react"
import type { CartItem } from "@/lib/cart"
import {
  loadCart,
  saveCart,
  cartTotal,
  updateCartQuantity,
  removeCartItem,
} from "@/lib/cart"

export function CartList() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    setCart(loadCart())
  }, [])

  const total = cartTotal(cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (itemCount === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <Link
          href="/"
          className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  const setQuantity = (productId: string, quantity: number) => {
    const newCart = updateCartQuantity(cart, productId, quantity)
    saveCart(newCart)
    setCart(newCart)
  }

  const removeItem = (productId: string) => {
    const newCart = removeCartItem(cart, productId)
    saveCart(newCart)
    setCart(newCart)
  }

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <div className="lg:col-span-3 space-y-6">
        {cart.map((item) => (
          <div
            key={`${item.productId}-${item.customization?.name || ""}`}
            className="flex gap-4 p-4 border rounded-2xl bg-white"
          >
            <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200">
              <img
                src={item.image}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{item.productName}</h3>
              {item.customization && (
                <p className="text-sm text-gray-500 mb-3">
                  {item.customization.colour} • {item.customization.print} •{" "}
                  {item.customization.size}{item.customization.name
                    ? ` • "${item.customization.name}"`
                    : ""}
                </p>
              )}
              {item.appPlan && (
                <p className="text-sm text-green-600 mb-3">
                  + Happy While Away App Plan (₹149/month)
                </p>
              )}
              <div className="flex items-center gap-4 mb-2">
                <span className="text-lg font-bold">
                  ₹{item.price.toLocaleString()}
                </span>
                <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity - 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-1 text-gray-900 font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(item.productId, item.quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-8 p-6 border rounded-2xl bg-white shadow-sm">
          <div className="flex justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold text-lg">₹{total.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4 mb-6">
            <span className="text-sm text-gray-500">Delivery</span>
            <span className="text-sm font-medium text-gray-900">3–5 days</span>
          </div>
          <Link
            href="/checkout"
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition block text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
