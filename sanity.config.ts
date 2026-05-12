'use client'

/**
 * Sanity Studio config — embebido en Next.js, accesible en /studio
 * Doc: https://www.sanity.io/docs/api-versioning
 */

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemas'
import { apiVersion, dataset, projectId } from './src/sanity/env'

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Involucrarnos')
          .items([
            S.documentTypeListItem('articulo').title('Artículos / Cursos / Estudios'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  title: 'Involucrarnos — Admin',
})
