import { NextRequest, NextResponse } from 'next/server'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { generateObject } from 'ai'
import { z } from 'zod'
import { articulos } from '@/data/articulos'
import { estudios } from '@/data/estudios'

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

const MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
]

const SummarySchema = z.object({
  bullets: z.array(z.string().min(20).max(220)).length(3),
})

const cache = new Map<string, { bullets: string[]; createdAt: number }>()
const TTL = 24 * 60 * 60 * 1000

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  const type = req.nextUrl.searchParams.get('type') ?? 'articulo'

  if (!slug) return NextResponse.json({ error: 'slug requerido' }, { status: 400 })

  const cacheKey = `${type}:${slug}`
  const hit = cache.get(cacheKey)
  if (hit && Date.now() - hit.createdAt < TTL) {
    return NextResponse.json({ bullets: hit.bullets, cached: true })
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ error: 'IA no configurada' }, { status: 503 })
  }

  let prompt: string

  if (type === 'estudio') {
    const estudio = estudios.find((s) => s.slug === slug)
    if (!estudio) return NextResponse.json({ error: 'estudio no encontrado' }, { status: 404 })

    const statsText = estudio.stats
      .map((s) => `${s.value}: ${s.label}`)
      .join('\n')
    const findingsText = estudio.findings.join('\n')

    prompt = `Resumí este estudio de políticas públicas en 3 bullets que capturen los hallazgos más importantes. Cada bullet debe incluir un dato o cifra concreto cuando sea posible. Sin academicismo.

Título: ${estudio.title}
Bajada: ${estudio.bajada}

Datos clave:
${statsText}

Hallazgos:
${findingsText}

Metodología: ${estudio.methodology}`

  } else {
    const art = articulos.find((a) => a.slug === slug && a.published)
    if (!art || !art.content.length) {
      return NextResponse.json({ error: 'artículo no encontrado' }, { status: 404 })
    }

    const fullText = art.content
      .filter((b) => b.type === 'paragraph' || b.type === 'heading')
      .map((b) => b.text)
      .join('\n\n')

    prompt = `Resumí este artículo en 3 bullets que capturen las ideas clave. Cada bullet debe ser una afirmación específica (no genérica), idealmente con un dato o concepto concreto.

Título: ${art.title}
Bajada: ${art.bajada}

${fullText}`
  }

  const system = 'Resumís contenido sobre política, gestión pública y democracia. Tu output son SIEMPRE 3 bullets breves y concretos en español rioplatense, cada uno entre 20 y 220 caracteres. Sin academicismo, sin tecnicismos innecesarios.'

  for (const model of MODELS) {
    try {
      const result = await generateObject({
        model: openrouter.chatModel(model),
        schema: SummarySchema,
        system,
        prompt,
        temperature: 0.3,
      })
      const bullets = result.object.bullets
      cache.set(cacheKey, { bullets, createdAt: Date.now() })
      return NextResponse.json({ bullets, cached: false })
    } catch {
      // try next model
    }
  }

  return NextResponse.json({ error: 'No se pudo generar el resumen ahora.' }, { status: 500 })
}
