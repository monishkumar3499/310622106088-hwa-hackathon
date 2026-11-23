"use client"

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

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-orange-500">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{product?.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <ProductViewer3D colour="#e6dcc8" />
          <div className="grid grid-cols-4 gap-2">
            {(product?.images ?? []).map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-20 object-cover rounded-lg border border-gray-200 hover:border-orange-400 cursor-pointer transition"
              />
            ))}
          </div>
        </div>

        <ProductCustomizer product={product!} />
      </div>

      <FeatureCarousel features={product?.features ?? []} />
    </div>
  )
}
