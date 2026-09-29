"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { fetchContent, isManaged } from "@/lib/api";

const DEFAULT_SUBTITLE = "श्री त्रिपुरा सुंदरी मंदिर – दर्शन के दौरान आवश्यक निर्देश";

const DEFAULT_DOS = [
  "मंदिर में स्वच्छता और शांति बनाए रखें।",
  "दर्शन के लिए क्रमबद्ध तरीके से कतार में खड़े रहें।",
  "वरिष्ठ नागरिकों, बच्चों और दिव्यांगजनों का ध्यान रखें।",
  "अपने कीमती सामान की सुरक्षा स्वयं सुनिश्चित करें।",
  "किसी भी दान/भेंट का रसीद अवश्य प्राप्त करें।",
  "मंदिर परिसर को प्लास्टिक-मुक्त रखने में सहयोग करें।",
];

const DEFAULT_DONTS = [
  "गर्भगृह में मोबाइल या कैमरा ले जाने का प्रयास न करें।",
  "मंदिर परिसर में ऊँची आवाज़ में बात न करें।",
  "प्रसाद या फूल बिखेरकर परिसर को गंदा न करें।",
  "पार्किंग क्षेत्र के बाहर वाहन न खड़ा करें।",
  "किसी भी अफवाहों या गलत संदेशों पर विश्वास न करें।",
  "बिना अनुमति धार्मिक सामग्री या वस्तुएँ न बेचें।",
];

const toLines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export default function DosDontsSection() {
  const [heading, setHeading] = useState("आचरण नियम");
  const [subtitle, setSubtitle] = useState(DEFAULT_SUBTITLE);
  const [dos, setDos] = useState(DEFAULT_DOS);
  const [donts, setDonts] = useState(DEFAULT_DONTS);

  useEffect(() => {
    let cancelled = false;
    fetchContent("conduct-rules").then((c) => {
      if (cancelled || !isManaged(c)) return;
      if (c?.title) setHeading(c.title);
      const items = c?.items && !Array.isArray(c.items) ? c.items : null;
      if (items?.subtitle) setSubtitle(items.subtitle);
      if (items?.doList) setDos(toLines(items.doList));
      if (items?.dontList) setDonts(toLines(items.dontList));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="w-full py-16 bg-[#FFF4E6]">

      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl text-[#B30000] mb-2">{heading}</h2>
        <p className="text-[#FF6B00]">{subtitle}</p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 px-4">

        {/* Do's Card */}
        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="text-xl text-[#2A2A2A] mb-4">Do’s</h3>

          <div className="space-y-3 text-[15px] text-gray-700">
            {dos.map((rule, i) => (
              <p key={i} className="flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-1 shrink-0" size={18} />
                {rule}
              </p>
            ))}
          </div>
        </div>

        {/* Don'ts Card */}
        <div className="bg-white/90 p-6 rounded-xl shadow-md">
          <h3 className="text-xl text-[#2A2A2A] mb-4">Don’ts</h3>

          <div className="space-y-3 text-[15px] text-gray-700">
            {donts.map((rule, i) => (
              <p key={i} className="flex items-start gap-2">
                <XCircle className="text-red-600 mt-1 shrink-0" size={18} />
                {rule}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
