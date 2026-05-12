'use client'

import { motion } from 'framer-motion'
import { Sparkles, Database, Compass, GraduationCap, Lightbulb, Network, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { proyectos, type Proyecto, type ProjectStatus } from '@/data/proyectos'
import { fadeUp, stagger } from '@/lib/motion'

const ICON_MAP = {
  sparkles:   Sparkles,
  database:   Database,
  compass:    Compass,
  graduation: GraduationCap,
  lightbulb:  Lightbulb,
  network:    Network,
}

const STATUS_STYLES: Record<ProjectStatus, { dot: string; text: string; label: string }> = {
  activo:        { dot: 'bg-emerald-400 animate-pulse', text: 'text-emerald-400', label: 'Activo' },
  construccion:  { dot: 'bg-dorado',                   text: 'text-dorado',       label: 'En construcción' },
  planificacion: { dot: 'bg-indigo-400',               text: 'text-indigo-300',   label: 'Planificación' },
  proximamente:  { dot: 'bg-white/40',                  text: 'text-white/60',     label: 'Próximamente' },
}

function MiniCard({ p }: { p: Proyecto }) {
  const Icon = ICON_MAP[p.icon]
  const s = STATUS_STYLES[p.status]
  const isActive = p.status === 'activo'

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group relative flex flex-col rounded-2xl p-6 overflow-hidden border transition-all duration-300
        ${isActive
          ? 'bg-white/[0.07] border-dorado/40 hover:border-dorado/70'
          : 'bg-white/[0.04] border-white/12 hover:border-white/25'
        }`}
    >
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(200,169,106,0.18) 0%, transparent 65%)' }}
        />
      )}
      <div className="relative flex items-start justify-between mb-4">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${isActive ? 'bg-dorado/20 ring-1 ring-dorado/40' : 'bg-white/10'}`}>
          <Icon size={18} strokeWidth={1.8} className={isActive ? 'text-dorado' : 'text-white/80'} />
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          <span className={`text-[0.6rem] font-bold tracking-widest uppercase ${s.text}`}>{s.label}</span>
        </div>
      </div>
      <div className="relative flex-1 flex flex-col">
        <span className="text-[0.6rem] font-bold tracking-widest uppercase text-dorado/80 mb-1.5">{p.category}</span>
        <h3 className="font-title font-800 text-white text-lg leading-snug mb-2">{p.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed flex-1">{p.bajada}</p>
      </div>
    </motion.article>
  )
}

const FEATURED = proyectos.slice(0, 3)

export default function ProyectosPreview() {
  return (
    <section className="relative bg-azul-deep py-12 md:py-16 overflow-hidden grain">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(42,47,118,0.6) 0%, transparent 60%)' }}
      />
      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <motion.span variants={fadeUp} className="eyebrow mb-4">
              Proyectos abiertos
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-title font-black text-white text-3xl md:text-4xl leading-[1.08] tracking-tight"
            >
              Lo que estamos construyendo
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-dorado hover:text-dorado-soft font-bold text-sm transition-colors"
            >
              Ver todos los proyectos
              <ExternalLink size={13} strokeWidth={2.4} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.04, 0.08)}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURED.map((p) => (
            <MiniCard key={p.slug} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
