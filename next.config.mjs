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
    // Vercel Hobby plan image optimization quota exhausted (402).
    // Serve images directly until upgraded to Pro.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "storage.shreetripurasundari.com",
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
              "img-src 'self' data: blob: https://i.ytimg.com https://*.vimeocdn.com https://storage.shreetripurasundari.com",
              "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
              "media-src 'self' https: blob:",
              "connect-src 'self'",
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
