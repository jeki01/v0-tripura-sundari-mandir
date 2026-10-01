import Link from "next/link"
import { Flower2, PhoneCall, ClipboardCheck, CalendarCheck } from "lucide-react"
import { PageShell } from "@/components/cms"
import ShringarBooking from "@/components/shringar-booking"
import { fetchShringarAvailability } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "श्रृंगार बुकिंग | श्री त्रिपुरा सुंदरी मंदिर",
  description: "माँ त्रिपुरा सुंदरी के श्रृंगार की बुकिंग के लिए उपलब्ध तिथियाँ देखें और अनुरोध भेजें।",
}

const steps = [
  { icon: CalendarCheck, title: "तिथि चुनें", text: "कैलेंडर में अगले 6 महीनों की उपलब्ध तिथि चुनें" },
  { icon: ClipboardCheck, title: "विवरण भरें", text: "नाम और मोबाइल नंबर के साथ अनुरोध भेजें" },
  { icon: PhoneCall, title: "टीम संपर्क करेगी", text: "मंदिर की टीम आपसे संपर्क करके बुकिंग की पुष्टि करेगी" },
]

export default async function ShringarPage() {
  const initial = await fetchShringarAvailability()
  return (
    <PageShell heading="श्रृंगार बुकिंग" subtitle="माँ त्रिपुरा सुंदरी के श्रृंगार की सेवा के लिए तिथि चुनें" eyebrow="Shringar Booking">
      <div className="mx-auto max-w-5xl space-y-12">
        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="temple-card flex items-start gap-4 p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A] ring-2 ring-[#FFD700]/70 ring-offset-2 ring-offset-[#FFFDF6]">
                <Icon size={22} />
              </span>
              <div>
                <p className="font-display text-lg text-[#8F0000]">
                  {i + 1}. {title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#3A2A1A]">{text}</p>
              </div>
            </li>
          ))}
        </ol>

        <ShringarBooking initial={initial} />

        <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-[#E0A100]/50 bg-[#FFF9E8] px-5 py-4 text-sm leading-relaxed text-[#5A4636]">
          <Flower2 size={22} className="mt-0.5 shrink-0 text-[#B30000]" />
          <span>
            नवरात्रि अष्टमी तथा कार्तिक पूर्णिमा के दिन श्रृंगार केवल मंदिर ट्रस्ट द्वारा किया जाता है। अधिक जानकारी के लिए{" "}
            <Link href="/contact" className="font-semibold text-[#B30000] underline">
              संपर्क पृष्ठ
            </Link>{" "}
            देखें।
          </span>
        </p>
      </div>
    </PageShell>
  )
}
