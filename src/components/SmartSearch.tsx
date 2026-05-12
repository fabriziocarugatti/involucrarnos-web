'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Loader2, Sparkles, ArrowUpRight } from 'lucide-react'
import { ease } from '@/lib/motion'

type Kind = 'articulo' | 'estudio' | 'proyecto' | 'curso'
interface Result {
  slug: string
  kind: Kind
  relevance: number
  why: string
}

const KIND_LABELS: Record<Kind, string> = {
  articulo: 'Artículo',
  estudio:  'Estudio',
  proyecto: 'Proyecto',
  curso:    'Curso',
}

const KIND_HREF: Record<Kind, (slug: string) => string> = {
  articulo: (s) => `/articulos/${s}`,
  estudio:  (s) => `/estudios/${s}`,
  proyecto: (s) => `/#proyectos`,
  curso:    (s) => `/#cursos`,
}

export default function SmartSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // open with Cmd+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function doSearch(e?: FormEvent) {
    e?.preventDefault()
    const q = query.trim()
    if (q.length < 3) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Falló')
      setResults(data.results ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Algo salió mal')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Buscar en el sitio"
        className="hidden md:inline-flex items-center gap-2 text-sm text-texto/55 hover:text-texto/90
                   bg-crema/60 hover:bg-crema border border-black/10 rounded-lg
                   px-3 py-2 transition-colors"
      >
        <Search size={14} strokeWidth={2} />
        <span>Buscar</span>
        <span className="ml-2 text-[0.65rem] text-texto/35 bg-white border border-black/8 rounded px-1.5 py-0.5 font-mono">
          ⌘K
        </span>
      </button>

      <button
        onClick={() => setOpen(true)}
        aria-label="Buscar"
        className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg
                   text-texto/70 hover:bg-azul/5 transition-colors"
      >
        <Search size={18} strokeWidth={2} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-azul-deep/70 backdrop-blur-md p-4 md:pt-24 md:px-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: ease.outExpo }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_24px_72px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col max-h-[80vh]"
              role="dialog"
              aria-label="Búsqueda"
            >
              <form onSubmit={doSearch} className="flex items-center gap-3 border-b border-black/8 px-5 py-4">
                <Sparkles size={18} strokeWidth={2} className="text-dorado-deep flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="¿Qué estás buscando? Preguntá en lenguaje natural…"
                  className="flex-1 bg-transparent text-[0.95rem] text-texto placeholder:text-texto/40 focus:outline-none"
                />
                {loading && <Loader2 size={16} className="animate-spin text-texto/40" />}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-texto/40 hover:bg-azul/5 transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={16} />
                </button>
              </form>

              <div className="flex-1 overflow-y-auto p-3">
                {query.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-texto/55 text-sm mb-4">
                      Búsqueda inteligente — entiende preguntas, no solo keywords.
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {[
                        '¿qué dice Exequiel sobre evaluar políticas?',
                        'datos de femicidios',
                        'empleo público en el norte',
                      ].map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setQuery(s)
                            setTimeout(() => doSearch(), 0)
                          }}
                          className="text-xs text-azul-dark bg-crema/60 hover:bg-dorado/15 border border-black/8 hover:border-dorado/40 rounded-full px-3 py-1.5 transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {error && (
                  <p className="px-4 py-3 text-sm text-rose-600 bg-rose-50 rounded-lg">{error}</p>
                )}

                {!loading && query && results.length === 0 && !error && (
                  <p className="p-6 text-center text-sm text-texto/45">
                    Sin resultados. Probá otras palabras o preguntá distinto.
                  </p>
                )}

                {results.length > 0 && (
                  <ul className="space-y-1">
                    {results.map((r) => (
                      <li key={r.slug}>
                        <a
                          href={KIND_HREF[r.kind](r.slug)}
                          onClick={() => setOpen(false)}
                          className="group flex items-start gap-3 p-3 rounded-xl hover:bg-crema/60 transition-colors"
                        >
                          <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-azul/10 text-azul-dark text-[0.65rem] font-bold tracking-widest uppercase">
                            {KIND_LABELS[r.kind][0]}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[0.62rem] font-bold tracking-widest uppercase text-dorado-deep">
                                {KIND_LABELS[r.kind]}
                              </span>
                              <span className="text-[0.62rem] text-texto/40">
                                {Math.round(r.relevance * 100)}% match
                              </span>
                            </div>
                            <p className="text-sm font-medium text-azul-dark group-hover:text-azul leading-snug">
                              {r.slug.replace(/-/g, ' ')}
                            </p>
                            <p className="text-xs text-texto/55 leading-snug mt-1">{r.why}</p>
                          </div>
                          <ArrowUpRight
                            size={14}
                            strokeWidth={2}
                            className="flex-shrink-0 mt-2 text-texto/30 group-hover:text-azul transition-colors"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-black/8 px-4 py-2 text-[0.65rem] text-texto/40 flex items-center justify-between">
                <span>IA · gratis</span>
                <span className="font-mono">ESC para cerrar</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
