import { PageShell, EmptyNote } from "@/components/cms"
import { fetchContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export default async function PressReleasePage() {
  const c = await fetchContent("press-release")
  const items: any[] = Array.isArray(c?.items) ? c.items : []
  return (
    <PageShell heading={c?.title || "प्रेस विज्ञप्ति (Press Release)"}>
      {items.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-[#B30000]">{p.title}</h3>
                {p.date && <span className="text-xs text-gray-500 whitespace-nowrap">{p.date}</span>}
              </div>
              {p.summary && <p className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line">{p.summary}</p>}
              {p.link && (
                <a href={p.link} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-medium text-orange-600 hover:underline">
                  और पढ़ें →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  )
}
