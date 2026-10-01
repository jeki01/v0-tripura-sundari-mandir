import Link from "next/link"
import type { ReactNode } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import { ArchEdge, Lotus, Mandala, OrnamentDivider } from "@/components/ornaments"

interface PageHeroProps {
  title: ReactNode
  subtitle?: ReactNode
  eyebrow?: string
}

// Temple-style banner shared by all inner pages (matches the home page hero)
export function PageHero({ title, subtitle, eyebrow }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#2B0A0A] via-[#5A0000] to-[#8F0000] text-white">
      <Mandala className="pointer-events-none absolute -right-24 -top-10 -z-10 hidden h-[26rem] w-[26rem] text-[#FFD700]/15 animate-spin-mandala md:block" />
      <Mandala className="pointer-events-none absolute -left-32 bottom-0 -z-10 hidden h-[22rem] w-[22rem] text-[#FFD700]/10 animate-spin-mandala md:block" />

      <div className="container mx-auto px-4 pb-16 pt-32 text-center md:pb-20 md:pt-40">
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-xs text-[#FFE9B8]/80">
          <Link href="/" className="hover:text-[#FFD700]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#FFD700]">{eyebrow || "Mandir"}</span>
        </nav>

        <h1 className="font-display text-gold-gradient text-3xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-sm text-[#FFE9B8] sm:text-base">{subtitle}</p>}
        <OrnamentDivider tone="light" className="mt-5" />
      </div>

      <ArchEdge fill="#FFF4E6" className="absolute bottom-0 left-0" />
    </section>
  )
}

interface PageShellProps extends Partial<PageHeroProps> {
  heading?: ReactNode
  children: ReactNode
}

export function PageShell({ heading, subtitle, eyebrow, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      {heading ? (
        <PageHero title={heading} subtitle={subtitle} eyebrow={eyebrow} />
      ) : (
        <div className="h-28" aria-hidden="true" />
      )}
      <main className="bg-jali">
        <div className="container mx-auto px-4 py-12 md:py-16">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export const proseClass =
  "max-w-none text-[#3A2A1A] text-[15px] md:text-base leading-relaxed [&_h2]:font-display [&_h2]:text-[#8F0000] [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_h3]:text-[#B30000] [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1 [&_a]:text-[#B30000] [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-4 [&_blockquote]:border-[#E0A100] [&_blockquote]:bg-[#FFF4E6] [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-[#5A4636] [&_p]:mb-3 [&_img]:my-4 [&_img]:rounded-xl [&_img]:border-2 [&_img]:border-[#E0A100]/60 [&_img]:shadow-md [&_strong]:text-[#6B0000]"

export function RichBody({ html }: { html: string }) {
  return (
    <div className="temple-card mx-auto max-w-4xl p-6 md:p-10">
      <div className={proseClass} dangerouslySetInnerHTML={{ __html: html || "" }} />
    </div>
  )
}

export function EmptyNote({ text = "जल्द ही उपलब्ध होगा।" }: { text?: string }) {
  return (
    <div className="temple-card mx-auto flex max-w-md flex-col items-center gap-3 px-6 py-10 text-center">
      <Lotus size={40} className="text-[#E0A100]" />
      <p className="text-[#5A4636]">{text}</p>
    </div>
  )
}
