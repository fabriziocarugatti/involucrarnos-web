import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
}

const ALLOWED_TABLES = ['inscripciones', 'suscriptores'] as const
type AllowedTable = typeof ALLOWED_TABLES[number]

export async function GET() {
  const supabase = getSupabase()
  const [{ data: inscripciones }, { data: suscriptores }] = await Promise.all([
    supabase.from('inscripciones').select('*').order('created_at', { ascending: false }),
    supabase.from('suscriptores').select('*').order('created_at', { ascending: false }),
  ])
  return NextResponse.json({ inscripciones: inscripciones ?? [], suscriptores: suscriptores ?? [] })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json() as { table?: string; id?: string }
  const { table, id } = body

  if (!table || !ALLOWED_TABLES.includes(table as AllowedTable) || !id) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase.from(table as AllowedTable).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
