import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import TrustManagementSection from "@/components/trust-management-section"
import { PageShell, EmptyNote } from "@/components/cms"
import { fetchContent, isManaged } from "@/lib/api"

export const dynamic = "force-dynamic"

function StaticTrust() {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <TrustManagementSection />
      </main>
      <Footer />
    </div>
  )
}

export default async function TrustMandalPage() {
  const c = await fetchContent("trust-mandal")
  const items: any[] = Array.isArray(c?.items) ? c.items : []
  if (!isManaged(c)) return <StaticTrust />
  return (
    <PageShell heading={c?.title || "ट्रस्ट मंडल (Trust Mandal)"}>
      {items.length === 0 && <EmptyNote />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((m, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-md text-center">
            {m.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-orange-100 mx-auto mb-3 flex items-center justify-center text-[#B30000] text-2xl">
                {(m.name || "?").charAt(0)}
              </div>
            )}
            <h3 className="text-lg font-semibold text-[#B30000]">{m.name}</h3>
            {m.role && <p className="text-sm text-gray-600">{m.role}</p>}
            {m.phone && <p className="text-sm text-gray-500 mt-1">{m.phone}</p>}
          </div>
        ))}
      </div>
    </PageShell>
  )
}
