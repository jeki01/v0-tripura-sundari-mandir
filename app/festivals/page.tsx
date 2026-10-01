import { PageShell, EmptyNote } from "@/components/cms"
import { fetchContent, isManaged } from "@/lib/api"
import FestivalsGrid from "@/components/festivals-grid"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "मंदिर के प्रमुख त्योहार | श्री त्रिपुरा सुंदरी मंदिर",
  description: "चैत्र नवरात्रि, गरबा नाइट्स, गैर नृत्य पंचमी और अन्य त्योहार।",
}

// Shown until the section is first saved from the admin portal
const DEFAULT_FESTIVALS = [
  {
    title: "चैत्र नवरात्रि अष्टमी (Chaitra Navratri Ashtami)",
    description:
      "चैत्र नवरात्रि अष्टमी के अवसर पर माँ त्रिपुरा सुंदरी के मंदिर में विशेष पूजा, आरती और हवन का आयोजन होता है। भक्त बड़ी संख्या में मंदिर पहुंचकर माता के दर्शन करते हैं।\n\n• विशेष श्रृंगार और महाआरती\n• सुबह से शाम तक भक्तों की निरंतर आवाजाही",
  },
  {
    title: "नवरात्रि गरबा नाइट्स (Navratri Garba Nights)",
    description:
      "हर साल नवरात्रि के दौरान मंदिर परिसर और समाज द्वारा गरबा नाइट्स आयोजित की जाती हैं। भक्त माँ अम्बे की भक्ति में डूबकर गरबा करते हैं और वातावरण पूरी तरह आध्यात्मिक और उत्साह से भर जाता है।\n\n• पारंपरिक गरबा और डांडिया प्रस्तुति\n• रोज़ाना विशेष आरती\n• समाज के कलाकारों द्वारा सांस्कृतिक कार्यक्रम",
  },
  {
    title: "होली के बाद गैर नृत्य पंचमी (Gair Nritya Panchami)",
    description:
      "होली के बाद पंचमी के दिन समाज द्वारा पारंपरिक ‘गैर नृत्य’ का आयोजन होता है। यह राजस्थान की सांस्कृतिक धरोहर का एक महत्वपूर्ण हिस्सा है जिसमें बड़े-बुजुर्ग और युवा सभी उत्साहपूर्वक भाग लेते हैं।\n\n• ढोल, नगाड़े और पारंपरिक वादन\n• मंदिर में विशेष पूजा के बाद कार्यक्रम की शुरुआत",
  },
]

export default async function FestivalsPage() {
  const c = await fetchContent("festivals")
  const managed = isManaged(c)
  const items: any[] = managed ? (Array.isArray(c?.items) ? c.items : []) : DEFAULT_FESTIVALS
  return (
    <PageShell heading={c?.title || "मंदिर के प्रमुख त्योहार"} subtitle="आस्था, उत्सव और परंपरा का संगम" eyebrow="Festivals">
      {items.length === 0 ? <EmptyNote /> : <FestivalsGrid items={items} />}
    </PageShell>
  )
}
