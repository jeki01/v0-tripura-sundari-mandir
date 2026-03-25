import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"

export default function Festivals() {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />

      <main className="container mx-auto px-4 py-12 space-y-10 mt-20">

        {/* PAGE HEADING */}
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#B30000] mb-10">
          मंदिर के प्रमुख त्योहार (Festivals)
        </h1>

        {/* 1 — Chaitra Navratri Ashtami */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl text-[#B30000] mb-4">
            चैत्र नवरात्रि अष्टमी (Chaitra Navratri Ashtami)
          </h3>

          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            चैत्र नवरात्रि अष्टमी के अवसर पर माँ त्रिपुरा सुंदरी के मंदिर में
            विशेष पूजा, आरती और हवन का आयोजन होता है। भक्त बड़ी संख्या में मंदिर
            पहुंचकर माता के दर्शन करते हैं ।
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>• विशेष श्रृंगार और महाआरती</li>
            <li>• सुबह से शाम तक भक्तों की निरंतर आवाजाही</li>
          </ul>
        </div>

        {/* 2 — Navratri Garba Nights */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl text-[#B30000] mb-4">
            नवरात्रि गरबा नाइट्स (Navratri Garba Nights)
          </h3>

          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            हर साल नवरात्रि के दौरान मंदिर परिसर और समाज द्वारा गरबा नाइट्स
            आयोजित की जाती हैं। भक्त माँ अम्बे की भक्ति में डूबकर गरबा करते हैं और
            वातावरण पूरी तरह आध्यात्मिक और उत्साह से भर जाता है।
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>• पारंपरिक गरबा और डांडिया प्रस्तुति</li>
            <li>• रोज़ाना विशेष आरती</li>
            <li>• समाज के कलाकारों द्वारा सांस्कृतिक कार्यक्रम</li>
          </ul>
        </div>

        {/* 3 — Gair Nritya Panchami */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl text-[#B30000] mb-4">
            होली के बाद गैर नृत्य पंचमी (Gair Nritya Panchami)
          </h3>

          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            होली के बाद पंचमी के दिन समाज द्वारा पारंपरिक ‘गैर नृत्य’ का
            आयोजन होता है। यह राजस्थान की सांस्कृतिक धरोहर का एक महत्वपूर्ण
            हिस्सा है जिसमें बड़े-बुजुर्ग और युवा सभी उत्साहपूर्वक भाग लेते हैं।
          </p>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>• ढोल, नगाड़े और पारंपरिक वादन</li>
            <li>• मंदिर में विशेष पूजा के बाद कार्यक्रम की शुरुआत</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}