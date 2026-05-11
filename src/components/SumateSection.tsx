'use client'

import { useState } from 'react'
import { site } from '@/data/site'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function SumateSection() {
  const s = site.sumate
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
    <section id="sumate" className="bg-crema py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* warm gradient atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(200,169,106,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* copy column */}
          <div className="lg:col-span-6 reveal">
            <span className="eyebrow mb-5">{s.eyebrow}</span>
            <h2 className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08] tracking-tight mb-4">
              {s.title}
            </h2>
            <p className="text-texto/60 text-base md:text-lg leading-relaxed mb-6">
              {s.subtitle}
            </p>
            <ul className="space-y-2.5">
              {s.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3 text-texto/75 text-[0.95rem]">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mt-0.5 flex-shrink-0" aria-hidden>
                    <circle cx="9" cy="9" r="9" fill="#C8A96A" fillOpacity="0.18"/>
                    <path d="M5.5 9.2l2.4 2.3 4.6-4.7" stroke="#a88845" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* form column */}
          <div className="lg:col-span-6 reveal">
            {status === 'success' ? (
              <div className="bg-white border border-azul/10 rounded-2xl p-8 md:p-10 text-center
                              shadow-[0_8px_32px_rgba(42,47,118,0.08)]">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-azul/10 mb-4">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
                    <path d="M7 13.5l4 4 8-9" stroke="#2a2f76" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="font-title font-800 text-azul-dark text-xl mb-2">{s.successTitle}</p>
                <p className="text-texto/55 text-sm">{s.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}
                    className="bg-white border border-black/6 rounded-2xl p-6 md:p-7
                               shadow-[0_8px_32px_rgba(42,47,118,0.06)] flex flex-col gap-3">
                <label className="block">
                  <span className="text-[0.7rem] font-bold tracking-wider uppercase text-texto/50 mb-1.5 block">Nombre</span>
                  <input
                    type="text"
                    placeholder={s.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/12 bg-crema/40
                               text-texto placeholder-texto/30 focus:outline-none focus:border-azul/50
                               focus:ring-2 focus:ring-azul/10 focus:bg-white transition-all text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-[0.7rem] font-bold tracking-wider uppercase text-texto/50 mb-1.5 block">Email *</span>
                  <input
                    type="email"
                    required
                    placeholder={s.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/12 bg-crema/40
                               text-texto placeholder-texto/30 focus:outline-none focus:border-azul/50
                               focus:ring-2 focus:ring-azul/10 focus:bg-white transition-all text-sm"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-azul text-white font-bold px-6 py-3.5 rounded-xl mt-2
                             hover:bg-azul-dark transition-colors disabled:opacity-60
                             text-sm flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? s.submitLoading : s.submitLabel}
                  {status !== 'loading' && (
                    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden>
                      <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                            strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm" role="alert">{errorMsg}</p>
                )}
                <p className="text-texto/35 text-xs mt-1 text-center">{s.fineprint}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
