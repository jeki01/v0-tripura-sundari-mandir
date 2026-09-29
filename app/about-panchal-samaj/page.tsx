import PanchalSamajSection from "@/components/panchal-samaj-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageShell, RichBody } from "@/components/cms"
import { fetchContent, isManaged } from "@/lib/api"

export const dynamic = "force-dynamic"

function StaticCommunity() {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-end mb-8">
          <Link href="/" passHref>
            <Button className="bg-[#FF6B00] hover:bg-[#B30000] text-white">Back to Home</Button>
          </Link>
        </div>
        <PanchalSamajSection />
      </main>
      <Footer />
    </div>
  )
}

export default async function CommunityPage() {
  const c = await fetchContent("about-panchal-samaj")
  if (!isManaged(c)) return <StaticCommunity />
  return (
    <PageShell heading={c.title || "पंचाल समाज (Panchal Samaj)"}>
      <RichBody html={c.html} />
    </PageShell>
  )
}
