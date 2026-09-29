import { PageShell, EmptyNote } from "@/components/cms"
import { fetchContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export default async function FaqPage() {
  const c = await fetchContent("faq")
  const items: any[] = Array.isArray(c?.items) ? c.items : []
  return (
    <PageShell heading={c?.title || "सामान्य प्रश्न (FAQ)"}>
      {items.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-md">
              <h3 className="text-lg font-semibold text-[#B30000] mb-2">{f.question}</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{f.answer}</p>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  )
}
