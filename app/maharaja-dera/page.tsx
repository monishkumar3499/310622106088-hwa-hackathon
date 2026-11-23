"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import nextDynamic from "next/dynamic"
import { ProductCustomizer } from "@/components/product-customizer"
import { FeatureCarousel } from "@/components/feature-carousel"
import {
  AlertTriangle,
  ShieldAlert,
  Phone,
} from "lucide-react"
import { getProduct } from "@/lib/products"

const ProductViewer3D = nextDynamic(
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

const ALERTS = [
  {
    level: "Low",
    color: "green",
    icon: <ShieldAlert className="text-green-600" size={24} />,
    desc: "Your dog is resting or playing normally. No action needed.",
  },
  {
    level: "Moderate",
    color: "amber",
    icon: <AlertTriangle className="text-amber-600" size={24} />,
    desc: "Unusual barking or movement. Check the live feed in the app.",
  },
  {
    level: "High",
    color: "red",
    icon: <Phone className="text-red-600" size={24} />,
    desc: "Possible distress. We also call your key-holder neighbour or relative.",
  },
]

export default function MaharajaDeraPage() {
  const product = getProduct("maharaja-dera")
  const [selectedImage, setSelectedImage] = useState<string>(product?.image ?? "/images/maharaj dera pic.png")

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product?.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xl">
            <Image
              src={selectedImage}
              alt={product?.name ?? "Maharaj Dera"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-orange-600">
              ₹{product?.price}
            </div>
            <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
              + App Plan ₹149/mo
            </div>
          </div>
          <div className="mt-6"><ProductViewer3D colour="#b45309" /></div>
          <div className="grid grid-cols-4 gap-2">
            {(product?.images ?? []).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-full h-20 object-cover rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedImage === img
                    ? "border-orange-500 shadow-[0_0_0_4px_rgba(234,179,8,0.2)]"
                    : "border-gray-200 hover:border-orange-400"
                }`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        </div>

        <ProductCustomizer product={product!} />
      </div>

      <section className="mt-16 border rounded-2xl p-8 bg-white">
        <h2 className="text-2xl font-bold mb-6">AI Alert Levels</h2>
        <p className="text-gray-600 mb-8 max-w-xl">
          The AI camera watches your dog and sends Low, Moderate or High alerts
          to your phone through the Happy While Away app.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {ALERTS.map((a) => (
            <div
              key={a.level}
              className={`rounded-xl p-6 border text-center ${
                a.color === "green"
                  ? "bg-green-50 border-green-100"
                  : a.color === "amber"
                    ? "bg-amber-50 border-amber-100"
                    : "bg-red-50 border-red-100"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 ${
                a.color === "green"
                  ? "bg-green-100 text-green-600"
                  : a.color === "amber"
                    ? "bg-amber-100 text-amber-600"
                    : "bg-red-100 text-red-600"
              }`}>
                {a.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900">{a.level} alert</h3>
              <p className="text-sm text-gray-600">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FeatureCarousel features={product?.features ?? []} />
    </div>
  )
}
