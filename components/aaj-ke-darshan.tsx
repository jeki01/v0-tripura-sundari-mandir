import { SectionHeading } from "@/components/ornaments"
import { fetchDarshan, hindiDateLine } from "@/lib/darshan"
import DarshanGallery from "@/components/darshan-gallery"
import DarshanPopup from "@/components/darshan-popup"

// Home page, right under Quick Access: today's aarti-shringar darshan pictures with download / share buttons.
export default async function AajKeDarshan() {
  const darshan = await fetchDarshan()
  return (
    <section id="aaj-ke-darshan" className="scroll-mt-20 bg-[#FFF4E6] py-12 md:py-16">
      <div className="site-container">
        <SectionHeading title="आज के दर्शन" subtitle="Today's Darshan" />
        <DarshanGallery darshan={darshan} initialDate={hindiDateLine()} />
        {darshan.images.length > 0 && <DarshanPopup src={darshan.images[0]} />}
      </div>
    </section>
  )
}
