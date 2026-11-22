"use client"

import { useState, useEffect, useCallback } from "react"
import { Palette, Plus, Minus, ShoppingCart } from "lucide-react"
import type { CartItem } from "@/lib/cart"
import {
  loadCart,
  saveCart,
  cartTotal,
  addToCart,
} from "@/lib/cart"

type CustomizerProps = {
  product: {
    id: string
    name: string
    price: number
    image: string
    shortDescription: string
    features: string[]
  }
}

const COLOURS = [
  { name: "Sand", value: "#f5f5dc", hex: "sand" },
  { name: "Navy", value: "#1e3a8a", hex: "navy" },
  { name: "Olive", value: "#556b2f", hex: "olive" },
  { name: "Rose", value: "#c08080", hex: "rose" },
]
const PRINTS = [
  { name: "Plain", value: "plain" },
  { name: "Paw Print", value: "paws" },
  { name: "Bone", value: "bones" },
  { name: "Stripes", value: "stripes" },
]
const SIZES = [
  { name: "Small", value: "small", extra: 0 },
  { name: "Medium", value: "medium", extra: 500 },
  { name: "Large", value: "large", extra: 1000 },
]

export function ProductCustomizer({ product }: CustomizerProps) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [colour, setColour] = useState(COLOURS[0])
  const [print, setPrint] = useState(PRINTS[0])
  const [size, setSize] = useState(SIZES[0])
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const price = product.price + size.extra

  useEffect(() => {
    setCart(loadCart())
  }, [])

  const addItem = useCallback(() => {
    const newCart = addToCart(cart, {
      productId: product.id,
      productName: product.name,
      price,
      image: product.image,
      quantity,
      customization: {
        colour: colour.name,
        print: print.name,
        size: size.name,
        name,
      },
    })
    saveCart(newCart)
    setCart(newCart)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }, [addToCart, product, price, quantity, colour, print, size, name, cart, saveCart])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-bold text-orange-600 mb-2">
          ₹{price.toLocaleString()}
        </p>
        {size.extra > 0 && (
          <p className="text-sm text-gray-500 mb-4">
            +₹{size.extra.toLocaleString()} for {size.name}
          </p>
        )}
        <p className="text-gray-600 mb-6">{product.shortDescription}</p>
      </div>

      <div className="border rounded-2xl p-6 bg-white">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Palette size={20} /> Customize your dera
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Colour</label>
            <div className="flex flex-col items-center gap-4">
              {COLOURS.map((c) => (
                <div
                  key={c.hex}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    onClick={() => setColour(c)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      colour.value === c.value
                        ? "ring-3 ring-orange-500 scale-110"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    style={{ backgroundColor: c.value }}
                    aria-label={c.name}
                  />
                  <span className="text-xs font-medium text-slate-600">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Print</label>
            <div className="flex flex-col gap-2">
              {PRINTS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPrint(p)}
                  className={`w-full py-2 rounded-lg border text-center transition ${
                    print.value === p.value
                      ? "bg-orange-50 border-orange-200 text-orange-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Size</label>
            <div className="flex gap-2">
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition ${
                    size.value === s.value
                      ? "bg-orange-50 border-orange-200 text-orange-700"
                      : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Name on door</label>
            <input
              type="text"
              maxLength={20}
              placeholder="e.g. Bruno"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-2 rounded-lg border border-gray-200 text-center text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
            />
          </div>
        </div>

        <div className="mt-6 border rounded-xl p-4 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Live preview</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colour.value }} />
            <span className="text-gray-600">{colour.name}</span>
            <span className="w-px h-4 bg-gray-300 mx-2" />
            <span className="text-gray-600">{print.name} print</span>
            <span className="w-px h-4 bg-gray-300 mx-2" />
            <span className="text-gray-600">{size.name}</span>
            {name && (
              <>
                <span className="w-px h-4 bg-gray-300 mx-2" />
                <span className="text-gray-600 font-medium">"{name}"</span>
              </>
            )}
          </div>
        </div>
        </div>

        <div className="flex items-center gap-4 border-t pt-6">
          <div className="flex items-center gap-2 border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 hover:bg-gray-100"
            >
              <Minus size={18} />
            </button>
            <span className="px-4 py-2 text-gray-900 font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              <Plus size={18} />
            </button>
          </div>
          <button
            onClick={() => {
              const msg = `Customization summary for ${product.name}:\nColour: ${colour.name}\nPrint: ${print.name}\nSize: ${size.name}\nName on door: ${name || "None"}\nQuantity: ${quantity}\nPrice: ₹${price.toLocaleString()}\n\nThis will be added to your cart.`;
              alert(msg);
              addItem();
            }}
            className={`ml-4 flex-1 px-6 py-2 rounded-xl font-bold text-base transition flex items-center justify-center gap-2 ${
              added ? "bg-green-600" : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            {added ? "Added to cart!" : (
              <>
                <ShoppingCart size={18} className="mr-0" /> Add to Cart
              </>
            )}
          </button>
        </div>
    </div>
  )
}
