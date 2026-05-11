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
}

export const articulos: Article[] = [
  {
    slug: 'gobernar-mejor-es-honrar-la-democracia',
    tipo: 'articulo',
    title: 'Gobernar mejor es también honrar la democracia',
    bajada:
      'A 50 años del golpe, el Nunca Más sigue siendo una convocatoria a defender las libertades fundamentales. Pero en 2026, esa defensa exige algo más: traducir la legitimidad democrática en capacidad real de gobierno.',
    category: 'Democracia',
    date: 'Mayo 2026',
    author: 'Exequiel Soria Arruñada',
    authorRole: 'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, UAM.',
    featured: true,
    published: true,
    content: [
      {
        type: 'paragraph',
        text: 'El 24 de marzo no es solo una fecha de memoria. Es también una pregunta activa: ¿qué hacemos con la democracia que recuperamos? La respuesta no puede limitarse a la conmemoración. Necesita traducirse en acción institucional concreta.',
      },
      {
        type: 'paragraph',
        text: 'A cincuenta años del golpe, el Nunca Más sigue siendo una convocatoria ética insoslayable. Pero en el contexto político de 2026, esa convocatoria tiene una dimensión adicional: la obligación de gobernar bien. Porque una democracia que no entrega resultados tangibles para sus ciudadanos se erosiona desde adentro, sin necesidad de tanques en la calle.',
      },
      { type: 'heading', text: 'El déficit de capacidad estatal' },
      {
        type: 'paragraph',
        text: 'Argentina tiene una democracia robusta en términos electorales. Lo que le falta es capacidad estatal real: la posibilidad concreta de convertir decisiones políticas en políticas públicas efectivas.',
      },
      {
        type: 'paragraph',
        text: 'Este déficit no es nuevo. Pero se ha profundizado. La distancia entre lo que el Estado promete y lo que efectivamente puede ejecutar es hoy uno de los factores más corrosivos para la legitimidad democrática. Cuando el Estado no puede prestar servicios básicos con calidad — cuando los hospitales no tienen insumos, cuando las escuelas no pueden garantizar trayectorias educativas completas, cuando la burocracia es un laberinto kafkiano — la democracia sangra.',
      },
      {
        type: 'paragraph',
        text: 'El discurso libertario aprovecha ese sangrado con cierta lógica: si el Estado falla, ¿para qué querer más Estado? Es un argumento simple y efectivo. Y seguirá siendo efectivo mientras los que creemos en lo público no demostremos, con hechos, que el Estado puede funcionar bien.',
      },
      { type: 'blockquote', text: 'Gobernar bien no es una opción técnica. Es una obligación democrática.' },
      {
        type: 'paragraph',
        text: 'La respuesta no es destruir el Estado. Es reformarlo. Es construir capacidad institucional genuina, basada en evidencia, con métricas de resultado y rendición de cuentas real. No como concesión al neoliberalismo, sino como condición para que la política progresista sea creíble.',
      },
      { type: 'heading', text: 'Una generación con otra mirada' },
      {
        type: 'paragraph',
        text: 'Hay en Argentina una generación de 25 a 40 años que no tiene nostalgia peronista ni anti-peronista. Que vivió la crisis de 2001, la recuperación pos-kirchnerista, y ahora la experiencia libertaria. Que no quiere volver a ningún pasado, pero tampoco acepta que el futuro tenga que ser el desmantelamiento de lo público.',
      },
      {
        type: 'paragraph',
        text: 'Esa generación ve la reforma del Estado no como una traición ideológica, sino como una necesidad técnica. Ve la gestión basada en evidencia no como tecnocracia fría, sino como respeto concreto hacia la ciudadanía. Ve la política como una profesión que puede ejercerse con rigor intelectual, vocación de servicio y transparencia en los resultados.',
      },
      {
        type: 'paragraph',
        text: 'En el NOA, esa generación existe. Hay jóvenes dirigentes que se formaron afuera y volvieron. Que estudian gestión pública y política comparada. Que saben que Tucumán tiene problemas estructurales que no se resuelven con voluntarismo ni con populismo, sino con estrategia, datos y construcción institucional sostenida.',
      },
      {
        type: 'paragraph',
        text: 'Desde Involucrarnos apostamos a ese espacio. A una política que no sea el voluntarismo sin gestión ni el cinismo sin propuesta. A una forma de hacer las cosas que entienda que el Nunca Más no fue solo una promesa de no repetir la violencia — fue también una promesa de hacer funcionar la democracia.',
      },
      {
        type: 'paragraph',
        text: 'Esa es la deuda pendiente. Y saldarla es, hoy, la forma más honesta de honrar a quienes pusieron el cuerpo para que tuviéramos esta oportunidad.',
      },
    ],
  },
  {
    slug: 'reformar-el-estado-no-destruirlo',
    tipo: 'articulo',
    title: 'Reformar el Estado, no destruirlo',
    bajada:
      'La diferencia entre un Estado inteligente y un Estado fallido. Por qué el problema no es el tamaño, sino la capacidad.',
    category: 'Gestión pública',
    date: 'En preparación',
    author: 'Exequiel Soria Arruñada',
    authorRole: 'Magíster en Políticas Públicas.',
    featured: false,
    published: false,
    content: [],
  },
  {
    slug: 'bonos-verdes-tucuman',
    tipo: 'estudio',
    title: 'Bonos verdes: el instrumento que nadie en Tucumán usa',
    bajada:
      'Herramientas de financiamiento sostenible que existen, pero que ningún municipio del NOA ha sabido aprovechar.',
    category: 'Desarrollo local',
    date: 'En preparación',
    author: 'Exequiel Soria Arruñada',
    authorRole: 'Magíster en Políticas Públicas.',
    featured: false,
    published: false,
    content: [],
  },
  {
    slug: 'introduccion-politicas-publicas',
    tipo: 'curso',
    title: 'Introducción a las políticas públicas',
    bajada:
      'Curso gratuito de 6 clases breves. Conceptos, herramientas y casos para entender cómo se diseña una política pública.',
    category: 'Curso gratuito',
    date: 'En preparación',
    author: 'Exequiel Soria Arruñada',
    authorRole: 'Magíster en Políticas Públicas.',
    featured: false,
    published: false,
    content: [],
  },
]

export function getArticulo(slug: string): Article | undefined {
  return articulos.find((a) => a.slug === slug)
}
