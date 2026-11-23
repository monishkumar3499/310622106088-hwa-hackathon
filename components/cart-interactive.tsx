"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Plus, Minus, Trash2, ArrowRight, CheckCircle, Truck, ShieldCheck } from "lucide-react"
import type { CartItem } from "@/lib/cart"
import {
  loadCart,
  saveCart,
  cartTotal,
  updateCartQuantity,
  removeCartItem,
  addToCart,
} from "@/lib/cart"
import { ProductViewer3D } from "@/components/three/Tent3D"

const FREE_SHIPPING_THRESHOLD = 9999

const COLOUR_HEX: Record<string, string> = {
  Sand: "#e6dcc8",
  Navy: "#1e3a8a",
  Olive: "#556b2f",
  Rose: "#c08080",
}

export function InteractiveCart({ drawer = false }: { drawer?: boolean } = {}) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(drawer)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCart(loadCart())
  }, [])

  useEffect(() => {
    setIsOpen(drawer)
  }, [drawer])

  const total = cartTotal(cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100)

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

  const handleDragStart = (id: string) => {
    setDraggingId(id)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
  }

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-6 text-orange-500">
          <ShoppingCartEmpty size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
        <p className="text-slate-600 mb-8">Add some deras to bring your dog home.</p>
        <Link
          href="/"
          className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/40"
        >
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Cart items */}
      <div className="space-y-5">
        {cart.map((item) => {
          const itemTotal = item.price * item.quantity
          const tentColour = COLOUR_HEX[item.customization?.colour ?? "Sand"] ?? "#e6dcc8"
          return (
            <div
              key={`${item.productId}-${item.customization?.name ?? ""}`}
              className="group relative flex gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300"
              onDragStart={() => handleDragStart(item.productId)}
              onDragEnd={handleDragEnd}
              draggable
            >
              {/* 3D Preview thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative">
                <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: tentColour }}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 leading-tight">
                    {item.productName}
                  </h3>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {item.customization && (
                  <p className="text-xs text-slate-500 mb-3">
                    {item.customization.colour} • {item.customization.print} •{" "}
                    {item.customization.size}{item.customization.name
                      ? ` • "${item.customization.name}"`
                      : ""}
                  </p>
                )}
                {item.appPlan && (
                  <p className="text-xs text-green-600 font-medium mb-3">
                    + Happy While Away App Plan (₹149/month)
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-orange-600">
                    ₹{itemTotal.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1 border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2 py-1 text-slate-900 font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(item.productId, item.quantity + 1)}
                      className="px-2 py-1 text-slate-600 hover:bg-slate-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sticky summary */}
      <div className="mt-6 p-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="space-y-4">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
              <span>Order value</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-300 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {total < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-slate-500 mt-1">
                Add ₹{(FREE_SHIPPING_THRESHOLD - total).toLocaleString()} more for free delivery
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold text-slate-900">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 text-sm">Delivery</span>
              <span className="text-sm font-medium text-green-600">3-5 days</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/40 flex items-center justify-center gap-2"
          >
            <ArrowRight size={20} /> Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

function ShoppingCartEmpty({ size = 24 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l1.66 17.46c.21 2.23 1.17 4.08 2.4 4.72 1.23.64 2.53.52 3.73-.38l2.75-3.57c.76-.99.76-2.57 0-3.56l-3.08-3.92c-.61-.78-1.7-.78-2.31 0l-2.38 3.02c-.33.42-.5.96-.39 1.5l2.2 8.53c.25.97 1.2 1.65 2.21 1.36l4.68-2.43c1.11-.58 1.79-1.75 1.48-2.96l-1.13-4.24c-.23-.85-.74-1.48-1.4-1.88l-2.85-1.74c-.94-.57-2.31-.31-2.87.56l-1.1 2.02c-.37.69-.35 1.55.05 2.18l3.72 5.2c.49.69 1.33 1.06 2.14.75l4.11-1.49c1.44-.52 2.28-1.84 2.02-3.28l-.76-4.1c-.15-.83-.96-1.44-1.79-1.39l-3.31.2c-.72.05-1.38.34-1.86.82l-3.18 3.18c-.52.52-.83 1.25-.91 2.02h-9.63c-1.1 0-2-.9-2-2z" />
    </svg>
  )
}

export function FloatingCartButton({ itemCount }: { itemCount: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <button
        onClick={() => setOpen(!open)}
        className={`w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-2xl shadow-orange-500/50 hover:scale-105 transition-transform duration-200 active:scale-95`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l1.66 17.46c.21 2.23 1.17 4.08 2.4 4.72 1.23.64 2.53.52 3.73-.38l2.75-3.57c.76-.99.76-2.57 0-3.56l-3.08-3.92c-.61-.78-1.7-.78-2.31 0l-2.38 3.02c-.33.42-.5.96-.39 1.5l2.2 8.53c.25.97 1.2 1.65 2.21 1.36l4.68-2.43c1.11-.58 1.79-1.75 1.48-2.96l-1.13-4.24c-.23-.85-.74-1.48-1.4-1.88l-2.85-1.74c-.94-.57-2.31-.31-2.87.56l-1.1 2.02c-.37.69-.35 1.55.05 2.18l3.72 5.2c.49.69 1.33 1.06 2.14.75l4.11-1.49c1.44-.52 2.28-1.84 2.02-3.28l-.76-4.1c-.15-.83-.96-1.44-1.79-1.39l-3.31.2c-.72.05-1.38.34-1.86.82l-3.18 3.18c-.52.52-.83 1.25-.91 2.02h-9.63c-1.1 0-2-.9-2-2z" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white">
            {itemCount > 9 ? "9+" : itemCount}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
    </div>
  )
}
