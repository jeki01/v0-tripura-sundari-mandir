import PanchalSamajSection from "@/components/panchal-samaj-section"
import { PageShell, RichBody } from "@/components/cms"
import { fetchContent, isManaged } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "पंचाल समाज 14 चोखरा | श्री त्रिपुरा सुंदरी मंदिर",
  description: "पंचाल समाज 14 चोखरा का परिचय, परंपरा और सेवा कार्य।",
}

export default async function CommunityPage() {
  const c = await fetchContent("about-panchal-samaj")
  if (!isManaged(c)) {
    return (
      <PageShell>
        <PanchalSamajSection />
      </PageShell>
    )
  }
  return (
    <PageShell heading={c.title || "पंचाल समाज"} subtitle="पंचाल समाज 14 चोखरा — परंपरा, श्रम और सेवा" eyebrow="Panchal Samaj">
      <RichBody html={c.html} />
    </PageShell>
  )
}
