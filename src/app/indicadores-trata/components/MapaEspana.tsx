'use client'

/**
 * Mapa de España con burbujas semaforizadas por territorio.
 * Modos (según paso de scroll):
 *  0 — silueta sola
 *  1 — piloto 2024: 4 territorios
 *  2 — piloto 2026: 8 territorios (transición)
 *  3 — foco en concentración alta (Madrid + Lugo)
 * La visualización expresa registros de atención institucional, no prevalencia.
 */

import { territorios } from '@/data/indicadores-trata'
import { COORDS, MAPA_VIEWBOX, PATH_CANARIAS, PATH_PENINSULA } from '../mapa-es'
import { SEMAFORO_COLOR } from './ui'

const R_SCALE = 3.4

// Inset Canarias: se dibuja dentro del mismo SVG, transformado abajo a la izquierda.
const INSET_X = 18
const INSET_Y = 470
const INSET_W = 190
const INSET_H = 110

function radio(registros: number) {
  return Math.sqrt(registros) * R_SCALE
}

export default function MapaEspana({ paso }: { paso: number }) {
  const visibles = territorios.filter((t) => {
    if (paso === 0) return false
    if (paso === 1) return t.registros2024 !== undefined
    return true
  })

  return (
    <figure className="w-full select-none">
      <svg viewBox={MAPA_VIEWBOX} className="w-full" role="img"
        aria-label="Mapa de España con registros de atención por territorio">
        {/* Península + Baleares */}
        <path
          d={PATH_PENINSULA}
          fill="rgba(42,47,118,0.055)"
          stroke="rgba(42,47,118,0.30)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Inset Canarias */}
        <g transform={`translate(${INSET_X},${INSET_Y})`}>
          <rect
            x="-8" y="-14" width={INSET_W + 16} height={INSET_H + 22}
            fill="none" stroke="rgba(42,47,118,0.22)" strokeDasharray="3 4" rx="6"
          />
          <text x="0" y="-2" fontSize="10" fill="rgba(26,26,46,0.5)" fontFamily="var(--font-inter)">
            Islas Canarias
          </text>
          <path
            d={PATH_CANARIAS}
            fill="rgba(42,47,118,0.055)"
            stroke="rgba(42,47,118,0.30)"
            strokeWidth="0.8"
          />
        </g>

        {/* Burbujas */}
        {territorios.map((t) => {
          const c = COORDS[t.nombre]
          if (!c) return null
          const cx = c.zona === 'canarias' ? INSET_X + c.x : c.x
          const cy = c.zona === 'canarias' ? INSET_Y + c.y : c.y
          const activo = visibles.includes(t)
          const registros = paso === 1 ? (t.registros2024 ?? 0) : t.registros
          const r = activo ? radio(registros) : 0
          const foco = paso < 3 || t.semaforo === 'rojo'
          const color = SEMAFORO_COLOR[t.semaforo]
          const labelSize = t.registros >= 40 ? 14.5 : 12
          return (
            <g key={t.nombre} style={{ opacity: foco ? 1 : 0.22, transition: 'opacity 0.7s ease' }}>
              <circle
                cx={cx} cy={cy} r={r}
                fill={color} fillOpacity="0.78"
                stroke={color} strokeWidth="1.5"
                style={{ transition: 'r 0.9s cubic-bezier(0.16,1,0.3,1), fill 0.6s ease, stroke 0.6s ease' }}
              />
              <text
                x={cx}
                y={cy - r - 7}
                textAnchor="middle"
                fontSize={labelSize}
                fontWeight="600"
                fill="#161a4c"
                fontFamily="var(--font-inter)"
                style={{ opacity: activo ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}
              >
                {t.nombre}
              </text>
              <text
                x={cx}
                y={cy + 4.5}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill="#fff"
                fontFamily="var(--font-inter)"
                style={{ opacity: activo && r > 13 ? 1 : 0, transition: 'opacity 0.5s ease 0.45s' }}
              >
                {registros}
              </text>
            </g>
          )
        })}

        {/* Año activo */}
        <text
          x="740" y="46" textAnchor="end"
          fontSize="34" fontWeight="600"
          fill={paso === 1 ? 'rgba(26,26,46,0.35)' : '#C8A96A'}
          fontFamily="var(--font-lora)"
          style={{ opacity: paso === 0 ? 0 : 1, transition: 'opacity 0.6s ease, fill 0.6s ease' }}
        >
          {paso === 1 ? '2024' : '2026'}
        </text>
      </svg>

      <figcaption className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1 px-1 font-body text-[11px] text-gris">
        {(['rojo', 'amarillo', 'verde'] as const).map((n) => (
          <span key={n} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SEMAFORO_COLOR[n] }} />
            {n === 'rojo' ? 'Alta concentración' : n === 'amarillo' ? 'Media' : 'Menor'}
          </span>
        ))}
        <span className="ml-auto">Registros institucionales; no prevalencia real.</span>
      </figcaption>
    </figure>
  )
}
