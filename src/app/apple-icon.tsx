import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: 'linear-gradient(145deg, #2a2f76 0%, #161a4c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 36,
      }}
    >
      <span
        style={{
          color: '#E07222',
          fontSize: 110,
          fontWeight: 900,
          lineHeight: 1,
          fontFamily: 'serif',
          letterSpacing: '-0.03em',
        }}
      >
        I
      </span>
    </div>,
    { ...size }
  )
}
