"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import CmsImage from "@/components/cms-image"
import { Lotus } from "@/components/ornaments"

interface FestivalItem {
  title?: string
  description?: string
  images?: string[]
}

export default function FestivalsGrid({ items }: { items: FestivalItem[] }) {
  const [selected, setSelected] = useState<number | null>(null)
  const active = selected !== null ? items[selected] : null

  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [selected])

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((f, i) => {
          const images = Array.isArray(f.images) ? f.images.filter(Boolean) : []
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className="temple-card group flex flex-col overflow-hidden text-left transition duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#5A0000] to-[#B30000]">
                {images[0] ? (
                  <CmsImage
                    src={images[0]}
                    alt={f.title || "त्योहार"}
                    sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-[#FFD700]/60">
                    <Lotus size={64} />
                  </span>
                )}
                {images.length > 1 && (
                  <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
                    {images.length} फ़ोटो
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl leading-snug text-[#8F0000]">{f.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-[#3A2A1A]">
                  {f.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-[#B30000]">विवरण देखें →</span>
              </div>
            </button>
          )
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4" onClick={() => setSelected(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="temple-card max-h-[90vh] w-full max-w-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#C8941A]/30 bg-[#FFFDF6] p-4">
              <h3 className="font-display text-xl text-[#8F0000]">{active.title}</h3>
              <button type="button" onClick={() => setSelected(null)} className="p-1 text-[#5A4636] hover:text-[#B30000]" aria-label="बंद करें">
                <X size={22} />
              </button>
            </div>
            <div className="space-y-4 p-5">
              {active.description && <p className="whitespace-pre-line leading-relaxed text-[#3A2A1A]">{active.description}</p>}
              {Array.isArray(active.images) && active.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {active.images.filter(Boolean).map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-lg border-2 border-[#E0A100]/60">
                      <CmsImage src={img} alt={`${active.title} ${idx + 1}`} sizes="200px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
