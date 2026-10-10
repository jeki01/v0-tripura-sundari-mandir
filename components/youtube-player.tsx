"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { youtubeThumb } from "@/lib/aarti"

// Shows the video's thumbnail and loads YouTube's player only when the visitor presses play,
// so the page stays light (no YouTube scripts until needed). Uses the privacy-enhanced domain.
export default function YouTubePlayer({ id, title, poster }: { id: string; title: string; poster?: string }) {
  const [play, setPlay] = useState(false)
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-[3px] border-[#E0A100]/70 bg-black shadow-lg">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} aria-label={`वीडियो चलाएँ: ${title}`} className="group absolute inset-0 block h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster || youtubeThumb(id)} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition group-hover:bg-black/35">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B30000] text-white ring-4 ring-[#FFD700]/80 transition group-hover:scale-110 sm:h-20 sm:w-20">
              <Play size={30} fill="currentColor" className="ml-1" />
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
