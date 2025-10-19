"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Users, Heart, Building2, ExternalLink, Star, Clock } from "lucide-react"
import UnderDevelopmentModal from "./under-development-modal"

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUnderDevelopment = () => {
    setIsModalOpen(true)
  }

  const handleMatrimonialClick = () => {
    window.open("https://matrimony.shreetripurasundari.com/", "_blank", "noopener,noreferrer")
  }

  const services = [
    {
      title: "Mandir Shop",
      description: "Sacred Items, Prasad & Spiritual Accessories",
      icon: ShoppingCart,
      color: "from-[#FF6B00] to-[#B30000]",
      features: ["Sacred Prasad", "Pooja Items", "Spiritual Accessories", "Religious Books"],
      action: handleUnderDevelopment,
      buttonText: "Explore Now",
    },
    {
      title: "Panchal Samaj Portal",
      description: "14 Chokhra Unity Platform",
      icon: Users,
      color: "from-[#B30000] to-[#FF6B00]",
      features: ["Community Events", "Cultural Programs", "Member Directory", "Social Welfare"],
      action: handleUnderDevelopment,
      buttonText: "Explore Now",
    },
    {
      title: "Matrimonial Platform",
      description: "Find Your Perfect Life Partner",
      icon: Heart,
      color: "from-[#FFD700] to-[#FF6B00]",
      features: ["Verified Profiles", "Advanced Search", "Privacy Protection", "Family Matching"],
      action: handleMatrimonialClick,
      buttonText: "Visit Matrimonial Portal",
    },
    {
      title: "Business Directory",
      description: "Connect with Community Businesses",
      icon: Building2,
      color: "from-[#FF6B00] to-[#FFD700]",
      features: ["Local Businesses", "Service Providers", "Professional Network", "Trade Opportunities"],
      action: handleUnderDevelopment,
      buttonText: "Explore Now",
    },
  ]

  return (
    <>
      <section id="services" className="py-8 md:py-16 bg-[#FDF0D5] px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="text-[#B30000] mr-3" size={32} />
              <h2 className="text-2xl md:text-4xl font-bold text-[#B30000]">Our Services</h2>
            </div>
            <p className="text-[#FF6B00] text-base md:text-lg">Comprehensive Digital Platform for Our Community</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={index}
                  className="border-[#FF6B00] hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <CardHeader
                    className={`bg-gradient-to-br ${service.color} text-white text-center rounded-t-lg p-4 md:p-6`}
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={24} className="text-white md:w-8 md:h-8" />
                    </div>
                    <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <p className="text-gray-700 mb-4 text-center text-sm md:text-base">{service.description}</p>

                    <div className="space-y-2 mb-4 md:mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-xs md:text-sm text-gray-600">
                          <div className="w-2 h-2 bg-[#FF6B00] rounded-full mr-3 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={service.action}
                      className="w-full bg-[#B30000] hover:bg-[#B30000]/90 text-white font-bold text-sm md:text-base py-2 md:py-3 min-h-[44px]"
                    >
                      {service.title === "Matrimonial Platform" && <ExternalLink className="mr-2" size={16} />}
                      {service.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <div className="bg-[#FFF4E6] p-4 md:p-6 rounded-lg border-2 border-[#FFD700] inline-block">
              <div className="flex items-center justify-center mb-2">
                <Clock className="text-[#B30000] mr-2" size={20} />
                <h3 className="text-xl md:text-2xl font-bold text-[#B30000]">Coming Soon!</h3>
              </div>
              <p className="text-[#FF6B00] mb-4 text-sm md:text-base">More services will be available shortly</p>
              <Button
                variant="outline"
                className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white min-h-[44px]"
              >
                Stay Updated
              </Button>
            </div>
          </div>
        </div>
      </section>

      <UnderDevelopmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
