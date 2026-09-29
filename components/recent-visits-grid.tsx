"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface VisitItem {
  name?: string
  designation?: string
  date?: string
  photo?: string
  description?: string
  images?: string[]
}

export default function RecentVisitsGrid({ items }: { items: VisitItem[] }) {
  const [selected, setSelected] = useState<number | null>(null)
  const active = selected !== null ? items[selected] : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className="bg-white rounded-2xl p-5 shadow-md text-center text-left hover:shadow-xl transition-shadow cursor-pointer"
          >
            {v.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={v.photo} alt={v.name} className="w-full h-44 object-cover rounded-lg mb-3" />
            ) : null}
            <h3 className="text-lg font-semibold text-[#B30000] text-center">{v.name}</h3>
            {v.designation && <p className="text-sm text-gray-600 text-center">{v.designation}</p>}
            {v.date && <p className="text-xs text-gray-500 mt-1 text-center">{v.date}</p>}
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-[#B30000]">{active.name}</h3>
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
              {active.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.photo} alt={active.name} className="w-full h-64 object-cover rounded-xl" />
              )}
              <div>
                {active.designation && <p className="text-sm font-medium text-gray-700">{active.designation}</p>}
                {active.date && <p className="text-xs text-gray-500 mt-0.5">{active.date}</p>}
              </div>
              {active.description && (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{active.description}</p>
              )}
              {Array.isArray(active.images) && active.images.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">और तस्वीरें</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {active.images.map((img, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={idx} src={img} alt="" className="w-full h-24 object-cover rounded-lg border" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
