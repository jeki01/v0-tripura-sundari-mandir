"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Bell, Camera, Video, Shield, Globe, WifiOff } from 'lucide-react'
import Image from "next/image"

const IS_CURRENTLY_LIVE = true; // change to false if offline
const YOUTUBE_CHANNEL_ID = "UClQYJEOUrS2WS4a5-8yD7cQ"; // test live channel (replace with your real one)

export default function LiveDarshanSection() {
  return (
    <section id="darshan-live" className="py-16 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Video className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000]">Live Darshan</h2>
          </div>
          {IS_CURRENTLY_LIVE ? (
            <p className="text-[#00B300] text-xl font-medium">LIVE Now from Garbh Grah</p>
          ) : (
            <p className="text-[#B30000] text-xl font-medium">Darshan Currently Offline</p>
          )}
          <p className="text-gray-600 mt-2">श्री त्रिपुरा सुंदरी मंदिर - गर्भगृह से सीधा दर्शन</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="border-4 border-[#FF6B00] shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
              <div className="flex items-center justify-center mb-2">
                <Camera className="text-[#FFD700] mr-2" size={24} />
                <CardTitle className="text-2xl">श्री त्रिपुरा सुंदरी दर्शन</CardTitle>
                <Camera className="text-[#FFD700] ml-2" size={24} />
              </div>
              <p className="text-[#FFD700] font-medium">Live Darshan from Sacred Garbh Grah</p>
            </CardHeader>

            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video bg-black relative overflow-hidden flex items-center justify-center">
                  {IS_CURRENTLY_LIVE ? (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1&mute=1&controls=1&rel=0`}
                      title="Shree Tripura Sundari Mandir - Live Darshan"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <Image
                      src="/images/garbh-grah-darshan.jpg"
                      alt="Darshan is currently offline"
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </div>

                {IS_CURRENTLY_LIVE ? (
                  <div className="absolute top-4 left-4 bg-[#00B300] text-white px-3 py-1 rounded-full text-sm font-bold flex items-center animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping" />
                    LIVE DARSHAN
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <WifiOff className="w-4 h-4 mr-2" />
                    OFFLINE
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-[#FFD700] text-[#B30000] px-3 py-1 rounded-lg text-sm font-bold">
                  गर्भगृह - Garbh Grah
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
