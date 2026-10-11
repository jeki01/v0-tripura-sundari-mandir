"use client"

import { useEffect, useRef, useState } from "react"
import { Smartphone, X } from "lucide-react"
import CopyButton from "@/components/copy-button"
import { MAX_AMOUNT, MIN_AMOUNT, UPI_NOTE, parseAmount, upiLink } from "@/lib/upi"

const QUICK = [101, 251, 501, 1100, 2100, 5100]

// "UPI से दान करें": the visitor types the amount here, then the UPI app opens with the payee, that amount and the
// donation comment already filled in, so only the PIN is left to enter.
export default function UpiPay({ upiId, name, className = "" }: { upiId: string; name: string; className?: string }) {
  const [open, setOpen] = useState(false)
  const [raw, setRaw] = useState("")
  const [touched, setTouched] = useState(false)
  const [mobile, setMobile] = useState(true)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent))
  }, [])
  useEffect(() => {
    if (open) input.current?.focus()
  }, [open])

  const amount = parseAmount(raw)
  const invalid = touched && amount === null
  const href = amount !== null ? upiLink({ upiId, name, amount }) : ""

  const pay = (e?: React.FormEvent) => {
    e?.preventDefault()
    setTouched(true)
    if (amount === null) return
    window.location.href = href
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] px-6 py-2 text-sm font-bold text-[#6B0000] shadow transition hover:-translate-y-0.5 active:scale-95 ${className}`}
      >
        <Smartphone size={17} />
        UPI ऐप से भुगतान करें
      </button>
    )
  }

  return (
    <form onSubmit={pay} className={`mx-auto w-full max-w-sm rounded-xl border border-[#C8941A]/60 bg-white p-4 text-left shadow-sm ${className}`} aria-label="UPI से दान">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-display text-base text-[#8F0000]">दान की राशि दर्ज करें</p>
          <p className="mt-0.5 text-xs text-[#5A4636]">{name}</p>
          <p className="flex items-center gap-1 break-all text-xs font-semibold text-[#6B0000] [&_button]:!min-h-0 [&_button]:!min-w-0">
            {upiId} <CopyButton value={upiId} label="UPI ID" />
          </p>
        </div>
        <button type="button" onClick={() => setOpen(false)} aria-label="बंद करें" className="!min-h-0 !min-w-0 rounded-full p-1.5 text-[#8F0000] hover:bg-[#FFF4E6]">
          <X size={18} />
        </button>
      </div>

      <label className="mt-3 block">
        <span className="sr-only">राशि (₹)</span>
        <div className={`flex items-center rounded-lg border-2 bg-white px-3 ${invalid ? "border-red-500" : "border-[#C8941A]/70 focus-within:border-[#B30000]"}`}>
          <span className="text-lg font-semibold text-[#8F0000]">₹</span>
          <input
            ref={input}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={raw}
            onChange={(e) => setRaw(e.target.value.replace(/[^\d.]/g, ""))}
            onBlur={() => raw && setTouched(true)}
            placeholder="राशि लिखें"
            aria-invalid={invalid}
            aria-describedby="upi-amount-help"
            className="h-12 w-full bg-transparent px-2 text-lg font-semibold text-[#2F2218] outline-none placeholder:text-base placeholder:font-normal placeholder:text-[#9A7B5A]"
          />
        </div>
      </label>
      <p id="upi-amount-help" className={`mt-1 text-xs ${invalid ? "text-red-600" : "text-[#7A5A3A]"}`}>
        {invalid ? `₹${MIN_AMOUNT} से ₹${MAX_AMOUNT.toLocaleString("en-IN")} के बीच सही राशि लिखें (अधिकतम 2 दशमलव)।` : `₹${MIN_AMOUNT} से ₹${MAX_AMOUNT.toLocaleString("en-IN")} तक`}
      </p>

      <div className="mt-2 flex flex-wrap gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => {
              setRaw(String(q))
              setTouched(true)
            }}
            className={`!min-h-0 !min-w-0 rounded-full border px-3 py-1 text-sm font-medium transition active:scale-95 ${amount === q ? "border-[#B30000] bg-[#B30000] text-white" : "border-[#C8941A]/60 text-[#8F0000] hover:bg-[#FFF4E6]"}`}
          >
            ₹{q.toLocaleString("en-IN")}
          </button>
        ))}
      </div>

      <p className="mt-3 rounded-lg bg-[#FFF4E6] px-3 py-2 text-xs text-[#5A4636]">
        <span className="font-semibold text-[#8F0000]">भुगतान में टिप्पणी:</span> {UPI_NOTE}
      </p>

      <button
        type="submit"
        disabled={amount === null}
        className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-5 py-2.5 text-base font-bold text-white shadow transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Smartphone size={18} />
        {amount !== null ? `₹${amount.toLocaleString("en-IN")} का भुगतान करें` : "भुगतान करें"}
      </button>

      {!mobile && (
        <p className="mt-2 text-xs text-[#7A5A3A]">
          कंप्यूटर पर UPI ऐप नहीं खुलता। कृपया इसी पेज को मोबाइल पर खोलें, या ऊपर दी गई UPI ID कॉपी करके अपने UPI ऐप में भुगतान करें।
        </p>
      )}
    </form>
  )
}
