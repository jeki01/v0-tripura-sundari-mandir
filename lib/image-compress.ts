// Photos for the testimonial / grievance forms must be under 2 MB. Phone photos are usually bigger, so they are
// shrunk in the browser first (longest side 1600 px, JPEG); a photo that still does not fit is refused with a message.
export const MAX_PHOTO_BYTES = 2 * 1024 * 1024
const ALLOWED = ["image/jpeg", "image/png", "image/webp"]

export class PhotoError extends Error {}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new PhotoError("यह फ़ोटो खुल नहीं सकी"))
    }
    img.src = url
  })
}

export async function preparePhoto(file: File): Promise<File> {
  if (!ALLOWED.includes(file.type)) throw new PhotoError("केवल JPG, PNG या WebP फ़ोटो जोड़ें")
  if (file.size <= MAX_PHOTO_BYTES && file.size < 700 * 1024) return file // small already

  const img = await loadImage(file)
  let longest = Math.max(img.width, img.height)
  let scale = Math.min(1, 1600 / longest)
  for (const quality of [0.85, 0.75, 0.65, 0.5]) {
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(img.width * scale)
    canvas.height = Math.round(img.height * scale)
    const ctx = canvas.getContext("2d")
    if (!ctx) break
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", quality))
    if (blob && blob.size <= MAX_PHOTO_BYTES) {
      const name = (file.name.replace(/\.[^.]+$/, "") || "photo") + ".jpg"
      return new File([blob], name, { type: "image/jpeg" })
    }
    scale *= 0.8
  }
  if (file.size <= MAX_PHOTO_BYTES) return file
  throw new PhotoError("फ़ोटो 2MB से बड़ी है। कृपया छोटी फ़ोटो चुनें।")
}
