"use server"

const API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "https://backend.shreetripurasundari.com"

export async function submitForm(
  kind: "testimonial" | "grievance",
  formData: FormData
): Promise<{ ok: boolean; ref?: string; message?: string }> {
  try {
    const res = await fetch(`${API}/submissions/${kind}`, { method: "POST", body: formData })
    const json = await res.json().catch(() => ({}))
    if (res.ok && json.success) return { ok: true, ref: json.data?.ref as string }
    return { ok: false, message: (json.message as string) || "भेजा नहीं जा सका, कृपया पुनः प्रयास करें" }
  } catch {
    return { ok: false, message: "इंटरनेट / सर्वर की समस्या — कृपया कुछ देर बाद पुनः प्रयास करें" }
  }
}
