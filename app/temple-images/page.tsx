import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"

export default function TempleImagesPage() {
  const templeImages = [
    "/images/temple-1.jpg",
    "/images/temple-2.jpg",
    "/images/temple-3.jpg",
    "/images/temple-4.jpg",
    "/images/temple-5.jpg",
    "/images/temple-6.jpg",
    "/images/temple-7.jpg",
    "/images/temple-8.jpg",
    "/images/temple-9.jpg",
    "/images/hero/hero-night-view.jpg",
    "/images/hero/hero-divine-idol.jpg",
    "/images/hero/hero-temple-spire.jpg",
    "/images/hero/hero-main-entrance.jpg",
    "/images/hero/hero-entrance-gate.jpg",
    "/images/hero/hero-temple-complex.jpg",
    "/images/hero/hero-visitor-area.jpg",
    "/images/hero/hero-aerial-view.jpg",
    "/images/hero/hero-temple-front.jpg",
    "/images/shringar/somwar-monday.jpg",
    "/images/shringar/mangalwar-tuesday.jpg",
    "/images/shringar/budhwar-wednesday.jpg",
    "/images/shringar/guruwar-thursday.jpg",
    "/images/shringar/shukrawar-friday.jpg",
    "/images/shringar/shanivar-saturday.jpg",
    "/images/shringar/ravivar-sunday.jpg",
    "/images/swarup-monday.jpg",
    "/images/swarup-tuesday.jpg",
    "/images/swarup-wednesday.jpg",
    "/images/swarup-thursday.jpg",
    "/images/swarup-friday.jpg",
    "/images/swarup-saturday.jpg",
    "/images/swarup-sunday.jpg",
    "/images/garbh-grah-darshan.jpg",
    "/images/divine/ma-swarup-1.jpg",
    "/images/divine/ma-swarup-5.jpg",
    "/images/divine/ma-face-4.jpg",
    "/images/divine/ma-face-3.jpg",
    "/images/divine/ma-swarup-4.jpg",
    "/images/historical/sm_4.jpg",
    "/images/historical/sm_2.jpg",
    "/images/historical/book_cover_1.jpg",
    "/images/historical/sm_5.jpg",
    "/images/historical/big_3.jpg",
    "/images/vip-visitors/sm_5.jpg",
    "/images/vip-visitors/sm_1.jpg",
    "/images/vip-visitors/sm_7.jpg",
    "/images/vip-visitors/sm_8.jpg",
    "/images/vip-visitors/sm_6.jpg",
    "/images/vip-visitors/sm_4.jpg",
    "/images/vip-visitors/sm_3.jpg",
    "/images/vip-visitors/sm_12.jpg",
    "/images/vip-visitors/sm_11.jpg",
  ]

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#B30000]">Explore Temple Images</h1>
          <Link href="/" passHref>
            <Button className="bg-[#FF6B00] hover:bg-[#B30000] text-white">Back to Home</Button>
          </Link>
        </div>

        <p className="text-lg text-[#FF6B00] mb-8">मंदिर की सुंदर तस्वीरों का संग्रह देखें</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templeImages.map((src, index) => (
            <div key={index} className="relative w-full h-60 overflow-hidden rounded-lg shadow-lg group">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Temple Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-semibold">View</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
