import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Happy While Away — Dog Tents for Working Pet Parents",
  description:
    "Doggy Dera and Maharaj Dera — everyday and royal tent homes for dogs. Mesh windows, food feeder, water tank, AI camera alerts, trip mode. Delivered in 3–5 days.",
  openGraph: {
    title: "Happy While Away — Dog Tents for Working Pet Parents",
    description:
      "Doggy Dera (₹3,999) and Maharaj Dera (₹7,999) — tent homes for dogs with AI camera alerts and trip mode.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
