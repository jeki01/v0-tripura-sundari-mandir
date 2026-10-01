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
    <form onSubmit={submit} className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="अपना ईमेल पता दर्ज करें"
        aria-label="ईमेल पता"
        className="w-full rounded-full border border-[#C8941A]/60 bg-white px-5 py-3 text-[#3A2A1A] outline-none focus:ring-2 focus:ring-[#FF6B00]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-8 py-3 font-semibold text-white shadow transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {msg && (
        <p role="status" className={`text-sm sm:basis-full ${status === "ok" ? "text-green-700" : "text-red-600"}`}>
          {msg}
        </p>
      )}
    </form>
  )
}
