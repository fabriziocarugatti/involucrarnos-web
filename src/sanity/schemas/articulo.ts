import { defineField, defineType } from 'sanity'

export const articulo = defineType({
  name: 'articulo',
  title: 'Artículo / Contenido',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Artículo', value: 'articulo' },
          { title: 'Estudio', value: 'estudio' },
          { title: 'Curso', value: 'curso' },
        ],
        layout: 'radio',
      },
      initialValue: 'articulo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bajada',
      title: 'Bajada / Resumen',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      description: 'Ej: Democracia · Gestión pública',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha / Estado',
      type: 'string',
      description: 'Texto libre: "Mayo 2026", "En preparación", "Inscripciones abiertas"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor/a',
      type: 'string',
      initialValue: 'Exequiel Soria Arruñada',
    }),
    defineField({
      name: 'authorRole',
      title: 'Rol del autor',
      type: 'string',
      initialValue:
        'Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos Humanos, UAM.',
    }),
    defineField({
      name: 'authorPhoto',
      title: 'Foto del autor (opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada (opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'enrollUrl',
      title: 'URL de inscripción (sólo cursos)',
      type: 'url',
      hidden: ({ document }) => document?.tipo !== 'curso',
    }),
    defineField({
      name: 'source',
      title: 'Fuente original (si fue publicado en otro medio)',
      type: 'object',
      fields: [
        { name: 'name', title: 'Nombre del medio', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'block',
          fields: [
            {
              name: 'type',
              type: 'string',
              options: {
                list: [
                  { title: 'Párrafo', value: 'paragraph' },
                  { title: 'Subtítulo (heading)', value: 'heading' },
                  { title: 'Cita (blockquote)', value: 'blockquote' },
                ],
                layout: 'radio',
              },
              initialValue: 'paragraph',
            },
            { name: 'text', type: 'text', rows: 4 },
          ],
          preview: {
            select: { type: 'type', text: 'text' },
            prepare({ type, text }) {
              return {
                title: text?.slice(0, 80) ?? '(vacío)',
                subtitle: type,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
