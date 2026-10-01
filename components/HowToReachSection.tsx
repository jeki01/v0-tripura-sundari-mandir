import { Plane, Train, Bus, Car } from "lucide-react"
import { SectionHeading } from "@/components/ornaments"

const travelOptions = [
  { icon: Plane, title: "By Air", details: "Udaipur Airport (132 km), Indore (166 km), Ahmedabad (193 km)" },
  { icon: Train, title: "By Train", details: "Ratlam Junction (80 km), Udaipur (132 km)" },
  { icon: Bus, title: "By Bus", details: "Regular buses from Udaipur, Ratlam, Ahmedabad" },
  { icon: Car, title: "By Car", details: "Well connected roads from all major cities" },
]

export default function HowToReachSection() {
  return (
    <section id="how-to-reach" className="bg-[#FFF4E6] py-14 md:py-20">
      <div className="site-container">
        <SectionHeading title="मंदिर कैसे पहुँचें" subtitle="How to Reach" />

        <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {travelOptions.map(({ icon: Icon, title, details }) => (
            <div key={title} className="temple-card p-6 text-center transition duration-300 hover:-translate-y-1">
              <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A] ring-2 ring-[#FFD700]/70 ring-offset-2 ring-offset-[#FFFDF6]">
                <Icon size={24} />
              </span>
              <h3 className="mb-2 font-display text-lg text-[#8F0000]">{title}</h3>
              <p className="text-sm leading-relaxed text-[#5A4636]">{details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
