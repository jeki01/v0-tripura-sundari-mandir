"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Mail, Phone, Sparkles } from "lucide-react"
import { Lotus, SectionHeading } from "@/components/ornaments"

const shringarSchedule = [
  { day: "सोमवार", color: "सफेद", swatch: "#FFFFFF", image: "/images/shringar/somwar-monday.jpg", description: "शुद्धता और शांति का प्रतीक सफेद वस्त्र" },
  { day: "मंगलवार", color: "लाल", swatch: "#C1121F", image: "/images/shringar/mangalwar-tuesday.jpg", description: "शक्ति और साहस का प्रतीक लाल वस्त्र" },
  { day: "बुधवार", color: "हरा", swatch: "#2E7D32", image: "/images/shringar/budhwar-wednesday.jpg", description: "प्रकृति और समृद्धि का प्रतीक हरा वस्त्र" },
  { day: "गुरुवार", color: "पीला", swatch: "#F4C20D", image: "/images/shringar/guruwar-thursday.jpg", description: "ज्ञान और प्रकाश का प्रतीक पीला वस्त्र" },
  { day: "शुक्रवार", color: "नारंगी", swatch: "#FF7A00", image: "/images/shringar/shukrawar-friday.jpg", description: "उत्साह और ऊर्जा का प्रतीक नारंगी वस्त्र" },
  { day: "शनिवार", color: "आसमानी", swatch: "#5BB5E8", image: "/images/shringar/shanivar-saturday.jpg", description: "शांति और विस्तार का प्रतीक आसमानी वस्त्र" },
  { day: "रविवार", color: "स्वर्ण पंचरंगी", swatch: "linear-gradient(135deg,#FFD700,#FF6B00,#2E7D32,#5BB5E8,#C1121F)", image: "/images/shringar/ravivar-sunday.jpg", description: "दिव्यता और वैभव का प्रतीक स्वर्ण पंचरंगी वस्त्र" },
]

export default function ShringarScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(0)
  const [todayIndex, setTodayIndex] = useState<number | null>(null)

  // Schedule runs Monday..Sunday; JS getDay() runs Sunday..Saturday
  useEffect(() => {
    const idx = (new Date().getDay() + 6) % 7
    setTodayIndex(idx)
    setSelectedDay(idx)
  }, [])

  const current = shringarSchedule[selectedDay]

  return (
    <section id="shringar-schedule" className="bg-gradient-to-b from-[#FFF4E6] to-[#FDEBCB] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="माँ त्रिपुरा का साप्ताहिक श्रृंगार" subtitle="Weekly Divine Shringar Schedule" />

        {/* Day selector */}
        <div className="-mx-4 mb-10 overflow-x-auto px-4 pb-2">
          <div className="mx-auto flex w-max gap-2 sm:gap-3" role="tablist" aria-label="दिन चुनें">
            {shringarSchedule.map((item, index) => {
              const active = index === selectedDay
              return (
                <button
                  key={item.day}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedDay(index)}
                  className={`relative flex min-w-[5.5rem] flex-col items-center gap-1.5 rounded-2xl border px-3 py-3 text-sm transition ${
                    active
                      ? "border-[#B30000] bg-gradient-to-b from-[#B30000] to-[#8F0000] text-white shadow-lg"
                      : "border-[#C8941A]/50 bg-white/80 text-[#8F0000] hover:border-[#B30000]"
                  }`}
                >
                  <span
                    className="h-6 w-6 rounded-full border-2 border-[#E0A100] shadow-inner"
                    style={{ background: item.swatch }}
                    aria-hidden="true"
                  />
                  <span className="font-semibold">{item.day}</span>
                  <span className={`text-[11px] ${active ? "text-[#FFE9B8]" : "text-[#C25400]"}`}>{item.color}</span>
                  {index === todayIndex && (
                    <span className="absolute -top-2 right-1 rounded-full bg-[#E0A100] px-2 py-0.5 text-[10px] font-bold text-[#6B0000]">
                      आज
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected day */}
        <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="arch-frame relative mx-auto aspect-[9/14] w-full max-w-sm overflow-hidden border-[3px] border-[#E0A100] bg-[#2B0A0A] shadow-[0_0_0_6px_rgba(224,161,0,0.2),0_24px_40px_-18px_rgba(90,0,0,0.6)]">
            <Image
              key={current.image}
              src={current.image}
              alt={`${current.day} का श्रृंगार - ${current.color} वस्त्र`}
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              quality={72}
              className="animate-fade-up object-cover"
            />
          </div>

          <div className="temple-card p-6 md:p-8">
            <p className="mb-2 flex items-center gap-2 text-sm text-[#C25400]">
              <Lotus size={18} className="text-[#B30000]" />
              {current.color} वस्त्र
            </p>
            <h3 className="font-display text-2xl text-[#8F0000] md:text-3xl">{current.day} का श्रृंगार</h3>
            <p className="mt-4 leading-relaxed text-[#3A2A1A]">{current.description}</p>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedDay((selectedDay - 1 + 7) % 7)}
                className="inline-flex items-center gap-1 rounded-full border-2 border-[#B30000] px-5 py-2 text-sm font-semibold text-[#B30000] transition hover:bg-[#B30000] hover:text-white"
              >
                <ChevronLeft size={16} /> पिछला
              </button>
              <button
                type="button"
                onClick={() => setSelectedDay((selectedDay + 1) % 7)}
                className="inline-flex items-center gap-1 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-5 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110"
              >
                अगला <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="temple-card mx-auto mt-12 flex max-w-5xl items-start gap-3 p-4 md:p-5">
          <Heart className="mt-0.5 shrink-0 text-[#FF6B00]" size={18} />
          <p className="text-sm leading-relaxed text-[#3A2A1A]">
            नवरात्रि अष्टमी तथा कार्तिक पूर्णिमा के दिन श्रृंगार केवल मंदिर ट्रस्ट द्वारा किया जाता है।
          </p>
        </div>

        {/* Booking */}
        <div className="temple-card mx-auto mt-10 max-w-5xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-6 py-4 text-center">
            <h3 className="font-display text-lg text-[#FFE27A] md:text-xl">श्रृंगार बुकिंग</h3>
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
            <div className="space-y-3 text-[#3A2A1A]">
              <h4 className="font-display text-base text-[#8F0000]">संपर्क करें</h4>
              <p className="text-sm">
                <strong>प्रबंधक:</strong> जागेश पंचाल
              </p>
              <a href="tel:+918696851900" className="flex items-center gap-3 text-sm transition hover:text-[#B30000]">
                <Phone className="shrink-0 text-[#E0A100]" size={18} />
                +91 8696851900
              </a>
              <a
                href="mailto:shreetripurasundarimandir@gmail.com"
                className="flex items-center gap-3 text-sm transition hover:text-[#B30000]"
              >
                <Mail className="shrink-0 text-[#E0A100]" size={18} />
                <span className="break-all">shreetripurasundarimandir@gmail.com</span>
              </a>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <Sparkles className="mb-3 text-[#E0A100]" size={28} />
              <a
                href="tel:+918696851900"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] px-6 py-2.5 text-sm font-bold text-[#6B0000] shadow transition hover:-translate-y-0.5"
              >
                <ExternalLink size={16} />
                बुकिंग करें
              </a>
              <p className="mt-3 text-xs text-[#7A5A3A]">* बुकिंग के लिए पहले संपर्क करें</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
