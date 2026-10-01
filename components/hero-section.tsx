import Image from "next/image"
import Link from "next/link"
import { Play, Clock } from "lucide-react"
import { ArchEdge, Diya, Lotus, Mandala } from "@/components/ornaments"

const highlights = ["51 शक्तिपीठों में से एक", "18 भुजाओं वाली सिंहवाहिनी माँ", "सामान्य दर्शन निःशुल्क"]

export default function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#2B0A0A] text-white">
      {/* LCP image: served resized/AVIF through next/image and preloaded */}
      <Image
        src="/images/temple-1.jpg"
        alt="श्री त्रिपुरा सुंदरी मंदिर का बलुआ पत्थर का शिखर, बांसवाड़ा"
        fill
        priority
        sizes="100vw"
        quality={70}
        className="-z-20 object-cover object-[58%_30%]"
      />

      {/* Warm temple-glow overlays keep the text readable */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2B0A0A]/75 via-[#4A0000]/45 to-[#2B0A0A]/90 md:bg-gradient-to-r md:from-[#2B0A0A]/92 md:via-[#6B0000]/50 md:to-transparent" />
      <div className="absolute inset-0 -z-10 hidden bg-gradient-to-t from-[#2B0A0A]/85 via-transparent to-[#2B0A0A]/50 md:block" />

      <Mandala className="pointer-events-none absolute -right-32 top-16 hidden h-[34rem] w-[34rem] text-[#FFD700]/20 animate-spin-mandala md:block" />
      <div className="pointer-events-none absolute right-[8%] bottom-28 hidden lg:block">
        <Diya />
      </div>

      <div className="container relative mx-auto px-4 pb-28 pt-36 sm:pt-40 md:pb-40 md:pt-48">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FFD700]/50 bg-black/25 px-4 py-1.5 text-xs tracking-[0.18em] text-[#FFE9B8] backdrop-blur-sm sm:text-sm">
            <Lotus size={18} className="text-[#FFD700]" />
            शक्तिपीठ · उमराई, बांसवाड़ा, राजस्थान
          </p>

          <h1 className="font-display text-gold-gradient text-4xl leading-[1.15] drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
            जय श्री माँ
            <br />
            त्रिपुरा सुंदरी
          </h1>

          <p className="mt-5 text-lg text-[#FFE9B8] sm:text-2xl">आस्था, संस्कृति और सेवा का संगम</p>
          <p className="mt-2 max-w-xl text-sm text-white/80 sm:text-base">
            श्री त्रिपुरा सुंदरी मंदिर और पंचाल समाज 14 चोखरा का आधिकारिक डिजिटल पोर्टल
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#darshan-live"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] px-8 py-3.5 text-base font-bold text-[#6B0000] shadow-[0_8px_24px_-6px_rgba(255,200,0,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(255,200,0,0.7)]"
            >
              <Play size={18} fill="currentColor" />
              लाइव दर्शन
            </Link>
            <Link
              href="#temple-timings"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#FFD700]/70 bg-black/20 px-8 py-3.5 text-base font-semibold text-[#FFE9B8] backdrop-blur-sm transition hover:bg-[#FFD700] hover:text-[#6B0000]"
            >
              <Clock size={18} />
              मंदिर समय
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#FFE9B8]/90">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rotate-45 bg-[#FFD700]" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ArchEdge fill="#FFF4E6" className="absolute bottom-0 left-0" />
    </section>
  )
}
