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
        borderRadius: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 90, height: 14, background: '#C8A96A', borderRadius: 7 }} />
        <div style={{ width: 28, height: 72, background: '#C8A96A', borderRadius: 6, marginTop: 5, marginBottom: 5 }} />
        <div style={{ width: 90, height: 14, background: '#C8A96A', borderRadius: 7 }} />
      </div>
    </div>,
    { ...size }
  )
}
