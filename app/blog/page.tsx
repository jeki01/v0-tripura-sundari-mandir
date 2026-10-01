import Link from "next/link"
import { CalendarDays, PenLine } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import CmsImage from "@/components/cms-image"
import { Lotus } from "@/components/ornaments"
import { fetchPublishedBlogs, formatHindiDate } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "ब्लॉग | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर से जुड़े लेख, समाचार और भक्ति कथाएँ।",
}

function Cover({ src, title, sizes, priority }: { src?: string; title: string; sizes: string; priority?: boolean }) {
  return src ? (
    <CmsImage src={src} alt={title} sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-105" />
  ) : (
    <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#5A0000] to-[#B30000] text-[#FFD700]/70">
      <Lotus size={56} />
    </span>
  )
}

function Meta({ blog }: { blog: any }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7A5A3A]">
      {blog.author && (
        <span className="flex items-center gap-1">
          <PenLine size={13} className="text-[#E0A100]" />
          {blog.author}
        </span>
      )}
      <span className="flex items-center gap-1">
        <CalendarDays size={13} className="text-[#E0A100]" />
        {formatHindiDate(blog.publishedAt || blog.createdAt)}
      </span>
    </p>
  )
}

export default async function BlogListPage() {
  const blogs: any[] = await fetchPublishedBlogs()
  const [featured, ...rest] = blogs

  return (
    <PageShell heading="ब्लॉग" subtitle="मंदिर से जुड़े लेख, समाचार और भक्ति कथाएँ" eyebrow="Blog">
      {blogs.length === 0 ? (
        <EmptyNote text="अभी तक कोई ब्लॉग प्रकाशित नहीं हुआ है।" />
      ) : (
        <div className="mx-auto max-w-6xl space-y-10">
          {/* Featured (latest) post */}
          <Link
            href={`/blog/${encodeURIComponent(featured.slug)}`}
            className="temple-card group grid overflow-hidden transition duration-300 hover:-translate-y-1 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <Cover src={featured.coverImage} title={featured.title} sizes="(min-width: 768px) 50vw, 100vw" priority />
              <span className="absolute left-4 top-4 rounded-full bg-[#B30000] px-3 py-1 text-xs font-semibold text-[#FFE27A] shadow">ताज़ा ब्लॉग</span>
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <Meta blog={featured} />
              <h2 className="mt-3 font-display text-2xl leading-snug text-[#8F0000] md:text-3xl">{featured.title}</h2>
              {featured.excerpt && <p className="mt-3 line-clamp-4 leading-relaxed text-[#3A2A1A]">{featured.excerpt}</p>}
              <span className="mt-5 font-semibold text-[#B30000]">पूरा पढ़ें →</span>
            </div>
          </Link>

          {rest.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${encodeURIComponent(b.slug)}`}
                  className="temple-card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl">
                    <Cover src={b.coverImage} title={b.title} sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 100vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <Meta blog={b} />
                    <h2 className="mt-2 line-clamp-2 font-display text-lg leading-snug text-[#8F0000]">{b.title}</h2>
                    {b.excerpt && <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#3A2A1A]">{b.excerpt}</p>}
                    <span className="mt-4 text-sm font-semibold text-[#B30000]">पढ़ें →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </PageShell>
  )
}
