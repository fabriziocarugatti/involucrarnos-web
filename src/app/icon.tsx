import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// "I" construida con rectángulos — sin depender del font rendering
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: '#161a4c',
        borderRadius: 7,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* I shape: barra-top + fuste + barra-bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* barra superior */}
        <div style={{ width: 16, height: 3, background: '#C8A96A', borderRadius: 1.5 }} />
        {/* fuste */}
        <div style={{ width: 5, height: 12, background: '#C8A96A', borderRadius: 1, marginTop: 1, marginBottom: 1 }} />
        {/* barra inferior */}
        <div style={{ width: 16, height: 3, background: '#C8A96A', borderRadius: 1.5 }} />
      </div>
    </div>,
    { ...size }
  )
}
