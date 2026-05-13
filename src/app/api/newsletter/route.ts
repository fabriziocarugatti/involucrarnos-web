import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const BREVO_CONTACTS_URL = 'https://api.brevo.com/v3/contacts'
const BREVO_EMAIL_URL = 'https://api.brevo.com/v3/smtp/email'
const BREVO_LIST_ID = 2
const NOTIF_EMAIL = 'involucrarnosoficial@gmail.com'

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
  const nombreDisplay = normalizedName || 'lectora/lector'

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  const { error: dbError } = await supabase.from('suscriptores').upsert(
    { email: normalizedEmail, nombre: normalizedName },
    { onConflict: 'email' }
  )
  if (dbError) {
    console.error('Supabase error:', dbError)
    return NextResponse.json({ error: 'Error al suscribirse. Intentá de nuevo.' }, { status: 500 })
  }

  if (process.env.BREVO_API_KEY) {
    const contactPayload: Record<string, unknown> = {
      email: normalizedEmail,
      listIds: [BREVO_LIST_ID],
      updateEnabled: true,
    }
    if (normalizedName) contactPayload.attributes = { FIRSTNAME: normalizedName }

    const confirmHtml = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f3ee;font-family:system-ui,-apple-system,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <tr><td style="background:#161a4c;border-radius:16px 16px 0 0;padding:32px 32px 28px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#c8a96a;">Involucrarnos</p>
        <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.45);">Políticas públicas · Ciudadanía activa</p>
      </td></tr>
      <tr><td style="background:#faf9f6;border-radius:0 0 16px 16px;padding:32px;border:1px solid #e8e4db;border-top:none;">
        <h1 style="font-size:22px;font-weight:900;color:#161a4c;margin:0 0 16px;line-height:1.2;">
          ¡Bienvenido/a a la comunidad!
        </h1>
        <p style="font-size:15px;color:#444;line-height:1.65;margin:0 0 24px;">
          Hola ${nombreDisplay}, ya estás suscripto/a al newsletter de Involucrarnos.
        </p>
        <div style="background:#fff;border:1px solid #e0dbd0;border-left:4px solid #c8a96a;border-radius:10px;padding:18px 22px;margin-bottom:24px;">
          <p style="font-size:13px;color:#888;margin:0 0 8px;">¿Qué vas a recibir?</p>
          <ul style="margin:0;padding-left:18px;font-size:14px;color:#444;line-height:2;">
            <li>Artículos y análisis sobre políticas públicas argentinas</li>
            <li>Novedades sobre cursos y formaciones gratuitas</li>
            <li>Estudios e informes de nuestro equipo</li>
          </ul>
        </div>
        <p style="font-size:14px;color:#555;line-height:1.65;margin:0 0 24px;">
          Podés leer todos nuestros contenidos en
          <a href="https://involucrarnos.com.ar" style="color:#161a4c;font-weight:600;">involucrarnos.com.ar</a>
        </p>
        <hr style="border:none;border-top:1px solid #e8e4db;margin:0 0 20px;">
        <p style="font-size:12px;color:#aaa;margin:0;line-height:1.6;">
          Si no te suscribiste vos, podés ignorar este mensaje.
        </p>
      </td></tr>
      <tr><td style="padding:20px 0 0;text-align:center;">
        <p style="font-size:11px;color:#bbb;margin:0;">© 2026 Involucrarnos · Buenos Aires, Argentina</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`

    await Promise.all([
      fetch(BREVO_CONTACTS_URL, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(contactPayload),
      }),
      fetch(BREVO_EMAIL_URL, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Involucrarnos', email: 'noreply@involucrarnos.com.ar' },
          to: [{ email: normalizedEmail, name: nombreDisplay }],
          subject: '¡Bienvenido/a a Involucrarnos!',
          htmlContent: confirmHtml,
        }),
      }),
      fetch(BREVO_EMAIL_URL, {
        method: 'POST',
        headers: { 'api-key': process.env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: { name: 'Involucrarnos', email: 'noreply@involucrarnos.com.ar' },
          to: [{ email: NOTIF_EMAIL, name: 'Equipo Involucrarnos' }],
          subject: `Nuevo suscriptor: ${normalizedEmail}`,
          htmlContent: `<p>Nuevo suscriptor al newsletter:<br><strong>${normalizedEmail}</strong>${normalizedName ? ` (${normalizedName})` : ''}</p>`,
        }),
      }),
    ]).catch((err) => console.error('Brevo error:', err))
  }

  return NextResponse.json({ ok: true })
}
