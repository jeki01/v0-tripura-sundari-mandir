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

export default function CmsImage({ src: rawSrc, alt, sizes, className, priority }: CmsImageProps) {
  const src = toProxyImgUrl(httpsStorageUrl(rawSrc))
  return <Image src={src} alt={alt} fill sizes={sizes} quality={75} priority={priority} className={className} />
}
