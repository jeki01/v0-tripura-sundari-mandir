"use client"

import { useState } from "react"
import { API_BASE } from "@/lib/api"

export default function SubscribeForm({ source = "mandir" }: { source?: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle")
  const [msg, setMsg] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("loading")
    try {
      const res = await fetch(`${API_BASE}/subscriber`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setStatus("ok"); setMsg("धन्यवाद! आपकी सदस्यता हो गई।"); setEmail("")
      } else {
        setStatus("err"); setMsg(json.message || "सदस्यता विफल")
      }
    } catch {
      setStatus("err"); setMsg("कुछ गड़बड़ हुई, पुनः प्रयास करें")
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="अपना ईमेल पता दर्ज करें"
        className="border border-orange-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#B30000] text-white px-6 py-2 rounded-lg hover:bg-[#990000] transition w-full sm:w-auto disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {msg && (
        <span className={`text-sm self-center ${status === "ok" ? "text-green-700" : "text-red-600"}`}>{msg}</span>
      )}
    </form>
  )
}
