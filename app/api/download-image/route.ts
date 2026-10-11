// Sends a darshan picture as a file download ("Content-Disposition: attachment"), so the Download button saves
// it to the visitor's device straight away instead of opening the picture in the browser. The browser asks this
// site (same origin), so it does not depend on the storage service allowing cross-origin downloads.
// Only pictures from the storage service and this site's own /images folder can be fetched here.
const ALLOWED_HOST = "storage.shreetripurasundari.com"
const MAX_BYTES = 15 * 1024 * 1024

function cleanName(raw: string | null): string {
  const base = (raw || "").replace(/[^A-Za-z0-9._-]/g, "-").replace(/^[.-]+/, "").slice(0, 80)
  return /\.(jpe?g|png|webp|gif)$/i.test(base) ? base : `${base || "tripura-sundari-darshan"}.jpg`
}

function target(raw: string | null, origin: string): URL | null {
  if (!raw) return null
  try {
    if (raw.startsWith("/")) {
      return raw.startsWith("/images/") && !raw.includes("..") ? new URL(raw, origin) : null
    }
    const u = new URL(raw)
    if (u.hostname.toLowerCase() !== ALLOWED_HOST || !/^https?:$/.test(u.protocol)) return null
    u.protocol = "https:" // the storage service is served over https
    u.port = ""
    return u
  } catch {
    return null
  }
}

export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url)
  const url = target(searchParams.get("url"), origin)
  if (!url) return new Response("Invalid image address", { status: 400 })

  let upstream: Response
  try {
    upstream = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) })
  } catch {
    return new Response("Could not fetch the image", { status: 502 })
  }
  const type = upstream.headers.get("content-type") || ""
  if (!upstream.ok || !upstream.body || !type.startsWith("image/")) return new Response("Image not available", { status: 404 })
  const length = Number(upstream.headers.get("content-length") || 0)
  if (length > MAX_BYTES) return new Response("Image too large", { status: 413 })

  const name = cleanName(searchParams.get("name"))
  const headers = new Headers({
    "Content-Type": type,
    "Content-Disposition": `attachment; filename="${name}"`,
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  })
  if (length) headers.set("Content-Length", String(length))
  return new Response(upstream.body, { headers })
}
