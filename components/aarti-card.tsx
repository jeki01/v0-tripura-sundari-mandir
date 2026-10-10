import Link from "next/link"
import { CalendarDays, Play } from "lucide-react"
import { Lotus } from "@/components/ornaments"
import { aartiPath, type AartiItem } from "@/lib/aarti"
import { hindiDate } from "@/lib/darshan"

// One video / article in a list. Plain markup so it can be used by server and client components.
export default function AartiCard({ item }: { item: AartiItem }) {
  const isVideo = item.kind === "video"
  return (
    <Link href={aartiPath(item)} className="temple-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#5A0000] to-[#B30000]">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-[#FFD700]/70">
            <Lotus size={56} />
          </span>
        )}
        {isVideo && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20" aria-hidden="true">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#B30000]/90 text-white ring-2 ring-[#FFD700]/80 transition group-hover:scale-110">
              <Play size={24} fill="currentColor" className="ml-0.5" />
            </span>
          </span>
        )}
        {item.category && (
          <span className="absolute left-3 top-3 rounded-full bg-[#B30000] px-3 py-1 text-xs font-semibold text-[#FFE27A] shadow">{item.category}</span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#8F0000] shadow">
          {isVideo ? "वीडियो" : "लेख"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 font-display text-lg leading-snug text-[#8F0000]">{item.title}</h3>
        {item.summary && <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#3A2A1A]">{item.summary}</p>}
        <div className="mt-3 flex items-center justify-between text-xs text-[#7A5A3A]">
          <span className="flex items-center gap-1">
            {item.date && (
              <>
                <CalendarDays size={13} className="text-[#E0A100]" />
                {hindiDate(item.date)}
              </>
            )}
          </span>
          <span className="text-sm font-semibold text-[#B30000]">{isVideo ? "देखें →" : "पढ़ें →"}</span>
        </div>
      </div>
    </Link>
  )
}
