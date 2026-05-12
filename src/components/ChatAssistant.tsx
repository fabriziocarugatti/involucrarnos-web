'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react'
import { ease } from '@/lib/motion'

type Msg = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  '¿Qué es capacidad estatal?',
  '¿Cómo evaluar una política pública?',
  '¿Qué diferencia a la guerra cognitiva?',
]

const WELCOME =
  '¡Hola! Soy el asistente de Involucrarnos. Pregúntame sobre política, gestión pública, democracia o cualquier tema sobre lo público. Estoy entrenado con el marco y los artículos de Exequiel.'

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

  // focus input when opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250)
  }, [open])

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
      {/* Floating launcher button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente IA'}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 250, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-24 z-40
                   flex items-center gap-2 pl-4 pr-5 py-3 rounded-full
                   bg-azul-deep text-white border border-dorado/40
                   shadow-[0_8px_28px_rgba(30,34,96,0.4)]
                   hover:bg-azul-dark transition-colors font-medium text-sm"
      >
        <span className="relative flex items-center justify-center">
          {open ? (
            <X size={18} strokeWidth={2.2} />
          ) : (
            <>
              <Sparkles size={18} strokeWidth={2} className="text-dorado" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-dorado rounded-full animate-pulse" />
            </>
          )}
        </span>
        <span className="hidden sm:inline">
          {open ? 'Cerrar' : 'Preguntale al especialista'}
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.32, ease: ease.outExpo }}
            className="fixed bottom-20 right-3 md:bottom-24 md:right-6 z-50
                       w-[calc(100vw-1.5rem)] sm:w-[420px] max-w-[440px]
                       h-[600px] max-h-[80vh]
                       bg-white rounded-2xl shadow-[0_24px_60px_rgba(15,17,55,0.32)]
                       border border-black/10 flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Asistente IA del especialista"
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
                <p className="font-title font-800 text-sm leading-tight">El Especialista</p>
                <p className="text-[0.7rem] text-white/55 leading-tight mt-0.5">
                  IA · Política y gestión pública · gratis
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
