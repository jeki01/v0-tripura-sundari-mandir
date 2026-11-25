/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["31.97.237.171"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Serve resized AVIF/WebP instead of the raw files
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Storage images are proxied through /api/img and served as local paths
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      // Security headers on every page and API response
      {
        source: "/(.*)",
        headers: [
          // Prevent the site from being embedded in an iframe (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Stop browsers from MIME-sniffing the content type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limit referrer information sent to third parties
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Enforce HTTPS for 1 year (only send on production, not localhost)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Disable unused browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // CSP: allow Google Maps iframe; block everything else from unknown origins
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
              "font-src 'self' fonts.gstatic.com",
              // Local images + data URIs (PhotoPicker previews) + blob (canvas poster) + Vimeo CDN + storage
              "img-src 'self' data: blob: https://i.ytimg.com https://*.vimeocdn.com https://storage.shreetripurasundari.com",
              // Google Maps embed + Vimeo
              "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
              // Vimeo video CDN
              "media-src 'self' https://vimeo.com https://*.vimeocdn.com https://*.vimeo.com",
              // API calls: self + direct backend (client-side calls)
              "connect-src 'self' https://backend.shreetripurasundari.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
      // Long-lived cache for static assets
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ]
  },
}

export default nextConfig
