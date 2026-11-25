import Image from "next/image"
import { httpsStorageUrl } from "@/lib/api"

interface CmsImageProps {
  src: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

// Renders an admin-supplied image URL directly from storage (browser-side fetch, no server proxy).
export default function CmsImage({ src: rawSrc, alt, sizes, className, priority }: CmsImageProps) {
  const src = httpsStorageUrl(rawSrc)
  return <Image src={src} alt={alt} fill sizes={sizes} quality={75} priority={priority} className={className} unoptimized />
}
