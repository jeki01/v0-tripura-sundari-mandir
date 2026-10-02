"use client"

import { useState } from "react"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { API_BASE } from "@/lib/api"
import PhotoPicker from "@/components/photo-picker"

const field =
  "w-full rounded-lg border border-[#C8941A]/50 bg-white p-3 text-[#3A2A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
const label = "mb-1 block text-sm font-medium text-[#8F0000]"
const button =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-b from-[#B30000] to-[#8F0000] px-6 py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60 sm:w-auto"

async function send(kind: "testimonial" | "grievance", values: Record<string, string>, photos: File[]) {
  const form = new FormData()
  Object.entries(values).forEach(([k, v]) => form.append(k, v))
  photos.forEach((p) => form.append("images", p, p.name))
  try {
    const res = await fetch(`${API_BASE}/submissions/${kind}`, { method: "POST", body: form })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.success) return { ok: true as const, ref: json.data?.ref as string }
    return { ok: false as const, message: (json.message as string) || "भेजा नहीं जा सका, कृपया पुनः प्रयास करें" }
  } catch {
    return { ok: false as const, message: "इंटरनेट / सर्वर की समस्या — कृपया कुछ देर बाद पुनः प्रयास करें" }
  }
}

// The hidden "website" box is for bots only; people never see or fill it.
const Honeypot = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
    <label>
      Website
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  </div>
)

function Done({ title, ref_, text, onAgain }: { title: string; ref_?: string; text: string; onAgain: () => void }) {
  return (
    <div className="py-6 text-center" role="status">
      <CheckCircle2 className="mx-auto mb-3 text-[#2E7D32]" size={44} />
      <h3 className="font-display text-xl text-[#8F0000]">{title}</h3>
      {ref_ && ref_ !== "-" && (
        <p className="mt-2 text-sm text-[#3A2A1A]">
          संदर्भ संख्या: <strong className="font-mono text-base">{ref_}</strong>
        </p>
      )}
      <p className="mx-auto mt-2 max-w-md text-sm text-[#3A2A1A]">{text}</p>
      <button type="button" onClick={onAgain} className="mt-5 text-sm font-semibold text-[#B30000] underline">
        एक और भेजें
      </button>
    </div>
  )
}

export function TestimonialForm() {
  const [v, setV] = useState({ name: "", place: "", message: "", website: "" })
  const [photos, setPhotos] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState<string | null>(null)
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (v.name.trim().length < 2) return setError("कृपया अपना नाम लिखें")
    if (!v.message.trim() && photos.length === 0) return setError("कृपया अपने अनुभव के बारे में लिखें या फ़ोटो जोड़ें")
    setBusy(true)
    const r = await send("testimonial", v, photos)
    setBusy(false)
    if (r.ok) {
      setDone(r.ref || "")
      setV({ name: "", place: "", message: "", website: "" })
      setPhotos([])
    } else setError(r.message)
  }

  if (done !== null)
    return <Done title="धन्यवाद! आपका अनुभव प्राप्त हुआ" ref_={done} text="माँ त्रिपुरा सुंदरी की कृपा आप पर बनी रहे। मंदिर की टीम इसे देखेगी।" onAgain={() => setDone(null)} />

  return (
    <form onSubmit={submit} className="relative space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="t-name">आपका नाम *</label>
          <input id="t-name" className={field} value={v.name} onChange={set("name")} maxLength={80} autoComplete="name" placeholder="नाम" />
        </div>
        <div>
          <label className={label} htmlFor="t-place">शहर / गाँव (वैकल्पिक)</label>
          <input id="t-place" className={field} value={v.place} onChange={set("place")} maxLength={80} placeholder="जैसे: उदयपुर" />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="t-msg">आपका अनुभव / टिप्पणी</label>
        <textarea id="t-msg" className={`${field} min-h-[120px]`} value={v.message} onChange={set("message")} maxLength={1500} placeholder="मंदिर दर्शन का अपना अनुभव यहाँ लिखें…" />
      </div>
      <PhotoPicker files={photos} onChange={setPhotos} max={3} label="फ़ोटो जोड़ें" />
      <Honeypot value={v.website} onChange={(website) => setV((s) => ({ ...s, website }))} />
      {error && <p role="alert" className="rounded-lg bg-[#FFE9E9] p-3 text-sm font-medium text-[#B30000]">{error}</p>}
      <button type="submit" disabled={busy} className={button}>
        {busy ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {busy ? "भेजा जा रहा है…" : "अनुभव भेजें"}
      </button>
    </form>
  )
}

export function GrievanceForm() {
  const [v, setV] = useState({ name: "", phone: "", email: "", subject: "", message: "", website: "" })
  const [photos, setPhotos] = useState<File[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState<string | null>(null)
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (v.name.trim().length < 2) return setError("कृपया अपना नाम लिखें")
    if (!/^(\+?91|0)?[6-9]\d{9}$/.test(v.phone.replace(/[\s-]/g, ""))) return setError("कृपया सही 10 अंकों का मोबाइल नंबर लिखें")
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) return setError("ईमेल सही नहीं है")
    if (v.message.trim().length < 10) return setError("कृपया अपनी शिकायत का विवरण लिखें (कम से कम 10 अक्षर)")
    setBusy(true)
    const r = await send("grievance", v, photos)
    setBusy(false)
    if (r.ok) {
      setDone(r.ref || "")
      setV({ name: "", phone: "", email: "", subject: "", message: "", website: "" })
      setPhotos([])
    } else setError(r.message)
  }

  if (done !== null)
    return (
      <Done
        title="आपकी शिकायत दर्ज हो गई है"
        ref_={done}
        text="कृपया यह संदर्भ संख्या सँभालकर रखें। मंदिर की टीम शीघ्र आपसे संपर्क करेगी।"
        onAgain={() => setDone(null)}
      />
    )

  return (
    <form onSubmit={submit} className="relative space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="g-name">नाम *</label>
          <input id="g-name" className={field} value={v.name} onChange={set("name")} maxLength={80} autoComplete="name" placeholder="आपका नाम" />
        </div>
        <div>
          <label className={label} htmlFor="g-phone">मोबाइल नंबर *</label>
          <input id="g-phone" className={field} value={v.phone} onChange={set("phone")} inputMode="tel" maxLength={16} autoComplete="tel" placeholder="10 अंकों का मोबाइल नंबर" />
        </div>
        <div>
          <label className={label} htmlFor="g-email">ईमेल (वैकल्पिक)</label>
          <input id="g-email" type="email" className={field} value={v.email} onChange={set("email")} maxLength={120} autoComplete="email" placeholder="आपका ईमेल" />
        </div>
        <div>
          <label className={label} htmlFor="g-subject">विषय (वैकल्पिक)</label>
          <input id="g-subject" className={field} value={v.subject} onChange={set("subject")} maxLength={150} placeholder="जैसे: पार्किंग, दर्शन व्यवस्था" />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="g-msg">शिकायत का विवरण *</label>
        <textarea id="g-msg" className={`${field} min-h-[140px]`} value={v.message} onChange={set("message")} maxLength={3000} placeholder="अपनी शिकायत विस्तार से लिखें…" />
      </div>
      <PhotoPicker files={photos} onChange={setPhotos} max={1} label="फ़ोटो जोड़ें (वैकल्पिक)" />
      <Honeypot value={v.website} onChange={(website) => setV((s) => ({ ...s, website }))} />
      {error && <p role="alert" className="rounded-lg bg-[#FFE9E9] p-3 text-sm font-medium text-[#B30000]">{error}</p>}
      <button type="submit" disabled={busy} className={button}>
        {busy ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {busy ? "भेजा जा रहा है…" : "शिकायत दर्ज करें"}
      </button>
    </form>
  )
}
