'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Sparkles } from 'lucide-react'
import { articulos } from '@/data/articulos'
import { site } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'
import InscripcionForm from './InscripcionForm'

export default function CursosSection() {
  const c = site.cursos
  const cursos = articulos.filter((a) => a.tipo === 'curso')
  const featured = cursos.find((c) => c.enrollUrl) || cursos[0]
  const otros = cursos.filter((c) => c !== featured)

  return (
    <section id="cursos" className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* subtle dorado glow at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-dorado/40"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,169,106,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        {/* heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
          variants={stagger(0.05, 0.1)}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">{c.eyebrow}</motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-4"
          >
            {c.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-texto/55 text-base md:text-lg leading-relaxed"
          >
            {c.subtitle}
          </motion.p>
        </motion.div>

        {/* featured curso — dark card que "flota" */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 md:mb-12"
          >
            <div
              className="group relative grid md:grid-cols-12 gap-6 md:gap-8 items-start
                         bg-gradient-to-br from-azul-deep via-azul-dark to-azul
                         border border-dorado/25
                         rounded-2xl p-6 md:p-8 lg:p-10
                         shadow-[0_20px_60px_rgba(30,34,96,0.22),0_4px_16px_rgba(30,34,96,0.10)]
                         overflow-hidden grain"
            >
              {/* glow corner */}
              <div
                className="absolute inset-0 pointer-events-none opacity-70"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 100% at 100% 0%, rgba(200,169,106,0.20) 0%, transparent 60%)',
                }}
              />

              <div className="relative md:col-span-8">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado bg-dorado/15 rounded-full px-3 py-1.5">
                    <GraduationCap size={12} strokeWidth={2.4} />
                    {featured.category}
                  </span>
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase text-dorado/70">
                    · {featured.date}
                  </span>
                </div>
                <h3 className="font-title font-black text-white text-2xl md:text-3xl lg:text-[2rem] leading-[1.12] tracking-tight mb-3">
                  {featured.title}
                </h3>
                <p className="text-white/65 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                  {featured.bajada}
                </p>

                <InscripcionForm cursoNombre={featured.title} cursoSlug={featured.slug} />
              </div>

              {/* visual side — sparkle motif */}
              <div className="relative md:col-span-4 hidden md:flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="relative w-40 h-40 lg:w-48 lg:h-48"
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgba(200,169,106,0.5) 0%, transparent 30%, rgba(200,169,106,0.3) 60%, transparent 90%)',
                      filter: 'blur(20px)',
                    }}
                  />
                </motion.div>
                <Sparkles
                  size={56}
                  strokeWidth={1.4}
                  className="absolute text-dorado opacity-80"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* otros próximos cursos / placeholder */}
        {otros.length > 0 ? (
          <div>
            <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/35 mb-4">
              {c.proxLabel}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otros.map((curso) => (
                <div
                  key={curso.slug}
                  className="bg-crema border border-black/8 rounded-xl p-5"
                >
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado-deep/70 block mb-2">
                    {curso.category}
                  </span>
                  <p className="font-title font-800 text-azul-dark/70 text-sm leading-snug mb-1">
                    {curso.title}
                  </p>
                  <p className="text-texto/40 text-xs">{curso.date}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border-t border-black/8 pt-8">
            <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/35 mb-3">
              Próximamente
            </p>
            <p className="text-texto/50 text-sm md:text-base max-w-md leading-relaxed">
              {c.emptyMsg}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
