"use client"

import { useState, useEffect } from "react"
import HeroSection from "@/components/hero-section"
import LiveDarshanSection from "@/components/live-darshan-section"
import PujasDonationSection from "@/components/pujas-donation-section"
import QuickLinksSection from "@/components/quick-links-section"
import DosDontsSection from "@/components/do-dont-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import GlobalLoader from "@/components/global-loader"
import RunningNotice from "@/components/running-notice"
import SectionSummaryCard from "@/components/section-summary-card"
import TempleStructureSection from "@/components/divya-swaroop"
import FaqSection from "@/components/faqs-section"

import { Building, Clock, Crown, BookOpen, Users, Bell, Calendar, MapPin, Star, Shield, ImageIcon as ImageIconLucide } from 'lucide-react'
import TempleTimingsSection from "@/components/temple-timings-section"
import ContactSection from "@/components/contact-us"
import ShringarScheduleSection from "@/components/shringar-schedule-section"
import ShringarTableSection from "@/components/shringar-table-section"
import HowToReachSection from "@/components/HowToReachSection"

export default function HomePage() {
  const [isContentReady, setIsContentReady] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [liveDarshanLoaded, setLiveDarshanLoaded] = useState(false)

   const divineImages = [
    {
      src: "/images/divine/ma-swarup-1.jpg",
      alt: "माँ त्रिपुरा सुंदरी का पूर्ण दिव्य स्वरूप - 18 भुजाओं सहित",
      caption: "माँ का पूर्ण दिव्य स्वरूप - 18 भुजाओं सहित",
    },
    {
      src: "/images/divine/ma-swarup-4.jpg",
      alt: "सुनहरे प्रभामंडल के साथ माँ का दिव्य रूप",
      caption: "सुनहरे प्रभामंडल के साथ दिव्य रूप",
    },
    {
      src: "/images/divine/ma-face-4.jpg",
      alt: "माँ के दिव्य मुखारविंद का निकट दर्शन",
      caption: "दिव्य मुखारविंद का निकट दर्शन",
    },
    {
      src: "/images/divine/ma-swarup-5.jpg",
      alt: "स्वर्ण आभूषणों से सुसज्जित माँ का मुख",
      caption: "स्वर्ण आभूषणों से सुसज्जित मुख",
    },
    {
      src: "/images/divine/ma-face-3.jpg",
      alt: "माँ के नेत्रों का दिव्य तेज",
      caption: "माँ के नेत्रों का दिव्य तेज",
    },
  ]
  
  
  // Combined loading state for GlobalLoader
  useEffect(() => {
    if (heroLoaded && liveDarshanLoaded) {
      setIsContentReady(true)
    }
  }, [heroLoaded, liveDarshanLoaded])

 

  return (
    <>
      <GlobalLoader isContentReady={isContentReady} />
      <div className="min-h-screen bg-[#FFF4E6]">
        <ScrollProgress />
        <Header />
        {/* <NavigationHandler /> */}
        <main role="main">
          <HeroSection onContentLoad={() => setHeroLoaded(true)} />
          <TempleTimingsSection />
          <TempleStructureSection divineImages={divineImages} />
          <ShringarScheduleSection />

          <LiveDarshanSection onContentLoad={() => setLiveDarshanLoaded(true)} />
          {/* <RunningNotice /> */}
          <QuickLinksSection />
          {/* <PujasDonationSection /> */}

          {/* Section for Other Content */}
          {/* <section className="py-12 md:py-16 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
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
          </section> */}
          <HowToReachSection />

          <ContactSection />
          <DosDontsSection />
          <FaqSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
