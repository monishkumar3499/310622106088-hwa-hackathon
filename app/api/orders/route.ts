import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, address, pincode, state, payment, items, total } = body

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (!/^[6-9]\d{9}$/.test(String(phone || ""))) {
      return NextResponse.json({ error: "Valid mobile number required" }, { status: 400 })
    }
    if (!address || !address.trim()) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 })
    }
    if (!/^\d{6}$/.test(String(pincode || ""))) {
      return NextResponse.json({ error: "Valid 6-digit PIN code required" }, { status: 400 })
    }
    if (!state || !state.trim()) {
      return NextResponse.json({ error: "State is required" }, { status: 400 })
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Generate order ID: HWA + timestamp + random
    const orderId = "HWA" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000).toString().padStart(3, "0")

    // In production, save to database here
    console.log("Order received:", { orderId, name, phone, address, pincode, state, payment, items, total })

    return NextResponse.json({ orderId, success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
