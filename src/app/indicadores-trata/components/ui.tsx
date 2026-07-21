'use client'

/** Piezas de UI del informe: counters, kickers, semáforos, notas de fuente, barras. */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView } from './scrolly'
import type { Semaforo } from '@/data/indicadores-trata'

export const SEMAFORO_COLOR: Record<Semaforo, string> = {
  rojo: '#b23c2e',
  amarillo: '#d9a441',
  verde: '#3f7a55',
}

export const SEMAFORO_LABEL: Record<Semaforo, string> = {
  rojo: 'Alta concentración',
  amarillo: 'Concentración media',
  verde: 'Concentración menor',
}

// ---------------------------------------------------------------------------
// Counter — número que cuenta al entrar en viewport
// ---------------------------------------------------------------------------

export function Counter({
  value,
  decimals = 0,
  suffix = '',
  duration = 1400,
  className = '',
}: {
  value: number
  decimals?: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 })
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4) // ease-out-quart
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const formatted = display.toLocaleString('es-ES', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatted}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Kicker + numeración de capítulo
// ---------------------------------------------------------------------------

export function ChapterHead({
  num,
  kicker,
  title,
  dark = false,
  children,
}: {
  num: string
  kicker: string
  title: ReactNode
  dark?: boolean
  children?: ReactNode
}) {
  return (
    <header className="mx-auto max-w-3xl px-5 pt-24 md:px-8 md:pt-36">
      <p
        className={`font-body text-[11px] font-semibold uppercase tracking-[0.28em] ${
          dark ? 'text-dorado' : 'text-dorado-deep'
        }`}
      >
        <span className="mr-3 font-article text-base italic tracking-normal">{num}</span>
        {kicker}
      </p>
      <h2
        className={`mt-5 font-article text-[clamp(1.9rem,1.2rem+2.6vw,3.4rem)] font-semibold leading-[1.12] ${
          dark ? 'text-crema' : 'text-azul-deep'
        }`}
      >
        {title}
      </h2>
      {children && (
        <div
          className={`mt-6 max-w-2xl font-body text-[15px] leading-relaxed md:text-base ${
            dark ? 'text-crema/70' : 'text-texto/75'
          }`}
        >
          {children}
        </div>
      )}
    </header>
  )
}

// ---------------------------------------------------------------------------
// Fuente / nota metodológica visible (regla ética: metodología junto al gráfico)
// ---------------------------------------------------------------------------

export function Fuente({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mt-4 font-body text-[11px] leading-snug ${
        dark ? 'text-crema/45' : 'text-gris'
      }`}
    >
      {children}
    </p>
  )
}

// ---------------------------------------------------------------------------
// SemaforoDot
// ---------------------------------------------------------------------------

export function SemaforoDot({ nivel, size = 10 }: { nivel: Semaforo; size?: number }) {
  return (
    <span
      aria-label={SEMAFORO_LABEL[nivel]}
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: SEMAFORO_COLOR[nivel] }}
    />
  )
}

// ---------------------------------------------------------------------------
// BarRow — barra horizontal con fill animado al entrar en vista
// ---------------------------------------------------------------------------

export function BarRow({
  label,
  value,
  max,
  display,
  color = '#2a2f76',
  dark = false,
  delay = 0,
}: {
  label: string
  value: number
  max: number
  display?: string
  color?: string
  dark?: boolean
  delay?: number
}) {
  const { ref, inView } = useInView({ threshold: 0.4 })
  const pct = Math.max((value / max) * 100, 1.2)
  return (
    <div ref={ref} className="py-[7px]">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span
          className={`font-body text-[13px] font-medium ${dark ? 'text-crema/85' : 'text-texto'}`}
        >
          {label}
        </span>
        <span
          className={`font-body text-[12.5px] tabular-nums ${dark ? 'text-crema/60' : 'text-gris'}`}
        >
          {display ?? value.toLocaleString('es-ES')}
        </span>
      </div>
      <div
        className="h-[7px] overflow-hidden rounded-full"
        style={{ background: dark ? 'rgba(247,244,239,0.10)' : 'rgba(22,26,76,0.08)' }}
      >
        <div
          className="h-full origin-left rounded-full"
          style={{
            background: color,
            transform: `scaleX(${inView ? pct / 100 : 0})`,
            transition: `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// BigStat — cifra protagonista con contexto
// ---------------------------------------------------------------------------

export function BigStat({
  value,
  decimals = 0,
  suffix = '',
  label,
  dark = false,
  accent = false,
}: {
  value: number
  decimals?: number
  suffix?: string
  label: ReactNode
  dark?: boolean
  accent?: boolean
}) {
  return (
    <div>
      <div
        className={`font-article text-[clamp(2.6rem,1.6rem+3.5vw,4.6rem)] font-semibold leading-none tracking-tight ${
          accent ? 'text-dorado' : dark ? 'text-crema' : 'text-azul-deep'
        }`}
      >
        <Counter value={value} decimals={decimals} suffix={suffix} />
      </div>
      <div
        className={`mt-2 max-w-[26ch] font-body text-[13px] leading-snug ${
          dark ? 'text-crema/65' : 'text-texto/70'
        }`}
      >
        {label}
      </div>
    </div>
  )
}
