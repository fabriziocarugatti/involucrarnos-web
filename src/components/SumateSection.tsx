'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SumateSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al suscribirse')
      setStatus('success')
      setEmail('')
      setName('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Algo salió mal. Intentá de nuevo.')
    }
  }

  return (
    <section id="sumate" className="bg-crema py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mx-auto text-center reveal">
          <span className="inline-flex items-center gap-3 text-dorado text-xs font-bold tracking-widest uppercase mb-6 justify-center">
            <span className="block w-7 h-0.5 bg-dorado rounded" />
            Comunidad
            <span className="block w-7 h-0.5 bg-dorado rounded" />
          </span>
          <h2 className="font-title font-black text-azul-dark text-4xl md:text-5xl leading-tight tracking-tight mb-5">
            Sumate a Involucrarnos
          </h2>
          <p className="text-texto/60 leading-relaxed mb-10">
            Recibí análisis, artículos y reflexiones directamente en tu mail. Sin spam, sin
            algoritmos. Solo política que vale la pena leer.
          </p>

          {status === 'success' ? (
            <div className="bg-azul/5 border border-azul/15 rounded-2xl p-8">
              <div className="text-4xl mb-3">✓</div>
              <p className="font-title font-800 text-azul-dark text-lg mb-1">¡Ya estás dentro!</p>
              <p className="text-texto/50 text-sm">
                Te llegará un mail de confirmación. Revisá tu bandeja de entrada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Tu nombre (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-black/15 bg-white
                           text-texto placeholder-texto/30 focus:outline-none focus:border-azul/50
                           focus:ring-2 focus:ring-azul/10 transition-all text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-xl border border-black/15 bg-white
                             text-texto placeholder-texto/30 focus:outline-none focus:border-azul/50
                             focus:ring-2 focus:ring-azul/10 transition-all text-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-azul text-white font-bold px-6 py-3.5 rounded-xl
                             hover:bg-azul-dark transition-colors disabled:opacity-60
                             whitespace-nowrap text-sm"
                >
                  {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
                </button>
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm text-left">{errorMsg}</p>
              )}
              <p className="text-texto/30 text-xs mt-1">
                Sin spam. Podés desuscribirte cuando quieras.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
