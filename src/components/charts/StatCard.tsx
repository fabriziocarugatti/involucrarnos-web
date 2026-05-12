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
      className={`relative rounded-xl p-4 md:p-5 overflow-hidden ${
        isDark
          ? 'bg-white/[0.05] border border-white/12 backdrop-blur-sm'
          : 'bg-white border border-black/8 shadow-[0_2px_12px_rgba(42,47,118,0.04)]'
      }`}
    >
      {stat.trend && (
        <span
          className={`absolute top-3 right-3 inline-flex items-center justify-center w-6 h-6 rounded-full ${
            stat.trend === 'up'
              ? 'bg-emerald-100/80'
              : stat.trend === 'down'
                ? 'bg-rose-100/80'
                : 'bg-gray-100/80'
          }`}
        >
          <Icon size={12} strokeWidth={2.4} className={trendColor} />
        </span>
      )}
      <p
        className={`font-title font-black text-[1.85rem] md:text-[2.1rem] leading-none tracking-tight tabular-nums ${
          isDark ? 'text-dorado' : 'text-azul-dark'
        }`}
      >
        {stat.value}
      </p>
      <p className={`mt-1.5 text-[0.78rem] font-medium leading-snug ${isDark ? 'text-white/75' : 'text-texto/75'}`}>
        {stat.label}
      </p>
      {stat.hint && (
        <p className={`mt-1 text-[0.68rem] ${isDark ? 'text-white/40' : 'text-texto/40'}`}>
          {stat.hint}
        </p>
      )}
    </motion.div>
  )
}
