'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, GraduationCap, Mail, Calendar, Trash2, Loader2, LogOut,
  Download, TrendingUp, Pencil, X, Check, StickyNote, Search, SlidersHorizontal,
} from 'lucide-react'

type Row = Record<string, string>

const STATUS_CONFIG = {
  pendiente:  { label: 'Pendiente',  color: 'text-amber-400  bg-amber-400/10  border-amber-400/20'  },
  confirmado: { label: 'Confirmado', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  cancelado:  { label: 'Cancelado',  color: 'text-red-400    bg-red-400/10    border-red-400/20'    },
  asistio:    { label: 'Asistió',    color: 'text-sky-400    bg-sky-400/10    border-sky-400/20'    },
} as const

type Status = keyof typeof STATUS_CONFIG

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })
}

function toCSV(rows: Row[], cols: string[]): string {
  const header = cols.join(',')
  const lines = rows.map((r) =>
    cols.map((c) => `"${(r[c] ?? '').replace(/"/g, '""')}"`).join(',')
  )
  return [header, ...lines].join('\n')
}

function downloadCSV(content: string, filename: string) {
  const blob = new Blob(['﻿' + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as Status] ?? STATUS_CONFIG.pendiente
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[0.6rem] font-bold tracking-wider uppercase border ${cfg.color}`}>
      {cfg.label}
    </span>
  )
}

function WeeklyBar({ rows }: { rows: Row[] }) {
  const weeks: Record<string, number> = {}
  const now = Date.now()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now - i * 86400000)
    weeks[d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' })] = 0
  }
  rows.forEach((r) => {
    if (!r.created_at) return
    const d = new Date(r.created_at)
    if (now - d.getTime() > 7 * 86400000) return
    const k = formatDateShort(r.created_at)
    if (k in weeks) weeks[k]++
  })
  const entries = Object.entries(weeks)
  const max = Math.max(...entries.map(([, v]) => v), 1)
  return (
    <div className="flex items-end gap-1.5 h-12">
      {entries.map(([day, count]) => (
        <div key={day} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-t bg-dorado/60 transition-all duration-500"
            style={{ height: `${(count / max) * 40}px`, minHeight: count > 0 ? '4px' : '0' }}
          />
          <span className="text-[0.55rem] text-white/30">{day}</span>
        </div>
      ))}
    </div>
  )
}

function StatCard({ label, value, icon: Icon, sub }: { label: string; value: number | string; icon: React.ElementType; sub?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-dorado/15 flex items-center justify-center flex-shrink-0">
        <Icon size={18} strokeWidth={1.8} className="text-dorado" />
      </div>
      <div>
        <p className="text-2xl font-black font-title text-white leading-none">{value}</p>
        <p className="text-white/45 text-xs mt-0.5">{label}</p>
        {sub && <p className="text-dorado/70 text-[0.6rem] mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function EditModal({ row, onClose, onSaved }: { row: Row; onClose: () => void; onSaved: () => void }) {
  const [status, setStatus] = useState<Status>((row.status as Status) || 'pendiente')
  const [notas, setNotas] = useState(row.notas || '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: row.id, status, notas }),
      })
      if (res.ok) { onSaved(); onClose() }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#0f1123] border border-white/15 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-title font-black text-white text-base">{row.nombre || row.email}</p>
            <p className="text-white/40 text-xs">{row.curso}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white/70 transition-colors ml-4">
            <X size={18} />
          </button>
        </div>

        <div className="mb-5">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Estado</p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(STATUS_CONFIG) as Status[]).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
                  ${status === s
                    ? `${STATUS_CONFIG[s].color} border-current`
                    : 'text-white/40 border-white/10 hover:border-white/25'}`}
              >
                {status === s && <Check size={13} strokeWidth={2.5} />}
                {STATUS_CONFIG[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wider block mb-2">
            <span className="flex items-center gap-1.5"><StickyNote size={12} /> Notas internas</span>
          </label>
          <textarea
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Contactado por WhatsApp, esperando confirmación de pago, etc."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white/80
                       placeholder:text-white/20 resize-none focus:outline-none focus:border-dorado/40 transition-colors"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-dorado text-azul-dark
                       font-bold py-2.5 rounded-xl text-sm hover:bg-dorado-soft disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            Guardar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-white/40 hover:text-white/70 border border-white/10 rounded-xl text-sm transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

function recentCount(rows: Row[], days = 7) {
  const cutoff = Date.now() - days * 86400000
  return rows.filter((r) => r.created_at && new Date(r.created_at).getTime() > cutoff).length
}

function matchesSearch(row: Row, query: string) {
  if (!query) return true
  const q = query.toLowerCase()
  return (
    row.nombre?.toLowerCase().includes(q) ||
    row.email?.toLowerCase().includes(q) ||
    false
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [inscripciones, setInscripciones] = useState<Row[]>([])
  const [suscriptores, setSuscriptores] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [editRow, setEditRow] = useState<Row | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<Status | 'todos'>('todos')
  const [filterProvincia, setFilterProvincia] = useState('todas')

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin')
    if (res.status === 401) { router.push('/admin/login'); return }
    const data = await res.json()
    setInscripciones(data.inscripciones ?? [])
    setSuscriptores(data.suscriptores ?? [])
    setLoading(false)
  }, [router])

  useEffect(() => { fetchData() }, [fetchData])

  const provincias = Array.from(new Set(inscripciones.map((r) => r.provincia).filter(Boolean))).sort()

  const filteredInscripciones = inscripciones.filter((r) => {
    const matchSearch = matchesSearch(r, searchQuery)
    const matchStatus = filterStatus === 'todos' || r.status === filterStatus
    const matchProvincia = filterProvincia === 'todas' || r.provincia === filterProvincia
    return matchSearch && matchStatus && matchProvincia
  })

  const filteredSuscriptores = suscriptores.filter((r) => matchesSearch(r, searchQuery))

  const confirmados = inscripciones.filter((r) => r.status === 'confirmado').length
  const pendientes  = inscripciones.filter((r) => r.status === 'pendiente').length

  const hasFilters = searchQuery || filterStatus !== 'todos' || filterProvincia !== 'todas'

  return (
    <>
      {editRow && (
        <EditModal
          row={editRow}
          onClose={() => setEditRow(null)}
          onSaved={fetchData}
        />
      )}

      <main className="min-h-screen bg-[#0f1123] text-white px-5 py-10 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10 flex items-start justify-between">
            <div>
              <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-dorado mb-1">Panel interno</p>
              <h1 className="font-title font-black text-3xl md:text-4xl text-white">Involucrarnos · Admin</h1>
            </div>
            <button
              onClick={async () => {
                await fetch('/api/admin/login', { method: 'DELETE' })
                router.push('/admin/login')
              }}
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors"
            >
              <LogOut size={12} /> Cerrar sesión
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total inscriptos"
              value={loading ? '—' : inscripciones.length}
              icon={GraduationCap}
              sub={loading ? undefined : `${confirmados} confirmados · ${pendientes} pendientes`}
            />
            <StatCard
              label="Suscriptores"
              value={loading ? '—' : suscriptores.length}
              icon={Users}
              sub={loading ? undefined : `+${recentCount(suscriptores)} esta semana`}
            />
            <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} strokeWidth={1.8} className="text-dorado" />
                <span className="text-white/45 text-xs">Inscripciones — últimos 7 días</span>
              </div>
              {!loading && <WeeklyBar rows={inscripciones} />}
            </div>
          </div>

          {/* Barra de búsqueda y filtros */}
          {!loading && (
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm
                             text-white/80 placeholder:text-white/25 focus:outline-none focus:border-dorado/40 transition-colors"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as Status | 'todos')}
                  className="bg-white/5 border border-white/10 rounded-xl pl-8 pr-8 py-2.5 text-sm text-white/70
                             focus:outline-none focus:border-dorado/40 appearance-none cursor-pointer transition-colors"
                >
                  <option value="todos">Todos los estados</option>
                  {(Object.entries(STATUS_CONFIG) as [Status, typeof STATUS_CONFIG[Status]][]).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>

              {provincias.length > 0 && (
                <select
                  value={filterProvincia}
                  onChange={(e) => setFilterProvincia(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70
                             focus:outline-none focus:border-dorado/40 appearance-none cursor-pointer transition-colors"
                >
                  <option value="todas">Todas las provincias</option>
                  {provincias.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              )}

              {hasFilters && (
                <button
                  onClick={() => { setSearchQuery(''); setFilterStatus('todos'); setFilterProvincia('todas') }}
                  className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/60 border border-white/10 rounded-xl px-3 py-2.5 transition-colors"
                >
                  <X size={12} /> Limpiar
                </button>
              )}
            </div>
          )}

          {/* Export */}
          {!loading && (inscripciones.length > 0 || suscriptores.length > 0) && (
            <div className="flex gap-3 mb-10">
              {inscripciones.length > 0 && (
                <button
                  onClick={() => downloadCSV(
                    toCSV(filteredInscripciones, ['nombre', 'email', 'curso', 'status', 'notas', 'fecha_nacimiento', 'celular', 'ciudad', 'provincia', 'created_at']),
                    'inscripciones.csv'
                  )}
                  className="inline-flex items-center gap-2 text-xs text-dorado/80 hover:text-dorado border border-dorado/20 hover:border-dorado/50 rounded-lg px-3 py-2 transition-colors"
                >
                  <Download size={12} /> Exportar inscriptos CSV{hasFilters ? ' (filtrado)' : ''}
                </button>
              )}
              {suscriptores.length > 0 && (
                <button
                  onClick={() => downloadCSV(
                    toCSV(filteredSuscriptores, ['nombre', 'email', 'created_at']),
                    'suscriptores.csv'
                  )}
                  className="inline-flex items-center gap-2 text-xs text-dorado/80 hover:text-dorado border border-dorado/20 hover:border-dorado/50 rounded-lg px-3 py-2 transition-colors"
                >
                  <Download size={12} /> Exportar suscriptores CSV{hasFilters ? ' (filtrado)' : ''}
                </button>
              )}
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-2 text-white/40 text-sm py-10">
              <Loader2 size={16} className="animate-spin" /> Cargando datos…
            </div>
          )}

          {!loading && (
            <>
              {/* Inscripciones */}
              <section className="mb-12">
                <h2 className="font-title font-black text-xl text-white mb-6 flex items-center gap-2">
                  <GraduationCap size={18} className="text-dorado" />
                  Inscriptos a cursos
                  {hasFilters && (
                    <span className="text-sm font-normal text-white/40">
                      — {filteredInscripciones.length} de {inscripciones.length}
                    </span>
                  )}
                </h2>
                {filteredInscripciones.length === 0 ? (
                  <p className="text-white/35 text-sm italic">
                    {hasFilters ? 'Ningún resultado con estos filtros.' : 'Sin inscripciones todavía.'}
                  </p>
                ) : (
                  <div className="space-y-8">
                    {Object.entries(
                      filteredInscripciones.reduce<Record<string, Row[]>>((acc, row) => {
                        const key = row.curso || 'Sin curso'
                        acc[key] = [...(acc[key] ?? []), row]
                        return acc
                      }, {})
                    ).map(([curso, rows]) => (
                      <div key={curso}>
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-title font-black text-base text-white">{curso}</h3>
                          <span className="text-[0.62rem] font-bold tracking-widest uppercase text-dorado bg-dorado/10 rounded-full px-2.5 py-0.5">
                            {rows.length} {rows.length === 1 ? 'persona' : 'personas'}
                          </span>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-white/10">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10 bg-white/5">
                                <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Nombre</th>
                                <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Email</th>
                                <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Estado</th>
                                <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Provincia</th>
                                <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Fecha</th>
                                <th className="px-4 py-3 w-20" />
                              </tr>
                            </thead>
                            <tbody>
                              {rows.map((row) => (
                                <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                                  <td className="px-4 py-3 text-white/80">
                                    <div>
                                      <span>{row.nombre || <span className="text-white/25">—</span>}</span>
                                      {row.notas && (
                                        <p className="text-white/30 text-xs mt-0.5 truncate max-w-[180px]" title={row.notas}>
                                          📝 {row.notas}
                                        </p>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <a href={`mailto:${row.email}`} className="text-dorado hover:underline">{row.email}</a>
                                  </td>
                                  <td className="px-4 py-3">
                                    <StatusBadge status={row.status || 'pendiente'} />
                                  </td>
                                  <td className="px-4 py-3 text-white/50 text-xs hidden lg:table-cell">{row.provincia || '—'}</td>
                                  <td className="px-4 py-3 text-white/35 text-xs whitespace-nowrap hidden md:table-cell">
                                    <span className="flex items-center gap-1.5">
                                      <Calendar size={11} /> {formatDate(row.created_at)}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => setEditRow(row)}
                                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg
                                                   text-white/30 hover:text-dorado hover:bg-dorado/10 transition-colors"
                                        title="Editar"
                                      >
                                        <Pencil size={12} />
                                      </button>
                                      <DeleteButton table="inscripciones" id={row.id} onDeleted={fetchData} />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Suscriptores */}
              <section>
                <h2 className="font-title font-black text-xl text-white mb-4 flex items-center gap-2">
                  <Mail size={18} className="text-dorado" />
                  Suscriptores newsletter
                  {hasFilters && (
                    <span className="text-sm font-normal text-white/40">
                      — {filteredSuscriptores.length} de {suscriptores.length}
                    </span>
                  )}
                </h2>
                {filteredSuscriptores.length === 0 ? (
                  <p className="text-white/35 text-sm italic">
                    {hasFilters ? 'Ningún resultado con estos filtros.' : 'Sin suscriptores todavía.'}
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-white/10">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5">
                          <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Nombre</th>
                          <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Email</th>
                          <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Fecha</th>
                          <th className="px-4 py-3 w-10" />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSuscriptores.map((row) => (
                          <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                            <td className="px-4 py-3 text-white/80">{row.nombre || <span className="text-white/25">—</span>}</td>
                            <td className="px-4 py-3">
                              <a href={`mailto:${row.email}`} className="text-dorado hover:underline">{row.email}</a>
                            </td>
                            <td className="px-4 py-3 text-white/35 text-xs whitespace-nowrap">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={11} /> {formatDate(row.created_at)}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <DeleteButton table="suscriptores" id={row.id} onDeleted={fetchData} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  )
}

function DeleteButton({ table, id, onDeleted }: { table: string; id: string; onDeleted: () => void }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('¿Eliminar este registro?')) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table, id }),
      })
      if (res.ok) onDeleted()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-white/30
                 hover:text-red-400 hover:bg-red-400/10 disabled:opacity-40 transition-colors"
      title="Eliminar"
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
    </button>
  )
}
