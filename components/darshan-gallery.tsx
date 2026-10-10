"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Check, Copy, Download, Share2 } from "lucide-react"
import { hindiDateLine, type DarshanContent } from "@/lib/darshan"

const SITE_URL = "https://shreetripurasundari.com"

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.43 15.1L2 22l5.05-1.55A9.93 9.93 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.42 1.34-1.96 1.4-.5.06-1.13.09-1.82-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3s.74-2.13 1-2.42c.26-.29.57-.36.76-.36l.55.01c.18 0 .42-.07.65.5.25.58.84 2.03.91 2.18.07.14.12.31.02.5-.1.2-.15.31-.29.48l-.44.5c-.14.14-.29.3-.12.58.17.29.74 1.22 1.6 1.97 1.1.97 2.03 1.27 2.32 1.42.29.14.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.18 1.4Z" />
    </svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

const fileNameFor = (url: string, n: number) => {
  const ext = (/\.(jpe?g|png|webp|gif)(\?|$)/i.exec(url)?.[1] || "jpg").toLowerCase().replace("jpeg", "jpg")
  return `tripura-sundari-darshan-${n}.${ext}`
}

// Fetch the picture as a file. Needs the image host to allow cross-origin reads; when it does not, callers fall back.
async function loadFile(url: string, name: string): Promise<File | null> {
  try {
    const res = await fetch(url, { mode: "cors" })
    if (!res.ok) return null
    const blob = await res.blob()
    if (!blob.type.startsWith("image/")) return null
    return new File([blob], name, { type: blob.type })
  } catch {
    return null
  }
}

function saveFile(file: File) {
  const href = URL.createObjectURL(file)
  const a = document.createElement("a")
  a.href = href
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(href), 4000)
}

// When the picture cannot be read by the page, open it so the visitor can press-and-hold / save it
function openPlain(url: string, name: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = name
  a.target = "_blank"
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function DarshanGallery({ darshan, initialDate }: { darshan: DarshanContent; initialDate: string }) {
  const { images, verse, caption, closing } = darshan
  // the date is the visitor's "today" in India: recomputed in the browser so a cached page never shows yesterday
  const [dateLine, setDateLine] = useState(initialDate)
  const [note, setNote] = useState("")
  const [busy, setBusy] = useState<string | null>(null)
  const [done, setDone] = useState<string | null>(null)
  const [menu, setMenu] = useState<number | null>(null)

  useEffect(() => {
    setDateLine(hindiDateLine())
  }, [])

  // close the share menu when tapping anywhere else
  useEffect(() => {
    if (menu === null) return
    const close = (e: Event) => {
      if (!(e.target as Element | null)?.closest?.("[data-share-root]")) setMenu(null)
    }
    document.addEventListener("pointerdown", close)
    return () => document.removeEventListener("pointerdown", close)
  }, [menu])

  const flash = (message: string) => {
    setNote(message)
    window.setTimeout(() => setNote((n) => (n === message ? "" : n)), 6000)
  }
  const tick = (id: string) => {
    setDone(id)
    window.setTimeout(() => setDone((d) => (d === id ? null : d)), 2500)
  }

  const shareText = `🙏 जय माँ त्रिपुरे 🙏\n${caption}\n📅 ${dateLine}\n${SITE_URL}/#aaj-ke-darshan`

  const download = async (url: string, i: number) => {
    const id = `d${i}`
    const name = fileNameFor(url, i + 1)
    setBusy(id)
    const file = await loadFile(url, name)
    if (file) saveFile(file)
    else openPlain(url, name)
    setBusy(null)
    tick(id)
  }

  const absolute = (url: string) => (url.startsWith("/") ? SITE_URL + url : url)

  const whatsapp = (url: string) => {
    // the picture's own address is in the message, so WhatsApp shows the picture itself
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${absolute(url)}`)}`, "_blank", "noopener")
    setMenu(null)
  }

  // Instagram has no web share link: save the picture and tell the visitor to add it from Instagram
  const instagram = async (url: string, i: number) => {
    const name = fileNameFor(url, i + 1)
    setMenu(null)
    const file = await loadFile(url, name)
    if (file) saveFile(file)
    else openPlain(url, name)
    flash("इमेज डाउनलोड हो गई है — अब Instagram खोलकर इसे Story या Post में जोड़ें।")
  }

  const copyLink = async (url: string) => {
    setMenu(null)
    try {
      await navigator.clipboard.writeText(absolute(url))
      flash("इमेज का लिंक कॉपी हो गया।")
    } catch {
      flash(absolute(url))
    }
  }

  // The share icon: on phones it opens the phone's own share sheet with the picture attached (WhatsApp,
  // Instagram, ...). Where that is not available it opens a small menu with the same choices.
  const share = async (url: string, i: number) => {
    const id = `s${i}`
    if (menu === i) return setMenu(null)
    setBusy(id)
    try {
      const file = await loadFile(url, fileNameFor(url, i + 1))
      if (file && typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
        return
      }
    } catch (e: any) {
      if (e?.name === "AbortError") return // the visitor closed the share sheet
    } finally {
      setBusy(null)
    }
    setMenu(i)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 text-center">
        <p className="font-display whitespace-pre-line text-lg leading-relaxed text-[#8F0000] sm:text-xl md:text-2xl">{verse}</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5C2A0A] sm:text-base">{caption}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C8941A]/60 bg-white/80 px-4 py-1.5 font-display text-base text-[#8F0000] sm:text-lg">
          <span aria-hidden="true">📅</span>
          <span suppressHydrationWarning>{dateLine}</span>
        </p>
      </div>

      {images.length > 0 ? (
        <>
          <ul
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            aria-label="आज के दर्शन की इमेज"
          >
            {images.map((url, i) => (
              <li
                key={url + i}
                className="temple-card w-[82%] shrink-0 snap-center overflow-hidden sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
              >
                <div className="relative aspect-[4/5] w-full bg-[#FFE9B8]">
                  <Image
                    src={url}
                    alt={`माँ त्रिपुरा सुंदरी के आज के दर्शन — ${dateLine} (${i + 1}/${images.length})`}
                    fill
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 82vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <div data-share-root className="relative flex items-center gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => download(url, i)}
                    disabled={busy === `d${i}`}
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#B30000] to-[#FF6B00] px-3 py-2 text-sm font-medium text-white transition active:scale-95 disabled:opacity-60"
                  >
                    {done === `d${i}` ? <Check size={18} /> : <Download size={18} />}
                    डाउनलोड
                  </button>
                  <button
                    type="button"
                    onClick={() => share(url, i)}
                    disabled={busy === `s${i}`}
                    aria-label="शेयर करें"
                    aria-expanded={menu === i}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C8941A] bg-white text-[#8F0000] transition hover:bg-[#FFF4E6] active:scale-95 disabled:opacity-60"
                  >
                    <Share2 size={18} />
                  </button>
                  {menu === i && (
                    <div className="absolute bottom-full right-3 z-10 mb-1 w-52 overflow-hidden rounded-xl border border-[#C8941A]/60 bg-white shadow-lg">
                      <button type="button" onClick={() => whatsapp(url)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#5C2A0A] hover:bg-[#FFF4E6]">
                        <span className="text-[#1FAF38]"><WhatsAppIcon /></span> WhatsApp
                      </button>
                      <button type="button" onClick={() => instagram(url, i)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#5C2A0A] hover:bg-[#FFF4E6]">
                        <span className="text-[#E1306C]"><InstagramIcon /></span> Instagram
                      </button>
                      <button type="button" onClick={() => copyLink(url)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#5C2A0A] hover:bg-[#FFF4E6]">
                        <Copy size={18} className="text-[#8F0000]" /> लिंक कॉपी करें
                      </button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {images.length > 1 && (
            <p className="mb-3 text-center text-xs text-[#C25400] sm:hidden" aria-hidden="true">
              ← और दर्शन देखने के लिए स्वाइप करें →
            </p>
          )}

          <p role="status" aria-live="polite" className="mt-3 min-h-[1.25rem] text-center text-sm text-[#8F0000]">
            {note}
          </p>
        </>
      ) : (
        <div className="temple-card mx-auto max-w-xl px-6 py-10 text-center">
          <p className="font-display text-xl text-[#8F0000]">आज के दर्शन शीघ्र ही यहाँ उपलब्ध होंगे</p>
          <p className="mt-2 text-sm text-[#C25400]">Today&apos;s darshan will be available here shortly.</p>
        </div>
      )}

      {closing && <p className="mt-8 text-center font-display text-xl text-[#8F0000] md:text-2xl">🙏 {closing} 🙏</p>}
    </div>
  )
}
