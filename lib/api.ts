// Base URL of the shared portal backend (where blog/CMS content lives).
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://backend.shreetripurasundari.com"

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://shreetripurasundari.com").replace(/\/$/, "")

export async function fetchPublishedBlogs() {
  try {
    const res = await fetch(`${API_BASE}/blog?status=published`, { cache: "no-store" })
    if (!res.ok) return []
    const json = await res.json()
    return Array.isArray(json?.data) ? json.data : []
  } catch {
    return []
  }
}

// `revalidate` (seconds) lets rarely-changing, site-wide content (footer links) be cached
// instead of hitting the API on every request.
export async function fetchContent(key: string, opts?: { revalidate?: number }) {
  try {
    const init = opts?.revalidate ? { next: { revalidate: opts.revalidate } } : { cache: "no-store" as const }
    const res = await fetch(`${API_BASE}/content/${encodeURIComponent(key)}`, init)
    if (!res.ok) return null
    const json = await res.json()
    return json?.data || null
  } catch {
    return null
  }
}

export function hasContent(c: any) {
  return !!(c && (c.html || (Array.isArray(c.items) && c.items.length) || (c.items && !Array.isArray(c.items) && Object.keys(c.items).length)))
}

// True once a section has been saved at least once from the admin (record exists).
// After that, the CMS is the source of truth even if it's been emptied — so the old
// hard-coded fallback no longer reappears.
export function isManaged(c: any) {
  return !!(c && (c.id || c.updatedAt))
}

export async function fetchBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blog/slug/${encodeURIComponent(slug)}`, { cache: "no-store" })
    if (!res.ok) return null
    const json = await res.json()
    return json?.data || null
  } catch {
    return null
  }
}

// ---- Social / media links (managed in admin -> Mandir -> media-handlers) ----
export type SocialLink = { label: string; url: string; platform: string }

export function detectPlatform(url: string): string {
  const u = (url || "").toLowerCase()
  if (/facebook\.com|fb\.com|fb\.me/.test(u)) return "facebook"
  if (/instagram\.com/.test(u)) return "instagram"
  if (/youtube\.com|youtu\.be/.test(u)) return "youtube"
  if (/whatsapp\.com|wa\.me/.test(u)) return "whatsapp"
  if (/twitter\.com|x\.com/.test(u)) return "twitter"
  if (/t\.me|telegram\./.test(u)) return "telegram"
  return "website"
}

export function normalizeLinks(items: any): SocialLink[] {
  if (!Array.isArray(items)) return []
  return items
    .filter((it) => it && typeof it.url === "string" && it.url.trim())
    .map((it) => {
      const url = it.url.trim()
      const platform = (it.platform || "").trim() || detectPlatform(url)
      return { label: (it.label || "").trim() || platform, url, platform }
    })
}

export async function fetchSocialLinks(): Promise<SocialLink[]> {
  const c = await fetchContent("media-handlers", { revalidate: 60 })
  return normalizeLinks(c?.items)
}

// ---- Small formatting helpers shared by pages ----
// Finds a dialable phone number inside free text such as "श्री नाम — 8696851900"
export function extractPhone(text?: string | null): string | null {
  const m = String(text || "").match(/(\+?\d[\d\s-]{8,}\d)/)
  if (!m) return null
  const digits = m[1].replace(/[^\d+]/g, "")
  return digits.replace(/\D/g, "").length >= 10 ? digits : null
}

export function formatHindiDate(d?: string | null): string {
  if (!d) return ""
  const iso = /^(\d{4})-(\d{2})-(\d{2})/.exec(d)
  const date = iso ? new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])) : new Date(d)
  if (isNaN(date.getTime())) return ""
  return date.toLocaleDateString("hi-IN", { year: "numeric", month: "long", day: "numeric" })
}

// WhatsApp click-to-chat link; assumes an Indian number when no country code is given
export function whatsappLink(number?: string | null, text?: string): string | null {
  let digits = String(number || "").replace(/\D/g, "")
  if (digits.length < 10) return null
  if (digits.length === 10) digits = "91" + digits
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`
}

// "251" -> "₹251"; anything already containing text/symbols is shown as written
export function formatPrice(price?: string | null): string {
  const p = String(price ?? "").trim()
  return /^\d[\d,.]*$/.test(p) ? `₹${p}` : p
}
