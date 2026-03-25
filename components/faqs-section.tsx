"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "मंदिर कब खुलता और बंद होता है?", a: "मंदिर सुबह 5:00 बजे खुलता है और रात 9:30 बजे बंद होता है।" },
    { q: "क्या दर्शन के लिए टिकट की आवश्यकता है?", a: "सामान्य दर्शन निःशुल्क है, विशेष पूजा के लिए शुल्क लागू होता है।" },
    { q: "क्या मोबाइल/कैमरा ले जाना अनुमति है?", a: "गर्भगृह में प्रतिबंधित, बाहर परिसर में अनुमति है।" },
    { q: "क्या लाइव दर्शन उपलब्ध है?", a: "हाँ, वेबसाइट पर लाइव दर्शन उपलब्ध है।" },
    { q: "क्या मंदिर में प्रसाद मिलता है?", a: "हाँ, सुबह और शाम दोनों समय प्रसाद वितरण होता है।" },
    { q: "क्या पार्किंग उपलब्ध है?", a: "हाँ, सभी गाड़ियों के लिए पार्किंग सुविधा उपलब्ध है।" },
    { q: "क्या ऑनलाइन पूजा बुकिंग उपलब्ध है?", a: "जल्द ही ऑनलाइन सुविधा उपलब्ध होगी।" },
    { q: "क्या व्हीलचेयर सुविधा है?", a: "हाँ, दिव्यांगों के लिए विशेष सुविधा उपलब्ध है।" },
    { q: "मंदिर का पता क्या है?", a: "श्री त्रिपुरा सुंदरी मंदिर, उमराई, तलवाड़ा, बांसवाड़ा, राजस्थान।" },
    { q: "अपडेट कहाँ मिलेंगे?", a: "हमारे सोशल मीडिया चैनलों पर सभी अपडेट मिलेंगे।" },
  ];

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="py-16 bg-[#FFF4E6]">

      {/* Title outside card */}
      <div className="text-center mb-10">
        <h2 className="text-2xl text-[#B30000]">
          अक्सर पूछे जाने वाले प्रश्न (FAQ)
        </h2>
      </div>

      {/* Single Card */}
      <Card className="rounded-2xl shadow-md bg-white/90 max-w-3xl mx-auto">
        <CardContent className="p-8">

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer"
                onClick={() => toggle(index)}
              >
                {/* Question Row */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-[14px] text-gray-700">
                    {item.q}
                  </span>
                  <span className="text-lg text-[#B30000]">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>

                {/* Answer */}
                {openIndex === index && (
                  <p className="mt-1 text-[13px] text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                )}

                {/* Divider */}
                <div className="h-px bg-gray-200 mt-3"></div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>
    </section>
  );
}