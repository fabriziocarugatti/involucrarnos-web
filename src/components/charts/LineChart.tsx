'use client'

import { motion } from 'framer-motion'
import type { LineChartData } from '@/data/estudios'

interface Props {
  data: LineChartData
  className?: string
  height?: number
}

const COLORS = ['#2a2f76', '#E07222', '#B85510', '#1e2260']

export default function LineChart({ data, className = '', height = 220 }: Props) {
  if (!data.series.length) return null

  const allPoints = data.series.flatMap((s) => s.points)
  const xs = Array.from(new Set(allPoints.map((p) => p.x)))
  const ys = allPoints.map((p) => p.y)
  const yMin = Math.min(...ys)
  const yMax = Math.max(...ys)
  const range = yMax - yMin || 1

  const padY = range * 0.1
  const yLow = yMin - padY
  const yHigh = yMax + padY
  const yRange = yHigh - yLow

  const W = 600
  const H = height
  const padLeft = 36
  const padRight = 12
  const padTop = 12
  const padBottom = 28
  const plotW = W - padLeft - padRight
  const plotH = H - padTop - padBottom

  const xToPx = (i: number) =>
    padLeft + (xs.length === 1 ? plotW / 2 : (i / (xs.length - 1)) * plotW)
  const yToPx = (v: number) => padTop + plotH - ((v - yLow) / yRange) * plotH

  // 4 horizontal grid lines
  const gridLines = [0.25, 0.5, 0.75, 1].map((p) => yLow + p * yRange)

  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Gráfico de líneas"
      >
        {/* y-axis grid */}
        {gridLines.map((g, i) => (
          <g key={i}>
            <line
              x1={padLeft}
              x2={W - padRight}
              y1={yToPx(g)}
              y2={yToPx(g)}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={padLeft - 6}
              y={yToPx(g) + 3}
              textAnchor="end"
              fontSize="9"
              fill="#9ca3af"
              fontFamily="ui-sans-serif, system-ui"
            >
              {Number.isInteger(g) ? g : g.toFixed(2)}
            </text>
          </g>
        ))}

        {/* x-axis labels */}
        {xs.map((x, i) => (
          <text
            key={x}
            x={xToPx(i)}
            y={H - 10}
            textAnchor="middle"
            fontSize="9"
            fill="#9ca3af"
            fontFamily="ui-sans-serif, system-ui"
          >
            {x}
          </text>
        ))}

        {/* series */}
        {data.series.map((s, si) => {
          const color = s.color || COLORS[si % COLORS.length]
          const path = s.points
            .map((p, i) => {
              const xIdx = xs.indexOf(p.x)
              return `${i === 0 ? 'M' : 'L'} ${xToPx(xIdx)} ${yToPx(p.y)}`
            })
            .join(' ')

          // area fill
          const areaPath =
            path +
            ` L ${xToPx(xs.indexOf(s.points[s.points.length - 1].x))} ${padTop + plotH}` +
            ` L ${xToPx(xs.indexOf(s.points[0].x))} ${padTop + plotH} Z`

          return (
            <g key={s.name}>
              {si === 0 && (
                <motion.path
                  d={areaPath}
                  fill={color}
                  fillOpacity={0.08}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />
              )}
              <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.4, delay: 0.1 + si * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              {s.points.map((p, pi) => {
                const xIdx = xs.indexOf(p.x)
                return (
                  <motion.circle
                    key={pi}
                    cx={xToPx(xIdx)}
                    cy={yToPx(p.y)}
                    r="3"
                    fill={color}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.8 + si * 0.15 + pi * 0.05,
                      type: 'spring',
                      stiffness: 280,
                      damping: 16,
                    }}
                  />
                )
              })}
            </g>
          )
        })}
      </svg>

      {/* legend */}
      <div className="flex flex-wrap gap-3 mt-2 px-1">
        {data.series.map((s, si) => (
          <div key={s.name} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-3 h-0.5 rounded-full"
              style={{ background: s.color || COLORS[si % COLORS.length] }}
            />
            <span className="text-texto/65">{s.name}</span>
          </div>
        ))}
        {data.unit && (
          <span className="text-[0.65rem] text-texto/40 italic ml-auto">{data.unit}</span>
        )}
      </div>
    </div>
  )
}
