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
  /** Fecha real de publicación en ISO (YYYY-MM-DD) — usada para ordenar cronológicamente. El campo `date` es el texto que se muestra. */
  publishedAt?: string
}

/** Foto por defecto del autor (sobreescribible por articulo) */
export const DEFAULT_AUTHOR_PHOTO = '/assets/exequiel.jpg'

const AUTHOR = 'Exequiel Soria Arruñada'
const AUTHOR_ROLE =
  'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, UAM.'

const articulosRaw: Article[] = [
  {
    slug: 'reconstruir-sistema-educativo-tucuman',
    publishedAt: '2026-06-01',
    tipo: 'articulo',
    title: 'No alcanza con arreglar escuelas: hay que reconstruir el sistema educativo',
    bajada:
      'La crisis educativa exige una agenda integral: edificios dignos, aprendizajes medibles, innovación pública, leyes provinciales y participación responsable del sector privado.',
    category: 'Educación · Políticas Públicas',
    date: 'Junio 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: true,
    published: true,
    content: [
      { type: 'paragraph', text: 'Una escuela con techos rotos difícilmente pueda enseñar bien. Pero una escuela recién pintada, sin proyecto pedagógico, sin lectura, sin matemática, sin docentes acompañados y sin datos para saber quién aprende y quién queda atrás, tampoco transforma el futuro de sus estudiantes.' },
      { type: 'paragraph', text: 'La crisis educativa de Tucumán no puede leerse solo como un problema edilicio ni solo como un problema académico. Es ambas cosas a la vez. Es infraestructura deteriorada, pero también aprendizajes débiles. Es falta de mantenimiento, pero también trayectorias escolares frágiles. Es ausencia de inversión, pero también falta de planificación, medición, innovación y continuidad institucional.' },
      { type: 'paragraph', text: 'Por eso, la pregunta que deberíamos hacernos no es únicamente cuántas escuelas hay que reparar, sino qué tipo de escuela necesita Tucumán para los próximos veinte años.' },
      { type: 'paragraph', text: 'La educación tucumana exige pasar de la emergencia permanente a una estrategia de transformación. No se trata solo de arreglar paredes, baños o techos. Se trata de construir instituciones capaces de enseñar más, enseñar mejor, acompañar trayectorias y preparar a los jóvenes para la ciudadanía, el empleo, la universidad, la tecnología y la vida democrática.' },
      { type: 'heading', text: 'Pernambuco: una inspiración regional, no una receta automática' },
      { type: 'paragraph', text: 'Una experiencia latinoamericana puede ayudarnos a pensar. Pernambuco, en Brasil, era uno de los estados con peores indicadores educativos del país. En 2007 ocupaba el puesto 22 entre 27 estados en el índice nacional que mide desarrollo de la educación básica. Tenía altos niveles de abandono, repitencia y sobreedad. Sin embargo, en una década logró una transformación significativa: redujo drásticamente el abandono, mejoró la promoción, amplió la graduación y elevó los aprendizajes en Portugués y Matemática.' },
      { type: 'paragraph', text: 'El informe de CIPPEC sobre el caso muestra que el cambio no se produjo por una única medida, sino por una estrategia integral: prioridad política, metas por escuela, sistema de información, evaluación anual, currículum claro, formación docente, escuelas de tiempo integral, mejora de infraestructura y conversión progresiva de escuelas existentes.' },
      { type: 'blockquote', text: 'Pernambuco no mejoró porque hizo una sola cosa bien. Mejoró porque ordenó muchas decisiones en una misma dirección.' },
      { type: 'paragraph', text: 'Uno de sus aprendizajes más importantes es que la infraestructura escolar debe estar al servicio de un modelo pedagógico. La escuela de tiempo integral no requería solo más horas de clase: necesitaba comedor, cocina, laboratorios, salas docentes, espacios de tutoría, patios activos, conectividad, equipamiento y una organización escolar distinta. Es decir, el edificio dejó de ser pensado como contenedor y pasó a ser pensado como plataforma de aprendizaje.' },
      { type: 'paragraph', text: 'Tucumán puede tomar esa inspiración sin copiar mecánicamente. La provincia necesita un Plan Provincial de Infraestructura Escolar con Prioridad Pedagógica. No alcanza con reparar lo urgente. Hay que ordenar la inversión en tres niveles.' },
      { type: 'heading', text: 'Nivel 1: emergencia básica' },
      { type: 'paragraph', text: 'Agua, baños, electricidad, techos, ventilación, seguridad, accesibilidad y conectividad mínima. Ningún estudiante puede aprender dignamente si la escuela no garantiza condiciones elementales.' },
      { type: 'heading', text: 'Nivel 2: infraestructura pedagógica' },
      { type: 'paragraph', text: 'Aulas adecuadas, bibliotecas activas, laboratorios de ciencias, salas de informática, espacios de lectura, espacios de tutoría, salas docentes y equipamiento didáctico.' },
      { type: 'heading', text: 'Nivel 3: escuela integral' },
      { type: 'paragraph', text: 'Comedor, cocina, patios activos, espacios deportivos, arte, auditorio, salas multipropósito, conectividad robusta y condiciones para ampliar la jornada escolar.' },
      { type: 'blockquote', text: 'Cada obra pública educativa debería estar asociada a una mejora pedagógica medible.' },
      { type: 'heading', text: 'Escuelas Secundarias Integrales de Referencia' },
      { type: 'paragraph', text: 'La segunda decisión debería ser crear un programa de Escuelas Secundarias Integrales de Referencia. Tucumán no puede transformar todo el sistema al mismo tiempo, pero sí puede comenzar por un conjunto de escuelas estratégicas seleccionadas con criterios objetivos: vulnerabilidad social, bajo rendimiento, abandono, repitencia, factibilidad edilicia, ubicación territorial y posibilidad de articular con municipios, universidades y sector privado.' },
      { type: 'paragraph', text: 'Estas escuelas deberían tener jornada extendida o integral, comedor escolar, biblioteca activa, laboratorio de ciencias, conectividad, tutorías, orientación vocacional, clubes de lectura, ciencia, tecnología, deporte y cultura, articulación con formación profesional y seguimiento personalizado de estudiantes.' },
      { type: 'paragraph', text: 'El objetivo no sería crear escuelas de elite, sino escuelas públicas de referencia en los territorios donde más se necesita reconstruir oportunidades.' },
      { type: 'heading', text: 'Aprendizajes, datos y alerta temprana' },
      { type: 'paragraph', text: 'La tercera decisión es académica: una política provincial de comprensión lectora, matemática y trayectorias escolares. La crisis educativa no se resuelve solo con ladrillos. Tucumán necesita saber, escuela por escuela, cuántos estudiantes comprenden lo que leen, cuántos pueden resolver problemas matemáticos básicos, cuántos faltan sistemáticamente, cuántos repiten, cuántos abandonan y cuántos terminan la secundaria con aprendizajes reales.' },
      { type: 'blockquote', text: 'Evaluar no es castigar. Evaluar es saber dónde el Estado debe llegar antes y mejor.' },
      { type: 'paragraph', text: 'Por eso, la provincia necesita un tablero educativo con indicadores públicos y útiles: asistencia, abandono, repitencia, sobreedad, comprensión lectora, matemática, infraestructura, conectividad y terminalidad. Sin datos, la desigualdad se vuelve invisible. Sin seguimiento, las políticas se anuncian, pero no se corrigen.' },
      { type: 'heading', text: 'El rol del Poder Legislativo' },
      { type: 'paragraph', text: 'Aquí aparece un actor muchas veces subestimado: el Poder Legislativo. La Legislatura no solo puede debatir presupuestos o declarar emergencias. Puede construir arquitectura institucional para sostener políticas educativas más allá de una gestión.' },
      { type: 'paragraph', text: 'Tucumán debería discutir una Ley Provincial de Emergencia y Transformación Educativa, con metas a cuatro años, presupuesto protegido, indicadores públicos y rendición anual ante la Legislatura.' },
      { type: 'paragraph', text: 'También una Ley de Infraestructura Escolar con Prioridad Pedagógica, que obligue a construir un mapa público del estado edilicio de las escuelas, priorizar obras con criterios objetivos y vincular inversión con resultados educativos.' },
      { type: 'paragraph', text: 'Otra herramienta podría ser una Ley de Escuelas Secundarias Integrales de Referencia, para implementar gradualmente jornadas extendidas o integrales en zonas críticas, con proyecto pedagógico, comedor, tutorías y articulación con empleo joven.' },
      { type: 'paragraph', text: 'Además, Tucumán necesita una Ley de Datos, Evaluación y Alerta Temprana Educativa, que permita identificar estudiantes en riesgo de abandono antes de que sea tarde.' },
      { type: 'paragraph', text: 'Y, finalmente, una Ley de Compromiso Público-Privado por la Educación.' },
      { type: 'heading', text: 'Participación privada sin privatización' },
      { type: 'paragraph', text: 'Este punto requiere claridad. Hablar de participación privada en educación pública no debe significar privatización. El Estado debe conducir, regular, financiar, priorizar y garantizar derechos. Pero empresas, universidades, fundaciones, colegios profesionales, organizaciones sociales y sindicatos pueden participar responsablemente en una agenda educativa común.' },
      { type: 'paragraph', text: 'El sector privado puede aportar equipamiento, becas de conectividad, transporte, laboratorios, bibliotecas, mentorías profesionales, prácticas formativas, programas de lectura, formación técnica, tecnología y evaluación externa de impacto. Pero siempre con reglas públicas, convenios transparentes, rendición de cuentas, equidad territorial y prohibición de cualquier publicidad partidaria o empresarial dentro de la escuela.' },
      { type: 'paragraph', text: 'El modelo público-privado debe entenderse como corresponsabilidad social, no como reemplazo del Estado. La educación pública sigue siendo pública. Lo que cambia es que la sociedad deja de mirar la crisis educativa desde afuera y empieza a comprometer recursos, capacidades y conocimiento.' },
      { type: 'blockquote', text: 'Una escuela necesita techo, pero también necesita proyecto. Necesita bancos, pero también lectura. Necesita conectividad, pero también docentes acompañados. Necesita inversión, pero también gestión.' },
      { type: 'heading', text: 'Una nueva arquitectura pública para educar' },
      { type: 'paragraph', text: 'Tucumán no puede resignarse a discutir educación solo cuando una escuela se cae, cuando los resultados preocupan o cuando la emergencia vuelve a ocupar la agenda. La provincia necesita una política educativa que una infraestructura, aprendizaje, datos, legislación e innovación institucional.' },
      { type: 'paragraph', text: 'La educación tucumana no necesita solo obras: necesita una nueva arquitectura pública para volver a enseñar, aprender y construir futuro. Porque una provincia que quiere desarrollarse no puede mirar la escuela como gasto. Debe verla como la primera infraestructura del futuro.' },
      { type: 'paragraph', text: 'Referencia comparada: caso Pernambuco, Brasil, documentado por CIPPEC e Instituto Natura en el informe «La transformación de la secundaria en foco: el caso de Pernambuco en Brasil» (2020).' },
    ],
  },
  {
    slug: 'gobernar-con-datos-ciudades-inteligentes',
    publishedAt: '2026-06-12',
    tipo: 'articulo',
    title: 'Gobernar con datos: ciudades inteligentes para un Estado más cercano',
    bajada:
      'Argentina no necesita copiar modelos extranjeros, sino adaptar principios de buena gestión: medir, abrir datos, escuchar, coordinar áreas, evaluar y responder. La verdadera innovación pública no empieza con la tecnología, sino con la decisión política de construir instituciones más inteligentes y más cercanas a la ciudadanía.',
    category: 'Gestión · Datos',
    date: 'Junio 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: false,
    published: true,
    content: [
      { type: 'paragraph', text: 'El debate sobre la modernización del Estado suele quedar atrapado en una falsa dicotomía: más tecnología o menos burocracia. Sin embargo, el desafío es más profundo. Una institución pública moderna no es solamente la que digitaliza trámites, compra software o incorpora sensores urbanos. Es aquella que logra organizar información, coordinar equipos, escuchar a la ciudadanía, anticipar problemas y transformar datos en decisiones públicas concretas.' },
      { type: 'paragraph', text: 'En la Argentina, especialmente en municipios, provincias y organismos públicos con fuertes demandas territoriales, la gestión cotidiana está atravesada por urgencias: reclamos vecinales, obras demoradas, servicios que deben sostenerse, restricciones presupuestarias, conflictos sociales y demandas crecientes de transparencia. Frente a ese escenario, gobernar solo con intuición ya no alcanza.' },
      { type: 'paragraph', text: 'La intuición política sigue siendo necesaria, porque permite leer humores sociales, comprender el territorio y construir legitimidad. Pero necesita apoyarse en evidencia. Gobernar con evidencia no significa reemplazar la política por tecnocracia: significa mejorar la política. Significa que una decisión sobre alumbrado, transporte, residuos, seguridad, ambiente, obras públicas o atención ciudadana no dependa solo de percepciones aisladas, sino de información confiable, indicadores simples, mapas de demanda y seguimiento de resultados.' },
      { type: 'heading', text: 'Las ciudades exitosas no se copian: se interpretan' },
      { type: 'paragraph', text: 'Las experiencias internacionales sirven para pensar, no para importar recetas cerradas. Barcelona, Seúl, Buenos Aires, Medellín, Curitiba y Estonia muestran caminos distintos, pero comparten una misma lección: las ciudades y los gobiernos que mejor funcionan son aquellos que ordenan información, integran servicios, sostienen capacidades técnicas y colocan al ciudadano en el centro.' },
      { type: 'paragraph', text: 'Barcelona muestra que publicar información pública no es un gesto decorativo de transparencia, sino una infraestructura para mejorar servicios, promover investigación y facilitar el control ciudadano. Seúl recuerda que la ciudad inteligente no se limita a dispositivos: combina big data, servicios digitales y participación, y la clave está en construir capacidades para analizar los datos, no solo en acumularlos.' },
      { type: 'paragraph', text: 'Buenos Aires, con su portal BA Data, demuestra que la apertura de información también es local: que los datos puedan descargarse y reutilizarse amplía el ecosistema de control e innovación. Medellín aporta que no hay innovación pública sin participación: la legitimidad mejora cuando la ciudadanía es parte activa de la decisión. Curitiba prueba que una ciudad inteligente puede empezar por la planificación urbana integrada, no por la tecnología. Y Estonia muestra el valor de la interoperabilidad: conectar bases de datos públicas de forma segura para que el ciudadano no peregrine por oficinas que no se hablan entre sí.' },
      { type: 'heading', text: 'La agenda argentina: medir, abrir datos, escuchar y responder' },
      { type: 'paragraph', text: 'Argentina no necesita importar modelos cerrados. Necesita adaptar principios de gestión. El primero es medir: cada institución debería contar con tableros simples de gestión — reclamos recibidos, tiempos de respuesta, obras en ejecución, ejecución presupuestaria, cobertura territorial, metas cumplidas y satisfacción ciudadana.' },
      { type: 'paragraph', text: 'El segundo es abrir datos. La información pública no debe quedar encerrada en escritorios o planillas dispersas. Cuando se publica de manera clara, actualizada y reutilizable, crece la transparencia y la inteligencia colectiva: un periodista investiga, una universidad analiza, una organización social propone y un vecino controla.' },
      { type: 'paragraph', text: 'El tercero es escuchar. La cercanía real no se reduce a estar en redes ni a multiplicar anuncios: implica canales de atención, respuesta rápida, lenguaje claro, participación barrial y devolución pública. Un reclamo por una luminaria, una calle rota o un basural no es solamente una queja: es un dato territorial que ayuda a planificar mejor.' },
      { type: 'paragraph', text: 'El cuarto es coordinar áreas. Muchos problemas públicos fracasan no por falta de diagnóstico, sino por fragmentación institucional. Una gestión inteligente requiere interoperabilidad interna: que obras públicas, ambiente, desarrollo social, seguridad, educación, salud y hacienda compartan datos, criterios y objetivos.' },
      { type: 'paragraph', text: 'El quinto es evaluar. Una política pública no se juzga solo por el anuncio inicial, sino por los resultados que produce. Evaluar permite saber qué funciona, qué no y qué debe corregirse. Una gestión moderna no es la que nunca se equivoca: es la que aprende más rápido.' },
      { type: 'heading', text: 'Una hoja de ruta posible' },
      { type: 'paragraph', text: 'El camino no requiere grandes presupuestos iniciales, sino decisión política, orden institucional y continuidad: un tablero de indicadores prioritarios, un mapa de demandas y problemas territoriales, un canal único de atención y seguimiento de reclamos, una política de datos abiertos, un sistema de evaluación y corrección de políticas, capacitación de equipos, comunicación pública clara y verificable, participación ciudadana presencial y digital, y criterios éticos para proteger la privacidad y reducir las brechas digitales.' },
      { type: 'blockquote', text: 'Una ciudad inteligente que deja gente afuera no es inteligente: es desigual.' },
      { type: 'paragraph', text: 'La tecnología debe estar al servicio de los derechos. Gobernar con datos no puede convertirse en vigilancia, exclusión digital ni decisiones opacas: la innovación pública debe cuidar la privacidad, evitar sesgos e incluir a las personas mayores, los sectores populares y los ciudadanos sin conectividad.' },
      { type: 'paragraph', text: 'La discusión de fondo no es tecnológica, sino política e institucional. Se trata de decidir si el Estado seguirá administrando problemas de manera fragmentada o si dará un salto hacia una gestión más preventiva, transparente y orientada a resultados. No hay ciudad inteligente sin Estado inteligente. Y no hay Estado inteligente sin ciudadanos escuchados, datos bien usados, equipos capacitados y decisiones capaces de transformar la vida cotidiana. Gobernar con evidencia no enfría la política: la vuelve más humana, más eficaz y más justa.' },
    ],
  },
  {
    slug: 'gobernar-mejor-es-honrar-la-democracia',
    publishedAt: '2026-05-01',
    tipo: 'articulo',
    title: 'Gobernar mejor es también honrar la democracia',
    bajada:
      'A 50 años del golpe, el Nunca Más sigue siendo una convocatoria a defender las libertades fundamentales. Pero en 2026, esa defensa exige algo más: traducir la legitimidad democrática en capacidad real de gobierno.',
    category: 'Democracia',
    date: 'Mayo 2026',
    author: AUTHOR,
    authorRole: AUTHOR_ROLE,
    featured: false,
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
    publishedAt: '2026-05-06',
    tipo: 'articulo',
    title: 'Saber parar: la ley olvidada de la política que quiere gobernar',
    bajada:
      'En política se habla mucho de ganar y poco de saber perder. Y casi nunca de saber parar. Sin embargo, en la gestión pública, esa tercera capacidad suele ser la diferencia entre un liderazgo que administra poder y otro que se consume en su propio vértigo.',
    category: 'Liderazgo · Gestión',
    date: 'Mayo 2026',
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
    publishedAt: '2026-04-28',
    tipo: 'articulo',
    title: 'Guerra cultural, guerra cognitiva y democracia',
    bajada:
      'Las democracias contemporáneas no atraviesan únicamente una etapa de polarización ideológica. Enfrentan una transformación de las condiciones bajo las cuales se disputa el sentido de lo público y se forma la opinión ciudadana.',
    category: 'Democracia · Comunicación',
    date: 'Abril 2026',
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
    publishedAt: '2026-04-01',
    tipo: 'articulo',
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

/** Artículos ordenados cronológicamente (más nuevo primero). Los que no tienen `publishedAt` van al final. */
export const articulos: Article[] = [...articulosRaw].sort((a, b) =>
  (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
)

export function getArticulo(slug: string): Article | undefined {
  return articulos.find((a) => a.slug === slug)
}
