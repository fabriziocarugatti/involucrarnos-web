'use client'

/** Orquestador del informe interactivo: capítulos + navegación de progreso. */

import ProgressNav, { type Capitulo } from './components/ProgressNav'
import { CapTerritorio, Hero, QueMide } from './components/chapters-apertura'
import { CapPerfil, CapRiesgo } from './components/chapters-personas'
import {
  CapBrechas,
  CapRespuesta,
  CapTablero,
  Cierre,
} from './components/chapters-respuesta'

const CAPITULOS: Capitulo[] = [
  { id: 'marco', num: '00', titulo: 'Qué mide este informe' },
  { id: 'territorio', num: '01', titulo: 'El territorio' },
  { id: 'perfil', num: '02', titulo: 'Las personas' },
  { id: 'riesgo', num: '03', titulo: 'El riesgo' },
  { id: 'respuesta', num: '04', titulo: 'La respuesta' },
  { id: 'tablero', num: '05', titulo: 'El tablero' },
  { id: 'brechas', num: '06', titulo: 'Lo que falta' },
]

export default function InformeInteractivo() {
  return (
    <main className="bg-crema">
      <ProgressNav capitulos={CAPITULOS} />
      <Hero />
      <QueMide />
      <CapTerritorio />
      <CapPerfil />
      <CapRiesgo />
      <CapRespuesta />
      <CapTablero />
      <CapBrechas />
      <Cierre />
    </main>
  )
}
