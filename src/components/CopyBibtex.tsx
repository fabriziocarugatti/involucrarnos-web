'use client'

import { useState } from 'react'
import { Quote, Check } from 'lucide-react'
import type { Study } from '@/data/estudios'

interface Props {
  study: Study
}

function buildBibtex(s: Study): string {
  const year = s.date.match(/\d{4}/)?.[0] ?? new Date().getFullYear().toString()
  const key = `involucrarnos${year}${s.slug.replace(/-/g, '')}`
  const authors = s.authors.join(' and ')
  return `@misc{${key},
  author    = {${authors}},
  title     = {{${s.title}}},
  year      = {${year}},
  note      = {${s.category}. Período: ${s.period}.},
  howpublished = {\\url{https://involucrarnos.ar/estudios/${s.slug}}},
}`
}

export default function CopyBibtex({ study }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildBibtex(study))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard not available
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold text-azul-dark
                 border border-azul/20 rounded-lg px-3 py-1.5 hover:border-dorado/50
                 hover:bg-dorado/5 transition-colors"
    >
      {copied ? (
        <>
          <Check size={12} strokeWidth={2.4} className="text-emerald-600" />
          Copiado
        </>
      ) : (
        <>
          <Quote size={12} strokeWidth={2.2} />
          Citar (BibTeX)
        </>
      )}
    </button>
  )
}
