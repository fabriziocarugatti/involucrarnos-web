/**
 * POST /api/search
 * body: { query: string }
 *
 * Búsqueda semántica: el LLM ranquea artículos, estudios y proyectos
 * según relevancia para la query en lenguaje natural.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { generateObject } from 'ai'
import { z } from 'zod'
import { articulos } from '@/data/articulos'
import { estudios } from '@/data/estudios'
import { proyectos } from '@/data/proyectos'

export const runtime = 'edge'

const openrouter = createOpenAICompatible({
  baseURL: 'https://openrouter.ai/api/v1',
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://involucrarnos.com.ar',
    'X-Title': 'Involucrarnos',
  },
})

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

// Rate limit (in-memory)
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

  // Construimos catálogo compacto para que el LLM matchee
  const catalog = [
    ...articulos
      .filter((a) => a.published)
      .map((a) => ({
        slug: a.slug,
        kind: a.tipo,
        title: a.title,
        bajada: a.bajada,
        category: a.category,
      })),
    ...estudios.map((s) => ({
      slug: s.slug,
      kind: 'estudio' as const,
      title: s.title,
      bajada: s.bajada,
      category: s.category,
    })),
    ...proyectos.map((p) => ({
      slug: p.slug,
      kind: 'proyecto' as const,
      title: p.title,
      bajada: p.bajada,
      category: p.category,
    })),
  ]

  const catalogText = catalog
    .map(
      (c) =>
        `- [${c.kind}] slug:${c.slug} · ${c.title} (${c.category}) — ${c.bajada.slice(0, 200)}`
    )
    .join('\n')

  try {
    const result = await generateObject({
      model: openrouter.chatModel('deepseek/deepseek-chat-v3-0324:free'),
      schema: SearchResult,
      system: `Sos un motor de búsqueda semántico. Recibís una pregunta o tema en español y un catálogo de contenidos. Devolvés los hasta 5 resultados más relevantes, con un score de 0 a 1 y una explicación de por qué (≤140 chars) en español rioplatense. Si nada matchea bien, devolvé array vacío.`,
      prompt: `Pregunta del usuario: "${query}"\n\nCatálogo:\n${catalogText}\n\nDevolvé los resultados más relevantes ordenados por relevance descendente.`,
      temperature: 0.2,
    })

    return NextResponse.json(result.object)
  } catch (e) {
    console.error('[api/search]', e)
    return NextResponse.json({ error: 'Búsqueda falló' }, { status: 500 })
  }
}
