import { type NextRequest, NextResponse } from "next/server"

const STORAGE_ORIGIN = "https://storage.shreetripurasundari.com"

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams.get("p") || ""
  if (!p.startsWith("/") || p.includes("..") || p.includes("\0")) {
    return new NextResponse("Bad Request", { status: 400 })
  }
  try {
    const upstream = await fetch(`${STORAGE_ORIGIN}${p}`, {
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!upstream.ok) return new NextResponse(null, { status: upstream.status })
    const body = await upstream.arrayBuffer()
    const contentType = upstream.headers.get("content-type") || "application/octet-stream"
    return new NextResponse(body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    })
  } catch {
    return new NextResponse("Bad Gateway", { status: 502 })
  }
}
