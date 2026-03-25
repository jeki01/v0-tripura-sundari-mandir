import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Building, Calendar, Hammer, Star, MapPin, BookOpen, Users, Camera } from "lucide-react"

export default function TempleHistoryPage() {
     const divineImages = [
      {
        src: "/images/divine/ma-swarup-1.jpg",
        alt: "माँ त्रिपुरा सुंदरी का पूर्ण दिव्य स्वरूप - 18 भुजाओं सहित",
        caption: "माँ का पूर्ण दिव्य स्वरूप - 18 भुजाओं सहित",
      },
      {
        src: "/images/divine/ma-swarup-4.jpg",
        alt: "सुनहरे प्रभामंडल के साथ माँ का दिव्य रूप",
        caption: "सुनहरे प्रभामंडल के साथ दिव्य रूप",
      },
      {
        src: "/images/divine/ma-face-4.jpg",
        alt: "माँ के दिव्य मुखारविंद का निकट दर्शन",
        caption: "दिव्य मुखारविंद का निकट दर्शन",
      },
      {
        src: "/images/divine/ma-swarup-5.jpg",
        alt: "स्वर्ण आभूषणों से सुसज्जित माँ का मुख",
        caption: "स्वर्ण आभूषणों से सुसज्जित मुख",
      },
      {
        src: "/images/divine/ma-face-3.jpg",
        alt: "माँ के नेत्रों का दिव्य तेज",
        caption: "माँ के नेत्रों का दिव्य तेज",
      },
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

  const historicalImages = [
    {
      src: "/images/historical/sm_4.jpg",
      alt: "मंदिर का प्रवेश द्वार - प्रारंभिक काल",
      caption: "मंदिर का प्रवेश द्वार - प्रारंभिक काल",
    },
    {
      src: "/images/historical/sm_2.jpg",
      alt: "समुदायिक सभा - मंदिर परिसर",
      caption: "समुदायिक सभा - मंदिर परिसर",
    },
    {
      src: "/images/historical/book_cover_1.jpg",
      alt: "मंदिर निर्माण कार्य - सामुदायिक सहयोग",
      caption: "मंदिर निर्माण कार्य - सामुदायिक सहयोग",
    },
    {
      src: "/images/historical/sm_5.jpg",
      alt: "मंदिर नवीनीकरण काल",
      caption: "मंदिर नवीनीकरण काल",
    },
    {
      src: "/images/historical/big_3.jpg",
      alt: "ऐतिहासिक मंदिर - समुदायिक उत्सव",
      caption: "ऐतिहासिक मंदिर - समुदायिक उत्सव",
    },
  ]



  return (
    <section id="temple-history" className="py-16 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/images/main-logo.png"
              alt="Temple Logo"
              width={80}
              height={80}
              className="rounded-full border-4 border-[#FFD700] mr-4"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#B30000] mb-2">त्रिपुरा सुंदरी मंदिर का इतिहास</h1>
              <p className="text-[#FF6B00] text-xl">Sacred History & Divine Heritage</p>
            </div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#FF6B00] mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Historical Images Gallery Section */}
          <Card className="border-4 border-[#FFD700] shadow-2xl bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] p-6">
              <div className="flex items-center justify-center">
                <Camera className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">मंदिर का प्राचीन स्वरूप</h2>
              </div>
              <p className="text-center mt-2 text-[#B30000]/80">Historical Photographs of Temple Evolution</p>
            </div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {historicalImages.map((image, index) => (
                  <div key={index} className="group">
                    <div className="relative overflow-hidden rounded-xl border-4 border-[#B30000] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Vintage Photo Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60"></div>

                      {/* Photo Number Badge */}
                      <div className="absolute top-3 left-3 bg-[#FFD700] text-[#B30000] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>

                      {/* Vintage Photo Icon */}
                      <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full">
                        <Camera size={16} />
                      </div>
                    </div>

                    {/* Caption */}
                    <div className="mt-4 text-center">
                      <h3 className="font-bold text-[#B30000] text-sm mb-1">{image.caption}</h3>
                      <div className="w-16 h-0.5 bg-[#FF6B00] mx-auto rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Description */}
              <div className="mt-8 bg-[#FDF0D5] p-6 rounded-lg border-2 border-[#FF6B00]">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#B30000] mb-3 flex items-center justify-center">
                    <BookOpen className="mr-2" size={20} />
                    ऐतिहासिक तस्वीरों का महत्व
                  </h3>
                  <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    ये दुर्लभ तस्वीरें मंदिर के विकास की गाथा कहती हैं। इनमें पंचाल समाज के सदस्यों का अटूट समर्पण, मंदिर के विभिन्न निर्माण
                    चरण, और समुदायिक एकजुटता का प्रमाण मिलता है। प्रत्येक तस्वीर एक ऐतिहासिक क्षण को संजोए हुए है जो हमारी सांस्कृतिक
                    विरासत का अमूल्य हिस्सा है।
                  </p>
                </div>

                {/* Historical Timeline Indicators */}
                <div className="mt-6 flex justify-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600">प्रारंभिक काल</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600">निर्माण काल</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600">नवीनीकरण काल</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-1"></div>
                    <span className="text-gray-600">उत्सव काल</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Temple Structure Section with Divine Images */}
          <Card className="border-4 border-[#FF6B00] shadow-2xl">
            <div className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white p-6">
              <div className="flex items-center">
                <Building className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">माँ त्रिपुरा सुंदरी के मंदिर की संरचना</h2>
              </div>
            </div>
            <CardContent className="p-8">
              {/* Divine Images Gallery */}
              <div className="mb-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#B30000] mb-2 flex items-center justify-center">
                    <Crown className="mr-2" size={24} />
                    माँ त्रिपुरा सुंदरी के दिव्य स्वरूप
                  </h3>
                  <p className="text-[#FF6B00]">Divine Darshan of 18-Armed Goddess</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {divineImages.map((image, index) => (
                    <div key={index} className="group">
                      <div className="relative overflow-hidden rounded-xl border-4 border-[#FFD700] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Divine Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/20 via-transparent to-[#FF6B00]/10 opacity-70"></div>

                        {/* Divine Symbol */}
                        <div className="absolute top-3 right-3 bg-[#FFD700]/90 backdrop-blur-sm text-[#B30000] p-2 rounded-full">
                          <Crown size={16} />
                        </div>

                        {/* Om Symbol */}
                        <div className="absolute top-3 left-3 bg-[#B30000]/90 backdrop-blur-sm text-[#FFD700] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          ॐ
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="mt-4 text-center">
                        <h4 className="font-bold text-[#B30000] text-sm mb-1">{image.caption}</h4>
                        <div className="w-20 h-0.5 bg-[#FFD700] mx-auto rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divine Description */}
                <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#FF6B00]/10 p-6 rounded-lg border-2 border-[#FFD700]">
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-[#B30000] mb-3 flex items-center justify-center">
                      <Crown className="mr-2" size={20} />
                      दिव्य दर्शन का महत्व
                    </h4>
                    <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                      ये पावन छवियां माँ त्रिपुरा सुंदरी के दिव्य स्वरूप को दर्शाती हैं। अठारह भुजाओं वाली यह मूर्ति स्वर्ण आभूषणों, रंग-बिरंगे
                      वस्त्रों, और ताजे फूलों की मालाओं से सुसज्जित है। माँ के दिव्य नेत्र, मुस्कान, और तेजोमय मुखारविंद भक्तों के हृदय में अपार
                      शांति और आनंद का संचार करते हैं।
                    </p>
                  </div>
                </div>
              </div>

              {/* Temple Structure Details */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-[#FFF4E6] p-6 rounded-lg border-l-4 border-[#FF6B00]">
                    <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                      <Crown className="mr-2" size={20} />
                      माँ त्रिपुरा सुंदरी की मूर्ति
                    </h3>
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
                      <p>
                        • <strong>प्रभामंडल:</strong> सुनहरा तेजोमय प्रभामंडल
                      </p>
                      <p>
                        • <strong>श्रृंगार:</strong> दैनिक फूल-माला और रंगबिरंगे वस्त्र
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/temple-1.jpg"
                    alt="Modern Temple Structure"
                    width={400}
                    height={300}
                    className="rounded-lg border-4 border-[#FFD700] shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Three Forms Section */}
          <Card className="border-4 border-[#FFD700] shadow-2xl">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] p-6">
              <div className="flex items-center">
                <Crown className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">देवी त्रिपुरा के तीन स्वरूप</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">प्रातः</span>
                    </div>
                    <h3 className="text-xl font-bold text-orange-700 mb-2">कुमारी कन्या</h3>
                    <p className="text-orange-600">सुबह के समय</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-pink-300 bg-gradient-to-br from-pink-50 to-rose-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">दोपहर</span>
                    </div>
                    <h3 className="text-xl font-bold text-pink-700 mb-2">युवा सुंदरी</h3>
                    <p className="text-pink-600">दिन के समय</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-indigo-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">सायं</span>
                    </div>
                    <h3 className="text-xl font-bold text-purple-700 mb-2">पूर्ण विकसित</h3>
                    <p className="text-purple-600">शाम के समय</p>
                  </CardContent>
                </Card>
              </div>
              <div className="bg-[#FDF0D5] p-6 rounded-lg border border-[#FF6B00]">
                <p className="text-gray-700 leading-relaxed text-lg">
                  देवी त्रिपुरा सुंदरी की तीन स्वरूपों में दर्शन होते हैं – प्रातः काल कुमारी कन्या के रूप में, दोपहर में एक युवा सुंदरी के रूप में,
                  और सायंकाल में पूर्ण विकसित स्त्री के रूप में। इसी कारण इन्हें 'त्रिपुरा सुंदरी' कहा जाता है। माँ के इस दिव्य रूप को देखकर
                  श्रद्धालु घंटों तक ध्यानमग्न हो जाते हैं।
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Philosophy Section */}
          <Card className="border-4 border-[#B30000] shadow-2xl">
            <div className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white p-6">
              <div className="flex items-center">
                <Star className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">देवी त्रिपुरा के तात्त्विक स्वरूप</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-[#FF6B00] bg-gradient-to-br from-orange-50 to-yellow-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#B30000] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#B30000] mb-3">शारीरिक (भौतिक) रूप</h3>
                    <p className="text-gray-700">मूर्ति के रूप में दर्शन और पूजा-अर्चना</p>
                  </CardContent>
                </Card>
                <Card className="border-2 border-[#B30000] bg-gradient-to-br from-blue-50 to-indigo-50">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#B30000] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#B30000] mb-3">आध्यात्मिक रूप</h3>
                    <p className="text-gray-700">ध्यान और आंतरिक साधना के माध्यम से</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-8 bg-[#FFF4E6] p-6 rounded-lg border border-[#FFD700]">
                <p className="text-gray-700 leading-relaxed text-lg">
                  ज्ञानीजन माँ त्रिपुरा को दो रूपों में मानते हैं – शारीरिक (भौतिक) और आध्यात्मिक। दोनों रूपों के उपासक और भक्त विद्यमान हैं।
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Establishment History */}
          <Card className="border-4 border-[#FF6B00] shadow-2xl">
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FFD700] text-[#B30000] p-6">
              <div className="flex items-center">
                <Calendar className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">मंदिर की स्थापना एवं विकास का इतिहास</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="bg-[#FFF4E6] p-6 rounded-lg border-l-4 border-[#B30000]">
                  <h3 className="text-2xl font-bold text-[#B30000] mb-4">प्राचीन इतिहास</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3 text-gray-700">
                      <p>
                        • <strong>विक्रम संवत 1540:</strong> शिलालेख से प्राप्त साक्ष्य
                      </p>
                      <p>
                        • <strong>काल:</strong> सम्राट कनिष्क के काल से भी पहले का अनुमान
                      </p>
                      <p>
                        • <strong>प्राचीन नगर:</strong> "गोडपोली" के तीन भाग
                      </p>
                    </div>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        • <strong>सीतापुरी, शिवपुरी, विष्णुपुरी:</strong> तीन भाग
                      </p>
                      <p>
                        • <strong>नाम की उत्पत्ति:</strong> तीनों पुरी के बीच 'त्रिपुरा'
                      </p>
                      <p>
                        • <strong>शिलालेख:</strong> 'त्रियमारी' शब्द का उल्लेख
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FDF0D5] p-6 rounded-lg border border-[#FFD700]">
                  <h3 className="text-xl font-bold text-[#B30000] mb-3 flex items-center">
                    <Crown className="mr-2" size={20} />
                    राजकीय संरक्षण
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    राज्यकाल में बांसवाड़ा, डूंगरपुर, गुजरात, मालवा और मारवाड़ के राजाओं द्वारा माँ त्रिपुरा सुंदरी की पूजा की जाती थी।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reconstruction History */}
          <Card className="border-4 border-[#B30000] shadow-2xl">
            <div className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white p-6">
              <div className="flex items-center">
                <Hammer className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">मंदिर का पुनर्निर्माण और विकास</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 className="text-xl font-bold text-red-700 mb-3">विनाश और संरक्षण</h3>
                  <p className="text-gray-700 leading-relaxed">
                    मुस्लिम आक्रमणकारी जैसे मोहम्मद गजनवी या अलाउद्दीन खिलजी ने इस क्षेत्र के मंदिरों को नष्ट कर दिया था, परंतु भक्तों ने माँ
                    की मूर्तियों की रक्षा की।
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#FFF4E6] p-6 rounded-lg border border-[#FF6B00]">
                    <h4 className="font-bold text-[#B30000] mb-4">पुनर्निर्माण के चरण:</h4>
                    <div className="space-y-3 text-sm text-gray-700">
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

                  <div className="bg-[#FFD700]/20 p-6 rounded-lg border border-[#FFD700]">
                    <h4 className="font-bold text-[#B30000] mb-4">ट्रस्ट पंजीकरण:</h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <strong>पंजीकरण:</strong> 23.12.1978
                      </p>
                      <p>
                        <strong>अधिनियम:</strong> राजस्थान सार्वजनिक ट्रस्ट अधिनियम 1959
                      </p>
                      <p>
                        <strong>ट्रस्ट नाम:</strong> "मंदिर श्री त्रिपुरा सुंदरी 14-चोखला पंचाल समाज"
                      </p>
                      <p>
                        <strong>क्षेत्राधिकार:</strong> बांसवाड़ा और डूंगरपुर जिले
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FDF0D5] p-6 rounded-lg">
                  <h4 className="text-lg font-bold text-[#B30000] mb-4 flex items-center">
                    <Users className="mr-2" size={20} />
                    मेलों और आयोजनों में योगदान
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p>• सहस्त्र चंडी यज्ञ एवं शतचंडी यज्ञ</p>
                      <p>
                        • <strong>1981:</strong> 109 कुंडी महायज्ञ का आयोजन
                      </p>
                    </div>
                    <div>
                      <p>
                        • <strong>8 मई 1992:</strong> पुनः शिखर स्थापना
                      </p>
                      <p>• महायज्ञ संपन्न</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modern Development */}
          <Card className="border-4 border-[#FFD700] shadow-2xl">
            <div className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] p-6">
              <div className="flex items-center">
                <MapPin className="mr-3" size={32} />
                <h2 className="text-3xl font-bold">हालिया विकास और आधुनिकीकरण</h2>
              </div>
            </div>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-[#B30000] mb-6">विकास कार्यों की सूची:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {developmentFeatures.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-[#FF6B00] text-[#B30000] p-3 text-center justify-center text-sm hover:bg-[#FF6B00] hover:text-white transition-colors"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-[#FDF0D5] p-6 rounded-lg border border-[#B30000]">
                  <h3 className="text-xl font-bold text-[#B30000] mb-4">परिसर और नव निर्माण</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div className="space-y-2">
                      <p>
                        • <strong>क्षेत्रफल:</strong> 15 बीघा भूमि में फैला परिसर
                      </p>
                      <p>
                        • <strong>प्रवेश द्वार:</strong> हनुमान मंदिर
                      </p>
                      <p>
                        • <strong>पीछे:</strong> नीलकंठ महादेव मंदिर (2004 में पुनःस्थापित)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p>
                        • <strong>5 अप्रैल 2006:</strong> स्वर्ण कीर्ति स्तंभ स्थापना
                      </p>
                      <p>
                        • <strong>स्थापनाकर्ता:</strong> 14-चोखला पंचाल समाज
                      </p>
                      <p>
                        • <strong>विधि:</strong> वैदिक विधि से उत्तर-पूर्व कोने में
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusion */}
          <Card className="border-4 border-[#B30000] shadow-2xl bg-gradient-to-br from-[#FFF4E6] to-[#FDF0D5]">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <BookOpen className="text-[#B30000] mr-3" size={32} />
                <h2 className="text-3xl font-bold text-[#B30000]">निष्कर्ष</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
                श्री त्रिपुरा सुंदरी मंदिर का इतिहास प्राचीन काल से लेकर आधुनिक युग तक फैला हुआ है। पंचाल समाज 14 चोखरा के निरंतर प्रयासों
                से यह मंदिर आज एक भव्य और आधुनिक धार्मिक केंद्र बन गया है। माँ त्रिपुरा सुंदरी की कृपा से यह स्थान न केवल आध्यात्मिक शांति
                प्रदान करता है, बल्कि सांस्कृतिक विरासत का भी संरक्षण करता है।
              </p>
              <div className="mt-8 flex justify-center">
                <div className="bg-[#FFD700] text-[#B30000] px-8 py-4 rounded-full font-bold text-xl">
                  जय माँ त्रिपुरा सुंदरी 🙏
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
