'use client'

/**
 * Primitivos de scrollytelling (patrón Scrollama: IntersectionObserver, sin scroll listeners).
 * ScrollySection: layout sticky-graphic — el gráfico queda fijo mientras los pasos de texto
 * scrollean; cada paso que cruza el centro del viewport activa un estado del gráfico.
 *
 * Mobile: el gráfico se pega arriba (sticky top) y los pasos scrollean por encima en cards.
 * Desktop: dos columnas; el gráfico sticky centrado verticalmente.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

// ---------------------------------------------------------------------------
// useInView — visibilidad simple (para counters, reveals)
// ---------------------------------------------------------------------------

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.35 },
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { ref, inView }
}

// ---------------------------------------------------------------------------
// Reveal — entrada suave al entrar en viewport
// ---------------------------------------------------------------------------

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px)',
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Scrolly context — sección sticky con pasos
// ---------------------------------------------------------------------------

const ScrollyCtx = createContext<{
  active: number
  register: (idx: number, el: HTMLElement) => () => void
}>({ active: 0, register: () => () => {} })

/**
 * ScrollySection: `graphic` queda sticky; `children` (una lista de <Step index={i}>)
 * scrollea. El paso más cercano al centro del viewport define el estado activo.
 */
export function ScrollySection({
  graphic,
  children,
  dark = false,
  graphicSide = 'right',
}: {
  graphic: (active: number) => ReactNode
  children: ReactNode
  dark?: boolean
  graphicSide?: 'left' | 'right'
}) {
  const [active, setActive] = useState(0)
  const stepsRef = useRef(new Map<HTMLElement, number>())
  const obsRef = useRef<IntersectionObserver | null>(null)

  const register = useCallback((idx: number, el: HTMLElement) => {
    stepsRef.current.set(el, idx)
    obsRef.current?.observe(el)
    return () => {
      stepsRef.current.delete(el)
      obsRef.current?.unobserve(el)
    }
  }, [])

  useEffect(() => {
    // Franja central del viewport: un paso se activa cuando la cruza.
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepsRef.current.get(entry.target as HTMLElement)
            if (idx !== undefined) setActive(idx)
          }
        }
      },
      { rootMargin: '-42% 0px -42% 0px' },
    )
    obsRef.current = obs
    stepsRef.current.forEach((_, el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const ctx = useMemo(() => ({ active, register }), [active, register])

  return (
    <ScrollyCtx.Provider value={ctx}>
      <section data-dark={dark || undefined}>
        <div className="relative mx-auto max-w-6xl px-5 md:grid md:grid-cols-2 md:gap-x-12 md:px-8">
          {/* Gráfico: hijo directo → sticky funciona en mobile (block) y desktop (grid col alta) */}
          <div
            className={`sticky top-0 z-0 md:h-screen ${
              graphicSide === 'right' ? 'md:order-2' : ''
            }`}
          >
            <div
              className={`flex min-h-[46svh] items-center py-4 md:min-h-0 md:h-full md:py-0 ${
                dark ? 'bg-azul-deep' : 'bg-crema'
              } md:bg-transparent`}
            >
              <div className="w-full">{graphic(active)}</div>
            </div>
          </div>
          <div className={`relative z-10 ${graphicSide === 'right' ? 'md:order-1' : ''}`}>
            {children}
          </div>
        </div>
      </section>
    </ScrollyCtx.Provider>
  )
}

/** Un paso de texto dentro de una ScrollySection. */
export function Step({
  index,
  children,
  last = false,
}: {
  index: number
  children: ReactNode
  last?: boolean
}) {
  const { register, active } = useContext(ScrollyCtx)
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    return register(index, ref.current)
  }, [index, register])
  const isActive = active === index
  return (
    <div
      ref={ref}
      className={`flex items-center py-[30vh] first:pt-[16vh] md:py-[34vh] md:first:pt-[26vh] ${
        last ? 'pb-[26vh] md:pb-[30vh]' : ''
      }`}
    >
      <div
        className="step-card w-full transition-opacity duration-500"
        style={{ opacity: isActive ? 1 : 0.35 }}
      >
        {children}
      </div>
    </div>
  )
}
