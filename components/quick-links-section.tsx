import Link from "next/link"
import {
  Building,
  Calendar,
  Camera,
  Clock,
  Crown,
  BookOpen,
  Flower2,
  Hammer,
  HandHeart,
  HelpCircle,
  Landmark,
  MapPin,
  Mountain,
  Newspaper,
  PartyPopper,
  PenLine,
  Phone,
  Radio,
  Shield,
  ShoppingBag,
  Video,
  Users,
} from "lucide-react"
import { SectionHeading } from "@/components/ornaments"

// Every page in the top navigation is listed here, plus shortcuts to sections of the home page.
const quickLinks = [
  // Home-page sections
  { titleHindi: "लाइव दर्शन", title: "Live Darshan", icon: Video, href: "#darshan-live" },
  { titleHindi: "मंदिर समय", title: "Timings", icon: Clock, href: "#temple-timings" },
  { titleHindi: "माँ स्वरूप", title: "Maa Swaroop", icon: Crown, href: "#divya-swaroop" },
  { titleHindi: "स्थान", title: "Location", icon: MapPin, href: "#how-to-reach" },
  // Temple menu
  { titleHindi: "मंदिर परिचय", title: "About Mandir", icon: Building, href: "/about" },
  { titleHindi: "इतिहास", title: "History", icon: BookOpen, href: "/history" },
  { titleHindi: "ट्रस्ट मंडल", title: "Trust Mandal", icon: Shield, href: "/trust-mandal" },
  { titleHindi: "संपर्क", title: "Contact", icon: Phone, href: "/contact" },
  { titleHindi: "कार्यक्रम", title: "Events", icon: Calendar, href: "/events" },
  { titleHindi: "त्योहार", title: "Festivals", icon: PartyPopper, href: "/festivals" },
  { titleHindi: "पंचाल समाज", title: "Panchal Samaj", icon: Hammer, href: "/about-panchal-samaj" },
  // Media menu
  { titleHindi: "गैलरी", title: "Gallery", icon: Camera, href: "/temple-images" },
  { titleHindi: "ब्लॉग", title: "Blog", icon: PenLine, href: "/blog" },
  { titleHindi: "प्रेस विज्ञप्ति", title: "Press Release", icon: Newspaper, href: "/press-release" },
  { titleHindi: "मीडिया", title: "Media", icon: Radio, href: "/media-handlers" },
  { titleHindi: "सामान्य प्रश्न", title: "FAQ", icon: HelpCircle, href: "/faq" },
  // Services menu
  { titleHindi: "ई-स्टोर", title: "E-Store", icon: ShoppingBag, href: "/estore" },
  { titleHindi: "दान", title: "Donation", icon: HandHeart, href: "/donation" },
  { titleHindi: "श्रृंगार बुकिंग", title: "Book Shringar", icon: Flower2, href: "/shringar" },
  // Visitors menu
  { titleHindi: "विशिष्ट अतिथि", title: "Visitors", icon: Users, href: "/vip-visitors-all" },
  { titleHindi: "बांसवाड़ा", title: "About Banswara", icon: Landmark, href: "/about-banswara" },
  { titleHindi: "राजस्थान", title: "About Rajasthan", icon: Mountain, href: "/about-rajasthan" },
]

export default function QuickLinksSection() {
  return (
    <section className="bg-jali py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="झटपट पहुँच" subtitle="Quick Access" />

        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 md:gap-4">
          {quickLinks.map(({ title, titleHindi, icon: Icon, href }) => (
            <Link
              key={href + title}
              href={href}
              className="group flex w-[calc(33.333%-0.5rem)] flex-col items-center rounded-2xl sm:w-[calc(25%-0.5625rem)] md:w-[calc(16.666%-0.8334rem)] border border-[#C8941A]/40 bg-white/80 px-2 py-4 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#C8941A] hover:bg-white hover:shadow-[0_14px_24px_-12px_rgba(179,0,0,0.45)]"
            >
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A] ring-2 ring-[#FFD700]/70 ring-offset-2 ring-offset-white transition group-hover:scale-110 sm:h-14 sm:w-14">
                <Icon size={22} />
              </span>
              <span className="font-display text-sm leading-tight text-[#8F0000] sm:text-base">{titleHindi}</span>
              <span className="mt-0.5 text-[11px] text-[#C25400] sm:text-xs">{title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
