// Server-only: provides the shared secret header the backend requires.
// MANDIR_API_KEY is a plain (non-NEXT_PUBLIC) env var — it stays on the server
// and is never sent to the browser.
export function mandirHeaders(extra?: Record<string, string>): Record<string, string> {
  const key = process.env.MANDIR_API_KEY || ""
  return {
    ...(key ? { "X-Api-Key": key } : {}),
    ...extra,
  }
}
