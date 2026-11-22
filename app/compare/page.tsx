export const dynamic = "force-dynamic"

import Link from "next/link"
import { PRODUCTS } from "@/lib/products"
import { ShieldCheck, Clock, Users, Smartphone, Camera } from "lucide-react"

export default function ComparePage() {
  const [d, m] = PRODUCTS

  const rows = [
    {
      label: "Price",
      d: "₹3,999",
      m: "₹7,999",
    },
    {
      label: "Sleeping corner",
      d: "✓ Soft, washable",
      m: "✓ Soft, washable",
    },
    {
      label: "Eating corner + water tank",
      d: "✓ Dry feeder, 3L steel tank",
      m: "✓ Dry feeder, 3L steel tank",
    },
    {
      label: "Play corner",
      d: "✓ Chew toys & snuffle mat",
      m: "✓ Chew toys & snuffle mat",
    },
    {
      label: "Mesh airflow",
      d: "✓",
      m: "✓",
    },
    {
      label: "Custom colour / print / size / name",
      d: "✓",
      m: "✓",
    },
    {
      label: "Battery fan & cooling gel mat",
      d: "✗",
      m: "✓",
    },
    {
      label: "Heated pad for cold",
      d: "✗",
      m: "✓",
    },
    {
      label: "AI camera + app alerts",
      d: "✗",
      m: "✓",
    },
    {
      label: "Key-holder calls on High alerts",
      d: "✗",
      m: "✓ (+ app plan)",
    },
    {
      label: "Trip mode (2–7 days)",
      d: "✗",
      m: "✓ (+ app plan)",
    },
    {
      label: "Delivery",
      d: "3–5 days",
      m: "3–5 days",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-12 text-center">Compare the Deras</h1>

      <div className="grid lg:grid-cols-[1fr_300px_300px] gap-6 border border-gray-200 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="col-span-3 bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Feature</h2>
            <div className="flex gap-4">
              <div className="text-center">
                <h3 className="font-bold">{d.name}</h3>
                <p className="text-xl font-bold text-orange-600">₹{d.price}</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold">{m.name}</h3>
                <p className="text-xl font-bold text-orange-600">₹{m.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="col-span-3 p-4 border-b flex items-center justify-between bg-white hover:bg-gray-50 transition last:border-0"
          >
            <span className="text-gray-700 font-medium">{row.label}</span>
            <div className="flex gap-4 text-center">
              <span className="font-medium">{row.d}</span>
              <span className="font-medium">{row.m}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <div className="p-8 border rounded-2xl bg-gray-50">
          <h3 className="text-xl font-bold mb-4 text-center">{d.name}</h3>
          <p className="text-xl font-bold text-orange-600 text-center mb-6">
            ₹{d.price}
          </p>
          <ul className="space-y-3 text-sm text-gray-700 mb-8">
            {d.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-500" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/doggy-dera"
            className="block w-full py-3 rounded-xl border border-orange-200 text-orange-700 font-semibold text-center hover:bg-orange-50 transition"
          >
            Choose Doggy Dera
          </Link>
        </div>
        <div className="p-8 border rounded-2xl bg-white shadow">
          <h3 className="text-xl font-bold mb-4 text-center">{m.name}</h3>
          <p className="text-xl font-bold text-orange-600 text-center mb-6">
            ₹{m.price}
          </p>
          <ul className="space-y-3 text-sm text-gray-700 mb-8">
            {m.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-500" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/maharaja-dera"
            className="block w-full py-3 rounded-xl bg-orange-500 text-white font-semibold text-center hover:bg-orange-600 transition"
          >
            Choose Maharaj Dera
          </Link>
        </div>
      </div>
    </div>
  )
}
