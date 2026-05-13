import { ImageResponse } from 'next/og'
import { getAllArticulos } from '@/sanity/queries'

export const runtime = 'edge'
export const alt = 'Artículo — Involucrarnos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const AZUL_DEEP  = '#161a4c'
const AZUL       = '#2a2f76'
const NARANJA    = '#E07222'
const WHITE      = '#ffffff'
const WHITE_55   = 'rgba(255,255,255,0.55)'
const WHITE_12   = 'rgba(255,255,255,0.12)'
const NARANJA_15 = 'rgba(224,114,34,0.15)'

export default async function OgImage({ params }: { params: { slug: string } }) {
  let art: Awaited<ReturnType<typeof getAllArticulos>>[number] | undefined

  try {
    const all = await getAllArticulos()
    art = all.find((a) => a.slug === params.slug)
  } catch {
    // Sanity may be unavailable at build time — return a generic card
  }

  const title = art?.title ?? 'Artículo'
  const bajada = art?.bajada ?? ''
  const category = art?.category ?? 'Involucrarnos'
  const author = art?.author ?? 'Involucrarnos'
  const titleSize = title.length > 48 ? 44 : title.length > 32 ? 52 : 60

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        background: AZUL_DEEP,
        padding: '52px 72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Wide accent band at top */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${NARANJA} 0%, rgba(224,114,34,0) 70%)`,
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: -100, left: -80,
          width: 500, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(42,47,118,0.8) 0%, transparent 70%)',
        }}
      />

      {/* Eyebrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 36,
      }}>
        <div style={{
          width: 28, height: 28,
          borderRadius: 6,
          background: AZUL,
          border: `1px solid ${NARANJA}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
        }}>
          <span style={{ color: NARANJA, fontSize: 16, fontWeight: 900, lineHeight: 1 }}>I</span>
        </div>
        <span style={{
          color: NARANJA,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase' as const,
        }}>
          INVOLUCRARNOS
        </span>
        <span style={{ color: WHITE_12, margin: '0 12px', fontSize: 12 }}>·</span>
        <span style={{
          color: WHITE_55,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase' as const,
        }}>
          {category}
        </span>
      </div>

      {/* Title */}
      <div style={{
        color: WHITE,
        fontSize: titleSize,
        fontWeight: 900,
        lineHeight: 1.12,
        letterSpacing: '-0.01em',
        flex: 1,
        maxWidth: 920,
      }}>
        {title}
      </div>

      {/* Bajada */}
      {bajada && (
        <div style={{
          color: WHITE_55,
          fontSize: 20,
          lineHeight: 1.5,
          maxWidth: 760,
          marginBottom: 28,
        }}>
          {bajada.slice(0, 120)}{bajada.length > 120 ? '…' : ''}
        </div>
      )}

      {/* Footer bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${WHITE_12}`,
        paddingTop: 22,
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: 36, height: 36,
            borderRadius: '50%',
            background: NARANJA_15,
            border: `1px solid rgba(224,114,34,0.3)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}>
            <span style={{ color: NARANJA, fontSize: 15, fontWeight: 900 }}>
              {author.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
            </span>
          </div>
          <span style={{ color: WHITE_55, fontSize: 15, fontWeight: 500 }}>{author}</span>
        </div>
        <span style={{ color: NARANJA, fontSize: 14, fontWeight: 700, letterSpacing: '0.04em' }}>
          involucrarnos.ar
        </span>
      </div>
    </div>,
    { ...size }
  )
}
