// Notices shown as a running line under the header. Managed in the admin (Mandir management -> सूचना पट्टी,
// content key "notices"): a list of { text, status: "on" | "off", until: "YYYY-MM-DD" }.
export type Notice = { text: string; status?: string; until?: string }

// Today's calendar date in India, as YYYY-MM-DD (same for every visitor whatever their device time zone is)
function todayInIndia(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}

// The texts to show now: switched on, not empty, and not past their "show until" date (that day included).
export function activeNotices(raw: any, now: Date = new Date()): string[] {
  const items = raw && Array.isArray(raw.items) ? (raw.items as Notice[]) : []
  const today = todayInIndia(now)
  return items
    .filter((n) => n && typeof n.text === "string" && n.text.trim() && n.status !== "off")
    .filter((n) => !(typeof n.until === "string" && /^\d{4}-\d{2}-\d{2}/.test(n.until) && n.until.slice(0, 10) < today))
    .map((n) => n.text.trim().replace(/\s+/g, " "))
}
