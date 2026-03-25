"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import { useEffect, useState } from "react"

export default function MediaHandlers() {
    const [siteUrl, setSiteUrl] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setSiteUrl(window.location.origin)
        }
    }, [])

    return (
        <div className="min-h-screen bg-[#FFF4E6]">
            <ScrollProgress />
            <Header />
            <NavigationHandler />

            <main className="container mx-auto px-4 py-12 mt-20 space-y-14">

                {/* ---------- PRINT MEDIA SECTION ---------- */}
                <section className="bg-white shadow-md rounded-xl p-8 border border-orange-200">
                    <h2 className="text-3xl font-bold text-[#B30000] mb-4">📘 Print Media</h2>

                    <p className="text-gray-700 leading-relaxed">
                        श्री त्रिपुरा सुंदरी मंदिर ट्रस्ट द्वारा एक विशेष <strong>मंदिर स्मारक पुस्तक</strong> प्रकाशित की जाएगी,
                        जिसमें मंदिर का इतिहास, धरोहर, त्योहार, दर्शन, आयोजन और ट्रस्ट मंडल की आधिकारिक जानकारी संकलित होगी।
                    </p>

                    <div className="mt-6">
                        <button className="bg-[#B30000] text-white px-6 py-2 rounded-lg hover:bg-[#990000] transition">
                            प्रिंटेड बुक के लिए संपर्क करें
                        </button>
                    </div>
                </section>

                {/* ---------- DIGITAL MEDIA SECTION ---------- */}
                <section className="bg-white shadow-md rounded-xl p-8 border border-orange-200">
                    <h2 className="text-3xl font-bold text-[#B30000] mb-6">🌐 Digital Media</h2>

                    <p className="text-gray-700 mb-6">
                        मंदिर से जुड़े दैनिक दर्शन, कार्यक्रम और सभी अपडेट डिजिटल प्लेटफॉर्म पर उपलब्ध हैं।
                    </p>

                    {/* Social Media Links */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">

                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/profile.php?id=[REDACTED_CREDIT_CARD_NUMBER_1]"
                            target="_blank"
                            className="bg-blue-700 text-white py-3 rounded-xl text-center shadow hover:scale-105 transition"
                        >
                            📘 Facebook
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://www.instagram.com/maa_tripura_sunadari_mandir?igsh=M2VtbWt1NjlldzEz"
                            target="_blank"
                            className="bg-pink-600 text-white py-3 rounded-xl text-center shadow hover:scale-105 transition"
                        >
                            📸 Instagram
                        </a>

                        {/* YouTube */}
                        <a
                            href="https://m.youtube.com/@shreetripurasundari"
                            target="_blank"
                            className="bg-red-600 text-white py-3 rounded-xl text-center shadow hover:scale-105 transition"
                        >
                            ▶️ YouTube
                        </a>

                        {/* WhatsApp Channel */}
                        <a
                            href="https://whatsapp.com/channel/0029VaoNub9GU3BHZmvqjA00"
                            target="_blank"
                            className="bg-green-600 text-white py-3 rounded-xl text-center shadow hover:scale-105 transition"
                        >
                            💬 WhatsApp Channel
                        </a>

                        {/* Website */}
                        <a
                            href={siteUrl}
                            target="_blank"
                            className="bg-orange-600 text-white py-3 rounded-xl text-center shadow hover:scale-105 transition"
                        >
                            🌐 Official Website
                        </a>

                    </div>
                </section>

                {/* ---------- NEWSLETTER SUBSCRIBE ---------- */}
                <section className="bg-white shadow-md rounded-xl p-8 border border-orange-200">
                    <h2 className="text-2xl font-bold text-[#B30000] mb-4">📨 Subscribe Newsletter</h2>

                    <p className="text-gray-700 mb-4">
                        दैनिक दर्शन और मंदिर से जुड़े सभी अपडेट सीधे ईमेल पर प्राप्त करें।
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="border border-orange-300 rounded-lg px-4 py-2 w-full outline-none focus:ring-2 focus:ring-orange-400"
                        />

                        <button className="bg-[#B30000] text-white px-6 py-2 rounded-lg hover:bg-[#990000] transition w-full sm:w-auto">
                            Subscribe
                        </button>
                    </div>
                </section>

                {/* ---------- WHATSAPP COMMUNITY ---------- */}
                <section className="bg-white shadow-md rounded-xl p-8 border border-orange-200 text-center">
                    <h2 className="text-2xl font-bold text-[#B30000] mb-4">💬 WhatsApp Community</h2>

                    <p className="text-gray-700 mb-6">
                        मंदिर की लाइव अपडेट और दैनिक दर्शन WhatsApp समुदाय में प्राप्त करें।
                    </p>

                    <a
                        href="https://whatsapp.com/channel/0029VaoNub9GU3BHZmvqjA00"
                        target="_blank"
                        className="inline-block bg-green-600 text-white px-8 py-3 rounded-xl text-lg hover:bg-green-700 transition shadow"
                    >
                        Join WhatsApp Community
                    </a>
                </section>

            </main>

            <Footer />
        </div>
    )
}