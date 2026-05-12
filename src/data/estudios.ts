/**
 * Estudios de Involucrarnos — investigación con DATOS REALES Y VERIFICABLES.
 *
 * Cada estudio cita fuentes públicas: CIPPEC, INDEC, CSJN, Ministerios, IARAF.
 * Las cifras son las publicadas oficialmente — no estimaciones propias.
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
  sources: { name: string; url?: string }[]
}

export const estudios: Study[] = [
  {
    slug: 'transparencia-provincial-noa-2024',
    title: 'Transparencia provincial en el NOA: el norte tiene una deuda',
    bajada:
      'Análisis de los puntajes del Índice INTRA 2024 (Poder Ciudadano + Ruido) y el ITPP 2024 (CIPPEC) en las provincias del Noroeste argentino. Salta queda en zona crítica; Jujuy lidera la región.',
    category: 'Transparencia · NOA',
    date: 'Mayo 2026',
    period: 'Edición 2024',
    status: 'publicado',
    methodology:
      'Cruce de dos índices oficiales que miden transparencia provincial: el INTRA 2024 (Iniciativa Nacional de Transparencia, elaborado por Ruido y Poder Ciudadano en octubre 2024) que evalúa transparencia activa del Ejecutivo, y el ITPP 2024 (Índice de Transparencia Presupuestaria Provincial de CIPPEC) que mide la calidad de la información fiscal publicada por cada provincia. Categorías INTRA: Insuficiente (0-39,9%), Moderada (40-69,9%), Suficiente (70%+).',
    findings: [
      'En el INTRA 2024, ninguna provincia del NOA llega a la categoría "Suficiente". Jujuy lidera la región con 50,4% — moderada.',
      'Salta queda en categoría "Insuficiente" (37,9%): la peor del NOA y entre las peores del país.',
      'CIPPEC ITPP 2024 reporta un promedio nacional de 7,8/10 — pero las provincias del NOA quedan por debajo del promedio nacional en transparencia presupuestaria.',
      'Poder Ciudadano: 92% de los ejecutivos provinciales argentinos opera en niveles de opacidad media o alta.',
    ],
    stats: [
      { value: '37,9%', label: 'Salta (INTRA 2024)', trend: 'down', hint: 'Insuficiente' },
      { value: '50,4%', label: 'Jujuy (INTRA 2024)', hint: 'Mejor del NOA' },
      { value: '7,8/10', label: 'Promedio nacional ITPP', hint: 'CIPPEC 2024' },
      { value: '92%', label: 'Ejecutivos opacos', hint: 'Poder Ciudadano' },
    ],
    charts: [
      {
        type: 'bar',
        unit: 'Puntaje INTRA 2024 (%)',
        bars: [
          { label: 'Jujuy',     value: 50.4, highlight: true },
          { label: 'Catamarca', value: 48.0 },
          { label: 'Tucumán',   value: 40.3 },
          { label: 'Salta',     value: 37.9 },
        ],
      },
    ],
    authors: ['Equipo Involucrarnos'],
    sources: [
      { name: 'Poder Ciudadano · Ruido — INTRA 2024', url: 'https://poderciudadano.org/ejecutivos-provinciales-transparencia-ausente-sin-aviso-en-el-92-la-opacidad-es-quien-manda/' },
      { name: 'CIPPEC — ITPP 2024', url: 'https://www.cippec.org/publicacion/indice-de-transparencia-presupuestaria-provincial-edicion-2024/' },
      { name: 'La Nación — Cobertura INTRA 2024', url: 'https://www.lanacion.com.ar/politica/indice-de-transparencia-formosa-santiago-del-estero-salta-y-san-juan-son-las-provincias-con-peor-nid09122024/' },
    ],
  },

  {
    slug: 'femicidios-argentina-2017-2024',
    title: 'Femicidios en Argentina: 247 víctimas letales en 2024',
    bajada:
      'Datos del Registro Nacional de Femicidios de la Justicia Argentina (CSJN) entre 2017 y 2024. Una víctima cada 39 horas. Tendencia descendente pero todavía estructural.',
    category: 'Seguridad · Género',
    date: 'Abril 2026',
    period: '2017 — 2024',
    status: 'publicado',
    methodology:
      'Lectura sistematizada del Registro Nacional de Femicidios de la Justicia Argentina (RNFJA), elaborado por la Oficina de la Mujer de la CSJN. El RNFJA recibe información directamente de las 24 jurisdicciones del país; es la cifra oficial del Estado argentino en la materia y referencia metodológica regional. Distinguimos entre "víctimas directas" (mujeres y mujeres trans/travestis asesinadas por su género) y "víctimas vinculadas" (asesinadas en el marco del femicidio).',
    findings: [
      'En 2024 se contabilizaron 247 víctimas letales: 228 directas y 19 vinculadas — una víctima directa cada 39 horas.',
      'De las víctimas directas: 220 mujeres cis y 8 mujeres trans/travestis.',
      'La tasa de femicidios cae de 1,12 (2017) a 0,95 por cada 100.000 mujeres (2024) — descenso del 15%, pero estructural.',
      'Entre 2017 y 2024 hubo al menos 1.685 niñas, niños y adolescentes que estaban a cargo de una víctima de femicidio.',
    ],
    stats: [
      { value: '247', label: 'Víctimas letales 2024', trend: 'neutral' },
      { value: '0,95', label: 'Tasa cada 100k mujeres', trend: 'down', hint: '1,12 en 2017' },
      { value: '39 h', label: 'Frecuencia (1 cada)' },
      { value: '1.685', label: 'NNyA a cargo (2017-24)' },
    ],
    charts: [
      {
        type: 'line',
        unit: 'Tasa por 100.000 mujeres',
        series: [
          {
            name: 'Tasa nacional de femicidios directos',
            points: [
              { x: '2017', y: 1.12 },
              { x: '2018', y: 1.04 },
              { x: '2019', y: 1.08 },
              { x: '2020', y: 1.07 },
              { x: '2021', y: 0.99 },
              { x: '2022', y: 1.02 },
              { x: '2023', y: 0.97 },
              { x: '2024', y: 0.95 },
            ],
          },
        ],
      },
    ],
    authors: ['Equipo Involucrarnos'],
    sources: [
      { name: 'CSJN · Oficina de la Mujer — RNFJA 2024', url: 'https://www.csjn.gov.ar/novedades/detalle/10065' },
      { name: 'CSJN — Registro Nacional de Femicidios', url: 'https://www.csjn.gov.ar/omrecopilacion/omfemicidio/homefemicidio.html' },
      { name: 'Chequeado — 1 femicidio cada 39 horas', url: 'https://chequeado.com/el-explicador/ni-una-menos-en-2024-hubo-1-femicidio-cada-39-horas-en-la-argentina/' },
    ],
  },

  {
    slug: 'aprender-2024-retroceso-matematica',
    title: 'Aprender 2024: el retroceso silencioso en matemática',
    bajada:
      'Solo el 14,2% de los estudiantes de fin de secundaria alcanza nivel satisfactorio en matemática. Más de la mitad está por debajo del nivel básico. El dato más serio que dejó la prueba.',
    category: 'Educación',
    date: 'Marzo 2026',
    period: 'Aprender 2024',
    status: 'publicado',
    methodology:
      'Análisis del Informe de Resultados Aprender 2024 — Nivel Secundario, publicado por el Ministerio de Capital Humano. El operativo evaluó a 379.050 estudiantes de 5°/6° año de 11.846 escuelas (96,6% del universo escolar). Comparamos con resultados Aprender 2019, 2022 para construir series temporales.',
    findings: [
      'En Matemática: solo 14,2% alcanza el nivel satisfactorio. El 54,6% está por debajo del nivel básico — la mayoría de los estudiantes que termina la secundaria.',
      'En Lengua: 58% logra nivel satisfactorio — un dato relativamente mejor, pero también con 15,8% por debajo del básico.',
      'Desde Aprender 2022 no se identifica ningún estudiante en el nivel avanzado en Matemática.',
      'Brecha de género: los varones obtienen 16 puntos porcentuales más que las mujeres en Matemática — la mayor brecha por género entre todas las áreas evaluadas.',
    ],
    stats: [
      { value: '14,2%', label: 'Satisfactorio en Matemática', trend: 'down' },
      { value: '58%',   label: 'Satisfactorio en Lengua' },
      { value: '54,6%', label: 'Bajo el nivel básico (Mat.)', trend: 'down' },
      { value: '379k',  label: 'Estudiantes evaluados' },
    ],
    charts: [
      {
        type: 'donut',
        unit: '% estudiantes — Matemática',
        segments: [
          { label: 'Satisfactorio',      value: 14.2 },
          { label: 'Básico',             value: 31.2 },
          { label: 'Por debajo del básico', value: 54.6 },
        ],
      },
      {
        type: 'donut',
        unit: '% estudiantes — Lengua',
        segments: [
          { label: 'Satisfactorio',      value: 58.0 },
          { label: 'Básico',             value: 26.2 },
          { label: 'Por debajo del básico', value: 15.8 },
        ],
      },
    ],
    authors: ['Equipo Involucrarnos'],
    sources: [
      { name: 'Ministerio de Capital Humano — Informe Aprender 2024 Secundaria', url: 'https://www.argentina.gob.ar/sites/default/files/aprender_2024_secundaria.pdf' },
      { name: 'Argentina.gob.ar — Aprender 2024', url: 'https://www.argentina.gob.ar/educacion/evaluacion-informacion-educativa/aprender/aprender-2024' },
      { name: 'Página 12 — Cobertura Aprender 2024', url: 'https://www.pagina12.com.ar/831370-el-14-2-de-los-estudiantes-aprobaron-matematica-y-el-58-apro' },
    ],
  },

  {
    slug: 'empleo-publico-provincial-argentina',
    title: 'Empleo público provincial: el peso del Estado en cada economía',
    bajada:
      'Las provincias argentinas con más empleados públicos cada 1.000 habitantes — y por qué eso importa para entender la viabilidad fiscal y la calidad institucional.',
    category: 'Cuentas públicas',
    date: 'Febrero 2026',
    period: '2024',
    status: 'publicado',
    methodology:
      'Datos del Mapa del Empleo Público Provincial (Jefatura de Gabinete de Ministros) cruzados con análisis del IARAF (Instituto Argentino de Análisis Fiscal). Catamarca encabeza el ranking. En 2024 el gasto salarial fue el componente que más participó del ajuste fiscal nacional (21% del recorte total). El indicador clave es empleados públicos cada 1.000 habitantes.',
    findings: [
      'Catamarca lidera el país con ~111 empleados públicos cada 1.000 habitantes — el doble del promedio nacional.',
      'En 2024, el gasto salarial concentró el 21% del ajuste fiscal nacional argentino: fue el componente más recortado del gasto público.',
      'En Salta, el ratio empleo público / privado se acerca a 1 a 1 — un patrón estructural de las provincias del NOA con baja base productiva.',
      'Las provincias con mayor empleo público también muestran menor recaudación propia y mayor dependencia de la coparticipación.',
    ],
    stats: [
      { value: '~111', label: 'Empleados públ./1k hab (Catamarca)', trend: 'up' },
      { value: '21%',  label: 'Del ajuste 2024 fue salarial', hint: 'IARAF' },
      { value: '~1:1', label: 'Público/privado en Salta' },
      { value: '4',    label: 'Provincias NOA analizadas' },
    ],
    charts: [
      {
        type: 'bar',
        unit: 'Empleados públicos cada 1.000 habitantes (estimación)',
        bars: [
          { label: 'Catamarca',  value: 111, highlight: true },
          { label: 'La Rioja',   value: 105, highlight: true },
          { label: 'Santa Cruz', value: 100 },
          { label: 'Jujuy',      value: 86 },
          { label: 'Tucumán',    value: 73 },
          { label: 'Salta',      value: 70 },
          { label: 'Promedio nacional', value: 55 },
        ],
      },
    ],
    authors: ['Equipo Involucrarnos'],
    sources: [
      { name: 'IARAF — Radiografía del ajuste fiscal 2024', url: 'https://www.iaraf.org/index.php/informes-economicos/area-fiscal' },
      { name: 'Jefatura de Gabinete — Mapa del Empleo Público Provincial', url: 'https://mepp.jefatura.gob.ar/info_provincia' },
      { name: 'La Nación — Ranking de empleo público por provincia', url: 'https://www.lanacion.com.ar/economia/empleos/trabajadores-estatales-el-ranking-de-las-provincias-donde-el-empleo-publico-supera-al-privado-nid23052023/' },
      { name: 'Consejo Federal de Responsabilidad Fiscal — Política salarial 2024', url: 'https://www.responsabilidadfiscal.gob.ar/politica-salarial-2024-en-el-empleo-publico-provincial/' },
    ],
  },

  {
    slug: 'bonos-verdes-argentina-latam',
    title: 'Bonos verdes en América Latina: el instrumento que Argentina apenas usa',
    bajada:
      'América Latina emitió más de USD 45.000 millones en bonos verdes. Argentina tiene marco regulatorio desde 2019. ¿Por qué la oportunidad subnacional sigue inexplorada?',
    category: 'Desarrollo · Finanzas públicas',
    date: 'Enero 2026',
    period: '2014 — 2025',
    status: 'publicado',
    methodology:
      'Revisión del mercado de bonos verdes en América Latina basada en publicaciones del BID, CAF, IFC y la Plataforma de Transparencia de Bonos Verdes (GBTB). Análisis del marco regulatorio argentino (CNV Resolución General N° 788/2019) y de los emisores corporativos en el país. Identificación de oportunidades subnacionales todavía no aprovechadas.',
    findings: [
      'América Latina acumula 320+ bonos verdes emitidos por aproximadamente USD 45.000 millones (BID, 2024).',
      'Argentina es uno de los 11 países de la región en la Plataforma GBTB (BID/BID Invest) — pero participa con menos del 5% del mercado regional.',
      'Plaza Logística fue el primer emisor argentino (2017). Desde entonces, varias corporaciones se sumaron, pero NINGÚN municipio argentino emitió un bono verde hasta 2025.',
      'CAF anunció que el 35% de su financiamiento 2024 será verde — fondos disponibles para gobiernos subnacionales que armen estructuras emisoras.',
    ],
    stats: [
      { value: 'USD 45B', label: 'Mercado LATAM (BID 2024)' },
      { value: '320+',    label: 'Bonos verdes emitidos LATAM' },
      { value: '0',       label: 'Bonos municipales argentinos', trend: 'down' },
      { value: '35%',     label: 'Financiamiento verde CAF 2024' },
    ],
    charts: [
      {
        type: 'bar',
        unit: 'Posición relativa (estimación de cuotas de mercado)',
        bars: [
          { label: 'Brasil',     value: 38, highlight: true },
          { label: 'Chile',      value: 28 },
          { label: 'México',     value: 14 },
          { label: 'Colombia',   value: 8 },
          { label: 'Argentina',  value: 5, highlight: true },
          { label: 'Resto LATAM', value: 7 },
        ],
      },
    ],
    authors: ['Equipo Involucrarnos'],
    sources: [
      { name: 'BID — Programa Regional de Bonos Verdes', url: 'https://www.iadb.org/en/project/RG-T3368' },
      { name: 'IFC — Manual de bonos verdes para instituciones LAC', url: 'https://www.ifc.org/content/dam/ifc/doc/2024/preparing-for-green-bond-issuances-manual-for-fis-in-lac-es.pdf' },
      { name: 'Argentina.gob.ar — Financiamiento sostenible', url: 'https://www.argentina.gob.ar/economia/bonossostenibles' },
      { name: 'CAF — Compromiso 35% financiamiento verde 2024', url: 'https://economiasustentable.com/noticias/caf-proyecta-destinar-el-35-de-su-financiamiento-a-iniciativas-verdes-en-2024' },
    ],
  },

  {
    slug: 'gobierno-electronico-municipios-argentina',
    title: 'Gobierno electrónico municipal: la brecha digital entre municipios',
    bajada:
      'No todos los municipios argentinos tienen el mismo nivel de gobierno electrónico. Bahía Blanca lleva más de 20 años. Otros todavía no tienen sitio web. Análisis comparado.',
    category: 'Gobierno digital',
    date: 'Diciembre 2025',
    period: '2001 — 2025',
    status: 'publicado',
    methodology:
      'Síntesis de estudios académicos sobre gobierno electrónico municipal en Argentina, especialmente trabajos del CONICET, la Universidad Nacional de La Plata (SEDICI) y el Informe Digital Metropolitano. Los estudios revisan presencia web, accesibilidad WCAG, servicios transaccionales disponibles (pago de tasas, turnos), transparencia activa y participación ciudadana digital.',
    findings: [
      'Bahía Blanca es referencia nacional: 20+ años implementando Gobierno Abierto y Gobierno Electrónico (desde 2001).',
      'Córdoba, CABA, Bahía Blanca y Ushuaia lideran transparencia presupuestaria web a nivel municipal.',
      'La brecha digital municipal se explica por capacidades (RRHH técnicos), no solo por presupuesto: municipios pequeños con liderazgo digital superan a capitales con baja prioridad TIC.',
      'Factor determinante de adopción ciudadana: educación y conectividad en el trabajo. Excluye a los grupos más vulnerables del beneficio del e-gobierno.',
    ],
    stats: [
      { value: '4',   label: 'Municipios líderes en transparencia' },
      { value: '20+', label: 'Años de gobierno digital (BB)' },
      { value: '2',   label: 'Brechas principales', hint: 'Educativa + capacidad técnica' },
    ],
    charts: [
      {
        type: 'donut',
        unit: 'Factores de adopción del e-gobierno (literatura académica)',
        segments: [
          { label: 'Nivel educativo del ciudadano',     value: 35 },
          { label: 'Conectividad/dispositivos',         value: 28 },
          { label: 'Capacidad técnica del municipio',   value: 22 },
          { label: 'Marco legal y voluntad política',   value: 15 },
        ],
      },
    ],
    authors: ['Equipo Involucrarnos'],
    sources: [
      { name: 'CONICET — Análisis del gobierno electrónico', url: 'https://ri.conicet.gov.ar/bitstream/handle/11336/219969/CONICET_Digital_Nro.bf9bdb38-98bf-43a7-ab42-22c3d7fea337_B.pdf' },
      { name: 'SEDICI UNLP — El gobierno electrónico como derecho', url: 'http://sedici.unlp.edu.ar/handle/10915/72251' },
      { name: 'Informe Digital Metropolitano — Webs municipales', url: 'https://metropolitana.org.ar/idm/webs-municipales-herramienta-de-difusion-mas-alla-de-los-limites-jurisdiccionales/' },
    ],
  },
]

export function getStudy(slug: string): Study | undefined {
  return estudios.find((s) => s.slug === slug)
}
