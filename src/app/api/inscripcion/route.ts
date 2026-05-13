import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BREVO_API = 'https://api.brevo.com/v3/smtp/email'
const NOTIF_EMAIL = 'involucrarnosoficial@gmail.com'

function emailBase(content: string) {
  return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <!-- Header -->
      <tr><td style="background:#161a4c;border-radius:16px 16px 0 0;padding:32px 32px 28px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#e07222;">Involucrarnos</p>
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);">Formación gratuita en políticas públicas</p>
      </td></tr>
      <!-- Body -->
      <tr><td style="background:#faf9f6;border-radius:0 0 16px 16px;padding:32px;border:1px solid #e8e4db;border-top:none;">
        ${content}
        <hr style="border:none;border-top:1px solid #e8e4db;margin:28px 0 20px;">
        <p style="font-size:12px;color:#aaa;margin:0;line-height:1.6;">
          ¿Tenés alguna duda? Escribinos a
          <a href="mailto:${NOTIF_EMAIL}" style="color:#161a4c;text-decoration:none;">${NOTIF_EMAIL}</a>
        </p>
      </td></tr>
      <!-- Footer -->
      <tr><td style="padding:20px 0 0;text-align:center;">
        <p style="font-size:11px;color:#bbb;margin:0;">© 2026 Involucrarnos · Buenos Aires, Argentina</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function POST(req: NextRequest) {
  let body: {
    nombre?: string; email?: string; curso?: string; cursoSlug?: string
    fechaNacimiento?: string; celular?: string; ciudad?: string; provincia?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Datos inválidos.' }, { status: 400 })
  }

  const { nombre, email, curso, cursoSlug, fechaNacimiento, celular, ciudad, provincia } = body
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
    fecha_nacimiento: fechaNacimiento || null,
    celular: celular?.trim() || null,
    ciudad: ciudad?.trim() || null,
    provincia: provincia || null,
    status: 'pendiente',
  })

  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'No pudimos guardar tu inscripción. Intentá de nuevo.' }, { status: 500 })
  }

  if (process.env.BREVO_API_KEY) {
    const nombreDisplay = nombre?.trim() || 'estudiante'

    const confirmBody = emailBase(`
      <h1 style="font-size:22px;font-weight:900;color:#161a4c;margin:0 0 16px;line-height:1.2;">
        ¡Quedaste inscripto/a!
      </h1>
      <p style="font-size:15px;color:#444;line-height:1.65;margin:0 0 24px;">
        Hola ${nombreDisplay}, ¡gracias por sumarte! Estás anotado/a en:
      </p>
      <div style="background:#fff;border:1px solid #e0dbd0;border-left:4px solid #e07222;border-radius:10px;padding:18px 22px;margin-bottom:24px;">
        <p style="font-size:13px;color:#888;margin:0 0 4px;">Curso</p>
        <p style="font-size:17px;font-weight:800;color:#161a4c;margin:0;">${curso}</p>
      </div>
      <p style="font-size:14px;color:#555;line-height:1.65;margin:0 0 8px;">
        Te vamos a avisar a <strong>${email}</strong> cuando tengamos fechas, materiales y acceso confirmados.
      </p>
      <p style="font-size:14px;color:#555;line-height:1.65;margin:0;">
        Mientras tanto podés seguir explorando nuestros contenidos en
        <a href="https://involucrarnos.com.ar" style="color:#161a4c;font-weight:600;">involucrarnos.com.ar</a>
      </p>
    `)

    const notifBody = emailBase(`
      <h2 style="font-size:18px;font-weight:800;color:#161a4c;margin:0 0 20px;">
        Nueva inscripción — ${curso}
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ['Nombre', nombre || '(no indicó)'],
          ['Email', email],
          ['Curso', curso],
          ['Provincia', provincia || '—'],
          ['Ciudad', ciudad || '—'],
          ['Celular', celular || '—'],
          ['F. nacimiento', fechaNacimiento || '—'],
        ].map(([k, v]) => `
        <tr>
          <td style="padding:8px 12px;background:#f5f3ee;font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.08em;white-space:nowrap;border-radius:6px 0 0 6px;">${k}</td>
          <td style="padding:8px 12px;font-size:14px;color:#222;border-bottom:1px solid #eee;">${v}</td>
        </tr>`).join('')}
      </table>
    `)

    await Promise.all([
      fetch(BREVO_API, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Involucrarnos', email: 'noreply@involucrarnos.com.ar' },
          to: [{ email, name: nombreDisplay }],
          subject: `¡Inscripción confirmada! — ${curso}`,
          htmlContent: confirmBody,
        }),
      }),
      fetch(BREVO_API, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Involucrarnos', email: 'noreply@involucrarnos.com.ar' },
          to: [{ email: NOTIF_EMAIL, name: 'Equipo Involucrarnos' }],
          subject: `Nueva inscripción: ${curso} — ${nombreDisplay}`,
          htmlContent: notifBody,
        }),
      }),
    ]).catch((err) => console.error('Brevo email error:', err))
  }

  return NextResponse.json({ ok: true })
}
