import { NextRequest, NextResponse } from "next/server"

const GOOGLE_API_KEY = process.env.GEMINI_API_KEY
const MODEL = "gemini-1.5-flash-8b"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      )
    }

    const systemPrompt = `You are a helpful customer support assistant for Happy While Away, a company that sells dog tents called "Dera". 

Product information:
- Doggy Dera: ₹3,999 - Everyday tent home for working pet parents. Features: soft washable sleeping corner, eating corner with dry food feeder, 3-litre steel water tank, play corner with chew toys and snuffle mat, mesh airflow, custom colour/print/size/name, delivered in 3-5 days.
- Maharaj Dera: ₹7,999 + App Plan ₹149/mo - Royal version with everything in Doggy Dera plus battery fan & cooling gel mat for heat, heated pad for cold (auto-on), AI camera linked to app with Low/Moderate/High alerts, key-holder calls on High alerts, trip mode for 2-7 days with daily visitor check-in.
- Location: Chennai, Tamil Nadu, India
- Contact: +91 98765 43210, support@happywhileaway.com
- Delivery: 3-5 days across India
- Warranty: 1 year

Be helpful, friendly, and concise. Answer questions about the deras, pricing, delivery, features, and company information. If you don't know something, say so politely.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: messages.map((m: any) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
          })),
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error("Google AI API error body:", errorBody)
      throw new Error(`Google AI API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response."

    return NextResponse.json({ text })
  } catch (error: any) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to get response" },
      { status: 500 }
    )
  }
}
