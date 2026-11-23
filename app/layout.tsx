import type { Metadata } from "next"
import { Inter, Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"
import { Header, Footer } from "@/components/header-footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "600", "700", "900"] })
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Happy While Away - Dog Tents for Working Pet Parents",
  description:
    "Doggy Dera and Maharaj Dera - everyday and royal tent homes for dogs. Mesh windows, food feeder, water tank, AI camera alerts, trip mode. Delivered in 3-5 days.",
  openGraph: {
    title: "Happy While Away - Dog Tents for Working Pet Parents",
    description:
      "Doggy Dera (₹3,999) and Maharaj Dera (₹7,999) - tent homes for dogs with AI camera alerts and trip mode.",
    type: "website",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/favicon.svg",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        type: "image/svg+xml",
        url: "/favicon.svg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${poppins.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        <Header />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
