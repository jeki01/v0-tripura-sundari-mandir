"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Construction } from "lucide-react"

interface UnderDevelopmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UnderDevelopmentModal({ isOpen, onClose }: UnderDevelopmentModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center border-4 border-[#FF6B00]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/main-logo.png"
            alt="Tripura Sundari Mandir Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full border-4 border-[#FFD700]"
          />
        </div>

        {/* Message */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <Construction className="text-[#FF6B00] mr-2" size={24} />
            <h3 className="text-xl font-bold text-[#B30000]">विकास कार्य प्रगति पर है</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            अभी वेबसाइट का कार्य प्रगति पर है, कुछ समय में क्रियान्वित किया जाएगा। धन्यवाद।
          </p>
        </div>

        {/* Dismiss button */}
        <Button onClick={onClose} className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white px-8 py-3 text-lg font-bold">
          ठीक है
        </Button>
      </div>
    </div>
  )
}
