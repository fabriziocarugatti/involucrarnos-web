'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'
import { articulos, type Article } from '@/data/articulos'
import { site, type TipoContenido } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'

const PAGE_SIZE = 6

function tipoLabel(tipo: TipoContenido) { return site.tipos[tipo].label }

function CardPublicado({ a }: { a: Article }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
      <Link
        href={`/articulos/${a.slug}`}
        className="group flex flex-col bg-crema rounded-2xl overflow-hidden
                   border border-black/5 hover:border-dorado/45
                   hover:shadow-[0_18px_50px_rgba(42,47,118,0.16)]
                   transition-shadow duration-300 h-full"
      >
        <div className="p-7 md:p-8 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado-deep bg-dorado/15 rounded-full px-3 py-1">
              {tipoLabel(a.tipo)}
            </span>
            <span className="text-xs text-texto/40">{a.date}</span>
          </div>
          <h3 className="font-title font-800 text-azul-dark text-xl md:text-[1.35rem] leading-snug mb-3 group-hover:text-azul transition-colors">
            {a.title}
          </h3>
          <p className="font-article text-texto/65 text-[0.95rem] leading-relaxed flex-1 line-clamp-3">{a.bajada}</p>
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-black/8">
            <Image src={a.authorPhoto || '/assets/exequiel.jpg'} alt={a.author} width={36} height={36}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-dorado/30 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[0.8rem] font-medium text-azul-dark/85 truncate leading-tight">{a.author}</p>
              <p className="text-[0.65rem] text-texto/40 truncate">{a.category}</p>
            </div>
            <span className="text-xs font-bold text-azul group-hover:text-dorado-deep transition-colors flex items-center gap-1 flex-shrink-0">
              Leer
              <ArrowRight size={13} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function CardProximo({ a }: { a: Article }) {
  if (a.tipo === 'curso' && a.enrollUrl) {
    return (
      <motion.a variants={fadeUp} href={a.enrollUrl} target="_blank" rel="noopener noreferrer"
        whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="group relative flex flex-col gap-3 bg-azul-deep rounded-xl p-5 md:p-6 overflow-hidden
                   border border-dorado/30 hover:border-dorado/60 hover:shadow-[0_14px_40px_rgba(224,114,34,0.25)]
                   transition-shadow duration-300"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(224,114,34,0.15) 0%, transparent 70%)' }} />
        <div className="relative flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado bg-dorado/15 rounded-full px-2.5 py-1">
            <GraduationCap size={12} strokeWidth={2.4} />{tipoLabel(a.tipo)}
          </span>
          <span className="text-[0.65rem] text-dorado/70 tracking-wide font-medium">{a.date}</span>
        </div>
        <p className="relative font-title font-800 text-white text-[1rem] leading-snug">{a.title}</p>
        <p className="relative text-white/55 text-xs leading-relaxed line-clamp-2">{a.bajada}</p>
        <div className="relative flex items-center gap-1.5 text-dorado text-xs font-bold mt-1">
          Inscribirme en LinkedIn
          <ArrowUpRight size={13} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </motion.a>
    )
  }
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-3 bg-white border border-dashed border-black/12 rounded-xl p-5 md:p-6">
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado-deep/70">{tipoLabel(a.tipo)}</span>
        <span className="text-[0.65rem] text-texto/35 tracking-wide">{a.date}</span>
      </div>
      <p className="font-title font-800 text-azul-dark/65 text-[0.95rem] leading-snug">{a.title}</p>
      <p className="text-texto/40 text-xs leading-relaxed line-clamp-2">{a.bajada}</p>
    </motion.div>
  )
}

function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mb-14 md:mb-16">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-azul/20
                   text-azul-dark hover:border-dorado/50 hover:bg-dorado/5 disabled:opacity-30
                   disabled:pointer-events-none transition-colors"
      >
        <ChevronLeft size={16} strokeWidth={2.2} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`inline-flex items-center justify-center w-9 h-9 rounded-xl border text-sm font-bold transition-colors
            ${p === page
              ? 'bg-azul border-azul text-white'
              : 'border-azul/20 text-azul-dark hover:border-dorado/50 hover:bg-dorado/5'}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-azul/20
                   text-azul-dark hover:border-dorado/50 hover:bg-dorado/5 disabled:opacity-30
                   disabled:pointer-events-none transition-colors"
      >
        <ChevronRight size={16} strokeWidth={2.2} />
      </button>
    </div>
  )
}

export default function ContenidosSection() {
  const c = site.contenidos
  const soloArticulos = articulos.filter((a) => a.tipo === 'articulo')
  const publicados = soloArticulos.filter((a) => a.published)
  const proximos = soloArticulos.filter((a) => !a.published)

  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(publicados.length / PAGE_SIZE)
  const visiblePublicados = publicados.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section id="contenidos" className="bg-white py-16 md:py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-dorado/40" />

      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
          variants={stagger(0.05, 0.1)} className="mb-14 md:mb-20 max-w-2xl"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">{c.eyebrow}</motion.span>
          <motion.h2 variants={fadeUp}
            className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-4">
            {c.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-texto/55 text-base md:text-lg leading-relaxed">{c.subtitle}</motion.p>
        </motion.div>

        {publicados.length > 0 && (
          <>
            <motion.div
              key={page}
              initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
              variants={stagger(0.05, 0.12)}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-6 pt-1"
            >
              {visiblePublicados.map((a) => <CardPublicado key={a.slug} a={a} />)}
            </motion.div>

            <Pagination page={page} totalPages={totalPages} onChange={(p) => { setPage(p); document.getElementById('contenidos')?.scrollIntoView({ behavior: 'smooth' }) }} />
          </>
        )}

        {proximos.length > 0 && (
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            variants={stagger(0.05, 0.08)}>
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/35">{c.upcomingLabel}</span>
              <span className="flex-1 h-px bg-black/8" />
              <span className="text-xs text-texto/30">{proximos.length}</span>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {proximos.map((a) => <CardProximo key={a.slug} a={a} />)}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
