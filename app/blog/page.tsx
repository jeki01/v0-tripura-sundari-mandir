import Header from "@/components/header"
import Footer from "@/components/footer"
import NavigationHandler from "@/components/navigation-handler"
import ScrollProgress from "@/components/scroll-progress"
import Link from "next/link"
import { fetchPublishedBlogs } from "@/lib/api"

export const dynamic = "force-dynamic"

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString("hi-IN", { year: "numeric", month: "long", day: "numeric" })
  } catch {
    return ""
  }
}

export default async function BlogListPage() {
  const blogs = await fetchPublishedBlogs()

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <NavigationHandler />

      <main className="container mx-auto px-4 py-12 mt-20">
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-[#B30000] mb-10">
          ब्लॉग (Blog)
        </h1>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-600">अभी तक कोई ब्लॉग प्रकाशित नहीं हुआ है।</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {blogs.map((b: any) => (
              <Link
                key={b.id}
                href={`/blog/${encodeURIComponent(b.slug)}`}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {b.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={b.coverImage} alt={b.title} className="w-full h-44 object-cover" />
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-[#B30000] text-lg">
                    श्री त्रिपुरा सुंदरी
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="text-lg font-semibold text-[#B30000] mb-1 line-clamp-2">{b.title}</h2>
                  <p className="text-xs text-gray-500 mb-2">
                    {b.author ? `${b.author} · ` : ""}
                    {formatDate(b.publishedAt || b.createdAt)}
                  </p>
                  {b.excerpt && <p className="text-sm text-gray-700 line-clamp-3 flex-1">{b.excerpt}</p>}
                  <span className="mt-3 text-sm font-medium text-orange-600">पढ़ें →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
