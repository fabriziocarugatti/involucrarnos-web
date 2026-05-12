import { MetadataRoute } from 'next'
import { articulos } from '@/data/articulos'
import { estudios } from '@/data/estudios'

const BASE = 'https://involucrarnos.com.ar'

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls = articulos
    .filter((a) => a.published)
    .map((a) => ({
      url: `${BASE}/articulos/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const studyUrls = estudios
    .filter((e) => e.status === 'publicado')
    .map((e) => ({
      url: `${BASE}/estudios/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/proyectos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...studyUrls,
    ...articleUrls,
  ]
}
