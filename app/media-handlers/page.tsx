import Link from "next/link"
import { BookOpen, ExternalLink, Mail } from "lucide-react"
import { PageShell } from "@/components/cms"
import SubscribeForm from "@/components/subscribe-form"
import { SocialIcon, platformMeta } from "@/components/social-icons"
import { SectionHeading } from "@/components/ornaments"
import { fetchContent, normalizeLinks } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "मीडिया | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर के डिजिटल मीडिया लिंक, WhatsApp समुदाय और न्यूज़लेटर।",
}

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

export default async function MediaHandlersPage() {
  // Links are managed in admin -> Mandir -> मीडिया हैंडलर (Media Handlers)
  const c = await fetchContent("media-handlers")
  const links = normalizeLinks(c?.items)
  const whatsapp = links.find((l) => l.platform === "whatsapp")

  return (
    <PageShell heading={c?.title || "मीडिया"} subtitle="मंदिर के दैनिक दर्शन, कार्यक्रम और अपडेट — हर प्लेटफ़ॉर्म पर" eyebrow="Media">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* Print media */}
        <section className="temple-card p-6 sm:p-10">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A] ring-2 ring-[#FFD700]/70 ring-offset-2 ring-offset-[#FFFDF6]">
              <BookOpen size={28} />
            </span>
            <div className="flex-1">
              <h2 className="font-display text-2xl text-[#8F0000]">Print Media</h2>
              <p className="mt-2 leading-relaxed text-[#3A2A1A]">
                श्री त्रिपुरा सुंदरी मंदिर ट्रस्ट द्वारा एक विशेष <strong>मंदिर स्मारक पुस्तक</strong> प्रकाशित की जाएगी, जिसमें मंदिर का इतिहास,
                धरोहर, त्योहार, दर्शन, आयोजन और ट्रस्ट मंडल की आधिकारिक जानकारी संकलित होगी।
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-6 py-3 text-sm font-semibold text-white shadow transition hover:brightness-110"
            >
              प्रिंटेड बुक के लिए संपर्क करें
            </Link>
          </div>
        </section>

        {/* Digital media */}
        <section>
          <SectionHeading title="Digital Media" subtitle="मंदिर से जुड़े दैनिक दर्शन, कार्यक्रम और सभी अपडेट डिजिटल प्लेटफॉर्म पर" />
          {links.length === 0 ? (
            <p className="text-center text-[#5A4636]">लिंक जल्द ही उपलब्ध होंगे।</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l, i) => {
                const meta = platformMeta(l.platform)
                return (
                  <a
                    key={`${l.url}-${i}`}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="temple-card group flex items-center gap-4 p-4 transition duration-300 hover:-translate-y-1"
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow ${meta.bg}`}>
                      <SocialIcon platform={l.platform} size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-[#8F0000]">{l.label || meta.name}</span>
                      <span className="block truncate text-xs text-[#7A5A3A]">{hostOf(l.url)}</span>
                    </span>
                    <ExternalLink size={16} className="shrink-0 text-[#C25400] transition group-hover:translate-x-0.5" />
                  </a>
                )
              })}
            </div>
          )}
        </section>

        {/* WhatsApp community */}
        {whatsapp && (
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F5132] via-[#14803F] to-[#25D366] p-8 text-center text-white shadow-xl sm:p-12">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <SocialIcon platform="whatsapp" size={32} />
            </span>
            <h2 className="font-display text-2xl sm:text-3xl">WhatsApp Community</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">मंदिर की लाइव अपडेट और दैनिक दर्शन WhatsApp समुदाय में प्राप्त करें।</p>
            <a
              href={whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-lg font-bold text-[#0F5132] shadow transition hover:-translate-y-0.5"
            >
              Join WhatsApp Community
            </a>
          </section>
        )}

        {/* Newsletter */}
        <section className="temple-card mx-auto max-w-3xl p-6 text-center sm:p-10">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A]">
            <Mail size={26} />
          </span>
          <h2 className="font-display text-2xl text-[#8F0000]">Subscribe Newsletter</h2>
          <p className="mx-auto mb-6 mt-2 max-w-xl text-[#3A2A1A]">दैनिक दर्शन और मंदिर से जुड़े सभी अपडेट सीधे ईमेल पर प्राप्त करें।</p>
          <SubscribeForm source="mandir-newsletter" />
        </section>
      </div>
    </PageShell>
  )
}
