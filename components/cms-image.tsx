import Image from "next/image"

// Hosts configured in next.config.mjs `images.remotePatterns`
const OPTIMIZED_HOSTS = new Set(["storage.shreetripurasundari.com"])

function canOptimize(src: string) {
  if (src.startsWith("/")) return true
  try {
    const u = new URL(src)
    return u.protocol === "https:" && OPTIMIZED_HOSTS.has(u.hostname)
  } catch {
    return false
  }
}

interface CmsImageProps {
  src: string
  alt: string
  sizes: string
  className?: string
  priority?: boolean
}

// Renders an admin-supplied image URL (normally from the storage service) inside a
// `relative` parent. Hosts we haven't whitelisted are shown as-is instead of failing.
export default function CmsImage({ src, alt, sizes, className, priority }: CmsImageProps) {
  return <Image src={src} alt={alt} fill sizes={sizes} quality={75} priority={priority} className={className} unoptimized={!canOptimize(src)} />
}
