"use client"

import { useEffect, useRef, useState } from "react"
import { ImagePlus, X } from "lucide-react"
import { PhotoError, preparePhoto } from "@/lib/image-compress"

// Lets a visitor add up to `max` photos (each fitted under 2 MB) and shows small previews.
export default function PhotoPicker({
  files,
  onChange,
  max = 1,
  label = "फ़ोटो जोड़ें (वैकल्पिक)",
}: {
  files: File[]
  onChange: (files: File[]) => void
  max?: number
  label?: string
}) {
  const input = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [urls, setUrls] = useState<string[]>([])

  useEffect(() => {
    const made = files.map((f) => URL.createObjectURL(f))
    setUrls(made)
    return () => made.forEach((u) => URL.revokeObjectURL(u))
  }, [files])

  const add = async (picked: FileList | null) => {
    if (!picked || picked.length === 0) return
    setError("")
    setBusy(true)
    const next = [...files]
    try {
      for (const f of Array.from(picked)) {
        if (next.length >= max) {
          setError(`अधिकतम ${max} फ़ोटो जोड़ी जा सकती हैं`)
          break
        }
        next.push(await preparePhoto(f))
      }
    } catch (e) {
      setError(e instanceof PhotoError ? e.message : "फ़ोटो जोड़ी नहीं जा सकी")
    } finally {
      onChange(next)
      setBusy(false)
      if (input.current) input.current.value = ""
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {urls.map((u, i) => (
          <div key={u} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt={`चुनी हुई फ़ोटो ${i + 1}`} className="h-20 w-20 rounded-lg border border-[#C8941A]/50 object-cover" />
            <button
              type="button"
              onClick={() => onChange(files.filter((_, idx) => idx !== i))}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B30000] text-white"
              aria-label="फ़ोटो हटाएँ"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {files.length < max && (
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy}
            className="inline-flex h-20 min-w-[5rem] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#C8941A]/60 px-3 text-xs text-[#8F0000] transition hover:bg-[#FFF4E6] disabled:opacity-60"
          >
            <ImagePlus size={20} />
            {busy ? "तैयार हो रही है…" : label}
          </button>
        )}
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" multiple={max > 1} className="hidden" onChange={(e) => add(e.target.files)} />
      <p className="mt-1.5 text-xs text-[#7A5A3A]">JPG / PNG / WebP, हर फ़ोटो 2MB तक{max > 1 ? `, अधिकतम ${max} फ़ोटो` : ""}।</p>
      {error && <p role="alert" className="mt-1 text-xs font-medium text-[#B30000]">{error}</p>}
    </div>
  )
}
