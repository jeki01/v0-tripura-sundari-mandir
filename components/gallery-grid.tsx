"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export interface GalleryItem {
  src: string
  caption?: string
}

const OPTIMIZED_HOSTS = new Set(["storage.shreetripurasundari.com"])
function canOptimize(src: string) {
  if (src.startsWith("/")) return true
  try {
    const u = new URL(src)
    return u.protocol === "https:" && OPTIMIZED_HOSTS.has(u.hostname)
  } catch {
    return false
  }
}

// Photo grid with a keyboard-friendly full-screen viewer
export default function GalleryGrid({ items, columns = "md:grid-cols-3 lg:grid-cols-4" }: { items: GalleryItem[]; columns?: string }) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, close, step])

  const active = open !== null ? items[open] : null

  return (
    <>
      <div className={`mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-5 ${columns}`}>
        {items.map((it, i) => (
          <button
            key={`${it.src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={it.caption ? `${it.caption} - बड़ा देखें` : `फ़ोटो ${i + 1} बड़ा देखें`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border-[3px] border-[#E0A100]/70 bg-[#2B0A0A] shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <Image
              src={it.src}
              alt={it.caption || `फ़ोटो ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
              quality={70}
              unoptimized={!canOptimize(it.src)}
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {it.caption && (
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-2 pt-8 text-left text-xs text-white sm:text-sm">
                {it.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || "फ़ोटो"}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button type="button" onClick={close} aria-label="बंद करें" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/25">
            <X size={24} />
          </button>
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1) }}
                aria-label="पिछली फ़ोटो"
                className="absolute left-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/25"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1) }}
                aria-label="अगली फ़ोटो"
                className="absolute right-3 rounded-full bg-white/10 p-2 text-white hover:bg-white/25"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}
          <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.src} alt={active.caption || ""} className="max-h-[82vh] w-auto rounded-lg object-contain" />
            {active.caption && <figcaption className="mt-3 text-center text-sm text-white/90">{active.caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  )
}
