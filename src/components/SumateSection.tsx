'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'
import { site } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'
import { trackEvent } from '@/lib/analytics'

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
      trackEvent('newsletter_subscribed')
      setStatus('success')
      setEmail('')
      setName('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Algo salió mal. Intentá de nuevo.')
    }
  }

  return (
    <section id="sumate" className="bg-crema py-16 md:py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 0%, rgba(200,169,106,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            variants={stagger(0.05, 0.1)}
            className="lg:col-span-6"
          >
            <motion.span variants={fadeUp} className="eyebrow mb-5">{s.eyebrow}</motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.08] tracking-tight mb-4"
            >
              {s.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-texto/60 text-base md:text-lg leading-relaxed mb-6"
            >
              {s.subtitle}
            </motion.p>
            <motion.ul variants={fadeUp} className="space-y-2.5">
              {s.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-3 text-texto/75 text-[0.95rem]">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-dorado mt-0.5 flex-shrink-0">
                    <Check size={12} strokeWidth={3} className="text-azul-dark" />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.1, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="lg:col-span-6"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="bg-white border border-azul/10 rounded-2xl p-8 md:p-10 text-center
                              shadow-[0_8px_32px_rgba(42,47,118,0.08)]"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                  className="inline-flex items-center justify-center mb-4 text-azul"
                >
                  <CheckCircle2 size={56} strokeWidth={1.8} />
                </motion.div>
                <p className="font-title font-800 text-azul-dark text-xl mb-2">{s.successTitle}</p>
                <p className="text-texto/55 text-sm">{s.successBody}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}
                    className="bg-white border border-azul/10 rounded-2xl p-6 md:p-7
                               shadow-[0_12px_40px_rgba(42,47,118,0.10)] flex flex-col gap-3">
                <label className="block">
                  <span className="text-[0.7rem] font-bold tracking-wider uppercase text-texto/50 mb-1.5 block">Nombre</span>
                  <input
                    type="text"
                    placeholder={s.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-azul/15 bg-white
                               text-texto placeholder-texto/30 focus:outline-none focus:border-azul/50
                               focus:ring-2 focus:ring-azul/10 transition-all text-sm"
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
                    className="w-full px-4 py-3 rounded-xl border border-azul/15 bg-white
                               text-texto placeholder-texto/30 focus:outline-none focus:border-azul/50
                               focus:ring-2 focus:ring-azul/10 transition-all text-sm"
                  />
                </label>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                  className="bg-azul text-white font-bold px-6 py-3.5 rounded-xl mt-2
                             hover:bg-azul-dark transition-colors disabled:opacity-60
                             text-sm flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {s.submitLoading}
                    </>
                  ) : (
                    <>
                      {s.submitLabel}
                      <ArrowRight size={14} strokeWidth={2.2} />
                    </>
                  )}
                </motion.button>

                {status === 'error' && (
                  <p className="text-red-500 text-sm" role="alert">{errorMsg}</p>
                )}
                <p className="text-texto/35 text-xs mt-1 text-center">{s.fineprint}</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
