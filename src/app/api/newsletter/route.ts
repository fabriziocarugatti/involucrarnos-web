import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts'
const BREVO_LIST_ID = 2

export async function POST(req: NextRequest) {
  let body: { email?: string; name?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { email, name } = body
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 422 })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const normalizedName = name?.trim() || null

  // Save to Supabase
  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  const { error: dbError } = await supabase.from('suscriptores').upsert(
    { email: normalizedEmail, nombre: normalizedName },
    { onConflict: 'email' }
  )
  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'Error al suscribirse. Intentá de nuevo.' }, { status: 500 })
  }

  // Also sync to Brevo if configured
  if (process.env.BREVO_API_KEY) {
    const payload: Record<string, unknown> = {
      email: normalizedEmail,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }
    if (normalizedName) payload.attributes = { FIRSTNAME: normalizedName }

    await fetch(BREVO_CONTACTS_URL, {
      method: 'POST',
      headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => console.error('Brevo sync error:', err))
  }

  return NextResponse.json({ ok: true })
}
