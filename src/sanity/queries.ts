/**
 * GROQ queries para fetching de contenido desde Sanity.
 * Si Sanity no está configurado, devolvemos los datos del archivo local articulos.ts.
 */

import { sanityClient } from './client'
import { articulos as localArticulos, type Article } from '@/data/articulos'

const ARTICLE_PROJECTION = `
  "slug": slug.current,
  tipo,
  title,
  bajada,
  category,
  date,
  author,
  authorRole,
  featured,
  published,
  enrollUrl,
  "authorPhoto": authorPhoto.asset->url,
  "coverImage": coverImage.asset->url,
  source,
  content
`

export async function getAllArticulos(): Promise<Article[]> {
  if (!sanityClient) return localArticulos
  try {
    const res = await sanityClient.fetch<Article[]>(
      `*[_type == "articulo"] | order(coalesce(orderRank, _createdAt) desc) { ${ARTICLE_PROJECTION} }`,
      {},
      { next: { revalidate: 60, tags: ['articulos'] } }
    )
    return res?.length ? res : localArticulos
  } catch (e) {
    console.error('[sanity] getAllArticulos fallback to local', e)
    return localArticulos
  }
}

export async function getArticuloBySlug(slug: string): Promise<Article | null> {
  if (!sanityClient) {
    return localArticulos.find((a) => a.slug === slug) ?? null
  }
  try {
    const res = await sanityClient.fetch<Article>(
      `*[_type == "articulo" && slug.current == $slug][0] { ${ARTICLE_PROJECTION} }`,
      { slug },
      { next: { revalidate: 60, tags: [`articulo:${slug}`] } }
    )
    return res ?? localArticulos.find((a) => a.slug === slug) ?? null
  } catch (e) {
    console.error('[sanity] getArticuloBySlug fallback to local', e)
    return localArticulos.find((a) => a.slug === slug) ?? null
  }
}
