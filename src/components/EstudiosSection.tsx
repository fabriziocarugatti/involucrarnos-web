'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ArrowRight, ChevronDown } from 'lucide-react'
import { site } from '@/data/site'
import { estudios, type Study } from '@/data/estudios'
import { fadeUp, stagger } from '@/lib/motion'

const INITIAL_COUNT = 3

function StatusBadge({ status }: { status: Study['status'] }) {
  const styles: Record<Study['status'], string> = {
    publicado:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    en_curso:   'bg-amber-50 text-amber-700 border-amber-200',
    preliminar: 'bg-azul/8 text-azul-dark border-azul/15',
  }
  const labels: Record<Study['status'], string> = {
    publicado:  'Publicado',
    en_curso:   'En curso',
    preliminar: 'Preliminar',
  }
  return (
    <span className={`inline-flex items-center text-[0.62rem] font-bold tracking-widest uppercase border rounded-full px-2 py-0.5 ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function StudyCard({ study }: { study: Study }) {
  const headline = study.stats[0]
  const supportingStats = study.stats.slice(1, 3)

  return (
    <motion.article variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }} className="h-full">
      <Link
        href={`/estudios/${study.slug}`}
        className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden
                   border border-black/8 hover:border-dorado/40
                   shadow-[0_2px_18px_rgba(42,47,118,0.05)]
                   hover:shadow-[0_18px_50px_rgba(42,47,118,0.14)]
                   transition-shadow duration-300"
      >
        <div className="relative bg-gradient-to-br from-azul-deep via-azul-dark to-azul p-6 md:p-7 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-60"
            style={{ background: 'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(200,169,106,0.22) 0%, transparent 60%)' }}
          />
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <StatusBadge status={study.status} />
              <FileText size={16} className="text-dorado/60" strokeWidth={1.8} />
            </div>
            {headline && (
              <>
                <p className="font-title font-black text-white leading-[0.95] tracking-tight tabular-nums"
                   style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
                  {headline.value}
                </p>
                <p className="text-white/75 text-[0.78rem] font-medium leading-snug mt-2 line-clamp-2">
                  {headline.label}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-dorado-deep">{study.category}</span>
            <span className="text-[0.62rem] text-texto/40">· {study.date}</span>
          </div>
          <h3 className="font-title font-800 text-azul-dark text-lg md:text-xl leading-snug mb-3 group-hover:text-azul transition-colors">
            {study.title}
          </h3>
          <p className="text-texto/65 text-sm leading-relaxed line-clamp-3 mb-5 flex-1">{study.bajada}</p>

          {supportingStats.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-black/8 mb-5">
              {supportingStats.map((s, i) => (
                <div key={i}>
                  <p className="font-title font-800 text-azul-dark text-base leading-none tabular-nums">{s.value}</p>
                  <p className="text-[0.65rem] text-texto/50 mt-1 leading-tight line-clamp-2">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-azul group-hover:text-dorado-deep transition-colors mt-auto">
            Ver estudio completo
            <ArrowRight size={13} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function EstudiosSection() {
  const e = site.estudios
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? estudios : estudios.slice(0, INITIAL_COUNT)
  const hasMore = estudios.length > INITIAL_COUNT

  return (
    <section id="estudios" className="bg-crema py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,169,106,0.10) 0%, transparent 60%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)} className="max-w-2xl mb-12 md:mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">{e.eyebrow}</motion.span>
          <motion.h2 variants={fadeUp}
            className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-4">
            {e.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-texto/55 text-base md:text-lg leading-relaxed">
            {e.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.04, 0.08)}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {visible.map((s) => <StudyCard key={s.slug} study={s} />)}

          <AnimatePresence>
            {expanded && estudios.slice(INITIAL_COUNT).map((s) => (
              <motion.div key={s.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <StudyCard study={s} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div className="flex justify-center mt-10">
            <motion.button
              onClick={() => setExpanded((v) => !v)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 20 }}
              className="inline-flex items-center gap-2 border border-azul/20 hover:border-dorado/50
                         bg-white hover:bg-dorado/5 text-azul-dark font-bold text-sm
                         px-7 py-3 rounded-xl transition-colors shadow-sm"
            >
              {expanded ? 'Ver menos' : `Ver todos los estudios (${estudios.length})`}
              <ChevronDown size={16} strokeWidth={2.2}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}
