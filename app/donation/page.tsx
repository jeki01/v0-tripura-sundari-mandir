import { Building2, HeartHandshake, Landmark, Phone, Smartphone } from "lucide-react"
import { PageShell, EmptyNote } from "@/components/cms"
import CmsImage from "@/components/cms-image"
import CopyButton from "@/components/copy-button"
import { Lotus } from "@/components/ornaments"
import { extractPhone, fetchContent } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "दान | श्री त्रिपुरा सुंदरी मंदिर",
  description: "श्री त्रिपुरा सुंदरी मंदिर ट्रस्ट को दान करने के लिए बैंक खाता, UPI और संपर्क विवरण।",
}

interface Account {
  title?: string
  accountName?: string
  bankName?: string
  accountNumber?: string
  ifsc?: string
  branch?: string
  upiId?: string
  qrImage?: string
}
interface ContactRow {
  label?: string
  value?: string
  phone?: string
}

function DetailRow({ label, value, copy }: { label: string; value?: string; copy?: boolean }) {
  if (!value) return null
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="shrink-0 text-sm text-[#5A4636]">{label}</dt>
      <dd className="flex min-w-0 items-center gap-2 text-right font-semibold text-[#8F0000]">
        <span className="break-all">{value}</span>
        {copy && <CopyButton value={value} label={label} />}
      </dd>
    </div>
  )
}

// Accounts: admin -> Mandir -> दान खाता विवरण   |   Contacts / appeal: admin -> Mandir -> दान संपर्क विवरण
export default async function DonationPage() {
  const [d, c] = await Promise.all([fetchContent("donation"), fetchContent("donation-contact")])
  const accounts: Account[] = (Array.isArray(d?.items) ? d.items : []).filter(
    (a: Account) => a && (a.accountNumber || a.upiId || a.qrImage || a.accountName),
  )
  const info = c?.items && !Array.isArray(c.items) ? c.items : {}
  const contacts: ContactRow[] = (Array.isArray(info.contacts) ? info.contacts : []).filter((r: ContactRow) => r && (r.value || r.phone))

  return (
    <PageShell heading={d?.title || "दान"} subtitle="माँ त्रिपुरा सुंदरी की सेवा में आपका सहयोग" eyebrow="Donation">
      <div className="mx-auto max-w-5xl space-y-12">
        {info.intro && (
          <div className="temple-card mx-auto max-w-3xl px-6 py-6 text-center">
            <HeartHandshake size={32} className="mx-auto mb-3 text-[#B30000]" />
            <p className="whitespace-pre-line leading-relaxed text-[#3A2A1A]">{info.intro}</p>
          </div>
        )}

        {accounts.length === 0 ? (
          <EmptyNote text="दान खाता विवरण जल्द ही उपलब्ध होंगे।" />
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {accounts.map((a, i) => (
              <section key={i} className="temple-card overflow-hidden">
                <h2 className="flex items-center gap-2 bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-5 py-3.5 font-display text-lg text-[#FFE27A]">
                  <Landmark size={20} className="shrink-0" />
                  {a.title || "बैंक खाता विवरण"}
                </h2>

                <div className="p-5 sm:p-6">
                  {(a.accountName || a.bankName || a.accountNumber || a.ifsc || a.branch) && (
                    <dl className="divide-y divide-[#C8941A]/20">
                      <DetailRow label="खाताधारक" value={a.accountName} />
                      <DetailRow label="बैंक" value={a.bankName} />
                      <DetailRow label="खाता संख्या" value={a.accountNumber} copy />
                      <DetailRow label="IFSC कोड" value={a.ifsc} copy />
                      <DetailRow label="शाखा" value={a.branch} />
                    </dl>
                  )}

                  {(a.upiId || a.qrImage) && (
                    <div className="mt-5 rounded-xl border border-[#C8941A]/40 bg-[#FFF4E6] p-4 text-center">
                      <p className="mb-3 flex items-center justify-center gap-2 font-display text-[#8F0000]">
                        <Smartphone size={18} />
                        UPI से दान करें
                      </p>
                      {a.qrImage && (
                        <div className="relative mx-auto mb-3 h-44 w-44 overflow-hidden rounded-xl border-2 border-[#E0A100] bg-white">
                          <CmsImage src={a.qrImage} alt={`${a.title || "दान"} QR कोड`} sizes="176px" className="object-contain p-1" />
                        </div>
                      )}
                      {a.upiId && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="break-all font-semibold text-[#6B0000]">{a.upiId}</span>
                          <CopyButton value={a.upiId} label="UPI ID" />
                        </div>
                      )}
                      {a.upiId && (
                        <a
                          href={`upi://pay?pa=${encodeURIComponent(a.upiId)}&pn=${encodeURIComponent(a.accountName || "श्री त्रिपुरा सुंदरी मंदिर")}&cu=INR`}
                          className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#FFE27A] to-[#E0A100] px-5 py-2 text-sm font-bold text-[#6B0000] shadow transition hover:-translate-y-0.5 md:hidden"
                        >
                          UPI ऐप से भुगतान करें
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}

        {contacts.length > 0 && (
          <section className="temple-card mx-auto max-w-3xl overflow-hidden">
            <h2 className="flex items-center gap-2 bg-gradient-to-r from-[#8F0000] via-[#B30000] to-[#D95500] px-5 py-3.5 font-display text-lg text-[#FFE27A]">
              <Building2 size={20} />
              दान के लिए संपर्क
            </h2>
            <dl className="divide-y divide-[#C8941A]/20 px-5 py-2 sm:px-6">
              {contacts.map((r, i) => {
                const dial = extractPhone(r.phone)
                return (
                  <div key={i} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 text-sm">
                    <dt className="font-medium text-[#5A4636]">{r.label}</dt>
                    <dd className="flex flex-wrap items-center justify-end gap-x-3 text-right font-semibold text-[#8F0000]">
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
          </section>
        )}

        {info.note && (
          <p className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-[#E0A100]/50 bg-[#FFF9E8] px-5 py-4 text-sm leading-relaxed text-[#5A4636]">
            <Lotus size={22} className="mt-0.5 shrink-0 text-[#B30000]" />
            <span className="whitespace-pre-line">{info.note}</span>
          </p>
        )}
      </div>
    </PageShell>
  )
}
