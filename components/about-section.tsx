import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Crown, Users, Building, BookOpen, Mountain, Droplets, TreePine, Home } from "lucide-react"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section id="about-mandir" className="py-16 bg-[#FDF0D5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Building className="text-[#FF6B00] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000] border-b-4 border-[#FF6B00] inline-block pb-2">
              मंदिर का परिचय
            </h2>
          </div>
          <p className="text-[#B30000] text-lg">श्री त्रिपुरा सुंदरी मंदिर - वागड़ की पवित्र भूमि</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {/* Location & Sacred Geography */}
            <Card className="border-[#FF6B00] border-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mountain className="text-[#FF6B00] mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-[#B30000]">पवित्र भौगोलिक स्थिति</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  राजस्थान के दक्षिणी भाग की अरावली पर्वतमालाओं से घिरा हुआ और नदियों, तालाबों व प्राकृतिक सुंदरता से भरपूर क्षेत्र
                  बांसवाड़ा कहलाता है। यह वागड़ क्षेत्र प्राचीन काल से ही धार्मिक आस्था का केंद्र रहा है। बांसवाड़ा को{" "}
                  <strong className="text-[#B30000]">मिनी काशी</strong> भी कहा जाता है।
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  यहाँ अनेकों प्राचीन मंदिर स्थित हैं जो अपने शिल्प, वास्तुशिल्प, और भव्यता के कारण न केवल राजस्थान में, बल्कि पूरे भारतवर्ष में
                  प्रसिद्ध हैं।
                </p>
                <div className="bg-[#FFD700]/20 p-4 rounded-lg">
                  <h4 className="font-bold text-[#B30000] mb-2 flex items-center">
                    <MapPin className="mr-2" size={18} />
                    मंदिर स्थान:
                  </h4>
                  <p className="text-gray-700 text-sm">
                    बांसवाड़ा मुख्यालय से लगभग 20 किलोमीटर दूर, तलवाड़ा गांव के पास स्थित। आरंभ में इस मंदिर को{" "}
                    <strong className="text-[#FF6B00]">तारताई माता</strong> के नाम से जाना जाता था।
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sacred Texts & Ancient References */}
            <Card className="border-[#B30000] border-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-[#B30000] mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-[#B30000]">पुराणों में वर्णन</h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  वागड़ क्षेत्र को पारंपरिक रूप से पवित्र भूमि माना गया है। इसका उल्लेख विभिन्न प्राचीन ग्रंथों में मिलता है:
                </p>
                <div className="space-y-3">
                  <div className="bg-[#FFF4E6] p-4 rounded-lg border-l-4 border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2">प्राचीन नाम:</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>
                        • <strong>स्कंदपुराण में:</strong> 'गुप्त प्रदेश'
                      </li>
                      <li>
                        • <strong>राजा भोज के शिलालेखों में:</strong> 'स्थली मंडल'
                      </li>
                      <li>
                        • <strong>पुराणों में:</strong> 'कुमारिका खंड' एवं 'वागुरी क्षेत्र'
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#FFF4E6] p-4 rounded-lg border-l-4 border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2 flex items-center">
                      <Droplets className="mr-2" size={16} />
                      माही नदी की महिमा:
                    </h5>
                    <p className="text-gray-700 text-sm">
                      इस क्षेत्र से बहने वाली माही नदी को पुराणों में <strong>'कलियुगी माही गंगा'</strong> कहा गया है। संतों और ऋषियों
                      ने तीन नदियों के संगम की भव्यता का वर्णन करते हुए यहाँ माही नदी में स्नान को पावन और गौरव का विषय बताया है।
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Temple History Link */}
            <Card className="border-[#FFD700] border-3 bg-gradient-to-br from-[#FFF4E6] to-[#FFD700]/10">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <BookOpen className="text-[#B30000] mr-2" size={24} />
                  <h3 className="text-xl font-bold text-[#B30000]">संपूर्ण मंदिर इतिहास</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  माँ त्रिपुरा सुंदरी मंदिर के विस्तृत इतिहास, वास्तुशिल्प और आध्यात्मिक महत्व की जानकारी प्राप्त करें
                </p>
                <Link href="#temple-history">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#B30000] text-white font-bold px-8 py-3"
                  >
                    <BookOpen className="mr-2" size={18} />
                    संपूर्ण इतिहास पढ़ें
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Temple Images */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Image
                src="/images/temple-1.jpg"
                alt="Temple Front View"
                width={300}
                height={200}
                className="rounded-lg border-4 border-[#FF6B00] shadow-lg"
              />
              <Image
                src="/images/temple-4.jpg"
                alt="Garbh Grah"
                width={300}
                height={200}
                className="rounded-lg border-4 border-[#FF6B00] shadow-lg"
              />
              <Image
                src="/images/temple-3.jpg"
                alt="Temple Complex"
                width={300}
                height={200}
                className="rounded-lg border-4 border-[#FF6B00] shadow-lg"
              />
              <Image
                src="/images/temple-5.jpg"
                alt="Temple Architecture"
                width={300}
                height={200}
                className="rounded-lg border-4 border-[#FF6B00] shadow-lg"
              />
            </div>

            {/* Temple Environment & Significance */}
            <Card className="border-[#FF6B00] border-2">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Crown className="text-[#FF6B00] mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-[#B30000]">मंदिर का वातावरण एवं महत्व</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#FFF4E6] p-4 rounded-lg border-l-4 border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2 flex items-center">
                      <TreePine className="mr-2" size={16} />
                      प्राकृतिक सौंदर्य:
                    </h5>
                    <p className="text-gray-700 text-sm">
                      मंदिर का वातावरण अत्यंत शांत, प्राकृतिक, जागृत और दर्शनीय है। माही नदी के पवित्र क्षेत्र में स्थित यह मंदिर प्राकृतिक
                      सुंदरता से भरपूर है।
                    </p>
                  </div>
                  <div className="bg-[#FFF4E6] p-4 rounded-lg border-l-4 border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2 flex items-center">
                      <Users className="mr-2" size={16} />
                      श्रद्धालुओं का आगमन:
                    </h5>
                    <p className="text-gray-700 text-sm">
                      प्रतिवर्ष राजस्थान सहित पड़ोसी राज्यों गुजरात एवं मध्यप्रदेश से श्रद्धालु यहाँ माँ के दर्शन के लिए आते हैं और अपनी
                      मनोकामनाएँ पूर्ण करते हैं।
                    </p>
                  </div>
                  <div className="bg-[#FFD700]/20 p-4 rounded-lg border border-[#FFD700]">
                    <h5 className="font-bold text-[#B30000] mb-2 flex items-center">
                      <Crown className="mr-2" size={16} />
                      शक्ति पीठ:
                    </h5>
                    <p className="text-gray-700 text-sm">
                      यह स्थान <strong className="text-[#B30000]">राजस्थान के प्रमुख शक्ति पीठों में से एक</strong> माना जाता है।
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Management & Facilities */}
            <Card className="border-[#B30000] border-3 bg-gradient-to-br from-[#FFF4E6] to-[#FDF0D5]">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Home className="text-[#B30000] mr-2" size={24} />
                  <h3 className="text-xl font-bold text-[#B30000]">मंदिर प्रबंधन एवं सुविधाएं</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2">प्रबंधन व्यवस्था:</h5>
                    <p className="text-gray-700 text-sm mb-2">
                      मंदिर परिसर की प्रबंधन व्यवस्था और सुरक्षा हेतु ट्रस्ट द्वारा नियुक्ति:
                    </p>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• एक पुजारी</li>
                      <li>• एक प्रबंधक</li>
                      <li>• एक सुरक्षा रक्षक (सेवानिवृत्त फौजी)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2">मुख्य सुविधाएं:</h5>
                    <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
                      <div>• जल कुटी (प्याऊ)</div>
                      <div>• शौचालय सुविधा</div>
                      <div>• उद्यान (बागीचा)</div>
                      <div>• विशाल धर्मशाला</div>
                      <div>• 1000 गैलन पानी की टंकी</div>
                      <div>• पैंट्री (रसोईघर)</div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-[#FF6B00]">
                    <h5 className="font-bold text-[#B30000] mb-2">भूमि एवं संपत्ति:</h5>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 37.15 बीघा कृषि भूमि (सिंचाई हेतु पक्का कुआं)</li>
                      <li>• 3000 फीट लंबी सुरक्षा चारदीवारी</li>
                      <li>• 15 बीघा बाग-बगीचे और पार्किंग हेतु आरक्षित</li>
                      <li>• पूजा सामग्री और प्रसाद की दुकानों की श्रृंखला</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
