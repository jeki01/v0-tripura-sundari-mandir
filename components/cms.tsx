import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import type { ReactNode } from "react"

export function PageShell({ heading, children }: { heading?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="container mx-auto px-4 py-12 mt-20">
        {heading && (
          <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#B30000] mb-10">{heading}</h1>
        )}
        {children}
      </main>
      <Footer />
    </div>
  )
}

const proseClass =
  "prose prose-sm md:prose-base max-w-none text-gray-800 [&_h2]:text-[#B30000] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h3]:text-[#B30000] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-orange-300 [&_blockquote]:pl-4 [&_blockquote]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-3 [&_img]:rounded-lg"

export function RichBody({ html }: { html: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md max-w-4xl mx-auto">
      <div className={proseClass} dangerouslySetInnerHTML={{ __html: html || "" }} />
    </div>
  )
}

export function EmptyNote({ text = "जल्द ही उपलब्ध होगा।" }: { text?: string }) {
  return <p className="text-center text-gray-500">{text}</p>
}
