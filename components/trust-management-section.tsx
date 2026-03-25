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
      description:
        "पंचाल समाज 14 चोखरा के सम्मानित अध्यक्ष, मंदिर के विकास और संचालन में अग्रणी भूमिका निभाते हैं।",
      gradient: "from-[#B30000] to-[#FF6B00]",
    },
    {
      name: "श्रीमान नटवरलालजी पंचाल",
      nameEng: "Shri Natwarlal Ji Panchal",
      position: "महामंत्री",
      positionEng: "General Secretary",
      image: "/images/trust/natwarlal-ji-mahamantri.jpg",
      description:
        "मंदिर ट्रस्ट के महामंत्री, दैनिक प्रबंधन और समाज सेवा कार्यों के प्रमुख संयोजक।",
      gradient: "from-[#FF6B00] to-[#FFD700]",
    },
  ]

  return (
    <section
      id="trust-management"
      className="py-20 bg-gradient-to-b from-[#FFF7EA] to-[#FDECD2]"
    >
      <div className="container mx-auto px-4">

        {/* ===========================
            HEADER
        ============================ */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Shield className="text-[#B30000] mr-3" size={40} />
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#B30000]">
              मंदिर ट्रस्ट प्रबंधन
            </h2>
          </div>

          <p className="text-[#FF6B00] text-xl font-medium tracking-wide">
            Temple Trust Management
          </p>

          <div className="w-40 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#FF6B00] mx-auto rounded-full mt-4" />
        </div>

        {/* ===========================
            OFFICIALS SECTION
        ============================ */}
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto mb-16">
          {trustOfficials.map((official, index) => (
            <Card
              key={index}
              className="border-4 border-[#FFD700]/80 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white rounded-2xl overflow-hidden"
            >
              <CardHeader
                className={`bg-gradient-to-r ${official.gradient} text-white text-center py-6`}
              >
                <div className="flex items-center justify-center mb-3">
                  <Crown size={26} className="mr-2" />
                  <CardTitle className="text-2xl font-bold">
                    {official.position}
                  </CardTitle>
                </div>
                <p className="text-[#FFF6D0] text-sm tracking-wide">
                  {official.positionEng}
                </p>
              </CardHeader>

              <CardContent className="px-8 py-10">
                <div className="text-center">

                  {/* Elegant Photo Frame */}
                  <div className="relative mx-auto mb-7 w-48 h-48">
                    <div className="absolute inset-0 rounded-xl border-4 border-[#FFD700] shadow-lg"></div>
                    <Image
                      src={official.image}
                      alt={official.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold text-[#B30000]">
                    {official.name}
                  </h3>
                  <p className="text-[#FF6B00] font-medium mb-4">
                    {official.nameEng}
                  </p>

                  {/* Description Box */}
                  <div className="bg-[#FFF6E3] p-4 rounded-lg border border-[#FFD700] shadow-sm mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {official.description}
                    </p>
                  </div>

                  {/* Badge */}
                  <span
                    className={`inline-block bg-gradient-to-r ${official.gradient} text-white px-5 py-2 rounded-full font-semibold shadow-md`}
                  >
                    {official.position} • {official.positionEng}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ===========================
            TRUST INFO SECTION
        ============================ */}
        <Card className="border-4 border-[#B30000] shadow-2xl bg-[#FFF7EB] rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center py-8 rounded-t-2xl">
            <CardTitle className="text-3xl flex items-center justify-center">
              <Building className="mr-3" size={30} />
              मंदिर ट्रस्ट की जानकारी
            </CardTitle>
            <p className="text-[#FFECAA] mt-1 text-sm tracking-wide">
              Temple Trust Information
            </p>
          </CardHeader>

          <CardContent className="p-10">
            <div className="grid md:grid-cols-2 gap-10">

              {/* LEFT SIDE INFO */}
              <div className="space-y-8">

                {/* Trust Details */}
                <div className="bg-white p-6 rounded-xl border border-[#FF6B00] shadow">
                  <h3 className="text-xl font-bold text-[#B30000] flex items-center mb-4">
                    <Shield size={20} className="mr-2" />
                    ट्रस्ट विवरण
                  </h3>

                  <div className="space-y-3 text-sm text-gray-700">
                    <InfoRow label="ट्रस्ट नाम" value="मंदिर श्री त्रिपुरा सुंदरी 14-चोखरा पंचाल समाज" />
                    <InfoRow label="पंजीकरण" value="23.12.1978" highlight />
                    <InfoRow label="अधिनियम" value="राजस्थान सार्वजनिक ट्रस्ट अधिनियम 1959" />
                    <InfoRow label="क्षेत्राधिकार" value="बांसवाड़ा और डूंगरपुर जिला" />
                  </div>
                </div>

                {/* Community Service */}
                <div className="bg-white p-6 rounded-xl border border-[#FFD700] shadow">
                  <h3 className="text-xl font-bold text-[#B30000] flex items-center mb-4">
                    <Users size={20} className="mr-2" />
                    समुदायिक सेवा
                  </h3>

                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• पंचाल समाज 14 चोखरा का प्रतिनिधित्व</li>
                    <li>• धार्मिक एवं सांस्कृतिक आयोजन</li>
                    <li>• समाज कल्याण योजनाओं का संचालन</li>
                    <li>• मंदिर संचालन और प्रबंधन</li>
                  </ul>
                </div>

              </div>

              {/* RIGHT SIDE INFO */}
              <div className="space-y-8">

                {/* Contact Cards */}
                <ContactCard
                  title="मंदिर कार्यालय"
                  phone="+91 79 2550 1234"
                  email="[REDACTED_EMAIL_ADDRESS_1]"
                />

                <ContactCard
                  title="पंचाल समाज कार्यालय"
                  phone="+91 8696851900"
                  email="[REDACTED_EMAIL_ADDRESS_2]"
                />

                {/* Motto */}
                <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FF6B00]/20 p-6 rounded-xl border border-[#FFD700]">
                  <h3 className="text-lg font-bold text-[#B30000] mb-3 text-center">
                    सेवा का संकल्प
                  </h3>
                  <p className="text-center text-gray-700 text-sm leading-relaxed">
                    "माँ त्रिपुरा सुंदरी की कृपा से हमारा ट्रस्ट निरंतर धर्म, संस्कृति और समाज सेवा के लिए समर्पित है।"
                  </p>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TRUST MANDAL TABLE SECTION */}
      <div className="mt-20">
        <TrustMandalSectionTable />
      </div>
    </section>
  )
}
function TrustMandalSectionTable() {
  const adhyaksh = [
    { no: 1, name: "श्री शंकरलालजी", father: "श्री कचरूजी पंचाल", place: "लोहारिया", chokhra: "लोहारिया", work: "1965–74" },
    { no: 2, name: "श्री केशवलालजी", father: "श्री दलजी पंचाल", place: "लोहारिया", chokhra: "लोहारिया", work: "1975–79" },
    { no: 3, name: "श्री लालजी", father: "श्री कारूजी पंचाल", place: "विकासनगर", chokhra: "चौरासी", work: "1980–84" },
    { no: 4, name: "श्री भैरवलालजी", father: "श्री नाथुजी पंचाल", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "1985–90" },
    { no: 5, name: "श्री कालुजी", father: "श्री केवजी पंचाल", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "कार्यवाहक" },
    { no: 6, name: "श्री रामचन्द्रजी", father: "श्री लक्ष्मणजी पंचाल", place: "धरियावद", chokhra: "पारसोला", work: "1991–93" },
    { no: 7, name: "श्री प्रतापजी", father: "श्री वलमजी पंचाल", place: "मुंगेड", chokhra: "तरपोट", work: "1994–96" },
    { no: 8, name: "श्री राजेन्द्रप्रसादजी", father: "श्री कुन्दनजी पंचाल", place: "घाटोल", chokhra: "खमेरा", work: "1997–99" },
    { no: 9, name: "श्री मोहनलालजी", father: "श्री नगजी पंचाल", place: "सागवाड़ा", chokhra: "सागवाड़ा", work: "2000–02" },
    { no: 10, name: "श्री भंवरलालजी", father: "श्री दयालजी पंचाल", place: "परतापुर", chokhra: "परतापुर", work: "2003–मार्च 06" },
    { no: 11, name: "श्री प्रेमचन्दजी", father: "श्री कचराजी पंचाल", place: "जोगपुर", chokhra: "बैताली", work: "अप्रेल 2006–08" },
    { no: 12, name: "श्री गंगारामजी", father: "श्री कचराजी पंचाल", place: "बिलोदा", chokhra: "बोरी", work: "2009–मार्च 13" },
    { no: 13, name: "श्री कारीलालजी", father: "श्री तुलसीरामजी पंचाल", place: "माथुगामड़ा", chokhra: "डूंगरपुर", work: "अप्रेल 2013–15" },
    { no: 14, name: "श्री अशोकजी", father: "श्री कचरूजी पंचाल", place: "बड़ोदिया", chokhra: "पथोक", work: "2016–18" },
    { no: 15, name: "श्री दिनेशकुमारजी", father: "श्री सुखलालजी पंचाल", place: "बावलवाडा", chokhra: "खडक", work: "2019–21" },
    { no: 16, name: "श्री कान्तिलालजी", father: "श्री पुरुषोत्तमजी पंचाल", place: "डूंगरा छोटा", chokhra: "मइयोड़", work: "2022–मार्च 25" },
    { no: 17, name: "श्री धुलजी भाई", father: "श्री गौतमजी पंचाल", place: "पालोदा हा.मु. बागीदौरा", chokhra: "लोहारिया", work: "अप्रेल 2025–" },
  ];

  const mahamantri = [
    { no: 1, name: "-", father: "-", place: "-", chokhra: "-", work: "1965–74" },
    { no: 2, name: "श्री प्रतापजी", father: "श्री वलमजी पंचाल", place: "मुंगेड", chokhra: "तरपोट", work: "1975–79" },
    { no: 3, name: "श्री भैरवलालजी", father: "श्री नाथुजी पंचाल", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "1980–84" },
    { no: 4, name: "श्री मोहनलालजी", father: "श्री नगजी पंचाल", place: "सागवाड़ा", chokhra: "सागवाड़ा", work: "1985–90" },
    { no: 5, name: "श्री मोहनलालजी", father: "श्री नगजी पंचाल", place: "सागवाड़ा", chokhra: "सागवाड़ा", work: "1991–93" },
    { no: 6, name: "श्री मोहनलालजी", father: "श्री नगजी पंचाल", place: "सागवाड़ा", chokhra: "सागवाड़ा", work: "1994–96" },
    { no: 7, name: "श्री अम्बालालजी", father: "श्री प्रतापजी पंचाल", place: "जौलाना", chokhra: "परतापुर", work: "1997–99" },
    { no: 8, name: "श्री अशोकजी", father: "श्री कचरूजी पंचाल", place: "बड़ोदिया", chokhra: "पथोक", work: "2000–02" },
    { no: 9, name: "श्री गंगारामजी", father: "श्री कचराजी पंचाल", place: "बिलोदा", chokhra: "बोरी", work: "2003–मार्च 06" },
    { no: 10, name: "श्री गंगारामजी", father: "श्री कचराजी पंचाल", place: "बिलोदा", chokhra: "बोरी", work: "अप्रेल 06–08" },
    { no: 11, name: "श्री अम्बालालजी", father: "श्री शंकरजी खेरादी", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "2009–26 सित. 2010" },
    { no: 12, name: "श्री अमृतलालजी", father: "श्री रघुनाथजी पंचाल", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "अप्रेल 2013–15" },
    { no: 13, name: "श्री नटवरलालजी", father: "श्री शंकरलालजी पंचाल", place: "लिखी बड़ी", chokhra: "चौरासी", work: "2016–18" },
    { no: 14, name: "श्री राजेन्द्रजी", father: "श्री मोहनलालजी पंचाल", place: "सरोदा", chokhra: "तरपोट", work: "2019–21" },
    { no: 15, name: "श्री नटवरलालजी", father: "श्री शंकरलालजी पंचाल", place: "लिखी बड़ी", chokhra: "चौरासी", work: "2022–मार्च 25" },
    { no: 16, name: "श्री नटवरलालजी", father: "श्री शंकरलालजी पंचाल", place: "लिखी बड़ी", chokhra: "चौरासी", work: "अप्रेल 25–" },
  ];

  const koshadhyaksh = [
    { no: 1, name: "-", father: "-", place: "-", chokhra: "-", work: "1965–74" },
    { no: 2, name: "श्री कुन्दनजी", father: "श्री भुराजी पंचाल", place: "तलवाड़ा", chokhra: "बाँसवाड़ा", work: "1975–79" },
    { no: 3, name: "श्री शंकरलालजी", father: "श्री राघवजी पंचाल", place: "परतापुर", chokhra: "परतापुर", work: "1980–84" },
    { no: 4, name: "श्री प्रतापजी", father: "श्री वलमजी पंचाल", place: "मुंगेड", chokhra: "तरपोट", work: "1985–90" },
    { no: 5, name: "श्री कालुजी", father: "श्री केवजी पंचाल", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "1991–93" },
    { no: 6, name: "श्री पवनजी", father: "श्री कुन्दनजी पंचाल", place: "लोहारिया", chokhra: "लोहारिया", work: "1994–96" },
    { no: 7, name: "श्री पवनजी", father: "श्री कुन्दनजी पंचाल", place: "लोहारिया", chokhra: "लोहारिया", work: "1997–99" },
    { no: 8, name: "श्री अम्बालालजी", father: "श्री गंगारामजी पंचाल", place: "पाँचलावासा", chokhra: "-", work: "2000–2002" },
    { no: 9, name: "श्री अम्बालालजी", father: "श्री गंगारामजी पंचाल", place: "पाँचलावासा", chokhra: "बाँसवाड़ा", work: "2003–मार्च 06" },
    { no: 10, name: "श्री अम्बालालजी", father: "श्री गंगारामजी पंचाल", place: "पाँचलावासा", chokhra: "बाँसवाड़ा", work: "अप्रेल 06–2008" },
    { no: 11, name: "श्री अशोकजी", father: "श्री कचरूजी पंचाल", place: "बड़ोदिया", chokhra: "पथोक", work: "2009–मार्च 13" },
    { no: 12, name: "श्री अशोकजी", father: "श्री कचरूजी पंचाल", place: "बड़ोदिया", chokhra: "पथोक", work: "अप्रेल 2013–15" },
    { no: 13, name: "श्री धुलजीभाई", father: "श्री गौतमजी पंचाल", place: "पालोदा हा.मु. बागीदौरा", chokhra: "लोहारिया", work: "2016–2018" },
    { no: 14, name: "श्री नारायणलालजी", father: "श्री कचरूजी पंचाल", place: "बड़ोदिया", chokhra: "पथोक", work: "2019–2021" },
    { no: 15, name: "श्री रामचन्द्रजी", father: "श्री शंकरलालजी पंचाल", place: "बाँसवाड़ा", chokhra: "बाँसवाड़ा", work: "2022–मार्च 25" },
    { no: 16, name: "श्री भगवतीलालजी", father: "श्री प्रतापजी पंचाल", place: "मुंगेड", chokhra: "तरपोट", work: "अप्रेल 2025–" },
  ];

  const renderTable = (title: string, data: any[]) => (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-[#FFD700]">
      <h2 className="text-2xl text-[#B30000] font-semibold mb-4 text-center">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-[#FFF4E6] text-[#B30000]">
              <th className="p-2 border">क्र.सं.</th>
              <th className="p-2 border">नाम</th>
              <th className="p-2 border">पिता</th>
              <th className="p-2 border">निवासी</th>
              <th className="p-2 border">चोखरा</th>
              <th className="p-2 border">कार्यकाल</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.no} className="border hover:bg-[#FFF8DC]">
                <td className="p-2 border text-center">{row.no}</td>
                <td className="p-2 border">{row.name}</td>
                <td className="p-2 border">{row.father}</td>
                <td className="p-2 border">{row.place}</td>
                <td className="p-2 border">{row.chokhra}</td>
                <td className="p-2 border">{row.work}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
      <div className="container mx-auto px-4 space-y-10">

        {renderTable("अध्यक्ष - कार्यकाल", adhyaksh)}
        {renderTable("महामंत्री - कार्यकाल", mahamantri)}
        {renderTable("कोषाध्यक्ष - कार्यकाल", koshadhyaksh)}

      </div>
    </section>
  );
}


function InfoRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      <span className={`${highlight ? "text-[#FF6B00] font-bold" : "text-[#B30000] font-semibold"} text-sm`}>
        {value}
      </span>
    </div>
  )
}

function ContactCard({ title, phone, email }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#FF6B00] shadow">
      <h4 className="font-bold text-[#B30000] mb-3 flex items-center text-lg">
        <Phone className="mr-2 text-[#FF6B00]" size={20} />
        {title}
      </h4>

      <div className="space-y-1 text-sm text-gray-700">
        <div className="flex items-center">
          <Phone size={14} className="mr-2 text-[#FF6B00]" />
          {phone}
        </div>
        <div className="flex items-center">
          <Mail size={14} className="mr-2 text-[#FF6B00]" />
          {email}
        </div>
      </div>
    </div>
  )
}
