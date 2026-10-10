import { fetchContent } from "@/lib/api"
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
    .map((u: string) => safeHref(u))
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
