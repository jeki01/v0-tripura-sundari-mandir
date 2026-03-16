"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, MapPin, Users, Eye, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function NoticePortalSection() {
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null)

  // Moving ticker notices
  const tickerNotices = [
    "🔔 सूचना: चैत्र नवरात्रि महोत्सव 19-26 मार्च 2026 को श्रद्धा और उत्साह के साथ आयोजित किया जाएगा। घट स्थापना 19 मार्च को दोपहर 12:15 बजे होगी।",
    "🔔 सूचना: पंचाल समाज 14 चोखरा परिचय सम्मेलन दिनांक 22 जून 2025, सुबह 9 बजे से मां त्रिपुरा सुंदरी मंदिर प्रांगण में आयोजित होगा।",
    "📢 महत्वपूर्ण: नवरात्रि महोत्सव 2025 के लिए पंजीकरण शुरू हो गया है। अधिक जानकारी के लिए संपर्क करें।",
    "🎉 शुभ समाचार: मंदिर में नई सुविधाओं का उद्घाटन 15 मार्च 2025 को होगा।",
  ]

  // Notice grid items
  const noticeItems = [
    {
      id: 0,
      image: "/placeholder.svg?height=300&width=400&text=चैत्र नवरात्रि महोत्सव",
      title: "चैत्र नवरात्रि महोत्सव 2026",
      subtitle: "19-26 मार्च 2026, श्रद्धा और उत्साह के साथ",
      date: "19 मार्च - 26 मार्च 2026",
      location: "श्री त्रिपुरासुन्दरी मंदिर, उमराई",
      type: "त्योहार",
    },
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=400&text=पंचाल समाज सम्मेलन",
      title: "पंचाल समाज 14 चोखरा परिचय सम्मेलन",
      subtitle: "22 जून 2025, मां त्रिपुरा सुंदरी मंदिर",
      date: "22 जून 2025",
      location: "मंदिर प्रांगण",
      type: "सम्मेलन",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=400&text=नवरात्रि महोत्सव",
      title: "नवरात्रि महोत्सव 2025",
      subtitle: "9 दिवसीय भव्य आयोजन",
      date: "अक्टूबर 2025",
      location: "मंदिर परिसर",
      type: "त्योहार",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=400&text=सांस्कृतिक कार्यक्रम",
      title: "सांस्कृतिक कार्यक्रम",
      subtitle: "पारंपरिक नृत्य एवं संगीत",
      date: "15 मार्च 2025",
      location: "सभागार",
      type: "कार्यक्रम",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=400&text=दान शिविर",
      title: "दान शिविर आयोजन",
      subtitle: "समाज सेवा कार्यक्रम",
      date: "30 अप्रैल 2025",
      location: "मुख्य हॉल",
      type: "सेवा",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=400&text=शिक्षा सेमिनार",
      title: "शिक्षा एवं रोजगार सेमिनार",
      subtitle: "युवाओं के लिए मार्गदर्शन",
      date: "10 मई 2025",
      location: "सभागार",
      type: "सेमिनार",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=400&text=स्वास्थ्य शिविर",
      title: "निःशुल्क स्वास्थ्य शिविर",
      subtitle: "चिकित्सा जांच एवं परामर्श",
      date: "25 मई 2025",
      location: "मंदिर प्रांगण",
      type: "स्वास्थ्य",
    },
    {
      id: 7,
      image: "/placeholder.svg?height=300&width=400&text=विवाह मिलन",
      title: "सामूहिक विवाह मिलन",
      subtitle: "पारंपरिक विवाह समारोह",
      date: "12 दिसंबर 2025",
      location: "मंदिर परिसर",
      type: "विवाह",
    },
    {
      id: 8,
      image: "/placeholder.svg?height=300&width=400&text=वार्षिक सभा",
      title: "वार्षिक आम सभा",
      subtitle: "समाज की वार्षिक बैठक",
      date: "31 दिसंबर 2025",
      location: "मुख्य सभागार",
      type: "सभा",
    },
  ]

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      सम्मेलन: "bg-blue-100 text-blue-800",
      त्योहार: "bg-orange-100 text-orange-800",
      कार्यक्रम: "bg-purple-100 text-purple-800",
      सेवा: "bg-green-100 text-green-800",
      सेमिनार: "bg-indigo-100 text-indigo-800",
      स्वास्थ्य: "bg-red-100 text-red-800",
      विवाह: "bg-pink-100 text-pink-800",
      सभा: "bg-gray-100 text-gray-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  return (
    <section id="notice-portal" className="py-12 md:py-16 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bell className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-3xl md:text-4xl font-bold text-[#B30000]">सूचना एवं प्रेस विज्ञप्ति</h2>
          </div>
          <p className="text-[#FF6B00] text-lg">महत्वपूर्ण सूचनाएं और आगामी कार्यक्रम</p>
        </div>

        {/* Moving Ticker Notice */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] rounded-2xl p-1 shadow-lg">
            <div className="bg-[#FFD700] rounded-xl p-4 overflow-hidden">
              <div className="flex items-center">
                <Bell className="text-[#B30000] mr-3 flex-shrink-0 animate-pulse" size={24} />
                <div className="overflow-hidden flex-1">
                  <div className="animate-marquee whitespace-nowrap">
                    <span className="text-[#B30000] font-bold text-lg">{tickerNotices.join(" • ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {noticeItems.map((notice, index) => (
            <Card
              key={notice.id}
              className="group cursor-pointer border-2 border-[#FF6B00]/20 hover:border-[#FF6B00] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
              onClick={() => setSelectedNotice(selectedNotice === notice.id ? null : notice.id)}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <Image
                  src={notice.image || "/placeholder.svg"}
                  alt={notice.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Type Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTypeColor(notice.type)}`}>
                    {notice.type}
                  </span>
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-center">
                      <Eye className="mr-2" size={16} />
                      <span className="text-sm font-medium">विस्तार से देखें</span>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-bold text-[#B30000] text-lg mb-2 line-clamp-2">{notice.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-1">{notice.subtitle}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="mr-2 text-[#FF6B00]" size={14} />
                    <span>{notice.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <MapPin className="mr-2 text-[#FF6B00]" size={14} />
                    <span>{notice.location}</span>
                  </div>
                </div>

                {/* Expanded Content */}
                {selectedNotice === notice.id && (
                  <div className="mt-4 pt-4 border-t border-[#FF6B00]/20 animate-in slide-in-from-top duration-300">
                    <div className="bg-[#FFF4E6] p-3 rounded-lg">
                      <h4 className="font-bold text-[#B30000] mb-2">कार्यक्रम विवरण:</h4>
                      {notice.id === 0 ? (
                        <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                          <p>माँ राजराजेश्वरी भगवती त्रिपुरासुन्दरी की कृपा से श्री त्रिपुरासुन्दरी मंदिर, उमराई में चैत्र नवरात्रि महोत्सव दिनांक 19 मार्च 2026 से 26 मार्च 2026 तक श्रद्धा और उत्साह के साथ आयोजित किया जाएगा।</p>
                          <div className="bg-white p-2 rounded border-l-4 border-[#B30000]">
                            <p className="font-semibold text-[#B30000] mb-1">मुख्य कार्यक्रम:</p>
                            <ul className="text-xs space-y-1 text-gray-700">
                              <li>• <strong>घट स्थापना:</strong> 19 मार्च 2026, दोपहर 12:15 से 1:15 बजे (अभिजीत मुहूर्त)</li>
                              <li>• <strong>दैनिक आरती:</strong> प्रातः 7:00 बजे एवं सायं 7:00 बजे</li>
                              <li>• <strong>अष्टमी हवन:</strong> 26 मार्च 2026, पूर्णाहुति सायं 5:30 बजे</li>
                            </ul>
                          </div>
                          <p className="text-[#B30000] font-semibold">आप सभी से निवेदन है कि पधारकर माँ के दर्शन कर धर्म लाभ प्राप्त करें।</p>
                        </div>
                      ) : (
                        <p>
                          यह एक महत्वपूर्ण कार्यक्रम है जो समाज के सभी सदस्यों के लिए आयोजित किया जा रहा है। सभी से निवेदन है कि समय पर
                          पधारें और कार्यक्रम को सफल बनाने में योगदान दें।
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-[#FF6B00] text-sm">
                          <Users className="mr-1" size={14} />
                          <span>सभी सदस्य आमंत्रित</span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                        >
                          <ExternalLink className="mr-1" size={12} />
                          विस्तार
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#B30000] text-white px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Bell className="mr-2" size={20} />
            सभी सूचनाएं देखें
          </Button>
        </div>
      </div>
    </section>
  )
}
