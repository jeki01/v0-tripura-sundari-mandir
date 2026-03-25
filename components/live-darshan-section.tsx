"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Video, WifiOff, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const IS_CURRENTLY_LIVE = true
const YOUTUBE_CHANNEL_ID = "UClQYJEOUrS2WS4a5-8yD7cQ"

export default function LiveDarshanSection() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section id="darshan-live" className="py-16 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-3">
            <Video className="text-[#B30000] mr-2" size={28} />
            <h2 className="text-3xl font-bold text-[#B30000]">
              लाइव दर्शन
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            श्री त्रिपुरा सुंदरी मंदिर - गर्भगृह से सीधा प्रसारण
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="rounded-2xl overflow-hidden shadow-lg">

            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center py-4">
              <div className="flex items-center justify-center gap-2">
                <Camera className="text-[#FFD700]" size={20} />
                <CardTitle className="text-lg">
                  श्री त्रिपुरा सुंदरी मंदिर
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="relative aspect-video bg-black">

                {/* VIDEO / IMAGE */}
                {IS_CURRENTLY_LIVE && !videoError ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1&mute=1`}
                    title="Live Darshan"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  <Image
                    src="/images/garbh-grah-darshan.jpg"
                    alt="Darshan Offline"
                    fill
                    className="object-cover"
                  />
                )}

                {/* Overlay for Error */}
                {videoError && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center px-4">
                    <AlertTriangle className="text-yellow-400 mb-3" size={32} />

                    <p className="text-white font-semibold text-lg">
                      वीडियो उपलब्ध नहीं है
                    </p>

                    <p className="text-gray-300 text-sm mt-2 max-w-md">
                      तकनीकी समस्या के कारण लाइव दर्शन उपलब्ध नहीं है।
                      कृपया हमारे सोशल मीडिया चैनल पर अन्य वीडियो देखें।
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4 mt-4 text-sm">
                      <Link href="https://www.youtube.com/@shreetripurasundari" target="_blank" className="text-red-400 hover:underline">
                        YouTube
                      </Link>
                      <Link href="https://www.instagram.com/maa_tripura_sunadari_mandir" target="_blank" className="text-pink-400 hover:underline">
                        Instagram
                      </Link>
                      <Link href="https://www.facebook.com/profile.php?id=61579670115975" target="_blank" className="text-blue-400 hover:underline">
                        Facebook
                      </Link>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {IS_CURRENTLY_LIVE && !videoError ? (
                    <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      LIVE
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                      <WifiOff size={14} />
                      OFFLINE
                    </div>
                  )}
                </div>

              </div>
            </CardContent>

          </Card>
        </div>

      </div>
    </section>
  )
}