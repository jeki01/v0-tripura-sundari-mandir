"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { activeNotices } from "@/lib/notices"

const REFRESH_MS = 5 * 60 * 1000
const DEFAULT_TEXT = "॥ जय श्री माँ त्रिपुरा सुंदरी ॥"

// The single strip at the top of the header. It shows the temple tagline; while an active notice exists (admin ->
// Mandir management -> सूचना पट्टी) the notice text runs along the strip instead. The strip keeps the same height
// in both cases, so the header never jumps. Pauses while the visitor hovers / touches it.
export default function NoticeBar() {
  const [notices, setNotices] = useState<string[]>([])

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const res = await fetch("/api/notices", { cache: "no-store" })
        if (!res.ok) return
        const json = await res.json()
        if (alive) setNotices(activeNotices(json?.data))
      } catch {
        // keep whatever is showing (the tagline when nothing has loaded)
      }
    }
    load()
    const timer = window.setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      window.clearInterval(timer)
    }
  }, [])

  const strip = "bg-gradient-to-r from-[#E0A100] via-[#FFE27A] to-[#E0A100] text-[#6B0000] text-sm font-display tracking-wide"

  if (!notices.length) {
    return <div className={`${strip} py-1 text-center`}>{DEFAULT_TEXT}</div>
  }

  const line = notices.join("   ✦   ")
  // longer text scrolls for longer, so the reading speed stays about the same
  const seconds = Math.max(18, Math.round(line.length * 0.22))

  return (
    <div role="region" aria-label="सूचना" className={`${strip} flex items-center`}>
      <span className="relative z-10 flex shrink-0 items-center gap-1 self-stretch bg-[#B30000] px-3 text-xs font-semibold text-[#FFE27A]">
        <Bell size={13} aria-hidden="true" />
        सूचना
      </span>
      {/* screen readers and "reduce motion" visitors get the plain text; everyone else the moving line */}
      <p className="sr-only">{line}</p>
      <div className="group min-w-0 flex-1 overflow-hidden py-1 motion-reduce:overflow-x-auto" aria-hidden="true">
        <div
          className="notice-ticker flex w-max group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]"
          style={{ ["--notice-secs" as string]: `${seconds}s` }}
        >
          <span className="whitespace-pre px-6">{line}</span>
          <span className="whitespace-pre px-6 motion-reduce:hidden">{line}</span>
        </div>
      </div>
    </div>
  )
}
