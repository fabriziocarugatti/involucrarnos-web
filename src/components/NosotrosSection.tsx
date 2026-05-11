'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { site } from '@/data/site'
import Particles from './Particles'
import BeamsBackground from './BeamsBackground'
import { fadeUp, stagger } from '@/lib/motion'

export default function NosotrosSection() {
  const n = site.nosotros

  return (
    <section
      id="nosotros"
      className="relative bg-azul-deep py-20 md:py-28 lg:py-32 overflow-hidden grain"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(42,47,118,0.55) 0%, transparent 60%)',
        }}
      />

      <div className="blob-field">
        <div
          className="blob"
          style={{
            width: '600px',
            height: '600px',
            background: 'rgba(42,47,118,0.5)',
            top: '-15%',
            left: '-10%',
            animationDuration: '34s',
            animationName: 'drift3',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
        <div
          className="blob"
          style={{
            width: '450px',
            height: '450px',
            background: 'rgba(22,26,76,0.55)',
            bottom: '-20%',
            right: '5%',
            animationDuration: '30s',
            animationName: 'drift2',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      </div>

      <BeamsBackground count={6} />
      <Particles count={12} />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)}
          className="max-w-2xl mb-14 md:mb-16"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">{n.eyebrow}</motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-title font-black text-white text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight"
          >
            {n.titleStart}{' '}
            <em className="not-italic text-dorado">{n.titleAccent}</em>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger(0.08, 0.08)}
            className="lg:col-span-7 space-y-5"
          >
            {n.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-white/75 text-base md:text-lg leading-relaxed"
              >
                {p}
              </motion.p>
            ))}

            <motion.ul
              variants={fadeUp}
              className="mt-8 md:mt-10 grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/8"
            >
              {n.valores.map((v) => (
                <li key={v.titulo} className="flex flex-col gap-1.5">
                  <span className="text-dorado text-xs font-bold tracking-widest uppercase">
                    {v.titulo}
                  </span>
                  <span className="text-white/50 text-[0.82rem] leading-snug">
                    {v.detalle}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/[0.05] border border-white/12 rounded-2xl p-6 md:p-7 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src="/assets/logo-exequiel.png"
                  alt={n.founderName}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-dorado/40"
                />
                <div>
                  <p className="font-title font-800 text-white text-base md:text-lg leading-snug">
                    {n.founderName}
                  </p>
                  <p className="text-dorado text-xs font-medium leading-snug mt-0.5">
                    {n.founderRole}
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {n.founderBio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {n.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-medium text-dorado/85 bg-dorado/10 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
