"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface FestivalItem {
  title?: string
  description?: string
  images?: string[]
}

export default function FestivalsGrid({ items }: { items: FestivalItem[] }) {
  const [selected, setSelected] = useState<number | null>(null)
  const active = selected !== null ? items[selected] : null

  return (
    <>
      <div className="space-y-6 max-w-4xl mx-auto">
        {items.map((f, i) => {
          const images = Array.isArray(f.images) ? f.images : []
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className="w-full text-left bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              {images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[0]} alt={f.title} className="w-full h-56 object-cover rounded-xl mb-4" />
              )}
              <h3 className="text-2xl text-[#B30000] mb-3">{f.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line line-clamp-3">
                {f.description}
              </p>
            </button>
          )
        })}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-[#B30000]">{active.title}</h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-[#B30000] p-1"
                aria-label="बंद करें"
              >
                <X size={22} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {active.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{active.description}</p>
              )}
              {Array.isArray(active.images) && active.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {active.images.map((img, idx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={idx} src={img} alt="" className="w-full h-32 object-cover rounded-lg border" />
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
