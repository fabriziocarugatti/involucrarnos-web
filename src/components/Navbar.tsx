'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/site'

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
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-azul-dark/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.18)]' : 'bg-azul-dark'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-6 flex items-center justify-between h-16">
          <Link href="/" onClick={close} aria-label={`${site.name} — inicio`} className="flex items-center">
            <Image
              src="/assets/logo-involucrarnos.png"
              alt={site.name}
              width={140}
              height={35}
              className="h-7 md:h-8 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/70 hover:text-white text-sm font-medium px-4 py-2 rounded-lg
                           transition-colors hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
            <Link
              href={cta.href}
              className="ml-2 bg-dorado text-azul-dark font-bold text-sm px-5 py-2 rounded-lg
                         hover:bg-dorado-soft transition-colors"
            >
              {cta.label}
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-azul-dark flex flex-col justify-center items-center gap-7
                    transition-all duration-400 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={close}
            className="text-white text-3xl font-title font-800 hover:text-dorado transition-colors"
          >
            {label}
          </Link>
        ))}
        <Link
          href={cta.href}
          onClick={close}
          className="mt-4 bg-dorado text-azul-dark font-bold text-lg px-10 py-4 rounded-xl hover:bg-dorado-soft transition-colors"
        >
          {cta.label}
        </Link>
      </div>
    </>
  )
}
