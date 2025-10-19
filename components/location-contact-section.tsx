import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, Car, Train, Plane, Bus } from "lucide-react"
import Link from "next/link"

export default function LocationContactSection() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 79 2550 1234", "+91 98765 43210"],
      color: "text-[#FF6B00]",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@tripurasundari.org", "contact@panchalsama14chokhra.org"],
      color: "text-[#B30000]",
    },
    {
      icon: Clock,
      title: "Temple Timings",
      details: ["Morning: 5:00 AM - 12:00 PM", "Evening: 4:00 PM - 9:00 PM"],
      color: "text-[#FFD700]",
    },
  ]

  const travelOptions = [
    {
      icon: Plane,
      title: "By Air",
      primary: "Udaipur Airport (UDR)",
      distance: "132 km",
      description: "Nearest and most convenient airport. Hire taxi or take bus from Udaipur to Banswara (4-5 hours).",
      alternatives: ["Indore Airport (166 km)", "Ahmedabad Airport (193 km)"],
      color: "from-blue-500 to-sky-500",
    },
    {
      icon: Train,
      title: "By Train",
      primary: "Ratlam Junction (MP)",
      distance: "80 km",
      description: "Major railway station well-connected to Delhi, Mumbai, Ahmedabad, and Jaipur.",
      alternatives: ["Udaipur Junction (132 km)", "Dungarpur (105 km)"],
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Bus,
      title: "By Road/Bus",
      primary: "Banswara Bus Stand",
      distance: "20 km to temple",
      description: "Well connected by RSRTC and private buses from major cities.",
      alternatives: ["From Udaipur: 4-5 hours", "From Ratlam: 2 hours", "From Ahmedabad: 4 hours"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Car,
      title: "By Personal Vehicle",
      primary: "Well-maintained roads",
      distance: "Scenic routes",
      description: "Pleasant journey with good road connectivity from all major cities.",
      alternatives: ["Udaipur: 132 km", "Ratlam: 80 km", "Ahmedabad: 193 km"],
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section id="contact" className="py-16 bg-[#FDF0D5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000]">How to Reach & Contact</h2>
          </div>
          <p className="text-[#FF6B00] text-lg">Complete Travel Guide to Sacred Shaktipeetha</p>
        </div>

        {/* Travel Guide Section */}
        <div className="mb-12">
          <Card className="border-4 border-[#FFD700] shadow-2xl bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
            <CardHeader className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] text-center">
              <CardTitle className="text-3xl flex items-center justify-center">
                <Navigation className="mr-3" size={28} />
                How to Reach Shree Tripura Sundari Temple
              </CardTitle>
              <p className="text-[#B30000]/80 mt-2">One of the 51 Sacred Shaktipeeths in Banswara, Rajasthan</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {travelOptions.map((option, index) => {
                  const IconComponent = option.icon
                  return (
                    <Card key={index} className="border-2 border-[#FF6B00] hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="text-center mb-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                          >
                            <IconComponent size={24} className="text-white" />
                          </div>
                          <h3 className="font-bold text-[#B30000] text-lg">{option.title}</h3>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-[#FFF4E6] p-3 rounded-lg">
                            <h4 className="font-bold text-[#B30000] text-sm">{option.primary}</h4>
                            <p className="text-[#FF6B00] text-sm font-medium">{option.distance}</p>
                          </div>

                          <p className="text-gray-700 text-sm leading-relaxed">{option.description}</p>

                          <div className="space-y-1">
                            <h5 className="font-bold text-[#B30000] text-xs">Alternatives:</h5>
                            {option.alternatives.map((alt, altIndex) => (
                              <p key={altIndex} className="text-gray-600 text-xs">
                                • {alt}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Additional Travel Information */}
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-[#B30000] bg-gradient-to-br from-[#FFF4E6] to-[#FDF0D5]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                      <MapPin className="mr-2" size={20} />
                      Complete Temple Address
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="font-bold text-[#B30000]">Shree Tripura Sundari Temple</p>
                      <p>Village Umrai, Near Talwara</p>
                      <p>District Banswara, Rajasthan – 327001</p>
                      <p className="text-[#FF6B00] font-medium mt-3">One of the 51 Sacred Shaktipeeths</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#FF6B00] bg-gradient-to-br from-[#FFF4E6] to-[#FDF0D5]">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                      <Clock className="mr-2" size={20} />
                      Visitor Information
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Open:</strong> Every day
                      </p>
                      <p>
                        <strong>Timings:</strong> 9:00 AM – 9:00 PM
                      </p>
                      <p>
                        <strong>Best time to visit:</strong> Navratri, Diwali, Sharad Poornima
                      </p>
                      <p>
                        <strong>Facilities:</strong> Parking, food stalls, local shops, resting areas
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Map Section */}
          <Card className="border-[#FF6B00] border-2 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <MapPin className="mr-2" size={24} />
                Temple Location
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.123456789!2d74.4421!3d23.5441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMaa%20Tripura%20Sundari%20Temple!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maa Tripura Sundari Temple Location"
                  className="w-full"
                />

                {/* Map Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-[#FF6B00]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#B30000]">Maa Tripura Sundari Temple</h4>
                      <p className="text-sm text-gray-600">Near Umrai Village, Banswara, Rajasthan</p>
                    </div>
                    <Link
                      href="https://g.co/kgs/ZEUPnyR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-[#FF6B00] hover:text-[#B30000] transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span className="text-sm font-medium">Open in Maps</span>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-[#FFD700] border-3 bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
              <CardHeader className="bg-[#FFD700] text-[#B30000] text-center">
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={`${info.color} mt-1`}>
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#B30000] mb-2">{info.title}</h4>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-700 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button asChild className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white h-auto py-4">
                <Link href="tel:+917925501234">
                  <Phone className="mr-2" size={16} />
                  Call Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#B30000] text-[#B30000] hover:bg-[#B30000] hover:text-white h-auto py-4"
              >
                <Link href="mailto:info@tripurasundari.org">
                  <Mail className="mr-2" size={16} />
                  Email Us
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Distance Chart */}
        <div className="mb-12">
          <Card className="border-4 border-[#B30000] shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Car className="mr-2" size={24} />
                Distance Chart from Major Cities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { city: "Udaipur", distance: "132 km", time: "4-5 hours" },
                  { city: "Ratlam", distance: "80 km", time: "2 hours" },
                  { city: "Ahmedabad", distance: "193 km", time: "4 hours" },
                  { city: "Indore", distance: "166 km", time: "3-4 hours" },
                  { city: "Dungarpur", distance: "105 km", time: "2.5 hours" },
                  { city: "Mount Abu", distance: "150 km", time: "3.5 hours" },
                ].map((route, index) => (
                  <div key={index} className="bg-[#FFF4E6] p-4 rounded-lg border border-[#FF6B00]">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#B30000]">{route.city}</span>
                      <div className="text-right">
                        <div className="text-[#FF6B00] font-medium text-sm">{route.distance}</div>
                        <div className="text-gray-600 text-xs">{route.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="border-[#B30000] border-2 bg-gradient-to-r from-[#FFF4E6] to-[#FDF0D5] inline-block">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="text-[#B30000] mr-2" size={24} />
                <h4 className="text-xl font-bold text-[#B30000]">Plan Your Sacred Journey</h4>
              </div>
              <p className="text-gray-700 leading-relaxed max-w-md mb-4">
                Experience divine blessings at one of India's 51 sacred Shaktipeeths. Well-connected by air, rail, and
                road from all major cities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#B30000] text-white"
                >
                  <Link href="https://g.co/kgs/ZEUPnyR" target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2" size={16} />
                    Get Directions
                    <ExternalLink className="ml-2" size={14} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                >
                  <Phone className="mr-2" size={16} />
                  Contact Temple
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
