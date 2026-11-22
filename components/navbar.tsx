import Link from "next/link"
import { useCart } from "@/components/use-cart"
import { ShoppingCart } from "lucide-react"

export function Navbar() {
  const { itemCount } = useCart()
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <span className="font-bold text-xl tracking-tight">Happy While Away</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition">Home</Link>
          <Link href="/doggy-dera" className="hover:text-orange-500 transition">Doggy Dera</Link>
          <Link href="/maharaja-dera" className="hover:text-orange-500 transition">Maharaj Dera</Link>
          <Link href="/compare" className="hover:text-orange-500 transition">Compare</Link>
          <Link href="/faq" className="hover:text-orange-500 transition">FAQ</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-orange-500 transition"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}
