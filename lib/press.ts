import { fetchContent, httpsStorageUrl } from "@/lib/api"
import { safeHref } from "@/lib/footer"
import { hindiDate } from "@/lib/darshan"

// Press releases ("press-release" in the admin: title, date, summary, optional image, optional PDF link).
// Newest first. Each one has its own address, /press-release/<id>, so it can be shared with a proper link preview.
export type PressItem = {
  id: string
  title: string
  summary: string
  link: string
  image: string
  dateLabel: string // as shown
  sortKey: string // YYYY-MM-DD when the date could be understood, otherwise ""
  index: number // position in the admin's list (later = added later)
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")

const HI_MONTHS = ["जनवरी", "फ़रवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "अक्तूबर", "नवंबर", "दिसंबर"]
const HI_MONTH_NO = [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 12]
const EN_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

const pad = (n: number) => String(n).padStart(2, "0")
const valid = (y: number, m: number, d: number) => y >= 1990 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31
const toAscii = (s: string) => s.replace(/[०-९]/g, (c) => String("०१२३४५६७८९".indexOf(c)))

// Understands 2026-10-10, 10/10/2026, 10-10-2026, 10.10.2026, "10 October 2026", "१० अक्टूबर २०२६". "" when it cannot.
export function parseDate(raw: string): string {
  const s = toAscii(str(raw))
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(s)
  if (m && valid(+m[1], +m[2], +m[3])) return `${m[1]}-${pad(+m[2])}-${pad(+m[3])}`
  m = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})/.exec(s)
  if (m && valid(+m[3], +m[2], +m[1])) return `${m[3]}-${pad(+m[2])}-${pad(+m[1])}`
  m = /(\d{1,2})\s*(?:st|nd|rd|th)?\s+([A-Za-z]{3,})\.?,?\s+(\d{4})/.exec(s)
  if (m) {
    const mo = EN_MONTHS.indexOf(m[2].slice(0, 3).toLowerCase()) + 1
    if (mo && valid(+m[3], mo, +m[1])) return `${m[3]}-${pad(mo)}-${pad(+m[1])}`
  }
  m = /(\d{1,2})\s+(\S+)\s+(\d{4})/.exec(s)
  if (m) {
    const at = HI_MONTHS.findIndex((h) => m![2].startsWith(h))
    if (at >= 0 && valid(+m[3], HI_MONTH_NO[at], +m[1])) return `${m[3]}-${pad(HI_MONTH_NO[at])}-${pad(+m[1])}`
  }
  return ""
}

function hashId(text: string): string {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0
  return "p" + h.toString(36)
}

export function normalizePress(raw: any): PressItem[] {
  const list: any[] = raw && Array.isArray(raw.items) ? raw.items : []
  const out: PressItem[] = []
  list.forEach((it, index) => {
    const title = str(it?.title)
    if (!title) return
    const dateRaw = str(it.date)
    const sortKey = parseDate(dateRaw)
    out.push({
      id: str(it.id) || hashId(title + dateRaw),
      title,
      summary: str(it.summary),
      link: it.link ? safeHref(httpsStorageUrl(str(it.link))) : "",
      image: it.image ? httpsStorageUrl(str(it.image)) : "",
      dateLabel: sortKey ? hindiDate(sortKey) : dateRaw,
      sortKey,
      index,
    })
  })
  // newest first: by date when there is one; entries without a usable date follow, the last one added first
  return out.sort((a, b) => {
    if (a.sortKey && b.sortKey) return b.sortKey.localeCompare(a.sortKey) || b.index - a.index
    if (a.sortKey) return -1
    if (b.sortKey) return 1
    return b.index - a.index
  })
}

export async function fetchPress(): Promise<PressItem[]> {
  return normalizePress(await fetchContent("press-release", { revalidate: 60 }))
}

export const pressPath = (id: string) => `/press-release/${encodeURIComponent(id)}`
