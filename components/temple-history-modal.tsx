"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Crown, Building, Calendar, Hammer, Star, MapPin } from "lucide-react"
import Image from "next/image"

interface TempleHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TempleHistoryModal({ isOpen, onClose }: TempleHistoryModalProps) {
  const [activeSection, setActiveSection] = useState("structure")

  if (!isOpen) return null

  const sections = [
    { id: "structure", title: "मंदिर की संरचना", icon: Building },
    { id: "forms", title: "तीन स्वरूप", icon: Crown },
    { id: "philosophy", title: "तात्त्विक स्वरूप", icon: Star },
    { id: "establishment", title: "स्थापना का इतिहास", icon: Calendar },
    { id: "reconstruction", title: "पुनर्निर्माण", icon: Hammer },
    { id: "development", title: "आधुनिक विकास", icon: MapPin },
  ]

  const developmentFeatures = [
    "सुंदर बाग-बगीचे",
    "फव्वारे",
    "अतिथि गृह",
    "कैण्टीन",
    "सुलभ शौचालय",
    "पार्किंग",
    "पुलिस चौकी",
    "आठ दुकानें",
    "तालवाड़ा से मंदिर तक दो लेन सड़क",
    "सड़क पर लाइट्स",
    "वृक्षारोपण",
    "बोटैनिकल गार्डन",
    "सनसेट प्वाइंट",
    "हेलीपैड",
    "भव्य तोरण द्वार",
    "गरबा चौक",
    "जल कुंड",
    "सुंदर परकोटा (बाउंड्री वॉल)",
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "structure":
        return (
          <div className="space-y-6">
            <div className="bg-[#FFF4E6] p-6 rounded-lg border-l-4 border-[#FF6B00]">
              <h4 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                <Crown className="mr-2" size={20} />
                माँ त्रिपुरा सुंदरी की मूर्ति
              </h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  • <strong>सिंहवाहिनी मूर्ति:</strong> अठारह भुजाओं वाली विशाल प्रतिमा
                </p>
                <p>
                  • <strong>ऊंचाई:</strong> लगभग 5 फीट ऊँची
                </p>
                <p>
                  • <strong>अस्त्र-शस्त्र:</strong> विभिन्न प्रकार के दिव्य आयुध धारण
                </p>
                <p>
                  • <strong>नौ दुर्गा:</strong> मंदिर की पीछे की दीवार पर शीतकालीन मूर्तियाँ
                </p>
                <p>
                  • <strong>श्री यंत्र:</strong> देवी के पवित्र चरणों के पास स्थापित
                </p>
              </div>
            </div>
          </div>
        )

      case "forms":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">प्रातः</span>
                  </div>
                  <h4 className="font-bold text-orange-700 mb-2">कुमारी कन्या</h4>
                  <p className="text-sm text-orange-600">सुबह के समय</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">दोपहर</span>
                  </div>
                  <h4 className="font-bold text-pink-700 mb-2">युवा सुंदरी</h4>
                  <p className="text-sm text-pink-600">दिन के समय</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardContent className="p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">सायं</span>
                  </div>
                  <h4 className="font-bold text-purple-700 mb-2">पूर्ण विकसित</h4>
                  <p className="text-sm text-purple-600">शाम के समय</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-[#FDF0D5] p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                देवी त्रिपुरा सुंदरी की तीन स्वरूपों में दर्शन होते हैं – प्रातः काल कुमारी कन्या के रूप में, दोपहर में एक युवा सुंदरी के रूप में, और
                सायंकाल में पूर्ण विकसित स्त्री के रूप में। इसी कारण इन्हें 'त्रिपुरा सुंदरी' कहा जाता है। माँ के इस दिव्य रूप को देखकर श्रद्धालु
                घंटों तक ध्यानमग्न हो जाते हैं।
              </p>
            </div>
          </div>
        )

      case "philosophy":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-[#FF6B00]">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-[#B30000] mb-3">शारीरिक (भौतिक) रूप</h4>
                  <p className="text-gray-700 text-sm">मूर्ति के रूप में दर्शन और पूजा-अर्चना</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-[#B30000]">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-[#B30000] mb-3">आध्यात्मिक रूप</h4>
                  <p className="text-gray-700 text-sm">ध्यान और आंतरिक साधना के माध्यम से</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-[#FFF4E6] p-6 rounded-lg border border-[#FFD700]">
              <p className="text-gray-700 leading-relaxed">
                ज्ञानीजन माँ त्रिपुरा को दो रूपों में मानते हैं – शारीरिक (भौतिक) और आध्यात्मिक। दोनों रूपों के उपासक और भक्त विद्यमान हैं।
              </p>
            </div>
          </div>
        )

      case "establishment":
        return (
          <div className="space-y-6">
            <div className="bg-[#FFF4E6] p-6 rounded-lg border-l-4 border-[#B30000]">
              <h4 className="text-xl font-bold text-[#B30000] mb-4">प्राचीन इतिहास</h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  • <strong>विक्रम संवत 1540:</strong> शिलालेख से प्राप्त साक्ष्य
                </p>
                <p>
                  • <strong>काल:</strong> सम्राट कनिष्क के काल से भी पहले का अनुमान
                </p>
                <p>
                  • <strong>प्राचीन नगर:</strong> "गोडपोली" के तीन भाग - सीतापुरी, शिवपुरी, विष्णुपुरी
                </p>
                <p>
                  • <strong>नाम की उत्पत्ति:</strong> तीनों पुरी के बीच स्थित होने से 'त्रिपुरा'
                </p>
                <p>
                  • <strong>शिलालेख:</strong> 'त्रियमारी' शब्द का उल्लेख
                </p>
              </div>
            </div>
            <div className="bg-[#FDF0D5] p-6 rounded-lg">
              <h4 className="text-lg font-bold text-[#B30000] mb-3">राजकीय संरक्षण</h4>
              <p className="text-gray-700">
                राज्यकाल में बांसवाड़ा, डूंगरपुर, गुजरात, मालवा और मारवाड़ के राजाओं द्वारा माँ त्रिपुरा सुंदरी की पूजा की जाती थी।
              </p>
            </div>
          </div>
        )

      case "reconstruction":
        return (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h4 className="text-lg font-bold text-red-700 mb-3">विनाश और संरक्षण</h4>
              <p className="text-gray-700 mb-3">
                मुस्लिम आक्रमणकारी जैसे मोहम्मद गजनवी या अलाउद्दीन खिलजी ने इस क्षेत्र के मंदिरों को नष्ट कर दिया था, परंतु भक्तों ने माँ की
                मूर्तियों की रक्षा की।
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#FFF4E6] p-4 rounded-lg border border-[#FF6B00]">
                <h5 className="font-bold text-[#B30000] mb-2">पुनर्निर्माण के चरण:</h5>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    • <strong>प्राचीन काल:</strong> चांदा भाई एवं पाता भाई पंचाल (पंचाल समाज लोहार) का मार्गदर्शन
                  </p>
                  <p>
                    • <strong>1157 ई.:</strong> पंचाल समाज चोखला द्वारा पहला शिखर स्थापना
                  </p>
                  <p>
                    • <strong>1930 ई.:</strong> दूसरा शिखर स्थापित
                  </p>
                  <p>
                    • <strong>1977 ई.:</strong> मुख्यमंत्री हरिदेव जोशी की प्रेरणा से बड़े स्तर पर जीर्णोद्धार
                  </p>
                </div>
              </div>

              <div className="bg-[#FFD700]/20 p-4 rounded-lg border border-[#FFD700]">
                <h5 className="font-bold text-[#B30000] mb-2">ट्रस्ट पंजीकरण:</h5>
                <p className="text-sm text-gray-700">
                  राजस्थान सार्वजनिक ट्रस्ट अधिनियम 1959 के अंतर्गत 23.12.1978 को पंजीकृत। ट्रस्ट नाम: "मंदिर श्री त्रिपुरा सुंदरी
                  14-चोखला पंचाल समाज"
                </p>
              </div>
            </div>
          </div>
        )

      case "development":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {developmentFeatures.map((feature, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-[#FF6B00] text-[#B30000] p-2 text-center justify-center text-xs"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="bg-[#FDF0D5] p-6 rounded-lg">
              <h4 className="text-lg font-bold text-[#B30000] mb-3">मंदिर परिसर</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p>
                    • <strong>क्षेत्रफल:</strong> 15 बीघा भूमि
                  </p>
                  <p>
                    • <strong>प्रवेश द्वार:</strong> हनुमान मंदिर
                  </p>
                  <p>
                    • <strong>पीछे:</strong> नीलकंठ महादेव मंदिर (2004 में पुनःस्थापित)
                  </p>
                </div>
                <div>
                  <p>
                    • <strong>5 अप्रैल 2006:</strong> स्वर्ण कीर्ति स्तंभ स्थापना
                  </p>
                  <p>
                    • <strong>यज्ञ:</strong> सहस्त्र चंडी, शतचंडी, 109 कुंडी महायज्ञ (1981)
                  </p>
                  <p>
                    • <strong>8 मई 1992:</strong> पुनः शिखर स्थापना
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-4 border-[#FF6B00]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/images/main-logo.png"
                alt="Temple Logo"
                width={50}
                height={50}
                className="rounded-full border-2 border-[#FFD700] mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold">त्रिपुरा सुंदरी मंदिर का इतिहास</h2>
                <p className="text-[#FFD700]">Sacred History & Heritage</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-[#FFD700] transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-[#FDF0D5] border-r border-[#FF6B00]/30 p-4 overflow-y-auto">
            <h3 className="font-bold text-[#B30000] mb-4">विषय सूची</h3>
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center ${
                      activeSection === section.id
                        ? "bg-[#FF6B00] text-white shadow-md"
                        : "text-[#B30000] hover:bg-[#FFF4E6]"
                    }`}
                  >
                    <IconComponent size={16} className="mr-2" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
