/**
 * Sube los artículos de src/data/articulos.ts a Sanity.
 *
 * Uso:
 *   1. Crear token con permisos de Editor en https://sanity.io/manage → API → Tokens
 *   2. SANITY_WRITE_TOKEN=skXXXX node scripts/migrate-to-sanity.mjs
 */

import { createClient } from '@sanity/client'
import { articulos } from '../src/data/articulos'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId) {
  console.error('❌ Falta NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}
if (!token) {
  console.error('❌ Falta SANITY_WRITE_TOKEN — crear uno en sanity.io/manage → API → Tokens (Editor)')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-10-01',
  useCdn: false,
})

async function migrate() {
  console.log(`📤 Subiendo ${articulos.length} artículos a Sanity (${projectId}/${dataset})...\n`)

  for (const a of articulos) {
    const doc = {
      _type: 'articulo',
      _id: `articulo-${a.slug}`,
      slug: { current: a.slug },
      title: a.title,
      tipo: a.tipo,
      bajada: a.bajada,
      category: a.category,
      date: a.date,
      author: a.author,
      authorRole: a.authorRole,
      featured: a.featured,
      published: a.published,
      enrollUrl: a.enrollUrl,
      source: a.source,
      content: a.content.map((b, i) => ({
        _type: 'block',
        _key: `b${i}`,
        type: b.type,
        text: b.text,
      })),
    }

    try {
      await client.createOrReplace(doc)
      console.log(`✓ ${a.slug}`)
    } catch (e) {
      console.error(`✗ ${a.slug}:`, e.message)
    }
  }

  console.log('\n✅ Migración completa.')
  console.log(`   Studio: https://involucrarnos.com.ar/studio`)
}

migrate().catch((e) => {
  console.error(e)
  process.exit(1)
})
