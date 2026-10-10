"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Horizontal row of cards: swipes with a finger on phones (snap to each card), scrolls smoothly with a
// trackpad / shift+wheel on computers, and shows arrow buttons on larger screens when the cards do not all fit.
export default function ExploreScroller({ children, label }: { children: ReactNode; label: string }) {
  const track = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = track.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const by = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = (first?.getBoundingClientRect().width ?? 280) + 16
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  const arrow = "absolute top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#C8941A] bg-white/95 text-[#8F0000] shadow-md transition hover:bg-[#FFF4E6] active:scale-95 md:flex"

  return (
    <div className="relative">
      <ul
        ref={track}
        onScroll={update}
        aria-label={label}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-3 pt-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      {canPrev && (
        <button type="button" onClick={() => by(-1)} aria-label="पीछे" className={`${arrow} -left-3 lg:-left-5`}>
          <ChevronLeft size={22} />
        </button>
      )}
      {canNext && (
        <button type="button" onClick={() => by(1)} aria-label="आगे" className={`${arrow} -right-3 lg:-right-5`}>
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  )
}
