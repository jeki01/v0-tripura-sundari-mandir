"use client"

import { useState, type ReactNode } from "react"
import { Camera, Video } from "lucide-react"

// The gallery's two categories: फ़ोटो (images) and वीडियो (videos). Both lists are rendered by the server and passed in.
export default function GalleryTabs({
  initial,
  imageCount,
  videoCount,
  images,
  videos,
}: {
  initial: "image" | "video"
  imageCount: number
  videoCount: number
  images: ReactNode
  videos: ReactNode
}) {
  const [tab, setTab] = useState<"image" | "video">(initial)

  const pick = (t: "image" | "video") => {
    setTab(t)
    try {
      const u = new URL(window.location.href)
      if (t === "video") u.searchParams.set("tab", "video")
      else u.searchParams.delete("tab")
      window.history.replaceState(null, "", u.toString())
    } catch {}
  }

  const btn = (active: boolean) =>
    `flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition sm:flex-none sm:px-8 ${
      active ? "bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-white shadow" : "text-[#8F0000] hover:bg-white"
    }`

  return (
    <div>
      <div className="mx-auto mb-8 flex w-full max-w-sm gap-1 rounded-full border border-[#C8941A]/60 bg-[#FFE9B8]/60 p-1 sm:w-fit" role="tablist" aria-label="गैलरी की श्रेणी">
        <button type="button" role="tab" aria-selected={tab === "image"} onClick={() => pick("image")} className={btn(tab === "image")}>
          <Camera size={17} /> फ़ोटो ({imageCount})
        </button>
        <button type="button" role="tab" aria-selected={tab === "video"} onClick={() => pick("video")} className={btn(tab === "video")}>
          <Video size={17} /> वीडियो ({videoCount})
        </button>
      </div>
      <div role="tabpanel">{tab === "image" ? images : videos}</div>
    </div>
  )
}
