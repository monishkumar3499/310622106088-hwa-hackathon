"use client"

import { useState, useEffect } from "react"
import type { CartItem } from "@/lib/cart"
import { loadCart, saveCart, cartTotal } from "@/lib/cart"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Home, MapPin } from "lucide-react"

interface FormData {
  name: string
  phone: string
  address: string
  pincode: string
  state: string
}

const INITIAL: FormData = {
  name: "",
  phone: "",
  address: "",
  pincode: "",
  state: "",
}

export function CheckoutForm() {
  const [cart, setCart] = useState<CartItem[]>([])
  useEffect(() => {
    setCart(loadCart())
  }, [])
  const total = cartTotal(cart)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const router = useRouter()
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: string; text: string } | null>(
    null
  )

  if (itemCount === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <Link href="/" className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition">
          Start shopping
        </Link>
      </div>
    )
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = "Name is required"
    if (!/^[6-9]\d{9}$/.test(form.phone))
      next.phone = "Enter a valid 10-digit mobile number"
    if (!form.address.trim()) next.address = "Address is required"
    if (!/^\d{6}$/.test(form.pincode)) next.pincode = "Enter a valid 6-digit PIN code"
    if (!form.state.trim()) next.state = "State is required"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setMessage(null)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cart,
          total,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Order failed")
      const orderId = data.orderId
      window.localStorage.removeItem("hwa_cart")
      setMessage({ type: "success", text: `Order placed! Order ID: ${orderId}` })
      setTimeout(() => router.push(`/order-confirmation?orderId=${orderId}`), 1500)
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Something went wrong" })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Link
          href="/cart"
          className="text-sm text-gray-500 hover:text-orange-500 flex items-center gap-1"
        >
          <ChevronLeft size={16} /> Back to cart
        </Link>
        <h1 className="text-2xl font-bold ml-auto">Checkout</h1>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl mb-6 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Delivery details</h2>
            <Field
              label="Full name"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
            <Field
              label="Mobile number"
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              error={errors.phone}
            />
            <Field
              label="Address"
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              error={errors.address}
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                label="PIN code"
                id="pincode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                error={errors.pincode}
              />
              <Field
                label="State"
                id="state"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                error={errors.state}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 disabled:opacity-60 transition"
          >
            {submitting ? "Placing order..." : "Place Order"}
          </button>
        </form>
      </div>

      <div className="mt-12 p-6 border rounded-2xl bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Order summary</h2>
        <div className="space-y-3 text-sm">
          {cart.map((item) => (
            <div key={item.productId} className="flex justify-between">
              <span className="text-gray-600">
                {item.productName} × {item.quantity}
              </span>
              <span className="font-medium">
                ₹{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Expected delivery: 3–5 days</p>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 block">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-lg border ${
          error ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
        } text-gray-900 outline-none transition`}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
