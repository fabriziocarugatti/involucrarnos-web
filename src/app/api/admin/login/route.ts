import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'involucrarnos2026'

export async function POST(req: NextRequest) {
  let body: { password?: string } = {}
  try { body = await req.json() } catch { /* empty body */ }

  if (!body.password || body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('inv_admin', 'ok', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('inv_admin', '', { maxAge: 0, path: '/' })
  return res
}
