"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Copy, Download, Heart, Share2 } from "lucide-react"
import { darshanId, hindiDateLine, shareMessage, type DarshanContent } from "@/lib/darshan"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://backend.shreetripurasundari.com"

function useDarshanLike() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const visitorIdRef = useRef("")

  useEffect(() => {
    let id = ""
    try {
      id = localStorage.getItem("darshan_visitor_id") || ""
      if (!id) {
        id = Math.random().toString(36).slice(2) + Date.now().toString(36)
        localStorage.setItem("darshan_visitor_id", id)
      }
      setLiked(localStorage.getItem("darshan_liked") === "1")
    } catch {}
    visitorIdRef.current = id
    fetch(`${API_BASE}/darshan/likes`)
      .then((r) => r.json())
      .then((d) => { if (d.count !== undefined) setCount(d.count) })
      .catch(() => {})
  }, [])

  const toggle = async () => {
    if (loading || !visitorIdRef.current) return
    const next = !liked
    setLiked(next)
    setLoading(true)
    try { localStorage.setItem("darshan_liked", next ? "1" : "0") } catch {}
    try {
      const r = await fetch(`${API_BASE}/darshan/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId: visitorIdRef.current, liked: next }),
      })
      const d = await r.json()
      if (d.count !== undefined) setCount(d.count)
    } catch {}
    setLoading(false)
  }

  return { liked, count, toggle }
}
import { makePoster } from "@/lib/darshan-poster"
import { downloadImage, fileNameFor, loadFile, openPlain, saveFile } from "@/lib/darshan-files"

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

type Petal = { id: number; left: number; delay: number; size: number; drift: number }

export default function DarshanGallery({ darshan, initialDate }: { darshan: DarshanContent; initialDate: string }) {
  const { images, verse, caption, closing } = darshan
  // the date is the visitor's "today" in India: recomputed in the browser so a cached page never shows yesterday
  const [dateLine, setDateLine] = useState(initialDate)
  const [note, setNote] = useState("")
  const [done, setDone] = useState<string | null>(null)
  const [menu, setMenu] = useState<number | null>(null)
  const [current, setCurrent] = useState(0)
  const [petals, setPetals] = useState<Petal[]>([])
  const track = useRef<HTMLUListElement>(null)
  const { liked, count, toggle: baseLikeToggle } = useDarshanLike()

  const toggle = () => {
    const willLike = !liked
    baseLikeToggle()
    if (willLike) {
      const fresh: Petal[] = Array.from({ length: 16 }, (_, i) => ({
        id: Date.now() + i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 0.7,
        size: 7 + Math.random() * 7,
        drift: (Math.random() - 0.5) * 40,
      }))
      setPetals(fresh)
      window.setTimeout(() => setPetals([]), 2400)
    }
  }

  const onScroll = () => {
    const el = track.current
    if (!el || !el.clientWidth) return
    setCurrent(Math.min(images.length - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth))))
  }
  const go = (i: number) => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: Math.min(images.length - 1, Math.max(0, i)) * el.clientWidth, behavior: "smooth" })
  }

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

  // Every picture has its own address (/darshan/<id>) whose page carries that picture in its link preview
  const linkFor = (url: string) => `${SITE_URL}/darshan/${darshanId(url)}`
  const messageFor = (url: string) => shareMessage(caption, dateLine, closing, linkFor(url))

  // The section as one picture (built from the picture on screen); kept so the menu choices reuse it
  const posterRef = useRef<{ key: string; file: File | null } | null>(null)
  const verseRef = useRef<HTMLParagraphElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const poster = async (url: string, i: number): Promise<File | null> => {
    const key = `${url}|${dateLine}|${verse}|${caption}|${closing}`
    if (posterRef.current?.key === key) return posterRef.current.file
    const image = await loadFile(url, fileNameFor(url, i + 1))
    const file = image
      ? await makePoster({
          image,
          title: "आज के दर्शन",
          verse,
          caption,
          date: dateLine,
          closing,
          site: "shreetripurasundari.com",
          displayFont: verseRef.current ? getComputedStyle(verseRef.current).fontFamily : "",
          bodyFont: captionRef.current ? getComputedStyle(captionRef.current).fontFamily : "",
        })
      : null
    posterRef.current = { key, file }
    return file
  }

  // starts the download at once (no waiting for the picture to be fetched first)
  const download = (url: string, i: number) => {
    downloadImage(url, fileNameFor(url, i + 1))
    tick(`d${i}`)
  }

  const whatsapp = (url: string) => {
    window.open(`https://wa.me/?text=${encodeURIComponent(messageFor(url))}`, "_blank", "noopener")
    setMenu(null)
  }

  // Instagram has no web share link: save the section picture and tell the visitor to add it from Instagram
  const instagram = async (url: string, i: number) => {
    setMenu(null)
    const file = (await poster(url, i)) || (await loadFile(url, fileNameFor(url, i + 1)))
    if (file) saveFile(file)
    else openPlain(url, fileNameFor(url, i + 1))
    flash("दर्शन की इमेज डाउनलोड हो गई है — अब Instagram खोलकर इसे Story या Post में जोड़ें।")
  }

  const copyLink = async (url: string) => {
    setMenu(null)
    try {
      await navigator.clipboard.writeText(linkFor(url))
      flash("इस दर्शन का लिंक कॉपी हो गया।")
    } catch {
      flash(linkFor(url))
    }
  }

  // The share icon shares this picture's own link: chat apps open it as a card with the picture, title and
  // description (like a product link). Browsers without a share sheet get a small menu instead.
  const share = async (url: string, i: number) => {
    if (menu === i) return setMenu(null)
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: "आज के दर्शन", text: messageFor(url) })
        return
      }
    } catch (e: any) {
      if (e?.name === "AbortError") return // the visitor closed the share sheet
    }
    setMenu(i)
  }

  return (
    <div className="mx-auto max-w-5xl">
      {images.length > 0 ? (
        <>
          {/* one arch-shaped frame; the pictures slide inside it */}
          <div className="mx-auto w-full max-w-[340px] sm:max-w-[400px]">
            <div className="rounded-t-[999px] rounded-b-3xl bg-gradient-to-b from-[#FFD700] via-[#C8941A] to-[#8F0000] p-[5px] shadow-[0_10px_30px_-12px_rgba(143,0,0,0.5)]">
              <div className="overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] bg-[#FFF6E2]">
                <div className="relative">
                  {/* petal rain keyframes */}
                  <style>{`
                    @keyframes petal-fall {
                      0%   { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
                      100% { opacity: 0; transform: translateY(300px) rotate(480deg) scale(0.4); }
                    }
                  `}</style>

                  <ul
                    ref={track}
                    onScroll={onScroll}
                    className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    aria-label="आज के दर्शन की इमेज"
                  >
                    {images.map((url, i) => (
                      <li key={url + i} className="relative aspect-[3/4] w-full shrink-0 snap-center bg-[#FFE9B8]">
                        <Image
                          src={url}
                          alt={`माँ त्रिपुरा सुंदरी के आज के दर्शन — ${dateLine} (${i + 1}/${images.length})`}
                          fill
                          sizes="(min-width: 640px) 400px, 340px"
                          className="object-cover"
                          priority={i === 0}
                        />
                      </li>
                    ))}
                  </ul>

                  {/* petal rain overlay */}
                  {petals.length > 0 && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      {petals.map((p) => (
                        <div
                          key={p.id}
                          className="absolute top-0"
                          style={{
                            left: `${p.left}%`,
                            width: p.size,
                            height: p.size * 1.6,
                            animation: `petal-fall ${1.4 + p.delay * 0.8}s ease-in ${p.delay}s forwards`,
                          }}
                        >
                          <svg viewBox="0 0 10 16" className="w-full h-full drop-shadow-sm">
                            <ellipse cx="5" cy="8" rx="4.2" ry="7.2" fill="#E8001A" fillOpacity="0.85" transform={`rotate(${p.drift} 5 8)`} />
                            <ellipse cx="5" cy="6" rx="2.5" ry="4" fill="#FF6680" fillOpacity="0.5" transform={`rotate(${p.drift} 5 8)`} />
                          </svg>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Instagram-Reels-style heart button — right center of image */}
                  <div className="absolute right-3 top-[62%] -translate-y-1/2 flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={toggle}
                      aria-label={liked ? "नापसंद करें" : "पसंद करें"}
                      className="flex items-center justify-center transition-transform active:scale-75"
                      style={{ background: "none", border: "none", padding: 0 }}
                    >
                      <Heart
                        size={30}
                        strokeWidth={1.6}
                        className={`drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 ${
                          liked
                            ? "fill-red-500 stroke-red-400 scale-110"
                            : "fill-transparent stroke-white"
                        }`}
                      />
                    </button>
                    {count !== null && (
                      <span className="text-[11px] font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] leading-none">
                        {count.toLocaleString("hi-IN")}
                      </span>
                    )}
                  </div>

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => go(current - 1)}
                        disabled={current === 0}
                        aria-label="पिछला दर्शन"
                        className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#8F0000] shadow transition active:scale-95 disabled:opacity-30"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(current + 1)}
                        disabled={current === images.length - 1}
                        aria-label="अगला दर्शन"
                        className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#8F0000] shadow transition active:scale-95 disabled:opacity-30"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex justify-center gap-1 pt-2" role="tablist" aria-label="दर्शन चुनें">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === current}
                        aria-label={`दर्शन ${i + 1}`}
                        onClick={() => go(i)}
                        className="flex items-center justify-center px-0.5"
                      >
                        <span className={`block h-2 rounded-full transition-all ${i === current ? "w-6 bg-[#B30000]" : "w-2 bg-[#C8941A]/50"}`} />
                      </button>
                    ))}
                  </div>
                )}

                <div data-share-root className="relative flex items-center gap-2 p-3">
                  <button
                    type="button"
                    onClick={() => download(images[current], current)}
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#B30000] to-[#FF6B00] px-3 py-2 text-sm font-medium text-white transition active:scale-95 disabled:opacity-60"
                  >
                    {done === `d${current}` ? <Check size={18} /> : <Download size={18} />}
                    डाउनलोड
                  </button>

                  <button
                    type="button"
                    onClick={() => share(images[current], current)}
                    aria-label="इस दर्शन को शेयर करें"
                    aria-expanded={menu === current}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C8941A] bg-white text-[#8F0000] transition hover:bg-[#FFF4E6] active:scale-95 disabled:opacity-60"
                  >
                    <Share2 size={18} />
                  </button>
                  {menu === current && (
                    <div className="absolute bottom-full right-3 z-10 mb-1 w-60 overflow-hidden rounded-xl border border-[#C8941A]/60 bg-white shadow-lg">
                      <button type="button" onClick={() => whatsapp(images[current])} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#5C2A0A] hover:bg-[#FFF4E6]">
                        <span className="text-[#1FAF38]"><WhatsAppIcon /></span> WhatsApp
                      </button>
                      <button type="button" onClick={() => instagram(images[current], current)} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#5C2A0A] hover:bg-[#FFF4E6]">
                        <span className="text-[#E1306C]"><InstagramIcon /></span> Instagram
                      </button>
                      <button type="button" onClick={() => copyLink(images[current])} className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#5C2A0A] hover:bg-[#FFF4E6]">
                        <Copy size={18} className="text-[#8F0000]" /> लिंक कॉपी करें
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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

      <div className="mt-4 text-center">
        <p ref={verseRef} className="font-display whitespace-pre-line text-lg leading-relaxed text-[#8F0000] sm:text-xl md:text-2xl">{verse}</p>
        <p ref={captionRef} className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5C2A0A] sm:text-base">{caption}</p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C8941A]/60 bg-white/80 px-4 py-1.5 font-display text-base text-[#8F0000] sm:text-lg">
          <span aria-hidden="true">📅</span>
          <span suppressHydrationWarning>{dateLine}</span>
        </p>
      </div>

      {closing && <p className="mt-8 text-center font-display text-xl text-[#8F0000] md:text-2xl">🙏 {closing} 🙏</p>}
    </div>
  )
}
