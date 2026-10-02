import { MessageSquareHeart } from "lucide-react"
import { TestimonialForm } from "@/components/submission-forms"

// "Share your experience" box at the bottom of the visitors page. What people send is read by the temple team in the
// admin dashboard; nothing sent here is published on the website automatically.
export default function TestimonialSection() {
  return (
    <section id="share-experience" className="mx-auto mt-14 max-w-3xl scroll-mt-28" aria-labelledby="share-experience-title">
      <div className="temple-card p-5 sm:p-8">
        <div className="mb-5 flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] text-[#FFE27A]">
            <MessageSquareHeart size={22} />
          </span>
          <div>
            <h2 id="share-experience-title" className="font-display text-2xl text-[#8F0000]">अपना अनुभव साझा करें</h2>
            <p className="mt-1 text-sm text-[#3A2A1A]">माँ त्रिपुरा सुंदरी के दर्शन का अपना अनुभव, टिप्पणी या फ़ोटो हमें भेजें।</p>
          </div>
        </div>
        <TestimonialForm />
      </div>
    </section>
  )
}
