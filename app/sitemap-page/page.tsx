"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Building,
  Calendar,
  Crown,
  Sparkles,
  MapPin,
  Video,
  Clock,
  Users,
  Heart,
  BookOpen,
  Bell,
  Shield,
  Phone,
  Camera,
  Mail,
  Globe,
  Home,
  ExternalLink,
  ArrowLeft,
  FileText,
  Star,
  Gift,
  UserCheck,
  Settings,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function SitemapPage() {
  const router = useRouter()

  const siteStructure = [
    {
      category: "🏠 Main Sections",
      categoryHindi: "मुख्य भाग",
      color: "from-[#B30000] to-[#FF6B00]",
      items: [
        {
          title: "Homepage",
          titleHindi: "मुख्य पृष्ठ",
          icon: Home,
          href: "/",
          description: "Main landing page with hero section and overview",
        },
        {
          title: "About Mandir",
          titleHindi: "मंदिर परिचय",
          icon: Building,
          href: "#about-mandir",
          description: "Temple introduction and significance",
        },
        {
          title: "Live Darshan",
          titleHindi: "लाइव दर्शन",
          icon: Video,
          href: "#darshan-live",
          description: "Live streaming of temple darshan",
        },
        {
          title: "Temple History",
          titleHindi: "मंदिर इतिहास",
          icon: BookOpen,
          href: "#temple-history",
          description: "Historical background and significance",
        },
      ],
    },
    {
      category: "🕐 Temple Services",
      categoryHindi: "मंदिर सेवाएं",
      color: "from-[#FF6B00] to-[#FFD700]",
      items: [
        {
          title: "Temple Timings",
          titleHindi: "मंदिर समय",
          icon: Clock,
          href: "#temple-timings",
          description: "Daily temple opening and closing times",
        },
        {
          title: "Shringar Schedule",
          titleHindi: "श्रृंगार समय",
          icon: Crown,
          href: "#shringar-schedule",
          description: "Daily Maa's shringar and aarti timings",
        },
        {
          title: "Shringar Table",
          titleHindi: "श्रृंगार तालिका",
          icon: Sparkles,
          href: "#shringar-table",
          description: "Weekly shringar schedule table",
        },
        {
          title: "Online Pujas",
          titleHindi: "ऑनलाइन पूजा",
          icon: Gift,
          href: "#pujas",
          description: "Book online pujas and donations",
        },
      ],
    },
    {
      category: "👥 Community & Organization",
      categoryHindi: "समुदाय और संगठन",
      color: "from-[#FFD700] to-[#FF6B00]",
      items: [
        {
          title: "Panchal Samaj",
          titleHindi: "पंचाल समाज",
          icon: Users,
          href: "#panchal-samaj",
          description: "Panchal Samaj 14 Chokhra community information",
        },
        {
          title: "Trust Management",
          titleHindi: "ट्रस्ट प्रबंधन",
          icon: Shield,
          href: "#trust-management",
          description: "Temple trust and management details",
        },
        {
          title: "Services",
          titleHindi: "सेवाएं",
          icon: Heart,
          href: "#services",
          description: "Community services and facilities",
        },
        {
          title: "Notice Portal",
          titleHindi: "सूचना पोर्टल",
          icon: Bell,
          href: "#notice-portal",
          description: "Important announcements and notices",
        },
      ],
    },
    {
      category: "📸 Gallery & Events",
      categoryHindi: "गैलरी और कार्यक्रम",
      color: "from-[#FF6B00] to-[#B30000]",
      items: [
        {
          title: "Events Gallery",
          titleHindi: "कार्यक्रम गैलरी",
          icon: Calendar,
          href: "#events",
          description: "Temple events and festival celebrations",
        },
        {
          title: "Photo Gallery",
          titleHindi: "फोटो गैलरी",
          icon: Camera,
          href: "#events",
          description: "Temple and event photographs",
        },
        {
          title: "VIP Visitors",
          titleHindi: "विशिष्ट अतिथि",
          icon: UserCheck,
          href: "#vip-visitors",
          description: "Distinguished visitors and dignitaries",
        },
      ],
    },
    {
      category: "📞 Contact & Location",
      categoryHindi: "संपर्क और स्थान",
      color: "from-[#B30000] to-[#FFD700]",
      items: [
        {
          title: "Contact Information",
          titleHindi: "संपर्क जानकारी",
          icon: Phone,
          href: "#contact",
          description: "Phone, email, and address details",
        },
        {
          title: "Location & Maps",
          titleHindi: "स्थान और मानचित्र",
          icon: MapPin,
          href: "#contact",
          description: "Temple location and Google Maps integration",
        },
        {
          title: "Email Contact",
          titleHindi: "ईमेल संपर्क",
          icon: Mail,
          href: "mailto:info@tripurasundari.org",
          description: "Direct email communication",
          external: true,
        },
      ],
    },
    {
      category: "🔗 External Services",
      categoryHindi: "बाहरी सेवाएं",
      color: "from-[#FFD700] to-[#B30000]",
      items: [
        {
          title: "Matrimonial Portal",
          titleHindi: "विवाह पोर्टल",
          icon: Heart,
          href: "https://matrimony.shreetripurasundari.com/",
          description: "Community matrimonial services",
          external: true,
        },
        {
          title: "Google Maps",
          titleHindi: "गूगल मैप्स",
          icon: MapPin,
          href: "https://g.co/kgs/ZEUPnyR",
          description: "Temple location on Google Maps",
          external: true,
        },
      ],
    },
    {
      category: "⚙️ Technical Resources",
      categoryHindi: "तकनीकी संसाधन",
      color: "from-[#B30000] to-[#FF6B00]",
      items: [
        {
          title: "XML Sitemap",
          titleHindi: "XML साइटमैप",
          icon: Globe,
          href: "/sitemap.xml",
          description: "Search engine sitemap",
          external: true,
        },
        {
          title: "Robots.txt",
          titleHindi: "रोबोट्स फाइल",
          icon: FileText,
          href: "/robots.txt",
          description: "Search engine crawling instructions",
          external: true,
        },
        {
          title: "Manifest",
          titleHindi: "मैनिफेस्ट",
          icon: Settings,
          href: "/manifest.json",
          description: "Progressive Web App manifest",
          external: true,
        },
      ],
    },
  ]

  const handleNavigation = (href: string, external?: boolean) => {
    if (external) {
      if (href.startsWith("mailto:")) {
        window.location.href = href
      } else {
        window.open(href, "_blank", "noopener,noreferrer")
      }
      return
    }

    if (href === "/") {
      router.push("/")
      return
    }

    // Navigate to homepage first, then scroll to section
    router.push("/")
    setTimeout(() => {
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
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#B30000]"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Website Sitemap</h1>
              <p className="text-[#FFD700] text-lg">वेबसाइट साइटमैप</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Site Statistics */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border-[#FF6B00]/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#B30000]">25+</div>
              <div className="text-sm text-[#FF6B00]">Total Sections</div>
            </CardContent>
          </Card>
          <Card className="text-center border-[#FF6B00]/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#B30000]">7</div>
              <div className="text-sm text-[#FF6B00]">Main Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center border-[#FF6B00]/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#B30000]">50+</div>
              <div className="text-sm text-[#FF6B00]">Images & Media</div>
            </CardContent>
          </Card>
          <Card className="text-center border-[#FF6B00]/30">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#B30000]">3</div>
              <div className="text-sm text-[#FF6B00]">External Services</div>
            </CardContent>
          </Card>
        </div>

        {/* Sitemap Sections */}
        <div className="space-y-8">
          {siteStructure.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-[#FF6B00]/30 shadow-lg">
              <CardHeader className={`bg-gradient-to-r ${section.color} text-white`}>
                <CardTitle className="text-xl md:text-2xl flex items-center justify-between">
                  <div>
                    <div>{section.category}</div>
                    <div className="text-[#FFD700] text-lg font-medium">{section.categoryHindi}</div>
                  </div>
                  <Star className="text-[#FFD700]" size={24} />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item, itemIndex) => {
                    const IconComponent = item.icon
                    return (
                      <Card
                        key={itemIndex}
                        className="group cursor-pointer border border-[#FF6B00]/30 hover:border-[#FF6B00] hover:shadow-md transition-all duration-200 bg-white"
                        onClick={() => handleNavigation(item.href, item.external)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-br ${section.color} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                            >
                              <IconComponent className="text-white" size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-bold text-[#B30000] text-sm leading-tight">{item.title}</h4>
                                {item.external && <ExternalLink className="text-[#FF6B00] flex-shrink-0" size={12} />}
                              </div>
                              <p className="text-[#FF6B00] text-xs font-medium mb-2 leading-tight">{item.titleHindi}</p>
                              <p className="text-gray-600 text-xs leading-tight">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <Card className="border-[#FFD700] bg-gradient-to-r from-[#FFF4E6] to-[#FFD700]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Crown className="text-[#FFD700] mr-2" size={24} />
                <h3 className="text-2xl font-bold text-[#B30000]">माँ त्रिपुरा सुंदरी की जय</h3>
                <Crown className="text-[#FFD700] ml-2" size={24} />
              </div>
              <p className="text-[#FF6B00] mb-4">
                Complete digital platform for Shree Tripura Sundari Mandir & Panchal Samaj
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#B30000] text-white"
                  onClick={() => router.push("/")}
                >
                  <Home className="mr-1" size={14} />
                  Return to Homepage
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                  onClick={() => handleNavigation("#darshan-live")}
                >
                  <Video className="mr-1" size={14} />
                  Live Darshan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
