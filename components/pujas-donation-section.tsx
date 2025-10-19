import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, CreditCard, Smartphone, Heart, Shield, Mail } from "lucide-react"

export default function PujasDonationSection() {
  const pujas = [
    { name: "Maha Aarti", price: "₹51", duration: "30 min" },
    { name: "Navratri Special Pooja", price: "₹101", duration: "1 hour" },
    { name: "Havan & Yagna", price: "₹501", duration: "2 hours" },
    { name: "Abhishek Pooja", price: "₹251", duration: "45 min" },
    { name: "Sahasra Chandi Path", price: "₹1001", duration: "3 hours" },
    { name: "Annual Seva", price: "₹5001", duration: "Full Year" },
  ]

  return (
    <section id="pujas" className="py-16 bg-[#FDF0D5]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000]">Online Pujas & Donations</h2>
          </div>
          <p className="text-[#FF6B00] text-lg">Book Your Sacred Rituals & Contribute to Temple Seva</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pujas Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-[#B30000] mb-6 text-center">Available Pujas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {pujas.map((puja, index) => (
                <Card key={index} className="border-[#FF6B00] hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-[#B30000] text-lg">{puja.name}</h4>
                      <span className="text-[#FFD700] font-bold text-xl">{puja.price}</span>
                    </div>
                    <p className="text-gray-600 mb-3">Duration: {puja.duration}</p>
                    <Button className="w-full bg-gradient-to-r from-[#FF6B00] to-[#B30000] text-white hover:opacity-90">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Donation Section */}
          <div>
            <Card className="border-4 border-[#FFD700] bg-gradient-to-b from-[#FFF4E6] to-[#FFD700]/10">
              <CardHeader className="text-center bg-[#FFD700] text-[#B30000]">
                <div className="flex items-center justify-center">
                  <Heart className="mr-2" size={20} />
                  <CardTitle className="text-2xl">Donate for Seva</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-white border-4 border-[#B30000] rounded-lg mx-auto flex items-center justify-center mb-4">
                    <QrCode size={80} className="text-[#B30000]" />
                  </div>
                  <p className="text-sm text-gray-600">Scan QR Code for UPI Payment</p>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#B30000] hover:bg-[#B30000]/90 text-white">
                    <Smartphone className="mr-2" size={16} />
                    UPI Payment
                  </Button>
                  <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
                    <CreditCard className="mr-2" size={16} />
                    Card Payment
                  </Button>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#FF6B00]">
                  <h4 className="font-bold text-[#B30000] mb-2">Quick Amounts:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {["₹51", "₹101", "₹501", "₹1001", "₹2501", "Custom"].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center mb-1">
                    <Shield className="mr-2 text-[#FF6B00]" size={16} />
                    <p>Secure Payment Gateway</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Mail className="mr-2 text-[#FF6B00]" size={16} />
                    <p>Instant Receipt via Email</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
