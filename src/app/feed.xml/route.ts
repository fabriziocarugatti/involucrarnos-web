import { articulos } from '@/data/articulos'

const BASE = 'https://involucrarnos.com.ar'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const published = articulos
    .filter((a) => a.published && a.tipo === 'articulo')
    .slice(0, 20)

  const items = published
    .map((a) => {
      const url = `${BASE}/articulos/${a.slug}`
      const body = a.content
        .filter((b) => b.type === 'paragraph')
        .map((b) => escapeXml(b.text))
        .slice(0, 3)
        .join(' ')

      return `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <description><![CDATA[${a.bajada}]]></description>
      <content:encoded><![CDATA[${body}]]></content:encoded>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <author><![CDATA[${a.author}]]></author>
      <category><![CDATA[${a.category}]]></category>
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Involucrarnos — Artículos</title>
    <link>${BASE}</link>
    <description>Hub educativo abierto sobre políticas públicas, gestión estatal y desarrollo del NOA argentino.</description>
    <language>es-ar</language>
    <copyright>© ${new Date().getFullYear()} Involucrarnos</copyright>
    <managingEditor>involucrarnosoficial@gmail.com (Involucrarnos)</managingEditor>
    <image>
      <url>${BASE}/assets/logo-involucrarnos.png</url>
      <title>Involucrarnos</title>
      <link>${BASE}</link>
    </image>
    <atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
