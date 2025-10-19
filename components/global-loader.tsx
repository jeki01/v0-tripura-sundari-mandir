"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simple loading timer
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      {/* Simple Loader Container */}
      <div className="relative">
        {/* Circular Animation */}
        <div className="w-20 h-20 border-4 border-gray-200 border-t-[#FF6B00] rounded-full animate-spin"></div>

        {/* Logo in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/main-logo.png"
            alt="Temple Logo"
            width={40}
            height={40}
            className="w-10 h-10 object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
