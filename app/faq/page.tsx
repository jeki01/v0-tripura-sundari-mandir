import { ChevronDown } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import { fetchContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "सामान्य प्रश्न (FAQ) | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर दर्शन, समय और सुविधाओं से जुड़े अक्सर पूछे जाने वाले प्रश्न।",
}

export default async function FaqPage() {
  const c = await fetchContent("faq")
  const items: any[] = Array.isArray(c?.items) ? c.items : []
  return (
    <PageShell heading={c?.title || "सामान्य प्रश्न (FAQ)"} subtitle="दर्शन, समय और सुविधाओं से जुड़े आपके प्रश्न" eyebrow="FAQ">
      {items.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="temple-card mx-auto max-w-3xl divide-y divide-[#C8941A]/25 p-2 sm:p-4">
          {items.map((f, i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-3 py-4 [&::-webkit-details-marker]:hidden">
                <span className="font-medium text-[#3A2A1A] group-open:text-[#B30000]">{f.question}</span>
                <ChevronDown size={20} className="shrink-0 text-[#B30000] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="whitespace-pre-line px-3 pb-4 leading-relaxed text-[#5A4636]">{f.answer}</p>
            </details>
          ))}
        </div>
      )}
    </PageShell>
  )
}
