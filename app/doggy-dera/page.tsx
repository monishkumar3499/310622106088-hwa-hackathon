"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ProductCustomizer } from "@/components/product-customizer"
import { FeatureCarousel } from "@/components/feature-carousel"
import { getProduct } from "@/lib/products"

export default function DoggyDeraPage() {
  const product = getProduct("doggy-dera")
  const [selectedImage, setSelectedImage] = useState<string>("/images/doggy dera pic.png")

  const VIEW_IMAGES = [
    { label: "Main", src: "/images/doggy dera pic.png" },
    { label: "Left", src: "/images/Doggy Dera — left view@1x.png" },
    { label: "Right", src: "/images/Doggy Dera — right view@1x.png" },
    { label: "Inside", src: "/images/Doggy Dera — inside view@1x.png" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product?.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          {/* Main product image */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xl">
            <Image
              src={selectedImage}
              alt={product?.name ?? "Doggy Dera"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-orange-600 sm:text-sm">
              ₹{product?.price}
            </div>
          </div>

          {/* View selector thumbnails - single horizontal row */}
          <div className="flex flex-row gap-3 overflow-x-auto scrollbar-hide pb-2">
            {VIEW_IMAGES.map((view, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(view.src)}
                className={`relative group w-24 h-24 rounded-xl border-2 cursor-pointer transition-all duration-200 overflow-hidden shrink-0 ${
                  selectedImage === view.src
                    ? "border-orange-500 shadow-[0_0_0_4px_rgba(234,179,8,0.3)] bg-orange-50"
                    : "border-slate-200 hover:border-orange-400 hover:shadow-sm"
                }`}
              >
                <Image
                  src={view.src}
                  alt={`${view.label} view`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10" />
                <div className="absolute bottom-1 left-1 z-10 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm whitespace-nowrap">
                  {view.label}
                </div>
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
