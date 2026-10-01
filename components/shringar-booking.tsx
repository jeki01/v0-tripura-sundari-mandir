"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { API_BASE, type ShringarAvailability } from "@/lib/api"

const MONTHS = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
const WEEKDAYS = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"]
const WEEKDAYS_LONG = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"]

const pad = (n: number) => String(n).padStart(2, "0")
const ymd = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const parts = (s: string) => s.split("-").map(Number) as [number, number, number]

function longLabel(s: string) {
  const [y, m, d] = parts(s)
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay()
  return `${d} ${MONTHS[m - 1]} ${y} (${WEEKDAYS_LONG[wd]})`
}

type Step = "idle" | "form" | "done"

// Visitors only ever see which dates are free. Bookings are reviewed by the temple team in the admin portal.
export default function ShringarBooking({ initial }: { initial: ShringarAvailability | null }) {
  const [avail, setAvail] = useState<ShringarAvailability | null>(initial)
  const [loadError, setLoadError] = useState(false)
  const [monthIdx, setMonthIdx] = useState(0)
  const [selected, setSelected] = useState("")
  const [step, setStep] = useState<Step>("idle")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("") // honeypot — humans never see or fill this
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [bookedDate, setBookedDate] = useState("")

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/shringar/availability`, { cache: "no-store" })
      const json = await res.json()
      if (res.ok && json?.data) {
        setAvail(json.data)
        setLoadError(false)
      } else setLoadError(true)
    } catch {
      setLoadError(true)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const unavailable = useMemo(() => new Set(avail?.unavailable || []), [avail])

  // The 6 calendar months: current + next 5
  const months = useMemo(() => {
    if (!avail) return []
    const [y, m] = parts(avail.from)
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(Date.UTC(y, m - 1 + i, 1))
      return { y: d.getUTCFullYear(), m: d.getUTCMonth() }
    })
  }, [avail])

  const isOpen = useCallback(
    (date: string) => !!avail && date > avail.from && date <= avail.to && !unavailable.has(date),
    [avail, unavailable],
  )

  const openDates = useMemo(() => {
    if (!avail) return []
    const out: string[] = []
    for (const { y, m } of months) {
      const days = new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
      for (let d = 1; d <= days; d++) if (isOpen(ymd(y, m, d))) out.push(ymd(y, m, d))
    }
    return out
  }, [months, isOpen])

  const openForm = (date?: string) => {
    setError("")
    if (date) setSelected(date)
    setStep("form")
  }
  const close = () => {
    if (busy) return
    setStep("idle")
    if (step === "done") {
      setName("")
      setPhone("")
      setEmail("")
      setSelected("")
    }
  }

  useEffect(() => {
    if (step === "idle") return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, busy])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!selected) return setError("कृपया एक उपलब्ध तिथि चुनें")
    setBusy(true)
    try {
      const res = await fetch(`${API_BASE}/shringar/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, date: selected, website }),
      })
      const json = await res.json().catch(() => ({}))
      if (res.ok && json.success) {
        setBookedDate(selected)
        setStep("done")
        refresh()
      } else {
        setError(json.message || "कुछ गड़बड़ हुई, कृपया पुनः प्रयास करें")
        if (res.status === 409) {
          setSelected("")
          refresh()
        }
      }
    } catch {
      setError("नेटवर्क में समस्या है, कृपया पुनः प्रयास करें")
    } finally {
      setBusy(false)
    }
  }

  if (!avail && loadError) {
    return (
      <p className="temple-card mx-auto max-w-xl px-6 py-8 text-center text-[#5A4636]">
        बुकिंग कैलेंडर अभी उपलब्ध नहीं है। कृपया कुछ देर बाद प्रयास करें या मंदिर टीम से संपर्क करें।
      </p>
    )
  }
  if (!avail) {
    return (
      <div className="flex items-center justify-center py-16 text-[#B30000]">
        <Loader2 className="animate-spin" size={30} />
      </div>
    )
  }

  const cur = months[monthIdx]
  const firstWd = new Date(Date.UTC(cur.y, cur.m, 1)).getUTCDay()
  const daysInMonth = new Date(Date.UTC(cur.y, cur.m + 1, 0)).getUTCDate()
  const cells: (number | null)[] = [...Array(firstWd).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div className="mx-auto max-w-4xl">
      <div className="temple-card overflow-hidden">
        {/* Month header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-3 py-3 text-white sm:px-5">
          <button
            type="button"
            onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
            disabled={monthIdx === 0}
            aria-label="पिछला महीना"
            className="rounded-full p-2 transition hover:bg-white/15 disabled:opacity-30"
          >
            <ChevronLeft size={22} />
          </button>
          <h2 className="font-display text-xl text-[#FFE27A] sm:text-2xl" aria-live="polite">
            {MONTHS[cur.m]} {cur.y}
          </h2>
          <button
            type="button"
            onClick={() => setMonthIdx((i) => Math.min(months.length - 1, i + 1))}
            disabled={monthIdx === months.length - 1}
            aria-label="अगला महीना"
            className="rounded-full p-2 transition hover:bg-white/15 disabled:opacity-30"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Month chips */}
        <div className="flex gap-2 overflow-x-auto border-b border-[#C8941A]/25 px-3 py-2.5 sm:justify-center">
          {months.map((mo, i) => (
            <button
              key={`${mo.y}-${mo.m}`}
              type="button"
              onClick={() => setMonthIdx(i)}
              aria-pressed={i === monthIdx}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition sm:text-sm ${
                i === monthIdx ? "bg-[#B30000] text-white" : "bg-[#FFF4E6] text-[#8F0000] hover:bg-[#FFE9B8]"
              }`}
            >
              {MONTHS[mo.m]}
            </button>
          ))}
        </div>

        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#8F0000] sm:gap-2 sm:text-sm">
            {WEEKDAYS.map((w) => (
              <div key={w} className="py-1">
                {w}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1 sm:gap-2">
            {cells.map((d, i) => {
              if (d === null) return <div key={`b${i}`} />
              const date = ymd(cur.y, cur.m, d)
              const open = isOpen(date)
              const picked = selected === date
              const past = date <= avail.from
              return (
                <button
                  key={date}
                  type="button"
                  disabled={!open}
                  onClick={() => (picked ? openForm(date) : setSelected(date))}
                  aria-label={`${longLabel(date)} — ${open ? "उपलब्ध" : past ? "बीत चुकी तिथि" : "उपलब्ध नहीं"}`}
                  aria-pressed={picked}
                  className={`aspect-square rounded-lg border text-sm font-semibold transition sm:rounded-xl sm:text-base ${
                    picked
                      ? "border-[#B30000] bg-gradient-to-b from-[#B30000] to-[#8F0000] text-white shadow-lg"
                      : open
                        ? "border-[#E0A100]/70 bg-[#FFF9E8] text-[#6B0000] hover:-translate-y-0.5 hover:bg-[#FFE27A]"
                        : past
                          ? "border-transparent bg-transparent text-[#B8A892]"
                          : "border-transparent bg-[#EFE3D2] text-[#A39078] line-through"
                  }`}
                >
                  {d}
                </button>
              )
            })}
          </div>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#5A4636]">
            <li className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded border border-[#E0A100]/70 bg-[#FFF9E8]" /> उपलब्ध
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded bg-[#EFE3D2]" /> उपलब्ध नहीं
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded bg-[#B30000]" /> आपकी चुनी तिथि
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => openForm()}
          disabled={openDates.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] px-10 py-3.5 text-lg font-bold text-[#6B0000] shadow-lg transition hover:-translate-y-0.5 disabled:opacity-50"
        >
          <CalendarDays size={20} />
          {selected ? `${longLabel(selected).split(" (")[0]} के लिए बुकिंग करें` : "बुकिंग करें"}
        </button>
        <p className="text-center text-sm text-[#5A4636]">आप अगले 6 महीनों की तिथियाँ देख और बुक कर सकते हैं।</p>
      </div>

      {/* Booking dialog */}
      {step !== "idle" && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="श्रृंगार बुकिंग"
            className="temple-card my-auto w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-5 py-3.5">
              <h3 className="font-display text-lg text-[#FFE27A]">{step === "done" ? "धन्यवाद" : "श्रृंगार बुकिंग"}</h3>
              <button type="button" onClick={close} aria-label="बंद करें" className="rounded-full p-1 text-white hover:bg-white/15">
                <X size={20} />
              </button>
            </div>

            {step === "done" ? (
              <div className="space-y-4 p-6 text-center">
                <CheckCircle2 size={56} className="mx-auto text-green-600" />
                <p className="text-lg font-semibold text-[#6B0000]">आपका बुकिंग अनुरोध प्राप्त हो गया है</p>
                <p className="rounded-lg bg-[#FFF4E6] py-2 font-semibold text-[#8F0000]">{longLabel(bookedDate)}</p>
                <p className="leading-relaxed text-[#3A2A1A]">मंदिर की टीम शीघ्र ही आपसे संपर्क करेगी और बुकिंग की पुष्टि करेगी।</p>
                <p className="font-display text-[#8F0000]">॥ जय श्री माँ त्रिपुरा सुंदरी ॥</p>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-8 py-2.5 font-semibold text-white shadow hover:brightness-110"
                >
                  ठीक है
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 p-5 sm:p-6">
                <div>
                  <label htmlFor="sb-name" className="mb-1 block text-sm font-medium text-[#5A4636]">
                    नाम <span className="text-[#B30000]">*</span>
                  </label>
                  <input
                    id="sb-name"
                    required
                    minLength={2}
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>
                <div>
                  <label htmlFor="sb-phone" className="mb-1 block text-sm font-medium text-[#5A4636]">
                    मोबाइल नंबर <span className="text-[#B30000]">*</span>
                  </label>
                  <input
                    id="sb-phone"
                    required
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="10 अंकों का नंबर"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>
                <div>
                  <label htmlFor="sb-email" className="mb-1 block text-sm font-medium text-[#5A4636]">
                    ईमेल <span className="text-xs text-[#8A7660]">(वैकल्पिक)</span>
                  </label>
                  <input
                    id="sb-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                </div>
                <div>
                  <label htmlFor="sb-date" className="mb-1 block text-sm font-medium text-[#5A4636]">
                    उपलब्ध तिथि चुनें <span className="text-[#B30000]">*</span>
                  </label>
                  <select
                    id="sb-date"
                    required
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  >
                    <option value="">— तिथि चुनें —</option>
                    {months.map((mo) => {
                      const dates = openDates.filter((d) => d.startsWith(`${mo.y}-${pad(mo.m + 1)}`))
                      if (!dates.length) return null
                      return (
                        <optgroup key={`${mo.y}-${mo.m}`} label={`${MONTHS[mo.m]} ${mo.y}`}>
                          {dates.map((d) => (
                            <option key={d} value={d}>
                              {longLabel(d)}
                            </option>
                          ))}
                        </optgroup>
                      )
                    })}
                  </select>
                </div>

                {/* honeypot */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </label>
                </div>

                {error && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] py-3 font-semibold text-white shadow transition hover:brightness-110 disabled:opacity-60"
                >
                  {busy && <Loader2 size={18} className="animate-spin" />}
                  {busy ? "भेजा जा रहा है..." : "बुकिंग अनुरोध भेजें"}
                </button>
                <p className="text-center text-xs text-[#8A7660]">यह एक अनुरोध है — मंदिर टीम आपसे संपर्क करके पुष्टि करेगी।</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
