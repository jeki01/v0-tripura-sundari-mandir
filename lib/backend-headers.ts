// Works in both server (MANDIR_API_KEY) and browser (NEXT_PUBLIC_MANDIR_API_KEY) contexts.
export function mandirHeaders(extra?: Record<string, string>): Record<string, string> {
  const key = process.env.MANDIR_API_KEY || process.env.NEXT_PUBLIC_MANDIR_API_KEY || ""
  return {
    ...(key ? { "X-Api-Key": key } : {}),
    ...extra,
  }
}
