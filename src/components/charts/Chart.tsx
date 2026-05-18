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

const BarChart = dynamic(() => import('./BarChart'), { loading: ChartSkeleton, ssr: false })
const LineChart = dynamic(() => import('./LineChart'), { loading: ChartSkeleton, ssr: false })
const DonutChart = dynamic(() => import('./DonutChart'), { loading: ChartSkeleton, ssr: false })
const NOAMap = dynamic(() => import('./NOAMap'), { loading: ChartSkeleton, ssr: false })
const ArgentinaMap = dynamic(() => import('./ArgentinaMap'), { loading: ChartSkeleton, ssr: false })

export default function Chart({ data }: { data: ChartData }) {
  if (data.type === 'bar') return <BarChart data={data} />
  if (data.type === 'line') return <LineChart data={data} />
  if (data.type === 'donut') return <DonutChart data={data} />
  if (data.type === 'map_noa') return <NOAMap data={data} />
  if (data.type === 'map_argentina') return <ArgentinaMap data={data} />
  return null
}
