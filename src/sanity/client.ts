import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from './env'

export const sanityClient =
  projectId && dataset
    ? createClient({ apiVersion, dataset, projectId, useCdn })
    : null
