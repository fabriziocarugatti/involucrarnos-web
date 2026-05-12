/**
 * Variables de entorno de Sanity con validación.
 */

export const apiVersion = '2024-10-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const useCdn = false

export const sanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // Devolvemos un valor placeholder durante build local — Sanity se "activa"
    // sólo cuando las vars reales estén configuradas en Vercel.
    return '' as unknown as T
  }
  return v
}
