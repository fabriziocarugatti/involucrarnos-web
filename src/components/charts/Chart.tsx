'use client'

import type { ChartData } from '@/data/estudios'
import BarChart from './BarChart'
import LineChart from './LineChart'
import DonutChart from './DonutChart'
import NOAMap from './NOAMap'
import ArgentinaMap from './ArgentinaMap'

export default function Chart({ data }: { data: ChartData }) {
  if (data.type === 'bar') return <BarChart data={data} />
  if (data.type === 'line') return <LineChart data={data} />
  if (data.type === 'donut') return <DonutChart data={data} />
  if (data.type === 'map_noa') return <NOAMap data={data} />
  if (data.type === 'map_argentina') return <ArgentinaMap data={data} />
  return null
}
