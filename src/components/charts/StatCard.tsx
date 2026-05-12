'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { Stat } from '@/data/estudios'

interface Props {
  stat: Stat
  index?: number
  variant?: 'light' | 'dark'
}

export default function StatCard({ stat, index = 0, variant = 'light' }: Props) {
  const Icon =
    stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Minus
  const trendColor =
    stat.trend === 'up'
      ? 'text-emerald-600'
      : stat.trend === 'down'
        ? 'text-rose-500'
        : 'text-texto/40'
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-xl p-5 md:p-6 overflow-hidden ${
        isDark
          ? 'bg-white/[0.05] border border-white/12 backdrop-blur-sm'
          : 'bg-gradient-to-br from-white to-crema/30 border border-black/8 shadow-[0_2px_16px_rgba(42,47,118,0.05)]'
      }`}
    >
      {/* corner accent for highlighted/trend */}
      {stat.trend && (
        <span
          className={`absolute top-3 right-3 inline-flex items-center justify-center w-7 h-7 rounded-full ${
            stat.trend === 'up'
              ? 'bg-emerald-100/80'
              : stat.trend === 'down'
                ? 'bg-rose-100/80'
                : 'bg-gray-100/80'
          }`}
        >
          <Icon size={13} strokeWidth={2.6} className={trendColor} />
        </span>
      )}

      <p
        className={`font-title font-black leading-[0.95] tracking-tight tabular-nums ${
          isDark ? 'text-dorado' : 'text-azul-dark'
        }`}
        style={{ fontSize: 'clamp(1.7rem, 3vw, 2.4rem)' }}
      >
        {stat.value}
      </p>
      <p
        className={`mt-2.5 text-[0.82rem] font-semibold leading-snug ${
          isDark ? 'text-white/80' : 'text-texto/80'
        }`}
      >
        {stat.label}
      </p>
      {stat.hint && (
        <p className={`mt-1 text-[0.7rem] ${isDark ? 'text-white/45' : 'text-texto/45'}`}>
          {stat.hint}
        </p>
      )}

      {/* subtle bottom gradient line */}
      <span
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
          isDark
            ? 'bg-gradient-to-r from-dorado/60 via-dorado/20 to-transparent'
            : 'bg-gradient-to-r from-azul/40 via-dorado/30 to-transparent'
        }`}
      />
    </motion.div>
  )
}
