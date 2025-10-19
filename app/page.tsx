"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import LiveDarshanSection from "@/components/live-darshan-section"
import PujasDonationSection from "@/components/pujas-donation-section"
import QuickLinksSection from "@/components/quick-links-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import GlobalLoader from "@/components/global-loader"
import RunningNotice from "@/components/running-notice"
import SectionSummaryCard from "@/components/section-summary-card"

import { Building, Clock, Crown, BookOpen, Users, Bell, Calendar, MapPin, Star, Shield, ImageIcon as ImageIconLucide } from 'lucide-react'

export default function HomePage() {
  const [isContentReady, setIsContentReady] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [liveDarshanLoaded, setLiveDarshanLoaded] = useState(false)

  // Combined loading state for GlobalLoader
  useEffect(() => {
    if (heroLoaded && liveDarshanLoaded) {
      setIsContentReady(true)
    }
  }, [heroLoaded, liveDarshanLoaded])

  const otherSections = [
    {
      title: "About Mandir",
      description: "Explore the sacred history and significance of Shree Tripura Sundari Temple.",
      icon: Building,
      href: "/about",
      color: "from-[#FF6B00] to-[#FFD700]",
    },
    {
      title: "Temple Timings",
      description: "View daily darshan, aarti, and ritual schedules for summer and winter.",
      icon: Clock,
      href: "/timings",
      color: "from-[#FFD700] to-[#FF6B00]",
    },
    {
      title: "Maa Shringar",
      description: "Discover the weekly divine decoration schedule and color schemes of Maa Tripura.",
      icon: Crown,
      href: "/shringar",
      color: "from-[#FF6B00] to-[#B30000]",
    },
    {
      title: "Temple History",
      description: "Delve into the ancient origins, legends, and architectural marvels of the temple.",
      icon: BookOpen,
      href: "/history",
      color: "from-[#B30000] to-[#FFD700]",
    },
    {
      title: "Community & Trust",
      description: "Learn about Panchal Samaj 14 Chokhra and the Temple Trust management.",
      icon: Users,
      href: "/community",
      color: "from-[#FFD700] to-[#B30000]",
    },
    {
      title: "Notices & Press",
      description: "Stay updated with important announcements, news, and upcoming events.",
      icon: Bell,
      href: "/notices",
      color: "from-[#B30000] to-[#FF6B00]",
    },
    {
      title: "All Services",
      description: "Explore all digital services including Mandir Shop, Matrimonial, and Business Directory.",
      icon: Star,
      href: "/services-all",
      color: "from-[#FF6B00] to-[#FFD700]",
    },
    {
      title: "Events & Gallery",
      description: "Browse upcoming events, cultural programs, and photo/video galleries.",
      icon: Calendar,
      href: "/events-gallery",
      color: "from-[#FFD700] to-[#FF6B00]",
    },
    {
      title: "VIP Visitors",
      description: "View a gallery of distinguished guests and dignitaries who have visited the temple.",
      icon: Shield,
      href: "/vip-visitors-all",
      color: "from-[#FF6B00] to-[#B30000]",
    },
    {
      title: "Location & Contact",
      description: "Find detailed travel guide, address, and contact information for the temple.",
      icon: MapPin,
      color: "from-[#B30000] to-[#FFD700]",
      href: "/contact-us",
    },
    {
      title: "Temple Images",
      description: "Explore a beautiful collection of photographs showcasing the temple's grandeur.",
      icon: ImageIconLucide,
      href: "/temple-images",
      color: "from-[#FFD700] to-[#FF6B00]",
    },
  ]

  return (
    <>
      <GlobalLoader isContentReady={isContentReady} />
      <div className="min-h-screen bg-[#FFF4E6]">
        <ScrollProgress />
        <Header />
        <NavigationHandler />
        <main role="main">
          <HeroSection onContentLoad={() => setHeroLoaded(true)} />
          <LiveDarshanSection onContentLoad={() => setLiveDarshanLoaded(true)} />
          <RunningNotice />
          <QuickLinksSection />
          <PujasDonationSection />

          {/* Section for Other Content */}
          <section className="py-12 md:py-16 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#B30000]">Explore More</h2>
                <p className="text-[#FF6B00] text-lg">अन्य महत्वपूर्ण अनुभाग</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherSections.map((section, index) => (
                  <SectionSummaryCard
                    key={index}
                    title={section.title}
                    description={section.description}
                    icon={section.icon}
                    href={section.href}
                    color={section.color}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
