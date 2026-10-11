// Browser-only helpers to fetch / save a darshan picture (used by the gallery and the single-picture page)
export const fileNameFor = (url: string, n: number) => {
  const ext = (/\.(jpe?g|png|webp|gif)(\?|$)/i.exec(url)?.[1] || "jpg").toLowerCase().replace("jpeg", "jpg")
  return `tripura-sundari-darshan-${n}.${ext}`
}

// Fetch the picture as a file. Needs the image host to allow cross-origin reads; when it does not, callers fall back.
export async function loadFile(url: string, name: string): Promise<File | null> {
  try {
    const res = await fetch(url, { mode: "cors" })
    if (!res.ok) return null
    const blob = await res.blob()
    if (!blob.type.startsWith("image/")) return null
    return new File([blob], name, { type: blob.type })
  } catch {
    return null
  }
}

export function saveFile(file: File) {
  const href = URL.createObjectURL(file)
  const a = document.createElement("a")
  a.href = href
  a.download = file.name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(href), 4000)
}

// Starts a real file download of the picture right away. The browser asks this site's /api/download-image, which
// answers with "attachment", so the file is saved instead of the picture being opened (works whatever the storage
// service's cross-origin settings are).
export function downloadImage(url: string, name: string) {
  const a = document.createElement("a")
  a.href = `/api/download-image?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`
  a.download = name
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// kept for callers that used it when the picture could not be read by the page
export const openPlain = downloadImage
