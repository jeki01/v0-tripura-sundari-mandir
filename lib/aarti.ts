import { fetchContent, httpsStorageUrl } from "@/lib/api"

// आरती एवं स्तुति: YouTube videos (content key "aarti-videos") and written articles (key "aarti-articles"),
// both managed in the admin (Mandir management). Each entry has its own id, which is its web address:
// /aarti-stuti/video/<id> and /aarti-stuti/article/<id>.
export const AARTI_CATEGORIES = ["आरती", "मंत्र", "साधना", "स्तोत्र", "भक्ति"] as const

export type AartiItem = {
  kind: "video" | "article"
  id: string
  title: string
  category: string
  // short text for cards and link previews
  summary: string
  topic: string
  date: string
  image: string // article cover, or the YouTube thumbnail for a video
  youtubeId: string
  body: string // article HTML
  search: string // lower-case text the search box looks through
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")

export function stripHtml(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
}

// The 11-character video id from any common YouTube address (watch, youtu.be, embed, shorts, live)
export function parseYouTube(url: string): string | null {
  try {
    const u = new URL(str(url))
    const host = u.hostname.replace(/^(www|m|music)\./, "")
    let id: string | null = null
    if (host === "youtu.be") id = u.pathname.split("/")[1] || null
    else if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const parts = u.pathname.split("/").filter(Boolean)
      if (parts[0] === "watch") id = u.searchParams.get("v")
      else if (["embed", "shorts", "live", "v"].includes(parts[0])) id = parts[1] || null
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// small stable fallback id for an entry saved without one
function hashId(text: string): string {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0
  return h.toString(36)
}

const isOn = (it: any) => it && it.status !== "off"

function normalize(raw: any, kind: AartiItem["kind"]): AartiItem[] {
  const list: any[] = raw && Array.isArray(raw.items) ? raw.items : []
  const out: AartiItem[] = []
  for (const it of list) {
    if (!isOn(it)) continue
    const title = str(it.title)
    if (!title) continue
    const category = str(it.category)
    const topic = str(it.topic)
    const date = str(it.date).slice(0, 10)
    if (kind === "video") {
      const youtubeId = parseYouTube(str(it.url))
      if (!youtubeId) continue // not a usable YouTube link
      const description = str(it.description)
      out.push({
        kind,
        id: str(it.id) || hashId(`v${title}${youtubeId}`),
        title,
        category,
        summary: description || topic,
        topic,
        date,
        image: youtubeThumb(youtubeId),
        youtubeId,
        body: description,
        search: `${title} ${category} ${topic} ${description}`.toLowerCase(),
      })
    } else {
      const body = str(it.body)
      const text = stripHtml(body)
      out.push({
        kind,
        id: str(it.id) || hashId(`a${title}`),
        title,
        category,
        summary: topic || text.slice(0, 160),
        topic,
        date,
        image: it.image ? httpsStorageUrl(str(it.image)) : "",
        youtubeId: "",
        body,
        search: `${title} ${category} ${topic} ${text.slice(0, 4000)}`.toLowerCase(),
      })
    }
  }
  return out
}

// Everything published, newest first (entries without a date keep the order the admin gave them, after dated ones)
export async function fetchAartiItems(): Promise<AartiItem[]> {
  const [videos, articles] = await Promise.all([
    fetchContent("aarti-videos", { revalidate: 60 }),
    fetchContent("aarti-articles", { revalidate: 60 }),
  ])
  const all = [...normalize(videos, "video"), ...normalize(articles, "article")]
  return all
    .map((x, i) => ({ x, i }))
    .sort((a, b) => b.x.date.localeCompare(a.x.date) || a.i - b.i)
    .map(({ x }) => x)
}

export const aartiPath = (it: Pick<AartiItem, "kind" | "id">) => `/aarti-stuti/${it.kind}/${encodeURIComponent(it.id)}`
