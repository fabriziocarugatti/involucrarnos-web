'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2, Loader2, X } from 'lucide-react'

interface Props {
  cursoNombre: string
  cursoSlug?: string
  /** If true, renders inline (expanded); if false, starts with a button that expands the form */
  inline?: boolean
  className?: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function InscripcionForm({ cursoNombre, cursoSlug, inline = false, className = '' }: Props) {
  const [open, setOpen] = useState(inline)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/inscripcion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, curso: cursoNombre, cursoSlug }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al inscribirse')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Algo salió mal. Intentá de nuevo.')
    }
  }

  if (!open) {
    return (
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 360, damping: 20 }}
        className={`inline-flex items-center gap-2 bg-dorado text-azul-dark
                   font-bold text-sm px-6 py-3 rounded-xl
                   hover:bg-dorado-soft transition-colors
                   shadow-[0_8px_24px_rgba(200,169,106,0.4)] ${className}`}
      >
        Inscribirme gratis
        <ArrowRight size={14} strokeWidth={2.4} />
      </motion.button>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 border border-dorado/30 rounded-2xl p-6 text-center"
        >
          <CheckCircle2 size={40} strokeWidth={1.6} className="text-dorado mx-auto mb-3" />
          <p className="font-title font-black text-white text-lg mb-1">¡Listo! Quedaste inscripto/a</p>
          <p className="text-white/60 text-sm">
            Te escribimos a <span className="text-dorado font-medium">{email}</span> cuando el curso arranque.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className={`bg-white/[0.06] border border-dorado/20 rounded-2xl p-5 flex flex-col gap-3 ${className}`}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[0.65rem] font-bold tracking-widest uppercase text-dorado">
              Inscripción gratuita
            </p>
            {!inline && (
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Tu nombre (opcional)"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10
                       text-white text-sm placeholder-white/30
                       focus:outline-none focus:border-dorado/50 focus:ring-1 focus:ring-dorado/20
                       transition-all"
          />
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10
                       text-white text-sm placeholder-white/30
                       focus:outline-none focus:border-dorado/50 focus:ring-1 focus:ring-dorado/20
                       transition-all"
          />

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 360, damping: 20 }}
            className="bg-dorado text-azul-dark font-bold text-sm px-5 py-2.5 rounded-xl
                       hover:bg-dorado-soft transition-colors disabled:opacity-60
                       flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Guardando…
              </>
            ) : (
              <>
                Confirmar inscripción
                <ArrowRight size={13} strokeWidth={2.4} />
              </>
            )}
          </motion.button>

          {status === 'error' && (
            <p className="text-red-400 text-xs" role="alert">{errorMsg}</p>
          )}
          <p className="text-white/25 text-[0.65rem] text-center">
            Sin spam. Sin costo. Te avisamos solo cuando el curso arranca.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
