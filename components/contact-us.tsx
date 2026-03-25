"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Navigation, MapPin } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import Link from "next/link"

export default function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    })

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(form)
        alert("Form submitted 🙏")
    }

    return (
        <section id="contact" className="py-16 bg-[#FFF4E6]">
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#B30000] mb-2">
                        संपर्क करें
                    </h2>
                    <p className="text-gray-600">
                        हमसे जुड़ने के लिए नीचे विवरण भरें
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                    {/* Form */}
                    <Card className="shadow-lg rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-[#B30000]">
                                Reach Out
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="आपका नाम"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="ईमेल"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="मोबाइल नंबर"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <textarea
                                    name="message"
                                    placeholder="कुछ शब्द लिखें..."
                                    rows={4}
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-[#B30000] text-white py-3 rounded-lg font-semibold hover:bg-[#FF6B00] transition"
                                >
                                    Submit
                                </button>

                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card className="shadow-lg rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-[#B30000]">
                                संपर्क विवरण
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">

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
                                    Soscial Media
                                </p>

                                <div className="flex gap-4 text-sm">

                                    <Link href="https://www.facebook.com/profile.php?id=61579670115975" target="_blank" className="hover:text-blue-600">
                                        Facebook
                                    </Link>

                                    <Link href="https://www.instagram.com/maa_tripura_sunadari_mandir" target="_blank" className="hover:text-pink-500">
                                        Instagram
                                    </Link>

                                    <Link href="https://m.youtube.com/@shreetripurasundari" target="_blank" className="hover:text-red-600">
                                        YouTube
                                    </Link>

                                    <Link href="https://whatsapp.com/channel/0029VaoNub9GU3BHZmvqjA00" target="_blank" className="hover:text-green-600 flex items-center gap-1">
                                        <FaWhatsapp /> WhatsApp
                                    </Link>

                                </div>
                            </div>

                            <div className="pt-4">
                                <p className="font-semibold text-[#B30000] mb-2">
                                    News and updates
                                </p>
                                <form className="space-y-4">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="ईमेल"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                                    />


                                    <button
                                        type="submit"
                                        className="w-full bg-[#B30000] text-white py-3 rounded-lg font-semibold hover:bg-[#FF6B00] transition"
                                    >
                                        Subscribe
                                    </button>

                                </form>
                            </div>

                        </CardContent>
                    </Card>

                    <Card className="rounded-xl shadow-sm overflow-hidden">
                        <CardContent className="p-0">

                            {/* Map */}
                            <div className="relative">
                                <iframe
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

                        </CardContent>
                    </Card>
                </div>
            </div>
        </section >
    )
}


