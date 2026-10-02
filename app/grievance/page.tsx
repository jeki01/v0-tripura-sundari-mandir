import { ShieldCheck, PhoneCall, ClipboardList } from "lucide-react"
import { PageShell } from "@/components/cms"
import { GrievanceForm } from "@/components/submission-forms"

export const metadata = {
  title: "शिकायत निवारण | श्री त्रिपुरा सुंदरी मंदिर",
  description: "मंदिर से जुड़ी अपनी शिकायत या सुझाव दर्ज करें। मंदिर की टीम आपसे संपर्क करेगी।",
}

const steps = [
  { icon: ClipboardList, title: "शिकायत लिखें", text: "नाम, मोबाइल नंबर और शिकायत का विवरण भरें, चाहें तो फ़ोटो जोड़ें" },
  { icon: ShieldCheck, title: "संदर्भ संख्या पाएँ", text: "दर्ज होते ही आपको एक संदर्भ संख्या मिलेगी" },
  { icon: PhoneCall, title: "टीम संपर्क करेगी", text: "मंदिर की टीम आपसे संपर्क करके समाधान करेगी" },
]

export default function GrievancePage() {
  return (
    <PageShell heading="शिकायत निवारण" subtitle="अपनी शिकायत या सुझाव हम तक पहुँचाएँ" eyebrow="Grievance Redressal">
      <div className="mx-auto max-w-4xl space-y-10">
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

        <section className="temple-card p-5 sm:p-8" aria-labelledby="grievance-form">
          <h2 id="grievance-form" className="mb-5 font-display text-2xl text-[#8F0000]">शिकायत दर्ज करें</h2>
          <GrievanceForm />
          <p className="mt-5 text-xs leading-relaxed text-[#7A5A3A]">आपका नाम, मोबाइल नंबर और ईमेल केवल मंदिर की टीम को दिखते हैं; वेबसाइट पर कहीं प्रकाशित नहीं होते।</p>
        </section>
      </div>
    </PageShell>
  )
}
