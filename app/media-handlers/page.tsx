import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"

export default function MediaHandlers() {
    return (
        <div className="min-h-screen bg-[#FFF4E6]">
            <ScrollProgress />
            <Header />
            <NavigationHandler />

            <main className="container mx-auto px-4 py-12 space-y-10 mt-20">

                
            </main>
            <Footer />
        </div>
    )
}