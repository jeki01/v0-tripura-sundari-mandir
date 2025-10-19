"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, ChevronDown, ChevronUp, Sparkles, Calendar, Phone, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function ShringarTableSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedDay, setSelectedDay] = useState(0)

  const shringarSchedule = [
    {
      day: "सोमवार",
      dayEng: "Monday",
      color: "सफेद",
      colorEng: "White",
      image: "/images/shringar/somwar-monday.jpg",
      bgColor: "from-gray-100 to-white",
      borderColor: "border-gray-300",
      textColor: "text-gray-800",
      description: "शुद्धता और शांति का प्रतीक सफेद वस्त्र",
    },
    {
      day: "मंगलवार",
      dayEng: "Tuesday",
      color: "लाल",
      colorEng: "Red",
      image: "/images/shringar/mangalwar-tuesday.jpg",
      bgColor: "from-red-100 to-pink-100",
      borderColor: "border-red-300",
      textColor: "text-red-800",
      description: "शक्ति और साहस का प्रतीक लाल वस्त्र",
    },
    {
      day: "बुधवार",
      dayEng: "Wednesday",
      color: "हरा",
      colorEng: "Green",
      image: "/images/shringar/budhwar-wednesday.jpg",
      bgColor: "from-green-100 to-emerald-100",
      borderColor: "border-green-300",
      textColor: "text-green-800",
      description: "प्रकृति और समृद्धि का प्रतीक हरा वस्त्र",
    },
    {
      day: "गुरुवार",
      dayEng: "Thursday",
      color: "पीला",
      colorEng: "Yellow",
      image: "/images/shringar/guruwar-thursday.jpg",
      bgColor: "from-yellow-100 to-amber-100",
      borderColor: "border-yellow-300",
      textColor: "text-yellow-800",
      description: "ज्ञान और प्रकाश का प्रतीक पीला वस्त्र",
    },
    {
      day: "शुक्रवार",
      dayEng: "Friday",
      color: "नारंगी",
      colorEng: "Orange",
      image: "/images/shringar/shukrawar-friday.jpg",
      bgColor: "from-orange-100 to-amber-100",
      borderColor: "border-orange-300",
      textColor: "text-orange-800",
      description: "उत्साह और ऊर्जा का प्रतीक नारंगी वस्त्र",
    },
    {
      day: "शनिवार",
      dayEng: "Saturday",
      color: "आसमानी",
      colorEng: "Sky Blue",
      image: "/images/shringar/shanivar-saturday.jpg",
      bgColor: "from-blue-100 to-sky-100",
      borderColor: "border-blue-300",
      textColor: "text-blue-800",
      description: "शांति और विस्तार का प्रतीक आसमानी वस्त्र",
    },
    {
      day: "रविवार",
      dayEng: "Sunday",
      color: "स्वर्ण पंचरंगी",
      colorEng: "Golden Multi-color",
      image: "/images/shringar/ravivar-sunday.jpg",
      bgColor: "from-yellow-100 via-orange-100 to-red-100",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-800",
      description: "दिव्यता और वैभव का प्रतीक स्वर्ण पंचरंगी वस्त्र",
    },
  ]

  const getCurrentDay = () => {
    const today = new Date().getDay()
    return today === 0 ? 6 : today - 1 // Convert Sunday=0 to index 6, Monday=1 to index 0, etc.
  }

  const currentDayIndex = getCurrentDay()

  return (
    <section id="shringar-schedule" className="py-12 bg-[#FDF0D5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Crown className="text-[#B30000] mr-3" size={28} />
            <h2 className="text-3xl font-bold text-[#B30000]">माँ श्री त्रिपुरा के स्वरूप</h2>
          </div>
          <p className="text-[#FF6B00] text-lg">साप्ताहिक श्रृंगार रंग योजना</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Simple Schedule Table */}
          <Card className="border-4 border-[#FFD700] shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Calendar className="mr-2" size={24} />
                दैनिक श्रृंगार रंग सारणी
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FDF0D5]">
                    <tr>
                      <th className="text-center p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30 w-20">
                        क्रमांक
                      </th>
                      <th className="text-center p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">वार</th>
                      <th className="text-center p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">
                        पोशाक का रंग
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shringarSchedule.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#FFF4E6]"
                        } hover:bg-[#FDF0D5] transition-colors cursor-pointer ${
                          index === currentDayIndex ? "ring-2 ring-[#FF6B00] bg-[#FFD700]/20" : ""
                        }`}
                        onClick={() => {
                          setSelectedDay(index)
                          setIsExpanded(true)
                        }}
                      >
                        <td className="p-4 text-center font-bold text-[#B30000] border-b border-[#FF6B00]/20">
                          <div className="flex items-center justify-center">
                            {index + 1}
                            {index === currentDayIndex && (
                              <Badge className="ml-2 bg-[#FF6B00] text-white text-xs">आज</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-center font-bold text-[#B30000] border-b border-[#FF6B00]/20 text-lg">
                          {item.day}
                        </td>
                        <td className="p-4 text-center border-b border-[#FF6B00]/20">
                          <div className="flex items-center justify-center">
                            <div
                              className={`w-6 h-6 rounded-full mr-3 border-2 ${item.borderColor} bg-gradient-to-r ${item.bgColor}`}
                            ></div>
                            <span className="font-bold text-[#B30000] text-lg">{item.color}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Expand Button */}
          <div className="text-center mt-6">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              size="lg"
              className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#B30000] text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="mr-2" size={20} />
              {isExpanded ? "कम जानकारी देखें" : "दिव्य दर्शन और विस्तृत जानकारी देखें"}
              {isExpanded ? <ChevronUp className="ml-2" size={16} /> : <ChevronDown className="ml-2" size={16} />}
            </Button>
          </div>

          {/* Quick Info - Always Visible */}
          <div className="mt-6 bg-[#FFF4E6] p-6 rounded-lg border-2 border-[#FFD700]">
            <div className="text-center">
              <h3 className="font-bold text-[#B30000] mb-3 flex items-center justify-center">
                <Crown className="mr-2" size={20} />
                आज का श्रृंगार
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <span className="text-gray-700">आज:</span>
                <span className="font-bold text-[#B30000] text-lg">{shringarSchedule[currentDayIndex].day}</span>
                <div
                  className={`w-6 h-6 rounded-full border-2 ${shringarSchedule[currentDayIndex].borderColor} bg-gradient-to-r ${shringarSchedule[currentDayIndex].bgColor}`}
                ></div>
                <span className="font-bold text-[#FF6B00] text-lg">{shringarSchedule[currentDayIndex].color}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                आज माँ त्रिपुरा सुंदरी का श्रृंगार {shringarSchedule[currentDayIndex].color} रंग में है
              </p>
            </div>
          </div>

          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-8 space-y-8 animate-in slide-in-from-top duration-500">
              {/* Selected Day Display */}
              <Card className="border-4 border-[#B30000] shadow-2xl">
                <CardHeader className={`bg-gradient-to-r ${shringarSchedule[selectedDay].bgColor} text-center`}>
                  <CardTitle
                    className={`text-3xl ${shringarSchedule[selectedDay].textColor} flex items-center justify-center`}
                  >
                    <Crown className="mr-3" size={28} />
                    {shringarSchedule[selectedDay].day} का दिव्य श्रृंगार
                  </CardTitle>
                  <p className={`${shringarSchedule[selectedDay].textColor}/80 text-lg mt-2`}>
                    {shringarSchedule[selectedDay].description}
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-2xl border-4 border-[#FFD700] shadow-2xl">
                        <Image
                          src={shringarSchedule[selectedDay].image || "/placeholder.svg"}
                          alt={`माँ त्रिपुरा सुंदरी - ${shringarSchedule[selectedDay].day} श्रृंगार`}
                          width={500}
                          height={600}
                          className="w-full h-[500px] object-cover"
                        />
                        {/* Divine Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 via-transparent to-[#FF6B00]/10 opacity-70"></div>

                        {/* Day Badge */}
                        <div className="absolute top-4 left-4 bg-[#FFD700] text-[#B30000] px-4 py-2 rounded-full font-bold shadow-lg">
                          {shringarSchedule[selectedDay].day}
                        </div>

                        {/* Color Badge */}
                        <div className="absolute top-4 right-4 bg-[#B30000] text-[#FFD700] px-4 py-2 rounded-full font-bold shadow-lg">
                          {shringarSchedule[selectedDay].color}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div
                        className={`bg-gradient-to-r ${shringarSchedule[selectedDay].bgColor} p-6 rounded-lg border-2 ${shringarSchedule[selectedDay].borderColor}`}
                      >
                        <h3
                          className={`text-2xl font-bold ${shringarSchedule[selectedDay].textColor} mb-4 flex items-center`}
                        >
                          <Sparkles className="mr-2" size={20} />
                          श्रृंगार विवरण
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">दिन:</span>
                            <span className={`font-bold ${shringarSchedule[selectedDay].textColor}`}>
                              {shringarSchedule[selectedDay].day} ({shringarSchedule[selectedDay].dayEng})
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">वस्त्र रंग:</span>
                            <span className={`font-bold ${shringarSchedule[selectedDay].textColor}`}>
                              {shringarSchedule[selectedDay].color}
                            </span>
                          </div>
                          <div className="mt-4">
                            <p className="text-gray-700 leading-relaxed">{shringarSchedule[selectedDay].description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between">
                        <Button
                          onClick={() => setSelectedDay((selectedDay - 1 + 7) % 7)}
                          className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
                        >
                          ← पिछला दिन
                        </Button>
                        <Button
                          onClick={() => setSelectedDay((selectedDay + 1) % 7)}
                          className="bg-[#B30000] hover:bg-[#B30000]/90 text-white"
                        >
                          अगला दिन →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Notes */}
              <Card className="border-4 border-[#FFD700] shadow-2xl bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
                <CardHeader className="bg-[#FFD700] text-[#B30000] text-center">
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Calendar className="mr-2" size={24} />
                    विशेष सूचना
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-[#FDF0D5] p-6 rounded-lg border-2 border-[#FF6B00]">
                    <div className="flex items-start">
                      <div className="bg-[#FF6B00] text-white p-2 rounded-full mr-4 mt-1">
                        <Crown size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#B30000] mb-2">🔔 महत्वपूर्ण नोट:</h4>
                        <p className="text-gray-700 leading-relaxed">
                          <strong>नवरात्रि अष्टमी</strong> तथा <strong>कार्तिक पूर्णिमा</strong> के पावन अवसर पर माँ त्रिपुरा का
                          श्रृंगार केवल
                          <strong className="text-[#B30000]"> मंदिर ट्रस्ट द्वारा</strong> किया जाता है। इन विशेष दिनों में
                          व्यक्तिगत श्रृंगार बुकिंग उपलब्ध नहीं है।
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Section */}
              <Card className="border-4 border-[#B30000] shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
                  <CardTitle className="text-2xl flex items-center justify-center">
                    <Sparkles className="mr-2" size={24} />🌸 मंदिर श्रृंगार बुकिंग
                  </CardTitle>
                  <p className="text-[#FFD700] mt-2">Book Divine Decoration for Maa Tripura Sundari</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <Card className="border-2 border-[#FF6B00] bg-gradient-to-br from-[#FFF4E6] to-[#FDF0D5]">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                          <Phone className="mr-2" size={20} />📞 संपर्क करें:
                        </h3>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-[#FF6B00]">
                            <h4 className="font-bold text-[#B30000] mb-2">प्रबंधक:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Phone className="mr-2 text-[#FF6B00]" size={16} />
                                <span className="font-medium">+91 79 2550 1234</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="mr-2 text-[#FF6B00]" size={16} />
                                <span className="font-medium">+91 98765 43210</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-[#FF6B00]">
                            <div className="flex items-center">
                              <Mail className="mr-2 text-[#FF6B00]" size={16} />
                              <div>
                                <h4 className="font-bold text-[#B30000]">ईमेल:</h4>
                                <span className="text-gray-700">info@tripurasundarimandir.in</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Booking Button */}
                    <Card className="border-2 border-[#FFD700] bg-gradient-to-br from-[#FFD700]/10 to-[#FF6B00]/10">
                      <CardContent className="p-6 flex flex-col justify-center items-center text-center h-full">
                        <div className="mb-6">
                          <Crown className="text-[#FFD700] mx-auto mb-4" size={48} />
                          <h3 className="text-xl font-bold text-[#B30000] mb-2">ऑनलाइन बुकिंग</h3>
                          <p className="text-gray-700">माँ के श्रृंगार की बुकिंग के लिए यहाँ क्लिक करें</p>
                        </div>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#FFD700] text-[#B30000] font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          <ExternalLink className="mr-2" size={20} />🔗 यहाँ से बुक करें
                        </Button>
                        <p className="text-sm text-gray-600 mt-4">* बुकिंग की उपलब्धता के लिए पहले संपर्क करें</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
