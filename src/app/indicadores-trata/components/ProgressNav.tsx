'use client'

/**
 * Navegación del informe: barra de progreso de lectura + rail de capítulos.
 * Desktop: rail lateral derecho con puntos → salto por capítulo.
 * Mobile: píldora inferior con capítulo actual y progreso.
 */

import { useEffect, useState } from 'react'

export interface Capitulo {
  id: string
  num: string
  titulo: string
}

export default function ProgressNav({ capitulos }: { capitulos: Capitulo[] }) {
  const [progress, setProgress] = useState(0)
  const [activo, setActivo] = useState('')

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const h = document.documentElement
        const total = h.scrollHeight - h.clientHeight
        setProgress(total > 0 ? h.scrollTop / total : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActivo(e.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    capitulos.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [capitulos])

  const activoIdx = Math.max(capitulos.findIndex((c) => c.id === activo), 0)
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      {/* Barra de progreso superior */}
      <div className="fixed inset-x-0 top-0 z-50 h-[3px] bg-azul-deep/10">
        <div
          className="h-full origin-left bg-dorado"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      {/* Rail de capítulos — desktop */}
      <nav
        aria-label="Capítulos del informe"
        className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
      >
        {capitulos.map((c, i) => {
          const isActive = c.id === activo
          return (
            <button
              key={c.id}
              onClick={() => jump(c.id)}
              className="group flex items-center gap-3 py-[5px]"
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 font-body text-[11px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'translate-x-0 bg-azul-deep text-crema opacity-100'
                    : 'translate-x-2 bg-azul-deep/85 text-crema opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                }`}
              >
                {c.num} · {c.titulo}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive ? 'h-6 w-[7px] bg-dorado' : 'h-[7px] w-[7px] bg-azul-deep/30 group-hover:bg-dorado/70'
                }`}
              />
            </button>
          )
        })}
      </nav>

      {/* Píldora mobile */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:hidden">
        <div className="flex items-center gap-2.5 rounded-full bg-azul-deep px-4 py-2 shadow-lg">
          <span className="font-article text-[13px] italic text-dorado">
            {capitulos[activoIdx]?.num}
          </span>
          <span className="max-w-[46vw] truncate font-body text-[12px] font-medium text-crema">
            {capitulos[activoIdx]?.titulo}
          </span>
          <span className="font-body text-[10.5px] tabular-nums text-crema/50">
            {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </>
  )
}
