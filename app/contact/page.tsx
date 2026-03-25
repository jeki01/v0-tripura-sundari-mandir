import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import ContactSection from "@/components/contact-us"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#FFF4E6]">
            <ScrollProgress />
            <Header />
            <NavigationHandler />
            <main className="container mx-auto px-4 py-10 mt-20 space-y-8">

                {/* Trust Mandal */}
                <div className="bg-white rounded-2xl p-6  shadow-md">
                    <h3 className="text-xl text-[#B30000] mb-4">
                        मंदिर ट्रस्ट मण्डल (Trust Mandal)
                    </h3>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>अध्यक्ष</span>
                            <span className="text-[#B30000]">श्री धूलजी भाई पंचाल — 8696851900</span>
                        </div>

                        <div className="flex justify-between">
                            <span>महामंत्री</span>
                            <span className="text-[#B30000]">श्री नटवरलालजी पंचाल — 9XXXXXXXXX</span>
                        </div>
                    </div>
                </div>

                {/* Dharamshala */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl text-[#B30000] mb-4">धर्मशाला संपर्क (Dharamshala)</h3>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>प्रभारी</span>
                            <span className="text-[#B30000]">श्री जागेश पंचाल</span>
                        </div>

                        <div className="flex justify-between">
                            <span>समय</span>
                            <span className="text-[#B30000]">सुबह 9 बजे – शाम 7 बजे</span>
                        </div>

                        <div className="flex justify-between">
                            <span>मोबाइल</span>
                            <span className="text-[#B30000]">9XXXXXXXXX</span>
                        </div>
                    </div>
                </div>

                {/* Shringar Booking */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl text-[#B30000] mb-4">श्रृंगार बुकिंग (Shringar Booking)</h3>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>संपर्क</span>
                            <span className="text-[#B30000]">श्री जागेश पंचाल</span>
                        </div>

                        <div className="flex justify-between">
                            <span>मोबाइल</span>
                            <span className="text-[#B30000]">9XXXXXXXXX</span>
                        </div>
                    </div>
                </div>

                {/* Donation */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl text-[#B30000] mb-4">दान / Donation</h3>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>अध्यक्ष</span>
                            <span className="text-[#B30000]">श्री धूलजी भाई पंचाल — 8696851900</span>
                        </div>

                        <div className="flex justify-between">
                            <span>महामंत्री</span>
                            <span className="text-[#B30000]">श्री नटवरलालजी पंचाल — 9XXXXXXXXX</span>
                        </div>
                    </div>
                </div>

                {/* Local Taxi */}
                <div className="bg-white rounded-2xl p-6 shadow-md">
                    <h3 className="text-xl text-[#B30000] mb-4">स्थानीय टैक्सी सेवा (Local Taxi)</h3>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between">
                            <span>ड्राइवर 1</span>
                            <span className="text-[#B30000]">Name — 9XXXXXXXXX</span>
                        </div>

                        <div className="flex justify-between">
                            <span>ड्राइवर 2</span>
                            <span className="text-[#B30000]">Name — 9XXXXXXXXX</span>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <ContactSection />

            </main>

            <Footer />
        </div>
    )
}