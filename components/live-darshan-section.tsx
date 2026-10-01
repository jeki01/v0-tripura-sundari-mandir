"use client"

import { useState, useEffect, useRef } from "react"
import { Camera, WifiOff, AlertTriangle } from "lucide-react"
import { SectionHeading } from "@/components/ornaments"
import Image from "next/image"
import Link from "next/link"
import { fetchContent, isManaged } from "@/lib/api"

const IS_CURRENTLY_LIVE = true
const YOUTUBE_CHANNEL_ID = "UClQYJEOUrS2WS4a5-8yD7cQ"
const DEFAULT_STREAM_URL = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1&mute=1`

// Tolerate the common ways someone pastes a link from the dashboard: a full
// <iframe> embed snippet, a youtu.be short link, a normal watch?v= link, or
// YouTube's live permalink (youtube.com/live/VIDEO_ID) — besides an
// already-correct embed URL, which is returned unchanged.
function toEmbedUrl(value: string) {
  const iframeMatch = /<iframe[^>]*\ssrc=["']([^"']+)["']/i.exec(value)
  if (iframeMatch) return iframeMatch[1]

  const shortMatch = /youtu\.be\/([\w-]+)/i.exec(value)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&mute=1`

  const liveMatch = /youtube\.com\/live\/([\w-]+)/i.exec(value)
  if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}?autoplay=1&mute=1`

  const watchMatch = /[?&]v=([\w-]+)/i.exec(value)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&mute=1`

  return value.trim()
}

const POLL_INTERVAL_MS = 60_000

export default function LiveDarshanSection() {
  const [videoError, setVideoError] = useState(false)
  const [streamUrl, setStreamUrl] = useState(DEFAULT_STREAM_URL)
  const [inView, setInView] = useState(false)
  const streamUrlRef = useRef(streamUrl)
  const playerRef = useRef<HTMLDivElement>(null)

  // Don't request the YouTube player (heavy) until the visitor is about to see it.
  useEffect(() => {
    const el = playerRef.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let cancelled = false

    // Poll the dashboard's stream URL periodically and swap the iframe only when
    // it actually changed — so a page already open picks up a stream switch
    // without the visitor needing to refresh.
    const check = async () => {
      const c = await fetchContent("live-darshan")
      if (cancelled || !isManaged(c)) return
      const items = c?.items && !Array.isArray(c.items) ? c.items : null
      const raw = items?.streamUrl?.trim() || items?.defaultUrl?.trim()
      if (!raw) return
      const resolved = toEmbedUrl(raw)
      if (resolved !== streamUrlRef.current) {
        streamUrlRef.current = resolved
        setStreamUrl(resolved)
        setVideoError(false)
      }
    }

    check()
    const id = setInterval(check, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const showPlayer = IS_CURRENTLY_LIVE && !videoError

  return (
    <section id="darshan-live" className="bg-jali py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="लाइव दर्शन" subtitle="श्री त्रिपुरा सुंदरी मंदिर - गर्भगृह से सीधा प्रसारण" />

        <div className="mx-auto max-w-4xl">
          <div className="temple-card overflow-hidden">
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-4 py-3 text-center">
              <Camera className="text-[#FFE27A]" size={20} />
              <h3 className="font-display text-lg text-[#FFE27A]">श्री त्रिपुरा सुंदरी मंदिर</h3>
            </div>

            <div ref={playerRef} className="relative aspect-video bg-black">
              <Image
                src="/images/garbh-grah-darshan.jpg"
                alt="गर्भगृह में माँ त्रिपुरा सुंदरी के दर्शन"
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                quality={70}
                className="object-cover"
              />
              {showPlayer && inView && (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={streamUrl}
                  title="Live Darshan"
                  loading="lazy"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onError={() => setVideoError(true)}
                />
              )}

              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-4 text-center">
                  <AlertTriangle className="mb-3 text-yellow-400" size={32} />
                  <p className="text-lg font-semibold text-white">वीडियो उपलब्ध नहीं है</p>
                  <p className="mt-2 max-w-md text-sm text-gray-300">
                    तकनीकी समस्या के कारण लाइव दर्शन उपलब्ध नहीं है। कृपया हमारे सोशल मीडिया चैनल पर अन्य वीडियो देखें।
                  </p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <Link href="https://www.youtube.com/@shreetripurasundari" target="_blank" className="text-red-400 hover:underline">
                      YouTube
                    </Link>
                    <Link href="https://www.instagram.com/maa_tripura_sunadari_mandir" target="_blank" className="text-pink-400 hover:underline">
                      Instagram
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61579670115975" target="_blank" className="text-blue-400 hover:underline">
                      Facebook
                    </Link>
                  </div>
                </div>
              )}

              <div className="absolute left-4 top-4">
                {showPlayer ? (
                  <div className="flex items-center gap-2 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                    LIVE
                  </div>
                ) : (
                  <div className="flex items-center gap-2 rounded-full bg-gray-700 px-3 py-1 text-xs text-white">
                    <WifiOff size={14} />
                    OFFLINE
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
