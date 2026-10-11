import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, FileText } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import PressShare from "@/components/press-share"
import { OrnamentDivider } from "@/components/ornaments"
import { SITE_URL } from "@/lib/api"
import { fetchPress, pressPath } from "@/lib/press"

// One page per press release. Title, description and picture for the link preview (WhatsApp, Facebook, ...)
// are written into the page's <head> on the server.
export const revalidate = 60

type Props = { params: Promise<{ id: string }> }

const find = async (id: string) => {
  const all = await fetchPress()
  const wanted = decodeURIComponent(id)
  return { item: all.find((p) => p.id === wanted) ?? null, all }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const { item } = await find(id)
  if (!item) return { title: "प्रेस विज्ञप्ति | श्री त्रिपुरा सुंदरी मंदिर", robots: { index: false } }
  const description = (item.summary || "श्री त्रिपुरा सुंदरी मंदिर ट्रस्ट की आधिकारिक प्रेस विज्ञप्ति").replace(/\s+/g, " ").slice(0, 200)
  const url = SITE_URL + pressPath(item.id)
  const image = item.image ? (item.image.startsWith("/") ? SITE_URL + item.image : item.image) : `${SITE_URL}/images/main-logo.png`
  return {
    title: `${item.title} | प्रेस विज्ञप्ति`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Shree Tripura Sundari Mandir & Panchal Samaj",
      title: item.title,
      description,
      url,
      images: [{ url: image, alt: item.title }],
    },
    twitter: { card: item.image ? "summary_large_image" : "summary", title: item.title, description, images: [image] },
  }
}

export default async function PressDetailPage({ params }: Props) {
  const { id } = await params
  const { item } = await find(id)
  if (!item) notFound()
  const url = SITE_URL + pressPath(item.id)

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />
      <main className="bg-jali pb-16 pt-32 md:pt-36">
        <article className="site-container">
          <div className="mx-auto max-w-3xl">
            <Link href="/press-release" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B30000] hover:underline">
              <ArrowLeft size={16} /> सभी प्रेस विज्ञप्तियाँ
            </Link>
            <header className="mt-5 text-center">
              <span className="inline-block rounded-full bg-[#FFE9B8] px-4 py-1 text-xs font-semibold tracking-wide text-[#8F0000]">प्रेस विज्ञप्ति</span>
              <h1 className="mt-4 font-display text-3xl leading-tight text-[#6B0000] sm:text-4xl">{item.title}</h1>
              {item.dateLabel && (
                <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-[#7A5A3A]">
                  <CalendarDays size={15} className="text-[#E0A100]" />
                  {item.dateLabel}
                </p>
              )}
            </header>

            {item.image && (
              <div className="mt-8 overflow-hidden rounded-3xl border-[3px] border-[#E0A100]/70">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} className="block aspect-[16/9] w-full object-cover" />
              </div>
            )}

            <div className="temple-card mt-8 p-6 sm:p-10">
              {item.summary && <p className="whitespace-pre-line text-[17px] leading-[1.9] text-[#2F2218]">{item.summary}</p>}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#B30000] to-[#8F0000] px-5 py-2 text-sm font-semibold text-white shadow transition hover:brightness-110"
                  >
                    <FileText size={15} />
                    PDF / पूरी विज्ञप्ति देखें
                  </a>
                )}
                <PressShare title={item.title} summary={item.summary} url={url} />
              </div>
              <OrnamentDivider className="mt-10" />
              <p className="mt-6 text-center font-display text-lg text-[#8F0000]">॥ जय श्री माँ त्रिपुरा सुंदरी ॥</p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
