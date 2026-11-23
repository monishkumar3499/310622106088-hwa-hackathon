"use client"

import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { PRODUCTS } from "@/lib/products"
import { ShieldCheck, ShieldAlert, Truck, Smartphone } from "lucide-react"

const [d, m] = PRODUCTS

const ProductViewer3D = dynamic(
  () => import("@/components/three/Tent3D").then((mod) => mod.ProductViewer3D),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
        <div className="animate-pulse rounded-full w-16 h-16 bg-gray-300" />
      </div>
    ),
  }
)

const COMPARE_ROWS = [
  {
    label: "Price",
    d: "₹3,999",
    m: "₹7,999",
    dClass: "price-cell",
    mClass: "price-cell",
  },
  {
    label: "App Plan",
    d: "Not required",
    m: "+ ₹149/month",
    dClass: "",
    mClass: "plan-cell",
  },
  {
    label: "Sleeping corner",
    d: "Soft, washable",
    m: "Soft, washable (royal plush)",
    dClass: "",
    mClass: "",
  },
  {
    label: "Eating corner + water tank",
    d: "Dry feeder, 3L steel tank",
    m: "Dry feeder, 3L steel tank (insulated)",
    dClass: "",
    mClass: "",
  },
  {
    label: "Play corner",
    d: "Chew toys & snuffle mat",
    m: "Chew toys & snuffle mat (premium)",
    dClass: "",
    mClass: "",
  },
  {
    label: "Mesh airflow",
    d: "Standard",
    m: "Enhanced cross-ventilation",
    dClass: "",
    mClass: "",
  },
  {
    label: "Custom colour / print / size / name",
    d: "Yes",
    m: "Yes (royal finishes)",
    dClass: "",
    mClass: "",
  },
  {
    label: "Battery fan & cooling gel mat",
    d: "No",
    m: "Yes",
    dClass: "cross",
    mClass: "check",
  },
  {
    label: "Heated pad for cold",
    d: "No",
    m: "Yes (auto-on)",
    dClass: "cross",
    mClass: "check",
  },
  {
    label: "AI camera + app alerts",
    d: "No",
    m: "Yes",
    dClass: "cross",
    mClass: "check",
  },
  {
    label: "Key-holder calls on High alerts",
    d: "No",
    m: "Yes (+ app plan)",
    dClass: "cross",
    mClass: "check",
  },
  {
    label: "Trip mode (2-7 days)",
    d: "No",
    m: "Yes (+ app plan)",
    dClass: "cross",
    mClass: "check",
  },
  {
    label: "Delivery",
    d: "3-5 days",
    m: "3-5 days",
    dClass: "",
    mClass: "",
  },
  {
    label: "Warranty",
    d: "1 year",
    m: "2 years",
    dClass: "",
    mClass: "",
  },
]

export default function ComparePage() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Decorative 3D spheres background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
        {/* Hero section with 3D tents */}
        <div className="text-center mb-16 fade-in">
          <span className="inline-block px-5 py-2 rounded-full bg-orange-500/10 text-orange-600 text-sm font-semibold tracking-wide uppercase mb-4">
            Compare the Deras
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 italic font-italian">
            Which dera is right for your dog?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everyday comfort meets royal luxury. Choose the perfect home for your
            furry companion.
          </p>
        </div>

        {/* 3D Tent previews side by side */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl hover:shadow-2xl transition duration-500">
            <div className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-slate-50">
              <ProductViewer3D colour="#e6dcc8" />
            </div>
            <div className="p-8 text-center">
              <h3 className="text-3xl font-bold italic font-italian text-slate-900 mb-2">
                {d.name}
              </h3>
              <p className="text-2xl font-bold text-orange-600 mb-4">₹{d.price}</p>
              <p className="text-slate-600 text-sm">
                The everyday tent home for working pet parents
              </p>
            </div>
          </div>
          <div className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl hover:shadow-2xl transition duration-500">
            <div className="relative h-[300px] md:h-[400px] flex items-center justify-center bg-slate-50">
              <ProductViewer3D colour="#b45309" />
            </div>
            <div className="p-8 text-center">
              <h3 className="text-3xl font-bold italic font-italian text-slate-900 mb-2">
                {m.name}
              </h3>
              <p className="text-2xl font-bold text-orange-600 mb-4">
                ₹{m.price}
              </p>
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold tracking-wide uppercase">
                + app plan ₹149/mo
              </span>
            </div>
          </div>
        </div>

        {/* Proper HTML Table */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg overflow-hidden mb-20">
          <table className="compare-table w-full text-left">
            <thead>
              <tr>
                <th className="feature-col">Feature</th>
                <th className="font-italian">
                  {d.name} <span className="block text-sm font-normal text-slate-500 mt-1">
                    ₹{d.price}
                  </span>
                </th>
                <th className="font-italian">
                  {m.name} <span className="block text-sm font-normal text-slate-500 mt-1">
                    ₹{m.price} + ₹149/mo
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="feature-col">{row.label}</td>
                  <td className={row.dClass || "font-medium text-slate-700"}>
                    {row.d}
                  </td>
                  <td className={row.mClass || "font-medium text-slate-700"}>
                    {row.m}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-8 text-center">
          <Link
            href="/doggy-dera"
            className="group relative px-10 py-5 rounded-2xl border-2 border-orange-200 bg-white text-orange-700 font-bold text-lg italic font-italian hover:bg-orange-50 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300"
          >
            Choose Doggy Dera <span className="ml-2">→</span>
          </Link>
          <Link
            href="/maharaja-dera"
            className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg italic font-italian hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Choose Maharaj Dera <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Key highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 fade-in">
          {[d, m].map((p, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl border border-slate-100 bg-white text-center"
            >
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:text-white transition duration-300">
                {i === 0 ? (
                  <ShieldCheck size={32} className="text-orange-600" />
                ) : (
                  <ShieldAlert size={32} className="text-orange-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold italic font-italian text-slate-900 mb-3">
                {i === 0 ? "Everyday Comfort" : "Royal Luxury"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {i === 0
                  ? "Perfect for working pet parents - safe, comfortable, delivered in 3-5 days."
                  : "The royal experience with AI comfort, trip mode, and key-holder calls."}
              </p>
            </div>
          ))}
          <div className="p-8 rounded-3xl border-2 border-orange-200 bg-orange-50 text-center">
            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-300">
              <Smartphone size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold italic font-italian text-slate-900 mb-3">
              Complete Peace of Mind
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Trip Mode, AI alerts, key-holder calls, and 2-year warranty for worry-free travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
