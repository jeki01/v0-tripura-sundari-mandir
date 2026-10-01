import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import HeroSection from "@/components/hero-section"
import QuickLinksSection from "@/components/quick-links-section"
import AerialVideo from "@/components/aerial-video"
import TempleTimingsSection from "@/components/temple-timings-section"
import TempleStructureSection from "@/components/divya-swaroop"
import ShringarScheduleSection from "@/components/shringar-schedule-section"
import LiveDarshanSection from "@/components/live-darshan-section"
import HowToReachSection from "@/components/HowToReachSection"
import ContactSection from "@/components/contact-us"
import DosDontsSection from "@/components/do-dont-section"
import FaqSection from "@/components/faqs-section"
import { fetchSocialLinks } from "@/lib/api"

// Static page re-generated at most once a minute (footer/contact links come from the DB)
export const revalidate = 60

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

export default async function HomePage() {
  const socialLinks = await fetchSocialLinks()
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <main role="main">
        <HeroSection />
        <QuickLinksSection />
        <AerialVideo />
        <TempleTimingsSection />
        <TempleStructureSection divineImages={divineImages} />
        <ShringarScheduleSection />
        <LiveDarshanSection socialLinks={socialLinks} />
        <HowToReachSection />
        <ContactSection socialLinks={socialLinks} />
        <DosDontsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
