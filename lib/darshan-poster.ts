// Draws the whole "आज के दर्शन" section as one picture (heading, verse, caption, date, the arch-framed darshan
// picture and the closing line), so sharing it sends the section and not just the photo.
export type PosterInput = {
  image: File
  title: string
  verse: string
  caption: string
  date: string
  closing: string
  site: string
  displayFont: string
  bodyFont: string
}

const W = 1080
const PAD = 70
const GOLD = "#C8941A"
const MAROON = "#8F0000"

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const out: string[] = []
  for (const para of text.split("\n")) {
    let line = ""
    for (const word of para.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word
      if (line && ctx.measureText(next).width > maxWidth) {
        out.push(line)
        line = word
      } else line = next
    }
    out.push(line)
  }
  return out
}

export async function makePoster(i: PosterInput): Promise<File | null> {
  try {
    if (document.fonts?.ready) await document.fonts.ready
    const bitmap = await createImageBitmap(i.image)
    const canvas = document.createElement("canvas")
    canvas.width = W
    const ctx = canvas.getContext("2d")
    if (!ctx) return null

    const inner = W - PAD * 2
    const display = (px: number) => `${px}px ${i.displayFont || "serif"}`
    const body = (px: number) => `${px}px ${i.bodyFont || "sans-serif"}`

    // lay out everything first to know the total height
    ctx.font = display(76)
    const titleH = 110
    ctx.font = display(46)
    const verseLines = wrap(ctx, i.verse, inner)
    const verseLine = 70
    ctx.font = body(33)
    const capLines = wrap(ctx, i.caption, inner - 40)
    const capLine = 50
    const dateH = 84
    const archW = 780
    const archH = 1040
    const closingH = 110
    const footH = 100

    const height = PAD + titleH + 40 + verseLines.length * verseLine + 24 + capLines.length * capLine + 30 + dateH + 50 + archH + 70 + closingH + footH + 20
    canvas.height = Math.round(height)

    // background + double gold border
    ctx.fillStyle = "#FFF4E6"
    ctx.fillRect(0, 0, W, canvas.height)
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 6
    ctx.strokeRect(24, 24, W - 48, canvas.height - 48)
    ctx.lineWidth = 2
    ctx.strokeRect(40, 40, W - 80, canvas.height - 80)

    ctx.textAlign = "center"
    ctx.textBaseline = "alphabetic"
    let y = PAD + 30

    ctx.fillStyle = MAROON
    ctx.font = display(76)
    ctx.fillText(i.title, W / 2, y + 60)
    y += titleH
    // small ornament
    ctx.fillStyle = GOLD
    ctx.fillRect(W / 2 - 150, y - 14, 120, 3)
    ctx.fillRect(W / 2 + 30, y - 14, 120, 3)
    ctx.save()
    ctx.translate(W / 2, y - 12)
    ctx.rotate(Math.PI / 4)
    ctx.fillStyle = "#FF6B00"
    ctx.fillRect(-9, -9, 18, 18)
    ctx.restore()
    y += 40

    ctx.fillStyle = MAROON
    ctx.font = display(46)
    for (const l of verseLines) {
      y += verseLine
      ctx.fillText(l, W / 2, y - 14)
    }
    y += 24

    ctx.fillStyle = "#5C2A0A"
    ctx.font = body(33)
    for (const l of capLines) {
      y += capLine
      ctx.fillText(l, W / 2, y - 12)
    }
    y += 30

    // date pill
    ctx.font = display(40)
    const label = `📅 ${i.date}`
    const pillW = Math.min(inner, ctx.measureText(label).width + 80)
    const pillX = (W - pillW) / 2
    ctx.fillStyle = "#FFFFFF"
    ctx.strokeStyle = GOLD
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.roundRect(pillX, y, pillW, 66, 33)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = MAROON
    ctx.fillText(label, W / 2, y + 46)
    y += dateH + 50

    // arch frame with the picture
    const ax = (W - archW) / 2
    const arch = (x: number, top: number, w: number, h: number) => {
      const r = w / 2
      ctx.beginPath()
      ctx.moveTo(x, top + h - 28)
      ctx.lineTo(x, top + r)
      ctx.arc(x + r, top + r, r, Math.PI, 0)
      ctx.lineTo(x + w, top + h - 28)
      ctx.quadraticCurveTo(x + w, top + h, x + w - 28, top + h)
      ctx.lineTo(x + 28, top + h)
      ctx.quadraticCurveTo(x, top + h, x, top + h - 28)
      ctx.closePath()
    }
    const grad = ctx.createLinearGradient(0, y, 0, y + archH)
    grad.addColorStop(0, "#FFD700")
    grad.addColorStop(0.5, GOLD)
    grad.addColorStop(1, MAROON)
    arch(ax - 10, y - 10, archW + 20, archH + 20)
    ctx.fillStyle = grad
    ctx.fill()
    ctx.save()
    arch(ax, y, archW, archH)
    ctx.clip()
    const scale = Math.max(archW / bitmap.width, archH / bitmap.height)
    const dw = bitmap.width * scale
    const dh = bitmap.height * scale
    ctx.drawImage(bitmap, ax + (archW - dw) / 2, y + (archH - dh) / 2, dw, dh)
    ctx.restore()
    y += archH + 70

    ctx.fillStyle = MAROON
    ctx.font = display(52)
    ctx.fillText(`🙏 ${i.closing} 🙏`, W / 2, y + 40)
    y += closingH

    ctx.fillStyle = "#C25400"
    ctx.font = body(30)
    ctx.fillText(i.site, W / 2, y + 20)

    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.9))
    bitmap.close?.()
    return blob ? new File([blob], "tripura-sundari-aaj-ke-darshan.jpg", { type: "image/jpeg" }) : null
  } catch {
    return null
  }
}
