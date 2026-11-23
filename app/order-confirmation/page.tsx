import Link from "next/link"
import { CheckCircle, Truck, Home, Calendar, Mail } from "lucide-react"

export default function OrderConfirmationPage() {
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search)
  const orderId = params.get("orderId") ?? "N/A"
  const email = params.get("email") ?? ""

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 4)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-green-600">
        <CheckCircle size={32} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Order placed!</h1>
      <p className="text-gray-600 mb-8">Thank you for shopping with Happy While Away.</p>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 text-left mb-10">
        <div className="flex justify-between items-center mb-6 pb-6 border-b">
          <span className="text-gray-600">Order ID</span>
          <span className="font-mono font-bold text-orange-600">#{orderId}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Order date</span>
          <span className="font-medium">{new Date().toLocaleDateString("en-IN")}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Payment</span>
          <span className="font-medium">Cash on Delivery</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Expected delivery</span>
          <span className="font-medium">
            {deliveryDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </span>
        </div>
        {email && (
          <div className="flex justify-between items-center mb-4 border-t border-gray-100 pt-4">
            <span className="text-gray-600">Confirmation email sent to</span>
            <span className="font-medium text-orange-600">{email}</span>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Mail size={20} className="text-blue-600" />
          <span className="font-medium text-blue-800">Support Email</span>
        </div>
        <p className="text-blue-700 font-medium text-lg">
          support@happywhileaway.com
        </p>
        <p className="text-blue-600 text-sm mt-2">
          Need help with your order? Email us anytime and we'll respond within 24 hours.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
        >
          <Home size={20} className="mr-2" /> Shop more
        </Link>
        <Link
          href="/faq"
          className="px-8 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          <Calendar size={20} className="mr-2" /> Track delivery
        </Link>
      </div>
    </div>
  )
}
