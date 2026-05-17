import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { articulos } from '@/data/articulos'
import { estudios } from '@/data/estudios'
import { proyectos } from '@/data/proyectos'

export const runtime = 'edge'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODELS = [
  'google/gemini-2.5-flash-lite',
  'google/gemini-2.5-flash',
  'meta-llama/llama-3.3-70b-instruct:free',
  'meta-llama/llama-3.2-3b-instruct:free',
]

const SearchResult = z.object({
  results: z
    .array(
      z.object({
        slug: z.string(),
        kind: z.enum(['articulo', 'estudio', 'proyecto', 'curso']),
        relevance: z.number().min(0).max(1),
        why: z.string().max(140),
      })
    )
    .max(5),
})

type CatalogItem = { slug: string; kind: 'articulo' | 'estudio' | 'proyecto' | 'curso'; title: string; bajada: string; category: string; author?: string }
type Result = z.infer<typeof SearchResult>['results'][number]

const buckets = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 30
const WINDOW_MS = 60 * 60 * 1000

function rateLimit(ip: string) {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (b.count >= LIMIT) return false
  b.count++
  return true
}

function keywordFallback(query: string, catalog: CatalogItem[]): Result[] {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2)
  if (!words.length) return []
  return catalog
    .map((c) => {
      const text = `${c.title} ${c.bajada} ${c.category} ${c.author ?? ''}`.toLowerCase()
      const hits = words.filter((w) => text.includes(w)).length
      return { ...c, hits }
    })
    .filter((c) => c.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 5)
    .map((c) => ({
      slug: c.slug,
      kind: c.kind,
      relevance: Math.min(c.hits / words.length, 1),
      why: `Coincide con tu búsqueda en ${c.category}`,
    }))
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ error: 'IA no configurada' }, { status: 503 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ??
    req.headers.get('x-real-ip') ??
    'unknown'
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'Demasiadas búsquedas. Probá en un rato.' }, { status: 429 })
  }

  let body: { query?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }

  const query = (body.query || '').trim().slice(0, 200)
  if (query.length < 3) return NextResponse.json({ results: [] })

  const catalog: CatalogItem[] = [
    ...articulos
      .filter((a) => a.published)
      .map((a) => ({ slug: a.slug, kind: a.tipo as 'articulo' | 'curso', title: a.title, bajada: a.bajada, category: a.category, author: a.author })),
    ...estudios.map((s) => ({ slug: s.slug, kind: 'estudio' as const, title: s.title, bajada: s.bajada, category: s.category, author: s.authors.join(' ') })),
    ...proyectos.map((p) => ({ slug: p.slug, kind: 'proyecto' as const, title: p.title, bajada: p.bajada, category: p.category })),
  ]

  const catalogText = catalog
    .map((c) => `- [${c.kind}] slug:${c.slug} · ${c.title} (${c.category}) — ${c.bajada.slice(0, 120)}`)
    .join('\n')

  const userMessage = `Pregunta del usuario: "${query}"

Catálogo disponible:
${catalogText}

Devolvé hasta 5 resultados más relevantes ordenados por relevance descendente. Si nada coincide, devolvé array vacío.

Respondé SOLO con JSON válido, sin texto extra, sin markdown:
{"results":[{"slug":"...","kind":"articulo|estudio|proyecto|curso","relevance":0.9,"why":"razón breve en español, máx 100 chars"}]}`

  for (const model of MODELS) {
    try {
      const res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://involucrarnos.com.ar',
          'X-Title': 'Involucrarnos',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: 'Sos un motor de búsqueda semántico. Respondés ÚNICAMENTE con JSON puro, sin markdown, sin texto extra.' },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.1,
          max_tokens: 400,
        }),
      })

      if (!res.ok) continue

      const data = await res.json()
      const text: string = data?.choices?.[0]?.message?.content ?? ''
      if (!text) continue

      const match = text.match(/\{[\s\S]*\}/)
      if (!match) continue

      const parsed = SearchResult.safeParse(JSON.parse(match[0]))
      if (!parsed.success) continue

      return NextResponse.json(parsed.data)
    } catch {
      // try next model
    }
  }

  // Fallback: keyword matching
  const fallback = keywordFallback(query, catalog)
  return NextResponse.json({ results: fallback })
}
