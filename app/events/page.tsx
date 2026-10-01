import { CalendarDays, MapPin, Phone } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import GalleryGrid from "@/components/gallery-grid"
import CmsImage from "@/components/cms-image"
import { fetchContent, extractPhone } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "कार्यक्रम | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर एवं पंचाल समाज के आगामी और बीते कार्यक्रम।",
}

interface EventItem {
  name?: string
  description?: string
  date?: string
  contact?: string
  venue?: string
  images?: string[]
}

const MONTHS = ["जन", "फ़र", "मार्च", "अप्रै", "मई", "जून", "जुला", "अग", "सित", "अक्टू", "नव", "दिस"]

function dateParts(d?: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || "")
  if (!m) return null
  return { y: m[1], mo: MONTHS[Number(m[2]) - 1], d: String(Number(m[3])) }
}

function longDate(d?: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || "")
  if (!m) return d || ""
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])).toLocaleDateString("hi-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
}

function EventCard({ e, past }: { e: EventItem; past?: boolean }) {
  const parts = dateParts(e.date)
  const images = (Array.isArray(e.images) ? e.images : []).filter(Boolean)
  const phone = extractPhone(e.contact)

  return (
    <article className={`temple-card overflow-hidden ${past ? "opacity-95" : ""}`}>
      {images[0] && (
        <div className="relative aspect-[16/8] w-full bg-[#2B0A0A]">
          <CmsImage src={images[0]} alt={e.name || "कार्यक्रम"} sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
        </div>
      )}

      <div className="flex gap-4 p-5 sm:gap-6 sm:p-7">
        {parts && (
          <div
            className={`flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-xl text-center shadow sm:h-24 sm:w-20 ${
              past ? "bg-gradient-to-b from-[#7A6A5A] to-[#4F4337] text-white" : "bg-gradient-to-b from-[#B30000] to-[#8F0000] text-white"
            }`}
          >
            <span className="font-display text-3xl leading-none text-[#FFE27A] sm:text-4xl">{parts.d}</span>
            <span className="mt-1 text-xs font-semibold tracking-wide">{parts.mo}</span>
            <span className="text-[10px] opacity-80">{parts.y}</span>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl leading-snug text-[#8F0000] sm:text-2xl">{e.name}</h3>

          <ul className="mt-3 space-y-1.5 text-sm text-[#5A4636]">
            {e.date && (
              <li className="flex items-center gap-2">
                <CalendarDays size={16} className="shrink-0 text-[#E0A100]" />
                {longDate(e.date)}
              </li>
            )}
            {e.venue && (
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#E0A100]" />
                {e.venue}
              </li>
            )}
            {e.contact && (
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#E0A100]" />
                {phone ? (
                  <a href={`tel:${phone}`} className="font-medium text-[#B30000] hover:underline">
                    {e.contact}
                  </a>
                ) : (
                  e.contact
                )}
              </li>
            )}
          </ul>

          {e.description && <p className="mt-4 whitespace-pre-line leading-relaxed text-[#3A2A1A]">{e.description}</p>}
        </div>
      </div>

      {images.length > 1 && (
        <div className="border-t border-[#C8941A]/25 p-4 sm:p-5">
          <GalleryGrid items={images.slice(1).map((src) => ({ src }))} columns="md:grid-cols-4 lg:grid-cols-4" />
        </div>
      )}
    </article>
  )
}

export default async function EventsPage() {
  const c = await fetchContent("events")
  const items: EventItem[] = (Array.isArray(c?.items) ? c.items : []).filter((e: EventItem) => e && e.name)

  // Compare calendar dates in IST so "today" is correct for the temple's visitors
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
  const upcoming = items.filter((e) => !e.date || e.date >= today).sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"))
  const past = items.filter((e) => e.date && e.date < today).sort((a, b) => (b.date || "").localeCompare(a.date || ""))

  return (
    <PageShell heading={c?.title || "कार्यक्रम"} subtitle="मंदिर एवं पंचाल समाज के आयोजन" eyebrow="Events">
      {items.length === 0 ? (
        <EmptyNote text="अभी कोई कार्यक्रम सूचीबद्ध नहीं है। जल्द ही जानकारी जोड़ी जाएगी।" />
      ) : (
        <div className="mx-auto max-w-4xl space-y-14">
          {upcoming.length > 0 && (
            <section aria-labelledby="upcoming">
              <h2 id="upcoming" className="mb-6 font-display text-2xl text-[#8F0000]">
                आगामी कार्यक्रम
              </h2>
              <div className="space-y-8">
                {upcoming.map((e, i) => (
                  <EventCard key={`u-${i}`} e={e} />
                ))}
              </div>
            </section>
          )}
          {past.length > 0 && (
            <section aria-labelledby="past">
              <h2 id="past" className="mb-6 font-display text-2xl text-[#5A4636]">
                बीते कार्यक्रम
              </h2>
              <div className="space-y-8">
                {past.map((e, i) => (
                  <EventCard key={`p-${i}`} e={e} past />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PageShell>
  )
}
