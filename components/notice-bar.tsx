"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { API_BASE } from "@/lib/api"
import { activeNotices } from "@/lib/notices"

const REFRESH_MS = 5 * 60 * 1000

// Running notice line under the header. Shows nothing at all when no notice is active (or the content service
// does not answer), so the header looks exactly as before. Pauses while the visitor hovers / touches it.
export default function NoticeBar() {
  const [notices, setNotices] = useState<string[]>([])

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/content/notices`, { cache: "no-store" })
        if (!res.ok) return
        const json = await res.json()
        if (alive) setNotices(activeNotices(json?.data))
      } catch {
        // keep whatever is showing
      }
    }
    load()
    const timer = window.setInterval(load, REFRESH_MS)
    return () => {
      alive = false
      window.clearInterval(timer)
    }
  }, [])

  if (!notices.length) return null

  const line = notices.join("   ✦   ")
  // longer text scrolls for longer, so the reading speed stays about the same
  const seconds = Math.max(18, Math.round(line.length * 0.22))

  return (
    <div role="region" aria-label="सूचना" className="flex items-center border-t border-[#FFD700]/50 bg-[#FFF1C9] text-[#6B0000]">
      <span className="relative z-10 flex shrink-0 items-center gap-1 bg-[#B30000] px-3 py-1 text-xs font-semibold text-[#FFE27A]">
        <Bell size={13} aria-hidden="true" />
        सूचना
      </span>
      {/* screen readers and "reduce motion" visitors get the plain text; everyone else the moving line */}
      <p className="sr-only">{line}</p>
      <div className="group min-w-0 flex-1 overflow-hidden py-1 motion-reduce:overflow-x-auto" aria-hidden="true">
        <div
          className="notice-ticker flex w-max text-sm font-medium group-hover:[animation-play-state:paused] group-active:[animation-play-state:paused]"
          style={{ ["--notice-secs" as string]: `${seconds}s` }}
        >
          <span className="whitespace-pre px-6">{line}</span>
          <span className="whitespace-pre px-6 motion-reduce:hidden">{line}</span>
        </div>
      </div>
    </div>
  )
}
