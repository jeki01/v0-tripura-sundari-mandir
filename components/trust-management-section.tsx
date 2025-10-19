import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Users, Shield, Phone, Mail, Building } from "lucide-react"

export default function TrustManagementSection() {
  const trustOfficials = [
    {
      name: "श्रीमान धूलजी भाई पंचाल",
      nameEng: "Shri Dhulji Bhai Panchal",
      position: "अध्यक्ष",
      positionEng: "President",
      image: "/images/trust/dhulji-bhai-adhyaksh.jpg",
      description: "पंचाल समाज 14 चोखरा के सम्मानित अध्यक्ष, मंदिर के विकास और संचालन में अग्रणी भूमिका निभाते हैं।",
      gradient: "from-[#B30000] to-[#FF6B00]",
    },
    {
      name: "श्रीमान नटवरलालजी पंचाल",
      nameEng: "Shri Natwarlal Ji Panchal",
      position: "महामंत्री",
      positionEng: "General Secretary",
      image: "/images/trust/natwarlal-ji-mahamantri.jpg",
      description: "मंदिर ट्रस्ट के महामंत्री, दैनिक प्रबंधन और समुदायिक कार्यों के संयोजक।",
      gradient: "from-[#FF6B00] to-[#FFD700]",
    },
  ]

  return (
    <section id="trust-management" className="py-16 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Shield className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000]">मंदिर ट्रस्ट प्रबंधन</h2>
          </div>
          <p className="text-[#FF6B00] text-xl">Temple Trust Management</p>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#FF6B00] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Trust Officials */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {trustOfficials.map((official, index) => (
              <Card
                key={index}
                className="border-4 border-[#FFD700] shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 bg-white overflow-hidden"
              >
                <CardHeader className={`bg-gradient-to-r ${official.gradient} text-white text-center py-6`}>
                  <div className="flex items-center justify-center mb-4">
                    <Crown className="mr-2" size={24} />
                    <CardTitle className="text-2xl">{official.position}</CardTitle>
                  </div>
                  <p className="text-[#FFD700] font-medium">{official.positionEng}</p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Official Photo - Square Frame */}
                    <div className="relative mb-6">
                      <div className="w-48 h-48 mx-auto relative overflow-hidden rounded-lg border-6 border-[#FFD700] shadow-2xl">
                        <Image
                          src={official.image || "/placeholder.svg"}
                          alt={`${official.name} - ${official.position}`}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 192px, 192px"
                        />
                      </div>
                      {/* Decorative Square Border */}
                      <div className="absolute inset-0 w-48 h-48 mx-auto border-4 border-[#FF6B00] rounded-lg opacity-30 animate-pulse"></div>
                    </div>

                    {/* Official Details */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#B30000] mb-2">{official.name}</h3>
                        <p className="text-[#FF6B00] font-medium text-lg">{official.nameEng}</p>
                      </div>

                      <div className="bg-[#FFF4E6] p-4 rounded-lg border-2 border-[#FFD700]">
                        <p className="text-gray-700 leading-relaxed">{official.description}</p>
                      </div>

                      {/* Position Badge */}
                      <div
                        className={`inline-block bg-gradient-to-r ${official.gradient} text-white px-6 py-2 rounded-full font-bold shadow-lg`}
                      >
                        {official.position} • {official.positionEng}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust Information */}
          <Card className="border-4 border-[#B30000] shadow-2xl bg-gradient-to-br from-[#FFF4E6] to-[#FDF0D5]">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
              <CardTitle className="text-3xl flex items-center justify-center">
                <Building className="mr-3" size={28} />
                मंदिर ट्रस्ट की जानकारी
              </CardTitle>
              <p className="text-[#FFD700] mt-2">Temple Trust Information</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Trust Details */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-[#FF6B00] shadow-lg">
                    <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                      <Shield className="mr-2" size={20} />
                      ट्रस्ट विवरण
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <div className="flex justify-between">
                        <span className="font-medium">ट्रस्ट नाम:</span>
                        <span className="text-[#B30000] font-bold text-sm">
                          मंदिर श्री त्रिपुरा सुंदरी 14-चोखला पंचाल समाज
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">पंजीकरण:</span>
                        <span className="text-[#FF6B00] font-bold">23.12.1978</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">अधिनियम:</span>
                        <span className="text-gray-600 text-sm">राजस्थान सार्वजनिक ट्रस्ट अधिनियम 1959</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">क्षेत्राधिकार:</span>
                        <span className="text-gray-600 text-sm">बांसवाड़ा और डूंगरपुर जिले</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-[#FFD700] shadow-lg">
                    <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                      <Users className="mr-2" size={20} />
                      समुदायिक सेवा
                    </h3>
                    <div className="space-y-2 text-gray-700 text-sm">
                      <p>• पंचाल समाज 14 चोखरा का प्रतिनिधित्व</p>
                      <p>• धार्मिक और सांस्कृतिक कार्यक्रमों का आयोजन</p>
                      <p>• समुदायिक कल्याण योजनाओं का संचालन</p>
                      <p>• मंदिर के दैनिक संचालन की देखरेख</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-[#FF6B00] shadow-lg">
                    <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                      <Phone className="mr-2" size={20} />
                      संपर्क सूत्र
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-[#FFF4E6] p-4 rounded-lg border border-[#FFD700]">
                        <h4 className="font-bold text-[#B30000] mb-2">मंदिर कार्यालय:</h4>
                        <div className="space-y-1 text-gray-700 text-sm">
                          <div className="flex items-center">
                            <Phone className="mr-2 text-[#FF6B00]" size={14} />
                            <span>+91 79 2550 1234</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="mr-2 text-[#FF6B00]" size={14} />
                            <span>info@tripurasundari.org</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#FFF4E6] p-4 rounded-lg border border-[#FFD700]">
                        <h4 className="font-bold text-[#B30000] mb-2">पंचाल समाज कार्यालय:</h4>
                        <div className="space-y-1 text-gray-700 text-sm">
                          <div className="flex items-center">
                            <Phone className="mr-2 text-[#FF6B00]" size={14} />
                            <span>+91 98765 43210</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="mr-2 text-[#FF6B00]" size={14} />
                            <span>contact@panchalsama14chokhra.org</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FF6B00]/20 p-6 rounded-lg border-2 border-[#FFD700]">
                    <h3 className="text-lg font-bold text-[#B30000] mb-3 text-center">सेवा का संकल्प</h3>
                    <p className="text-gray-700 text-center leading-relaxed text-sm">
                      "माँ त्रिपुरा सुंदरी की कृपा से हमारा ट्रस्ट निरंतर समुदाय की सेवा में समर्पित है। धर्म, संस्कृति और सामाजिक कल्याण के
                      माध्यम से हम सभी भक्तों की सेवा करते रहेंगे।"
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
