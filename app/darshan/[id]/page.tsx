import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollProgress from "@/components/scroll-progress"
import DarshanSingleActions from "@/components/darshan-single-actions"
import { SectionHeading } from "@/components/ornaments"
import { SITE_URL, httpsStorageUrl } from "@/lib/api"
import { toProxyImgUrl } from "@/lib/proxy-img"
import { fetchDarshan, findDarshanImage, hindiDateLine } from "@/lib/darshan"

// One page per darshan picture. The link preview (WhatsApp, Facebook, ...) is read from this page's <head>,
// which is rendered on the server: the title, description and the picture's own address (the original file on
// the storage service, not a resized copy).
export const revalidate = 60

type Props = { params: Promise<{ id: string }> }

const absolute = (url: string) => (url.startsWith("/") ? SITE_URL + url : httpsStorageUrl(url))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const darshan = await fetchDarshan()
  const src = findDarshanImage(darshan.images, id)
  if (!src) return { robots: { index: false } }
  const image = absolute(src)
  const url = `${SITE_URL}/darshan/${id}`
  const title = "आज के दर्शन — श्री त्रिपुरा सुंदरी मंदिर"
  const description = `${darshan.caption} 🙏 ${darshan.closing}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "Shree Tripura Sundari Mandir & Panchal Samaj",
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

export default async function DarshanPage({ params }: Props) {
  const { id } = await params
  const darshan = await fetchDarshan()
  const src = findDarshanImage(darshan.images, id)
  // an older picture that has since been replaced: show the current darshan instead
  if (!src) {
    if (darshan.images.length) redirect("/#aaj-ke-darshan")
    notFound()
  }
  const storageImage = httpsStorageUrl(src) // real URL for OG metadata and download
  const image = toProxyImgUrl(storageImage)  // proxy URL for page display

  return (
    <div className="min-h-screen bg-[#FFF4E6]">
      <ScrollProgress />
      <Header />
      <main className="bg-jali pb-16 pt-36 md:pt-40">
        <div className="site-container">
          <SectionHeading title="आज के दर्शन" subtitle="Today's Darshan" />
          <div className="mx-auto max-w-[420px] text-center">
            <p className="font-display whitespace-pre-line text-lg leading-relaxed text-[#8F0000] sm:text-xl">{darshan.verse}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#5C2A0A] sm:text-base">{darshan.caption}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#C8941A]/60 bg-white/80 px-4 py-1.5 font-display text-base text-[#8F0000]">
              <span aria-hidden="true">📅</span> {hindiDateLine()}
            </p>

            <div className="mt-6 rounded-t-[999px] rounded-b-3xl bg-gradient-to-b from-[#FFD700] via-[#C8941A] to-[#8F0000] p-[5px] shadow-[0_10px_30px_-12px_rgba(143,0,0,0.5)]">
              <div className="overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] bg-[#FFF6E2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={`माँ त्रिपुरा सुंदरी के आज के दर्शन`} className="block aspect-[3/4] w-full object-cover" />
                <div className="p-3 text-left">
                  <DarshanSingleActions src={storageImage} link={`${SITE_URL}/darshan/${id}`} caption={darshan.caption} closing={darshan.closing} />
                </div>
              </div>
            </div>

            <p className="mt-6 font-display text-xl text-[#8F0000]">🙏 {darshan.closing} 🙏</p>
            <Link href="/#aaj-ke-darshan" className="mt-4 inline-block rounded-full border border-[#C8941A] bg-white px-5 py-2 text-sm font-medium text-[#8F0000] hover:bg-[#FFF4E6]">
              आज के सभी दर्शन देखें
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
