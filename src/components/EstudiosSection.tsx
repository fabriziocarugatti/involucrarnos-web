'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ChevronDown, ExternalLink } from 'lucide-react'
import { site } from '@/data/site'
import { estudios, type Study } from '@/data/estudios'
import { fadeUp, stagger } from '@/lib/motion'
import Chart from './charts/Chart'
import StatCard from './charts/StatCard'
import HeadlineStat from './charts/HeadlineStat'

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
    <span
      className={`inline-flex items-center text-[0.62rem] font-bold tracking-widest uppercase border rounded-full px-2 py-0.5 ${styles[status]}`}
    >
      {labels[status]}
    </span>
  )
}

function StudyCard({ study, index }: { study: Study; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const e = site.estudios

  return (
    <motion.article
      variants={fadeUp}
      className="bg-white border border-black/8 rounded-2xl overflow-hidden
                 shadow-[0_2px_18px_rgba(42,47,118,0.05)]"
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left p-6 md:p-7 hover:bg-crema/40 transition-colors flex items-start gap-4"
        aria-expanded={open}
      >
        <span className="hidden sm:inline-flex flex-shrink-0 w-11 h-11 rounded-xl bg-azul/8 items-center justify-center">
          <FileText size={20} className="text-azul" strokeWidth={1.8} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <StatusBadge status={study.status} />
            <span className="text-[0.65rem] font-bold tracking-widest uppercase text-dorado-deep">
              {study.category}
            </span>
            <span className="text-[0.65rem] text-texto/40">· {study.date}</span>
          </div>
          <h3 className="font-title font-800 text-azul-dark text-lg md:text-[1.35rem] leading-snug mb-2">
            {study.title}
          </h3>
          <p className="text-texto/65 text-sm md:text-[0.95rem] leading-relaxed">{study.bajada}</p>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-texto/40 mt-1"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      {/* Body */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-black/8"
        >
          <div className="p-6 md:p-7 space-y-7">
            {/* Headline stat (the first one) */}
            {study.stats[0] && <HeadlineStat stat={study.stats[0]} />}

            {/* Supporting stats grid */}
            {study.stats.length > 1 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {study.stats.slice(1).map((s, i) => (
                  <StatCard key={i} stat={s} index={i} />
                ))}
              </div>
            )}

            {/* Findings */}
            <div>
              <p className="text-[0.7rem] font-bold tracking-widest uppercase text-texto/45 mb-3">
                {e.findingsLabel}
              </p>
              <ul className="space-y-2.5">
                {study.findings.map((f, i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem] text-texto/80 leading-relaxed">
                    <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-dorado" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {study.charts.map((c, i) => (
                <div
                  key={i}
                  className="bg-crema/30 border border-black/5 rounded-xl p-5"
                >
                  <Chart data={c} />
                </div>
              ))}
            </div>

            {/* Methodology */}
            <details className="bg-crema/40 rounded-xl px-5 py-3 group">
              <summary className="cursor-pointer text-[0.7rem] font-bold tracking-widest uppercase text-texto/55 list-none flex items-center justify-between">
                {e.methodLabel} · período {study.period}
                <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
              </summary>
              <p className="text-sm text-texto/65 leading-relaxed mt-3">{study.methodology}</p>
              {study.sources && study.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-black/5">
                  <p className="text-[0.62rem] font-bold tracking-widest uppercase text-texto/45 mb-2">
                    Fuentes
                  </p>
                  <ul className="space-y-1">
                    {study.sources.map((src, i) => (
                      <li key={i} className="text-xs text-texto/55">
                        {src.url ? (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-azul transition-colors inline-flex items-center gap-1"
                          >
                            {src.name}
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          src.name
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </details>

            {/* Authors */}
            <p className="text-xs text-texto/45 pt-2">
              {study.authors.map((a) => a).join(', ')}
            </p>
          </div>
        </motion.div>
      )}
    </motion.article>
  )
}

export default function EstudiosSection() {
  const e = site.estudios

  return (
    <section id="estudios" className="bg-crema py-20 md:py-28 lg:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,169,106,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">
            {e.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-4"
          >
            {e.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-texto/55 text-base md:text-lg leading-relaxed"
          >
            {e.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.03, 0.08)}
          className="space-y-4 md:space-y-5"
        >
          {estudios.map((s, i) => (
            <StudyCard key={s.slug} study={s} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
