import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp, FaTelegramPlane } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { Globe } from "lucide-react"

export const PLATFORM_META: Record<string, { name: string; bg: string; hover: string }> = {
  facebook: { name: "Facebook", bg: "bg-[#1877F2]", hover: "hover:bg-[#1465d0]" },
  instagram: { name: "Instagram", bg: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]", hover: "hover:brightness-110" },
  youtube: { name: "YouTube", bg: "bg-[#FF0000]", hover: "hover:bg-[#d90000]" },
  whatsapp: { name: "WhatsApp", bg: "bg-[#25D366]", hover: "hover:bg-[#1fb957]" },
  twitter: { name: "X (Twitter)", bg: "bg-black", hover: "hover:bg-neutral-800" },
  telegram: { name: "Telegram", bg: "bg-[#229ED9]", hover: "hover:bg-[#1b86b9]" },
  website: { name: "Website", bg: "bg-[#B30000]", hover: "hover:bg-[#8F0000]" },
}

export function platformMeta(platform: string) {
  return PLATFORM_META[platform] || PLATFORM_META.website
}

export function SocialIcon({ platform, size = 18, className }: { platform: string; size?: number; className?: string }) {
  switch (platform) {
    case "facebook":
      return <FaFacebookF size={size} className={className} aria-hidden="true" />
    case "instagram":
      return <FaInstagram size={size} className={className} aria-hidden="true" />
    case "youtube":
      return <FaYoutube size={size} className={className} aria-hidden="true" />
    case "whatsapp":
      return <FaWhatsapp size={size} className={className} aria-hidden="true" />
    case "twitter":
      return <FaXTwitter size={size} className={className} aria-hidden="true" />
    case "telegram":
      return <FaTelegramPlane size={size} className={className} aria-hidden="true" />
    default:
      return <Globe size={size} className={className} aria-hidden="true" />
  }
}
