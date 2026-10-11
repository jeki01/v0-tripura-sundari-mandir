"use client"

import { useCallback, useEffect, useState } from "react"
import { ExternalLink, Play, X } from "lucide-react"
import type { GalleryVideo } from "@/lib/gallery-video"

export type VideoItem = { video: GalleryVideo; caption?: string }

function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

// Grid of video cards (YouTube / Instagram). The player is loaded only when a card is opened.
export default function VideoGrid({ items }: { items: VideoItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, close])

  const active = open !== null ? items[open] : null

  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {items.map(({ video, caption }, i) => (
          <button
            key={`${video.provider}-${video.id}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`${caption || "वीडियो"} चलाएँ`}
            className="group relative aspect-video overflow-hidden rounded-xl border-[3px] border-[#E0A100]/70 bg-[#2B0A0A] text-left transition hover:-translate-y-1"
          >
            {video.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={video.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]" aria-hidden="true" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/20" aria-hidden="true">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B30000]/90 text-white ring-2 ring-[#FFD700]/80 transition group-hover:scale-110">
                <Play size={24} fill="currentColor" className="ml-0.5" />
              </span>
            </span>
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#8F0000] shadow">
              {video.provider === "instagram" ? <InstagramGlyph size={13} /> : <Play size={11} fill="currentColor" />}
              {video.provider === "instagram" ? "Instagram Reel" : "YouTube"}
            </span>
            {caption && (
              <span className="absolute inset-x-0 bottom-0 line-clamp-2 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-10 text-sm text-white">{caption}</span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div role="dialog" aria-modal="true" aria-label={active.caption || "वीडियो"} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" onClick={close}>
          <button type="button" onClick={close} aria-label="बंद करें" className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/25">
            <X size={24} />
          </button>
          <div className="flex max-h-full w-full max-w-4xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div
              className={`relative w-full overflow-hidden rounded-lg bg-black ${
                active.video.vertical ? "h-[78vh] max-w-[min(92vw,calc(78vh*9/16))]" : "aspect-video"
              }`}
            >
              <iframe
                key={`${active.video.provider}-${active.video.id}`}
                src={active.video.embed}
                title={active.caption || "वीडियो"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            {active.caption && <p className="mt-3 text-center text-sm text-white/90">{active.caption}</p>}
            <a href={active.video.watch} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FFE27A] hover:underline">
              {active.video.provider === "instagram" ? "Instagram पर देखें" : "YouTube पर देखें"} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  )
}
