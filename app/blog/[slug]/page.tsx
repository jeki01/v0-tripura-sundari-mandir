import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import Link from "next/link"
import { notFound } from "next/navigation"
import { fetchBlogBySlug } from "@/lib/api"

export const dynamic = "force-dynamic"

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("hi-IN", { year: "numeric", month: "long", day: "numeric" })
  } catch {
    return ""
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = await fetchBlogBySlug(decodeURIComponent(slug))
  if (!blog || blog.status !== "published") notFound()

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />

      <main className="container mx-auto px-4 py-12 mt-20 max-w-3xl">
        <Link href="/blog" className="text-sm text-orange-600 hover:underline">← सभी ब्लॉग</Link>

        <h1 className="text-3xl md:text-4xl font-semibold text-[#B30000] mt-4 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          {blog.author ? `${blog.author} · ` : ""}
          {formatDate(blog.publishedAt || blog.createdAt)}
        </p>

        {blog.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={blog.coverImage} alt={blog.title} className="w-full rounded-2xl shadow-md mb-8 object-cover max-h-[420px]" />
        )}

        <article
          className="bg-white rounded-2xl p-6 md:p-8 shadow-md prose prose-sm md:prose-base max-w-none text-gray-800 [&_h2]:text-[#B30000] [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-6 [&_h3]:text-[#B30000] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-blue-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-orange-300 [&_blockquote]:pl-4 [&_blockquote]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-3"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />
      </main>

      <Footer />
    </div>
  )
}
