// UPI donation to the temple. The default payee is the temple's own UPI account; a donation account saved in the
// admin (दान खाता विवरण) with its own UPI ID is used for that account instead.
export const DEFAULT_UPI_ID = "maboardtripurasundrimandirbsw@sbi"
export const DEFAULT_UPI_NAME = "MA BOARD TRIPURA SUNDARI MANDIR"

// The comment that shows in the payer's and the temple's UPI app / bank statement
export const UPI_NOTE = "Donation source website to mandir shree tripura sundari mandir"

export const MIN_AMOUNT = 1
export const MAX_AMOUNT = 100000 // the usual UPI limit per payment

// "251" / "251.5" -> 251.5, anything else (empty, letters, more than 2 decimals, out of range) -> null
export function parseAmount(raw: string): number | null {
  const s = raw.trim()
  if (!/^\d+(\.\d{1,2})?$/.test(s)) return null
  const n = Number(s)
  return n >= MIN_AMOUNT && n <= MAX_AMOUNT ? n : null
}

// upi://pay?pa=<id>&pn=<name>&am=<amount>&cu=INR&tn=<note>   (spaces as %20, as UPI apps expect)
export function upiLink({ upiId, name, amount, note = UPI_NOTE }: { upiId: string; name: string; amount: number; note?: string }): string {
  const q = [
    ["pa", upiId],
    ["pn", name],
    ["am", amount.toFixed(2)],
    ["cu", "INR"],
    ["tn", note],
  ]
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&")
  return `upi://pay?${q}`
}
