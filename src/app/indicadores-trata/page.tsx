import type { Metadata } from 'next'
import { meta } from '@/data/indicadores-trata'
import InformeInteractivo from './InformeInteractivo'
import './informe.css'

export const metadata: Metadata = {
  title: `${meta.tituloCorto} — Informe interactivo · Diaconía España`,
  description:
    '292 registros de personas atendidas en ocho territorios de España. La versión interactiva del sistema de indicadores sobre trata y explotación de Diaconía España, con datos agregados y anonimizados.',
  openGraph: {
    title: 'Un sistema que aprende a ver la trata',
    description:
      'Informe interactivo · 292 registros, 8 territorios, datos agregados y anonimizados. Diaconía España.',
    locale: 'es_ES',
    type: 'article',
  },
}

export default function Page() {
  return <InformeInteractivo />
}
