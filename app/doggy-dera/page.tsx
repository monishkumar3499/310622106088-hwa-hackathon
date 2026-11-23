"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import nextDynamic from "next/dynamic"
import { ProductCustomizer } from "@/components/product-customizer"
import { FeatureCarousel } from "@/components/feature-carousel"
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

export default function DoggyDeraPage() {
  const product = getProduct("doggy-dera")
  const [selectedImage, setSelectedImage] = useState<string>(product?.image ?? "/images/doggy dera pic.png")

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
              alt={product?.name ?? "Doggy Dera"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-orange-600">
              ₹{product?.price}
            </div>
          </div>
          <div className="mt-6"><ProductViewer3D colour="#e6dcc8" /></div>
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

      <FeatureCarousel features={product?.features ?? []} />
    </div>
  )
}
