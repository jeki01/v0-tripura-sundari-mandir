import Link from "next/link"
import {
  Building,
  Calendar,
  Camera,
  Clock,
  Crown,
  BookOpen,
  MapPin,
  Shield,
  Video,
  Users,
} from "lucide-react"
import { SectionHeading } from "@/components/ornaments"

const quickLinks = [
  { titleHindi: "लाइव दर्शन", title: "Live Darshan", icon: Video, href: "#darshan-live" },
  { titleHindi: "मंदिर परिचय", title: "About Mandir", icon: Building, href: "/about" },
  { titleHindi: "मंदिर समय", title: "Timings", icon: Clock, href: "#temple-timings" },
  { titleHindi: "माँ स्वरूप", title: "Maa Swaroop", icon: Crown, href: "#divya-swaroop" },
  { titleHindi: "इतिहास", title: "History", icon: BookOpen, href: "/history" },
  { titleHindi: "ट्रस्ट मंडल", title: "Trust", icon: Shield, href: "/trust-mandal" },
  { titleHindi: "कार्यक्रम", title: "Events", icon: Calendar, href: "/events" },
  { titleHindi: "गैलरी", title: "Gallery", icon: Camera, href: "/temple-images" },
  { titleHindi: "विशिष्ट अतिथि", title: "Visitors", icon: Users, href: "/vip-visitors-all" },
  { titleHindi: "स्थान", title: "Location", icon: MapPin, href: "#how-to-reach" },
]

export default function QuickLinksSection() {
  return (
    <section className="bg-jali py-12 md:py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="झटपट पहुँच" subtitle="Quick Access" />

        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
          {quickLinks.map(({ title, titleHindi, icon: Icon, href }) => (
            <Link
              key={href + title}
              href={href}
              className="group flex flex-col items-center rounded-2xl border border-[#C8941A]/40 bg-white/80 px-2 py-4 text-center shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#C8941A] hover:bg-white hover:shadow-[0_14px_24px_-12px_rgba(179,0,0,0.45)]"
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
