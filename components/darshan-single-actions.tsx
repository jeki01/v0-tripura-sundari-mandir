"use client"

import { useState } from "react"
import { Check, Download, Share2 } from "lucide-react"
import { hindiDateLine, shareMessage } from "@/lib/darshan"
import { fileNameFor, loadFile, openPlain, saveFile } from "@/lib/darshan-files"

// Download / share buttons of the single-picture page (/darshan/<id>)
export default function DarshanSingleActions({ src, link, caption, closing }: { src: string; link: string; caption: string; closing: string }) {
  const [done, setDone] = useState<"download" | "copied" | null>(null)
  const flash = (v: "download" | "copied") => {
    setDone(v)
    window.setTimeout(() => setDone(null), 2500)
  }

  const download = async () => {
    const name = fileNameFor(src, 1)
    const file = await loadFile(src, name)
    if (file) saveFile(file)
    else openPlain(src, name)
    flash("download")
  }

  const share = async () => {
    const text = shareMessage(caption, hindiDateLine(), closing, link)
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "आज के दर्शन", text })
        return
      }
    } catch (e: any) {
      if (e?.name === "AbortError") return
    }
    try {
      await navigator.clipboard.writeText(link)
      flash("copied")
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={download}
        className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#B30000] to-[#FF6B00] px-3 py-2 text-sm font-medium text-white transition active:scale-95"
      >
        {done === "download" ? <Check size={18} /> : <Download size={18} />}
        डाउनलोड
      </button>
      <button
        type="button"
        onClick={share}
        aria-label="शेयर करें"
        className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#C8941A] bg-white px-4 text-sm font-medium text-[#8F0000] transition hover:bg-[#FFF4E6] active:scale-95"
      >
        {done === "copied" ? <Check size={18} /> : <Share2 size={18} />}
        {done === "copied" ? "लिंक कॉपी हुआ" : "शेयर"}
      </button>
    </div>
  )
}
