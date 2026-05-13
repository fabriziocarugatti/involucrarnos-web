'use client'

import { motion } from 'framer-motion'
import type { MapNOAData } from '@/data/estudios'

interface Props {
  data: MapNOAData
  className?: string
}

/**
 * Stylized map of NOA — 6 simplified province shapes positioned roughly geographically.
 * Not a precise cartographic projection; intentionally schematic for readability.
 */
const PROVINCES: Record<
  MapNOAData['values'][number]['provincia'],
  { d: string; label: string; cx: number; cy: number }
> = {
  jujuy:     { d: 'M 60 30 L 140 30 L 150 90 L 80 100 L 60 70 Z', label: 'Jujuy',     cx: 100, cy: 65 },
  salta:     { d: 'M 60 100 L 150 95 L 175 175 L 65 180 L 50 130 Z', label: 'Salta',   cx: 110, cy: 140 },
  catamarca: { d: 'M 50 185 L 175 180 L 165 280 L 80 290 L 45 230 Z', label: 'Catam.', cx: 110, cy: 235 },
  tucuman:   { d: 'M 175 175 L 230 170 L 240 240 L 175 245 Z', label: 'Tucumán',     cx: 205, cy: 210 },
  santiago:  { d: 'M 240 175 L 320 175 L 325 270 L 245 275 Z', label: 'Sgo.',         cx: 285, cy: 225 },
  larioja:   { d: 'M 75 290 L 195 280 L 215 360 L 90 365 Z', label: 'La Rioja',      cx: 145, cy: 325 },
}

function colorFor(value: number, vMin: number, vMax: number): string {
  const t = vMax === vMin ? 0.5 : (value - vMin) / (vMax - vMin)
  // interpolate from light azul to deep dorado for emphasis
  const r = Math.round(255 - t * 80)
  const g = Math.round(245 - t * 110)
  const b = Math.round(230 - t * 110)
  return `rgb(${r}, ${g}, ${b})`
}

export default function NOAMap({ data, className = '' }: Props) {
  const values = data.values
  const vMax = Math.max(...values.map((v) => v.value), 1)
  const vMin = Math.min(...values.map((v) => v.value), 0)

  return (
    <div className={`w-full ${className}`}>
      <svg viewBox="0 0 380 400" className="w-full h-auto max-w-md mx-auto" role="img" aria-label="Mapa del NOA">
        {values.map((v, i) => {
          const p = PROVINCES[v.provincia]
          if (!p) return null
          const fill = colorFor(v.value, vMin, vMax)
          const stroke = v.value === vMax ? '#B85510' : '#cbd5e1'
          const strokeWidth = v.value === vMax ? 2 : 1
          return (
            <motion.g
              key={v.provincia}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <path d={p.d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
              <text
                x={p.cx}
                y={p.cy}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#1e2260"
                fontFamily="ui-sans-serif, system-ui"
              >
                {p.label}
              </text>
              <text
                x={p.cx}
                y={p.cy + 14}
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
                fill="#B85510"
                fontFamily="ui-sans-serif, system-ui"
              >
                {v.value}
                {data.unit?.startsWith('%') ? '%' : ''}
              </text>
            </motion.g>
          )
        })}
      </svg>
      {data.unit && (
        <p className="text-[0.65rem] text-texto/40 italic mt-2 text-center">{data.unit}</p>
      )}
    </div>
  )
}
