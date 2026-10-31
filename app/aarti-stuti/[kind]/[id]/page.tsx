import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock, ExternalLink } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import ShareButtons from "@/components/share-buttons"
import YouTubePlayer from "@/components/youtube-player"
import AartiCard from "@/components/aarti-card"
import { Lotus, OrnamentDivider } from "@/components/ornaments"
import { SITE_URL } from "@/lib/api"
import { hindiDate } from "@/lib/darshan"
import { aartiPath, fetchAartiItems, stripHtml, type AartiItem } from "@/lib/aarti"
import { sanitizeCmsHtml } from "@/lib/sanitize"

// One page per video / article. Title, description and picture of the link preview are written into the page's
// <head> on the server, so WhatsApp and search engines can read them.
export const revalidate = 60

type Props = { params: Promise<{ kind: string; id: string }> }

const articleClass =
  "text-[17px] leading-[1.9] text-[#2F2218] [&_h2]:font-display [&_h2]:text-[#8F0000] [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-[#B30000] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-7 [&_h3]:mb-2 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-1.5 [&_a]:text-[#B30000] [&_a]:underline [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-[#E0A100] [&_blockquote]:bg-[#FFF4E6] [&_blockquote]:rounded-r-xl [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:text-[#6B0000] [&_img]:my-7 [&_img]:w-full [&_img]:rounded-2xl [&_strong]:text-[#6B0000]"

async function find(kind: string, id: string): Promise<{ item: AartiItem | null; all: AartiItem[] }> {
  const all = await fetchAartiItems()
  const wanted = decodeURIComponent(id)
  return { item: all.find((i) => i.kind === kind && i.id === wanted) ?? null, all }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind, id } = await params
  const { item } = await find(kind, id)
  if (!item) return { title: "आरती एवं स्तुति | श्री त्रिपुरा सुंदरी मंदिर", robots: { index: false } }
  const description = (item.summary || stripHtml(item.body)).slice(0, 200)
  const url = SITE_URL + aartiPath(item)
  const image = item.image.startsWith("/") ? SITE_URL + item.image : item.image
  const title = `${item.title} | आरती एवं स्तुति`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: item.kind === "video" ? "video.other" : "article",
      siteName: "Shree Tripura Sundari Mandir & Panchal Samaj",
      title: item.title,
      description,
      url,
      images: image ? [{ url: image, alt: item.title }] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title: item.title, description, images: image ? [image] : undefined },
  }
}

export default async function AartiDetailPage({ params }: Props) {
  const { kind, id } = await params
  const { item, all } = await find(kind, id)
  if (!item) notFound()

  const url = SITE_URL + aartiPath(item)
  const isVideo = item.kind === "video"
  const minutes = Math.max(1, Math.round(stripHtml(item.body).split(/\s+/).filter(Boolean).length / 180))
  const related = [...all.filter((i) => i.category === item.category && !(i.kind === item.kind && i.id === item.id)), ...all.filter((i) => i.category !== item.category)].slice(0, 3)

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />

      <main className="bg-jali pb-16 pt-32 md:pt-36">
        <article className="site-container">
          <div className="mx-auto max-w-4xl">
            <Link href="/aarti-stuti" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B30000] hover:underline">
              <ArrowLeft size={16} /> आरती एवं स्तुति
            </Link>

            <header className="mt-5 text-center">
              <span className="inline-flex gap-2">
                {item.category && <span className="rounded-full bg-[#B30000] px-4 py-1 text-xs font-semibold tracking-wide text-[#FFE27A]">{item.category}</span>}
                <span className="rounded-full bg-[#FFE9B8] px-4 py-1 text-xs font-semibold tracking-wide text-[#8F0000]">{isVideo ? "वीडियो" : "लेख"}</span>
              </span>
              <h1 className="mt-4 font-display text-3xl leading-tight text-[#6B0000] sm:text-4xl md:text-5xl">{item.title}</h1>
              {item.topic && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#5A4636]">{item.topic}</p>}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#7A5A3A]">
                {item.date && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={15} className="text-[#E0A100]" />
                    {hindiDate(item.date)}
                  </span>
                )}
                {!isVideo && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-[#E0A100]" />
                    {minutes} मिनट पढ़ने में
                  </span>
                )}
              </div>
              <div className="mt-6 flex justify-center">
                <ShareButtons title={item.title} url={url} label="साझा करें" />
              </div>
            </header>

            {isVideo ? (
              <div className="mt-8">
                <YouTubePlayer id={item.youtubeId} title={item.title} poster={item.image} />
                <a
                  href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#B30000] hover:underline"
                >
                  YouTube पर देखें <ExternalLink size={14} />
                </a>
                {item.body && (
                  <div className="temple-card mt-6 p-6 sm:p-8">
                    <p className="whitespace-pre-line text-[17px] leading-[1.9] text-[#2F2218]">{item.body}</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {item.image && (
                  <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border-[3px] border-[#E0A100]/70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="temple-card mt-8 p-6 sm:p-10">
                  <div className={articleClass} dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(item.body) }} />
                  <OrnamentDivider className="mt-10" />
                  <p className="mt-6 text-center font-display text-lg text-[#8F0000]">॥ जय श्री माँ त्रिपुरा सुंदरी ॥</p>
                </div>
              </>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="site-container mt-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-6 flex items-center justify-center gap-2 text-center font-display text-2xl text-[#8F0000]">
                <Lotus size={26} className="text-[#B30000]" />
                और आरती एवं स्तुति
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                {related.map((r) => (
                  <div key={r.kind + r.id} className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)]">
                    <AartiCard item={r} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
