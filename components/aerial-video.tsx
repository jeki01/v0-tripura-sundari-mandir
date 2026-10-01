"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { SectionHeading } from "@/components/ornaments"

const VIMEO_SRC = "https://player.vimeo.com/video/1094667429?badge=0&autoplay=1&title=0&byline=0&portrait=0&dnt=1"

// The Vimeo player is only requested after the visitor presses play, so it no longer
// competes with the page's own content for bandwidth on first load.
export default function AerialVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="aerial-view" className="bg-jali py-14 md:py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="आकाश से दर्शन" subtitle="श्री त्रिपुरा सुंदरी मंदिर परिसर का हवाई दृश्य" />

        <div className="temple-card mx-auto max-w-5xl p-2 sm:p-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
            {playing ? (
              <iframe
                src={VIMEO_SRC}
                title="श्री त्रिपुरा सुंदरी मंदिर - हवाई दृश्य"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="हवाई दृश्य वीडियो चलाएँ"
                className="group absolute inset-0 block h-full w-full"
              >
                <Image
                  src="/images/temple-5.jpg"
                  alt="मंदिर परिसर का हवाई दृश्य"
                  fill
                  sizes="(min-width: 1024px) 960px, 100vw"
                  quality={70}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#2B0A0A]/70 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] text-[#6B0000] shadow-[0_0_0_8px_rgba(255,215,0,0.25)] transition group-hover:scale-110">
                  <Play size={30} fill="currentColor" className="ml-1" />
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
                  वीडियो देखें · Aerial View
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
