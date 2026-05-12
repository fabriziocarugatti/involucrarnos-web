'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Loader2 } from 'lucide-react'

interface Props {
  slug: string
}

export default function StudySummary({ slug }: Props) {
  const [bullets, setBullets] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    fetch(`/api/summary?slug=${encodeURIComponent(slug)}&type=estudio`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => {
        if (cancelled) return
        if (Array.isArray(d?.bullets) && d.bullets.length === 3) {
          setBullets(d.bullets)
        } else {
          setError(true)
        }
      })
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [slug])

  if (error) return null

  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl mx-auto px-5 md:px-6 mb-10 md:mb-12"
    >
      <div className="bg-gradient-to-br from-azul-deep via-azul-dark to-azul rounded-2xl p-6 md:p-7 shadow-[0_12px_40px_rgba(15,17,55,0.18)] grain overflow-hidden relative">
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{ background: 'radial-gradient(ellipse 60% 100% at 100% 0%, rgba(200,169,106,0.22) 0%, transparent 60%)' }}
        />
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-dorado/20 ring-1 ring-dorado/40">
              <Sparkles size={13} strokeWidth={2.2} className="text-dorado" />
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-dorado">
              Hallazgos clave en 3 puntos
            </span>
            <span className="ml-auto text-[0.6rem] text-white/35">IA · El Especialista</span>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-white/55 text-sm py-3">
              <Loader2 size={14} className="animate-spin" />
              <span>Analizando estudio…</span>
            </div>
          )}

          {!loading && bullets && (
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-3 text-white/90 text-[0.95rem] leading-relaxed"
                >
                  <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-dorado/15 text-dorado text-[0.7rem] font-bold tabular-nums">
                    {i + 1}
                  </span>
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
