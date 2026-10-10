"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import AartiCard from "@/components/aarti-card"
import { EmptyNote } from "@/components/cms"
import { AARTI_CATEGORIES, type AartiItem } from "@/lib/aarti"

const TYPES = [
  { id: "all", label: "सभी" },
  { id: "video", label: "वीडियो" },
  { id: "article", label: "लेख" },
] as const

// Search box, category chips and type tabs over the published videos and articles (filtering happens in the browser)
export default function AartiBrowser({ items }: { items: AartiItem[] }) {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("")
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("all")

  // the five standard categories always show; any other category the admin used is added after them
  const categories = useMemo(() => {
    const extra = Array.from(new Set(items.map((i) => i.category).filter((c) => c && !(AARTI_CATEGORIES as readonly string[]).includes(c))))
    return [...AARTI_CATEGORIES, ...extra]
  }, [items])
  const count = (c: string) => items.filter((i) => i.category === c).length

  const shown = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return items.filter((i) => (!cat || i.category === cat) && (type === "all" || i.kind === type) && words.every((w) => i.search.includes(w)))
  }, [items, q, cat, type])

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition active:scale-95 ${
      active ? "border-[#B30000] bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-white shadow" : "border-[#C8941A]/60 bg-white/80 text-[#8F0000] hover:bg-white"
    }`

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <label className="relative block">
          <span className="sr-only">खोजें</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#B30000]" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="आरती, मंत्र, स्तोत्र खोजें…"
            className="h-12 w-full rounded-full border border-[#C8941A]/70 bg-white pl-11 pr-11 text-base text-[#3A2A1A] shadow-sm outline-none placeholder:text-[#9A7B5A] focus:border-[#B30000] focus:ring-2 focus:ring-[#B30000]/20"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="खोज साफ़ करें" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-[#8F0000] hover:bg-[#FFF4E6]">
              <X size={18} />
            </button>
          )}
        </label>
      </div>

      {/* categories: one swipeable row on phones, centred wrap on larger screens */}
      <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="श्रेणी">
        <button type="button" role="tab" aria-selected={cat === ""} onClick={() => setCat("")} className={chip(cat === "")}>
          सभी श्रेणियाँ
        </button>
        {categories.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={cat === c} onClick={() => setCat(cat === c ? "" : c)} className={chip(cat === c)}>
            {c} <span className="opacity-70">({count(c)})</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-1 rounded-full bg-[#FFE9B8]/60 p-1 sm:mx-auto sm:w-fit" role="tablist" aria-label="प्रकार">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={type === t.id}
            onClick={() => setType(t.id)}
            className={`flex-1 rounded-full px-5 py-1.5 text-sm font-medium transition sm:flex-none ${type === t.id ? "bg-white text-[#8F0000] shadow" : "text-[#7A5A3A]"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-[#7A5A3A]" role="status" aria-live="polite">
        {shown.length} परिणाम
      </p>

      <div className="mt-4">
        {shown.length === 0 ? (
          <EmptyNote text="कोई सामग्री नहीं मिली — कोई और शब्द या श्रेणी आज़माएँ।" />
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {shown.map((it) => (
              <div key={it.kind + it.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                <AartiCard item={it} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
