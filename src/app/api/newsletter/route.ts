import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  const { error } = await supabase.from('suscriptores').upsert(
    {
      email: email.trim().toLowerCase(),
      nombre: name?.trim() || null,
    },
    { onConflict: 'email' }
  )

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Error al suscribirse. Intentá de nuevo.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
