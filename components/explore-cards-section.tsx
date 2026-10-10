import Link from "next/link"
import { Calendar, Camera, Flower2, MessageSquareWarning, type LucideIcon } from "lucide-react"
import CmsImage from "@/components/cms-image"
import ExploreScroller from "@/components/explore-scroller"
import { fetchContent, isManaged } from "@/lib/api"
import { fetchAartiItems } from "@/lib/aarti"

type Card = { href: string; icon: LucideIcon; title: string; english: string; note: string; image: string }

const first = (list: unknown): any[] => (Array.isArray(list) ? list.filter(Boolean) : [])

// Four shortcuts right under "आज के दर्शन". Each card shows a picture from that section (the latest one the admin
// has added) and falls back to a temple photo when the section has none yet, so the row is never empty.
async function loadCards(): Promise<Card[]> {
  const [events, gallery, aarti] = await Promise.all([
    fetchContent("events", { revalidate: 60 }),
    fetchContent("gallery", { revalidate: 60 }),
    fetchAartiItems().catch(() => []),
  ])

  // events: the next upcoming one that has a picture, otherwise any event with a picture
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  const evs = first(events?.items).filter((e) => e.name)
  const withPic = (e: any) => first(e.images)[0]
  const upcoming = evs.filter((e) => withPic(e) && (!e.date || e.date >= today)).sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"))[0]
  const anyEvent = upcoming || evs.find(withPic)
  const nextEvent = evs.filter((e) => !e.date || e.date >= today).sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"))[0]

  const gal = isManaged(gallery) ? first(gallery?.items).find((g) => g.image) : null
  const aartiPic = aarti.find((a) => a.image)

  return [
    {
      href: "/events",
      icon: Calendar,
      title: "कार्यक्रम",
      english: "Events",
      note: nextEvent?.name || "मंदिर एवं समाज के आयोजन",
      image: anyEvent ? withPic(anyEvent) : "/images/hero/hero-temple-complex.jpg",
    },
    {
      href: "/temple-images",
      icon: Camera,
      title: "गैलरी",
      english: "Gallery",
      note: "मंदिर की सुंदर तस्वीरें",
      image: gal?.image || "/images/temple-2.jpg",
    },
    {
      href: "/aarti-stuti",
      icon: Flower2,
      title: "आरती एवं स्तुति",
      english: "Aarti & Stuti",
      note: aarti[0]?.title || "आरती, मंत्र, स्तोत्र एवं भक्ति",
      image: aartiPic?.image || "/images/divine/ma-face-4.jpg",
    },
    {
      href: "/grievance",
      icon: MessageSquareWarning,
      title: "शिकायत निवारण",
      english: "Grievance",
      note: "अपनी बात हम तक पहुँचाएँ",
      image: "/images/hero/hero-visitor-area.jpg",
    },
  ]
}

export default async function ExploreCardsSection() {
  const cards = await loadCards()
  return (
    <section className="bg-jali py-8 md:py-12" aria-label="और देखें">
      <div className="site-container">
        <ExploreScroller label="मंदिर के अनुभाग">
          {cards.map(({ href, icon: Icon, title, english, note, image }) => (
            <li key={href} className="w-[68%] shrink-0 snap-start sm:w-[240px] md:w-[270px] lg:w-[300px]">
              <Link
                href={href}
                className="group relative block aspect-[4/5] overflow-hidden lg:aspect-square rounded-2xl border-2 border-[#C8941A]/70 bg-[#5A0000] shadow-md transition duration-300 hover:-translate-y-1 hover:border-[#C8941A] hover:shadow-lg active:scale-[0.98]"
              >
                <CmsImage src={image} alt="" sizes="(min-width: 1024px) 300px, (min-width: 768px) 270px, 68vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#2B0A0A] via-[#2B0A0A]/35 to-transparent" aria-hidden="true" />
                <span className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A] ring-2 ring-[#FFD700]/70">
                  <Icon size={20} />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-display text-xl leading-tight text-[#FFE27A]">{title}</span>
                  <span className="block text-xs tracking-wide text-[#FFE9B8]">{english}</span>
                  <span className="mt-1.5 line-clamp-1 block text-xs text-white/85">{note}</span>
                </span>
              </Link>
            </li>
          ))}
        </ExploreScroller>
      </div>
    </section>
  )
}
