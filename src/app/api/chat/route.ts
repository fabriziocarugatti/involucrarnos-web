import { NextRequest } from 'next/server'
import { buildSystemPrompt } from '@/lib/ai-context'

export const runtime = 'edge'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'deepseek/deepseek-chat:free'

const buckets = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 15
const WINDOW_MS = 60 * 60 * 1000

function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || b.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return { ok: true, remaining: LIMIT - 1 }
  }
  if (b.count >= LIMIT) return { ok: false, remaining: 0 }
  b.count++
  return { ok: true, remaining: LIMIT - b.count }
}

export async function POST(req: NextRequest) {
  if (!process.env.OPENROUTER_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'IA temporalmente no disponible. Probá más tarde.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0] ??
    req.headers.get('x-real-ip') ??
    'unknown'

  const limit = rateLimit(ip)
  if (!limit.ok) {
    return new Response(
      JSON.stringify({ error: 'Llegaste al límite de consultas por hora. Volvé en un rato.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    )
  }

  let body: { messages?: { role: string; content: string }[] }
  try {
    body = await req.json()
  } catch {
    return new Response('Invalid body', { status: 400 })
  }

  const messages = body.messages ?? []
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('No messages', { status: 400 })
  }

  const trimmed = messages
    .slice(-8)
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: typeof m.content === 'string' ? m.content.slice(0, 2000) : '',
    }))
    .filter((m) => m.content)

  const upstream = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://involucrarnos.com.ar',
      'X-Title': 'Involucrarnos',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'system', content: buildSystemPrompt() }, ...trimmed],
      stream: true,
      max_tokens: 700,
      temperature: 0.7,
    }),
  })

  if (!upstream.ok) {
    const err = await upstream.text()
    return new Response(
      JSON.stringify({ error: `Error del proveedor IA: ${upstream.status}. ${err.slice(0, 200)}` }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (!upstream.body) {
    return new Response(JSON.stringify({ error: 'Sin respuesta del proveedor IA.' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Parse OpenRouter SSE and stream plain text deltas to the client
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
  const writer = writable.getWriter()
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  ;(async () => {
    const reader = upstream.body!.getReader()
    let buffer = ''
    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine.startsWith('data:')) continue
          const data = trimmedLine.slice(5).trim()
          if (data === '[DONE]') continue
          try {
            const chunk = JSON.parse(data)
            const delta = chunk?.choices?.[0]?.delta?.content
            if (typeof delta === 'string' && delta) {
              await writer.write(encoder.encode(delta))
            }
          } catch {
            // skip malformed SSE chunk
          }
        }
      }
    } finally {
      await writer.close()
    }
  })()

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'X-RateLimit-Remaining': String(limit.remaining),
    },
  })
}
