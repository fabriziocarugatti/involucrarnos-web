'use client'

import { motion } from 'framer-motion'
import {
  Sparkles,
  Database,
  Compass,
  GraduationCap,
  Lightbulb,
  Network,
  ArrowRight,
  Check,
} from 'lucide-react'
import Link from 'next/link'
import { site } from '@/data/site'
import { proyectos, type Proyecto, type ProjectStatus } from '@/data/proyectos'
import { fadeUp, stagger } from '@/lib/motion'
import Particles from './Particles'

const ICON_MAP = {
  sparkles:   Sparkles,
  database:   Database,
  compass:    Compass,
  graduation: GraduationCap,
  lightbulb:  Lightbulb,
  network:    Network,
}

const STATUS_STYLES: Record<ProjectStatus, { dot: string; text: string; ring: string }> = {
  activo:        { dot: 'bg-emerald-400',     text: 'text-emerald-400',     ring: 'ring-emerald-400/30' },
  construccion:  { dot: 'bg-dorado',          text: 'text-dorado',           ring: 'ring-dorado/30' },
  planificacion: { dot: 'bg-indigo-400', text: 'text-indigo-300',  ring: 'ring-indigo-400/30' },
  proximamente:  { dot: 'bg-white/40',         text: 'text-white/60',         ring: 'ring-white/20' },
}

function ProjectCard({ p, index }: { p: Proyecto; index: number }) {
  const Icon = ICON_MAP[p.icon]
  const styles = STATUS_STYLES[p.status]
  const labels = site.proyectos.statusLabels
  const isActive = p.status === 'activo'

  const card = (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group relative flex flex-col h-full rounded-2xl p-6 md:p-7 overflow-hidden
                  border transition-all duration-300
                  ${isActive
                    ? 'bg-white/[0.07] border-dorado/40 hover:border-dorado/70'
                    : 'bg-white/[0.04] border-white/12 hover:border-white/25'
                  }`}
    >
      {/* glow for active */}
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(200,169,106,0.18) 0%, transparent 65%)',
          }}
        />
      )}

      <div className="relative flex items-start justify-between mb-5">
        <span
          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl
                      ${isActive ? 'bg-dorado/20 ring-1 ring-dorado/40' : 'bg-white/10'}`}
        >
          <Icon
            size={20}
            strokeWidth={1.8}
            className={isActive ? 'text-dorado' : 'text-white/85'}
          />
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${styles.dot} ${isActive ? 'animate-pulse' : ''}`}
          />
          <span className={`text-[0.62rem] font-bold tracking-widest uppercase ${styles.text}`}>
            {labels[p.status]}
          </span>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col">
        <span className="text-[0.62rem] font-bold tracking-widest uppercase text-dorado/80 mb-2">
          {p.category}
        </span>
        <h3 className="font-title font-800 text-white text-[1.15rem] md:text-xl leading-snug mb-3">
          {p.title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed mb-5 flex-1">
          {p.bajada}
        </p>

        {/* highlights */}
        <ul className="space-y-1.5 mb-5">
          {p.highlights.slice(0, 4).map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/55">
              <Check
                size={11}
                strokeWidth={2.6}
                className={`flex-shrink-0 mt-0.5 ${isActive ? 'text-dorado' : 'text-white/40'}`}
              />
              <span className="leading-snug">{h}</span>
            </li>
          ))}
        </ul>

        {/* metrics */}
        {p.metrics && p.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-white/8">
            {p.metrics.map((m, i) => (
              <div key={i}>
                <p className="font-title font-800 text-dorado text-base tabular-nums leading-none">
                  {m.value}
                </p>
                <p className="text-[0.65rem] text-white/45 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {p.cta && (
          <Link
            href={p.cta.href}
            {...(p.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={`inline-flex items-center gap-2 self-start text-sm font-bold mt-auto
                       ${isActive ? 'text-dorado hover:text-dorado-soft' : 'text-white/80 hover:text-white'}
                       transition-colors`}
          >
            {p.cta.label}
            <ArrowRight
              size={13}
              strokeWidth={2.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    </motion.article>
  )

  return card
}

export default function ProyectosSection() {
  const p = site.proyectos

  return (
    <section
      id="proyectos"
      className="relative bg-azul-deep py-20 md:py-28 lg:py-32 overflow-hidden grain"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(42,47,118,0.6) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 0% 80%, rgba(200,169,106,0.08) 0%, transparent 60%)',
        }}
      />
      <Particles count={14} />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">
            {p.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-title font-black text-white text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-4"
          >
            {p.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/65 text-base md:text-lg leading-relaxed"
          >
            {p.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.04, 0.08)}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {proyectos.map((proj, i) => (
            <ProjectCard key={proj.slug} p={proj} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
