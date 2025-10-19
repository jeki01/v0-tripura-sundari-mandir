import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Sun, Snowflake } from "lucide-react"

export default function TempleTimingsSection() {
  const timings = [
    { activity: "Opening Time", summer: "5:00 AM", winter: "5:30 AM" },
    { activity: "Abhishek, Shringar, Pujan", summer: "5:00 - 6:00 AM", winter: "5:30 - 7:00 AM" },
    { activity: "Darshan Begins", summer: "6:00 AM", winter: "7:00 AM" },
    { activity: "Mangla Aarti", summer: "7:00 AM", winter: "7:30 AM" },
    { activity: "Bhog Dharna", summer: "12:00 PM", winter: "12:00 PM" },
    { activity: "Vishram (Rest)", summer: "1:00 - 2:30 PM", winter: "1:00 - 2:30 PM" },
    { activity: "Darshan Resumes", summer: "2:30 PM", winter: "2:30 PM" },
    { activity: "Sandhya Aarti", summer: "7:15 PM", winter: "6:30 PM" },
    { activity: "Closing Time", summer: "9:00 PM", winter: "8:30 PM" },
  ]

  const getCurrentSeason = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const day = now.getDate()

    if ((month === 3 && day >= 1) || (month >= 4 && month <= 9) || (month === 10 && day <= 15)) {
      return "summer"
    } else {
      return "winter"
    }
  }

  const currentSeason = getCurrentSeason()

  return (
    <section id="temple-timings" className="py-12 bg-[#FFF4E6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="text-[#B30000] mr-3" size={28} />
            <h2 className="text-3xl font-bold text-[#B30000]">Temple Timings</h2>
          </div>
          <p className="text-[#FF6B00] text-lg">Daily Schedule for Darshan and Rituals</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-[#FF6B00] shadow-lg">
            <CardHeader className="bg-gradient-to-r from-[#B30000] to-[#FF6B00] text-white text-center py-4">
              <CardTitle className="text-xl">श्री त्रिपुरा सुंदरी मंदिर - दैनिक कार्यक्रम</CardTitle>
              <div className="flex justify-center space-x-4 mt-3">
                <Badge className={`px-3 py-1 ${currentSeason === "summer" ? "bg-orange-500" : "bg-orange-300"}`}>
                  <Sun className="mr-1" size={14} />
                  Summer (1 Mar - 15 Oct)
                </Badge>
                <Badge className={`px-3 py-1 ${currentSeason === "winter" ? "bg-blue-500" : "bg-blue-300"}`}>
                  <Snowflake className="mr-1" size={14} />
                  Winter (16 Oct - 28 Feb)
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#FDF0D5]">
                    <tr>
                      <th className="text-left p-4 font-bold text-[#B30000] border-b border-[#FF6B00]/30">Activity</th>
                      <th className="text-center p-4 font-bold text-orange-700 border-b border-[#FF6B00]/30">
                        <div className="flex items-center justify-center">
                          <Sun className="mr-2" size={16} />
                          Summer
                        </div>
                      </th>
                      <th className="text-center p-4 font-bold text-blue-700 border-b border-[#FF6B00]/30">
                        <div className="flex items-center justify-center">
                          <Snowflake className="mr-2" size={16} />
                          Winter
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {timings.map((timing, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-[#FFF4E6]"
                        } hover:bg-[#FDF0D5] transition-colors ${
                          timing.activity.includes("Vishram") ? "opacity-75" : ""
                        }`}
                      >
                        <td className="p-4 font-medium text-[#B30000] border-b border-[#FF6B00]/20">
                          {timing.activity}
                        </td>
                        <td
                          className={`p-4 text-center border-b border-[#FF6B00]/20 ${
                            currentSeason === "summer" ? "font-bold text-orange-800 bg-orange-50" : "text-orange-600"
                          }`}
                        >
                          {timing.summer}
                        </td>
                        <td
                          className={`p-4 text-center border-b border-[#FF6B00]/20 ${
                            currentSeason === "winter" ? "font-bold text-blue-800 bg-blue-50" : "text-blue-600"
                          }`}
                        >
                          {timing.winter}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Simple Note */}
          <div className="mt-6 text-center">
            <div className="bg-[#FFD700]/20 p-4 rounded-lg border border-[#FFD700] inline-block">
              <p className="text-[#B30000] font-medium">
                <strong>Currently Active:</strong> {currentSeason === "summer" ? "Summer" : "Winter"} Timings
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Temple remains closed during Vishram time (1:00 PM - 2:30 PM)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
