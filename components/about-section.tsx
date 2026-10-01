import Link from "next/link"
import { BookOpen } from "lucide-react"
import { SectionHeading } from "@/components/ornaments"
import CmsImage from "@/components/cms-image"
import { proseClass } from "@/components/cms"

interface AboutSectionProps {
  title?: string
  subtitle?: string
  html?: string
  images?: string[]
}

// Presentation only — every piece of text and every image comes from the admin portal (DB).
export default function AboutSection({ title, subtitle, html, images = [] }: AboutSectionProps) {
  const gallery = images.filter(Boolean)
  const hasImages = gallery.length > 0

  return (
    <section id="about-mandir" className="bg-jali py-6 md:py-10">
      <div className="container mx-auto px-4">
        <SectionHeading as="h1" title={title || "मंदिर का परिचय"} subtitle={subtitle} />

        <div className={`mx-auto grid max-w-6xl items-start gap-8 lg:gap-10 ${hasImages ? "lg:grid-cols-[3fr_2fr]" : "max-w-4xl"}`}>
          <div className="temple-card p-6 md:p-10">
            <div className={proseClass} dangerouslySetInnerHTML={{ __html: html || "" }} />
          </div>

          {hasImages && (
            <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-32">
              {gallery.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className={`relative aspect-[3/2] overflow-hidden rounded-xl border-[3px] border-[#E0A100] bg-[#2B0A0A] shadow-lg ${
                    gallery.length % 2 === 1 && i === 0 ? "col-span-2" : ""
                  }`}
                >
                  <CmsImage
                    src={src}
                    alt={`${title || "श्री त्रिपुरा सुंदरी मंदिर"} ${i + 1}`}
                    sizes="(min-width: 1024px) 24vw, 45vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="temple-card mx-auto mt-10 max-w-3xl p-6 text-center">
          <h3 className="mb-2 flex items-center justify-center gap-2 font-display text-xl text-[#8F0000]">
            <BookOpen size={22} className="text-[#B30000]" />
            संपूर्ण मंदिर इतिहास
          </h3>
          <p className="mb-4 text-[#3A2A1A]">
            माँ त्रिपुरा सुंदरी मंदिर के विस्तृत इतिहास, वास्तुशिल्प और आध्यात्मिक महत्व की जानकारी प्राप्त करें
          </p>
          <Link
            href="/history"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-8 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            संपूर्ण इतिहास पढ़ें
          </Link>
        </div>
      </div>
    </section>
  )
}
