import { NextRequest, NextResponse } from 'next/server'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { generateText } from 'ai'
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

const BulletsSchema = z.object({
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

  let contentPrompt: string

  if (type === 'estudio') {
    const estudio = estudios.find((s) => s.slug === slug)
    if (!estudio) return NextResponse.json({ error: 'estudio no encontrado' }, { status: 404 })

    const statsText = estudio.stats.map((s) => `${s.value}: ${s.label}`).join('\n')
    const findingsText = estudio.findings.join('\n')

    contentPrompt = `Título: ${estudio.title}
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

    contentPrompt = `Título: ${art.title}
Bajada: ${art.bajada}

${fullText}`
  }

  const taskInstruction =
    type === 'estudio'
      ? 'Resumí este estudio de políticas públicas en exactamente 3 bullets que capturen los hallazgos más importantes. Incluí un dato o cifra concreto en cada bullet cuando sea posible.'
      : 'Resumí este artículo en exactamente 3 bullets con las ideas clave. Cada bullet debe ser una afirmación específica, idealmente con un dato o concepto concreto.'

  const prompt = `${taskInstruction} Sin academicismo. Cada bullet entre 20 y 220 caracteres.

${contentPrompt}

Respondé ÚNICAMENTE con JSON válido, sin texto extra, en este formato exacto:
{"bullets": ["bullet 1 aquí", "bullet 2 aquí", "bullet 3 aquí"]}`

  const system =
    'Sos un experto en políticas públicas y democracia. Respondés siempre en español rioplatense. Tu output es ÚNICAMENTE JSON válido, sin explicaciones ni texto adicional.'

  for (const model of MODELS) {
    try {
      const result = await generateText({
        model: openrouter.chatModel(model),
        system,
        prompt,
        temperature: 0.3,
        maxOutputTokens: 400,
      })

      const match = result.text.match(/\{[\s\S]*\}/)
      if (!match) continue

      const parsed = BulletsSchema.safeParse(JSON.parse(match[0]))
      if (!parsed.success) continue

      const bullets = parsed.data.bullets
      cache.set(cacheKey, { bullets, createdAt: Date.now() })
      return NextResponse.json({ bullets, cached: false })
    } catch {
      // try next model
    }
  }

  return NextResponse.json({ error: 'No se pudo generar el resumen ahora.' }, { status: 500 })
}
