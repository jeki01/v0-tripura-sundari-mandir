/**
 * Strips the most dangerous XSS vectors from admin-CMS HTML before rendering.
 * Removes script tags, inline event handlers, javascript: protocol, and dangerous embeds.
 * Content originates from authenticated admin users; this is an extra defense-in-depth layer.
 */
export function sanitizeCmsHtml(html: string): string {
  if (!html) return ""

  return html
    // Remove <script>...</script> (including multiline)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, "")
    // Remove <iframe>, <object>, <embed>, <applet>
    .replace(/<(iframe|object|embed|applet|meta|link|base)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(iframe|object|embed|applet|meta|link|base)\b[^>]*/gi, "")
    // Remove on* event handlers from any tag (onclick, onload, onerror, etc.)
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "")
    // Remove javascript: and vbscript: protocols
    .replace(/\bhref\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, 'href="#"')
    .replace(/\bsrc\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, 'src=""')
    .replace(/\bhref\s*=\s*(?:"vbscript:[^"]*"|'vbscript:[^']*')/gi, 'href="#"')
    // Remove data: URIs in src/href (potential data exfiltration or script execution)
    .replace(/\bsrc\s*=\s*(?:"data:[^"]*"|'data:[^']*')/gi, 'src=""')
}
