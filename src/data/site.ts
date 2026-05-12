export const site = {
  name: 'Involucrarnos',
  domain: 'involucrarnos.com.ar',
  location: 'Tucumán · NOA',

  meta: {
    title: 'Involucrarnos — Hub de políticas públicas del NOA',
    description:
      'Hub educativo abierto sobre políticas públicas, gestión estatal y desarrollo del norte argentino. Estudios con datos, artículos, cursos gratuitos y herramientas para pensar lo público en serio.',
    ogTitle: 'Involucrarnos',
    ogDescription: 'El hub de pensamiento público del NOA. Abierto, riguroso, gratis.',
  },

  nav: {
    links: [
      { href: '/#estudios',   label: 'Estudios'  },
      { href: '/#contenidos', label: 'Artículos' },
      { href: '/#cursos',     label: 'Cursos'    },
      { href: '/#nosotros',   label: 'Nosotros'  },
    ],
    cta: { href: '/#sumate', label: 'Sumate' },
  },

  hero: {
    eyebrow: 'Hub educativo · Políticas públicas · NOA',
    titleStart: 'El hub donde se',
    titleAccent: 'piensa, mide y construye lo público.',
    subtitle:
      'Investigaciones con datos, herramientas abiertas, cursos gratuitos y artículos rigurosos sobre el norte argentino y la gestión estatal.',
    ctaPrimary:   { href: '/#estudios', label: 'Ver estudios' },
    ctaSecondary: { href: '/#sumate',   label: 'Sumarme gratis' },
    pills: ['Estudios con datos', 'Cursos gratuitos', 'IA · Involucrado', 'Artículos libres'],
  },

  contenidos: {
    eyebrow: 'Artículos',
    title: 'Análisis y reflexión',
    subtitle:
      'Lecturas breves sobre política, gestión pública y desarrollo del NOA. Acceso libre — sin paywall, sin letra chica.',
    upcomingLabel: 'En preparación',
  },

  cursos: {
    eyebrow: 'Cursos · Talleres',
    title: 'Formación práctica, gratuita',
    subtitle:
      'Talleres breves para fortalecer herramientas concretas que sirven en la vida pública y profesional.',
    proxLabel: 'Próximos cursos',
    emptyMsg: 'Más talleres en preparación.',
  },

  estudios: {
    eyebrow: 'Estudios',
    title: 'Investigación con datos sobre el NOA',
    subtitle:
      'Diagnósticos territoriales, indicadores comparados y análisis aplicado. Metodología abierta, datos verificables.',
    methodLabel: 'Metodología',
    findingsLabel: 'Hallazgos clave',
    statsLabel: 'Datos destacados',
  },

  proyectos: {
    eyebrow: 'Proyectos abiertos',
    title: 'Herramientas, dashboards y programas',
    subtitle:
      'Iniciativas que construimos en abierto. Desde una IA experta hasta un observatorio de datos del NOA. Sumate, usalas, mejoralas.',
    statusLabels: {
      activo:        'Activo',
      construccion:  'En construcción',
      planificacion: 'En planificación',
      proximamente:  'Próximamente',
    },
  },

  hub: {
    eyebrow: 'Por qué Involucrarnos',
    title: 'El hueco que llenamos',
    items: [
      {
        icon: 'open',
        titulo: '100% open access',
        detalle: 'Sin paywalls, sin suscripciones, sin extractos teaser. Todo lo que publicamos es de descarga libre.',
      },
      {
        icon: 'rigor',
        titulo: 'Rigor sin academicismo',
        detalle: 'Metodología verificable. Lenguaje claro. Sin jerga innecesaria. Pensado para servir, no para mostrar credenciales.',
      },
      {
        icon: 'noa',
        titulo: 'Foco NOA, sin traducción',
        detalle: 'Pensado desde Tucumán, Salta, Jujuy y Catamarca. No es contenido nacional adaptado: es investigación nuestra.',
      },
      {
        icon: 'tools',
        titulo: 'Herramientas, no solo lectura',
        detalle: 'IA especializada, generadores de diagnóstico, dashboards. Te llevás contenido y también instrumentos para trabajar.',
      },
      {
        icon: 'neutral',
        titulo: 'Sin partidismo barato',
        detalle: 'Defendemos la democracia y la calidad institucional. Discutimos métodos, no listas. Sin cinismo ni voluntarismo.',
      },
      {
        icon: 'practical',
        titulo: 'Para dirigentes, funcionarios y ciudadanos',
        detalle: 'Hecho para quienes deciden, asesoran o quieren entender mejor cómo se gobierna.',
      },
    ],
  },

  tipos: {
    articulo: { label: 'Artículo',  plural: 'Artículos'  },
    estudio:  { label: 'Estudio',   plural: 'Estudios'   },
    curso:    { label: 'Curso',     plural: 'Cursos'     },
  } as const,

  nosotros: {
    eyebrow: 'Quiénes somos',
    titleStart: 'Conocimiento abierto,',
    titleAccent: 'comunidad que aprende.',
    paragraphs: [
      'Involucrarnos nació de una convicción simple: el conocimiento sobre política y gestión pública no debería estar reservado a unos pocos.',
      'Somos una comunidad educativa abierta. Compartimos estudios, artículos y cursos gratuitos para que cada vez más personas tengan herramientas reales para pensar lo público.',
      'Desde el NOA, conectamos análisis, evidencia y formación con una comunidad que quiere entender mejor — y participar mejor.',
    ],
    valores: [
      { titulo: 'Libre y gratuito', detalle: 'Todo lo que publicamos es de acceso abierto.' },
      { titulo: 'Con rigor',        detalle: 'Evidencia y políticas públicas como base de cada contenido.' },
      { titulo: 'Desde el NOA',     detalle: 'Pensado desde el norte argentino, no traducido del centro.' },
    ],
    founderName: 'Exequiel Soria Arruñada',
    founderRole: 'Fundador',
    founderBio:
      'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, Universidad Autónoma de Madrid. Tucumano. Convencido de que el acceso al conocimiento transforma comunidades.',
    tags: ['Políticas Públicas', 'Gestión Estatal', 'Formación', 'NOA'],
  },

  sumate: {
    eyebrow: 'Sumate gratis',
    title: 'Aprendé en comunidad',
    subtitle:
      'Cada nuevo estudio, artículo o curso te llega directo a tu mail.',
    beneficios: [
      'Estudios y artículos nuevos',
      'Avisos de cursos gratuitos',
      'Recursos para seguir formándote',
    ],
    namePlaceholder: 'Tu nombre (opcional)',
    emailPlaceholder: 'tu@email.com',
    submitLabel: 'Sumarme',
    submitLoading: 'Enviando…',
    successTitle: '¡Ya sos parte!',
    successBody: 'Te llegará un mail de confirmación. Revisá tu bandeja de entrada.',
    fineprint: 'Sin spam. Podés desuscribirte cuando quieras.',
  },

  articleCta: {
    title: '¿Te sirvió esta lectura?',
    body: 'Sumate a la comunidad y recibí el próximo estudio, artículo o curso directo en tu mail.',
    label: 'Sumarme',
  },

  footer: {
    tagline:
      'Comunidad educativa abierta. Estudios, artículos y cursos gratuitos sobre política, gestión pública y desarrollo del NOA.',
    rights: 'Todos los derechos reservados.',
  },

  whatsapp: {
    number: '549XXXXXXXXXX',
    message: '¡Hola! Me interesa sumarme a la comunidad Involucrarnos.',
    label: 'Contactanos por WhatsApp',
  },
} as const

export type TipoContenido = keyof typeof site.tipos
