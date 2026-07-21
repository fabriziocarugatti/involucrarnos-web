// Datos del Informe Piloto de Sistema de Indicadores sobre Atención, Acogida y
// Detección Territorial de Casos Vinculados a Trata y Explotación.
// Diaconía España — pilotos 2024 (242 registros, CSV) y 2026 (292 registros, Excel GLOBAL).
// Fuente: informes ejecutivos para autoridades, financiadores y actores institucionales UE.
// Todos los valores son datos agregados y anonimizados; expresan atención/detección
// institucional, NO prevalencia real de trata.

export type Semaforo = 'rojo' | 'amarillo' | 'verde'

export interface Territorio {
  nombre: string
  registros: number
  pct: number
  semaforo: Semaforo
  /** Coordenadas aproximadas para el mapa (lon, lat). Canarias se recoloca en inset. */
  lon: number
  lat: number
  registros2024?: number
}

// ---------------------------------------------------------------------------
// Cabecera / metodología
// ---------------------------------------------------------------------------

export const meta = {
  titulo:
    'Sistema de indicadores sobre atención, acogida y detección territorial de casos vinculados a trata y explotación',
  tituloCorto: 'Indicadores sobre trata y explotación',
  organizacion: 'Diaconía España',
  anio: 2026,
  anioComparativa: 2024,
  registros: 292,
  registros2024: 242,
  fuente: 'PO-GAPR-REG-067 REGISTRO DATOS 2026_GLOBAL.xlsx — hoja PERSONAS ATENDIDAS',
  fuente2024: 'Datos totales 2024 (DATOS TOTALES).csv',
  advertencia:
    'Los datos representan registros institucionales de atención y detección. No miden prevalencia real de trata en España ni en las ciudades mencionadas.',
  criterioEtico:
    'Datos anonimizados y agregados. No se publican expedientes, nombres, direcciones exactas ni información que permita identificación individual.',
}

// ---------------------------------------------------------------------------
// Territorial — 2026 (8 localizaciones) + comparativa 2024 (4)
// ---------------------------------------------------------------------------

export const territorios: Territorio[] = [
  { nombre: 'Madrid', registros: 84, pct: 28.8, semaforo: 'rojo', lon: -3.70, lat: 40.42, registros2024: 95 },
  { nombre: 'Lugo', registros: 49, pct: 16.8, semaforo: 'rojo', lon: -7.56, lat: 43.01, registros2024: 59 },
  { nombre: 'Tenerife', registros: 39, pct: 13.4, semaforo: 'amarillo', lon: -16.55, lat: 28.29, registros2024: 62 },
  { nombre: 'Jerez', registros: 37, pct: 12.7, semaforo: 'amarillo', lon: -6.14, lat: 36.69, registros2024: 26 },
  { nombre: 'Zaragoza', registros: 32, pct: 11.0, semaforo: 'amarillo', lon: -0.88, lat: 41.65 },
  { nombre: 'Castellón', registros: 24, pct: 8.2, semaforo: 'verde', lon: -0.05, lat: 39.99 },
  { nombre: 'León', registros: 14, pct: 4.8, semaforo: 'verde', lon: -5.57, lat: 42.60 },
  { nombre: 'Espejo', registros: 13, pct: 4.5, semaforo: 'verde', lon: -4.55, lat: 37.68 },
]

// ---------------------------------------------------------------------------
// Perfil — 2026
// ---------------------------------------------------------------------------

export const perfil = {
  total: 292,
  mujeres: 286,
  mujeresPct: 97.9,
  hombres: 5,
  noBinario: 1,
  edadMediana: 34,
  edadPromedio: 34.5,
  hijosEnEspana: 153,
  hijosFueraEspana: 213,
  // 2024
  total2024: 242,
  mujeres2024: 230,
  mujeresPct2024: 95.0,
  menores2024: 38,
  menoresPct2024: 15.7,
}

export const paisesOrigen = [
  { pais: 'Colombia', registros: 104, pct: 35.6 },
  { pais: 'Venezuela', registros: 52, pct: 17.8 },
  { pais: 'Marruecos', registros: 17, pct: 5.8 },
  { pais: 'Brasil', registros: 13, pct: 4.5 },
  { pais: 'Paraguay', registros: 12, pct: 4.1 },
  { pais: 'Perú', registros: 11, pct: 3.8 },
  { pais: 'Nigeria', registros: 10, pct: 3.4 },
  { pais: 'Rep. Dominicana', registros: 9, pct: 3.1 },
  { pais: 'Camerún', registros: 6, pct: 2.1 },
  { pais: 'España', registros: 5, pct: 1.7 },
  { pais: 'Rumanía', registros: 4, pct: 1.4 },
  { pais: 'Honduras', registros: 4, pct: 1.4 },
]

export const situacionAdministrativa = [
  { categoria: 'Irregular', registros: 129, pct: 44.2 },
  { categoria: 'Regular / otra situación regular', registros: 99, pct: 33.9 },
  { categoria: 'Solicitante de protección internacional', registros: 51, pct: 17.5 },
  { categoria: 'Art. 59 bis / residencia', registros: 11, pct: 3.8 },
  { categoria: 'Dato inconsistente / revisar', registros: 2, pct: 0.7 },
]

export const situacionLaboral = [
  { categoria: 'Personas inactivas', registros: 118, pct: 40.4 },
  { categoria: 'Economía sumergida', registros: 83, pct: 28.4 },
  { categoria: 'Demandante de empleo', registros: 31, pct: 10.6 },
  { categoria: 'Contrato temporal', registros: 25, pct: 8.6 },
  { categoria: 'No disponible', registros: 11, pct: 3.8 },
  { categoria: 'Precariedad laboral', registros: 8, pct: 2.7 },
  { categoria: 'Contrato indefinido', registros: 8, pct: 2.7 },
  { categoria: 'Desempleo / subsidio', registros: 6, pct: 2.1 },
  { categoria: 'Prácticas', registros: 1, pct: 0.3 },
  { categoria: 'Contrato de formación', registros: 1, pct: 0.3 },
]

// ---------------------------------------------------------------------------
// Riesgo y vulnerabilidad — 2026
// ---------------------------------------------------------------------------

export const clasificacionVTSH = [
  { categoria: 'Posible víctima / indicio', registros: 204, pct: 69.9 },
  { categoria: 'No', registros: 57, pct: 19.5 },
  { categoria: 'Víctima identificada', registros: 31, pct: 10.6 },
]

export const finalidad = [
  { categoria: 'Explotación sexual', registros: 243, pct: 83.2 },
  { categoria: 'No disponible', registros: 28, pct: 9.6 },
  { categoria: 'Explotación laboral', registros: 9, pct: 3.1 },
  { categoria: 'No procede', registros: 8, pct: 2.7 },
  { categoria: 'Otros fines', registros: 3, pct: 1.0 },
  { categoria: 'Matrimonio forzoso', registros: 1, pct: 0.3 },
]

/** Menciones múltiples: una persona puede acumular varias. No sumar como personas únicas. */
export const vulnerabilidades = [
  { tipo: 'Entorno de prostitución', menciones: 165, pct: 56.5 },
  { tipo: 'Violencia sexual', menciones: 107, pct: 36.6 },
  { tipo: 'Violencia de expareja', menciones: 86, pct: 29.5 },
  { tipo: 'Sin hogar', menciones: 52, pct: 17.8 },
  { tipo: 'Abuso en la infancia', menciones: 32, pct: 11.0 },
  { tipo: 'Salud mental sin diagnóstico', menciones: 26, pct: 8.9 },
  { tipo: 'Búsqueda de vivienda / plaza', menciones: 19, pct: 6.5 },
  { tipo: 'Salud mental con diagnóstico', menciones: 14, pct: 4.8 },
  { tipo: 'Drogadicción', menciones: 12, pct: 4.1 },
  { tipo: 'Medicación psiquiátrica', menciones: 12, pct: 4.1 },
  { tipo: 'Intento autolítico', menciones: 12, pct: 4.1 },
  { tipo: 'Colectivo LGTBI', menciones: 11, pct: 3.8 },
]

export const riesgo = {
  conAlgunaVulnerabilidad: 276,
  conAlgunaVulnerabilidadPct: 94.5,
  posiblesEIdentificadas: 235, // 204 + 31
  derivacionSaludMental: 53,
  derivacionSaludMentalPct: 18.2,
  // 2024
  posibles2024: 189,
  posiblesPct2024: 78.1,
  identificadas2024: 23,
  explotacionSexual2024: 210,
  explotacionSexualPct2024: 86.8,
}

// ---------------------------------------------------------------------------
// Derivación e institucionalidad — 2026
// ---------------------------------------------------------------------------

export const derivacion = [
  { indicador: 'Atendida por teléfono 24h', si: 58, pct: 19.9, no: 224, sinDato: 10 },
  { indicador: 'Derivada por FCSE', si: 24, pct: 8.2, no: 245, sinDato: 23 },
  { indicador: 'Derivada por unidad municipal', si: 68, pct: 23.3, no: 207, sinDato: 17 },
  { indicador: 'Derivada por otra entidad', si: 43, pct: 14.7, no: 179, sinDato: 70 },
]

export const trazabilidad = [
  { indicador: 'LOPD firmada', si: 277, pct: 94.9 },
  { indicador: 'Alta en DGVG', si: 259, pct: 88.7 },
  { indicador: 'Alta en FSE', si: 189, pct: 64.7 },
  { indicador: 'Alta en IRPF estatal', si: 167, pct: 57.2 },
  { indicador: 'Compromiso firmado', si: 255, pct: 87.3 },
]

// ---------------------------------------------------------------------------
// Atención integral y acogida — 2026
// ---------------------------------------------------------------------------

export const atencion = {
  expedientesCAIInformados: 274,
  expedientesCAIInformadosPct: 93.8,
  abiertos: 259,
  abiertosPct: 88.7,
  cerrados: 15,
  compromisoFirmado: 255,
  compromisoFirmadoPct: 87.3,
  tipoAtencion: [
    { tipo: 'Presencial', registros: 253, pct: 86.6 },
    { tipo: 'No disponible', registros: 18, pct: 6.2 },
    { tipo: 'Online', registros: 15, pct: 5.1 },
    { tipo: 'Presencial / online', registros: 4, pct: 1.4 },
    { tipo: 'Telefónica', registros: 2, pct: 0.7 },
  ],
}

export const acogida = {
  conAlgunDato: 59,
  conAlgunDatoPct: 20.2,
  duracionPromedioDias: 286.5,
  duracionMedianaDias: 214,
  duracionesCalculables: 22,
  tipos: [
    { tipo: 'Emancipación', registros: 28, pct: 9.6 },
    { tipo: 'Emergencia', registros: 13, pct: 4.5 },
    { tipo: 'Semiautonomía', registros: 10, pct: 3.4 },
    { tipo: 'Larga estancia', registros: 2, pct: 0.7 },
    { tipo: 'Personal', registros: 1, pct: 0.3 },
  ],
  // 2024
  registrada2024: 68,
  registradaPct2024: 28.1,
}

// ---------------------------------------------------------------------------
// Tablero semaforizado — 2026
// ---------------------------------------------------------------------------

export const tablero: {
  bloque: string
  dato: string
  semaforo: Semaforo
  decision: string
}[] = [
  {
    bloque: 'Cobertura territorial',
    dato: '8 localizaciones con registros; concentración alta en Madrid y Lugo',
    semaforo: 'amarillo',
    decision: 'Sistema multisede, pero con concentración que requiere lectura territorial.',
  },
  {
    bloque: 'Perfil de atención',
    dato: '97,9% mujeres; fuerte presencia migrante y situación administrativa irregular',
    semaforo: 'amarillo',
    decision: 'Perfil coherente con enfoque de género y vulnerabilidad; falta desagregación longitudinal.',
  },
  {
    bloque: 'Riesgo y vulnerabilidad',
    dato: '235 registros posibles o identificados; 276 con al menos una vulnerabilidad',
    semaforo: 'rojo',
    decision: 'Alerta alta de riesgo social; exige protección integral y seguimiento.',
  },
  {
    bloque: 'Derivación y articulación institucional',
    dato: 'FCSE 24 · unidad municipal 68 · otra entidad 43',
    semaforo: 'amarillo',
    decision: 'Rutas presentes, pero con campos incompletos y necesidad de trazabilidad.',
  },
  {
    bloque: 'Acogida y continuidad',
    dato: '59 registros con algún dato de acogida; duración calculable en 22 casos',
    semaforo: 'amarillo',
    decision: 'Se requiere medir plazas, ocupación, demanda no cubierta y costes.',
  },
  {
    bloque: 'Calidad del dato',
    dato: 'Costes, acceso a derechos y atenciones por área no disponibles',
    semaforo: 'rojo',
    decision: 'Prioridad técnica para el sistema final de indicadores.',
  },
]

// ---------------------------------------------------------------------------
// Recomendaciones y brechas
// ---------------------------------------------------------------------------

export const brechas = [
  'Coste medio por persona atendida y por itinerario integral',
  'Atención jurídica, psicológica y social desagregada por prestación',
  'Acceso efectivo a derechos: documentación, vivienda, salud, formación, empleo',
  'Plazas de acogida, ocupación y demanda no cubierta',
  'Seguimiento post-egreso a 3, 6, 12 y 18 meses',
]

export const recomendacionesSistema = [
  'Crear identificador anonimizado único por persona/caso, evitando duplicidades.',
  'Separar tablas: personas, atenciones, acogida, acceso a derechos, derivaciones, costes, seguimiento y egreso.',
  'Medir atención jurídica, psicológica y social por prestación: fecha, área, duración, resultado y continuidad.',
  'Incorporar acceso a derechos como variables binarias y de estado.',
  'Agregar módulo económico y calcular coste medio por persona, por día de acogida y por itinerario.',
  'Establecer línea de base trimestral, metas anuales y semáforos por indicador.',
  'Normalizar catálogos cerrados para localización, situación administrativa, finalidad y tipo de acogida.',
]

export const recomendacionesAutoridades = [
  'Sostener financiación plurianual: la trata requiere itinerarios largos, no respuestas episódicas.',
  'Fortalecer acogida y transición a autonomía, midiendo plazas, ocupación, duración y egreso seguro.',
  'Mejorar trazabilidad territorial con mapas agregados y protocolos que impidan identificar personas o recursos.',
  'Institucionalizar un tablero trimestral de monitoreo para decisiones sobre recursos y alertas territoriales.',
  'Promover cooperación multinivel entre entidades sociales, administraciones y redes europeas.',
]
