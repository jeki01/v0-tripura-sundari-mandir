import { PageShell, RichBody, EmptyNote } from "@/components/cms"
import { fetchContent, hasContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export default async function AboutBanswaraPage() {
  const c = await fetchContent("about-banswara")
  return (
    <PageShell heading={c?.title || "बांसवाड़ा के बारे में (About Banswara)"}>
      {hasContent(c) ? <RichBody html={c.html} /> : <EmptyNote />}
    </PageShell>
  )
}
