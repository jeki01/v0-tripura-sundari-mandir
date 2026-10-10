import { fetchContent, httpsStorageUrl } from "@/lib/api"
import { safeHref } from "@/lib/footer"

// "आज के दर्शन" on the home page. The temple uploads 3-5 pictures each day in the admin (Mandir management ->
// आज के दर्शन, content key "aaj-ke-darshan"); the website shows whatever set was saved last. The date and weekday
// are not typed by anyone: they are worked out from today's date in India, in Hindi.
export type DarshanContent = {
  verse: string
  caption: string
  closing: string
  images: string[]
}

export const DARSHAN_DEFAULTS: DarshanContent = {
  verse: "त्रिपुरे त्वं जगन्माता त्रिपुरे त्वं जगत्पिता।\nत्रिपुरे त्वं जगत् धात्री त्रिपुरायै नमोनमः।।",
  caption: "श्री राजराजेश्वरी जगज्जननी आद्या शक्ति माँ त्रिपुरा सुंदरी के आज के आरती-श्रृंगार दर्शन",
  closing: "जय माँ त्रिपुरे",
  images: [],
}

export const MAX_DARSHAN_IMAGES = 5

const text = (v: unknown, fallback: string) => (typeof v === "string" ? v.trim() : fallback)

export function mergeDarshan(raw: any): DarshanContent {
  const d = DARSHAN_DEFAULTS
  const c = raw && raw.items && !Array.isArray(raw.items) && typeof raw.items === "object" ? raw.items : null
  if (!c) return d
  const images = (Array.isArray(c.images) ? c.images : [])
    .filter((u: unknown): u is string => typeof u === "string")
    .map((u: string) => httpsStorageUrl(safeHref(u)))
    .filter((u: string) => /^(https?:\/\/|\/)/i.test(u))
    .slice(0, MAX_DARSHAN_IMAGES)
  return {
    verse: text(c.verse, d.verse),
    caption: text(c.caption, d.caption),
    closing: text(c.closing, d.closing),
    images,
  }
}

export async function fetchDarshan(): Promise<DarshanContent> {
  return mergeDarshan(await fetchContent("aaj-ke-darshan", { revalidate: 60 }))
}

const MONTHS = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
const WEEKDAYS = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]
const DEVANAGARI_DIGITS = "०१२३४५६७८९"

export const toDevanagari = (n: number | string) => String(n).replace(/\d/g, (d) => DEVANAGARI_DIGITS[Number(d)])

// "१० अक्टूबर २०२६, शनिवार" for the given moment, as the calendar date in India (IST) - the same for every
// visitor whatever their device's time zone is. Written out by hand so it does not depend on the browser's
// Hindi locale data.
export function hindiDateLine(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now)
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value)
  const year = get("year")
  const month = get("month")
  const day = get("day")
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay()
  return `${toDevanagari(day)} ${MONTHS[month - 1]} ${toDevanagari(year)}, ${WEEKDAYS[weekday]}`
}

// Address part of one picture: its file name without extension ("1791660004795-786868689"), so every uploaded
// picture gets its own page at /darshan/<id>. A picture that is replaced the next day gets a new file and so a new address.
export function darshanId(url: string): string {
  const file = url.split(/[?#]/)[0].split("/").pop() || ""
  return file.replace(/\.[a-z0-9]+$/i, "").replace(/[^A-Za-z0-9_-]/g, "-").slice(0, 80) || "darshan"
}

export function findDarshanImage(images: string[], id: string): string | null {
  return images.find((u) => darshanId(u) === id) ?? null
}

// The message sent along with a shared picture: one short paragraph ending with the picture's own link
export function shareMessage(caption: string, date: string, closing: string, link: string): string {
  const head = [caption, date && `📅 ${date}`].filter(Boolean).join(" — ")
  return `🙏 ${head}। ${closing} 🙏\n${link}`
}

// Today's date in India as YYYY-MM-DD. Put on the shared link so each day's link is new and WhatsApp / Facebook
// do not show an older day's preview picture from their cache.
export function todayIso(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}

// Address of the picture to use in link previews (home page) (og:image). Storage pictures go through the site's image
// optimizer at a modest size, because WhatsApp skips very large preview pictures.
export function previewImageUrl(src: string, siteUrl: string): string {
  if (src.startsWith("/")) return siteUrl + src
  try {
    const u = new URL(src)
    if (u.protocol === "https:" && u.hostname === "storage.shreetripurasundari.com") {
      return `${siteUrl}/_next/image?url=${encodeURIComponent(src)}&w=1024&q=65`
    }
  } catch {}
  return src
}
