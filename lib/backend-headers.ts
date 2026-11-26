export function mandirHeaders(extra?: Record<string, string>): Record<string, string> {
  const key = process.env.MANDIR_API_KEY || ""
  return {
    ...(key ? { "X-Api-Key": key } : {}),
    ...extra,
  }
}
