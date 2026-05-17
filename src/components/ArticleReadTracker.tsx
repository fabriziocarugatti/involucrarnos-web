'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  slug: string
  thresholdMs?: number
}

export default function ArticleReadTracker({ slug, thresholdMs = 60_000 }: Props) {
  useEffect(() => {
    const id = window.setTimeout(() => {
      trackEvent('articulo_leido', { slug })
    }, thresholdMs)
    return () => window.clearTimeout(id)
  }, [slug, thresholdMs])

  return null
}
