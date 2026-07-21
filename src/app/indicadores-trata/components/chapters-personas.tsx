'use client'

/** Capítulo 02 — Quiénes son · Capítulo 03 — El riesgo (sección oscura). */

import {
  meta,
  paisesOrigen,
  perfil,
  riesgo,
  situacionAdministrativa,
  situacionLaboral,
  vulnerabilidades,
} from '@/data/indicadores-trata'
import UnitGrid, { type UnitMode } from './UnitGrid'
import { Reveal, ScrollySection, Step } from './scrolly'
import { BarRow, BigStat, ChapterHead, Fuente } from './ui'

// ---------------------------------------------------------------------------
// Capítulo 02 — Quiénes son
// ---------------------------------------------------------------------------

const MODOS_PERFIL: UnitMode[] = ['todos', 'todos', 'sexo']

export function CapPerfil() {
  return (
    <section id="perfil" className="bg-crema">
      <ChapterHead
        num="02"
        kicker="Las personas"
        title={
          <>
            292 registros.
            <br />
            Cada punto, una persona.
          </>
        }
      >
        La base no tiene nombres ni rostros — y así debe ser. Pero cada registro es
        alguien que llegó a un centro de atención. Esto es lo que el sistema sabe de
        ellas, en agregado.
      </ChapterHead>

      <ScrollySection
        graphic={(paso) => (
          <div className="py-10 pr-2 md:py-0">
            <UnitGrid mode={MODOS_PERFIL[Math.min(paso, MODOS_PERFIL.length - 1)]} />
          </div>
        )}
        graphicSide="left"
      >
        <Step index={0}>
          <p className="scrolly-text">
            Cada punto es un registro del sistema: una persona atendida en 2026. Doscientas
            noventa y dos historias que el informe solo puede contar como datos.
          </p>
        </Step>
        <Step index={1}>
          <p className="scrolly-text">
            La edad mediana es de <strong>34 años</strong>. La base registra 153 personas
            con hijos en España y 213 con hijos fuera del país: maternidades divididas por
            la migración.
          </p>
        </Step>
        <Step index={2} last>
          <p className="scrolly-text">
            <strong>El 97,9 % son mujeres.</strong> La trata con fines de explotación
            sexual tiene un sesgo de género abrumador: 286 mujeres, 5 hombres, 1 persona
            no binaria. Sin enfoque de género no hay lectura posible de este fenómeno.
          </p>
          <Fuente>Fuente: {meta.fuente}.</Fuente>
        </Step>
      </ScrollySection>

      {/* Origen y situación */}
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-8">
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div>
              <h3 className="font-article text-xl font-semibold text-azul-deep">
                ¿De dónde vienen?
              </h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-texto/70">
                Más de la mitad llegó desde Colombia o Venezuela. El corredor
                latinoamericano domina la base, seguido por Marruecos y África occidental.
              </p>
              <div className="mt-5">
                {paisesOrigen.slice(0, 8).map((p, i) => (
                  <BarRow
                    key={p.pais}
                    label={p.pais}
                    value={p.registros}
                    max={paisesOrigen[0].registros}
                    display={`${p.registros} · ${p.pct.toLocaleString('es-ES')} %`}
                    color={i < 2 ? '#2a2f76' : 'rgba(42,47,118,0.55)'}
                    delay={i * 60}
                  />
                ))}
              </div>
              <Fuente>12 nacionalidades principales sobre {perfil.total} registros.</Fuente>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <h3 className="font-article text-xl font-semibold text-azul-deep">
                ¿En qué situación están?
              </h3>
              <p className="mt-2 font-body text-[13.5px] leading-relaxed text-texto/70">
                Casi la mitad está en situación administrativa irregular. Y siete de cada
                diez están fuera del empleo formal: inactividad o economía sumergida.
              </p>
              <div className="mt-5">
                {situacionAdministrativa.slice(0, 4).map((s, i) => (
                  <BarRow
                    key={s.categoria}
                    label={s.categoria}
                    value={s.registros}
                    max={situacionAdministrativa[0].registros}
                    display={`${s.pct.toLocaleString('es-ES')} %`}
                    color={i === 0 ? '#b23c2e' : 'rgba(42,47,118,0.55)'}
                    delay={i * 60}
                  />
                ))}
              </div>
              <div className="mt-6">
                {situacionLaboral.slice(0, 4).map((s, i) => (
                  <BarRow
                    key={s.categoria}
                    label={s.categoria}
                    value={s.registros}
                    max={situacionLaboral[0].registros}
                    display={`${s.pct.toLocaleString('es-ES')} %`}
                    color={i < 2 ? '#d9a441' : 'rgba(42,47,118,0.55)'}
                    delay={i * 60}
                  />
                ))}
              </div>
              <Fuente>Situación administrativa y laboral agregadas; categorías normalizadas.</Fuente>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Capítulo 03 — El riesgo (sección oscura)
// ---------------------------------------------------------------------------

const MODOS_RIESGO: UnitMode[] = ['vtsh', 'finalidad', 'vulnerabilidad']

export function CapRiesgo() {
  return (
    <section id="riesgo" className="bg-azul-deep">
      <ChapterHead
        num="03"
        kicker="El riesgo"
        dark
        title={
          <>
            Cuatro de cada cinco
            <br />
            con señales de trata
          </>
        }
      >
        Aquí el informe deja de describir y empieza a alertar. La clasificación de riesgo
        es el corazón del sistema: distinguir indicios, detección e identificación formal.
      </ChapterHead>

      <ScrollySection
        dark
        graphic={(paso) => (
          <div className="py-10 pr-2 md:py-0">
            <UnitGrid dark mode={MODOS_RIESGO[Math.min(paso, MODOS_RIESGO.length - 1)]} />
          </div>
        )}
        graphicSide="left"
      >
        <Step index={0}>
          <p className="scrolly-text-dark">
            <strong>235 de los 292 registros</strong> figuran como posibles víctimas de
            trata (204) o víctimas identificadas (31). El 80,5 % de la base presenta
            señales del delito.
          </p>
        </Step>
        <Step index={1}>
          <p className="scrolly-text-dark">
            La finalidad predominante es inequívoca: <strong>explotación sexual en 243
            registros</strong> — el 83,2 %. La explotación laboral, la servidumbre y el
            matrimonio forzoso aparecen en proporciones mucho menores.
          </p>
        </Step>
        <Step index={2} last>
          <p className="scrolly-text-dark">
            Y el riesgo no viene solo: <strong>276 registros —el 94,5 %— acumulan al menos
            una vulnerabilidad</strong> además de la trata. La explotación se sostiene
            sobre personas a las que ya les habían quitado casi todo.
          </p>
          <Fuente dark>
            Clasificación VTSH y finalidad sobre el total de registros. {meta.advertencia}
          </Fuente>
        </Step>
      </ScrollySection>

      {/* Vulnerabilidades acumuladas */}
      <div className="mx-auto max-w-6xl px-5 pb-28 md:px-8">
        <Reveal>
          <h3 className="font-article text-xl font-semibold text-crema">
            Las capas de la vulnerabilidad
          </h3>
          <p className="mt-2 max-w-2xl font-body text-[13.5px] leading-relaxed text-crema/65">
            Menciones múltiples: una misma persona puede acumular varias. Por eso no se
            suman como personas únicas — se leen como capas superpuestas.
          </p>
        </Reveal>
        <div className="mt-6 grid gap-x-14 md:grid-cols-2">
          {vulnerabilidades.slice(0, 12).map((v, i) => (
            <BarRow
              key={v.tipo}
              dark
              label={v.tipo}
              value={v.menciones}
              max={vulnerabilidades[0].menciones}
              display={`${v.menciones} · ${v.pct.toLocaleString('es-ES')} %`}
              color={i < 3 ? '#C8A96A' : 'rgba(200,169,106,0.45)'}
              delay={(i % 6) * 60}
            />
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-10 border-t border-crema/15 pt-10 md:grid-cols-3">
          <BigStat dark accent value={riesgo.conAlgunaVulnerabilidadPct} decimals={1} suffix=" %"
            label="acumula al menos una vulnerabilidad registrada" />
          <BigStat dark value={165} label="registros en entorno de prostitución — la capa más frecuente" />
          <BigStat dark value={riesgo.derivacionSaludMental}
            label="derivaciones a salud mental registradas (18,2 %)" />
        </div>
      </div>
    </section>
  )
}
