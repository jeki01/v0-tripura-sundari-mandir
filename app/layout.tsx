import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tripura Sundari Mandir & Panchal Samaj 14 Chokhra | Shakti Peeth in Banswara",
  description:
    "Official digital platform of Tripura Sundari Mandir, one of the Shakti Peeths in Banswara, Rajasthan. Get live darshan, temple history, how to reach, and Panchal Samaj 14 Chokhra matrimonial and cultural updates.",
  keywords: [
    // Primary Temple Keywords
    "Tripura Sundari Mandir Banswara",
    "Tartai Mata",
    "Shakti Peeth in Banswara",
    "Tripura Sundari Live Darshan",
    "Tripura Sundari Mandir History",
    "Tripura Sundari Photos",
    "How to Reach Tripura Sundari Mandir",
    "Tripura Sundari Puja Timings",
    "Shaktipeeth Rajasthan",
    "Mandir in Rajasthan",
    "Tartai Mata Temple",
    "Tripura Mata Darshan",
    "Tripura Sundari Temple Events",
    "Tripura Mandir Map",
    "Tripura Sundari Bhajan",

    // Panchal Samaj Keywords
    "Panchal Samaj 14 Chokhra",
    "Panchal Samaj Matrimony",
    "Panchal Samaj Digital Platform",
    "Panchal Samaj Parichay Patrika",
    "Panchal Samaj Cultural Events",
    "Panchal Vivah Melas",
    "Panchal Youth Community",

    // Location & Regional Keywords
    "Banswara Temple",
    "Rajasthan temples",
    "Vagad region temples",
    "Mahi river temples",
    "Religious tourism Rajasthan",
    "Temple facilities Banswara",
    "Umrai village temple",
    "Talwara Banswara",

    // Service Keywords
    "Online pujas",
    "Temple booking online",
    "Live temple darshan",
    "Virtual temple visit",
    "Temple donations online",
    "Shringar booking",
    "Temple aarti timings",
    "Religious ceremonies",

    // Community Keywords
    "14 Chokhra community",
    "Panchal community services",
    "Traditional community organization",
    "Community matrimonial services",
    "Cultural heritage preservation",
    "Community digital initiatives",
  ].join(", "),
  authors: [
    { name: "Jeki Panchal", url: "https://shreetripurasundari.com" },
    { name: "Ankit Panchal", url: "https://shreetripurasundari.com" },
  ],
  creator: "Jeki Panchal & Ankit Panchal - Panchal Samaj 14 Chokhra",
  publisher: "Shree Tripura Sundari Mandir Trust & Panchal Samaj",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://shreetripurasundari.com"),
  alternates: {
    canonical: "/",
    languages: {
      "hi-IN": "/hi",
      "en-US": "/en",
      "gu-IN": "/gu", // Added Gujarati for regional audience
    },
  },
  openGraph: {
    title: "Tripura Sundari Mandir & Panchal Samaj 14 Chokhra | Official Website",
    description:
      "Explore Tripura Sundari Temple, Banswara – a divine Shakti Peeth with rich history and culture. Connect with Panchal Samaj 14 Chokhra's digital initiatives and matrimonial platform.",
    url: "https://shreetripurasundari.com",
    siteName: "Shree Tripura Sundari Mandir & Panchal Samaj",
    images: [
      {
        url: "/images/main-logo.png",
        width: 1200,
        height: 630,
        alt: "Tripura Sundari Mandir & Panchal Samaj 14 Chokhra - Official Digital Platform",
        type: "image/png",
      },
      {
        url: "/images/temple-1.jpg",
        width: 1200,
        height: 630,
        alt: "Maa Tripura Sundari Temple - Sacred Shakti Peetha in Banswara, Rajasthan",
        type: "image/jpeg",
      },
      {
        url: "/images/divine/ma-swarup-1.jpg",
        width: 1200,
        height: 630,
        alt: "Divine Swarup of Maa Tripura Sundari - 18-armed Sacred Idol",
        type: "image/jpeg",
      },
    ],
    locale: "hi_IN",
    type: "website",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tripura Sundari Mandir & Panchal Samaj Digital Portal",
    description:
      "Join the spiritual and community journey with Tripura Sundari Mandir and Panchal Samaj 14 Chokhra. Live darshan, event updates, matrimony & more.",
    images: [
      {
        url: "/images/main-logo.png",
        alt: "Tripura Sundari Mandir & Panchal Samaj Logo",
      },
    ],
    creator: "@TripuraSundariMandir",
    site: "@TripuraSundariMandir",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "Religion & Spirituality",
  classification: "Temple, Religious Institution, Community Organization, Cultural Heritage",
  icons: {
    icon: [
      { url: "/images/main-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/main-logo.png", sizes: "16x16", type: "image/png" },
      { url: "/images/main-logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/main-logo.png", sizes: "180x180", type: "image/png" },
      { url: "/images/main-logo.png", sizes: "152x152", type: "image/png" },
      { url: "/images/main-logo.png", sizes: "144x144", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/images/main-logo.png",
      },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Tripura Sundari Mandir",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#B30000",
    "msapplication-TileImage": "/images/main-logo.png",
    "theme-color": "#B30000",
  },
    generator: 'v0.app'
}

// JSON-LD Schema Markup for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Temple",
      "@id": "https://shreetripurasundari.com/#temple",
      name: "Shree Tripura Sundari Mandir",
      alternateName: ["Maa Tripura Sundari Temple", "Tartai Mata Temple", "Tripura Mata Mandir"],
      description:
        "One of 51 sacred Shakti Peethas located in Banswara, Rajasthan. Ancient temple dedicated to Goddess Tripura Sundari with 18-armed divine idol. Sacred pilgrimage site with rich cultural heritage.",
      url: "https://shreetripurasundari.com",
      logo: {
        "@type": "ImageObject",
        url: "https://shreetripurasundari.com/images/main-logo.png",
        width: 512,
        height: 512,
      },
      image: [
        {
          "@type": "ImageObject",
          url: "https://shreetripurasundari.com/images/temple-1.jpg",
          width: 1200,
          height: 800,
          caption: "Shree Tripura Sundari Mandir - Sacred Temple Complex",
        },
        {
          "@type": "ImageObject",
          url: "https://shreetripurasundari.com/images/main-logo.png",
          width: 512,
          height: 512,
          caption: "Official Temple Logo",
        },
        {
          "@type": "ImageObject",
          url: "https://shreetripurasundari.com/images/divine/ma-swarup-1.jpg",
          width: 800,
          height: 600,
          caption: "Divine Swarup of Maa Tripura Sundari",
        },
      ],
      telephone: "+91-79-2550-1234",
      email: "info@tripurasundari.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Near Umrai Village, Talwara",
        addressLocality: "Banswara",
        addressRegion: "Rajasthan",
        postalCode: "327001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 23.5441,
        longitude: 74.4421,
      },
      openingHours: ["Mo-Su 05:00-12:00", "Mo-Su 16:00-21:00"],
      sameAs: [
        "https://www.facebook.com/TripuraSundariMandir",
        "https://www.instagram.com/TripuraSundariMandir",
        "https://twitter.com/TripuraSundariMandir",
      ],
      founder: {
        "@type": "Organization",
        name: "Panchal Samaj 14 Chokhra",
      },
      hasMap: "https://g.co/kgs/ZEUPnyR",
      amenityFeature: [
        {
          "@type": "LocationFeatureSpecification",
          name: "Live Darshan",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Online Pujas",
          value: true,
        },
        {
          "@type": "LocationFeatureSpecification",
          name: "Parking Available",
          value: true,
        },
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://shreetripurasundari.com/#organization",
      name: "Panchal Samaj 14 Chokhra",
      description:
        "Traditional community organization serving Panchal Samaj across Banswara, Dungarpur, Pratapgarh, and Udaipur regions. Preserving cultural heritage and providing community services including matrimonial platform.",
      url: "https://shreetripurasundari.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://shreetripurasundari.com/#logo",
        url: "https://shreetripurasundari.com/images/main-logo.png",
        width: 512,
        height: 512,
        caption: "Shree Tripura Sundari Mandir & Panchal Samaj 14 Chokhra Official Logo",
      },
      image: {
        "@type": "ImageObject",
        url: "https://shreetripurasundari.com/images/main-logo.png",
        width: 512,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-79-2550-1234",
        contactType: "customer service",
        availableLanguage: ["Hindi", "English", "Gujarati"],
      },
      areaServed: [
        {
          "@type": "City",
          name: "Banswara",
        },
        {
          "@type": "City",
          name: "Dungarpur",
        },
        {
          "@type": "City",
          name: "Pratapgarh",
        },
        {
          "@type": "City",
          name: "Udaipur",
        },
      ],
      sameAs: [
        "https://www.facebook.com/TripuraSundariMandir",
        "https://www.instagram.com/TripuraSundariMandir",
        "https://twitter.com/TripuraSundariMandir",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://shreetripurasundari.com/#website",
      url: "https://shreetripurasundari.com",
      name: "Shree Tripura Sundari Mandir & Panchal Samaj",
      description:
        "Official digital portal for temple services, live darshan, community platform and cultural heritage preservation",
      publisher: {
        "@id": "https://shreetripurasundari.com/#organization",
      },
      logo: {
        "@type": "ImageObject",
        url: "https://shreetripurasundari.com/images/main-logo.png",
        width: 512,
        height: 512,
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://shreetripurasundari.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: ["hi-IN", "en-US", "gu-IN"],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi" className="scroll-smooth">
      <head>
        {/* Google Tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SVESPBE80M"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SVESPBE80M');
            `,
          }}
        />
        <link rel="icon" href="/images/main-logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/main-logo.png" />
        <meta name="theme-color" content="#B30000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-[#FFF4E6]">{children}</div>
      </body>
    </html>
  )
}
