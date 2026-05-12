export const site = {
  name: 'Involucrarnos',
  domain: 'involucrarnos.com.ar',
  location: 'Tucumán · NOA',

  meta: {
    title: 'Involucrarnos — Comunidad educativa',
    description:
      'Comunidad educativa abierta. Estudios, artículos y cursos gratuitos para pensar lo público con herramientas reales.',
    ogTitle: 'Involucrarnos',
    ogDescription: 'Pensar lo público, aprender en comunidad.',
  },

  nav: {
    links: [
      { href: '/#contenidos', label: 'Artículos' },
      { href: '/#cursos',     label: 'Cursos'    },
      { href: '/#estudios',   label: 'Estudios'  },
      { href: '/#nosotros',   label: 'Nosotros'  },
    ],
    cta: { href: '/#sumate', label: 'Sumate' },
  },

  hero: {
    eyebrow: 'Comunidad educativa abierta',
    titleStart: 'Pensar lo público,',
    titleAccent: 'aprender en comunidad.',
    subtitle:
      'Estudios, artículos y cursos gratuitos sobre política, gestión pública y desarrollo del NOA. Para quienes quieren entender — y participar — mejor.',
    ctaPrimary:   { href: '/#contenidos', label: 'Explorar contenidos' },
    ctaSecondary: { href: '/#sumate',     label: 'Sumarme gratis' },
    pills: ['Artículos', 'Estudios', 'Cursos gratuitos'],
  },

  contenidos: {
    eyebrow: 'Artículos',
    title: 'Análisis y reflexión',
    subtitle:
      'Lecturas breves sobre política, gestión pública y desarrollo del NOA. Todo de acceso libre.',
    upcomingLabel: 'En preparación',
  },

  cursos: {
    eyebrow: 'Cursos · Talleres',
    title: 'Formación práctica, gratuita',
    subtitle:
      'Talleres breves para fortalecer herramientas concretas que sirven en la vida pública y profesional. Acceso abierto.',
    proxLabel: 'Próximos cursos',
    emptyMsg: 'Más talleres en preparación.',
  },

  estudios: {
    eyebrow: 'Estudios',
    title: 'Investigación aplicada',
    subtitle:
      'Análisis con datos, casos comparados y diagnósticos territoriales del NOA. Próximamente.',
    upcomingMsg:
      'Estamos preparando los primeros estudios. Sumate a la comunidad para recibirlos cuando salgan.',
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
