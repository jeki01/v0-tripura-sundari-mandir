import Link from "next/link"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { fetchFooter, safeHref, telHref } from "@/lib/footer"
import { SocialIcon, platformMeta } from "@/components/social-icons"
import { OrnamentDivider, TempleSkyline } from "@/components/ornaments"

// All text and links come from the admin (Mandir management -> Footer); lib/footer.ts holds the built-in defaults
// that are shown when nothing is saved or the content service does not answer.
export default async function Footer() {
  const { footer: f, social: socialLinks } = await fetchFooter()
  const tel = telHref(f.phone)
  const mailto = f.email ? `mailto:${f.email}` : ""
  const mapHref = safeHref(f.mapUrl)

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#5A0000] via-[#7A0000] to-[#2B0A0A] text-white">
      {/* Temple skyline (inline SVG, no image request) */}
      <TempleSkyline className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 w-full text-black/25" />

      <div className="relative z-10 pt-10">
        <OrnamentDivider tone="light" />
        {f.greeting && <p className="mt-3 text-center font-display text-lg text-[#FFD700]">{f.greeting}</p>}
      </div>

      {/* Tagline at top */}
      {/* <div className="bg-[#FFD700] text-[#B30000] text-center py-2">
        <p className="text-lg font-bold">जय श्री मां त्रिपुरा सुंदरी</p>
      </div> */}

      <div className="site-container py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Temple Info */}


          {/* Quick Links */}
          {f.quickLinks.length > 0 && (
            <div>
              <h4 className="text-xl font-bold mb-6 text-[#FFD700]">{f.quickLinksTitle}</h4>
              <ul className="space-y-2">
                {f.quickLinks.map((link, i) => (
                  <li key={`${link.url}-${i}`}>
                    <Link
                      href={link.url}
                      {...(/^https?:/i.test(link.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 text-sm flex items-center"
                    >
                      <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-2"></div>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trust Mandal */}
          {f.trustMembers.length > 0 && (
            <div>
              <h4 className="text-xl font-bold mb-6 text-[#FFD700]">{f.trustTitle}</h4>
              <ul className="space-y-2">
                {f.trustMembers.map((m, i) => (
                  <li key={`${m.name}-${i}`} className="text-[#FFF4E6] text-sm font-medium">
                    {m.role ? `${m.role} - ${m.name}` : m.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social media */}
          {socialLinks.length > 0 && (
            <div>
              <h4 className="text-xl font-bold mb-6 text-[#FFD700] flex items-center">{f.followTitle}</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((l, i) => (
                  <Link
                    key={`${l.url}-${i}`}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label || platformMeta(l.platform).name}
                    title={l.label || platformMeta(l.platform).name}
                    className="text-[#FFF4E6] hover:text-[#FFD700] transition-colors duration-200 p-2.5 rounded-full border border-[#FFD700]/30 hover:border-[#FFD700]"
                  >
                    <SocialIcon platform={l.platform} size={16} />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contact Info & Location */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-[#FFD700]">{f.contactTitle}</h4>
            <div className="space-y-3">
              {(f.placeName || f.addressLine1 || f.addressLine2) && (
                <div className="flex items-start space-x-3">
                  <MapPin className="text-[#FFD700] mt-1 flex-shrink-0" size={18} />
                  <div>
                    {f.placeName && <span className="text-[#FFF4E6] text-sm font-medium block">{f.placeName}</span>}
                    {f.addressLine1 && <span className="text-[#FFF4E6] text-sm block">{f.addressLine1}</span>}
                    {f.addressLine2 && <span className="text-[#FFF4E6] text-sm block">{f.addressLine2}</span>}
                  </div>
                </div>
              )}
              {f.phone &&
                (tel ? (
                  <a href={tel} className="flex items-center space-x-3 hover:text-[#FFD700]">
                    <Phone className="text-[#FFD700] flex-shrink-0" size={18} />
                    <span className="text-[#FFF4E6] text-sm">{f.phone}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Phone className="text-[#FFD700] flex-shrink-0" size={18} />
                    <span className="text-[#FFF4E6] text-sm">{f.phone}</span>
                  </div>
                ))}
              {f.email && (
                <a href={mailto} className="flex items-center space-x-3 hover:text-[#FFD700]">
                  <Mail className="text-[#FFD700] flex-shrink-0" size={18} />
                  <span className="text-sm break-all">{f.email}</span>
                </a>
              )}

              {mapHref && (
                <div className="mt-4">
                  <Link
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#FFD700] hover:text-white transition-colors duration-200 text-sm font-medium bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20"
                  >
                    <MapPin className="mr-2" size={16} />
                    {f.mapLabel || "Google Maps"}
                    <ExternalLink className="ml-1" size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="border-t border-[#FFD700] mt-8 pt-8">
          <div className="text-center">
            {f.copyright && (
              <p className="text-[#FFF4E6] text-sm mb-4">
                &copy; {new Date().getFullYear()} {f.copyright}
              </p>
            )}
            {f.closing && <p className="text-[#FFD700] text-sm">{f.closing}</p>}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#FFD700]"></div>
    </footer>
  )
}
