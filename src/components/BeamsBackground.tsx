'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface Beam {
  id: number
  left: number
  width: number
  delay: number
  duration: number
  opacity: number
  hue: 'dorado' | 'azul' | 'soft'
}

const HUE_MAP: Record<Beam['hue'], string> = {
  dorado: 'rgba(200,169,106,0.18)',
  azul:   'rgba(120,140,255,0.16)',
  soft:   'rgba(255,255,255,0.08)',
}

interface Props {
  count?: number
  className?: string
}

export default function BeamsBackground({ count = 9, className = '' }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const beams = useMemo<Beam[]>(() => {
    if (!mounted) return []
    const hues: Beam['hue'][] = ['dorado', 'azul', 'soft']
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      width: 0.6 + Math.random() * 1.6,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 12,
      opacity: 0.5 + Math.random() * 0.5,
      hue: hues[i % hues.length],
    }))
  }, [count, mounted])

  if (!mounted) return null

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {beams.map((b) => (
        <motion.span
          key={b.id}
          initial={{ y: '-110%', opacity: 0 }}
          animate={{ y: '120%', opacity: [0, b.opacity, b.opacity, 0] }}
          transition={{
            delay: b.delay,
            duration: b.duration,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
          className="absolute top-0 h-[140%] rounded-full blur-[2px]"
          style={{
            left: `${b.left}%`,
            width: `${b.width}px`,
            background: `linear-gradient(180deg, transparent 0%, ${HUE_MAP[b.hue]} 40%, ${HUE_MAP[b.hue]} 60%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  )
}
