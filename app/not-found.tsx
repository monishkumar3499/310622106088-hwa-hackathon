import Link from "next/link"

export const dynamic = "force-dynamic"

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-8">Page not found</p>
      <Link
        href="/"
        className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
      >
        Go home
      </Link>
    </div>
  )
}
