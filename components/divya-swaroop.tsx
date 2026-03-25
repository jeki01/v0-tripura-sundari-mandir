"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Crown } from "lucide-react";

interface DivineImage {
  src: string;
  alt: string;
  caption: string;
}

interface TempleStructureProps {
  divineImages: DivineImage[];
}

export default function TempleStructureSection({ divineImages }: TempleStructureProps) {
  return (
    <section id="contact" className="py-16 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">


 <div className="text-center mb-10">
                <h2 className="text-2xl font-bold text-[#B30000] mb-2 flex items-center justify-center">
                  <Crown className="mr-2" size={24} />
                  माँ त्रिपुरा सुंदरी के दिव्य स्वरूप
                </h2>
                <p className="text-[#FF6B00]">Divine Darshan of 18-Armed Goddess</p>
              </div>

        <Card className="rounded-2xl shadow-md bg-white/90">
          <CardContent className="p-8">

            {/* Divine Image Gallery */}
            <div className="mb-12">
             

              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {divineImages.map((image, index) => (
                  <div key={index} className="group">
                    <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                      />

                      {/* Crown Icon */}
                      <div className="absolute top-3 right-3 bg-[#FFD700]/90 text-[#B30000] p-2 rounded-full shadow">
                        <Crown size={16} />
                      </div>

                      {/* Om Symbol */}
                      <div className="absolute top-3 left-3 bg-[#B30000]/90 text-[#FFD700] w-8 h-8 rounded-full flex items-center justify-center font-bold shadow">
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
              <div className="bg-[#FFF9E8] p-6 rounded-xl border border-[#FFD700]/40 shadow-sm">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-[#B30000] mb-3 flex items-center justify-center">
                    <Crown className="mr-2" size={20} />
                    दिव्य दर्शन का महत्व
                  </h4>
                  <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    ये पावन छवियां माँ त्रिपुरा सुंदरी के दिव्य स्वरूप को दर्शाती हैं...
                  </p>
                </div>
              </div>
            </div>

            {/* Temple Structure Details */}
            <div className="grid lg:grid-cols-2 gap-10">

              {/* Text Details */}
              <div className="bg-[#FFF9E8] p-6 rounded-xl border border-[#FF6B00]/30 shadow-sm">
                <h3 className="text-xl font-bold text-[#B30000] mb-4 flex items-center">
                  <Crown className="mr-2" size={20} />
                  माँ त्रिपुरा सुंदरी की मूर्ति
                </h3>

                <div className="space-y-3 text-gray-700">
                  <p>• <strong>सिंहवाहिनी मूर्ति:</strong> अठारह भुजाओं वाली विशाल प्रतिमा</p>
                  <p>• <strong>ऊंचाई:</strong> लगभग 5 फीट ऊँची</p>
                  <p>• <strong>अस्त्र-शस्त्र:</strong> विभिन्न प्रकार के दिव्य आयुध</p>
                  <p>• <strong>नौ दुर्गा:</strong> शीतकालीन मूर्तियाँ</p>
                  <p>• <strong>श्री यंत्र:</strong> देवी के चरणों के पास स्थापित</p>
                  <p>• <strong>प्रभामंडल:</strong> सुनहरा तेजोमय प्रकाश</p>
                </div>
              </div>

              {/* Temple Image */}
              <div className="flex items-center justify-center">
                <Image
                  src="/images/temple-1.jpg"
                  alt="Temple Structure"
                  width={420}
                  height={320}
                  className="rounded-xl shadow-md border border-[#FFD700]/40"
                />
              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </section>
  );
}