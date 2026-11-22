"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

type FeatureCarouselProps = {
  features: string[]
}

export function FeatureCarousel({ features }: FeatureCarouselProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Features</h2>
      <div className="relative overflow-hidden">
        <div className="flex gap-4 pb-4 overflow-x-auto scroll-snap-x scrollbar-hide sm:no-scrollbar">
          {features.map((f, i) => (
            <div
              key={i}
              className="min-w-[200px] sm:min-w-[240px] flex items-center gap-3 px-4 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm snap-start hover:shadow-md transition"
            >
              <span className="text-orange-500 shrink-0">✓</span>
              <span className="text-sm text-gray-700">{f}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-2 bg-gradient-to-r from-slate-50 to-transparent sm:hidden">
          <button className="p-2 text-gray-600 hover:text-orange-500">
            <ChevronLeft size={18} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-2 bg-gradient-to-l from-slate-50 to-transparent sm:hidden">
          <button className="p-2 text-gray-600 hover:text-orange-500">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
