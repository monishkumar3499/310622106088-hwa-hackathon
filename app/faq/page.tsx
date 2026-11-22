"use client"

import Link from "next/link"
import { ChevronDown, AlertCircle } from "lucide-react"

export const dynamic = "force-dynamic"

const FAQS = [
  {
    q: "Can I leave my dog for days in the dera?",
    a:
      "Yes. The Maharaj Dera with the Trip Mode app plan covers 2-7 days away with a daily visitor check-in. For shorter absences, the Doggy Dera is perfect for everyday use while you're at work.",
  },
  {
    q: "How does the AI camera alert system work?",
    a:
      "The AI camera monitors your dog and sends Low, Moderate, and High alerts to your phone. High alerts also trigger a call to your key-holder neighbour or relative.",
  },
  {
    q: "Is the dera safe in hot or cold weather?",
    a:
      "Yes. The Maharaj Dera includes automatic comfort - a battery fan and cooling gel mat for heat, and a heated pad for cold - which switch on only when needed.",
  },
  {
    q: "How do I clean the dera?",
    a:
      "The sleeping corner is soft and washable. The eating corner has a dry food feeder and a 3-litre steel water tank. All materials are pet-safe and non-toxic.",
  },
  {
    q: "What sizes are available?",
    a:
      "Both deras come in Small, Medium, and Large sizes. You can also choose the colour, print, and have your dog's name stitched on the door.",
  },
  {
    q: "How long does delivery take?",
    a: "All orders are delivered in 3-5 days across India.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash on Delivery (COD) and UPI.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes, every order includes a 1-year warranty on the dera.",
  },
]

export default function FAQPage() {
  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Hero - smaller */}
      <section className="relative h-[300px] md:h-[350px] overflow-hidden bg-orange-900">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900 via-orange-900/80 to-black" />
        <div className="relative z-10 flex items-center justify-center h-full px-6 text-center">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-semibold tracking-wide uppercase mb-3">
              Frequently Asked Questions
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Everything you need to know
            </h1>
            <p className="text-base text-orange-100 max-w-xl mx-auto">
              Have questions about our deras, app, or delivery? We've got answers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="group border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition">
              <button
                onClick={() => {}}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition bg-white group-hover:bg-orange-50"
              >
                <div className="flex items-center gap-4">
                  <AlertCircle size={20} className="text-orange-500" />
                  <span className="text-lg font-bold text-slate-900">{faq.q}</span>
                </div>
                <ChevronDown size={20} className="text-slate-400 group-hover:text-orange-500 transition" />
              </button>
              <div className="px-6 pb-4 pt-4 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
