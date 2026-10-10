"use client"

import { useCallback, useEffect, useState } from "react"
import { X } from "lucide-react"
import { hindiDateLine } from "@/lib/darshan"

const SHOW_FOR_MS = 5000
const SEEN_KEY = "darshan-popup-seen"

// "Today's Darshan" pop-up when the home page opens: the first picture of the day in full (not cropped),
// closing by itself after 5 seconds or with the cross at the top right. It appears once per visit
// (per browser tab session), so going back to the home page does not show it again.
export default function DarshanPopup({ src, title = "आज के दर्शन" }: { src: string; title?: string }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [date, setDate] = useState("")

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) return
    } catch {}
    setDate(hindiDateLine())
    setOpen(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    try {
      sessionStorage.setItem(SEEN_KEY, "1")
    } catch {}
  }, [])

  // the 5 seconds start once the picture is on screen (a failed picture closes the pop-up at once)
  useEffect(() => {
    if (!open || !loaded) return
    const t = window.setTimeout(close, SHOW_FOR_MS)
    return () => window.clearTimeout(t)
  }, [open, loaded, close])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, close])

  if (!open) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative w-full max-w-[420px] overflow-hidden rounded-2xl border-2 border-[#C8941A] bg-[#FFF6E2] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="बंद करें"
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 active:scale-95"
        >
          <X size={20} />
        </button>
        <div className="bg-gradient-to-r from-[#8F0000] to-[#B30000] px-4 py-2.5 pr-14 text-center">
          <p className="font-display text-lg leading-snug text-[#FFE27A]">{title}</p>
          {date && <p className="text-xs text-[#FFE9B8]">{date}</p>}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${title} — माँ त्रिपुरा सुंदरी`}
          onLoad={() => setLoaded(true)}
          onError={close}
          className="mx-auto block max-h-[75vh] w-full object-contain"
        />
        {/* time left before it closes */}
        <div className="h-1 w-full bg-[#C8941A]/30" aria-hidden="true">
          {loaded && <div className="h-full origin-left bg-[#FF6B00]" style={{ animation: `darshan-popup-bar ${SHOW_FOR_MS}ms linear forwards` }} />}
        </div>
      </div>
      <style>{`@keyframes darshan-popup-bar{from{transform:scaleX(1)}to{transform:scaleX(0)}}`}</style>
    </div>
  )
}
