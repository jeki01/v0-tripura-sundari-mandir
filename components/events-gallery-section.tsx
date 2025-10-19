import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Play, ImageIcon, Video } from "lucide-react"
import Image from "next/image"

export default function EventsGallerySection() {
  const upcomingEvents = [
    {
      title: "Navratri Celebration 2024",
      date: "October 15-24, 2024",
      location: "Temple Premises",
      attendees: "500+",
      image: "/placeholder.svg?height=200&width=300",
      type: "Festival",
    },
    {
      title: "Samaj Annual Meet",
      date: "November 10, 2024",
      location: "Community Hall",
      attendees: "200+",
      image: "/placeholder.svg?height=200&width=300",
      type: "Community",
    },
    {
      title: "Cultural Program",
      date: "December 5, 2024",
      location: "Mandir Auditorium",
      attendees: "300+",
      image: "/placeholder.svg?height=200&width=300",
      type: "Cultural",
    },
  ]

  const galleryItems = [
    { title: "Garba Night 2023", image: "/placeholder.svg?height=250&width=350", type: "video" },
    { title: "Temple Inauguration", image: "/placeholder.svg?height=250&width=350", type: "image" },
    { title: "Community Yatra", image: "/placeholder.svg?height=250&width=350", type: "image" },
    { title: "Sammelan Highlights", image: "/placeholder.svg?height=250&width=350", type: "video" },
    { title: "Festival Celebrations", image: "/placeholder.svg?height=250&width=350", type: "image" },
    { title: "Cultural Dance", image: "/placeholder.svg?height=250&width=350", type: "video" },
  ]

  return (
    <section id="events" className="py-16 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="text-[#B30000] mr-3" size={32} />
            <h2 className="text-4xl font-bold text-[#B30000]">Events & Cultural Gallery</h2>
          </div>
          <p className="text-[#FF6B00] text-lg">Celebrating Our Rich Heritage & Community Spirit</p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#B30000] mb-8 text-center">Upcoming Events</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-[#FF6B00] hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-[#FFD700] text-[#B30000]">{event.type}</Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-[#B30000] text-lg mb-3">{event.title}</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="mr-2 text-[#FF6B00]" size={16} />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="mr-2 text-[#FF6B00]" size={16} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="mr-2 text-[#FF6B00]" size={16} />
                      <span className="text-sm">Expected: {event.attendees}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cultural Gallery */}
        <div>
          <h3 className="text-2xl font-bold text-[#B30000] mb-8 text-center">Cultural Gallery</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <Card
                key={index}
                className="border-[#FF6B00] hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={350}
                    height={250}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {item.type === "video" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-[#FF6B00] rounded-full flex items-center justify-center">
                        <Play className="text-white ml-1" size={24} />
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h4 className="text-white font-bold">{item.title}</h4>
                    <Badge variant="secondary" className="mt-2 bg-[#FFD700] text-[#B30000]">
                      {item.type === "video" ? (
                        <div className="flex items-center">
                          <Video className="mr-1" size={12} />
                          Video
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <ImageIcon className="mr-1" size={12} />
                          Photo
                        </div>
                      )}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" className="bg-[#B30000] hover:bg-[#B30000]/90 text-white px-8">
              View Full Gallery
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
