'use client'

import { motion } from 'framer-motion'
import type { DonutChartData } from '@/data/estudios'

interface Props {
  data: DonutChartData
  className?: string
}

const PALETTE = ['#2a2f76', '#E07222', '#B85510', '#1e2260', '#E8884A']

export default function DonutChart({ data, className = '' }: Props) {
  const total = data.segments.reduce((s, x) => s + x.value, 0) || 1
  const radius = 70
  const stroke = 22
  const circumference = 2 * Math.PI * radius

  let offset = 0
  const segs = data.segments.map((s, i) => {
    const len = (s.value / total) * circumference
    const seg = {
      ...s,
      color: s.color || PALETTE[i % PALETTE.length],
      strokeDasharray: `${len} ${circumference - len}`,
      strokeDashoffset: -offset,
      pct: ((s.value / total) * 100).toFixed(0),
    }
    offset += len
    return seg
  })

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 items-center ${className}`}>
      <div className="relative flex justify-center">
        <svg viewBox="-100 -100 200 200" className="w-44 h-44" aria-label="Gráfico circular">
          <circle r={radius} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
          {segs.map((s, i) => (
            <motion.circle
              key={i}
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={s.strokeDasharray}
              strokeDashoffset={s.strokeDashoffset}
              transform="rotate(-90)"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="butt"
            />
          ))}
          <text
            textAnchor="middle"
            dy="0.35em"
            fontFamily="ui-sans-serif, system-ui"
            fontSize="22"
            fontWeight="800"
            fill="#1e2260"
          >
            {total}
            {data.unit?.startsWith('%') ? '%' : ''}
          </text>
        </svg>
      </div>

      <ul className="space-y-2.5">
        {segs.map((s, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <span
              className="mt-1.5 inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: s.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-texto/80 leading-snug">{s.label}</p>
              <p className="text-xs text-texto/45 tabular-nums">
                <span className="font-bold text-azul-dark">{s.pct}%</span> · {s.value}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
