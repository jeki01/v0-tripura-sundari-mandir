import { NextResponse } from "next/server"
import { mandirHeaders } from "@/lib/backend-headers"

const API = process.env.API_URL || "https://backend.shreetripurasundari.com"

export async function GET() {
  try {
    const res = await fetch(`${API}/content/notices`, { cache: "no-store", headers: mandirHeaders() })
    const json = await res.json().catch(() => ({}))
    return NextResponse.json(json)
  } catch {
    return NextResponse.json({ data: null }, { status: 500 })
  }
}
