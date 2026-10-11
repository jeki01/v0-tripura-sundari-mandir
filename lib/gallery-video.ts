import { parseYouTube, youtubeThumb } from "@/lib/aarti"

// A video link pasted in the gallery (admin -> गैलरी): a YouTube video / Short or an Instagram Reel / post.
export type GalleryVideo = {
  provider: "youtube" | "instagram"
  id: string
  embed: string // address of the player page shown in the viewer
  watch: string // the original page
  thumb: string // picture for the card ("" when none is known)
  vertical: boolean // reels and Shorts are tall
}

export function parseInstagram(url: string): string | null {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^(www|m)\./, "")
    if (host !== "instagram.com" && host !== "instagr.am") return null
    const m = /\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]{5,})/.exec(u.pathname)
    return m ? m[1] : null
  } catch {
    return null
  }
}

export function parseGalleryVideo(url: string, cover?: string): GalleryVideo | null {
  const raw = (url || "").trim()
  const yt = parseYouTube(raw)
  if (yt) {
    return {
      provider: "youtube",
      id: yt,
      embed: `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0`,
      watch: `https://www.youtube.com/watch?v=${yt}`,
      thumb: cover || youtubeThumb(yt),
      vertical: /\/shorts\//.test(raw),
    }
  }
  const ig = parseInstagram(raw)
  if (ig) {
    return {
      provider: "instagram",
      id: ig,
      embed: `https://www.instagram.com/reel/${ig}/embed/`,
      watch: `https://www.instagram.com/reel/${ig}/`,
      thumb: cover || "", // Instagram does not give out a thumbnail address; a cover image can be uploaded in the admin
      vertical: true,
    }
  }
  return null
}
