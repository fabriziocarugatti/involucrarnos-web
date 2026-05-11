import { NextRequest, NextResponse } from 'next/server'

const BREVO_API_URL = 'https://api.brevo.com/v3/contacts'
const LIST_ID = 2 // ajustar al id de lista real en Brevo

export async function POST(req: NextRequest) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  let body: { email?: string; name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, name } = body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const payload: Record<string, unknown> = {
    email: email.trim().toLowerCase(),
    listIds: [LIST_ID],
    updateEnabled: true,
  }
  if (name && typeof name === 'string' && name.trim()) {
    payload.attributes = { FIRSTNAME: name.trim() }
  }

  const res = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (res.status === 204 || res.status === 201) {
    return NextResponse.json({ ok: true })
  }

  const data = await res.json().catch(() => ({}))
  const message = (data as { message?: string }).message ?? 'Error al suscribir'

  return NextResponse.json({ error: message }, { status: res.status })
}
