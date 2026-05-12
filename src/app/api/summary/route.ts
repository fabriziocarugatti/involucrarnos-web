import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { articulos } from '@/data/articulos'
import { estudios } from '@/data/estudios'

export const runtime = 'edge'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
]

const BulletsSchema = z.object({
  bullets: z.array(z.string().min(10).max(280)).length(3),
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

  let contentBlock: string

  if (type === 'estudio') {
    const estudio = estudios.find((s) => s.slug === slug)
    if (!estudio) return NextResponse.json({ error: 'estudio no encontrado' }, { status: 404 })

    contentBlock = `Título: ${estudio.title}
Bajada: ${estudio.bajada}
Datos: ${estudio.stats.map((s) => `${s.value} ${s.label}`).join(' | ')}
Hallazgos: ${estudio.findings.join(' | ')}`
  } else {
    const art = articulos.find((a) => a.slug === slug && a.published)
    if (!art || !art.content.length) {
      return NextResponse.json({ error: 'artículo no encontrado' }, { status: 404 })
    }
    const text = art.content
      .filter((b) => b.type === 'paragraph' || b.type === 'heading')
      .map((b) => b.text)
      .join(' ')
      .slice(0, 3000)
    contentBlock = `Título: ${art.title}\nBajada: ${art.bajada}\n${text}`
  }

  const task =
    type === 'estudio'
      ? 'Resumí este estudio de políticas públicas en 3 bullets con los hallazgos más importantes. Incluí datos concretos.'
      : 'Resumí este artículo en 3 bullets con las ideas clave. Sé específico.'

  const userMessage = `${task}

${contentBlock}

Respondé SOLO con este JSON (sin texto extra, sin markdown):
{"bullets":["frase 1","frase 2","frase 3"]}`

  const systemMessage =
    'Experto en políticas públicas. Respondés en español rioplatense. Output: JSON puro, sin explicaciones.'

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
          temperature: 0.3,
          max_tokens: 350,
        }),
      })

      if (!res.ok) continue

      const data = await res.json()
      const text: string = data?.choices?.[0]?.message?.content ?? ''
      if (!text) continue

      const match = text.match(/\{[\s\S]*?\}/)
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
