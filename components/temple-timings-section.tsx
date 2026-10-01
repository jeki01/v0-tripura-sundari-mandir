"use client"

import { useState, useEffect } from "react"
import { Sun, Snowflake } from "lucide-react"
import { fetchContent, isManaged } from "@/lib/api"
import { SectionHeading } from "@/components/ornaments"

const DEFAULT_TIMINGS = [
  { activity: "मंदिर खुलने का समय", summer: "5:00 AM", winter: "5:30 AM" },
  { activity: "दर्शन प्रारंभ", summer: "6:00 AM", winter: "7:00 AM" },
  { activity: "मंगला आरती", summer: "7:00 AM", winter: "7:30 AM" },
  { activity: "भोग धारण", summer: "12:00 PM", winter: "12:00 PM" },
  { activity: "विश्राम", summer: "1:00 - 2:30 PM", winter: "1:00 - 2:30 PM" },
  { activity: "संध्या आरती", summer: "7:15 PM", winter: "6:30 PM" },
  { activity: "मंदिर बंद होने का समय", summer: "9:00 PM", winter: "8:30 PM" },
]

const DEFAULT_WINTER_RANGE = "16 अक्टूबर – 28 फरवरी"
const DEFAULT_SUMMER_RANGE = "1 मार्च – 15 अक्टूबर"

export default function TempleTimingsSection() {
  const [timings, setTimings] = useState(DEFAULT_TIMINGS)
  const [winterRange, setWinterRange] = useState(DEFAULT_WINTER_RANGE)
  const [summerRange, setSummerRange] = useState(DEFAULT_SUMMER_RANGE)

  useEffect(() => {
    let cancelled = false
    fetchContent("temple-timings").then((c) => {
      if (cancelled || !isManaged(c)) return
      if (Array.isArray(c?.items) && c.items.length > 0) {
        setTimings(
          c.items.map((it: any) => ({ activity: it.activity || "", summer: it.summer || "", winter: it.winter || "" }))
        )
      }
    })
    fetchContent("temple-season-dates").then((c) => {
      if (cancelled || !isManaged(c)) return
      const items = c?.items && !Array.isArray(c.items) ? c.items : null
      if (items?.winterRange) setWinterRange(items.winterRange)
      if (items?.summerRange) setSummerRange(items.summerRange)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // 🔥 Detect current season
  const getCurrentSeason = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()

    if ((month === 3 && day >= 1) || (month >= 4 && month <= 9) || (month === 10 && day <= 15)) {
      return "summer"
    } else {
      return "winter"
    }
  }

  const [season, setSeason] = useState<"summer" | "winter">("winter")

  useEffect(() => {
    setSeason(getCurrentSeason())
  }, [])

  const isSummer = season === "summer"

  return (
    <section id="temple-timings" className="bg-[#FFF4E6] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="मंदिर समय सारणी"
          subtitle={`आज का समय: ${isSummer ? "ग्रीष्मकाल" : "शीतकाल"}`}
        />

        {/* Season toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-[#C8941A]/60 bg-white p-1 shadow-sm" role="group" aria-label="मौसम चुनें">
            <button
              type="button"
              aria-pressed={isSummer}
              onClick={() => setSeason("summer")}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition ${
                isSummer ? "bg-gradient-to-b from-[#FF9A1F] to-[#E06A00] text-white shadow" : "text-[#C25400] hover:bg-[#FFF4E6]"
              }`}
            >
              <Sun size={15} />
              ग्रीष्मकाल
            </button>
            <button
              type="button"
              aria-pressed={!isSummer}
              onClick={() => setSeason("winter")}
              className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition ${
                !isSummer ? "bg-gradient-to-b from-[#4A6A94] to-[#2D4565] text-white shadow" : "text-[#2D4565] hover:bg-[#FFF4E6]"
              }`}
            >
              <Snowflake size={15} />
              शीतकाल
            </button>
          </div>
        </div>

        <div className="temple-card mx-auto max-w-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-6 py-5 text-center text-white">
            <h3 className="font-display text-xl text-[#FFE27A]">श्री त्रिपुरा सुंदरी मंदिर</h3>
            <div className="mt-2 space-y-0.5 text-sm text-[#FFE9B8]">
              <p>
                <Snowflake className="mr-1 inline" size={13} /> शीतकाल: {winterRange}
              </p>
              <p>
                <Sun className="mr-1 inline" size={13} /> ग्रीष्मकाल: {summerRange}
              </p>
            </div>
          </div>

          <ul className="divide-y divide-[#C8941A]/20 px-4 py-2 sm:px-6">
            {timings.map((item, index) => (
              <li key={index} className="flex items-center justify-between gap-4 py-3 text-sm sm:text-base">
                <span className="font-medium text-[#8F0000]">{item.activity}</span>
                <span className="h-px flex-1 border-t border-dotted border-[#C8941A]/60" aria-hidden="true" />
                <span
                  className={`whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold ${
                    isSummer ? "bg-[#FFE9CC] text-[#B04A00]" : "bg-[#E3ECF7] text-[#2D4565]"
                  }`}
                >
                  {isSummer ? item.summer : item.winter}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
