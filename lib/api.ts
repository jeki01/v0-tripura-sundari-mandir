// Base URL of the shared portal backend (where blog/CMS content lives).
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://backend.shreetripurasundari.com"

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

export async function fetchContent(key: string) {
  try {
    const res = await fetch(`${API_BASE}/content/${encodeURIComponent(key)}`, { cache: "no-store" })
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
