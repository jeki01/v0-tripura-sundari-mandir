import { Phone } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import ContactSection from "@/components/contact-us"
import { Lotus } from "@/components/ornaments"
import { extractPhone, fetchContent, fetchSocialLinks } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "संपर्क | श्री त्रिपुरा सुंदरी मंदिर",
  description: "मंदिर ट्रस्ट मंडल, धर्मशाला, श्रृंगार बुकिंग और दान से जुड़े संपर्क विवरण।",
}

interface ContactRow {
  label?: string
  value?: string
  phone?: string
}
interface ContactCard {
  title?: string
  rows?: ContactRow[]
}

export default async function ContactPage() {
  const [c, socialLinks] = await Promise.all([fetchContent("contact"), fetchSocialLinks()])
  // Only the card-list shape is rendered (an older single-record shape is ignored)
  const cards: ContactCard[] = (Array.isArray(c?.items) ? c.items : []).filter((x: ContactCard) => x && x.title)

  return (
    <PageShell heading={c?.title || "संपर्क"} subtitle="मंदिर ट्रस्ट, धर्मशाला, श्रृंगार बुकिंग और अन्य सेवाओं के लिए" eyebrow="Contact">
      {cards.length === 0 ? (
        <EmptyNote text="संपर्क विवरण जल्द ही उपलब्ध होंगे।" />
      ) : (
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <section key={i} className="temple-card overflow-hidden">
              <h2 className="flex items-center gap-2 bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-5 py-3.5 font-display text-lg text-[#FFE27A]">
                <Lotus size={22} className="shrink-0" />
                {card.title}
              </h2>
              <dl className="divide-y divide-[#C8941A]/20 px-5 py-2">
                {(card.rows || []).map((r, j) => {
                  const dial = r.phone ? extractPhone(r.phone) : null
                  return (
                    <div key={j} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 text-sm">
                      <dt className="font-medium text-[#5A4636]">{r.label}</dt>
                      <dd className="flex flex-wrap items-center justify-end gap-x-3 text-right font-semibold text-[#8F0000]">
                        {r.value && <span>{r.value}</span>}
                        {r.phone && (
                          <a
                            href={dial ? `tel:${dial}` : undefined}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE9B8] px-3 py-1 text-[#6B0000] transition hover:bg-[#FFD700]"
                          >
                            <Phone size={13} />
                            {r.phone}
                          </a>
                        )}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </section>
          ))}
        </div>
      )}

      <div className="mt-16">
        <ContactSection socialLinks={socialLinks} />
      </div>
    </PageShell>
  )
}
