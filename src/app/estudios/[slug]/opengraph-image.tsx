import { ImageResponse } from 'next/og'
import { estudios } from '@/data/estudios'

export const runtime = 'edge'
export const alt = 'Estudio — Involucrarnos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const AZUL_DEEP  = '#161a4c'
const AZUL       = '#2a2f76'
const NARANJA    = '#E07222'
const WHITE      = '#ffffff'
const WHITE_50   = 'rgba(255,255,255,0.5)'
const WHITE_65   = 'rgba(255,255,255,0.65)'
const WHITE_12   = 'rgba(255,255,255,0.12)'
const NARANJA_20 = 'rgba(224,114,34,0.20)'
const NARANJA_10 = 'rgba(224,114,34,0.10)'

export default function OgImage({ params }: { params: { slug: string } }) {
  const s = estudios.find((e) => e.slug === params.slug)
  if (!s) return new Response('Not found', { status: 404 })

  const bigStat = s.stats[0]
  const titleSize = s.title.length > 42 ? 46 : s.title.length > 28 ? 54 : 62

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
      {/* Background glow top-right */}
      <div
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: 480, height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${NARANJA_20} 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />
      {/* Background glow bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0,
          width: 340, height: 340,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${NARANJA_10} 0%, transparent 70%)`,
          transform: 'translate(-30%, 30%)',
        }}
      />

      {/* Brand + content row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingRight: 48 }}>

          {/* Eyebrow */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 32,
          }}>
            <div style={{
              width: 28,
              height: 28,
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
              INVOLUCRARNOS · ESTUDIOS
            </span>
          </div>

          {/* Category */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'rgba(224,114,34,0.15)',
            border: `1px solid rgba(224,114,34,0.35)`,
            borderRadius: 20,
            padding: '5px 14px',
            marginBottom: 20,
            width: 'fit-content',
          }}>
            <span style={{ color: NARANJA, fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const }}>
              {s.category}
            </span>
          </div>

          {/* Title */}
          <div style={{
            color: WHITE,
            fontSize: titleSize,
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: 18,
            letterSpacing: '-0.01em',
          }}>
            {s.title}
          </div>

          {/* Bajada */}
          <div style={{
            color: WHITE_65,
            fontSize: 18,
            lineHeight: 1.5,
            display: '-webkit-box',
            overflow: 'hidden',
          }}>
            {s.bajada.slice(0, 110)}{s.bajada.length > 110 ? '…' : ''}
          </div>
        </div>

        {/* Right: big stat */}
        {bigStat && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            minWidth: 240,
            paddingTop: 60,
          }}>
            <div style={{
              color: NARANJA,
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}>
              {bigStat.value}
            </div>
            <div style={{
              color: WHITE_50,
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'right' as const,
              marginTop: 10,
              maxWidth: 220,
              lineHeight: 1.4,
              letterSpacing: '0.02em',
              textTransform: 'uppercase' as const,
            }}>
              {bigStat.label}
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: `1px solid ${WHITE_12}`,
        paddingTop: 22,
        marginTop: 28,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <span style={{ color: WHITE_50, fontSize: 13 }}>Período {s.period}</span>
          {s.authors.length > 0 && (
            <>
              <span style={{ color: WHITE_12, fontSize: 13 }}>·</span>
              <span style={{ color: WHITE_50, fontSize: 13 }}>{s.authors.join(', ')}</span>
            </>
          )}
        </div>
        <span style={{ color: NARANJA, fontSize: 14, fontWeight: 700, letterSpacing: '0.04em' }}>
          involucrarnos.ar
        </span>
      </div>
    </div>,
    { ...size }
  )
}
