import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
}

function isAuthed() {
  const jar = cookies()
  return jar.get('inv_admin')?.value === 'ok'
}

const ALLOWED_TABLES = ['inscripciones', 'suscriptores'] as const
type AllowedTable = (typeof ALLOWED_TABLES)[number]

const ALLOWED_STATUS = ['pendiente', 'confirmado', 'cancelado', 'asistio'] as const

export async function GET() {
  if (!isAuthed()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const supabase = getSupabase()
  const [{ data: inscripciones }, { data: suscriptores }] = await Promise.all([
    supabase.from('inscripciones').select('*').order('created_at', { ascending: false }),
    supabase.from('suscriptores').select('*').order('created_at', { ascending: false }),
  ])
  return NextResponse.json({ inscripciones: inscripciones ?? [], suscriptores: suscriptores ?? [] })
}

export async function PATCH(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = (await req.json()) as { id?: string; status?: string; notas?: string }
  const { id, status, notas } = body

  if (!id) return NextResponse.json({ error: 'Falta el ID' }, { status: 400 })
  if (status && !ALLOWED_STATUS.includes(status as (typeof ALLOWED_STATUS)[number])) {
    return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
  }

  const update: Record<string, string> = {}
  if (status) update.status = status
  if (notas !== undefined) update.notas = notas

  if (!Object.keys(update).length) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase.from('inscripciones').update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = (await req.json()) as { table?: string; id?: string }
  const { table, id } = body

  if (!table || !ALLOWED_TABLES.includes(table as AllowedTable) || !id) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase.from(table as AllowedTable).delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
