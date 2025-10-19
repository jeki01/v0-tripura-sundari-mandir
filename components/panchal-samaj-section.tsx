import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Hammer,
  GraduationCap,
  Heart,
  Handshake,
  Target,
  Crown,
  Building,
  Wrench,
  BookOpen,
  Shield,
  Star,
} from "lucide-react"

export default function PanchalSamajSection() {
  const characteristics = [
    {
      icon: Hammer,
      title: "पारंपरिक व्यवसाय",
      description: "लोहे, तांबे, पीतल आदि धातुओं से औजार बनाना, कृषि उपकरण तैयार करना, मशीनरी पार्ट्स और घरेलू वस्तुएं बनाना।",
    },
    {
      icon: Crown,
      title: "धार्मिक आस्था",
      description: "भगवान विश्वकर्मा, माता त्रिपुरा सुंदरी और अन्य हिन्दू देवी-देवताओं की पूजा।",
    },
    {
      icon: GraduationCap,
      title: "शिक्षा और कौशल",
      description: "आधुनिक समय में समाज ने शिक्षा, तकनीकी क्षेत्र, व्यवसाय और सरकारी सेवाओं में भी अग्रसरता दिखाई है।",
    },
    {
      icon: Heart,
      title: "संस्कृति और परंपरा",
      description: "विवाह, त्योहार और पारिवारिक आयोजन पारंपरिक रीति-रिवाजों से संपन्न किए जाते हैं।",
    },
    {
      icon: Handshake,
      title: "सामाजिक संगठन",
      description: "पंचायत, समाज मंडल, और ट्रस्ट के माध्यम से एकजुटता और सामाजिक सेवा।",
    },
  ]

  const objectives = [
    "समाज के युवाओं को शिक्षित और आत्मनिर्भर बनाना।",
    "पारंपरिक शिल्प और कार्यशैली को आधुनिक तकनीक से जोड़ना।",
    "सामाजिक एकता और सहयोग की भावना को बनाए रखना।",
    "महिला सशक्तिकरण और कौशल विकास को प्रोत्साहन देना।",
  ]

  const chokhra = [
    "लोहारिया",
    "चौरासी",
    "बाँसवाड़ा",
    "तरपोत",
    "खमेरा",
    "पारसोला",
    "पथोक",
    "डूँगरपुर",
    "बोरी",
    "बेताली",
    "मैयोड़",
    "खड़ग",
    "परतापुर",
    "सागवाड़ा",
  ]

  return (
    <section id="panchal-samaj" className="py-16 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000]">पंचाल समाज का परिचय</h2>
          </div>
          <p className="text-[#FF6B00] text-lg max-w-3xl mx-auto">
            भारत की पारंपरिक लुहार जाति की एक विशिष्ट उपजाति - भगवान विश्वकर्मा के अनुयायी
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Logo and Introduction */}
          <div className="lg:col-span-1">
            <Card className="border-4 border-[#FFD700] bg-gradient-to-b from-[#FFF4E6] to-[#FFD700]/10 h-full">
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <Image
                    src="/images/panchal-samaj-logo.png"
                    alt="Panchal Samaj 14 Chokhra Logo"
                    width={200}
                    height={200}
                    className="mx-auto rounded-full border-4 border-[#FF6B00] shadow-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <Crown className="text-[#FFD700] mr-2" size={20} />
                    <h3 className="text-xl font-bold text-[#B30000]">जय विश्वकर्मा</h3>
                  </div>
                  <div className="bg-[#FDF0D5] p-4 rounded-lg border border-[#FF6B00]">
                    <h4 className="font-bold text-[#B30000] mb-2">पंचाल समाज 14 चोखरा</h4>
                    <p className="text-sm text-gray-700">बांसवाड़ा, डूंगरपुर, प्रतापगढ़, उदयपुर</p>
                  </div>
                  <div className="text-center text-[#FF6B00] font-bold">कर्म को पूजा मानने की भावना</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Introduction Text */}
          <div className="lg:col-span-2">
            <Card className="border-[#FF6B00] border-2 h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-[#FF6B00] mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-[#B30000]">समाज का परिचय</h3>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    पंचाल समाज, भारत की पारंपरिक लुहार जाति की एक विशिष्ट उपजाति है, जो मुख्यतः राजस्थान, गुजरात, मध्यप्रदेश और देश के
                    अन्य हिस्सों में निवास करती है। यह समाज भगवान विश्वकर्मा को अपना आदिगुरु एवं आराध्य मानता है, जो शिल्प, वास्तु और
                    निर्माण कार्यों के देवता हैं।
                  </p>
                  <p>
                    पारंपरिक रूप से पंचाल समाज धातु कार्य, लोहे व तांबे की वस्तुएं बनाने, औजार निर्माण, भवन निर्माण, शिल्पकला और मूर्तिकला
                    जैसे व्यवसायों में निपुण रहा है। यह समाज 'कर्म को पूजा मानने' की भावना के साथ अपने परिश्रम और हुनर से समाज और राष्ट्र
                    की सेवा करता रहा है।
                  </p>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="bg-[#FFF4E6] p-4 rounded-lg border-l-4 border-[#FF6B00]">
                    <div className="flex items-center mb-2">
                      <Wrench className="text-[#FF6B00] mr-2" size={16} />
                      <h5 className="font-bold text-[#B30000]">मुख्य कौशल</h5>
                    </div>
                    <p className="text-sm text-gray-700">धातु कार्य, औजार निर्माण, शिल्पकला</p>
                  </div>
                  <div className="bg-[#FFF4E6] p-4 rounded-lg border-l-4 border-[#FF6B00]">
                    <div className="flex items-center mb-2">
                      <Building className="text-[#FF6B00] mr-2" size={16} />
                      <h5 className="font-bold text-[#B30000]">मुख्य क्षेत्र</h5>
                    </div>
                    <p className="text-sm text-gray-700">राजस्थान, गुजरात, मध्यप्रदेश</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Characteristics */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <Star className="text-[#B30000] mr-3" size={24} />
            <h3 className="text-3xl font-bold text-[#B30000]">पंचाल समाज की पहचान और विशेषताएँ</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characteristics.map((item, index) => {
              const IconComponent = item.icon
              return (
                <Card key={index} className="border-[#FF6B00] hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B00] to-[#B30000] rounded-full flex items-center justify-center mr-3">
                        <IconComponent size={20} className="text-white" />
                      </div>
                      <h4 className="font-bold text-[#B30000] text-lg">{item.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Objectives */}
        <div className="mb-12">
          <Card className="border-[#FFD700] border-3 bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
            <CardHeader className="bg-[#FFD700] text-[#B30000] text-center">
              <div className="flex items-center justify-center">
                <Target className="mr-2" size={24} />
                <CardTitle className="text-2xl">पंचाल समाज का उद्देश्य</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 bg-white p-4 rounded-lg border border-[#FF6B00]"
                  >
                    <div className="w-6 h-6 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 14 Chokhra */}
        <div>
          <Card className="border-[#B30000] border-3">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
              <div className="flex items-center justify-center">
                <Shield className="mr-2" size={24} />
                <CardTitle className="text-2xl">पंचाल समाज के 14 चोखरा</CardTitle>
              </div>
              <p className="text-[#FFD700] mt-2">राजस्थान के बांसवाड़ा, डूंगरपुर, उदयपुर, प्रतापगढ़ और समीपवर्ती क्षेत्रों में फैले हुए</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                {chokhra.map((name, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-[#FF6B00] text-[#B30000] hover:bg-[#FF6B00] hover:text-white transition-colors p-3 text-center justify-center font-medium"
                  >
                    {name}
                  </Badge>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  प्रत्येक चोखरा की अपनी सांस्कृतिक और सामाजिक पहचान है, परंतु ये सभी पंचाल समाज की समृद्ध विरासत का हिस्सा हैं।
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
