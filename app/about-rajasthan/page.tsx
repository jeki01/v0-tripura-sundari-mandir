import { PageShell, RichBody, EmptyNote } from "@/components/cms"
import { fetchContent, hasContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export default async function AboutRajasthanPage() {
  const c = await fetchContent("about-rajasthan")
  return (
    <PageShell heading={c?.title || "राजस्थान के बारे में (About Rajasthan)"}>
      {hasContent(c) ? <RichBody html={c.html} /> : <EmptyNote />}
    </PageShell>
  )
}
