import { InteractiveCart } from "@/components/cart-interactive"

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
          🛒
        </span>
        <h1 className="text-2xl font-bold">Your Cart</h1>
      </div>
      <InteractiveCart />
    </div>
  )
}
