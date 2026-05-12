'use client'

import { motion } from 'framer-motion'
import {
  Unlock,
  Microscope,
  Mountain,
  Wrench,
  Scale,
  Users,
} from 'lucide-react'
import { site } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'

const ICON_MAP = {
  open:      Unlock,
  rigor:     Microscope,
  noa:       Mountain,
  tools:     Wrench,
  neutral:   Scale,
  practical: Users,
} as const

export default function HubSection() {
  const h = site.hub

  return (
    <section className="relative bg-white py-20 md:py-24 lg:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-dorado/40" />

      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger(0.05, 0.1)}
          className="max-w-2xl mb-12 md:mb-14"
        >
          <motion.span variants={fadeUp} className="eyebrow mb-5">
            {h.eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08] tracking-tight"
          >
            {h.title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger(0.05, 0.08)}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {h.items.map((item, i) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? Wrench
            return (
              <motion.div
                key={item.titulo}
                variants={fadeUp}
                className="group relative p-6 md:p-7 rounded-2xl bg-crema/40 hover:bg-crema/70
                           border border-black/5 hover:border-dorado/30
                           transition-all duration-300"
              >
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-azul/8 group-hover:bg-dorado/15 mb-4 transition-colors">
                  <Icon size={20} strokeWidth={1.8} className="text-azul group-hover:text-dorado-deep transition-colors" />
                </span>
                <h3 className="font-title font-800 text-azul-dark text-base md:text-[1.05rem] leading-snug mb-2">
                  {item.titulo}
                </h3>
                <p className="text-texto/60 text-sm leading-relaxed">{item.detalle}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
