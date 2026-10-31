"use server"

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://backend.shreetripurasundari.com"

export async function toggleDarshanLike(visitorId: string, liked: boolean): Promise<{ count?: number }> {
  try {
    const r = await fetch(`${API}/darshan/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId, liked }),
    })
    const d = await r.json().catch(() => ({}))
    return { count: d.count }
  } catch {
    return {}
  }
}
