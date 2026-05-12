import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { articulos } from '@/data/articulos'
import { estudios } from '@/data/estudios'
import { proyectos } from '@/data/proyectos'

export const runtime = 'edge'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
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
  if (query.length < 3) {
    return NextResponse.json({ results: [] })
  }

  const catalog = [
    ...articulos
      .filter((a) => a.published)
      .map((a) => ({ slug: a.slug, kind: a.tipo, title: a.title, bajada: a.bajada, category: a.category })),
    ...estudios.map((s) => ({ slug: s.slug, kind: 'estudio' as const, title: s.title, bajada: s.bajada, category: s.category })),
    ...proyectos.map((p) => ({ slug: p.slug, kind: 'proyecto' as const, title: p.title, bajada: p.bajada, category: p.category })),
  ]

  const catalogText = catalog
    .map((c) => `- [${c.kind}] slug:${c.slug} · ${c.title} (${c.category}) — ${c.bajada.slice(0, 160)}`)
    .join('\n')

  const systemMessage =
    'Motor de búsqueda semántico. Respondés en español rioplatense. Output: SOLO JSON puro, sin markdown, sin explicaciones.'

  const userMessage = `Pregunta: "${query}"

Catálogo:
${catalogText}

Devolvé los hasta 5 resultados más relevantes ordenados por relevance descendente. Si nada matchea, devolvé array vacío.

Respondé SOLO con este JSON (sin texto extra):
{"results":[{"slug":"...","kind":"articulo|estudio|proyecto|curso","relevance":0.9,"why":"razón breve en español"}]}`

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
            { role: 'system', content: systemMessage },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.2,
          max_tokens: 600,
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

  return NextResponse.json({ error: 'Búsqueda falló' }, { status: 500 })
}
