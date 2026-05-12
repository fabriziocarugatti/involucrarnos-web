import type { SchemaTypeDefinition } from 'sanity'
import { articulo } from './articulo'
import { autor } from './autor'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [autor, articulo],
}
