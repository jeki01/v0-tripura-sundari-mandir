import { MapPin, Clock, Mail, Phone, ShoppingBag } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import CmsImage from "@/components/cms-image"
import { Lotus } from "@/components/ornaments"
import { SocialIcon } from "@/components/social-icons"
import { extractPhone, fetchContent, formatPrice, whatsappLink } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "ई-स्टोर | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर ई-स्टोर - पूजा सामग्री, प्रसाद और स्मृति उत्पाद।",
}

interface Product {
  name?: string
  price?: string
  description?: string
  image?: string
  availability?: string
}
interface ContactRow {
  label?: string
  value?: string
  phone?: string
}

// Products: admin -> Mandir -> ई-स्टोर उत्पाद   |   Contact: admin -> Mandir -> ई-स्टोर संपर्क विवरण
export default async function EStorePage() {
  const [p, c] = await Promise.all([fetchContent("estore"), fetchContent("estore-contact")])
  const products: Product[] = (Array.isArray(p?.items) ? p.items : []).filter((x: Product) => x && x.name)
  const info = c?.items && !Array.isArray(c.items) ? c.items : {}
  const contacts: ContactRow[] = (Array.isArray(info.contacts) ? info.contacts : []).filter((r: ContactRow) => r && (r.value || r.phone))
  const hasContact = !!(contacts.length || info.whatsapp || info.email || info.address || info.timings)

  const orderLink = (product: Product) => {
    const msg = `नमस्ते, मुझे "${product.name}" ऑर्डर करना है।`
    const wa = whatsappLink(info.whatsapp, msg)
    if (wa) return { href: wa, label: "WhatsApp पर ऑर्डर करें", whatsapp: true }
    const phone = extractPhone(contacts.find((r) => extractPhone(r.phone))?.phone)
    return phone ? { href: `tel:${phone}`, label: "फ़ोन पर ऑर्डर करें", whatsapp: false } : null
  }

  return (
    <PageShell heading={p?.title || "ई-स्टोर"} subtitle="पूजा सामग्री, प्रसाद और मंदिर स्मृति उत्पाद" eyebrow="E-Store">
      <div className="mx-auto max-w-6xl space-y-14">
        {info.intro && (
          <p className="temple-card mx-auto max-w-3xl whitespace-pre-line px-6 py-5 text-center leading-relaxed text-[#3A2A1A]">{info.intro}</p>
        )}

        {products.length === 0 ? (
          <EmptyNote text="उत्पाद जल्द ही उपलब्ध होंगे।" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => {
              const out = product.availability === "out"
              const order = out ? null : orderLink(product)
              return (
                <article key={i} className="temple-card group flex flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#5A0000] to-[#B30000]">
                    {product.image ? (
                      <CmsImage
                        src={product.image}
                        alt={product.name || "उत्पाद"}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${out ? "opacity-60 grayscale" : ""}`}
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-[#FFD700]/60">
                        <Lotus size={60} />
                      </span>
                    )}
                    {out && (
                      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">स्टॉक में नहीं</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-xl leading-snug text-[#8F0000]">{product.name}</h2>
                    {product.price && <p className="mt-1 text-lg font-bold text-[#C25400]">{formatPrice(product.price)}</p>}
                    {product.description && (
                      <p className="mt-2 flex-1 whitespace-pre-line text-sm leading-relaxed text-[#3A2A1A]">{product.description}</p>
                    )}
                    {order && (
                      <a
                        href={order.href}
                        target={order.whatsapp ? "_blank" : undefined}
                        rel={order.whatsapp ? "noopener noreferrer" : undefined}
                        className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 ${
                          order.whatsapp ? "bg-[#25D366] hover:bg-[#1fb957]" : "bg-gradient-to-b from-[#B30000] to-[#8F0000]"
                        }`}
                      >
                        {order.whatsapp ? <SocialIcon platform="whatsapp" size={16} /> : <Phone size={15} />}
                        {order.label}
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {hasContact && (
          <section className="temple-card mx-auto max-w-3xl overflow-hidden">
            <h2 className="flex items-center gap-2 bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-5 py-3.5 font-display text-lg text-[#FFE27A]">
              <ShoppingBag size={20} />
              ई-स्टोर से संपर्क करें
            </h2>
            <div className="space-y-4 p-5 text-sm text-[#3A2A1A] sm:p-6">
              {contacts.length > 0 && (
                <dl className="divide-y divide-[#C8941A]/20">
                  {contacts.map((r, i) => {
                    const dial = extractPhone(r.phone)
                    return (
                      <div key={i} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                        <dt className="font-medium text-[#5A4636]">{r.label}</dt>
                        <dd className="flex flex-wrap items-center justify-end gap-x-3 font-semibold text-[#8F0000]">
                          {r.value && <span>{r.value}</span>}
                          {r.phone &&
                            (dial ? (
                              <a href={`tel:${dial}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE9B8] px-3 py-1 text-[#6B0000] hover:bg-[#FFD700]">
                                <Phone size={13} />
                                {r.phone}
                              </a>
                            ) : (
                              <span>{r.phone}</span>
                            ))}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              )}
              {info.whatsapp && whatsappLink(info.whatsapp) && (
                <a href={whatsappLink(info.whatsapp)!} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium hover:text-[#B30000]">
                  <SocialIcon platform="whatsapp" size={16} className="text-[#25D366]" />
                  WhatsApp: {info.whatsapp}
                </a>
              )}
              {info.email && (
                <a href={`mailto:${info.email}`} className="flex items-center gap-2 font-medium hover:text-[#B30000]">
                  <Mail size={16} className="text-[#E0A100]" />
                  {info.email}
                </a>
              )}
              {info.address && (
                <p className="flex items-start gap-2 whitespace-pre-line">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#E0A100]" />
                  {info.address}
                </p>
              )}
              {info.timings && (
                <p className="flex items-center gap-2">
                  <Clock size={16} className="shrink-0 text-[#E0A100]" />
                  {info.timings}
                </p>
              )}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  )
}
