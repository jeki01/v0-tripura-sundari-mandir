"use client"

import { useEffect, useState } from "react"
import { Check, Link2, Share2 } from "lucide-react"
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

interface ShareButtonsProps {
  title: string
  /** Absolute URL of the page being shared (used for the share links before hydration) */
  url: string
  label?: string
}

export default function ShareButtons({ title, url, label = "इस ब्लॉग को साझा करें" }: ShareButtonsProps) {
  const [shareUrl, setShareUrl] = useState(url)
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.origin + window.location.pathname)
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function")
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = shareUrl
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const nativeShare = () => navigator.share({ title, url: shareUrl }).catch(() => {})

  const u = encodeURIComponent(shareUrl)
  const t = encodeURIComponent(title)
  const targets = [
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: FaWhatsapp, cls: "bg-[#25D366] hover:bg-[#1fb957]" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, icon: FaFacebookF, cls: "bg-[#1877F2] hover:bg-[#1465d0]" },
    { name: "X (Twitter)", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, icon: FaXTwitter, cls: "bg-black hover:bg-neutral-800" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, icon: FaTelegramPlane, cls: "bg-[#229ED9] hover:bg-[#1b86b9]" },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label={label}>
      <span className="mr-1 flex items-center gap-1.5 text-sm font-semibold text-[#8F0000]">
        <Share2 size={16} />
        {label}
      </span>

      {targets.map(({ name, href, icon: Icon, cls }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} पर साझा करें`}
          title={name}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow transition hover:-translate-y-0.5 ${cls}`}
        >
          <Icon size={17} />
        </a>
      ))}

      <button
        type="button"
        onClick={copy}
        aria-live="polite"
        className={`inline-flex h-10 items-center gap-2 rounded-full border-2 px-4 text-sm font-semibold transition ${
          copied ? "border-green-600 bg-green-600 text-white" : "border-[#B30000] text-[#B30000] hover:bg-[#B30000] hover:text-white"
        }`}
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
        {copied ? "लिंक कॉपी हो गया" : "लिंक कॉपी करें"}
      </button>

      {canNativeShare && (
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] px-4 text-sm font-bold text-[#6B0000] shadow transition hover:-translate-y-0.5 sm:hidden"
        >
          <Share2 size={16} />
          शेयर
        </button>
      )}
    </div>
  )
}
