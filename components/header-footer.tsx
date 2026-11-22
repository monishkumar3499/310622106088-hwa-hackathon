"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "@/components/use-cart"
import { ShoppingCart, Menu, X, Phone, Mail, MapPin, Clock } from "lucide-react"

export function Header() {
  const { itemCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md border-slate-200">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
              H
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              Happy While Away
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
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
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center h-full pt-20 gap-8 text-white">
            <Link
              href="/"
              className="text-xl font-bold hover:text-orange-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/doggy-dera"
              className="text-xl font-bold hover:text-orange-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Doggy Dera
            </Link>
            <Link
              href="/maharaja-dera"
              className="text-xl font-bold hover:text-orange-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Maharaj Dera
            </Link>
            <Link
              href="/compare"
              className="text-xl font-bold hover:text-orange-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Compare
            </Link>
            <Link
              href="/faq"
              className="text-xl font-bold hover:text-orange-400 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="mt-8 flex flex-col items-center gap-4 text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-orange-500" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-orange-500" />
                <span>support@happywhileaway.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-orange-500" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-orange-500" />
                <span>Mon - Sat: 9AM - 6PM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                H
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Happy While Away
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Giving your dog a safe, comfortable tent home of its own — with
              sleeping, eating, and play corners, breathable mesh, and AI comfort.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-orange-500 transition">
                <span className="text-[10px]">f</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-orange-500 transition">
                <span className="text-[10px]">📷</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-orange-500 transition">
                <span className="text-[10px]">📱</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/doggy-dera" className="hover:text-orange-400 transition">Doggy Dera</Link></li>
              <li><Link href="/maharaja-dera" className="hover:text-orange-400 transition">Maharaj Dera</Link></li>
              <li><Link href="/compare" className="hover:text-orange-400 transition">Compare</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-orange-400 transition">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-orange-400 transition">Track Delivery</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500" />
                <span>support@happywhileaway.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-orange-500" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-orange-500" />
                <span>Mon - Sat: 9AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 pb-4 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Happy While Away. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}