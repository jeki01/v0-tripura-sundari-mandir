import Image from "next/image"
import { Lotus, Mandala, SectionHeading } from "@/components/ornaments"

interface DivineImage {
  src: string
  alt: string
  caption: string
}

interface TempleStructureProps {
  divineImages: DivineImage[]
}

const idolDetails = [
  ["सिंहवाहिनी मूर्ति", "अठारह भुजाओं वाली विशाल प्रतिमा"],
  ["ऊंचाई", "लगभग 5 फीट ऊँची"],
  ["अस्त्र-शस्त्र", "विभिन्न प्रकार के दिव्य आयुध"],
  ["नौ दुर्गा", "शीतकालीन मूर्तियाँ"],
  ["श्री यंत्र", "देवी के चरणों के पास स्थापित"],
  ["प्रभामंडल", "सुनहरा तेजोमय प्रकाश"],
]

export default function TempleStructureSection({ divineImages }: TempleStructureProps) {
  return (
    <section id="divya-swaroop" className="relative isolate overflow-hidden bg-gradient-to-b from-[#3A0808] via-[#4A0A0A] to-[#2B0A0A] py-16 md:py-24">
      <Mandala className="pointer-events-none absolute -left-40 top-10 -z-10 h-[38rem] w-[38rem] text-[#FFD700]/10 animate-spin-mandala" />
      <Mandala className="pointer-events-none absolute -right-48 bottom-0 -z-10 h-[40rem] w-[40rem] text-[#FFD700]/10 animate-spin-mandala" />

      <div className="container mx-auto px-4">
        <SectionHeading tone="light" title="माँ त्रिपुरा सुंदरी के दिव्य स्वरूप" subtitle="Divine Darshan of the 18-Armed Goddess" />

        {/* Arch-shaped niches, like a temple jharokha */}
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-8 gap-y-12">
          {divineImages.map((image) => (
            <figure key={image.src} className="group w-full max-w-sm sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
              <div className="arch-frame relative aspect-[3/4] overflow-hidden border-[3px] border-[#E0A100] bg-black shadow-[0_0_0_6px_rgba(224,161,0,0.18),0_24px_40px_-18px_rgba(0,0,0,0.8)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 90vw"
                  quality={72}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={false}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-3 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#B30000] font-display text-lg text-[#FFD700] ring-2 ring-[#FFD700]/80">
                  ॐ
                </span>
              </div>
              <figcaption className="mt-5 text-center">
                <span className="font-display text-base text-[#FFE9B8]">{image.caption}</span>
                <span className="mx-auto mt-2 block h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Significance */}
        <div className="mx-auto mt-14 max-w-4xl rounded-2xl border border-[#E0A100]/50 bg-black/25 p-6 text-center backdrop-blur-sm md:p-8">
          <h3 className="mb-3 flex items-center justify-center gap-2 font-display text-xl text-[#FFD700]">
            <Lotus size={22} />
            दिव्य दर्शन का महत्व
          </h3>
          <p className="leading-relaxed text-[#FFE9B8]/90">
            ये पावन छवियां माँ त्रिपुरा सुंदरी के दिव्य स्वरूप को दर्शाती हैं...
          </p>
        </div>

        {/* Idol details + temple */}
        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E0A100]/50 bg-gradient-to-br from-[#FFF9E8] to-[#FFEFC9] p-6 shadow-xl md:p-8">
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl text-[#8F0000]">
              <Lotus size={22} className="text-[#B30000]" />
              माँ त्रिपुरा सुंदरी की मूर्ति
            </h3>
            <ul className="space-y-3 text-[#3A2A1A]">
              {idolDetails.map(([label, value]) => (
                <li key={label} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-[#E0A100]" />
                  <span>
                    <strong className="text-[#8F0000]">{label}:</strong> {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-[3px] border-[#E0A100] shadow-[0_0_0_6px_rgba(224,161,0,0.18),0_24px_40px_-18px_rgba(0,0,0,0.8)]">
              <Image
                src="/images/temple-9.jpg"
                alt="श्री त्रिपुरा सुंदरी मंदिर का गर्भगृह मंडप"
                fill
                sizes="(min-width: 1024px) 576px, 100vw"
                quality={72}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
