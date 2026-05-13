import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#161a4c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
      }}
    >
      <span
        style={{
          color: '#E07222',
          fontSize: 21,
          fontWeight: 900,
          lineHeight: 1,
          fontFamily: 'serif',
          letterSpacing: '-0.02em',
        }}
      >
        I
      </span>
    </div>,
    { ...size }
  )
}
