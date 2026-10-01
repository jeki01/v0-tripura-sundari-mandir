"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { fetchContent, isManaged } from "@/lib/api";
import { SectionHeading } from "@/components/ornaments";

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
    <section id="conduct-rules" className="w-full bg-jali py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title={heading} subtitle={subtitle} />

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Do's */}
          <div className="temple-card overflow-hidden">
            <div className="bg-gradient-to-r from-[#2E7D32] to-[#4C9F50] px-6 py-3">
              <h3 className="font-display text-xl text-white">Do’s</h3>
            </div>
            <div className="space-y-3 p-6 text-[15px] text-[#3A2A1A]">
              {dos.map((rule, i) => (
                <p key={i} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 shrink-0 text-green-700" size={18} />
                  {rule}
                </p>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div className="temple-card overflow-hidden">
            <div className="bg-gradient-to-r from-[#8F0000] to-[#B30000] px-6 py-3">
              <h3 className="font-display text-xl text-white">Don’ts</h3>
            </div>
            <div className="space-y-3 p-6 text-[15px] text-[#3A2A1A]">
              {donts.map((rule, i) => (
                <p key={i} className="flex items-start gap-2">
                  <XCircle className="mt-1 shrink-0 text-red-700" size={18} />
                  {rule}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
