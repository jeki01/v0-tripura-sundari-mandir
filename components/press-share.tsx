"use client"

import { useEffect, useState } from "react"
import { Check, Link2, Share2 } from "lucide-react"
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

// "शेयर" button of one press release. On phones it opens the phone's share sheet; elsewhere a small menu
// (WhatsApp, Facebook, X, Telegram, copy link). The shared link is the release's own page, which carries its
// title, summary and picture for the link preview.
export default function PressShare({ title, summary, url }: { title: string; summary?: string; url: string }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = (e: Event) => {
      if (!(e.target as Element | null)?.closest?.("[data-press-share]")) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("pointerdown", close)
    document.addEventListener("keydown", esc)
    return () => {
      document.removeEventListener("pointerdown", close)
      document.removeEventListener("keydown", esc)
    }
  }, [open])

  const text = summary ? `${title} — ${summary.replace(/\s+/g, " ").slice(0, 110)}${summary.length > 110 ? "…" : ""}` : title

  const click = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url })
        return
      } catch (e: any) {
        if (e?.name === "AbortError") return
      }
    }
    setOpen((o) => !o)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = url
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
      setOpen(false)
    }, 1500)
  }

  const u = encodeURIComponent(url)
  const t = encodeURIComponent(text)
  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%0A${u}`, icon: FaWhatsapp, color: "text-[#25D366]" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: FaFacebookF, color: "text-[#1877F2]" },
    { name: "X (Twitter)", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, icon: FaXTwitter, color: "text-black" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, icon: FaTelegramPlane, color: "text-[#229ED9]" },
  ]

  return (
    <div data-press-share className="relative inline-block">
      <button
        type="button"
        onClick={click}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex min-h-[40px] items-center gap-2 rounded-full border-2 border-[#B30000] px-4 py-1.5 text-sm font-semibold text-[#B30000] transition hover:bg-[#B30000] hover:text-white active:scale-95"
      >
        <Share2 size={15} />
        शेयर करें
      </button>
      {open && (
        <div role="menu" className="absolute bottom-full left-0 z-20 mb-2 w-52 overflow-hidden rounded-xl border border-[#C8941A]/60 bg-white shadow-lg sm:left-auto sm:right-0">
          {targets.map(({ name, href, icon: Icon, color }) => (
            <a key={name} role="menuitem" href={href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#3A2A1A] hover:bg-[#FFF4E6]">
              <Icon size={16} className={color} /> {name}
            </a>
          ))}
          <button type="button" role="menuitem" onClick={copy} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-[#3A2A1A] hover:bg-[#FFF4E6]">
            {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} className="text-[#8F0000]" />}
            {copied ? "लिंक कॉपी हो गया" : "लिंक कॉपी करें"}
          </button>
        </div>
      )}
    </div>
  )
}
