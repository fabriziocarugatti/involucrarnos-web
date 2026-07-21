'use client'

/** Capítulos finales: 04 La respuesta · 05 El tablero · 06 Lo que falta · Cierre. */

import Image from 'next/image'
import { useState } from 'react'
import {
  acogida,
  atencion,
  brechas,
  derivacion,
  meta,
  recomendacionesAutoridades,
  recomendacionesSistema,
  tablero,
  trazabilidad,
} from '@/data/indicadores-trata'
import { Reveal } from './scrolly'
import { BarRow, BigStat, ChapterHead, Counter, Fuente, SEMAFORO_COLOR, SemaforoDot } from './ui'

// ---------------------------------------------------------------------------
// Capítulo 04 — La respuesta
// ---------------------------------------------------------------------------

export function CapRespuesta() {
  return (
    <section id="respuesta" className="bg-crema">
      <ChapterHead
        num="04"
        kicker="La respuesta"
        title={
          <>
            Del registro
            <br />
            al acompañamiento
          </>
        }
      >
        Detectar es el principio. Después viene la articulación institucional: derivar,
        documentar, dar techo y sostener itinerarios que se miden en meses, no en días.
      </ChapterHead>

      <div className="mx-auto max-w-6xl px-5 pb-28 pt-14 md:px-8">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {/* Derivaciones */}
          <Reveal>
            <div>
              <h3 className="font-article text-xl font-semibold text-azul-deep">
                ¿Quién deriva los casos?
              </h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-texto/70">
                Las unidades municipales derivan casi el triple que las Fuerzas y Cuerpos
                de Seguridad del Estado. La puerta de entrada es local y social, no
                policial.
              </p>
              <div className="mt-5">
                {derivacion.map((d, i) => (
                  <BarRow
                    key={d.indicador}
                    label={d.indicador}
                    value={d.si}
                    max={68}
                    display={`${d.si} · ${d.pct.toLocaleString('es-ES')} %`}
                    color={i === 2 ? '#2a2f76' : 'rgba(42,47,118,0.55)'}
                    delay={i * 70}
                  />
                ))}
              </div>
              <Fuente>
                Registros con derivación afirmativa. Campos con omisiones: la trazabilidad
                de origen es una brecha señalada por el propio informe.
              </Fuente>
            </div>
          </Reveal>

          {/* Trazabilidad */}
          <Reveal delay={140}>
            <div>
              <h3 className="font-article text-xl font-semibold text-azul-deep">
                La huella documental
              </h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-texto/70">
                La fortaleza del sistema está en el papel: protección de datos firmada y
                altas administrativas casi universales.
              </p>
              <div className="mt-5">
                {trazabilidad.map((t, i) => (
                  <BarRow
                    key={t.indicador}
                    label={t.indicador}
                    value={t.si}
                    max={292}
                    display={`${t.pct.toLocaleString('es-ES')} %`}
                    color={i === 0 ? '#3f7a55' : 'rgba(42,47,118,0.55)'}
                    delay={i * 70}
                  />
                ))}
              </div>
              <Fuente>Porcentajes sobre el total de 292 registros.</Fuente>
            </div>
          </Reveal>
        </div>

        {/* Acogida */}
        <Reveal>
          <div className="mt-20 border-t border-azul/15 pt-12">
            <h3 className="font-article text-xl font-semibold text-azul-deep">
              La acogida: el dato que se mide en meses
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              <BigStat value={59} label="registros con algún dato de acogida (20,2 %)" />
              <BigStat
                value={287}
                accent
                label="días de estancia media en los 22 casos con duración calculable"
              />
              <BigStat value={214} label="días de estancia mediana" />
              <BigStat
                value={atencion.abiertosPct}
                decimals={1}
                suffix=" %"
                label="de expedientes de atención integral siguen abiertos"
              />
            </div>
            <p className="mt-8 max-w-3xl font-body text-[14px] leading-relaxed text-texto/75">
              Nueve meses de estancia media. La cifra desarma cualquier lectura episódica:
              salir de la trata no es un trámite sino un itinerario largo — y por eso el
              informe insiste en financiación plurianual, no en respuestas de ciclo corto.
            </p>
            <Fuente>
              Tipos de acogida registrados: emancipación (28), emergencia (13),
              semiautonomía (10), larga estancia (2), personal (1). El 81,5 % de la base no
              registra dato de acogida.
            </Fuente>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Capítulo 05 — El tablero
// ---------------------------------------------------------------------------

export function CapTablero() {
  const [abierto, setAbierto] = useState<number | null>(null)
  return (
    <section id="tablero" className="bg-crema-warm">
      <ChapterHead
        num="05"
        kicker="El tablero"
        title={
          <>
            Seis bloques,
            <br />
            dos alarmas encendidas
          </>
        }
      >
        El informe condensa todo el sistema en un tablero semaforizado: el instrumento
        pensado para que autoridades y financiadores decidan de un vistazo. Toca cada
        bloque para ver la decisión que sugiere.
      </ChapterHead>

      <div className="mx-auto max-w-5xl px-5 pb-28 pt-12 md:px-8">
        <div className="grid gap-3 md:grid-cols-2">
          {tablero.map((b, i) => {
            const isOpen = abierto === i
            return (
              <Reveal key={b.bloque} delay={i * 80}>
                <button
                  onClick={() => setAbierto(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group w-full border-l-[3px] bg-crema px-5 py-4 text-left shadow-sm transition-shadow hover:shadow-md"
                  style={{ borderLeftColor: SEMAFORO_COLOR[b.semaforo] }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body text-[13.5px] font-semibold text-azul-deep">
                      {b.bloque}
                    </span>
                    <SemaforoDot nivel={b.semaforo} size={11} />
                  </div>
                  <p className="mt-1.5 font-body text-[12.5px] leading-snug text-texto/65">
                    {b.dato}
                  </p>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-3 font-body text-[13px] leading-relaxed text-azul-dark">
                        <span className="font-semibold text-dorado-deep">Decisión sugerida → </span>
                        {b.decision}
                      </p>
                    </div>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
        <Fuente>
          Semáforo institucional del informe piloto {meta.anio}. Rojo: intervención
          prioritaria. Amarillo: fortalecer. Verde: consolidado.
        </Fuente>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Capítulo 06 — Lo que falta
// ---------------------------------------------------------------------------

export function CapBrechas() {
  return (
    <section id="brechas" className="bg-crema">
      <ChapterHead
        num="06"
        kicker="Lo que falta"
        title={
          <>
            Lo que el sistema
            <br />
            todavía no puede ver
          </>
        }
      >
        La honestidad del informe está en sus vacíos: declara con precisión qué no puede
        medir aún. Cada brecha es la especificación de la próxima versión del sistema.
      </ChapterHead>

      <div className="mx-auto max-w-6xl px-5 pb-28 pt-12 md:px-8">
        <Reveal>
          <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {brechas.map((b, i) => (
              <li key={b} className="flex gap-4 border-b border-azul/10 pb-4">
                <span className="font-article text-lg italic leading-none text-dorado-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-[14.5px] leading-relaxed text-texto/85">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <h3 className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-dorado-deep">
                Para el sistema de indicadores
              </h3>
              <ul className="mt-4 space-y-3">
                {recomendacionesSistema.slice(0, 5).map((r) => (
                  <li key={r} className="flex gap-3 font-body text-[13.5px] leading-relaxed text-texto/80">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-azul" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div>
              <h3 className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-dorado-deep">
                Para autoridades y financiadores
              </h3>
              <ul className="mt-4 space-y-3">
                {recomendacionesAutoridades.map((r) => (
                  <li key={r} className="flex gap-3 font-body text-[13.5px] leading-relaxed text-texto/80">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-dorado-deep" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Cierre
// ---------------------------------------------------------------------------

export function Cierre() {
  return (
    <footer id="cierre" className="bg-azul-deep">
      <div className="mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="font-article text-[clamp(1.5rem,1rem+2.2vw,2.6rem)] font-semibold leading-snug text-crema">
            El valor de Diaconía no es cuántas personas atiende.
            <br />
            Es <em className="text-dorado">qué cambia</em> en la vida de cada una — y un
            sistema de datos que empieza a poder demostrarlo.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-8 max-w-2xl font-body text-[14.5px] leading-relaxed text-crema/70">
            Este piloto convierte una base operativa en evidencia institucional: primero
            con 242 registros en 2024, hoy con <Counter value={292} className="font-semibold text-crema" /> en
            ocho territorios. El siguiente paso es medir el ciclo completo de protección —
            de la detección al egreso seguro — con la calidad de dato que la Unión Europea
            necesita para financiar respuestas eficaces.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="/docs/informe-piloto-diaconia-2024.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-dorado px-6 py-3 font-body text-[13.5px] font-semibold text-azul-deep transition-transform hover:scale-[1.03]"
            >
              Descargar informe 2024 (PDF)
            </a>
            <a
              href="https://diaconia.es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-crema/30 px-6 py-3 font-body text-[13.5px] font-medium text-crema transition-colors hover:border-dorado hover:text-dorado"
            >
              Conocer Diaconía España
            </a>
          </div>
        </Reveal>

        <div className="mt-20 border-t border-crema/15 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Image
              src="/assets/logo-diaconia-blanco.png"
              alt="Diaconía España"
              width={140}
              height={40}
              className="h-9 w-auto opacity-90"
            />
            <p className="font-body text-[11.5px] leading-relaxed text-crema/45">
              Informe piloto {meta.anio} · Datos agregados y anonimizados ·{' '}
              {meta.advertencia}
              <br />
              Sistema de indicadores sobre trata y explotación · Diaconía España ·
              diaconia.es
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
