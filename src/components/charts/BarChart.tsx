'use client'

import { motion } from 'framer-motion'
import type { BarChartData } from '@/data/estudios'

interface Props {
  data: BarChartData
  className?: string
}

export default function BarChart({ data, className = '' }: Props) {
  const max = Math.max(...data.bars.map((b) => b.value), 1)

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-2.5">
        {data.bars.map((b, i) => {
          const pct = (b.value / max) * 100
          return (
            <div key={b.label} className="grid grid-cols-12 items-center gap-3">
              <span className="col-span-4 sm:col-span-3 text-xs font-medium text-texto/70 truncate">
                {b.label}
              </span>
              <div className="col-span-6 sm:col-span-7 relative h-7 bg-azul-deep/5 rounded-md overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-y-0 left-0 rounded-md ${
                    b.highlight
                      ? 'bg-gradient-to-r from-dorado-deep to-dorado'
                      : 'bg-gradient-to-r from-azul to-azul-dark'
                  }`}
                />
              </div>
              <span
                className={`col-span-2 text-right text-xs font-bold tabular-nums ${
                  b.highlight ? 'text-dorado-deep' : 'text-azul-dark'
                }`}
              >
                {b.value}
                {data.unit?.startsWith('%') ? '' : ''}
              </span>
            </div>
          )
        })}
      </div>
      {data.unit && (
        <p className="text-[0.65rem] text-texto/40 mt-3 italic">{data.unit}</p>
      )}
    </div>
  )
}
