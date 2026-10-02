"use client"

import { useState } from "react"
import { SectionHeading } from "@/components/ornaments"
import { Phone, Mail, Navigation, MapPin } from "lucide-react"
import Link from "next/link"
import { API_BASE, type SocialLink } from "@/lib/api"
import { SocialIcon, platformMeta } from "@/components/social-icons"

export default function ContactSection({ socialLinks = [] }: { socialLinks?: SocialLink[] }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })
    const [contactMsg, setContactMsg] = useState("")
    const [busy, setBusy] = useState(false)

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    // Reach out + opt-in subscribe
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setBusy(true); setContactMsg("")
        try {
            const res = await fetch(`${API_BASE}/subscriber/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })
            const json = await res.json()
            if (res.ok && json.success) {
                if (form.email) {
                    fetch(`${API_BASE}/subscriber`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: form.email, name: form.name, source: "mandir-contact" }),
                    }).catch(() => { })
                }
                setContactMsg("🙏 धन्यवाद! आपका संदेश भेज दिया गया है।")
                setForm({ name: "", email: "", phone: "", message: "" })
            } else {
                setContactMsg(json.message || "संदेश नहीं भेजा जा सका")
            }
        } catch {
            setContactMsg("कुछ गड़बड़ हुई, पुनः प्रयास करें")
        } finally {
            setBusy(false)
        }
    }

    return (
        <section id="contact" className="bg-jali py-14 md:py-20">
            <div className="site-container">

                <SectionHeading title="संपर्क करें" subtitle="हमसे जुड़ने के लिए नीचे विवरण भरें" />

                <div className="grid md:grid-cols-2 gap-8 mx-auto">

                    {/* Form */}
                    <div className="temple-card">
                        <div className="p-6 pb-2">
                            <h3 className="font-display text-xl text-[#8F0000]">
                                Reach Out
                            </h3>
                        </div>

                        <div className="p-6 pt-2">
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="आपका नाम"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ईमेल"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="मोबाइल नंबर"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <textarea
                                    name="message"
                                    placeholder="कुछ शब्द लिखें..."
                                    rows={4}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-[#C8941A]/50 bg-white p-3 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <button
                                    type="submit"
                                    disabled={busy}
                                    className="w-full rounded-lg bg-gradient-to-b from-[#B30000] to-[#8F0000] py-3 font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
                                >
                                    {busy ? "भेजा जा रहा है..." : "Submit"}
                                </button>
                                {contactMsg && <p className="text-sm text-green-700 text-center">{contactMsg}</p>}

                            </form>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="temple-card">
                        <div className="p-6 pb-2">
                            <h3 className="font-display text-xl text-[#8F0000]">
                                संपर्क विवरण
                            </h3>
                        </div>

                        <div className="space-y-4 p-6 pt-2">

                            {/* Address */}
                            <div className="flex items-start gap-3">
                                <MapPin className="text-[#FF6B00]" size={18} />
                                <p className="text-sm text-gray-700">
                                    श्री त्रिपुरा सुंदरी मंदिर, उमराई, बांसवाड़ा (राजस्थान)
                                </p>
                            </div>

                            {/* Phone */}
                            <a
                                href="tel:+918696851900"
                                className="flex items-center gap-3 text-sm hover:text-[#FF6B00]"
                            >
                                <Phone className="text-[#FF6B00]" size={18} />
                                +91 8696851900
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:shreetripurasundarimandir@gmail.com"
                                className="flex items-center gap-3 text-sm hover:text-[#FF6B00]"
                            >
                                <Mail className="text-[#FF6B00]" size={18} />
                                shreetripurasundarimandir@gmail.com
                            </a>

                            {/* Social Media */}
                            <div className="pt-4">
                                <p className="font-semibold text-[#B30000] mb-2">
                                    Social Media
                                </p>

                                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                                    {socialLinks.length === 0 && <span className="text-gray-500">—</span>}
                                    {socialLinks.map((l, i) => (
                                        <Link
                                            key={`${l.url}-${i}`}
                                            href={l.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-[#3A2A1A] transition hover:text-[#B30000]"
                                        >
                                            <SocialIcon platform={l.platform} size={14} />
                                            {l.label || platformMeta(l.platform).name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="temple-card overflow-hidden md:col-span-2">
                        <div>

                            {/* Map */}
                            <div className="relative">
                                <iframe
                                    title="मंदिर का स्थान - Google Maps"
                                    src="https://www.google.com/maps?q=Maa+Tripura+Sundari+Temple+Banswara&output=embed"
                                    width="100%"
                                    height="320"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    className="w-full"
                                />

                                {/* Overlay Button */}
                                <div className="absolute bottom-4 right-4">
                                    <Link
                                        href="https://g.co/kgs/ZEUPnyR"
                                        target="_blank"
                                        className="flex items-center gap-2 bg-[#B30000] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#FF6B00] transition"
                                    >
                                        <Navigation size={16} />
                                        Get Direction
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}


