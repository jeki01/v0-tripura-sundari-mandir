"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from 'lucide-react'

interface HeroSectionProps {
  onContentLoad?: () => void
}

export default function HeroSection({ onContentLoad }: HeroSectionProps) {
  // Signal parent when content is loaded (for GlobalLoader)
  useEffect(() => {
    if (onContentLoad) {
      // Simulate content loading completion
      const timer = setTimeout(() => {
        onContentLoad()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [onContentLoad])

  return (
    <section id="home" className="relative">
      {/* Hero Video Section - Vimeo Embed */}
      <div className="bg-gradient-to-b from-[#FFF4E6] via-[#FDF0D5] to-[#FFF4E6] py-2 sm:py-4 md:py-6 lg:py-8 xl:py-12 mt-16 xs:mt-18 sm:mt-20 md:mt-22 lg:mt-24 xl:mt-28">
        <div className="container mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8">
          <div className="relative max-w-7xl mx-auto">
            {/* Video Container with Vimeo Embed */}
            <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl shadow-md sm:shadow-lg md:shadow-xl lg:shadow-2xl border border-white/20 sm:border-2 md:border-3 lg:border-4 border-white/30 backdrop-blur-sm">
              {/* Vimeo Responsive Embed */}
              <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                <iframe
                  src="https://player.vimeo.com/video/1094667429?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  title="Shree Tripura Sundari Mandir - Aerial View"
                  className="rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl"
                />
              </div>

              {/* Video Title Overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
                🎥 श्री त्रिपुरा सुंदरी मंदिर - Aerial View
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => {
                  const iframe = document.querySelector('iframe[src*="vimeo.com"]') as HTMLIFrameElement
                  if (iframe && iframe.requestFullscreen) {
                    iframe.requestFullscreen()
                  }
                }}
                className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10 group"
                aria-label="Fullscreen"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>

              {/* Decorative Corner Accents */}
              <div className="absolute inset-0 hidden lg:block pointer-events-none z-10">
                <div className="absolute top-4 left-4 w-6 h-6 lg:w-8 lg:h-8 border-l-2 border-t-2 border-white/40 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-6 h-6 lg:w-8 lg:h-8 border-r-2 border-t-2 border-white/40 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 lg:w-8 lg:h-8 border-l-2 border-b-2 border-white/40 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 lg:w-8 lg:h-8 border-r-2 border-b-2 border-white/40 rounded-br-lg"></div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 hidden lg:block pointer-events-none">
              <div className="absolute -top-1 -left-1 lg:-top-2 lg:-left-2 w-2 h-2 lg:w-3 lg:h-3 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 w-2 h-2 lg:w-3 lg:h-3 bg-white/35 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute -bottom-1 -left-1 lg:-bottom-2 lg:-left-2 w-2 h-2 lg:w-3 lg:h-3 bg-white/35 rounded-full animate-pulse delay-500"></div>
              <div className="absolute -bottom-1 -right-1 lg:-bottom-2 lg:-right-2 w-2 h-2 lg:w-3 lg:h-3 bg-white/40 rounded-full animate-pulse delay-1500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content Section */}
      <div className="bg-[#FFF4E6] py-6 xs:py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-2 md:opacity-3 lg:opacity-5 hidden md:block">
          <div className="absolute top-20 left-20 w-24 h-24 lg:w-32 lg:h-32 border-2 lg:border-4 border-[#FF6B00] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 lg:w-24 lg:h-24 border-2 lg:border-4 border-[#B30000] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 lg:w-16 lg:h-16 border-2 lg:border-4 border-[#FFD700] rounded-full"></div>
        </div>

        <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 text-center relative z-10">
          {/* Main Heading */}
          <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-[#B30000] mb-3 xs:mb-4 sm:mb-5 md:mb-6 leading-tight px-2">
              जय श्री माँ त्रिपुरा सुंदरी
            </h1>
            <div className="w-12 xs:w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40 h-0.5 xs:h-1 sm:h-1.5 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#FF6B00] mx-auto mb-3 xs:mb-4 sm:mb-6 md:mb-8 rounded-full"></div>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-[#FF6B00] font-medium leading-relaxed max-w-5xl mx-auto px-2">
              एक आधुनिक डिजिटल मंच – आस्था, संस्कृति और सेवा का संगम
            </p>
          </div>

          {/* Subtitle */}
          <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12">
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
              श्री त्रिपुरा सुंदरी मंदिर और पंचाल समाज 14 चोखरा का आधिकारिक डिजिटल पोर्टल
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-6 justify-center items-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-3 xs:px-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-[#B30000] via-[#FF6B00] to-[#B30000] hover:from-[#FF6B00] hover:via-[#FFD700] hover:to-[#FF6B00] text-white text-sm xs:text-base sm:text-lg md:text-xl px-4 xs:px-6 sm:px-8 md:px-10 py-2.5 xs:py-3 sm:py-4 md:py-5 font-bold rounded-full shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/20 touch-manipulation"
              onClick={() => {
                const element = document.querySelector('#darshan-live')
                if (element) {
                  const headerHeight = 80
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerHeight
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              <Play className="mr-1.5 xs:mr-2 sm:mr-3" size={16} />
              Live Darshan
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 md:border-3 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white text-sm xs:text-base sm:text-lg md:text-xl px-4 xs:px-6 sm:px-8 md:px-10 py-2.5 xs:py-3 sm:py-4 md:py-5 font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md sm:shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm touch-manipulation"
              onClick={() => {
                const element = document.querySelector('#pujas')
                if (element) {
                  const headerHeight = 80
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                  const offsetPosition = elementPosition - headerHeight
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Online Seva
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-2">
            <div className="bg-white/90 backdrop-blur-sm p-3 xs:p-4 sm:p-6 md:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-[#FF6B00]/15 sm:border-2 border-[#FF6B00]/20 shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FF6B00] to-[#B30000] rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Play className="text-white w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-[#B30000] mb-1 xs:mb-2 sm:mb-3">
                Live Darshan
              </h3>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base">गर्भगृह से सीधा दर्शन</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-3 xs:p-4 sm:p-6 md:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-[#FF6B00]/15 sm:border-2 border-[#FF6B00]/20 shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#FFD700] to-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-[#B30000] font-bold text-sm xs:text-base sm:text-lg md:text-xl">पूजा</span>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-[#B30000] mb-1 xs:mb-2 sm:mb-3">
                Online Pujas
              </h3>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base">घर बैठे पूजा बुकिंग</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-3 xs:p-4 sm:p-6 md:p-8 rounded-xl xs:rounded-2xl sm:rounded-3xl border border-[#FF6B00]/15 sm:border-2 border-[#FF6B00]/20 shadow-md sm:shadow-lg md:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 group sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#B30000] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm xs:text-base sm:text-lg md:text-xl">समाज</span>
              </div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-[#B30000] mb-1 xs:mb-2 sm:mb-3">
                Community
              </h3>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base">पंचाल समाज सेवाएं</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vimeo Player API Script */}
      <script src="https://player.vimeo.com/api/player.js" async />
    </section>
  )
}
