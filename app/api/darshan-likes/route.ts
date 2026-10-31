import { NextResponse } from "next/server"

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://backend.shreetripurasundari.com"

export async function GET() {
  try {
    const res = await fetch(`${API}/darshan/likes`, { cache: "no-store" })
    const json = await res.json().catch(() => ({}))
    return NextResponse.json(json)
  } catch {
    return NextResponse.json({}, { status: 500 })
  }
}
