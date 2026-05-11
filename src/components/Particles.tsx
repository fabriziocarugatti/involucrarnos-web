'use client'

import { useMemo } from 'react'

interface Props {
  count?: number
  className?: string
}

export default function Particles({ count = 18, className = '' }: Props) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 18
        const duration = 14 + Math.random() * 10
        const size = 2 + Math.random() * 3
        const opacity = 0.3 + Math.random() * 0.5
        return { id: i, left, delay, duration, size, opacity }
      }),
    [count]
  )

  return (
    <div className={`particles ${className}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `-10px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}
