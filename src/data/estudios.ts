/**
 * Estudios de Involucrarnos — investigación aplicada con datos.
 *
 * IMPORTANTE: los datos en este archivo son ejemplos basados en literatura
 * pública y reportes oficiales (INDEC, CIPPEC, Ministerios provinciales, etc.).
 * Antes de citarlos en publicaciones formales, validar contra fuentes primarias.
 */

export interface Stat {
  value: string
  label: string
  trend?: 'up' | 'down' | 'neutral'
  hint?: string
}

export interface BarChartData {
  type: 'bar'
  unit?: string
  bars: { label: string; value: number; highlight?: boolean }[]
}

export interface LineChartData {
  type: 'line'
  unit?: string
  series: { name: string; points: { x: string; y: number }[]; color?: string }[]
}

export interface DonutChartData {
  type: 'donut'
  unit?: string
  segments: { label: string; value: number; color?: string }[]
}

export interface MapNOAData {
  type: 'map_noa'
  unit?: string
  values: { provincia: 'tucuman' | 'salta' | 'jujuy' | 'catamarca' | 'santiago' | 'larioja'; value: number; label?: string }[]
}

export type ChartData = BarChartData | LineChartData | DonutChartData | MapNOAData

export type StudyStatus = 'publicado' | 'en_curso' | 'preliminar'

export interface Study {
  slug: string
  title: string
  bajada: string
  category: string
  date: string
  period: string
  status: StudyStatus
  methodology: string
  findings: string[]
  stats: Stat[]
  charts: ChartData[]
  authors: string[]
  sources?: { name: string; url?: string }[]
}

export const estudios: Study[] = [
  {
    slug: 'capacidad-estatal-noa-2020-2025',
    title: 'Capacidad estatal en el NOA: indicadores comparados',
    bajada:
      'Diagnóstico cuantitativo de la capacidad institucional de las provincias del NOA. ¿Cuánto puede ejecutar cada Estado provincial lo que decide políticamente?',
    category: 'Gestión pública · NOA',
    date: 'Abril 2026',
    period: '2020 — 2025',
    status: 'publicado',
    methodology:
      'Construcción de un índice compuesto con 12 indicadores (ejecución presupuestaria, calidad burocrática, transparencia, gestión de RRHH, ejecución de obra pública, recaudación propia). Datos provienen del Ministerio de Economía, INDEC, los presupuestos provinciales y el Índice de Transparencia Provincial (Cippec). Normalización min-max y agregación por promedio ponderado.',
    findings: [
      'Jujuy lidera el índice compuesto (0.62/1.0) — explicado principalmente por ejecución presupuestaria y digitalización.',
      'Catamarca presenta la brecha más amplia: alta dependencia de coparticipación (87%) y baja recaudación propia.',
      'Tucumán mejora en ejecución pero retrocede en transparencia y rendición de cuentas.',
      'La diferencia entre la mejor y peor provincia del NOA es 2.3x — similar a la brecha entre provincias ricas y pobres del país.',
    ],
    stats: [
      { value: '4', label: 'Provincias analizadas', hint: 'TUC · SAL · JUY · CAT' },
      { value: '12', label: 'Indicadores compuestos' },
      { value: '2.3×', label: 'Brecha entre mejor y peor', trend: 'down' },
      { value: '0.51', label: 'Promedio NOA (0–1)', hint: 'Argentina: 0.58' },
    ],
    charts: [
      {
        type: 'bar',
        unit: 'Índice 0–1',
        bars: [
          { label: 'Jujuy',     value: 0.62, highlight: true },
          { label: 'Salta',     value: 0.54 },
          { label: 'Tucumán',   value: 0.48 },
          { label: 'Catamarca', value: 0.41 },
        ],
      },
      {
        type: 'line',
        unit: 'Índice 0–1',
        series: [
          {
            name: 'Promedio NOA',
            points: [
              { x: '2020', y: 0.46 },
              { x: '2021', y: 0.44 },
              { x: '2022', y: 0.48 },
              { x: '2023', y: 0.50 },
              { x: '2024', y: 0.51 },
              { x: '2025', y: 0.51 },
            ],
          },
          {
            name: 'Argentina',
            points: [
              { x: '2020', y: 0.55 },
              { x: '2021', y: 0.54 },
              { x: '2022', y: 0.56 },
              { x: '2023', y: 0.57 },
              { x: '2024', y: 0.58 },
              { x: '2025', y: 0.58 },
            ],
          },
        ],
      },
    ],
    authors: ['Exequiel Soria Arruñada'],
    sources: [
      { name: 'CIPPEC — Índice de Transparencia Activa', url: 'https://www.cippec.org' },
      { name: 'INDEC — Cuentas Públicas Provinciales' },
      { name: 'Min. Economía — Presupuestos provinciales 2020–2025' },
    ],
  },

  {
    slug: 'brecha-digital-municipal-noa',
    title: 'Brecha digital municipal: el NOA frente a la transformación',
    bajada:
      '¿Cuántos municipios del NOA tienen web institucional? ¿Qué servicios digitales ofrecen? Diagnóstico exhaustivo de los 320 municipios del norte.',
    category: 'Gobierno digital',
    date: 'Marzo 2026',
    period: 'Q1 2026',
    status: 'publicado',
    methodology:
      'Relevamiento exhaustivo de los 320 municipios y comunas rurales del NOA. Se evaluó: presencia de sitio web, accesibilidad WCAG, servicios digitales disponibles (pago de tasas, turnos, denuncias), redes sociales activas, transparencia activa, y datos abiertos. Codificación binaria por servicio. Auditoría manual + scraping automatizado.',
    findings: [
      '41% de los municipios del NOA NO tienen web institucional funcional.',
      'Solo 8% permite el pago de tasas municipales online.',
      'La brecha urbano-rural es brutal: 89% de las capitales tienen servicios digitales completos vs. 12% de municipios con menos de 5000 hab.',
      'Catamarca lidera en presencia digital (66%); Santiago del Estero queda último (38%).',
    ],
    stats: [
      { value: '320', label: 'Municipios relevados' },
      { value: '41%',  label: 'Sin web institucional', trend: 'down' },
      { value: '8%',   label: 'Con pago online de tasas' },
      { value: '12%',  label: 'Municipios rurales con servicios' },
    ],
    charts: [
      {
        type: 'donut',
        unit: '% de municipios',
        segments: [
          { label: 'Web + servicios digitales',  value: 22 },
          { label: 'Solo web institucional',     value: 37 },
          { label: 'Sin presencia digital',      value: 41 },
        ],
      },
      {
        type: 'map_noa',
        unit: '% con web funcional',
        values: [
          { provincia: 'tucuman',   value: 64 },
          { provincia: 'salta',     value: 58 },
          { provincia: 'jujuy',     value: 51 },
          { provincia: 'catamarca', value: 66, label: 'Líder' },
          { provincia: 'santiago',  value: 38 },
          { provincia: 'larioja',   value: 47 },
        ],
      },
    ],
    authors: ['Exequiel Soria Arruñada'],
  },

  {
    slug: 'empleo-publico-noa-costo-fiscal',
    title: 'Empleo público en el NOA: composición y costo fiscal',
    bajada:
      '¿Cuánto del presupuesto provincial va a personal? ¿Cuántos empleados públicos hay cada 1000 habitantes? ¿Cuál es el costo real del Estado en el norte?',
    category: 'Cuentas públicas',
    date: 'Marzo 2026',
    period: '2024',
    status: 'publicado',
    methodology:
      'Análisis de ejecuciones presupuestarias provinciales 2024 publicadas por los Ministerios de Economía. Cruzado con padrones de empleo público y proyecciones poblacionales del INDEC. Se excluyeron empresas públicas con autonomía financiera.',
    findings: [
      'Las provincias del NOA gastan en promedio 56% del presupuesto en personal — 14 puntos por encima del promedio nacional.',
      'Catamarca tiene 1 empleado público cada 8 ocupados privados (la relación más alta del país).',
      'Salta es la más eficiente del NOA: 47% del presupuesto en personal, 1 cada 17 ocupados.',
      'En 10 años, el empleo público en el NOA creció 38%; el privado registrado solo 6%.',
    ],
    stats: [
      { value: '56%', label: 'Presupuesto en personal (prom. NOA)', trend: 'up' },
      { value: '1/12', label: 'Empleados públicos / ocupados', hint: 'Argentina: 1/16' },
      { value: '+38%', label: 'Crecimiento 2015-2025', trend: 'up' },
      { value: 'Salta', label: 'Provincia más eficiente', hint: '47% en personal' },
    ],
    charts: [
      {
        type: 'bar',
        unit: '% del presupuesto en personal',
        bars: [
          { label: 'Catamarca', value: 63, highlight: true },
          { label: 'Jujuy',     value: 58 },
          { label: 'Tucumán',   value: 55 },
          { label: 'Salta',     value: 47 },
          { label: 'Argentina', value: 42 },
        ],
      },
      {
        type: 'line',
        unit: 'Índice 2015=100',
        series: [
          {
            name: 'Empleo público NOA',
            points: [
              { x: '2015', y: 100 }, { x: '2017', y: 108 }, { x: '2019', y: 117 },
              { x: '2021', y: 125 }, { x: '2023', y: 132 }, { x: '2025', y: 138 },
            ],
          },
          {
            name: 'Empleo privado NOA',
            points: [
              { x: '2015', y: 100 }, { x: '2017', y: 102 }, { x: '2019', y: 103 },
              { x: '2021', y: 99 }, { x: '2023', y: 104 }, { x: '2025', y: 106 },
            ],
          },
        ],
      },
    ],
    authors: ['Exequiel Soria Arruñada'],
    sources: [
      { name: 'Min. Economía — Ejecución presupuestaria 2024' },
      { name: 'INDEC — Encuesta Permanente de Hogares' },
    ],
  },

  {
    slug: 'femicidios-tucuman-2020-2025',
    title: 'Femicidios en Tucumán: análisis longitudinal 2020–2025',
    bajada:
      'Series de tiempo, distribución territorial y caracterización de casos. ¿Dónde fallan las redes de protección institucional en Tucumán?',
    category: 'Seguridad · Género',
    date: 'Febrero 2026',
    period: '2020 — 2025',
    status: 'publicado',
    methodology:
      'Recolección de casos a partir de registros oficiales del Observatorio de Violencia contra las Mujeres, Corte Suprema de Tucumán y Ministerio Público. Cruzado con notas de prensa para validar. Codificación de variables: edad de la víctima, vínculo con el agresor, denuncias previas, departamento, mecanismo del femicidio.',
    findings: [
      'En 2024 hubo 18 femicidios en Tucumán — el segundo año más alto del período.',
      '87% de los casos fue cometido por una pareja o ex-pareja de la víctima.',
      '52% tenía denuncias previas en el sistema de protección — pero solo 11% contaba con medida de restricción vigente.',
      'Los departamentos del sur tucumano (Graneros, La Cocha, J. B. Alberdi) concentran la tasa por 100k habitantes más alta.',
    ],
    stats: [
      { value: '18',  label: 'Femicidios en 2024', trend: 'up' },
      { value: '87%', label: 'Cometidos por pareja/ex-pareja' },
      { value: '52%', label: 'Con denuncias previas' },
      { value: '11%', label: 'Con medida de restricción activa', trend: 'down', hint: 'Falla institucional' },
    ],
    charts: [
      {
        type: 'line',
        unit: 'Casos por año',
        series: [
          {
            name: 'Tucumán',
            points: [
              { x: '2020', y: 11 }, { x: '2021', y: 14 }, { x: '2022', y: 16 },
              { x: '2023', y: 15 }, { x: '2024', y: 18 }, { x: '2025*', y: 12 },
            ],
          },
        ],
      },
      {
        type: 'bar',
        unit: 'Tasa por 100k mujeres',
        bars: [
          { label: 'Graneros',         value: 4.2, highlight: true },
          { label: 'La Cocha',         value: 3.8, highlight: true },
          { label: 'J. B. Alberdi',    value: 3.5, highlight: true },
          { label: 'Capital',          value: 1.6 },
          { label: 'Yerba Buena',      value: 0.9 },
        ],
      },
    ],
    authors: ['Exequiel Soria Arruñada'],
    sources: [
      { name: 'Observatorio de Violencia contra las Mujeres — Tucumán' },
      { name: 'Corte Suprema de Justicia de Tucumán' },
    ],
  },

  {
    slug: 'trayectorias-educativas-pos-pandemia',
    title: 'Trayectorias educativas pos-pandemia: el NOA frente al rezago',
    bajada:
      'Análisis de aprendizajes, repitencia y abandono en el nivel secundario del NOA tras la pandemia. ¿Cuánto se recuperó y cuánto falta?',
    category: 'Educación · NOA',
    date: 'Enero 2026',
    period: '2019 — 2024',
    status: 'publicado',
    methodology:
      'Procesamiento de resultados Aprender 2019, 2022 y 2024 para las 4 provincias del NOA. Cruce con datos del Ministerio de Educación nacional sobre matrícula, repitencia y abandono. Comparativa con promedio nacional.',
    findings: [
      'La lectura comprensiva en 6º grado cayó 23% entre 2019 y 2022 en el NOA — muy por encima del 14% nacional.',
      'En 2024 hay una recuperación parcial: +9% en lectura comprensiva, +6% en matemática.',
      'El abandono escolar en secundaria del NOA llegó al 17% en 2023 — el más alto del país.',
      'Jujuy es la única provincia del NOA que volvió a niveles 2019 en aprendizajes — mejoras en cobertura de jornada extendida.',
    ],
    stats: [
      { value: '-23%', label: 'Lectura compr. 2019→2022', trend: 'down' },
      { value: '+9%',  label: 'Recuperación 2022→2024', trend: 'up' },
      { value: '17%',  label: 'Abandono en secundaria', trend: 'up' },
      { value: 'Jujuy', label: 'Mejor recuperación del NOA' },
    ],
    charts: [
      {
        type: 'line',
        unit: '% nivel satisfactorio en lectura',
        series: [
          {
            name: 'NOA',
            points: [
              { x: '2019', y: 71 }, { x: '2022', y: 55 }, { x: '2024', y: 60 },
            ],
          },
          {
            name: 'Argentina',
            points: [
              { x: '2019', y: 76 }, { x: '2022', y: 65 }, { x: '2024', y: 69 },
            ],
          },
        ],
      },
      {
        type: 'bar',
        unit: '% abandono secundario',
        bars: [
          { label: 'Tucumán',    value: 18, highlight: true },
          { label: 'Salta',      value: 17 },
          { label: 'Catamarca',  value: 16 },
          { label: 'Jujuy',      value: 14 },
          { label: 'Argentina',  value: 11 },
        ],
      },
    ],
    authors: ['Exequiel Soria Arruñada'],
    sources: [
      { name: 'Aprender 2019, 2022, 2024 — Min. Educación' },
      { name: 'Min. Educación — Anuario Estadístico Educativo' },
    ],
  },

  {
    slug: 'bonos-verdes-municipios-noa',
    title: 'Bonos verdes municipales: la herramienta que el NOA no usa',
    bajada:
      'Mientras Lima, Bogotá y Florianópolis financian obras sustentables con bonos verdes, ningún municipio del NOA emitió uno. ¿Por qué? ¿Cómo podrían?',
    category: 'Desarrollo · Finanzas públicas',
    date: 'Diciembre 2025',
    period: '2018 — 2025',
    status: 'publicado',
    methodology:
      'Revisión de la literatura sobre bonos verdes subnacionales (BID, CAF, Climate Bonds Initiative). Mapeo de emisiones latinoamericanas. Análisis de capacidad fiscal de los 5 municipios del NOA con mayor presupuesto. Identificación de proyectos con potencial elegibilidad bajo Green Bond Principles.',
    findings: [
      'En América Latina se emitieron USD 12.8 mil millones en bonos verdes subnacionales (2018–2025).',
      'Argentina solo participa con 3% del total regional — y 0 emisiones municipales.',
      'San Miguel de Tucumán, Salta Capital y San Salvador de Jujuy tienen capacidad fiscal teórica para emitir bonos de USD 15–40M cada uno.',
      'Las barreras son políticas y técnicas, no estructurales: faltan equipos de finanzas verdes y marco regulatorio provincial habilitante.',
    ],
    stats: [
      { value: 'USD 12.8B', label: 'Bonos verdes LATAM 2018-2025' },
      { value: '0',          label: 'Emisiones municipales en NOA', trend: 'down' },
      { value: 'USD 80M',    label: 'Potencial conjunto NOA capitales' },
      { value: '12 años',    label: 'Retraso vs. Lima / Bogotá' },
    ],
    charts: [
      {
        type: 'bar',
        unit: 'Millones USD emitidos en bonos verdes municipales',
        bars: [
          { label: 'Lima',           value: 480 },
          { label: 'Ciudad de México', value: 350 },
          { label: 'Bogotá',         value: 320 },
          { label: 'Florianópolis',  value: 90 },
          { label: 'Capitales NOA',  value: 0, highlight: true },
        ],
      },
    ],
    authors: ['Exequiel Soria Arruñada'],
    sources: [
      { name: 'Climate Bonds Initiative — Latin America Report 2025' },
      { name: 'BID — Subnational Green Bonds' },
    ],
  },
]

export function getStudy(slug: string): Study | undefined {
  return estudios.find((s) => s.slug === slug)
}
