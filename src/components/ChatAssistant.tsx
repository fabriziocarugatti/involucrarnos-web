'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react'
import { ease } from '@/lib/motion'
import { trackEvent } from '@/lib/analytics'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  '¿Qué dice el estudio de femicidios en Argentina?',
  '¿Cómo está la transparencia en el NOA?',
  '¿Qué pasó con Aprender 2024 en matemática?',
]

const WELCOME =
  '¡Hola! Soy Involucrado, el asistente de Involucrarnos. Preguntame sobre los estudios, artículos, política pública o gestión del NOA.'

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // auto-scroll on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, streaming])

  // focus input + track GA event when opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250)
      trackEvent('involucrado_opened')
    }
  }, [open])

  // open from ProyectosPreview "Explorar" button
  useEffect(() => {
    function handleOpenInvolucrado(e: Event) {
      const msg = (e as CustomEvent<{ message: string }>).detail?.message
      setOpen(true)
      if (msg) {
        setTimeout(() => send(msg), 350)
      }
    }
    window.addEventListener('open-involucrado', handleOpenInvolucrado)
    return () => window.removeEventListener('open-involucrado', handleOpenInvolucrado)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function send(content: string) {
    const userMsg: Msg = { role: 'user', content }
    const next: Msg[] = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setStreaming(true)
    setError(null)

    // placeholder for streaming assistant message
    setMessages((m) => [...m, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })

      if (!res.ok) {
        let msg = 'Algo salió mal. Intentá de nuevo.'
        try {
          const data = await res.json()
          if (data?.error) msg = data.error
        } catch {}
        throw new Error(msg)
      }

      if (!res.body) throw new Error('Sin respuesta del servidor')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((m) => {
          const arr = [...m]
          arr[arr.length - 1] = { role: 'assistant', content: acc }
          return arr
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      setMessages((m) => m.slice(0, -1))
    } finally {
      setStreaming(false)
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || streaming) return
    send(text)
  }

  return (
    <>
      {/* Floating launcher — botón grande, solo ícono */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar Involucrado' : 'Abrir Involucrado — asistente IA'}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center
                      shadow-[0_12px_40px_rgba(30,34,96,0.5)] transition-colors
                      ${open
                        ? 'bg-white border border-black/10'
                        : 'bg-gradient-to-br from-azul-deep to-azul border border-dorado/40 hover:from-azul-dark hover:to-azul-deep'
                      }`}
        >
          {/* halo dorado pulsante cuando cerrado */}
          {!open && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-full opacity-50 animate-ping-slow pointer-events-none"
              style={{ boxShadow: '0 0 0 0 rgba(200, 169, 106, 0.5)' }}
            />
          )}

          {open ? (
            <X size={22} strokeWidth={2.2} className="text-azul-dark" />
          ) : (
            <Sparkles size={24} strokeWidth={2} className="text-dorado" />
          )}

          {!open && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
          )}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: ease.outExpo }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-50
                       md:w-[400px] md:h-[560px] md:max-h-[80vh]
                       bg-white md:rounded-2xl shadow-[0_24px_60px_rgba(15,17,55,0.32)]
                       md:border border-black/10 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Involucrado — asistente IA"
          >
            {/* Header */}
            <div className="relative bg-azul-deep text-white px-5 py-4 flex items-center gap-3 border-b border-dorado/20 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 100% at 100% 0%, rgba(200,169,106,0.25) 0%, transparent 60%)',
                }}
              />
              <div className="relative w-10 h-10 rounded-full bg-dorado/20 border border-dorado/40 flex items-center justify-center">
                <Sparkles size={18} className="text-dorado" strokeWidth={2} />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-title font-800 text-sm leading-tight">Involucrado</p>
                  <span className="text-[0.58rem] font-black tracking-widest uppercase
                                   bg-dorado/20 text-dorado border border-dorado/35
                                   rounded-full px-1.5 py-0.5 leading-none">
                    Beta
                  </span>
                </div>
                <p className="text-[0.7rem] text-white/55 leading-tight mt-0.5">
                  IA · Estudios, política y gestión pública
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="relative w-8 h-8 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-crema/40"
            >
              {messages.length === 0 && (
                <>
                  <div className="bg-white border border-black/8 rounded-2xl rounded-tl-sm p-4 max-w-[88%]">
                    <p className="text-[0.92rem] text-texto/85 leading-relaxed">{WELCOME}</p>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[0.65rem] font-bold tracking-widest uppercase text-texto/40 px-1">
                      Probá con
                    </p>
                    {SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        disabled={streaming}
                        className="w-full text-left text-sm text-azul-dark
                                   bg-white hover:bg-dorado/10 border border-black/8 hover:border-dorado/40
                                   rounded-xl px-4 py-2.5 transition-colors disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {messages.map((m, i) => (
                <div key={i} className={m.role === 'user' ? 'flex justify-end' : ''}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'bg-azul text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] text-[0.92rem] leading-relaxed shadow-sm'
                        : 'bg-white border border-black/8 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[88%] text-[0.92rem] text-texto/85 leading-relaxed whitespace-pre-wrap'
                    }
                  >
                    {m.content || (
                      <span className="inline-flex items-center gap-1.5 text-texto/40">
                        <Loader2 size={13} className="animate-spin" />
                        <span className="text-[0.85rem]">Pensando…</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="border-t border-black/8 bg-white p-3 flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    onSubmit(e as unknown as FormEvent)
                  }
                }}
                placeholder="Preguntá sobre política, gestión, democracia…"
                rows={1}
                disabled={streaming}
                className="flex-1 resize-none max-h-32 text-sm
                           px-3.5 py-2.5 rounded-xl bg-crema/40 border border-black/12
                           focus:outline-none focus:border-azul/50 focus:ring-2 focus:ring-azul/10
                           placeholder:text-texto/30 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Enviar"
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-azul text-white
                           hover:bg-azul-dark disabled:opacity-40 disabled:cursor-not-allowed
                           transition-colors flex items-center justify-center"
              >
                {streaming ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={15} strokeWidth={2.2} />
                )}
              </button>
            </form>

            <p className="text-[0.65rem] text-texto/35 text-center pb-2 px-3 -mt-1">
              IA experimental · puede equivocarse · revisá fuentes
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
