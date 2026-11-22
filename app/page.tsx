import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShieldCheck, Truck, ShieldAlert } from "lucide-react"
import { PRODUCTS } from "@/lib/products"

const [d, m] = PRODUCTS

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Hero */}
      <section className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585110396000-13365ea886c0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-40" />
        <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold tracking-wide uppercase mb-6">
              Now available
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6">
              A real home<span className="text-orange-400"> for your dog</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl mx-auto leading-relaxed">
              Everyday comfort or royal luxury. Mesh airflow, food feeder, 3L steel water tank,
              AI comfort that switches on only when needed. Delivered in 3–5 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/doggy-dera"
                className="px-8 py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/30"
              >
                Shop Doggy Dera — ₹3,999
              </Link>
              <Link
                href="/maharaja-dera"
                className="px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-100 transition shadow-sm border border-orange-200 text-orange-700 bg-white"
              >
                Shop Maharaj Dera — ₹7,999
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-sm font-semibold tracking-wide uppercase mb-4">
          The problem, solved in one line
        </span>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          Working pet parents worry their dog is{" "}
          <span className="relative">
            alone<span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-orange-400/60 rounded-full -z-10" />
          </span>{" "}
          — hot, hungry, bored, or anxious.
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Happy While Away gives your dog a safe, comfortable tent home of its own — with sleeping, eating, and play
          corners, breathable mesh, and AI comfort that switches on only when needed.
        </p>
      </section>

      {/* Products */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Choose your dera
            </h2>
            <p className="text-slate-600 mt-2">Everyday comfort or royal peace of mind</p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-orange-50 hover:border-orange-200 transition shadow-sm"
          >
            <ArrowRight size={16} /> Compare both
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/${product.id}`}
              className="group relative block rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-300 transition duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-orange-600">
                  ₹{product.price}
                </div>
                {product.id === "maharaja-dera" && (
                  <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                    + App Plan ₹149/mo
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-1">{product.name}</h3>
                <p className="text-sm text-orange-600 font-semibold mb-3">{product.shortDescription.split(".")[0]}</p>
                <ul className="text-sm text-slate-600 space-y-2 mb-4">
                  {product.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-green-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-orange-600">
                    ₹{product.price}
                  </span>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Delivered 3–5 days
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-20 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-12">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck size={36} className="text-orange-500" />,
              title: "Choose & customize",
              body:
                "Pick Doggy Dera or Maharaj Dera. Choose colour, print, size, and your dog's name stitched on the door.",
            },
            {
              icon: <Truck size={36} className="text-orange-500" />,
              title: "Delivered in 3–5 days",
              body:
                "Your dera arrives ready to set up, anywhere in India — with mesh airflow and pet-safe materials.",
            },
            {
              icon: <ShieldAlert size={36} className="text-orange-500" />,
              title: "Safe & comfortable",
              body:
                "AI comfort switches on only when needed. App alerts keep you informed wherever you are.",
            },
          ].map((step, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-slate-200 bg-white hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:text-white transition">
                {step.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety promise */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-slate-200 bg-slate-900 overflow-hidden p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">
                Safety promise
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Every dera is built with pet-safe materials, breathable mesh, and non-toxic finishes. The AI comfort
                system switches on only when needed, and every order includes a 1-year warranty.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "✓ Pet-safe materials",
                  "✓ Breathable mesh",
                  "✓ 1-year warranty",
                  "✓ COD & UPI payment",
                ].map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/images/doggy-dera.jpg"
                alt="Doggy Dera safety"
                className="w-full h-64 object-cover rounded-2xl shadow-2xl border border-slate-700"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
