"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, Phone, Mail, ExternalLink, Sparkles, Heart } from "lucide-react";

export default function ShringarScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(0);

  const shringarSchedule = [
    { day: "सोमवार", color: "सफेद", image: "/images/shringar/somwar-monday.jpg", description: "शुद्धता और शांति का प्रतीक सफेद वस्त्र" },
    { day: "मंगलवार", color: "लाल", image: "/images/shringar/mangalwar-tuesday.jpg", description: "शक्ति और साहस का प्रतीक लाल वस्त्र" },
    { day: "बुधवार", color: "हरा", image: "/images/shringar/budhwar-wednesday.jpg", description: "प्रकृति और समृद्धि का प्रतीक हरा वस्त्र" },
    { day: "गुरुवार", color: "पीला", image: "/images/shringar/guruwar-thursday.jpg", description: "ज्ञान और प्रकाश का प्रतीक पीला वस्त्र" },
    { day: "शुक्रवार", color: "नारंगी", image: "/images/shringar/shukrawar-friday.jpg", description: "उत्साह और ऊर्जा का प्रतीक नारंगी वस्त्र" },
    { day: "शनिवार", color: "आसमानी", image: "/images/shringar/shanivar-saturday.jpg", description: "शांति और विस्तार का प्रतीक आसमानी वस्त्र" },
    { day: "रविवार", color: "स्वर्ण पंचरंगी", image: "/images/shringar/ravivar-sunday.jpg", description: "दिव्यता और वैभव का प्रतीक स्वर्ण पंचरंगी वस्त्र" },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="flex justify-center items-center mb-2">
            <Crown className="text-[#B30000] mr-2" size={24} />
            <h2 className="text-2xl md:text-3xl font-bold text-[#B30000]">
              माँ त्रिपुरा का साप्ताहिक श्रृंगार
            </h2>
          </div>
          <p className="text-[#FF6B00] text-xs md:text-sm">
            Weekly Divine Shringar Schedule
          </p>
        </div>

        {/* Table Card */}
        <Card className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-x-auto">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex justify-center items-center text-[#B30000] text-base md:text-lg">
              <Calendar className="mr-2" size={18} />
              श्रृंगार समय सारणी
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead className="bg-[#FFF4E6]">
                <tr>
                  <th className="p-2 md:p-3 text-left text-[#B30000] text-sm">दिन</th>
                  <th className="p-2 md:p-3 text-left text-[#B30000] text-sm">रंग</th>
                  <th className="p-2 md:p-3 text-center text-[#B30000] text-sm">दर्शन</th>
                </tr>
              </thead>

              <tbody>
                {shringarSchedule.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`cursor-pointer transition ${index === selectedDay
                        ? "bg-[#FFD700]/20"
                        : "hover:bg-[#FFF4E6]"
                      }`}
                  >
                    <td className="p-2 md:p-3 text-[#B30000] text-sm">
                      {item.day}
                      {index === selectedDay && (
                        <Badge className="ml-2 bg-[#FF6B00] text-white text-[10px]">
                          आज
                        </Badge>
                      )}
                    </td>

                    <td className="p-2 md:p-3 text-gray-700 text-sm">{item.color}</td>

                    <td className="p-2 md:p-3 text-center">
                      <Button size="sm" variant="ghost" className="text-[#FF6B00] text-sm">
                        देखें
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Selected Day Section */}
        <div className="mt-8 md:mt-10 grid md:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* Image Card */}
          <Card className="bg-white/80 rounded-xl shadow-sm overflow-hidden w-full h-[350px] md:h-[600px]">
            <CardContent className="p-0 w-full h-full">
              <Image
                src={shringarSchedule[selectedDay].image}
                alt="श्रृंगार"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-white/80 rounded-xl shadow-sm">
            <CardContent className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#B30000] mb-3">
                {shringarSchedule[selectedDay].day} का श्रृंगार
              </h3>

              <p className="text-gray-700 text-sm md:text-base mb-5">
                {shringarSchedule[selectedDay].description}
              </p>

              <div className="flex gap-3 justify-between md:justify-start">
                <Button
                  onClick={() => setSelectedDay((selectedDay - 1 + 7) % 7)}
                  className="bg-[#FF6B00] text-white text-sm px-4"
                >
                  ← पिछला
                </Button>

                <Button
                  onClick={() => setSelectedDay((selectedDay + 1) % 7)}
                  className="bg-[#B30000] text-white text-sm px-4"
                >
                  अगला →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Note */}
        <Card className="mt-8 md:mt-10 bg-white/70 rounded-xl shadow-sm">
          <CardContent className="p-4 md:p-5 flex items-start">
            <Heart className="text-[#FF6B00] mr-3 mt-1" size={18} />
            <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
              नवरात्रि अष्टमी तथा कार्तिक पूर्णिमा के दिन श्रृंगार केवल मंदिर ट्रस्ट द्वारा किया जाता है।
            </p>
          </CardContent>
        </Card>

        {/* Booking */}
        <Card className="mt-8 md:mt-10 bg-white/80 rounded-xl shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-[#B30000] text-lg md:text-xl">
              🌸 श्रृंगार बुकिंग
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 grid md:grid-cols-2 gap-6">

            {/* Contact */}
            <div>
              <h3 className="font-bold text-[#B30000] text-sm md:text-base mb-3">
                📞 संपर्क करें
              </h3>

              <p className="text-xs md:text-sm mb-2">
                <strong>प्रबंधक:</strong> जिगेश पंचाल
              </p>

              <div className="flex items-center gap-2 text-xs md:text-sm mb-2">
                <Phone size={14} />
                <span>+91 8696851900</span>
              </div>

              <div className="flex items-center gap-2 text-xs md:text-sm">
                <Mail size={14} />
                <span>whitedebbie@example.net</span>
              </div>
            </div>

            {/* Booking Button */}
            <div className="flex flex-col justify-center items-center text-center">
              <Sparkles className="text-[#FFD700] mb-3" size={28} />

              <Button className="bg-[#FFD700] text-[#B30000] font-bold text-sm px-5">
                <ExternalLink className="mr-2" size={16} />
                बुकिंग करें
              </Button>

              <p className="text-[10px] md:text-xs text-gray-500 mt-3">
                * बुकिंग के लिए पहले संपर्क करें
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </section>
  );
}