"use client"

import { useState } from "react"
import { API_BASE } from "@/lib/api"

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [subscribe, setSubscribe] = useState(true)
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle")
  const [msg, setMsg] = useState("")
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(`${API_BASE}/subscriber/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        // also subscribe if opted in and email present
        if (subscribe && form.email) {
          fetch(`${API_BASE}/subscriber`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: form.email, name: form.name, source: "mandir-contact" }),
          }).catch(() => {})
        }
        setStatus("ok"); setMsg("धन्यवाद! आपका संदेश भेज दिया गया है।")
        setForm({ name: "", email: "", phone: "", message: "" })
      } else {
        setStatus("err"); setMsg(json.message || "संदेश नहीं भेजा जा सका")
      }
    } catch {
      setStatus("err"); setMsg("कुछ गड़बड़ हुई, पुनः प्रयास करें")
    }
  }

  const inputCls = "border border-orange-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400"

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className={inputCls} placeholder="आपका नाम" value={form.name} onChange={(e) => set("name", e.target.value)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input className={inputCls} type="email" placeholder="ईमेल" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <input className={inputCls} placeholder="मोबाइल नंबर" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
      </div>
      <textarea className={inputCls} rows={4} placeholder="आपका संदेश" value={form.message} onChange={(e) => set("message", e.target.value)} />
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={subscribe} onChange={(e) => setSubscribe(e.target.checked)} />
        मंदिर के अपडेट्स ईमेल पर प्राप्त करें (Subscribe)
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" disabled={status === "loading"} className="bg-[#B30000] text-white px-8 py-2 rounded-lg hover:bg-[#990000] transition disabled:opacity-60">
          {status === "loading" ? "भेजा जा रहा है..." : "भेजें"}
        </button>
        {msg && <span className={`text-sm ${status === "ok" ? "text-green-700" : "text-red-600"}`}>{msg}</span>}
      </div>
    </form>
  )
}
