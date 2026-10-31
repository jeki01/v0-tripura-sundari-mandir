"use server"

import { mandirHeaders } from "@/lib/backend-headers"

const API = process.env.API_URL || "https://backend.shreetripurasundari.com"

export async function bookShringar(data: {
  name: string
  phone: string
  email: string
  date: string
  website: string
}): Promise<{ ok: boolean; message?: string; conflict?: boolean }> {
  try {
    const res = await fetch(`${API}/shringar/book`, {
      method: "POST",
      headers: mandirHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(data),
    })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.success) return { ok: true }
    return { ok: false, message: json.message || "कुछ गड़बड़ हुई, कृपया पुनः प्रयास करें", conflict: res.status === 409 }
  } catch {
    return { ok: false, message: "नेटवर्क में समस्या है, कृपया पुनः प्रयास करें" }
  }
}
