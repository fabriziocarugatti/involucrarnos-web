import { defineField, defineType } from 'sanity'

export const autor = defineType({
  name: 'autor',
  title: 'Autores',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rol / Descripción',
      type: 'string',
      description: 'Ej: Magíster en Políticas Públicas · UAM',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto de perfil',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio corta (opcional)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn (opcional)',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
