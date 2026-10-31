import Image from "next/image"
import { httpsStorageUrl } from "@/lib/api"
import { toProxyImgUrl } from "@/lib/proxy-img"

interface CmsImageProps {
  src: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

// Renders an admin-supplied image URL (normally from the storage service) inside a
// `relative` parent. Storage images are proxied through /api/img so the origin is
// never visible in the browser.
export default function CmsImage({ src: rawSrc, alt, sizes, className, priority }: CmsImageProps) {
  const src = toProxyImgUrl(httpsStorageUrl(rawSrc))
  return <Image src={src} alt={alt} fill sizes={sizes} quality={75} priority={priority} className={className} />
}
