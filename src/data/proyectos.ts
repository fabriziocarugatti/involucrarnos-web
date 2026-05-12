/**
 * Proyectos abiertos de Involucrarnos — herramientas, programas e iniciativas.
 *
 * Cada proyecto tiene un status que define cómo se renderiza la card:
 *   activo         → en producción, usable hoy
 *   construccion   → en desarrollo activo, demos disponibles
 *   planificacion  → roadmap definido, sin código todavía
 *   proximamente   → idea formalizada, sin fecha
 */

export type ProjectStatus = 'activo' | 'construccion' | 'planificacion' | 'proximamente'

export interface Proyecto {
  slug: string
  title: string
  bajada: string
  icon: 'sparkles' | 'database' | 'compass' | 'graduation' | 'lightbulb' | 'network'
  category: string
  status: ProjectStatus
  highlights: string[]
  cta?: { label: string; href: string; external?: boolean }
  metrics?: { value: string; label: string }[]
}

export const proyectos: Proyecto[] = [
  {
    slug: 'el-especialista-ia',
    title: 'El Especialista — IA en políticas públicas',
    bajada:
      'Asistente conversacional entrenado con el marco de Involucrarnos y los artículos publicados. Respondé dudas sobre capacidad estatal, ciclo de política pública, evidencia y más.',
    icon: 'sparkles',
    category: 'Herramienta IA',
    status: 'activo',
    highlights: [
      'Streaming en vivo de respuestas en español',
      'Cargado con el marco editorial de Exequiel Soria Arruñada',
      'Gratuito, sin login, rate-limit razonable',
      'Modelo open source (DeepSeek V3) — sin lock-in propietario',
    ],
    cta: { label: 'Probar ahora', href: '#chat' },
    metrics: [
      { value: '24/7', label: 'Disponibilidad' },
      { value: '<2s',  label: 'Latencia primer token' },
    ],
  },

  {
    slug: 'generador-diagnosticos',
    title: 'Generador de Diagnósticos PP',
    bajada:
      'Herramienta interactiva que estructura un diagnóstico de política pública a partir del problema que ingreses. Sigue el ciclo: problema → actores → causas → políticas aplicables.',
    icon: 'compass',
    category: 'Herramienta',
    status: 'construccion',
    highlights: [
      'Ingresá un problema en lenguaje natural',
      'Obtené árbol de causas + mapa de actores',
      'Recomendaciones basadas en políticas comparadas',
      'Exportable a PDF / Markdown para anexar a un informe',
    ],
  },

  {
    slug: 'observatorio-estado-noa',
    title: 'Observatorio del Estado NOA',
    bajada:
      'Dashboard de indicadores institucionales del NOA en tiempo real: ejecución presupuestaria, empleo público, transparencia, gestión de obra pública. Datos abiertos, actualización mensual.',
    icon: 'database',
    category: 'Dashboard de datos',
    status: 'planificacion',
    highlights: [
      'Indicadores comparados de las 4 provincias del NOA',
      'Series históricas desde 2015',
      'API pública con datos en CSV/JSON',
      'Alertas automáticas cuando hay datos nuevos',
    ],
    metrics: [
      { value: '12', label: 'Indicadores planeados' },
      { value: '4',  label: 'Provincias' },
    ],
  },

  {
    slug: 'diccionario-pp',
    title: 'Diccionario abierto de Políticas Públicas',
    bajada:
      'Glosario accesible: cada concepto técnico de gestión pública explicado en lenguaje claro, con ejemplos del NOA y referencias a literatura. Wikipedia, pero sólo de políticas públicas.',
    icon: 'lightbulb',
    category: 'Recurso educativo',
    status: 'construccion',
    highlights: [
      '200+ términos planeados',
      'Cada entrada con ejemplo aplicado a Argentina/NOA',
      'Editable colaborativamente (modo wiki)',
      'Linkeado desde los artículos para profundizar conceptos',
    ],
    metrics: [
      { value: '47', label: 'Entradas redactadas' },
      { value: '200+', label: 'Planeadas' },
    ],
  },

  {
    slug: 'mentoria-gestion-publica',
    title: 'Mentoría en gestión pública',
    bajada:
      'Programa de pares: emparejamos jóvenes que quieren entrar a la gestión pública con dirigentes y funcionarios con experiencia. 8 encuentros virtuales, gratuito.',
    icon: 'graduation',
    category: 'Programa',
    status: 'planificacion',
    highlights: [
      'Match basado en intereses (educación, salud, ambiente, etc.)',
      'Metodología estructurada (no es "una charla con un experto")',
      'Cohorte semestral de 30 duplas',
      'Gratuito — sponsoreado por la comunidad',
    ],
  },

  {
    slug: 'mapa-actores-noa',
    title: 'Mapa de actores políticos del NOA',
    bajada:
      'Visualización en red de los principales actores políticos, institucionales y de sociedad civil del norte argentino. Quién conecta con quién, qué espacios articulan.',
    icon: 'network',
    category: 'Visualización',
    status: 'proximamente',
    highlights: [
      'Grafo interactivo con 500+ actores',
      'Filtros por sector, provincia, alineación',
      'Actualizable comunitariamente con verificación',
      'Útil para periodismo, investigación y consultoría política',
    ],
  },
]
