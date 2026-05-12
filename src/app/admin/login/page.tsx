'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const d = await res.json()
        setError(d.error || 'Contraseña incorrecta')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0f1123] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-dorado/15 ring-1 ring-dorado/30 mb-4">
            <Lock size={20} strokeWidth={1.8} className="text-dorado" />
          </div>
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-dorado mb-1">Panel interno</p>
          <h1 className="font-title font-black text-2xl text-white">Involucrarnos · Admin</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.06] border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs text-white/50 font-medium mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                placeholder="••••••••"
                className="w-full bg-white/[0.07] border border-white/15 rounded-xl px-4 py-3 text-white
                           placeholder:text-white/25 focus:outline-none focus:border-dorado/50 focus:bg-white/10
                           transition-colors pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-rose-400 text-xs bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-dorado text-azul-dark font-bold py-3 rounded-xl text-sm
                       hover:bg-dorado-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                       flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Entrar
          </button>
        </form>
      </div>
    </main>
  )
}
