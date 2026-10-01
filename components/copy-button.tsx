"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

// Small "copy to clipboard" control used for bank details / UPI IDs
export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement("textarea")
      ta.value = value
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      document.body.removeChild(ta)
    }
    setDone(true)
    setTimeout(() => setDone(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label} कॉपी करें`}
      title={`${label} कॉपी करें`}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
        done ? "border-green-600 bg-green-600 text-white" : "border-[#C8941A]/60 text-[#B30000] hover:bg-[#B30000] hover:text-white"
      }`}
    >
      {done ? <Check size={15} /> : <Copy size={14} />}
    </button>
  )
}
