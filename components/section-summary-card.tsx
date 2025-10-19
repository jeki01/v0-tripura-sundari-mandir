import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SectionSummaryCardProps {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string // Tailwind gradient classes, e.g., "from-red-500 to-yellow-500"
}

export default function SectionSummaryCard({ title, description, icon: Icon, href, color }: SectionSummaryCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card
        className={cn(
          "h-full flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
          "bg-gradient-to-br p-4 rounded-xl shadow-md text-white",
          color,
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Icon className="h-8 w-8 text-white opacity-90" />
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm opacity-90">{description}</p>
        </CardContent>
        <div className="mt-4 text-right">
          <span className="inline-flex items-center text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity">
            View Details
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </Card>
    </Link>
  )
}
