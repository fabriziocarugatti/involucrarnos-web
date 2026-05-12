import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BREVO_API = 'https://api.brevo.com/v3/smtp/email'

export async function POST(req: NextRequest) {
  let body: { nombre?: string; email?: string; curso?: string; cursoSlug?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 })
  }

  const { nombre, email, curso, cursoSlug } = body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
  }
  if (!curso) {
    return NextResponse.json({ error: 'Falta el nombre del curso.' }, { status: 400 })
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  const { error: dbError } = await supabase.from('inscripciones').insert({
    nombre: nombre?.trim() || null,
    email: email.trim().toLowerCase(),
    curso,
    curso_slug: cursoSlug || null,
  })

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'No pudimos guardar tu inscripción. Intentá de nuevo.' }, { status: 500 })
  }

  // Send confirmation email if Brevo is configured
  if (process.env.BREVO_API_KEY) {
    const nombreDisplay = nombre?.trim() || 'estudiante'
    const confirmPayload = {
      sender: { name: 'Involucrarnos', email: 'hola@involucrarnos.com.ar' },
      to: [{ email, name: nombreDisplay }],
      subject: `¡Inscripción confirmada! — ${curso}`,
      htmlContent: `
        <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a2e;">
          <div style="background: #1e2260; padding: 32px 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #c8a96a; font-size: 22px; margin: 0 0 8px;">¡Ya estás inscripto/a!</h1>
            <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">Involucrarnos — Formación gratuita</p>
          </div>
          <div style="background: #faf9f6; padding: 28px 24px; border-radius: 0 0 12px 12px; border: 1px solid #e8e4db; border-top: none;">
            <p style="font-size: 16px; margin: 0 0 16px;">Hola ${nombreDisplay},</p>
            <p style="font-size: 15px; color: #444; line-height: 1.6; margin: 0 0 20px;">
              Quedaste anotado/a en el curso <strong style="color: #1e2260;">${curso}</strong>.
              Te vamos a escribir a esta dirección cuando tengamos novedades: fechas, materiales y acceso.
            </p>
            <div style="background: #fff; border: 1px solid #e0dbd0; border-left: 4px solid #c8a96a; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="font-size: 13px; color: #666; margin: 0 0 4px;">Estás inscripto/a en:</p>
              <p style="font-size: 16px; font-weight: 700; color: #1e2260; margin: 0;">${curso}</p>
            </div>
            <p style="font-size: 13px; color: #888; margin: 0;">
              ¿Dudas? Escribinos a
              <a href="mailto:hola@involucrarnos.com.ar" style="color: #1e2260;">hola@involucrarnos.com.ar</a>
            </p>
          </div>
        </div>
      `,
    }

    const notifPayload = {
      sender: { name: 'Involucrarnos', email: 'hola@involucrarnos.com.ar' },
      to: [{ email: 'hola@involucrarnos.com.ar', name: 'Equipo Involucrarnos' }],
      subject: `Nueva inscripción: ${curso}`,
      htmlContent: `
        <p><strong>Nuevo inscripto/a:</strong></p>
        <ul>
          <li><strong>Nombre:</strong> ${nombre || '(no indicó)'}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Curso:</strong> ${curso}</li>
          ${cursoSlug ? `<li><strong>Slug:</strong> ${cursoSlug}</li>` : ''}
        </ul>
      `,
    }

    await Promise.all([
      fetch(BREVO_API, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(confirmPayload),
      }),
      fetch(BREVO_API, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(notifPayload),
      }),
    ]).catch((err) => console.error('Brevo email error:', err))
  }

  return NextResponse.json({ ok: true })
}
