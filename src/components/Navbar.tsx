'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site } from '@/data/site'
import { ease } from '@/lib/motion'
import SmartSearch from './SmartSearch'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)
  const { links, cta } = site.nav

  return (
    <>
      <nav
        className={`sticky top-0 inset-x-0 z-50 bg-white border-b will-change-[box-shadow,border-color]
                    [transition:box-shadow_300ms_ease,border-color_300ms_ease] ${
          scrolled
            ? 'shadow-[0_4px_24px_rgba(30,34,96,0.08)] border-black/8'
            : 'border-black/5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-20">
          <Link href="/" onClick={close} aria-label={`${site.name} — inicio`} className="flex items-center group">
            <Image
              src="/assets/logo-involucrarnos.png"
              alt={site.name}
              width={220}
              height={55}
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-texto/70 hover:text-azul-dark text-sm font-medium px-4 py-2 rounded-lg
                           transition-colors hover:bg-azul/5"
              >
                {label}
              </Link>
            ))}
            <span className="mx-2"><SmartSearch /></span>
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
            >
              <Link
                href={cta.href}
                className="ml-2 bg-dorado text-azul-dark font-bold text-sm px-5 py-2.5 rounded-lg
                           hover:bg-dorado-soft shadow-[0_4px_16px_rgba(200,169,106,0.3)] transition-colors block"
              >
                {cta.label}
              </Link>
            </motion.div>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <SmartSearch />
          </div>

          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-azul/5 transition-colors text-azul-dark"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-azul-deep/97 backdrop-blur-xl flex flex-col justify-center items-center gap-7"
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: ease.outExpo }}
              >
                <Link
                  href={href}
                  onClick={close}
                  className="text-white text-3xl font-title font-800 hover:text-dorado transition-colors"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: ease.outExpo }}
              className="mt-4"
            >
              <Link
                href={cta.href}
                onClick={close}
                className="bg-dorado text-azul-dark font-bold text-lg px-10 py-4 rounded-xl hover:bg-dorado-soft transition-colors block"
              >
                {cta.label}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
