/**
 * Sanity Studio mounting point. Renders the admin at /studio.
 * Only works when NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'
export const metadata = {
  title: 'Involucrarnos — Admin',
  robots: { index: false, follow: false },
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
