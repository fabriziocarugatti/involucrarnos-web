'use client'

/**
 * Unit visualization: cada punto es un registro (una persona atendida).
 * Los 292 puntos se reagrupan y recolorean según el modo activo del scroll.
 * Humaniza la escala sin identificar a nadie (estándar ético: WaPo/UNHCR).
 */

import { useEffect, useMemo, useRef, useState } from 'react'

const N = 292
const COLS = 20

export type UnitMode = 'todos' | 'sexo' | 'vtsh' | 'finalidad' | 'vulnerabilidad'

interface Group {
  count: number
  color: string
  label: string
  sub?: string
}

// Paletas por fondo: los modos de perfil viven sobre crema; los de riesgo, sobre azul noche.
const TINTA = '#2a2f76'
const DORADO = '#C8A96A'
const ROJO_CLARO = '#c9584a' // legible sobre fondo oscuro
const CREMA = '#f7f4ef'
const APAGADO_DARK = 'rgba(247,244,239,0.22)'

const GROUPS: Record<UnitMode, Group[]> = {
  todos: [{ count: 292, color: TINTA, label: '292 registros', sub: 'personas atendidas en 2026' }],
  sexo: [
    { count: 286, color: TINTA, label: '286 mujeres', sub: '97,9 %' },
    { count: 5, color: DORADO, label: '5 hombres' },
    { count: 1, color: '#7a5f8f', label: '1 persona no binaria' },
  ],
  vtsh: [
    { count: 204, color: DORADO, label: '204 posibles víctimas o indicios', sub: '69,9 %' },
    { count: 31, color: ROJO_CLARO, label: '31 víctimas identificadas', sub: '10,6 %' },
    { count: 57, color: APAGADO_DARK, label: '57 sin indicios registrados' },
  ],
  finalidad: [
    { count: 243, color: ROJO_CLARO, label: '243 explotación sexual', sub: '83,2 %' },
    { count: 9, color: DORADO, label: '9 explotación laboral' },
    { count: 40, color: APAGADO_DARK, label: '40 otros fines o sin dato' },
  ],
  vulnerabilidad: [
    { count: 276, color: CREMA, label: '276 con al menos una vulnerabilidad', sub: '94,5 %' },
    { count: 16, color: APAGADO_DARK, label: '16 sin vulnerabilidad registrada' },
  ],
}

interface Target {
  x: number
  y: number
  color: string
}

/** Layout: grupos apilados verticalmente, cada uno en grilla de COLS columnas. */
function computeLayout(groups: Group[], cell: number) {
  const targets: Target[] = []
  const labels: { y: number; label: string; sub?: string; color: string }[] = []
  let yOffset = 0
  for (const g of groups) {
    labels.push({ y: yOffset, label: g.label, sub: g.sub, color: g.color })
    yOffset += cell * 1.35 // espacio para el label
    for (let i = 0; i < g.count; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      targets.push({ x: col * cell, y: yOffset + row * cell, color: g.color })
    }
    const rows = Math.ceil(g.count / COLS)
    yOffset += rows * cell + cell * 1.5
  }
  return { targets, labels, height: yOffset }
}

export default function UnitGrid({ mode, dark = false }: { mode: UnitMode; dark?: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(440)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cell = width / COLS
  const dot = Math.max(cell * 0.58, 5)

  const { targets, labels, height } = useMemo(
    () => computeLayout(GROUPS[mode], cell),
    [mode, cell],
  )

  // Altura máxima entre modos para que el contenedor no salte
  const maxHeight = useMemo(() => {
    let m = 0
    ;(Object.keys(GROUPS) as UnitMode[]).forEach((k) => {
      m = Math.max(m, computeLayout(GROUPS[k], cell).height)
    })
    return m
  }, [cell])

  return (
    <div ref={wrapRef} className="w-full">
      <div className="relative transition-all" style={{ height: Math.max(height, maxHeight * 0.72) }}>
        {labels.map((l, i) => (
          <div
            key={`${mode}-label-${i}`}
            className="absolute left-0 flex items-baseline gap-2 whitespace-nowrap font-body"
            style={{
              transform: `translateY(${l.y}px)`,
              transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span
              className="text-[13px] font-semibold"
              style={{ color: dark ? '#f7f4ef' : '#161a4c' }}
            >
              {l.label}
            </span>
            {l.sub && (
              <span className="text-[12px] tabular-nums" style={{ color: l.color }}>
                {l.sub}
              </span>
            )}
          </div>
        ))}
        {targets.map((t, i) => (
          <span
            key={i}
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: dot,
              height: dot,
              background: t.color,
              transform: `translate(${t.x}px, ${t.y}px)`,
              transition: `transform 0.85s cubic-bezier(0.16,1,0.3,1) ${(i % COLS) * 14}ms, background 0.6s ease ${(i % COLS) * 14}ms`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
