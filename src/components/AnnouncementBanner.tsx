'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, ArrowUpRight, X } from 'lucide-react'
import { articulos } from '@/data/articulos'

export default function AnnouncementBanner() {
  const [open, setOpen] = useState(true)
  const curso = articulos.find((a) => a.tipo === 'curso' && a.enrollUrl)
  if (!curso || !open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[60] bg-azul-deep border-b border-dorado/20"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 50% 50%, rgba(200,169,106,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-5 md:px-6 py-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 md:gap-3 text-white text-xs md:text-sm flex-1 min-w-0">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-dorado/15 flex-shrink-0">
              <GraduationCap size={15} className="text-dorado" strokeWidth={2.2} />
            </span>
            <span className="hidden sm:inline text-[0.7rem] md:text-xs font-bold tracking-widest uppercase text-dorado">
              Curso gratis
            </span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span className="truncate text-white/90 font-medium">{curso.title}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <motion.a
              href={curso.enrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 1 }}
              transition={{ type: 'spring', stiffness: 360, damping: 20 }}
              className="inline-flex items-center gap-1.5 bg-dorado text-azul-dark
                         text-xs font-bold px-3 md:px-4 py-1.5 rounded-lg
                         hover:bg-dorado-soft transition-colors"
            >
              <span className="hidden sm:inline">Inscribirme</span>
              <span className="sm:hidden">Anotarme</span>
              <ArrowUpRight size={13} strokeWidth={2.4} />
            </motion.a>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar anuncio"
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
