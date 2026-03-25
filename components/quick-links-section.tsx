"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Building,
  Calendar,
  Crown,
  Sparkles,
  ImageIcon,
  MapPin,
  Video,
  Clock,
  Users,
  Heart,
  BookOpen,
  Bell,
  Shield,
  ShoppingCart,
  Phone,
  Camera,
  Mail,
} from "lucide-react"

export default function QuickLinksSection() {
  const quickLinks = [
    {
      title: "Live Darshan",
      titleHindi: "लाइव दर्शन",
      icon: Video,
      href: "#darshan-live",
      color: "from-[#B30000] to-[#FF6B00]",
    },
    {
      title: "About Mandir",
      titleHindi: "मंदिर परिचय",
      icon: Building,
      href: "#about-mandir",
      color: "from-[#FF6B00] to-[#FFD700]",
    },
    {
      title: "Temple Timings",
      titleHindi: "मंदिर समय",
      icon: Clock,
      href: "#temple-timings",
      color: "from-[#FFD700] to-[#FF6B00]",
    },
    {
      title: "Maa Swaroop",
      titleHindi: "माँ स्वरूप",
      icon: Crown,
      href: "#shringar-schedule",
      color: "from-[#FF6B00] to-[#B30000]",
    },
    {
      title: "History",
      titleHindi: "इतिहास",
      icon: BookOpen,
      href: "#temple-history",
      color: "from-[#B30000] to-[#FFD700]",
    },
    // {
    //   title: "Online Pujas",
    //   titleHindi: "ऑनलाइन पूजा",
    //   icon: Sparkles,
    //   href: "#pujas",
    //   color: "from-[#FFD700] to-[#B30000]",
    // },
    // {
    //   title: "Panchal Samaj",
    //   titleHindi: "पंचाल समाज",
    //   icon: Users,
    //   href: "#panchal-samaj",
    //   color: "from-[#B30000] to-[#FF6B00]",
    // },
    {
      title: "Trust",
      titleHindi: "ट्रस्ट",
      icon: Shield,
      href: "#trust-management",
      color: "from-[#FF6B00] to-[#FFD700]",
    },
    {
      title: "Notices",
      titleHindi: "सूचनाएं",
      icon: Bell,
      href: "#notice-portal",
      color: "from-[#FFD700] to-[#FF6B00]",
    },
    {
      title: "Services",
      titleHindi: "सेवाएं",
      icon: Heart,
      href: "#services",
      color: "from-[#FF6B00] to-[#B30000]",
    },
    {
      title: "Events",
      titleHindi: "कार्यक्रम",
      icon: Calendar,
      href: "#events",
      color: "from-[#B30000] to-[#FFD700]",
    },
    {
      title: "Gallery",
      titleHindi: "गैलरी",
      icon: Camera,
      href: "#events",
      color: "from-[#FFD700] to-[#B30000]",
    },
    {
      title: "Visitors",
      titleHindi: "विशिष्ट अतिथि",
      icon: Crown,
      href: "#vip-visitors",
      color: "from-[#B30000] to-[#FF6B00]",
    },
    {
      title: "Location",
      titleHindi: "स्थान",
      icon: MapPin,
      href: "#contact",
      color: "from-[#FF6B00] to-[#FFD700]",
    },
    // {
    //   title: "Call Now",
    //   titleHindi: "फोन करें",
    //   icon: Phone,
    //   href: "tel:+917925501234",
    //   color: "from-[#FF6B00] to-[#FFD700]",
    //   external: true,
    // },
    // {
    //   title: "Email",
    //   titleHindi: "ईमेल",
    //   icon: Mail,
    //   href: "mailto:info@tripurasundari.org",
    //   color: "from-[#FF6B00] to-[#B30000]",
    //   external: true,
    // },
    // {
    //   title: "Matrimonial",
    //   titleHindi: "विवाह",
    //   icon: Heart,
    //   href: "https://matrimony.shreetripurasundari.com/",
    //   color: "from-[#FF6B00] to-[#B30000]",
    //   external: true,
    //   highlighted: true, // Add highlight flag
    // },
    // {
    //   title: "Shop",
    //   titleHindi: "दुकान",
    //   icon: ShoppingCart,
    //   href: "#services",
    //   color: "from-[#B30000] to-[#FFD700]",
    // },
    // {
    //   title: "Photos",
    //   titleHindi: "तस्वीरें",
    //   icon: ImageIcon,
    //   href: "#events",
    //   color: "from-[#FFD700] to-[#B30000]",
    // },
  ]

  const handleLinkClick = (href: string, external?: boolean, action?: string) => {
    if (external) {
      if (href.startsWith("tel:") || href.startsWith("mailto:")) {
        window.location.href = href
      } else {
        window.open(href, "_blank", "noopener,noreferrer")
      }
      return
    }

    const element = document.querySelector(href)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-6 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
      <div className="container mx-auto px-3">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <Sparkles className="text-[#B30000] mr-2" size={20} />
            <h2 className="text-xl md:text-2xl font-bold text-[#B30000]">Quick Access</h2>
            <Sparkles className="text-[#B30000] ml-2" size={20} />
          </div>
          <p className="text-[#FF6B00] text-sm font-medium">झटपट पहुँच</p>
        </div>

        {/* Compact Grid - Mobile First */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 md:gap-3 mb-6">
          {quickLinks.map((link, index) => {
            const IconComponent = link.icon
            return (
              <Card
                key={index}
                className={`group cursor-pointer border hover:shadow-md transition-all duration-200 bg-white overflow-hidden touch-manipulation relative ${link.highlighted
                    ? "border-2 border-[#FF6B00] ring-2 ring-[#FFD700]/50 shadow-lg animate-pulse"
                    : "border border-[#FF6B00]/30 hover:border-[#FF6B00]"
                  }`}
                onClick={() => handleLinkClick(link.href, link.external, link.action)}
              >
                <CardContent className="p-2 text-center">
                  {/* Compact Icon */}
                  <div className="mb-1">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${link.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-200 ${link.highlighted ? "shadow-lg animate-bounce" : ""
                        }`}
                    >
                      <IconComponent className="text-white" size={14} />
                    </div>
                  </div>

                  {/* Compact Text */}
                  <div className="space-y-0">
                    <h4
                      className={`font-bold text-xs leading-tight ${link.highlighted ? "text-[#FF6B00] animate-pulse" : "text-[#B30000]"
                        }`}
                    >
                      {link.title}
                    </h4>
                    <p className="text-[#FF6B00] text-xs font-medium leading-tight">{link.titleHindi}</p>
                  </div>

                  {/* External indicator */}
                  {link.external && (
                    <div className="text-xs text-[#FF6B00] mt-1">{link.href.startsWith("http") ? "↗" : "📞"}</div>
                  )}

                  {/* Highlight badge for matrimonial */}
                  {link.highlighted && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD700] rounded-full border border-white animate-ping"></div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>


      </div>
    </section>
  )
}
