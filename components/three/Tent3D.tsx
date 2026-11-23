"use client"

import { useState, useEffect } from "react"

type TentProps = {
  colour?: string
  size?: "small" | "medium" | "large"
  interactive?: boolean
}

const scaleBySize: Record<string, number> = { small: 0.85, medium: 1, large: 1.15 }

const COLOUR_STYLES: Record<string, string> = {
  sand: "#e6dcc8",
  navy: "#1e3a8a",
  olive: "#556b2f",
  rose: "#c08080",
}

export function Tent3D({
  colour = "#e6dcc8",
  size = "medium",
  interactive = true,
}: TentProps) {
  const s = scaleBySize[size]
  const bgColor = COLOUR_STYLES[colour] ?? "#e6dcc8"
  const darker = shadeColor(bgColor, -20)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-white/30 rounded-2xl overflow-hidden border border-slate-100"
      style={{ transform: `scale(${s})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ground shadow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-2 bg-black/10 blur-xl rounded-full transition-all duration-300" />

      {/* Tent body - CSS 3D */}
      <div className="relative z-10 w-32 h-24 mx-auto">
        {/* Front face */}
        <div
          className="absolute inset-0 bg-orange-200 border-4 border-orange-300 rounded-t-lg transform rotate-x-[20deg] skew-x-[5deg] transform-origin-bottom"
          style={{ backgroundColor: bgColor }}
        />
        {/* Left face (3D depth) */}
        <div
          className="absolute -left-4 top-0 w-4 h-24 bg-orange-300 border-t-4 border-orange-300 border-l-4 border-orange-400 transform skew-y-[-25deg] transform-origin-top-right"
          style={{ backgroundColor: darker }}
        />
        {/* Right face (3D depth) */}
        <div
          className="absolute right-4 top-0 w-4 h-24 bg-orange-200 border-t-4 border-orange-300 border-r-4 border-orange-400 transform skew-y-[25deg] transform-origin-top-left"
          style={{ backgroundColor: bgColor }}
        />
        {/* Roof overhang */}
        <div className="absolute -top-4 left-[-6px] right-[-6px] h-4 bg-orange-500 border-2 border-orange-400 rounded-t-lg transform rotate-x-[15deg] transform-origin-bottom" />
        {/* Roof peak */}
        <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-16 border-r-16 border-t-16 border-transparent border-b-orange-500" />
        {/* Door */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-white/20 backdrop-blur rounded-full border-2 border-white/30" />
        {/* Door arch */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-4 bg-transparent border-t-4 border-white/40 rounded-t-full" />
      </div>

      {/* Accessories */}
      <div className="absolute bottom-10 left-1/4 w-8 h-1 rounded-full bg-amber-300 opacity-60" />
      <div className="absolute bottom-10 right-1/4 w-8 h-1 rounded-full bg-blue-300 opacity-60" />
      <div className="absolute bottom-9 left-2/5 w-6 h-6 rounded-full bg-red-400 shadow-lg" />
      <div className="absolute bottom-9 right-2/5 w-6 h-6 rounded-full bg-green-400 shadow-lg" />
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-yellow-400 shadow-lg" />

      {/* Float animation */}
      <div className="absolute inset-0 animate-pulse" />
    </div>
  )
}

function shadeColor(color: string, percent: number): string {
  const f = parseInt(color.slice(1), 16)
  const t = percent < 0 ? 0 : 255
  const p = percent < 0 ? percent * -1 : percent
  const R = f >> 16
  const G = (f >> 8) & 0x00ff
  const B = f & 0x00ff
  const calc = (c: number) =>
    Math.round((t - c) * p / 100) + c
  const hex = (c: number) =>
    c.toString(16).padStart(2, "0")
  return `#${hex(calc(R))}${hex(calc(G))}${hex(calc(B))}`
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-slate-50 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <div className="w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">H</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight italic font-serif">
            A real home for your dog
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-gradient-to-b from-slate-50 via-white to-orange-50">
      {/* Decorative floating elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: "2s" }} />

      <Tent3D colour="#e6dcc8" size="large" interactive={false} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="relative z-20 flex items-end justify-center pb-20 px-4 text-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg italic font-serif">
          A real home<span className="text-orange-500"> for your dog</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-100 mt-4 max-w-xl mx-auto drop-shadow drop-shadow-black/40">
          Everyday comfort or royal luxury - mesh airflow, food feeder, water tank, AI comfort.
        </p>
      </div>
    </div>
  )
}

export function ProductViewer3D({ colour = "#e6dcc8" }: { colour?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
        <div className="animate-pulse rounded-full w-16 h-16 bg-gray-300" />
      </div>
    )
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-white/50 group">
      <div className="absolute inset-0 flex items-center justify-center">
        <Tent3D colour={colour} size="large" interactive />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
        <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm border border-white/50">
          3D Interactive Preview
        </span>
      </div>
    </div>
  )
}
