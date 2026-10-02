import { fetchContent, fetchSocialLinks, normalizeLinks, type SocialLink } from "@/lib/api"

// Everything the footer shows. Edited in the admin (Mandir management -> Footer, content key "footer").
// FOOTER_DEFAULTS is what the site shows when nothing has been saved yet or the content service does not answer,
// so the footer is never empty or broken.
export type FooterLink = { label: string; url: string }
export type FooterPerson = { role: string; name: string }

export type FooterContent = {
  greeting: string
  quickLinksTitle: string
  quickLinks: FooterLink[]
  trustTitle: string
  trustMembers: FooterPerson[]
  followTitle: string
  // used when set; otherwise the links from Media / Social Links are shown
  social: SocialLink[]
  contactTitle: string
  placeName: string
  addressLine1: string
  addressLine2: string
  phone: string
  email: string
  mapUrl: string
  mapLabel: string
  copyright: string
  closing: string
}

export const FOOTER_DEFAULTS: FooterContent = {
  greeting: "॥ जय श्री माँ त्रिपुरा सुंदरी ॥",
  quickLinksTitle: "Quick Links",
  quickLinks: [
    { label: "About Mandir", url: "/about" },
    { label: "Live Darshan", url: "/#darshan-live" },
    { label: "Online Pujas", url: "/#online-pujas" },
    { label: "Donations", url: "/donation" },
    { label: "E-Store", url: "/estore" },
    { label: "Events", url: "/events" },
    { label: "VIP Visitors", url: "/vip-visitors-all" },
    { label: "Contact", url: "/#contact" },
  ],
  trustTitle: "Trust Mandal",
  trustMembers: [
    { role: "अध्यक्ष", name: "श्रीमान धूलजी भाई पंचाल" },
    { role: "महामंत्री", name: "श्रीमान नटवरलालजी पंचाल" },
  ],
  followTitle: "Follow us",
  social: [],
  contactTitle: "Location & Contact",
  placeName: "Maa Tripura Sundari Temple",
  addressLine1: "Near Umrai Village, Banswara",
  addressLine2: "Rajasthan – 327001",
  phone: "+91 8696851900",
  email: "shreetripurasundarimandir@gmail.com",
  mapUrl:
    "https://www.google.com/maps/place/Maa+Tripura+Sundri+Temple/@23.5323482,74.321633,727m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3966da0646045a3d:0xe998c21391584afc!8m2!3d23.5323482!4d74.321633!16s%2Fg%2F1tfj1l4c?entry=ttu&g_ep=EgoyMDI2MDMxOC4xIKXMDSoASAFQAw%3D%3D",
  mapLabel: "View on Google Maps",
  copyright: "Shree Tripura Sundari Mandir & Panchal Samaj. All rights reserved.",
  closing: "माँ त्रिपुरा सुंदरी की जय",
}

const text = (v: unknown, fallback: string) => (typeof v === "string" ? v.trim() : fallback)

function rows<T>(value: unknown, fallback: T[], pick: (r: any) => T | null): T[] {
  if (!Array.isArray(value)) return fallback // never saved: default list
  return value.map(pick).filter((r): r is T => r !== null) // saved (even empty): exactly what the admin chose
}

// Only ordinary links are allowed (blocks "javascript:" and similar). Relative paths, #anchors, http(s), mailto and tel pass.
export function safeHref(url: string): string {
  const u = (url || "").trim()
  if (!u) return ""
  if (/^(\/|#)/.test(u) && !u.startsWith("//")) return u
  if (/^(https?:|mailto:|tel:)/i.test(u)) return u
  if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(u)) return `https://${u}` // "example.com/page" typed without https://
  return ""
}

// "+91 8696851900" / "8696851900" -> "tel:+918696851900"
export function telHref(phone: string): string {
  const digits = (phone || "").replace(/[^\d+]/g, "")
  const only = digits.replace(/\D/g, "")
  if (only.length < 7) return ""
  if (digits.startsWith("+")) return `tel:+${only}`
  return only.length === 10 ? `tel:+91${only}` : `tel:+${only}`
}

// drop social links whose address is not an ordinary web link
const safeSocial = (links: SocialLink[]) =>
  links.map((l) => ({ ...l, url: safeHref(l.url) })).filter((l) => /^https?:/i.test(l.url))

export function mergeFooter(raw: any): FooterContent {
  const d = FOOTER_DEFAULTS
  const c = raw && raw.items && !Array.isArray(raw.items) && typeof raw.items === "object" ? raw.items : null
  if (!c) return d
  return {
    greeting: text(c.greeting, d.greeting),
    quickLinksTitle: text(c.quickLinksTitle, d.quickLinksTitle),
    quickLinks: rows(c.quickLinks, d.quickLinks, (r) => {
      const label = text(r?.label, "")
      const url = safeHref(text(r?.url, ""))
      return label && url ? { label, url } : null
    }),
    trustTitle: text(c.trustTitle, d.trustTitle),
    trustMembers: rows(c.trustMembers, d.trustMembers, (r) => {
      const name = text(r?.name, "")
      return name ? { role: text(r?.role, ""), name } : null
    }),
    followTitle: text(c.followTitle, d.followTitle),
    social: Array.isArray(c.social) ? safeSocial(normalizeLinks(c.social)) : [],
    contactTitle: text(c.contactTitle, d.contactTitle),
    placeName: text(c.placeName, d.placeName),
    addressLine1: text(c.addressLine1, d.addressLine1),
    addressLine2: text(c.addressLine2, d.addressLine2),
    phone: text(c.phone, d.phone),
    email: text(c.email, d.email),
    mapUrl: text(c.mapUrl, d.mapUrl),
    mapLabel: text(c.mapLabel, d.mapLabel),
    copyright: text(c.copyright, d.copyright),
    closing: text(c.closing, d.closing),
  }
}

export async function fetchFooter(): Promise<{ footer: FooterContent; social: SocialLink[] }> {
  const raw = await fetchContent("footer", { revalidate: 60 })
  const footer = mergeFooter(raw)
  // "Follow us": the footer's own list when it has one, otherwise the shared Media / Social links
  const social = footer.social.length ? footer.social : safeSocial(await fetchSocialLinks())
  return { footer, social }
}
