import VipVisitorsSection from "@/components/vip-visitors-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageShell, EmptyNote } from "@/components/cms"
import { fetchContent, isManaged } from "@/lib/api"
import RecentVisitsGrid from "@/components/recent-visits-grid"

export const dynamic = "force-dynamic"

function StaticVisitors() {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="site-container py-8 md:py-12">
        <div className="flex justify-end mb-8">
          <Link href="/" passHref>
            <Button className="bg-[#FF6B00] hover:bg-[#B30000] text-white">Back to Home</Button>
          </Link>
        </div>
        <VipVisitorsSection />
      </main>
      <Footer />
    </div>
  )
}

export default async function VipVisitorsAllPage() {
  const c = await fetchContent("recent-visits")
  const items: any[] = Array.isArray(c?.items) ? c.items : []
  if (!isManaged(c)) return <StaticVisitors />
  return (
    <PageShell heading={c?.title || "हाल की विज़िट (Recent Visits)"}>
      {items.length === 0 && <EmptyNote />}
      {items.length > 0 && <RecentVisitsGrid items={items} />}
    </PageShell>
  )
}
