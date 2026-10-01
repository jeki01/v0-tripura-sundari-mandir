import type { ReactNode } from "react"

/* Lightweight, dependency-free SVG ornaments used across the site.
   All are server components (no JS shipped to the browser). */

export function Lotus({ className = "", size = 28 }: { className?: string; size?: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="-20 -20 40 40"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <path d="M0 -16 C7 -8 7 3 0 9 C-7 3 -7 -8 0 -16Z" />
        <path opacity=".8" transform="rotate(38)" d="M0 -14 C6 -7 6 2 0 8 C-6 2 -6 -7 0 -14Z" />
        <path opacity=".8" transform="rotate(-38)" d="M0 -14 C6 -7 6 2 0 8 C-6 2 -6 -7 0 -14Z" />
        <path opacity=".6" transform="rotate(72)" d="M0 -12 C5 -6 5 2 0 7 C-5 2 -5 -6 0 -12Z" />
        <path opacity=".6" transform="rotate(-72)" d="M0 -12 C5 -6 5 2 0 7 C-5 2 -5 -6 0 -12Z" />
        <ellipse cx="0" cy="12" rx="9" ry="2" opacity=".5" />
      </g>
    </svg>
  )
}

export function OrnamentDivider({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "light" }) {
  const line = tone === "gold" ? "from-transparent via-[#C8941A] to-[#C8941A]" : "from-transparent via-[#FFD700]/70 to-[#FFD700]/70"
  const icon = tone === "gold" ? "text-[#B30000]" : "text-[#FFD700]"
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px w-16 sm:w-28 bg-gradient-to-r ${line}`} />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#FF6B00]" />
      <Lotus size={30} className={icon} />
      <span className="w-1.5 h-1.5 rotate-45 bg-[#FF6B00]" />
      <span className={`h-px w-16 sm:w-28 bg-gradient-to-l ${line}`} />
    </div>
  )
}

interface SectionHeadingProps {
  title: ReactNode
  subtitle?: ReactNode
  tone?: "dark" | "light"
  as?: "h2" | "h3"
  className?: string
}

export function SectionHeading({ title, subtitle, tone = "dark", as: Tag = "h2", className = "" }: SectionHeadingProps) {
  const titleColor = tone === "dark" ? "text-[#8F0000]" : "text-[#FFD700]"
  const subColor = tone === "dark" ? "text-[#C25400]" : "text-[#FFE9B8]"
  return (
    <div className={`text-center mb-10 md:mb-12 ${className}`}>
      <Tag className={`font-display text-3xl md:text-4xl leading-tight ${titleColor}`}>{title}</Tag>
      {subtitle && <p className={`mt-2 text-sm md:text-base tracking-wide ${subColor}`}>{subtitle}</p>}
      <OrnamentDivider className="mt-4" tone={tone === "dark" ? "gold" : "light"} />
    </div>
  )
}

/* Slowly rotating sacred-geometry wheel (decorative) */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 16 })
  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false" fill="none" stroke="currentColor">
      <circle r="96" strokeWidth=".6" />
      <circle r="88" strokeWidth=".4" strokeDasharray="1 3" />
      <circle r="62" strokeWidth=".6" />
      <circle r="30" strokeWidth=".6" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${(360 / petals.length) * i})`}>
          <path d="M0 -62 C10 -72 10 -84 0 -94 C-10 -84 -10 -72 0 -62Z" strokeWidth=".7" />
          <path d="M0 -30 C6 -38 6 -48 0 -58 C-6 -48 -6 -38 0 -30Z" strokeWidth=".5" />
        </g>
      ))}
      <path d="M0 -26 L26 0 L0 26 L-26 0Z" strokeWidth=".6" />
      <path d="M-18 -18 L18 -18 L18 18 L-18 18Z" strokeWidth=".5" />
      <circle r="4" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* Cusped temple-arch edge. Place at the bottom of a dark section; `fill` is the colour of the NEXT section. */
export function ArchEdge({ fill = "#FFF4E6", className = "" }: { fill?: string; className?: string }) {
  return (
    <svg
      className={`block w-full h-6 sm:h-8 ${className}`}
      preserveAspectRatio="none"
      viewBox="0 0 1200 32"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="arch-edge" width="60" height="32" patternUnits="userSpaceOnUse">
          <path d="M0 32 V20 Q15 20 30 2 Q45 20 60 20 V32Z" fill={fill} />
        </pattern>
      </defs>
      <rect width="1200" height="32" fill="url(#arch-edge)" />
    </svg>
  )
}

/* Flickering diya flame */
export function Diya({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 56" width="40" height="46" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="diya-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="#FFD700" stopOpacity=".55" />
          <stop offset="1" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="20" r="20" fill="url(#diya-glow)" />
      <path className="animate-flicker origin-bottom" style={{ transformBox: "fill-box" }} d="M24 4 C31 13 33 20 24 28 C15 20 17 13 24 4Z" fill="#FFB300" />
      <path className="animate-flicker origin-bottom" style={{ transformBox: "fill-box" }} d="M24 14 C28 19 28 23 24 27 C20 23 20 19 24 14Z" fill="#FFF3C4" />
      <path d="M6 34 H42 C40 46 32 52 24 52 C16 52 8 46 6 34Z" fill="#B45F06" />
      <path d="M6 34 H42" stroke="#FFD700" strokeWidth="2" />
    </svg>
  )
}

/* Temple skyline silhouette (replaces a 1.7 MB PNG) */
export function TempleSkyline({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 140" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M0 140 V118 H70 V104 H90 V118 H150 V96 L162 96 L170 70 L178 96 L190 96 V118 H260 V100 H282 L290 82 L298 100 H320 V118 H380 V90 Q392 62 404 40 L410 18 L416 40 Q428 62 440 90 V118 H470 V84 Q486 60 500 34 L506 10 L512 34 Q526 60 542 84 V118 H560 V50 L566 38 L572 20 L578 2 L584 -2 L590 2 L596 20 L602 38 L608 50 V118 H626 V84 Q642 60 656 34 L662 10 L668 34 Q682 60 698 84 V118 H728 V90 Q740 62 752 40 L758 18 L764 40 Q776 62 788 90 V118 H850 V100 H872 L880 82 L888 100 H910 V118 H980 V96 L992 96 L1000 70 L1008 96 L1020 96 V118 H1080 V104 H1100 V118 H1200 V140Z" />
    </svg>
  )
}
