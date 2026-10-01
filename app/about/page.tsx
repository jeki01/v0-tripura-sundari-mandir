import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import AboutSection from "@/components/about-section"
import { EmptyNote } from "@/components/cms"
import { fetchContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "मंदिर परिचय | श्री त्रिपुरा सुंदरी मंदिर, बांसवाड़ा",
  description: "श्री त्रिपुरा सुंदरी मंदिर (तारताई माता), बांसवाड़ा - स्थान, महत्व, प्रबंधन और सुविधाओं की जानकारी।",
}

// Content is managed from the admin portal (superadmin → Mandir → "मंदिर परिचय") and stored in the DB.
export default async function AboutPage() {
  const c = await fetchContent("about-mandir")
  const items = c?.items && !Array.isArray(c.items) ? c.items : {}
  const hasContent = !!(items.body || (Array.isArray(items.images) && items.images.length))

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="container mx-auto px-4 pb-12 pt-32 md:pt-36">
        {hasContent ? (
          <AboutSection title={c?.title || undefined} subtitle={items.subtitle} html={items.body} images={items.images} />
        ) : (
          <EmptyNote />
        )}
      </main>
      <Footer />
    </div>
  )
}
