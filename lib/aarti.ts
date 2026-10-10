import { fetchContent, httpsStorageUrl } from "@/lib/api"

// आरती एवं स्तुति: YouTube videos and written articles, managed together in the admin (Mandir management ->
// आरती एवं स्तुति, content key "aarti-stuti"). Each entry has its own id, which is its web address:
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

// One saved entry -> what the pages use. `fallbackKind` is for entries saved by the first version, which kept
// videos and articles in two separate lists and had no "type" on the entry.
function toItem(it: any, fallbackKind: AartiItem["kind"]): AartiItem | null {
  if (!isOn(it)) return null
  const title = str(it.title)
  if (!title) return null
  const kind: AartiItem["kind"] = it.type === "video" || it.type === "article" ? it.type : fallbackKind
  const category = str(it.category)
  const topic = str(it.topic)
  const date = str(it.date).slice(0, 10)
  const own = it.image ? httpsStorageUrl(str(it.image)) : ""
  if (kind === "video") {
    const youtubeId = parseYouTube(str(it.url))
    if (!youtubeId) return null // not a usable YouTube link
    const description = str(it.description)
    return {
      kind,
      id: str(it.id) || hashId(`v${title}${youtubeId}`),
      title,
      category,
      summary: topic || description,
      topic,
      date,
      image: own || youtubeThumb(youtubeId),
      youtubeId,
      body: description,
      search: `${title} ${category} ${topic} ${description}`.toLowerCase(),
    }
  }
  const body = str(it.body)
  const text = stripHtml(body)
  return {
    kind,
    id: str(it.id) || hashId(`a${title}`),
    title,
    category,
    summary: topic || text.slice(0, 160),
    topic,
    date,
    image: own,
    youtubeId: "",
    body,
    search: `${title} ${category} ${topic} ${text.slice(0, 4000)}`.toLowerCase(),
  }
}

const listOf = (raw: any): any[] => (raw && Array.isArray(raw.items) ? raw.items : [])

// Everything published, newest first (entries without a date keep the order the admin gave them, after dated ones).
// The list is "aarti-stuti" (articles and videos together). Until that has been saved once, the two older lists
// ("aarti-videos", "aarti-articles") are shown instead.
export async function fetchAartiItems(): Promise<AartiItem[]> {
  const main = await fetchContent("aarti-stuti", { revalidate: 60 })
  let all: AartiItem[]
  if (main && Array.isArray(main.items)) {
    all = main.items.map((it: any) => toItem(it, "article")).filter((x: AartiItem | null): x is AartiItem => !!x)
  } else {
    const [videos, articles] = await Promise.all([
      fetchContent("aarti-videos", { revalidate: 60 }),
      fetchContent("aarti-articles", { revalidate: 60 }),
    ])
    all = [
      ...listOf(videos).map((it) => toItem(it, "video")),
      ...listOf(articles).map((it) => toItem(it, "article")),
    ].filter((x): x is AartiItem => !!x)
  }
  return all
    .map((x, i) => ({ x, i }))
    .sort((a, b) => b.x.date.localeCompare(a.x.date) || a.i - b.i)
    .map(({ x }) => x)
}

export const aartiPath = (it: Pick<AartiItem, "kind" | "id">) => `/aarti-stuti/${it.kind}/${encodeURIComponent(it.id)}`
