import { type NextRequest, NextResponse } from "next/server"

const STORAGE_ORIGIN = "https://storage.shreetripurasundari.com"

// Only raster/animated formats — SVG is excluded because it can contain <script>
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
])

const MAX_BYTES = 10 * 1024 * 1024 // 10 MB hard cap

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams.get("p") || ""
  // Reject empty paths, directory traversal, and null bytes
  if (!p.startsWith("/") || p.includes("..") || p.includes("\0")) {
    return new NextResponse("Bad Request", { status: 400 })
  }
  try {
    const upstream = await fetch(`${STORAGE_ORIGIN}${p}`, {
      next: { revalidate: 60 * 60 * 24 },
    })
    if (!upstream.ok) return new NextResponse(null, { status: upstream.status })

    // Block SVG and other non-image content types (could contain scripts)
    const rawType = upstream.headers.get("content-type") || ""
    const mimeBase = rawType.split(";")[0].trim().toLowerCase()
    if (!ALLOWED_TYPES.has(mimeBase)) {
      return new NextResponse("Unsupported media type", { status: 415 })
    }

    // Reject files that are already known to be too large before streaming
    const length = Number(upstream.headers.get("content-length") || 0)
    if (length > MAX_BYTES) return new NextResponse("Too large", { status: 413 })

    // Stream the body — never buffer the whole file into RAM
    return new NextResponse(upstream.body, {
      headers: {
        "Content-Type": mimeBase,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch {
    return new NextResponse("Bad Gateway", { status: 502 })
  }
}
