export function toProxyImgUrl(url: string): string {
  if (!url || typeof url !== "string") return url
  try {
    const u = new URL(url)
    if (u.hostname === "storage.shreetripurasundari.com") {
      return `/api/img?p=${encodeURIComponent(u.pathname + u.search)}`
    }
  } catch {}
  return url
}
