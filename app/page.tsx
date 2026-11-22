import Link from "next/link"
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react"
import { PRODUCTS } from "@/lib/products"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="relative rounded-3xl bg-orange-900 text-white overflow-hidden py-20 px-8 md:px-16 mb-16">
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            A real home for your dog while you're away
          </h1>
          <p className="text-orange-100 text-lg mb-8 max-w-xl">
            The everyday and royal tent homes for working pet parents — with
            sleeping, eating and play corners, mesh airflow, and AI comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/doggy-dera"
              className="bg-white text-orange-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-100 transition"
            >
              Explore Doggy Dera — ₹3,999
            </Link>
            <Link
              href="/maharaja-dera"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Explore Maharaj Dera — ₹7,999
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="text-center mb-16">
        <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
          "Working pet parents worry about their dog being alone — hot, hungry,
          bored or anxious. Happy While Away gives your dog a safe, comfortable
          tent home of its own."
        </p>
      </section>

      {/* Products */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/${product.id}`}
              className="group block border rounded-2xl p-6 hover:border-orange-400 hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition"
              />
              <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
              <span className="text-xl font-bold text-orange-600 block mb-4">
                ₹{product.price}
              </span>
              <p className="text-gray-600 text-sm mb-6 line-clamp-4">
                {product.shortDescription}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-orange-600">
                <ArrowRight size={16} /> View details
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Truck size={32} className="text-orange-500" />,
              title: "Choose & customize",
              body:
                "Pick Doggy Dera or Maharaj Dera, choose colour, print, size and your dog's name.",
            },
            {
              icon: <Zap size={32} className="text-orange-500" />,
              title: "Delivered in 3–5 days",
              body: "Your tent home arrives ready to set up, anywhere in India.",
            },
            {
              icon: <ShieldCheck size={32} className="text-orange-500" />,
              title: "Safe & comfortable",
              body: "Mesh airflow, AI comfort controls and app alerts for peace of mind.",
            },
          ].map((step, i) => (
            <div key={i} className="text-center p-6 rounded-xl border bg-white">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4 text-orange-600 font-bold">
                {i + 1}
              </div>
              {step.icon}
              <h3 className="text-lg font-bold mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety promise */}
      <section className="border rounded-2xl p-8 md:p-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Safety promise</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Every dera is built with pet-safe materials, breathable mesh and
          non-toxic finishes. The AI comfort system switches on only when
          needed, and every order includes a 1-year warranty.
        </p>
        <div className="flex justify-center gap-4 text-sm text-gray-500">
          <span>✓ Pet-safe materials</span>
          <span>✓ Breathable mesh</span>
          <span>✓ 1-year warranty</span>
          <span>✓ COD & UPI payment</span>
        </div>
      </section>
    </div>
  )
}
