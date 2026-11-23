"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Send, X as CloseIcon } from "lucide-react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const initialMessage = "Hi! 👋 I'm your Happy While Away assistant. How can I help you today?"

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: initialMessage }])
    }
  }, [])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: userMessage },
          ],
        }),
      })

      if (!res.ok) throw new Error("Failed to get response")

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <MessageCircle size={24} className="text-white" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold border-2 border-white">
            {messages.filter((m) => m.role === "user").length > 0 ? "1" : "0"}
          </span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-14 right-6 w-full max-w-xs z-[100] flex flex-col h-[600px]">
          {/* Header */}
          <div className="relative z-10 bg-orange-500 rounded-t-2xl p-4 flex items-center justify-between shadow-xl shadow-orange-500/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-orange-500 font-bold">
                H
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Happy While Away</h3>
                <p className="text-xs text-orange-100">Customer Support</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white text-right"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl shadow-sm">
                  <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
                  <div className="w-1/2 h-3 bg-gray-200 rounded" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="relative z-10 p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-full border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1 top-1 bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
