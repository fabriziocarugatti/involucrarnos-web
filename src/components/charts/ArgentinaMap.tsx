'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { MapArgentinaData, ProvinciaArgentina } from '@/data/estudios'

interface Props {
  data: MapArgentinaData
  className?: string
}

// Schematic (not cartographic) — simplified polygons for visual readability
const PROVINCES: Record<ProvinciaArgentina, { d: string; label: string; cx: number; cy: number }> = {
  jujuy:           { d: 'M68,14 L130,14 L130,55 L68,55 Z',                                                                            label: 'Jujuy',            cx: 99,  cy: 35  },
  salta:           { d: 'M130,14 L168,14 L170,100 L68,103 L68,55 L130,55 Z',                                                           label: 'Salta',            cx: 116, cy: 72  },
  formosa:         { d: 'M168,14 L270,12 L268,85 L198,88 L170,60 L168,14 Z',                                                           label: 'Formosa',          cx: 220, cy: 50  },
  chaco:           { d: 'M170,100 L198,88 L268,85 L265,158 L188,160 L170,130 Z',                                                       label: 'Chaco',            cx: 220, cy: 122 },
  misiones:        { d: 'M248,128 L272,88 L292,165 L262,180 L244,158 Z',                                                               label: 'Misiones',         cx: 268, cy: 140 },
  tucuman:         { d: 'M130,100 L168,100 L170,158 L150,172 L128,155 Z',                                                              label: 'Tucumán',          cx: 148, cy: 132 },
  catamarca:       { d: 'M58,103 L130,103 L132,172 L152,200 L125,222 L65,225 L52,165 Z',                                               label: 'Catamarca',        cx: 95,  cy: 163 },
  santiago:        { d: 'M168,100 L265,95 L268,182 L240,218 L188,220 L152,200 L152,172 L170,158 Z',                                    label: 'Sgo. del Estero',  cx: 212, cy: 162 },
  corrientes:      { d: 'M265,85 L292,88 L305,170 L298,232 L252,238 L242,186 L262,160 L265,85 Z',                                      label: 'Corrientes',       cx: 278, cy: 162 },
  entre_rios:      { d: 'M252,238 L298,230 L308,292 L272,308 L242,280 L248,252 Z',                                                     label: 'Entre Ríos',       cx: 276, cy: 270 },
  santa_fe:        { d: 'M188,160 L242,158 L248,252 L272,308 L240,312 L192,292 L182,238 L188,160 Z',                                   label: 'Santa Fe',         cx: 218, cy: 232 },
  cordoba:         { d: 'M125,222 L188,220 L192,292 L238,312 L215,358 L148,362 L128,338 L125,282 Z',                                   label: 'Córdoba',          cx: 175, cy: 292 },
  la_rioja:        { d: 'M58,225 L125,222 L128,282 L115,312 L72,315 L52,268 Z',                                                        label: 'La Rioja',         cx: 88,  cy: 270 },
  san_juan:        { d: 'M48,300 L115,298 L128,338 L95,345 L62,335 L45,312 Z',                                                         label: 'San Juan',         cx: 85,  cy: 322 },
  mendoza:         { d: 'M45,340 L95,345 L105,435 L75,448 L40,438 Z',                                                                  label: 'Mendoza',          cx: 72,  cy: 395 },
  san_luis:        { d: 'M128,338 L192,332 L195,402 L160,408 L128,390 Z',                                                              label: 'San Luis',         cx: 160, cy: 372 },
  buenos_aires:    { d: 'M238,268 L348,292 L365,348 L355,458 L308,458 L272,435 L252,395 L215,358 L238,312 Z',                          label: 'Bs. Aires',        cx: 298, cy: 378 },
  caba:            { d: 'M342,285 L352,285 L354,294 L344,295 Z',                                                                       label: 'CABA',             cx: 348, cy: 292 },
  la_pampa:        { d: 'M128,390 L160,408 L195,402 L238,395 L240,458 L108,462 Z',                                                     label: 'La Pampa',         cx: 180, cy: 432 },
  neuquen:         { d: 'M40,438 L75,448 L108,438 L240,432 L238,495 L88,505 L38,498 Z',                                               label: 'Neuquén',          cx: 138, cy: 468 },
  rio_negro:       { d: 'M38,498 L88,505 L238,495 L308,462 L308,535 L38,548 Z',                                                        label: 'Río Negro',        cx: 172, cy: 520 },
  chubut:          { d: 'M38,548 L308,535 L302,628 L38,635 Z',                                                                         label: 'Chubut',           cx: 172, cy: 588 },
  santa_cruz:      { d: 'M55,635 L302,628 L298,715 L148,722 L88,718 L55,695 Z',                                                        label: 'Santa Cruz',       cx: 178, cy: 675 },
  tierra_del_fuego:{ d: 'M118,718 L258,718 L255,745 L120,745 Z',                                                                       label: 'Tierra del Fuego', cx: 188, cy: 732 },
}

function colorScale(value: number, min: number, max: number): string {
  const t = max === min ? 0.5 : (value - min) / (max - min)
  // low: light cream → high: deep azul-dorado
  const r = Math.round(240 - t * 60)
  const g = Math.round(235 - t * 100)
  const b = Math.round(220 - t * 110)
  return `rgb(${r},${g},${b})`
}

export default function ArgentinaMap({ data, className = '' }: Props) {
  const [selected, setSelected] = useState<ProvinciaArgentina | null>(null)

  const valueMap = Object.fromEntries(data.values.map((v) => [v.provincia, v]))
  const allValues = data.values.map((v) => v.value)
  const vMin = Math.min(...allValues)
  const vMax = Math.max(...allValues)

  const selectedData = selected ? valueMap[selected] : null
  const selectedProv = selected ? PROVINCES[selected] : null

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Map SVG */}
        <div className="relative flex-shrink-0 w-full lg:w-[320px]">
          <svg
            viewBox="0 0 340 760"
            className="w-full h-auto max-w-[320px] mx-auto"
            role="img"
            aria-label="Mapa de Argentina por provincia"
          >
            {Object.entries(PROVINCES).map(([id, prov]) => {
              const pid = id as ProvinciaArgentina
              const entry = valueMap[pid]
              const fill = entry
                ? colorScale(entry.value, vMin, vMax)
                : '#e8ecf0'
              const isSelected = selected === pid
              const isMax = entry?.value === vMax

              return (
                <motion.g
                  key={id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Object.keys(PROVINCES).indexOf(id) * 0.02, duration: 0.4 }}
                  onClick={() => setSelected(isSelected ? null : pid)}
                  style={{ cursor: entry ? 'pointer' : 'default' }}
                >
                  <path
                    d={prov.d}
                    fill={isSelected ? '#1e2260' : fill}
                    stroke={isSelected ? '#c8a96a' : isMax ? '#a88845' : '#94a3b8'}
                    strokeWidth={isSelected ? 2 : isMax ? 1.5 : 0.8}
                    style={{ transition: 'fill 200ms, stroke 200ms' }}
                  />
                  {/* label only if province has data and is big enough */}
                  {entry && prov.label !== 'CABA' && (
                    <>
                      <text
                        x={prov.cx}
                        y={prov.cy - 5}
                        textAnchor="middle"
                        fontSize={id === 'tierra_del_fuego' || id === 'misiones' ? 7 : 8}
                        fontWeight="600"
                        fill={isSelected ? '#f0e8d4' : '#334155'}
                        fontFamily="ui-sans-serif, system-ui"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {prov.label.length > 12 ? prov.label.split(' ').slice(-1)[0] : prov.label}
                      </text>
                      <text
                        x={prov.cx}
                        y={prov.cy + 9}
                        textAnchor="middle"
                        fontSize={9}
                        fontWeight="800"
                        fill={isSelected ? '#c8a96a' : '#1e2260'}
                        fontFamily="ui-sans-serif, system-ui"
                        style={{ pointerEvents: 'none', userSelect: 'none' }}
                      >
                        {entry.label ?? `${entry.value}${data.unit?.startsWith('%') ? '%' : ''}`}
                      </text>
                    </>
                  )}
                </motion.g>
              )
            })}
          </svg>

          {/* CABA label (too small for inline) */}
          {valueMap['caba'] && (
            <div className="absolute" style={{ top: '37%', right: '4%' }}>
              <div className="text-[9px] font-bold text-azul-dark leading-tight bg-white/80 border border-black/10 rounded px-1 py-0.5">
                CABA: {valueMap['caba'].label ?? valueMap['caba'].value}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: detail panel + ranking */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Selected province detail */}
          <AnimatePresence mode="wait">
            {selected && selectedData && selectedProv ? (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="bg-azul-deep rounded-xl p-5 border border-dorado/20"
              >
                <p className="text-[0.62rem] font-bold tracking-widest uppercase text-dorado mb-1">
                  Provincia seleccionada
                </p>
                <p className="font-title font-black text-white text-xl mb-3">
                  {selectedProv.label}
                </p>
                <p className="text-dorado text-3xl font-black font-title leading-none mb-1">
                  {selectedData.label ?? `${selectedData.value}${data.unit?.startsWith('%') ? '%' : ''}`}
                </p>
                {data.unit && !data.unit.startsWith('%') && (
                  <p className="text-white/50 text-xs mt-1">{data.unit}</p>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="mt-4 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  ← Ver todas
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-azul/5 border border-azul/10 rounded-xl p-4"
              >
                <p className="text-sm text-texto/60 leading-relaxed">
                  Hacé clic en una provincia para ver el dato de ese territorio.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ranking list */}
          <div className="space-y-1">
            <p className="text-[0.62rem] font-bold tracking-widest uppercase text-texto/40 mb-2">
              Ranking completo
            </p>
            {[...data.values]
              .sort((a, b) => b.value - a.value)
              .map((v, i) => {
                const prov = PROVINCES[v.provincia]
                const isTop = i === 0
                const isSel = selected === v.provincia
                return (
                  <button
                    key={v.provincia}
                    onClick={() => setSelected(isSel ? null : v.provincia)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                                transition-colors text-sm
                                ${isSel
                                  ? 'bg-azul-deep text-white'
                                  : 'hover:bg-azul/5 text-texto/80'
                                }`}
                  >
                    <span className={`text-[0.65rem] font-bold w-5 text-right flex-shrink-0
                                      ${isTop ? 'text-dorado' : 'text-texto/30'}`}>
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate font-medium">{prov.label}</span>
                    <span className={`font-bold flex-shrink-0 tabular-nums
                                      ${isTop ? 'text-dorado' : isSel ? 'text-dorado' : 'text-azul-dark'}`}>
                      {v.label ?? `${v.value}${data.unit?.startsWith('%') ? '%' : ''}`}
                    </span>
                  </button>
                )
              })}
          </div>

          {data.unit && (
            <p className="text-[0.62rem] text-texto/35 italic pt-1">{data.unit}</p>
          )}
        </div>
      </div>
    </div>
  )
}
