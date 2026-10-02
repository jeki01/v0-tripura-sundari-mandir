"use client"

import { useEffect, useRef, useState } from "react"

// Muted looping video behind the hero text. The page is already fully usable with the still photo, so the
// video is an extra that is only requested once everything else has loaded, and never when it would cost the
// visitor more than it gives:
//  - waits for the window "load" event and a browser idle moment
//  - skipped with "reduce motion", Data Saver, or a slow (2G/3G) connection
//  - pauses when scrolled out of view or when the tab is hidden
//  - fades in only once it is really playing; on any error the photo simply stays
export default function HeroVideo({ src, objectPosition = "58% 30%" }: { src: string; objectPosition?: string }) {
  const [enabled, setEnabled] = useState(false)
  const [playing, setPlaying] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!src) return
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
  }, [src])

  useEffect(() => {
    const video = ref.current
    if (!enabled || !video) return
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
  }, [enabled])

  if (!enabled) return null

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
      onError={() => setEnabled(false)}
      style={{ objectPosition }}
      className={`pointer-events-none absolute inset-0 -z-[15] h-full w-full object-cover transition-opacity duration-1000 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}
