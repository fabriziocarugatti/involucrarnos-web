'use client'

import { motion } from 'framer-motion'
import type { BarChartData } from '@/data/estudios'

interface Props {
  data: BarChartData
  className?: string
}

export default function BarChart({ data, className = '' }: Props) {
  const allValues = data.bars.map((b) => b.value)
  if (data.referenceValue !== undefined) allValues.push(data.referenceValue)
  const max = Math.max(...allValues, 1)

  const refPct = data.referenceValue !== undefined ? (data.referenceValue / max) * 100 : null

  return (
    <div className={`w-full ${className}`}>
      {data.unit && (
        <p className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-texto/45 mb-4">
          {data.unit}
        </p>
      )}
      <div className="space-y-3">
        {data.bars.map((b, i) => {
          const pct = (b.value / max) * 100
          return (
            <div key={b.label} className="grid grid-cols-12 items-center gap-3">
              <span
                className={`col-span-4 sm:col-span-3 text-[0.85rem] font-semibold truncate ${
                  b.highlight ? 'text-dorado-deep' : 'text-texto/75'
                }`}
              >
                {b.label}
              </span>
              <div className="col-span-6 sm:col-span-7 relative h-10 bg-gradient-to-r from-azul-deep/5 to-azul-deep/[0.02] rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-y-0 left-0 rounded-lg ${
                    b.highlight
                      ? 'bg-gradient-to-r from-dorado-deep via-dorado to-dorado-soft shadow-[0_0_18px_rgba(200,169,106,0.45)]'
                      : 'bg-gradient-to-r from-azul-dark via-azul to-azul/85'
                  }`}
                >
                  <span className="absolute inset-0 opacity-30"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent 0 4px, rgba(255,255,255,0.08) 4px 6px)',
                    }}
                  />
                </motion.div>
                {/* Reference line */}
                {refPct !== null && (
                  <div
                    className="absolute inset-y-0 pointer-events-none z-10"
                    style={{ left: `${refPct}%` }}
                  >
                    <div className="w-0 h-full border-l-2 border-dashed border-dorado" />
                  </div>
                )}
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.08 + 0.8, duration: 0.4 }}
                className={`col-span-2 text-right font-title font-800 text-base tabular-nums ${
                  b.highlight ? 'text-dorado-deep' : 'text-azul-dark'
                }`}
              >
                {b.value}
              </motion.span>
            </div>
          )
        })}
      </div>

      {/* Reference legend */}
      {refPct !== null && data.referenceLabel && (
        <div className="mt-4 flex items-center gap-2">
          <div className="w-6 border-t-2 border-dashed border-dorado flex-shrink-0" />
          <span className="text-[0.72rem] text-texto/55 font-medium">
            {data.referenceLabel}
            {data.referenceValue !== undefined && (
              <span className="ml-1 text-dorado-deep font-bold">{data.referenceValue}</span>
            )}
          </span>
        </div>
      )}
    </div>
  )
}
