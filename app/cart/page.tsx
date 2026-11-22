import { CartList } from "@/components/cart-list"

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <CartList />
    </div>
  )
}
