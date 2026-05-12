import type { TipoContenido } from './site'

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'blockquote'
  text: string
}

export interface Article {
  slug: string
  tipo: TipoContenido
  title: string
  bajada: string
  category: string
  date: string
  author: string
  authorRole: string
  featured: boolean
  published: boolean
  content: ArticleBlock[]
  source?: { name: string; url: string }
  enrollUrl?: string
  /** Foto opcional del autor para mostrar en cabecera del artículo */
  authorPhoto?: string
  /** Imagen de portada del artículo (1200x630 recomendado) */
  coverImage?: string
}

/** Foto por defecto del autor (sobreescribible por articulo) */
export const DEFAULT_AUTHOR_PHOTO = '/assets/exequiel.jpg'

const AUTHOR = 'Exequiel Soria Arruñada'
const AUTHOR_ROLE =
  'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, UAM.'

export const articulos: Article[] = [
  {
    slug: 'gobernar-mejor-es-honrar-la-democracia',
    tipo: 'articulo',
    title: 'Gobernar mejor es también honrar la democracia',
    bajada:
      'A 50 años del golpe, el Nunca Más sigue siendo una convocatoria a defender las libertades fundamentales. Pero en 2026, esa defensa exige algo más: traducir la legitimidad democrática en capacidad real de gobierno.',
    category: 'Democracia',
    date: 'Mayo 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: true,
    published: true,
    content: [
      { type: 'paragraph', text: 'El 24 de marzo no es solo una fecha de memoria. Es también una pregunta activa: ¿qué hacemos con la democracia que recuperamos? La respuesta no puede limitarse a la conmemoración. Necesita traducirse en acción institucional concreta.' },
      { type: 'paragraph', text: 'A cincuenta años del golpe, el Nunca Más sigue siendo una convocatoria ética insoslayable. Pero en el contexto político de 2026, esa convocatoria tiene una dimensión adicional: la obligación de gobernar bien. Porque una democracia que no entrega resultados tangibles para sus ciudadanos se erosiona desde adentro, sin necesidad de tanques en la calle.' },
      { type: 'heading', text: 'El déficit de capacidad estatal' },
      { type: 'paragraph', text: 'Argentina tiene una democracia robusta en términos electorales. Lo que le falta es capacidad estatal real: la posibilidad concreta de convertir decisiones políticas en políticas públicas efectivas.' },
      { type: 'paragraph', text: 'Este déficit no es nuevo. Pero se ha profundizado. La distancia entre lo que el Estado promete y lo que efectivamente puede ejecutar es hoy uno de los factores más corrosivos para la legitimidad democrática. Cuando el Estado no puede prestar servicios básicos con calidad — cuando los hospitales no tienen insumos, cuando las escuelas no pueden garantizar trayectorias educativas completas, cuando la burocracia es un laberinto kafkiano — la democracia sangra.' },
      { type: 'paragraph', text: 'El discurso libertario aprovecha ese sangrado con cierta lógica: si el Estado falla, ¿para qué querer más Estado? Es un argumento simple y efectivo. Y seguirá siendo efectivo mientras los que creemos en lo público no demostremos, con hechos, que el Estado puede funcionar bien.' },
      { type: 'blockquote', text: 'Gobernar bien no es una opción técnica. Es una obligación democrática.' },
      { type: 'paragraph', text: 'La respuesta no es destruir el Estado. Es reformarlo. Es construir capacidad institucional genuina, basada en evidencia, con métricas de resultado y rendición de cuentas real. No como concesión al neoliberalismo, sino como condición para que la política progresista sea creíble.' },
      { type: 'heading', text: 'Una generación con otra mirada' },
      { type: 'paragraph', text: 'Hay en Argentina una generación de 25 a 40 años que no tiene nostalgia peronista ni anti-peronista. Que vivió la crisis de 2001, la recuperación pos-kirchnerista, y ahora la experiencia libertaria. Que no quiere volver a ningún pasado, pero tampoco acepta que el futuro tenga que ser el desmantelamiento de lo público.' },
      { type: 'paragraph', text: 'Esa generación ve la reforma del Estado no como una traición ideológica, sino como una necesidad técnica. Ve la gestión basada en evidencia no como tecnocracia fría, sino como respeto concreto hacia la ciudadanía. Ve la política como una profesión que puede ejercerse con rigor intelectual, vocación de servicio y transparencia en los resultados.' },
      { type: 'paragraph', text: 'En el NOA, esa generación existe. Hay jóvenes dirigentes que se formaron afuera y volvieron. Que estudian gestión pública y política comparada. Que saben que Tucumán tiene problemas estructurales que no se resuelven con voluntarismo ni con populismo, sino con estrategia, datos y construcción institucional sostenida.' },
      { type: 'paragraph', text: 'Desde Involucrarnos apostamos a ese espacio. A una política que no sea el voluntarismo sin gestión ni el cinismo sin propuesta. A una forma de hacer las cosas que entienda que el Nunca Más no fue solo una promesa de no repetir la violencia — fue también una promesa de hacer funcionar la democracia.' },
      { type: 'paragraph', text: 'Esa es la deuda pendiente. Y saldarla es, hoy, la forma más honesta de honrar a quienes pusieron el cuerpo para que tuviéramos esta oportunidad.' },
    ],
  },
  {
    slug: 'saber-parar-la-ley-olvidada-de-la-politica',
    tipo: 'articulo',
    title: 'Saber parar: la ley olvidada de la política que quiere gobernar',
    bajada:
      'En política se habla mucho de ganar y poco de saber perder. Y casi nunca de saber parar. Sin embargo, en la gestión pública, esa tercera capacidad suele ser la diferencia entre un liderazgo que administra poder y otro que se consume en su propio vértigo.',
    category: 'Liderazgo · Gestión',
    date: 'Marzo 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: false,
    published: true,
    source: { name: 'Confidencial', url: 'https://confidencial.ar/nota/1151/saber-parar-la-ley-olvidada-de-la-politica-que-quiere-gobernar/' },
    content: [
      { type: 'paragraph', text: 'En política se habla mucho de ganar. Se habla menos de saber perder. Y casi nunca se habla de saber parar. Sin embargo, en la gestión pública, esa tercera capacidad suele ser la diferencia entre un liderazgo que administra poder y otro que se consume en su propio vértigo.' },
      { type: 'paragraph', text: 'Las 18 leyes estratégicas para saber ganar, saber perder y saber parar proponen una idea simple, pero incómoda: la política no se mide solo por la intensidad de sus batallas, sino por la inteligencia con que el liderazgo decide cuáles librar, cuáles evitar y cuáles cerrar a tiempo. No hay gobierno sostenible si cada día se vive como una campaña, cada desacuerdo como una guerra y cada corrección como una derrota.' },
      { type: 'heading', text: 'Ganar no es llegar' },
      { type: 'paragraph', text: 'Ganar, en democracia, puede significar obtener votos, instalar una agenda o conquistar un cargo. Pero gobernar exige algo más difícil: convertir esa victoria en autoridad, equipos, presupuesto, prioridades, resultados y confianza social. Una elección se puede ganar con clima, narrativa y oportunidad. Una gestión se sostiene con método, capacidad estatal y lectura del tiempo.' },
      { type: 'blockquote', text: 'Una victoria mal administrada empieza a convertirse en derrota cuando confunde relato con capacidad de gobierno.' },
      { type: 'paragraph', text: 'Uno de los errores más frecuentes de la política contemporánea es creer que el triunfo otorga, por sí solo, capacidad de gobierno. No es así. La victoria abre una oportunidad, pero no reemplaza la gestión. El gobierno que gana y no ordena expectativas empieza a perder antes de darse cuenta: promete más de lo que puede ejecutar, comunica más de lo que puede cumplir y expone más de lo que puede sostener.' },
      { type: 'paragraph', text: 'La gestión pública necesita una traducción concreta de la victoria: un gabinete con roles claros, una agenda breve y priorizada, indicadores verificables, coordinación territorial, escucha social y una comunicación que no sustituya los hechos. En tiempos de redes, una tendencia digital puede generar euforia, pero no siempre expresa mayoría social. Un viral puede dar visibilidad, pero no construye legitimidad.' },
      { type: 'heading', text: 'Saber perder' },
      { type: 'paragraph', text: 'En política, perder no siempre significa haber sido derrotado de manera definitiva. A veces una derrota deja capital moral, territorial o narrativo. A veces una política pública que no funcionó permite mejorar un programa. A veces un conflicto mal resuelto enseña más que un triunfo celebrado demasiado rápido.' },
      { type: 'paragraph', text: 'El problema aparece cuando los liderazgos niegan la derrota. En gestión pública, negar errores tiene costos institucionales: bloquea aprendizajes, posterga decisiones, debilita equipos y erosiona la confianza ciudadana. Un Estado que no reconoce fallas se vuelve ciego frente a sus propios datos. Y un gobierno que no corrige por temor a parecer débil termina siendo débil por no corregir.' },
      { type: 'paragraph', text: 'Aquí aparece una idea central: evaluar no es castigar; evaluar es gobernar mejor. Los indicadores, las auditorías, las mesas de seguimiento y la escucha ciudadana no deberían ser vistos como amenazas, sino como herramientas para ajustar rumbo.' },
      { type: 'heading', text: 'Saber parar' },
      { type: 'paragraph', text: 'La política suele premiar la reacción rápida, la frase contundente y la presencia permanente. Pero en la gestión pública, responder a todo puede ser una forma de perder estrategia. No toda provocación merece respuesta. No todo conflicto debe escalar. No toda medida debe sostenerse solo para no admitir costos.' },
      { type: 'paragraph', text: 'Saber parar puede significar bajar el tono de una disputa, retirar una mala iniciativa, rediseñar un programa, evitar una polarización artificial o suspender una decisión hasta contar con mejor evidencia. También puede significar dosificar la palabra pública. Cuando un liderazgo habla todo el tiempo, su palabra pierde peso. Cuando una gestión anuncia todos los días, el anuncio deja de ordenar expectativas. Cuando un gobierno responde cada ataque, termina viviendo dentro de la agenda del adversario.' },
      { type: 'paragraph', text: 'En una época de guerra cognitiva, donde la atención social está saturada y las emociones son organizadas por algoritmos, parar también es una decisión de gobierno. Bajar el voltaje puede ordenar la percepción pública más que competir en el desorden emocional.' },
      { type: 'paragraph', text: 'La medida final de un liderazgo público no debería ser solo cuántas veces gana, sino qué hace después de ganar, cómo actúa cuando pierde y si tiene la lucidez de parar cuando insistir empieza a dañar el interés general. Esa es la frontera entre la política como espectáculo y la política como responsabilidad.' },
      { type: 'paragraph', text: 'Saber ganar sin triunfalismo, saber perder sin negación y saber parar sin miedo a parecer débil. En esa triple condición puede encontrarse una pedagogía política para este tiempo: menos ansiedad por dominar la escena y más capacidad para gobernar la realidad.' },
    ],
  },
  {
    slug: 'guerra-cultural-guerra-cognitiva-y-democracia',
    tipo: 'articulo',
    title: 'Guerra cultural, guerra cognitiva y democracia',
    bajada:
      'Las democracias contemporáneas no atraviesan únicamente una etapa de polarización ideológica. Enfrentan una transformación de las condiciones bajo las cuales se disputa el sentido de lo público y se forma la opinión ciudadana.',
    category: 'Democracia · Comunicación',
    date: 'Febrero 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: false,
    published: true,
    source: { name: 'Confidencial', url: 'https://confidencial.ar/nota/1044/guerra-cultural-guerra-cognitiva-y-democracia-cuando-la-disputa-politica-se-libra-en-la-mente-de-los-ciudadanos/' },
    content: [
      { type: 'paragraph', text: 'Las democracias contemporáneas no atraviesan únicamente una etapa de polarización ideológica. En un sentido más profundo, enfrentan una transformación de las condiciones bajo las cuales se disputa el sentido de lo público, se organiza la atención social y se forma la opinión ciudadana.' },
      { type: 'heading', text: 'Cultural vs. cognitiva' },
      { type: 'paragraph', text: 'La guerra cultural refiere a disputas sobre valores, identidades, memoria, religión, seguridad, familia y nación. No se trata solo de desacuerdos políticos, sino de conflictos morales donde cada posición se presenta como defensora de una forma de vida amenazada por otra. Allí el adversario deja de ser simplemente un competidor electoral y pasa a convertirse en un enemigo cultural.' },
      { type: 'paragraph', text: 'La guerra cognitiva opera en otro plano. Su objetivo no es solamente discutir ideas, sino intervenir sobre cómo las personas perciben, sienten, recuerdan y reaccionan. La saturación informativa, la repetición constante, la viralidad, la segmentación algorítmica y la apelación emocional construyen un terreno donde importa menos demostrar una verdad que instalar una percepción.' },
      { type: 'blockquote', text: 'El campo de batalla ya no es el territorio sino la mente del ciudadano.' },
      { type: 'paragraph', text: 'Como explica Iván Redondo, no gana necesariamente quien tiene razón, sino quien logra imponer el marco desde el cual la sociedad interpreta la realidad. No es lo mismo hablar de ajuste fiscal que de ordenar el Estado: el lenguaje define el conflicto.' },
      { type: 'heading', text: 'La posverdad como clima' },
      { type: 'paragraph', text: 'La posverdad aparece como el clima ideal para esta dinámica. Los hechos pierden fuerza frente a emociones, identidades y creencias previas. La credibilidad ya no depende exclusivamente de la evidencia, sino de la afinidad afectiva y de la pertenencia grupal. La política deja de discutir datos para disputar percepciones.' },
      { type: 'paragraph', text: 'Pierre Bourdieu aporta una clave central: no todos los actores compiten en igualdad de condiciones. Quien posee mayor capital económico puede financiar campañas y presencia digital; quien posee mayor capital social moviliza redes de confianza; quien acumula capital simbólico tiene más posibilidades de ser creído. La batalla por la verdad pública también es una batalla por el poder.' },
      { type: 'heading', text: 'El riesgo democrático' },
      { type: 'paragraph', text: 'Cuando se debilita una verdad pública mínimamente compartida, se erosiona la posibilidad de deliberar racionalmente. Cuando la atención ciudadana queda capturada por secuencias permanentes de indignación, la democracia deja de ser un espacio de discusión para convertirse en una competencia por colonizar emociones.' },
      { type: 'paragraph', text: 'La respuesta no debe ser censurar ideas ni prohibir el conflicto político. El desafío consiste en proteger las condiciones de una deliberación legítima: transparencia en la publicidad política digital, trazabilidad de contenidos sintéticos, acceso a datos para auditoría pública, alfabetización mediática y resguardo frente a campañas coordinadas de manipulación.' },
      { type: 'paragraph', text: 'Defender la democracia no exige eliminar el desacuerdo, sino impedir que ese desacuerdo se transforme en manipulación sistemática. La libertad de expresión no se opone a la regulación democrática de los entornos informativos; por el contrario, la necesita para preservar pluralismo, integridad y confianza pública.' },
      { type: 'paragraph', text: 'En definitiva, la gran disputa de nuestro tiempo no es solamente quién gobierna, sino quién define qué es verdad, qué merece atención y qué termina siendo aceptado como sentido común.' },
    ],
  },
  {
    slug: 'gobernar-con-datos-para-reconstruir-la-confianza',
    tipo: 'estudio',
    title: 'Gobernar con datos para reconstruir la confianza democrática',
    bajada:
      'En tiempos de incertidumbre, la democracia no solo debe garantizar libertades: también debe demostrar capacidad para diagnosticar, planificar, ejecutar y evaluar políticas públicas que mejoren la vida de la ciudadanía.',
    category: 'Políticas Públicas · NOA',
    date: 'Abril 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: false,
    published: true,
    source: { name: 'El Tucumano', url: 'https://www.eltucumano.com/noticia/opinion/318313/gobernar-con-datos-para-reconstruir-la-confianza-democratica' },
    content: [
      { type: 'paragraph', text: 'En el siglo XXI, gobernar con datos y evidencias ya no es una opción técnica reservada a especialistas: es una obligación democrática. En sociedades atravesadas por la incertidumbre, el enojo y la desconfianza, la calidad de una gestión pública no puede medirse solo por su capacidad de comunicar, sino por su capacidad de comprender los problemas, intervenir con inteligencia y producir resultados concretos.' },
      { type: 'paragraph', text: 'La democracia nos dio libertades fundamentales que muchas veces damos por sentadas: poder opinar distinto, votar, estudiar, organizarnos, participar. Eso no es menor. Al contrario: es un patrimonio enorme que, como hijos de la democracia, debemos defender todos los días. Pero también es cierto que la democracia, para fortalecerse, necesita honrar esas libertades con resultados.' },
      { type: 'blockquote', text: '"No hacen nada y no solucionan." Esa frase, repetida en distintos rincones del país, encierra un diagnóstico político profundo.' },
      { type: 'paragraph', text: 'Cuando el Estado no resuelve, la sociedad empieza a expresar su frustración de la manera más directa posible. En la academia se habla de debilidad estatal o incluso de "Estado fallido". En los barrios, la definición es mucho más simple y brutal. La distancia entre el sistema democrático y las expectativas sociales crece cuando el Estado pierde capacidad de respuesta.' },
      { type: 'heading', text: 'El ciclo completo de una política pública' },
      { type: 'paragraph', text: 'Toda política pública seria debe comenzar por un diagnóstico certero y exhaustivo. No se puede transformar lo que no se comprende. No se puede intervenir bien sobre una realidad mal leída. Muchas veces los gobiernos se apuran a anunciar medidas, programas o planes sin haber identificado con precisión el problema que intentan resolver. Y cuando el diagnóstico es deficiente, lo que sigue suele ser una cadena de errores: recursos mal asignados, prioridades equivocadas, metas difusas y resultados pobres.' },
      { type: 'paragraph', text: 'Gobernar bien implica asumir que una política pública no nace con un anuncio ni se agota en una foto. Requiere atravesar un ciclo completo: diagnóstico, diseño, implementación, monitoreo y evaluación. Cada una de esas etapas es indispensable. Diagnosticar permite saber dónde estamos; diseñar, definir qué hacer; implementar, ejecutar con capacidad; monitorear, corregir a tiempo; evaluar, aprender y rendir cuentas. Sin ese recorrido, la gestión queda atrapada en la improvisación o en la intuición.' },
      { type: 'paragraph', text: 'Monitorear y evaluar, en particular, deben dejar de ser vistos como un lujo académico o como una exigencia burocrática. Son herramientas centrales para gobernar mejor. Medir el impacto de una política pública no significa desconfiar de la acción estatal; significa, precisamente, fortalecerla. Un Estado que mide es un Estado que aprende. Y un Estado que aprende es un Estado que puede reconstruir confianza.' },
      { type: 'heading', text: 'Capacidad estatal y "Nunca Más"' },
      { type: 'paragraph', text: 'El "Nunca Más", que cada 24 de marzo nos convoca a defender la democracia frente a cualquier forma de autoritarismo, también debería interpelarnos en términos de capacidades de gestión. Nunca más la improvisación como método. Nunca más la desorganización como respuesta. Nunca más gabinetes sin planificación, sin metas y sin criterios claros de seguimiento.' },
      { type: 'paragraph', text: 'Quienes hoy tienen responsabilidades públicas no solo deben tener legitimidad política; también deben construir capacidad estatal. Y eso supone formar equipos, fijar objetivos, ordenar prioridades, establecer estrategias y comunicar con claridad tanto hacia afuera como hacia adentro. Sin conducción clara, sin coordinación y sin planificación, la política se debilita y la gestión se dispersa.' },
      { type: 'heading', text: 'Tucumán y la cooperación democrática' },
      { type: 'paragraph', text: 'Tucumán tuvo recientemente una oportunidad importante para mostrar madurez institucional frente a una crisis climática que afectó a muchas familias. En este tipo de escenarios, la ciudadanía espera menos especulación política y más cooperación democrática. Las emergencias son momentos donde el Estado debe mostrarse robusto, cercano y eficaz, pero también donde la dirigencia en su conjunto puede estar a la altura de las circunstancias.' },
      { type: 'paragraph', text: 'Hubiese sido valioso consolidar un comité de crisis amplio, con participación del oficialismo y de sectores relevantes de la oposición. Un esquema así habría permitido al Gobierno provincial exhibir fortaleza institucional y capacidad de asistencia, y a la oposición no solo aportar ideas sino también conocer de primera mano la magnitud del problema. En contextos críticos, la coordinación política no debilita a nadie: fortalece a la democracia.' },
      { type: 'paragraph', text: 'Reconstruir los lazos entre ciudadanía y sistema democrático exige volver a lo esencial: escuchar, diagnosticar, planificar, medir y corregir. En otras palabras, exige gobernar mejor. Porque cuando la política se apoya en datos, en evidencia y en una ética de resultados, deja de administrar excusas y empieza a construir confianza.' },
    ],
  },
  {
    slug: 'creacion-perfil-linkedin',
    tipo: 'curso',
    title: 'Creación y optimización de tu perfil de LinkedIn',
    bajada:
      'Taller gratuito para construir un perfil profesional que comunique con claridad tu propósito, formación y proyectos. Pensado para quienes trabajan o quieren trabajar en lo público.',
    category: 'Taller gratuito',
    date: 'Inscripciones abiertas',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: false,
    published: false,
    enrollUrl: 'https://forms.gle/wAMyACoLPLcnSYFVA',
    content: [],
  },
]

export function getArticulo(slug: string): Article | undefined {
  return articulos.find((a) => a.slug === slug)
}
