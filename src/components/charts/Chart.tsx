'use client'

import type { ChartData } from '@/data/estudios'
import dynamic from 'next/dynamic'

function ChartSkeleton() {
  return (
    <div
      className="min-h-[260px] w-full rounded-xl bg-azul/5 animate-pulse"
      aria-hidden="true"
    />
  )
}

const dynamicOpts = { loading: ChartSkeleton, ssr: false }

const BarChart = dynamic(() => import('./BarChart'), dynamicOpts)
const LineChart = dynamic(() => import('./LineChart'), dynamicOpts)
const DonutChart = dynamic(() => import('./DonutChart'), dynamicOpts)
const NOAMap = dynamic(() => import('./NOAMap'), dynamicOpts)
const ArgentinaMap = dynamic(() => import('./ArgentinaMap'), dynamicOpts)

export default function Chart({ data }: { data: ChartData }) {
  if (data.type === 'bar') return <BarChart data={data} />
  if (data.type === 'line') return <LineChart data={data} />
  if (data.type === 'donut') return <DonutChart data={data} />
  if (data.type === 'map_noa') return <NOAMap data={data} />
  if (data.type === 'map_argentina') return <ArgentinaMap data={data} />
  return null
}
