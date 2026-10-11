import Link from "next/link"
import { CalendarDays, FileText } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import PressShare from "@/components/press-share"
import { SITE_URL, fetchContent } from "@/lib/api"
import { normalizePress, pressPath } from "@/lib/press"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "प्रेस विज्ञप्ति | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर ट्रस्ट की आधिकारिक प्रेस विज्ञप्तियाँ।",
}

export default async function PressReleasePage() {
  const c = await fetchContent("press-release")
  const items = normalizePress(c)
  return (
    <PageShell heading={c?.title || "प्रेस विज्ञप्ति"} subtitle="मंदिर ट्रस्ट की आधिकारिक सूचनाएँ" eyebrow="Press Release">
      {items.length === 0 ? (
        <EmptyNote />
      ) : (
        <ol className="relative mx-auto max-w-3xl space-y-6 border-l-2 border-dashed border-[#E0A100]/70 pl-6 sm:pl-8">
          {items.map((p, i) => (
            <li key={p.id} className="relative">
              <span className="absolute -left-[2.15rem] top-6 h-4 w-4 rotate-45 border-2 border-[#FFF4E6] bg-[#B30000] sm:-left-[2.65rem]" aria-hidden="true" />
              <article className="temple-card p-5 sm:p-6">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {i === 0 && <span className="rounded-full bg-[#B30000] px-3 py-0.5 text-xs font-semibold text-[#FFE27A]">ताज़ा</span>}
                  {p.dateLabel && (
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-[#C25400]">
                      <CalendarDays size={14} />
                      {p.dateLabel}
                    </p>
                  )}
                </div>
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading={i === 0 ? "eager" : "lazy"} className="mb-4 aspect-[16/9] w-full rounded-xl border border-[#C8941A]/50 object-cover" />
                )}
                <h3 className="font-display text-xl leading-snug text-[#8F0000]">
                  <Link href={pressPath(p.id)} className="hover:underline">
                    {p.title}
                  </Link>
                </h3>
                {p.summary && <p className="mt-2 line-clamp-4 whitespace-pre-line leading-relaxed text-[#3A2A1A]">{p.summary}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={pressPath(p.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-5 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110"
                  >
                    <FileText size={15} />
                    पूरी विज्ञप्ति पढ़ें
                  </Link>
                  <PressShare title={p.title} summary={p.summary} url={`${SITE_URL}${pressPath(p.id)}`} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      )}
    </PageShell>
  )
}
