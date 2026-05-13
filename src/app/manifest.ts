import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Involucrarnos',
    short_name: 'Involucrarnos',
    description:
      'Hub educativo abierto sobre políticas públicas, gestión estatal y desarrollo del NOA argentino.',
    start_url: '/',
    display: 'standalone',
    background_color: '#161a4c',
    theme_color: '#161a4c',
    orientation: 'portrait',
    categories: ['education', 'news', 'politics'],
    lang: 'es-AR',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'apple touch icon' },
    ],
  }
}
