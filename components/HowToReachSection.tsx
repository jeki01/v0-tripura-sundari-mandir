"use client"

import { Plane, Train, Bus, Car } from "lucide-react"

export default function HowToReachSection() {
    const travelOptions = [
        {
            icon: Plane,
            title: "By Air",
            details: "Udaipur Airport (132 km), Indore (166 km), Ahmedabad (193 km)",
        },
        {
            icon: Train,
            title: "By Train",
            details: "Ratlam Junction (80 km), Udaipur (132 km)",
        },
        {
            icon: Bus,
            title: "By Bus",
            details: "Regular buses from Udaipur, Ratlam, Ahmedabad",
        },
        {
            icon: Car,
            title: "By Car",
            details: "Well connected roads from all major cities",
        },
    ]

    return (
        <section className="py-14 bg-[#FFF4E6]">
            <div className="container mx-auto px-4">

                <h2 className="text-3xl font-bold text-[#B30000] text-center mb-10">
                    How to Reach
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {travelOptions.map((item, i) => {
                        const Icon = item.icon
                        return (
                            <div key={i} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
                                <Icon className="text-[#FF6B00] mb-3" />
                                <h3 className="font-bold text-[#B30000] mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-600">{item.details}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

