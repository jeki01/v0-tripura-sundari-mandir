import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import TrustManagementSection from "@/components/trust-management-section"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="container mx-auto px-4 py-8 md:py-12">
       
        <TrustManagementSection />
      </main>
      <Footer />
    </div>
  )
}
