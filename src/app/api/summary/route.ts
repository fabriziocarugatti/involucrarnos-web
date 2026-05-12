/**
 * GET /api/summary?slug=...
 * Devuelve un TL;DR de 3 puntos generado con IA del artículo correspondiente.
 *
 * Cache: in-memory por slug. La cache vive lo que dure la instancia edge.
 * Para invalidación: redeploy o agregar TTL.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { generateObject } from 'ai'
import { z } from 'zod'
import { articulos } from '@/data/articulos'

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

// Schema del output: 3 bullets concisos
const SummarySchema = z.object({
  bullets: z.array(z.string().min(20).max(200)).length(3),
})

const cache = new Map<string, { bullets: string[]; createdAt: number }>()
const TTL = 24 * 60 * 60 * 1000 // 24 horas

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) {
    return NextResponse.json({ error: 'slug requerido' }, { status: 400 })
  }

  // Cache hit
  const hit = cache.get(slug)
  if (hit && Date.now() - hit.createdAt < TTL) {
    return NextResponse.json({ bullets: hit.bullets, cached: true })
  }

  const art = articulos.find((a) => a.slug === slug && a.published)
  if (!art || !art.content.length) {
    return NextResponse.json({ error: 'artículo no encontrado' }, { status: 404 })
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ error: 'IA no configurada' }, { status: 503 })
  }

  const fullText = art.content
    .filter((b) => b.type === 'paragraph' || b.type === 'heading')
    .map((b) => b.text)
    .join('\n\n')

  try {
    const result = await generateObject({
      model: openrouter.chatModel('deepseek/deepseek-chat-v3-0324:free'),
      schema: SummarySchema,
      system:
        'Resumís artículos sobre política, gestión pública y democracia. Tu output son SIEMPRE 3 bullets breves y concretos en español rioplatense, cada uno entre 20 y 200 caracteres. Sin academicismo, sin tecnicismos innecesarios.',
      prompt: `Resumí este artículo en 3 bullets que capturen las ideas clave. Cada bullet debe ser una afirmación específica (no genérica), idealmente con un dato o concepto concreto.\n\nTítulo: ${art.title}\n\nBajada: ${art.bajada}\n\n${fullText}`,
      temperature: 0.3,
    })

    const bullets = result.object.bullets
    cache.set(slug, { bullets, createdAt: Date.now() })

    return NextResponse.json({ bullets, cached: false })
  } catch (e) {
    console.error('[api/summary] error', e)
    return NextResponse.json(
      { error: 'No se pudo generar el resumen ahora.' },
      { status: 500 }
    )
  }
}
