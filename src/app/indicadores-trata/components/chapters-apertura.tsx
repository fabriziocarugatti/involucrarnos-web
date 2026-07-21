'use client'

/** Capítulos de apertura: Hero, marco metodológico y Capítulo 01 — Territorio. */

import Image from 'next/image'
import { meta, territorios } from '@/data/indicadores-trata'
import MapaEspana from './MapaEspana'
import { Reveal, ScrollySection, Step } from './scrolly'
import { ChapterHead, Counter, Fuente } from './ui'

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export function Hero() {
  return (
    <header className="relative flex min-h-[100svh] flex-col overflow-hidden bg-crema">
      {/* Trama de puntos: 292 unidades sugeridas desde el inicio */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(rgba(42,47,118,0.35) 1.3px, transparent 1.3px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 75% 60% at 50% 38%, black 20%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 60% at 50% 38%, black 20%, transparent 72%)',
        }}
      />

      {/* Cabecera institucional */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 md:px-8">
        <Image
          src="/assets/logo-diaconia.png"
          alt="Diaconía España"
          width={118}
          height={32}
          className="h-7 w-auto md:h-8"
          priority
        />
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-texto/45">
          Informe interactivo
        </span>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center px-5 pb-24 md:px-8">
        <Reveal>
          <p className="font-body text-[11.5px] font-semibold uppercase tracking-[0.3em] text-dorado-deep">
            Informe piloto · Diaconía España · {meta.anio}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-6 font-article text-[clamp(2.2rem,1.2rem+4.4vw,4.6rem)] font-semibold leading-[1.08] text-azul-deep">
            Un sistema que aprende
            <br />a <em className="text-dorado-deep">ver</em> la trata
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-7 max-w-2xl font-body text-[15.5px] leading-relaxed text-texto/75 md:text-[17px]">
            <strong className="font-semibold text-azul-deep">
              <Counter value={292} /> registros
            </strong>{' '}
            de personas atendidas en ocho territorios de España. Detrás de cada uno, un
            itinerario de detección, protección y acompañamiento frente a la trata y la
            explotación. Esta es la versión interactiva del sistema de indicadores de{' '}
            {meta.organizacion}.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-body text-[13px] text-texto/60">
            <span>
              <strong className="font-semibold text-azul-deep">8</strong> territorios
            </span>
            <span>
              <strong className="font-semibold text-azul-deep">97,9 %</strong> mujeres
            </span>
            <span>
              <strong className="font-semibold text-azul-deep">83,2 %</strong> explotación sexual
            </span>
            <span className="hidden md:inline">
              Datos agregados y anonimizados
            </span>
          </div>
        </Reveal>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[10.5px] uppercase tracking-[0.25em] text-texto/45">
            Desliza
          </span>
          <span className="block h-9 w-[1.5px] overflow-hidden bg-azul-deep/15">
            <span className="block h-3 w-full animate-scrollhint bg-dorado" />
          </span>
        </div>
      </div>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Marco: qué mide y qué no (gate ético visible)
// ---------------------------------------------------------------------------

export function QueMide() {
  const claves = [
    {
      t: 'Qué mide',
      d: 'La capacidad institucional de detección, atención y acogida: 292 registros de la hoja «Personas atendidas» del sistema de Diaconía España en 2026.',
    },
    {
      t: 'Qué no mide',
      d: 'La prevalencia real de la trata. Los datos expresan a quiénes llegó la organización, no cuántas personas sufren explotación en España.',
    },
    {
      t: 'Cómo protege',
      d: 'Todos los datos son agregados y anonimizados. No se publican expedientes, nombres, direcciones ni información que permita identificar a nadie.',
    },
  ]
  return (
    <section id="marco" className="bg-azul-deep py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="max-w-3xl font-article text-[clamp(1.4rem,1rem+1.8vw,2.3rem)] font-semibold leading-snug text-crema">
            Antes de leer una sola cifra:{' '}
            <em className="text-dorado">estos datos no cuentan cuánta trata hay.</em>{' '}
            Cuentan cuánta se está logrando ver.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
          {claves.map((c, i) => (
            <Reveal key={c.t} delay={i * 130}>
              <div className="border-t border-dorado/40 pt-4">
                <h3 className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-dorado">
                  {c.t}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-crema/75">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Capítulo 01 — Territorio
// ---------------------------------------------------------------------------

export function CapTerritorio() {
  return (
    <section id="territorio" className="bg-crema">
      <ChapterHead
        num="01"
        kicker="El territorio"
        title={
          <>
            Ocho ciudades donde
            <br />
            alguien está mirando
          </>
        }
      >
        La red de Diaconía detecta y atiende en ocho territorios. El mapa no señala dónde
        hay más trata: señala dónde hay más capacidad de verla.
      </ChapterHead>

      <ScrollySection graphic={(paso) => <MapaEspana paso={paso} />} graphicSide="right">
        <Step index={0}>
          <p className="scrolly-text">
            España, vista desde un sistema de protección. Cada burbuja que vas a ver es un
            punto de la red: un centro, un equipo, personas atendidas.
          </p>
        </Step>
        <Step index={1}>
          <p className="scrolly-text">
            <strong>2024: el primer piloto.</strong> Cuatro territorios y 242 registros.
            Madrid concentraba 95; Tenerife, Lugo y Jerez completaban el mapa.
          </p>
        </Step>
        <Step index={2}>
          <p className="scrolly-text">
            <strong>2026: el sistema se expande.</strong> De cuatro a{' '}
            <strong>ocho territorios</strong> y 292 registros. Se suman Zaragoza,
            Castellón, León y Espejo. Más territorio observado, más casos detectados.
          </p>
        </Step>
        <Step index={3} last>
          <p className="scrolly-text">
            La concentración alta está en <strong>Madrid (84 registros)</strong> y{' '}
            <strong>Lugo (49)</strong>: el 45,6 % de toda la base. Donde el semáforo está
            en rojo, la lectura territorial se vuelve prioritaria.
          </p>
          <Fuente>
            Fuente: {meta.fuente}. Semáforo por concentración relativa de registros.
          </Fuente>
        </Step>
      </ScrollySection>

      {/* Ranking territorial */}
      <div className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <Reveal>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-azul/15 pt-8 md:grid-cols-4">
            {territorios.map((t) => (
              <div key={t.nombre} className="flex items-baseline gap-2">
                <span
                  className="h-2 w-2 shrink-0 self-center rounded-full"
                  style={{
                    background:
                      t.semaforo === 'rojo' ? '#b23c2e' : t.semaforo === 'amarillo' ? '#d9a441' : '#3f7a55',
                  }}
                />
                <span className="font-body text-[13px] font-medium text-texto">{t.nombre}</span>
                <span className="ml-auto font-body text-[13px] tabular-nums text-gris">
                  {t.registros}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
