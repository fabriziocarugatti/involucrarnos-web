'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { site } from '@/data/site'
import Particles from './Particles'
import BeamsBackground from './BeamsBackground'
import RevealText from './RevealText'
import { fadeUp, stagger, ease } from '@/lib/motion'

export default function Hero() {
  const h = site.hero

  return (
    <section
      className="relative bg-azul-deep min-h-[100svh] flex items-center overflow-hidden grain"
      aria-labelledby="hero-heading"
    >
      {/* deep base gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 110% 70% at 50% 0%, rgba(42,47,118,0.85) 0%, rgba(22,26,76,0.95) 60%, rgba(15,17,55,1) 100%)',
        }}
      />

      {/* drifting azul mesh blobs */}
      <div className="blob-field">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* aceternity-style beams */}
      <BeamsBackground count={10} />

      {/* floating particles */}
      <Particles count={20} />

      {/* hairline bottom accent */}
      <div
        className="absolute bottom-0 left-0 w-full h-px z-[2]"
        style={{
          background:
            'linear-gradient(90deg, rgba(200,169,106,0.55) 0%, rgba(200,169,106,0) 70%)',
        }}
      />

      <motion.div
        className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6 py-14 md:py-20 w-full"
        variants={stagger(0.15, 0.12)}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-3xl">
          <motion.span variants={fadeUp} className="eyebrow mb-6 md:mb-7">
            {h.eyebrow}
          </motion.span>

          <h1
            id="hero-heading"
            className="font-title font-black text-white leading-[1.05] tracking-tight mb-6 md:mb-7 block"
            style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.1rem)' }}
          >
            <span className="block">
              <RevealText text={h.titleStart} delay={0.2} />
            </span>
            <span className="block text-dorado">
              <RevealText text={h.titleAccent} delay={0.55} wordClassName="text-dorado" />
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-white/75 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl"
          >
            {h.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10 md:mb-14">
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <Link
                href={h.ctaPrimary.href}
                className="group inline-flex items-center gap-2 bg-dorado text-azul-dark font-bold
                           px-6 md:px-7 py-3 md:py-3.5 rounded-xl
                           hover:bg-dorado-soft
                           shadow-[0_8px_28px_rgba(200,169,106,0.35)]
                           hover:shadow-[0_12px_36px_rgba(200,169,106,0.5)]
                           transition-shadow duration-300 text-sm md:text-base"
              >
                {h.ctaPrimary.label}
                <ArrowRight
                  size={16}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <Link
                href={h.ctaSecondary.href}
                className="inline-flex items-center gap-2 bg-transparent text-white/85 font-medium
                           px-6 md:px-7 py-3 md:py-3.5 rounded-xl border border-white/25
                           hover:border-white/55 hover:text-white hover:bg-white/5
                           transition-all duration-300 text-sm md:text-base"
              >
                {h.ctaSecondary.label}
              </Link>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="flex flex-wrap gap-2 text-xs text-white/50"
          >
            {h.pills.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">·</span>}
                <span>{p}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      {/* scroll cue with bounce */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: ease.outExpo }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-1.5 text-white/40"
        aria-hidden
      >
        <span className="text-[0.6rem] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} strokeWidth={1.8} />
        </motion.div>
      </motion.div>
    </section>
  )
}
