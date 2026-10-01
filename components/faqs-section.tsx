"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ornaments";
import { fetchContent, isManaged } from "@/lib/api";

const DEFAULT_FAQS = [
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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [heading, setHeading] = useState("अक्सर पूछे जाने वाले प्रश्न (FAQ)");

  useEffect(() => {
    let cancelled = false;
    fetchContent("faq").then((c) => {
      if (cancelled || !isManaged(c)) return;
      if (c?.title) setHeading(c.title);
      if (Array.isArray(c?.items) && c.items.length > 0) {
        setFaqs(c.items.map((it: any) => ({ q: it.question || "", a: it.answer || "" })));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="bg-[#FFF4E6] py-14 md:py-20">
      <div className="site-container">
        <SectionHeading title={heading} />

        <div className="temple-card mx-auto divide-y divide-[#C8941A]/25 p-2 sm:p-4">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={index}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-3 py-4 text-left"
                >
                  <span className={`text-[15px] font-medium ${open ? "text-[#B30000]" : "text-[#3A2A1A]"}`}>{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#B30000] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <p className="px-3 pb-4 text-sm leading-relaxed text-[#5A4636]">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
