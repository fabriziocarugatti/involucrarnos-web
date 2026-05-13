'use client'

import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import type { Stat } from '@/data/estudios'

interface Props {
  stat: Stat
  context?: string  // bajada/contexto debajo del número
}

/**
 * Stat "hero" — un número MASIVO con contexto.
 * Pensado para abrir cada estudio con impacto visual.
 */
export default function HeadlineStat({ stat, context }: Props) {
  const TrendIcon =
    stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Minus
  const trendColor =
    stat.trend === 'up'
      ? 'text-emerald-600'
      : stat.trend === 'down'
        ? 'text-rose-500'
        : 'text-texto/40'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-gradient-to-br from-azul-deep via-azul-dark to-azul
                 rounded-2xl p-7 md:p-9 overflow-hidden grain"
    >
      {/* glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 0% 0%, rgba(200,169,106,0.22) 0%, transparent 60%)',
        }}
      />

      <div className="relative flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <p className="text-[0.62rem] font-bold tracking-[0.22em] uppercase text-dorado/80 mb-3">
            Dato destacado
          </p>
          <motion.p
            initial={{ scale: 0.94, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-title font-black text-white leading-[0.95] tracking-tight tabular-nums"
            style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)' }}
          >
            {stat.value}
          </motion.p>
          <p className="text-white/85 text-base md:text-lg font-medium mt-3 max-w-md">
            {stat.label}
          </p>
          {(context || stat.hint) && (
            <p className="text-white/45 text-sm mt-2 max-w-md leading-relaxed">
              {context || stat.hint}
            </p>
          )}
        </div>

        {stat.trend && (
          <motion.span
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.5 }}
            className={`inline-flex items-center justify-center w-12 h-12 rounded-full
                        ${stat.trend === 'up'
                          ? 'bg-emerald-400/20 ring-1 ring-emerald-400/40'
                          : stat.trend === 'down'
                            ? 'bg-rose-400/20 ring-1 ring-rose-400/40'
                            : 'bg-white/10 ring-1 ring-white/20'
                        }`}
          >
            <TrendIcon
              size={22}
              strokeWidth={2.4}
              className={
                stat.trend === 'up'
                  ? 'text-emerald-300'
                  : stat.trend === 'down'
                    ? 'text-rose-300'
                    : 'text-white/70'
              }
            />
          </motion.span>
        )}
      </div>

      {/* Comparison footer */}
      {stat.referenceValue !== undefined && stat.referenceLabel && (
        <div className="relative mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
          <div className="flex items-end gap-2">
            <span className="font-title font-black text-white/50 text-2xl tabular-nums leading-none">
              {stat.referenceValue}
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-white/35 pb-0.5">
              {stat.referenceLabel}
            </span>
          </div>
          <div className="flex-1 h-px bg-white/10" />
          {stat.referenceValue !== undefined && (() => {
            const numVal = parseFloat(stat.value.replace(/[^0-9,.]/g, '').replace(',', '.'))
            if (isNaN(numVal)) return null
            const diff = Math.round(((numVal - stat.referenceValue) / stat.referenceValue) * 100)
            const isAbove = diff > 0
            return (
              <span className={`text-[0.7rem] font-bold tabular-nums ${isAbove ? 'text-rose-300' : 'text-emerald-300'}`}>
                {isAbove ? '+' : ''}{diff}% vs referencia
              </span>
            )
          })()}
        </div>
      )}
    </motion.div>
  )
}
