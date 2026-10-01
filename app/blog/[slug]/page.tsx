import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import CmsImage from "@/components/cms-image"
import ShareButtons from "@/components/share-buttons"
import { Lotus, OrnamentDivider } from "@/components/ornaments"
import { SITE_URL, fetchBlogBySlug, fetchPublishedBlogs, formatHindiDate } from "@/lib/api"

export const dynamic = "force-dynamic"

const articleClass =
  "text-[17px] leading-[1.9] text-[#2F2218] [&_h2]:font-display [&_h2]:text-[#8F0000] [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-3 [&_h3]:text-[#B30000] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-7 [&_h3]:mb-2 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-1.5 [&_a]:text-[#B30000] [&_a]:underline [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-[#E0A100] [&_blockquote]:bg-[#FFF4E6] [&_blockquote]:rounded-r-xl [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:text-[#6B0000] [&_img]:my-7 [&_img]:w-full [&_img]:rounded-2xl [&_img]:shadow-lg [&_strong]:text-[#6B0000] [&>p:first-of-type]:text-lg [&>p:first-of-type]:text-[#4A3826]"

function readingMinutes(html: string) {
  const words = (html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 180))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = await fetchBlogBySlug(decodeURIComponent(slug))
  if (!blog || blog.status !== "published") return { title: "ब्लॉग | श्री त्रिपुरा सुंदरी मंदिर" }
  const description = blog.excerpt || String(blog.content || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160)
  const url = `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`
  return {
    title: `${blog.title} | श्री त्रिपुरा सुंदरी मंदिर`,
    description,
    alternates: { canonical: url },
    openGraph: { title: blog.title, description, url, type: "article", images: blog.coverImage ? [{ url: blog.coverImage }] : undefined },
    twitter: { card: blog.coverImage ? "summary_large_image" : "summary", title: blog.title, description, images: blog.coverImage ? [blog.coverImage] : undefined },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [blog, all] = await Promise.all([fetchBlogBySlug(decodeURIComponent(slug)), fetchPublishedBlogs()])
  if (!blog || blog.status !== "published") notFound()

  const url = `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`
  const more = (all as any[]).filter((b) => b.slug !== blog.slug).slice(0, 3)
  const date = formatHindiDate(blog.publishedAt || blog.createdAt)

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />

      <main className="bg-jali pb-16 pt-32 md:pt-36">
        <article className="mx-auto max-w-3xl px-4">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B30000] hover:underline">
            <ArrowLeft size={16} /> सभी ब्लॉग
          </Link>

          <header className="mt-5 text-center">
            <span className="inline-block rounded-full bg-[#FFE9B8] px-4 py-1 text-xs font-semibold tracking-wide text-[#8F0000]">ब्लॉग</span>
            <h1 className="mt-4 font-display text-3xl leading-tight text-[#6B0000] sm:text-4xl md:text-5xl">{blog.title}</h1>
            {blog.excerpt && <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#5A4636]">{blog.excerpt}</p>}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[#7A5A3A]">
              {blog.author && (
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#B30000] to-[#FF6B00] font-display text-[#FFE27A]">
                    {String(blog.author).charAt(0)}
                  </span>
                  {blog.author}
                </span>
              )}
              {date && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={15} className="text-[#E0A100]" />
                  {date}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#E0A100]" />
                {readingMinutes(blog.content)} मिनट पढ़ने में
              </span>
            </div>

            <div className="mt-6 flex justify-center">
              <ShareButtons title={blog.title} url={url} />
            </div>
          </header>

          {blog.coverImage && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border-[3px] border-[#E0A100]/70 shadow-xl">
              <CmsImage src={blog.coverImage} alt={blog.title} sizes="(min-width: 768px) 768px, 100vw" priority className="object-cover" />
            </div>
          )}

          <div className="temple-card mt-8 p-6 sm:p-10">
            <div className={articleClass} dangerouslySetInnerHTML={{ __html: blog.content || "" }} />

            <OrnamentDivider className="mt-10" />
            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              <p className="font-display text-lg text-[#8F0000]">॥ जय श्री माँ त्रिपुरा सुंदरी ॥</p>
              <ShareButtons title={blog.title} url={url} label="अच्छा लगा? साझा करें" />
            </div>
          </div>
        </article>

        {more.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl px-4">
            <h2 className="mb-6 flex items-center justify-center gap-2 text-center font-display text-2xl text-[#8F0000]">
              <Lotus size={26} className="text-[#B30000]" />
              और ब्लॉग पढ़ें
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {more.map((b) => (
                <Link key={b.id} href={`/blog/${encodeURIComponent(b.slug)}`} className="temple-card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#5A0000] to-[#B30000]">
                    {b.coverImage && <CmsImage src={b.coverImage} alt={b.title} sizes="(min-width: 768px) 320px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-display text-base leading-snug text-[#8F0000]">{b.title}</h3>
                    <p className="mt-1 text-xs text-[#7A5A3A]">{formatHindiDate(b.publishedAt || b.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
