import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { buildSystemPrompt } from '@/lib/ai-context'

export const runtime = 'edge'

// OpenRouter proxies many models — usamos DeepSeek V3 0324 (gratis, chino, alta calidad)
const openrouter = createOpenAICompatible({
  baseURL: 'https://openrouter.ai/api/v1',
  name: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    'HTTP-Referer': 'https://involucrarnos.com.ar',
    'X-Title': 'Involucrarnos',
  },
})

// Simple in-memory rate limit (per IP). Edge runtime — se resetea por instancia.
const buckets = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 15           // mensajes por ventana
const WINDOW_MS = 60 * 60 * 1000  // 1 hora

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
      JSON.stringify({
        error: 'Llegaste al límite de consultas por hora. Volvé en un rato.',
      }),
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

  // Limitar contexto: últimos 8 mensajes + truncar contenido individual
  const trimmed = messages
    .slice(-8)
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: typeof m.content === 'string' ? m.content.slice(0, 2000) : '',
    }))
    .filter((m) => m.content)

  const result = streamText({
    model: openrouter.chatModel('deepseek/deepseek-chat-v3-0324:free'),
    system: buildSystemPrompt(),
    messages: trimmed,
    temperature: 0.7,
    maxOutputTokens: 700,
  })

  return result.toTextStreamResponse({
    headers: {
      'X-RateLimit-Remaining': String(limit.remaining),
    },
  })
}
