'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BarChart3, ArrowRight, Layers, Map } from 'lucide-react'
import { site } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'

const PLACEHOLDERS = [
  {
    icon: BarChart3,
    titulo: 'Indicadores del NOA',
    detalle: 'Series de datos comparados sobre gestión pública en las cuatro provincias.',
  },
  {
    icon: Layers,
    titulo: 'Casos comparados',
    detalle: 'Cómo otros gobiernos provinciales resuelven problemas similares.',
  },
  {
    icon: Map,
    titulo: 'Diagnósticos territoriales',
    detalle: 'Investigaciones aplicadas sobre municipios y políticas locales.',
  },
]

export default function EstudiosSection() {
  const e = site.estudios

  return (
    <section id="estudios" className="bg-crema py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* warm gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(200,169,106,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">
            <span className="inline-flex items-center gap-2">
              {e.eyebrow}
              <span className="text-[0.55rem] font-bold tracking-widest uppercase bg-dorado/15 text-dorado-deep rounded-full px-2 py-0.5">
                Próximamente
              </span>
            </span>
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
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.05, 0.1)}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12"
        >
          {PLACEHOLDERS.map(({ icon: Icon, titulo, detalle }) => (
            <motion.div
              key={titulo}
              variants={fadeUp}
              className="bg-white border border-dashed border-black/12 rounded-xl p-6 flex flex-col gap-3"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-azul/8">
                <Icon size={18} strokeWidth={1.8} className="text-azul" />
              </span>
              <p className="font-title font-800 text-azul-dark/85 text-base leading-snug">
                {titulo}
              </p>
              <p className="text-texto/55 text-sm leading-relaxed">
                {detalle}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-azul/10 rounded-2xl p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center gap-5 shadow-[0_4px_24px_rgba(42,47,118,0.05)]"
        >
          <div className="flex-1">
            <p className="text-texto/70 text-[0.95rem] leading-relaxed">
              {e.upcomingMsg}
            </p>
          </div>
          <Link
            href="/#sumate"
            className="inline-flex items-center gap-2 bg-azul text-white font-bold
                       px-6 py-3 rounded-xl hover:bg-azul-dark transition-colors text-sm whitespace-nowrap"
          >
            Avisarme
            <ArrowRight size={13} strokeWidth={2.2} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
