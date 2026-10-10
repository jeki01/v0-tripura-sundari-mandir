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

// When the picture cannot be read by the page, open it so the visitor can press-and-hold / save it
export function openPlain(url: string, name: string) {
  const a = document.createElement("a")
  a.href = url
  a.download = name
  a.target = "_blank"
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
}
