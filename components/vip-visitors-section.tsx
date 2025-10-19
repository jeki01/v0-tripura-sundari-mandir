"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, ChevronRight, Star, Users, ChevronLeft, Camera } from "lucide-react"
import VipVisitorsFullPage from "./vip-visitors-full-page"

export default function VipVisitorsSection() {
  const [showFullPage, setShowFullPage] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // Just show top 3 VIP visitors for preview
  const topVisitors = [
    "H'ble President Smt. Pratibha Patil",
    "Former Vice President Shri Bhairao Singh Shekhawat",
    "Chief Justice Shri Rangnath Mishra",
  ]

  // VIP visitor images
  const vipImages = [
    {
      src: "/images/vip-visitors/sm_5.jpg",
      alt: "VIP Visit - Formal Ceremony",
      caption: "Distinguished guests at temple ceremony",
    },
    {
      src: "/images/vip-visitors/sm_1.jpg",
      alt: "Certificate Presentation Ceremony",
      caption: "Official recognition ceremony",
    },
    {
      src: "/images/vip-visitors/sm_7.jpg",
      alt: "Spiritual Leaders Gathering",
      caption: "Saints and spiritual leaders visit",
    },
    {
      src: "/images/vip-visitors/sm_8.jpg",
      alt: "Traditional Leaders Meeting",
      caption: "Meeting with traditional leaders",
    },
    {
      src: "/images/vip-visitors/sm_6.jpg",
      alt: "Award Ceremony",
      caption: "Honor and recognition ceremony",
    },
    {
      src: "/images/vip-visitors/sm_4.jpg",
      alt: "High Profile Visit",
      caption: "Distinguished visitor reception",
    },
    {
      src: "/images/vip-visitors/sm_3.jpg",
      alt: "VIP Reception",
      caption: "Formal reception of dignitaries",
    },
    {
      src: "/images/vip-visitors/sm_12.jpg",
      alt: "Large Gathering",
      caption: "Community gathering with VIPs",
    },
    {
      src: "/images/vip-visitors/sm_11.jpg",
      alt: "Public Address",
      caption: "Address to devotees and community",
    },
  ]

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % vipImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + vipImages.length) % vipImages.length)
  }

  if (showFullPage) {
    return <VipVisitorsFullPage onClose={() => setShowFullPage(false)} />
  }

  return (
    <section id="vip-visitors" className="py-8 bg-[#FDF0D5]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Compact VIP Visitors Preview */}
          <Card className="border-4 border-[#FFD700] shadow-xl bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
            <CardHeader className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] text-center py-4">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Crown className="mr-2" size={24} />
                Distinguished Visitors
              </CardTitle>
              <p className="text-[#B30000]/80 mt-1">Eminent Personalities Who Blessed Our Temple</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left: Image Gallery */}
                <div>
                  <div className="relative mb-4">
                    <div className="relative overflow-hidden rounded-xl border-4 border-[#B30000] shadow-lg">
                      <Image
                        src={vipImages[selectedImage].src || "/placeholder.svg"}
                        alt={vipImages[selectedImage].alt}
                        width={500}
                        height={300}
                        className="w-full h-64 object-cover"
                      />

                      {/* Image Caption */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-bold text-sm mb-1">{vipImages[selectedImage].caption}</h3>
                        <p className="text-[#FFD700] text-xs">Historical moment at temple</p>
                      </div>

                      {/* Image Counter */}
                      <div className="absolute top-3 right-3 bg-[#FFD700] text-[#B30000] px-2 py-1 rounded-full font-bold text-xs">
                        {selectedImage + 1} / {vipImages.length}
                      </div>

                      {/* Navigation Arrows */}
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
                        aria-label="Next image"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex justify-center space-x-2 mt-3">
                      {vipImages.slice(0, 5).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            selectedImage === index ? "bg-[#FF6B00] scale-125" : "bg-gray-300 hover:bg-[#FF6B00]/50"
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Info and Stats */}
                <div>
                  <h3 className="text-lg font-bold text-[#B30000] mb-4 flex items-center">
                    <Star className="mr-2 text-[#FFD700]" size={18} />
                    Notable VIP Visits Include:
                  </h3>
                  <div className="space-y-2 mb-6">
                    {topVisitors.map((visitor, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-[#FF6B00] rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{visitor}</span>
                      </div>
                    ))}
                    <div className="flex items-center text-[#B30000] font-bold">
                      <div className="w-2 h-2 bg-[#B30000] rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm">+ 26 More Distinguished Guests</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-3 rounded-lg border-2 border-[#FF6B00] shadow-md text-center">
                      <div className="text-xl font-bold text-[#B30000]">29+</div>
                      <div className="text-xs text-gray-600">VIP Visitors</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-2 border-[#FFD700] shadow-md text-center">
                      <div className="text-xl font-bold text-[#FF6B00]">5+</div>
                      <div className="text-xs text-gray-600">Presidents/VPs</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-2 border-[#B30000] shadow-md text-center">
                      <div className="text-xl font-bold text-[#FFD700]">10+</div>
                      <div className="text-xs text-gray-600">Chief Ministers</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border-2 border-[#FF6B00] shadow-md text-center">
                      <div className="text-xl font-bold text-[#B30000]">8+</div>
                      <div className="text-xs text-gray-600">Saints & Gurus</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <Button
                      onClick={() => setShowFullPage(true)}
                      size="lg"
                      className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#B30000] text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Users className="mr-2" size={18} />
                      View All 29+ Distinguished Visitors
                      <ChevronRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="mt-6 bg-gradient-to-r from-[#FFD700]/20 to-[#FF6B00]/20 p-4 rounded-lg border-2 border-[#FFD700] text-center">
                <div className="flex items-center justify-center mb-2">
                  <Camera className="text-[#B30000] mr-2" size={16} />
                  <p className="text-[#B30000] font-bold text-sm">
                    🏛️ Temple blessed by Presidents, Chief Ministers, Chief Justices, Saints & Distinguished Leaders
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <Badge className="bg-red-100 text-red-800 text-xs">Constitutional Posts</Badge>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Political Leaders</Badge>
                  <Badge className="bg-orange-100 text-orange-800 text-xs">Spiritual Leaders</Badge>
                  <Badge className="bg-purple-100 text-purple-800 text-xs">Judiciary</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
