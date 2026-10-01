import { Phone } from "lucide-react"
import TrustManagementSection from "@/components/trust-management-section"
import { PageShell, EmptyNote } from "@/components/cms"
import CmsImage from "@/components/cms-image"
import { fetchContent, isManaged } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "ट्रस्ट मंडल | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर ट्रस्ट मंडल के पदाधिकारी एवं सदस्य।",
}

export default async function TrustMandalPage() {
  const c = await fetchContent("trust-mandal")
  const items: any[] = Array.isArray(c?.items) ? c.items : []
  if (!isManaged(c)) {
    return (
      <PageShell>
        <TrustManagementSection />
      </PageShell>
    )
  }
  return (
    <PageShell heading={c?.title || "ट्रस्ट मंडल"} subtitle="मंदिर की सेवा और संचालन के लिए समर्पित" eyebrow="Trust Mandal">
      {items.length === 0 ? (
        <EmptyNote />
      ) : (
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m, i) => (
            <div key={i} className="temple-card p-6 text-center transition duration-300 hover:-translate-y-1">
              <div className="relative mx-auto mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[#E0A100] bg-gradient-to-br from-[#B30000] to-[#FF6B00] ring-4 ring-[#FFF4E6]">
                {m.photo ? (
                  <CmsImage src={m.photo} alt={m.name || "सदस्य"} sizes="128px" className="object-cover" />
                ) : (
                  <span className="font-display text-4xl text-[#FFE27A]">{(m.name || "?").charAt(0)}</span>
                )}
              </div>
              <h3 className="font-display text-xl text-[#8F0000]">{m.name}</h3>
              {m.role && (
                <span className="mt-2 inline-block rounded-full bg-[#FFE9B8] px-3 py-1 text-sm font-semibold text-[#8F0000]">{m.role}</span>
              )}
              {m.phone && (
                <a href={`tel:${String(m.phone).replace(/[^\d+]/g, "")}`} className="mt-3 flex items-center justify-center gap-2 text-sm text-[#5A4636] hover:text-[#B30000]">
                  <Phone size={14} className="text-[#E0A100]" />
                  {m.phone}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  )
}
