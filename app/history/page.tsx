import TempleHistoryPage from "@/components/temple-history-page"
import { PageShell, RichBody } from "@/components/cms"
import { fetchContent, isManaged } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "मंदिर का इतिहास | श्री त्रिपुरा सुंदरी मंदिर, बांसवाड़ा",
  description: "श्री त्रिपुरा सुंदरी मंदिर (तारताई माता) का प्राचीन इतिहास, वास्तुशिल्प और आध्यात्मिक महत्व।",
}

export default async function HistoryPage() {
  const c = await fetchContent("history")
  // Until the section is saved from the admin portal, show the original written history
  if (!isManaged(c)) {
    return (
      <PageShell>
        <TempleHistoryPage />
      </PageShell>
    )
  }
  return (
    <PageShell heading={c.title || "मंदिर का इतिहास"} subtitle="श्री त्रिपुरा सुंदरी मंदिर की गौरवशाली गाथा" eyebrow="History">
      <RichBody html={c.html} />
    </PageShell>
  )
}
