"use server"

import { mandirHeaders } from "@/lib/backend-headers"

const API = process.env.API_URL || "https://backend.shreetripurasundari.com"

export async function subscribeEmail(email: string, source: string, name?: string) {
  try {
    const res = await fetch(`${API}/subscriber`, {
      method: "POST",
      headers: mandirHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email, source, ...(name ? { name } : {}) }),
    })
    const json = await res.json().catch(() => ({}))
    return { ok: res.ok && json.success, message: json.message || "" }
  } catch {
    return { ok: false, message: "कुछ गड़बड़ हुई, पुनः प्रयास करें" }
  }
}

export async function contactMessage(form: { name: string; email: string; phone: string; message: string }) {
  try {
    const res = await fetch(`${API}/subscriber/contact`, {
      method: "POST",
      headers: mandirHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(form),
    })
    const json = await res.json().catch(() => ({}))
    return { ok: res.ok && json.success, message: json.message || "" }
  } catch {
    return { ok: false, message: "कुछ गड़बड़ हुई, पुनः प्रयास करें" }
  }
}
