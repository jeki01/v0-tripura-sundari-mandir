import { PageShell, EmptyNote } from "@/components/cms"
import GalleryGrid, { type GalleryItem } from "@/components/gallery-grid"
import { fetchContent, isManaged } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "गैलरी | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर की सुंदर तस्वीरों का संग्रह।",
}

// Shown until the gallery is first saved from the admin portal
const DEFAULT_IMAGES = [
  "/images/temple-1.jpg", "/images/temple-2.jpg", "/images/temple-3.jpg", "/images/temple-4.jpg", "/images/temple-5.jpg",
  "/images/temple-6.jpg", "/images/temple-7.jpg", "/images/temple-8.jpg", "/images/temple-9.jpg",
  "/images/hero/hero-night-view.jpg", "/images/hero/hero-divine-idol.jpg",
  "/images/shringar/somwar-monday.jpg", "/images/shringar/mangalwar-tuesday.jpg", "/images/shringar/budhwar-wednesday.jpg",
  "/images/shringar/guruwar-thursday.jpg", "/images/shringar/shukrawar-friday.jpg", "/images/shringar/shanivar-saturday.jpg",
  "/images/shringar/ravivar-sunday.jpg", "/images/garbh-grah-darshan.jpg",
  "/images/divine/ma-swarup-1.jpg", "/images/divine/ma-swarup-5.jpg", "/images/divine/ma-face-4.jpg",
  "/images/divine/ma-face-3.jpg", "/images/divine/ma-swarup-4.jpg",
  "/images/historical/sm_4.jpg", "/images/historical/sm_2.jpg", "/images/historical/book_cover_1.jpg",
  "/images/historical/sm_5.jpg", "/images/historical/big_3.jpg",
]

export default async function GalleryPage() {
  const c = await fetchContent("gallery")
  const managed = isManaged(c)
  const items: GalleryItem[] = managed
    ? (Array.isArray(c?.items) ? c.items : []).filter((g: any) => g?.image).map((g: any) => ({ src: g.image, caption: g.caption }))
    : DEFAULT_IMAGES.map((src) => ({ src }))
  return (
    <PageShell heading={c?.title || "गैलरी"} subtitle="मंदिर की सुंदर तस्वीरों का संग्रह" eyebrow="Gallery">
      {items.length === 0 ? <EmptyNote text="अभी तक कोई इमेज नहीं जोड़ी गई।" /> : <GalleryGrid items={items} />}
    </PageShell>
  )
}
