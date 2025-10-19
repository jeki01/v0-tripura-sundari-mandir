import TempleTimingsSection from "@/components/temple-timings-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TimingsPage() {
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
        <TempleTimingsSection />
      </main>
      <Footer />
    </div>
  )
}
