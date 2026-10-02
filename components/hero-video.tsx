"use client"

import { useEffect, useRef, useState } from "react"

// Muted looping video behind the hero text. The page is already fully usable with the still photo, so the
// video is an extra that is only requested once everything else has loaded, and never when it would cost the
// visitor more than it gives:
//  - waits for the window "load" event and a browser idle moment
//  - skipped with "reduce motion", Data Saver, or a slow (2G/3G) connection
//  - pauses when scrolled out of view or when the tab is hidden
//  - fades in only once it is really playing; on any error (or if it never starts) the photo simply stays
//
// `src` can be a direct video file (MP4/WebM, e.g. uploaded to the storage service) or a Vimeo link
// (vimeo.com/<id>, player.vimeo.com/video/<id>), which is played through Vimeo's player without controls.

const VIMEO_ORIGIN = "https://player.vimeo.com"

export function parseVimeo(url: string): { id: string; hash?: string } | null {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, "")
    if (host !== "vimeo.com" && host !== "player.vimeo.com") return null
    // the numeric id is the first all-digit path segment; an unlisted video has a hash segment right after it
    const parts = u.pathname.split("/").filter(Boolean)
    const at = parts.findIndex((p) => /^\d{5,}$/.test(p))
    if (at < 0) return null
    const next = parts[at + 1]
    const hash = u.searchParams.get("h") || (next && /^[0-9a-f]{6,}$/i.test(next) ? next : undefined)
    return { id: parts[at], hash }
  } catch {
    return null
  }
}

function useStartLate(active: boolean) {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (!active) return
    const connection = (navigator as any).connection as { saveData?: boolean; effectiveType?: string } | undefined
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const slow = /(^|-)[23]g$/.test(connection?.effectiveType || "")
    if (reduceMotion || connection?.saveData || slow) return

    let cancelled = false
    const start = () => {
      if (!cancelled) setEnabled(true)
    }
    const whenIdle = () => {
      if ("requestIdleCallback" in window) (window as any).requestIdleCallback(start, { timeout: 4000 })
      else setTimeout(start, 1500)
    }
    if (document.readyState === "complete") whenIdle()
    else window.addEventListener("load", whenIdle, { once: true })
    return () => {
      cancelled = true
      window.removeEventListener("load", whenIdle)
    }
  }, [active])
  return [enabled, setEnabled] as const
}

function VideoFile({ src, objectPosition, onFail }: { src: string; objectPosition: string; onFail: () => void }) {
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    video.muted = true // some browsers only autoplay when the property (not just the attribute) is set
    const play = () => video.play().catch(() => {})
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? play() : video.pause()))
    observer.observe(video)
    const onVisibility = () => (document.hidden ? video.pause() : play())
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      onError={onFail}
      style={{ objectPosition }}
      className={`pointer-events-none absolute inset-0 -z-[15] h-full w-full object-cover transition-opacity duration-1000 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}

// Vimeo player used as a background: no controls (the frame ignores the mouse), muted, looping. It stays
// invisible until Vimeo reports that playback really started, and is dropped if that takes too long (for
// example when the browser refuses autoplay, which would otherwise show Vimeo's play button on the hero).
function VimeoBackground({ id, hash, onFail }: { id: string; hash?: string; onFail: () => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)

  const send = (method: string, value?: string) =>
    frame.current?.contentWindow?.postMessage(JSON.stringify(value ? { method, value } : { method }), VIMEO_ORIGIN)

  // make the 16:9 player cover the whole hero, like object-fit: cover
  useEffect(() => {
    const box = wrap.current
    const el = frame.current
    if (!box || !el) return
    const fit = () => {
      const { width, height } = box.getBoundingClientRect()
      const w = Math.max(width, (height * 16) / 9)
      el.style.width = `${w}px`
      el.style.height = `${(w * 9) / 16}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== VIMEO_ORIGIN || e.source !== frame.current?.contentWindow) return
      let data: any = e.data
      if (typeof data === "string") {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }
      if (data?.event === "ready") send("addEventListener", "play")
      if (data?.event === "play" && !playingRef.current) {
        playingRef.current = true
        setPlaying(true)
      }
    }
    window.addEventListener("message", onMessage)
    const giveUp = setTimeout(() => {
      if (!playingRef.current) onFail()
    }, 12000)

    const el = frame.current
    const observer = new IntersectionObserver(([entry]) => send(entry.isIntersecting && !document.hidden ? "play" : "pause"))
    if (el) observer.observe(el)
    const onVisibility = () => send(document.hidden ? "pause" : "play")
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      window.removeEventListener("message", onMessage)
      clearTimeout(giveUp)
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const params = new URLSearchParams({
    background: "1",
    autoplay: "1",
    muted: "1",
    loop: "1",
    autopause: "0",
    playsinline: "1",
    controls: "0",
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    dnt: "1",
  })
  if (hash) params.set("h", hash)

  return (
    <div
      ref={wrap}
      className={`pointer-events-none absolute inset-0 -z-[15] overflow-hidden transition-opacity duration-1000 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <iframe
        ref={frame}
        src={`${VIMEO_ORIGIN}/video/${id}?${params.toString()}`}
        title="पृष्ठभूमि वीडियो"
        allow="autoplay; fullscreen"
        tabIndex={-1}
        loading="eager"
        onLoad={() => send("addEventListener", "play")}
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
      />
    </div>
  )
}

export default function HeroVideo({ src, objectPosition = "58% 30%" }: { src: string; objectPosition?: string }) {
  const [enabled, setEnabled] = useStartLate(!!src)
  if (!enabled) return null
  const vimeo = parseVimeo(src)
  return vimeo ? (
    <VimeoBackground id={vimeo.id} hash={vimeo.hash} onFail={() => setEnabled(false)} />
  ) : (
    <VideoFile src={src} objectPosition={objectPosition} onFail={() => setEnabled(false)} />
  )
}
