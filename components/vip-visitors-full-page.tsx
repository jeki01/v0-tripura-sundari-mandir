"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Users, Star, Award, ArrowLeft, X, Camera, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VipVisitorsFullPageProps {
  onClose: () => void
}

export default function VipVisitorsFullPage({ onClose }: VipVisitorsFullPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // VIP visitor images
  const vipImages = [
    {
      src: "/images/vip-visitors/sm_5.jpg",
      alt: "VIP Visit - Formal Ceremony",
      caption: "Distinguished guests at temple ceremony",
    },
    {
      src: "/images/vip-visitors/sm_1.jpg",
      alt: "Certificate Presentation Ceremony",
      caption: "Official recognition ceremony",
    },
    {
      src: "/images/vip-visitors/sm_7.jpg",
      alt: "Spiritual Leaders Gathering",
      caption: "Saints and spiritual leaders visit",
    },
    {
      src: "/images/vip-visitors/sm_8.jpg",
      alt: "Traditional Leaders Meeting",
      caption: "Meeting with traditional leaders",
    },
    {
      src: "/images/vip-visitors/sm_6.jpg",
      alt: "Award Ceremony",
      caption: "Honor and recognition ceremony",
    },
    {
      src: "/images/vip-visitors/sm_4.jpg",
      alt: "High Profile Visit",
      caption: "Distinguished visitor reception",
    },
    {
      src: "/images/vip-visitors/sm_3.jpg",
      alt: "VIP Reception",
      caption: "Formal reception of dignitaries",
    },
    {
      src: "/images/vip-visitors/sm_12.jpg",
      alt: "Large Gathering",
      caption: "Community gathering with VIPs",
    },
    {
      src: "/images/vip-visitors/sm_11.jpg",
      alt: "Public Address",
      caption: "Address to devotees and community",
    },
  ]

  const allVisitors = [
    {
      id: 1,
      name: "Late Shri Hari Deo Joshi",
      position: "Former Chief Minister of Rajasthan",
      category: "Political Leader",
      importance: "high",
    },
    {
      id: 2,
      name: "Shri Rangnath Mishra",
      position: "Chief Justice, Supreme Court, India",
      category: "Judiciary",
      importance: "high",
    },
    {
      id: 3,
      name: "Shri P.N. Bhagvati",
      position: "Chief Justice, Supreme Court, India",
      category: "Judiciary",
      importance: "high",
    },
    {
      id: 4,
      name: "Shri Bhairao Singh Shekhawat",
      position: "Former Vice President of India",
      category: "Constitutional Post",
      importance: "high",
    },
    {
      id: 5,
      name: "Shri Ashok Singhal",
      position: "President, Vishav Hindu Parishad",
      category: "Social Leader",
      importance: "medium",
    },
    {
      id: 6,
      name: "Shri Swami Swarupanand Saraswati",
      position: "Jagadguru Shankracharya, Badrikashram and Dwrkapeeth",
      category: "Spiritual Leader",
      importance: "high",
    },
    {
      id: 7,
      name: "Swami Avdheshanand Giri",
      position: "National Saint",
      category: "Spiritual Leader",
      importance: "medium",
    },
    {
      id: 8,
      name: "Swami Devanandji Maharaj",
      position: "Peethadhishwar, Baneshwardham",
      category: "Spiritual Leader",
      importance: "medium",
    },
    {
      id: 9,
      name: "Swami Achutanand ji Maharaj",
      position: "Peethadhishwar, Baneshwardham",
      category: "Spiritual Leader",
      importance: "medium",
    },
    {
      id: 10,
      name: "Dhayan yogi Uttamswami",
      position: "Ravindra Dhyan Ashram, Janamedi",
      category: "Spiritual Leader",
      importance: "medium",
    },
    {
      id: 11,
      name: "Shri Ashok Gehlot",
      position: "Chief Minister, Rajasthan",
      category: "Political Leader",
      importance: "high",
    },
    {
      id: 12,
      name: "Shri Digvijaysingh",
      position: "Former Chief Minister, M.P.",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 13,
      name: "Smt. Vasundhara Raje Sindhia",
      position: "Former Chief Minister, Rajasthan",
      category: "Political Leader",
      importance: "high",
    },
    {
      id: 14,
      name: "Smt. Pratibha Patil",
      position: "H'ble President, India",
      category: "Constitutional Post",
      importance: "high",
    },
    {
      id: 15,
      name: "Shri Narendra Modi",
      position: "Chief Minister, Gujarat",
      category: "Political Leader",
      importance: "high",
    },
    {
      id: 16,
      name: "Shri Maharana Mewar",
      position: "Udaipur",
      category: "Royal Family",
      importance: "medium",
    },
    {
      id: 17,
      name: "Shri SuryaveerSingh",
      position: "Maharawal Banswara",
      category: "Royal Family",
      importance: "medium",
    },
    {
      id: 18,
      name: "Shri Shilendra Singh",
      position: "H'ble Governor Rajasthan",
      category: "Constitutional Post",
      importance: "medium",
    },
    {
      id: 19,
      name: "Late Shri Gulab Singh Shakatawat",
      position: "Former Home Minister, Rajasthan",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 20,
      name: "Shri Kanakmal Katara",
      position: "Former Minister of ST Development",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 21,
      name: "Shri Bhawani Singh Rajawat",
      position: "Political Leader",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 22,
      name: "Shri Vasudev Devnani",
      position: "Former State Minister of Education",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 23,
      name: "Shri Sanwarmal Jat",
      position: "Former Irrigation Minister, Rajasthan",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 24,
      name: "Shri Kalicharan Saraf",
      position: "Former Education Minister Rajasthan",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 25,
      name: "Shri Bhawani Joshi",
      position: "State Minister of Health and Medical",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 26,
      name: "Ms. Girija Vyas",
      position: "Chairperson, National Commission for Women",
      category: "Social Leader",
      importance: "medium",
    },
    {
      id: 27,
      name: "Smt. Kiran Maheshwari",
      position: "M.P.",
      category: "Political Leader",
      importance: "medium",
    },
    {
      id: 28,
      name: "Shri Mathur Sab",
      position: "Justice, Rajasthan High Court, Jodhpur",
      category: "Judiciary",
      importance: "medium",
    },
    {
      id: 29,
      name: "Shri Gulab Kothari",
      position: "Chief Editor, Rajasthan Patrika",
      category: "Media",
      importance: "medium",
    },
  ]

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Political Leader": "bg-blue-100 text-blue-800",
      Judiciary: "bg-purple-100 text-purple-800",
      "Constitutional Post": "bg-red-100 text-red-800",
      "Spiritual Leader": "bg-orange-100 text-orange-800",
      "Social Leader": "bg-green-100 text-green-800",
      "Royal Family": "bg-yellow-100 text-yellow-800",
      Media: "bg-pink-100 text-pink-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getImportanceIcon = (importance: string) => {
    if (importance === "high") {
      return <Star className="text-[#FFD700]" size={16} />
    }
    return null
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % vipImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + vipImages.length) % vipImages.length)
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="min-h-screen bg-gradient-to-b from-[#FFF4E6] to-[#FDF0D5]">
        <div className="container mx-auto px-4 py-8">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to Main Page
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-[#B30000] hover:bg-[#B30000] hover:text-white"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Crown className="text-[#B30000] mr-3" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold text-[#B30000]">Complete VIP Visitors Archive</h1>
            </div>
            <p className="text-[#FF6B00] text-xl">
              Distinguished Personalities Who Have Blessed Shree Tripura Sundari Temple
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#FF6B00] mx-auto rounded-full mt-4"></div>
          </div>

          {/* VIP Images Gallery */}
          <Card className="border-4 border-[#FFD700] shadow-2xl mb-12">
            <CardHeader className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-[#B30000] text-center">
              <CardTitle className="text-2xl flex items-center justify-center">
                <Camera className="mr-2" size={24} />
                Memorable Moments with Distinguished Guests
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Main Image Display */}
              <div className="mb-6">
                <div className="relative overflow-hidden rounded-xl border-4 border-[#B30000] shadow-2xl">
                  <Image
                    src={vipImages[selectedImage].src || "/placeholder.svg"}
                    alt={vipImages[selectedImage].alt}
                    width={800}
                    height={500}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />

                  {/* Image Caption */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white font-bold text-lg mb-1">{vipImages[selectedImage].caption}</h3>
                    <p className="text-[#FFD700] text-sm">Historical moment at Shree Tripura Sundari Temple</p>
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-4 right-4 bg-[#FFD700] text-[#B30000] px-3 py-1 rounded-full font-bold text-sm">
                    {selectedImage + 1} / {vipImages.length}
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
                {vipImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-[#FF6B00] scale-105 shadow-lg"
                        : "border-[#FFD700] hover:border-[#FF6B00] hover:scale-105"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={120}
                      height={80}
                      className="w-full h-16 md:h-20 object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-[#FF6B00]/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-[#FF6B00] rounded-full flex items-center justify-center">
                          <Star size={12} className="text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Complete Visitors Table */}
          <Card className="border-4 border-[#B30000] shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center">
              <CardTitle className="text-3xl flex items-center justify-center">
                <Users className="mr-3" size={28} />
                Complete Distinguished Visitors List
              </CardTitle>
              <p className="text-[#FFD700] mt-2 text-lg">
                All {allVisitors.length} eminent personalities who have visited our sacred temple
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FDF0D5] sticky top-0">
                    <tr>
                      <th className="text-left p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">S.No.</th>
                      <th className="text-left p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">
                        Distinguished Visitor
                      </th>
                      <th className="text-left p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">
                        Position & Designation
                      </th>
                      <th className="text-center p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">
                        Category
                      </th>
                      <th className="text-center p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allVisitors.map((visitor, index) => (
                      <tr
                        key={visitor.id}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#FFF4E6]"
                        } hover:bg-[#FDF0D5] transition-colors`}
                      >
                        <td className="p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/20">
                          <div className="flex items-center">
                            {visitor.id}
                            {getImportanceIcon(visitor.importance)}
                          </div>
                        </td>
                        <td className="p-4 border-b border-[#FF6B00]/20">
                          <div className="font-bold text-[#B30000] text-lg mb-1">{visitor.name}</div>
                          <div className="text-xs text-gray-500">
                            Shree Tripura Sundari Temple, Banswara, Rajasthan, India
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 border-b border-[#FF6B00]/20">
                          <div className="font-medium">{visitor.position}</div>
                        </td>
                        <td className="p-4 text-center border-b border-[#FF6B00]/20">
                          <Badge className={`${getCategoryColor(visitor.category)} font-medium`}>
                            {visitor.category}
                          </Badge>
                        </td>
                        <td className="p-4 text-center border-b border-[#FF6B00]/20">
                          {visitor.importance === "high" ? (
                            <Badge className="bg-[#FFD700] text-[#B30000] font-bold">
                              <Star className="mr-1" size={12} />
                              VIP
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-[#FF6B00] text-[#FF6B00]">
                              Distinguished
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-[#FF6B00] text-center shadow-md">
              <div className="text-2xl font-bold text-[#B30000]">{allVisitors.length}</div>
              <div className="text-sm text-gray-600">Total Visitors</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#FFD700] text-center shadow-md">
              <div className="text-2xl font-bold text-[#FF6B00]">
                {allVisitors.filter((v) => v.category === "Constitutional Post").length}
              </div>
              <div className="text-sm text-gray-600">Presidents/VPs</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#B30000] text-center shadow-md">
              <div className="text-2xl font-bold text-[#FFD700]">
                {allVisitors.filter((v) => v.category === "Political Leader").length}
              </div>
              <div className="text-sm text-gray-600">Political Leaders</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#FF6B00] text-center shadow-md">
              <div className="text-2xl font-bold text-[#B30000]">
                {allVisitors.filter((v) => v.category === "Spiritual Leader").length}
              </div>
              <div className="text-sm text-gray-600">Saints & Gurus</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#FFD700] text-center shadow-md">
              <div className="text-2xl font-bold text-[#FF6B00]">
                {allVisitors.filter((v) => v.category === "Judiciary").length}
              </div>
              <div className="text-sm text-gray-600">Judiciary</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-2 border-[#B30000] text-center shadow-md">
              <div className="text-2xl font-bold text-[#FFD700]">
                {allVisitors.filter((v) => v.importance === "high").length}
              </div>
              <div className="text-sm text-gray-600">VIP Status</div>
            </div>
          </div>

          {/* Testimonial Note */}
          <div className="mt-12 text-center">
            <Card className="border-2 border-[#FFD700] bg-gradient-to-r from-[#FFF4E6] to-[#FFD700]/20 inline-block max-w-4xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Award className="text-[#B30000] mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-[#B30000]">Temple's Prestigious Recognition</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  The visit of such distinguished personalities including Presidents, Chief Ministers, Chief Justices,
                  renowned Saints, and other eminent leaders is a testament to the spiritual significance and cultural
                  importance of Shree Tripura Sundari Temple. Each visit has blessed our temple and strengthened our
                  commitment to serving devotees and preserving our sacred traditions.
                </p>
                <div className="mt-6 text-center">
                  <div className="inline-block bg-[#FFD700] text-[#B30000] px-6 py-3 rounded-full font-bold text-xl">
                    जय माँ त्रिपुरा सुंदरी 🙏
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
