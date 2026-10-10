import { PageShell, EmptyNote } from "@/components/cms"
import AartiBrowser from "@/components/aarti-browser"
import { fetchAartiItems } from "@/lib/aarti"

export const revalidate = 60

export const metadata = {
  title: "आरती एवं स्तुति | श्री त्रिपुरा सुंदरी मंदिर",
  description: "माँ त्रिपुरा सुंदरी की आरती, मंत्र, साधना, स्तोत्र एवं भक्ति — वीडियो और लेख।",
  alternates: { canonical: "/aarti-stuti" },
}

export default async function AartiStutiPage() {
  const items = await fetchAartiItems()
  return (
    <PageShell heading="आरती एवं स्तुति" subtitle="आरती, मंत्र, साधना, स्तोत्र एवं भक्ति — वीडियो और लेख" eyebrow="Aarti & Stuti">
      {items.length === 0 ? <EmptyNote text="आरती एवं स्तुति की सामग्री शीघ्र ही यहाँ उपलब्ध होगी।" /> : <AartiBrowser items={items} />}
    </PageShell>
  )
}
