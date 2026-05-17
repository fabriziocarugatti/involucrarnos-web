'use client'

import { Users, GraduationCap, Mail } from 'lucide-react'

type Row = Record<string, string>

export interface UnifiedPerson {
  email: string
  nombre: string
  isInscripto: boolean
  isSuscriptor: boolean
  cursos: string[]
  lastSeen: string
}

export function buildUnified(inscripciones: Row[], suscriptores: Row[]): UnifiedPerson[] {
  const byEmail = new Map<string, UnifiedPerson>()

  for (const r of inscripciones) {
    if (!r.email) continue
    const email = r.email.toLowerCase()
    const existing = byEmail.get(email)
    const created = r.created_at ?? ''
    if (existing) {
      existing.isInscripto = true
      if (r.curso && !existing.cursos.includes(r.curso)) existing.cursos.push(r.curso)
      if (created > existing.lastSeen) existing.lastSeen = created
      if (!existing.nombre && r.nombre) existing.nombre = r.nombre
    } else {
      byEmail.set(email, {
        email,
        nombre: r.nombre ?? '',
        isInscripto: true,
        isSuscriptor: false,
        cursos: r.curso ? [r.curso] : [],
        lastSeen: created,
      })
    }
  }

  for (const r of suscriptores) {
    if (!r.email) continue
    const email = r.email.toLowerCase()
    const existing = byEmail.get(email)
    const created = r.created_at ?? ''
    if (existing) {
      existing.isSuscriptor = true
      if (created > existing.lastSeen) existing.lastSeen = created
      if (!existing.nombre && r.nombre) existing.nombre = r.nombre
    } else {
      byEmail.set(email, {
        email,
        nombre: r.nombre ?? '',
        isInscripto: false,
        isSuscriptor: true,
        cursos: [],
        lastSeen: created,
      })
    }
  }

  return Array.from(byEmail.values()).sort((a, b) => b.lastSeen.localeCompare(a.lastSeen))
}

function formatDate(d?: string) {
  if (!d) return '—'
  try {
    return new Date(d).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })
  } catch {
    return d
  }
}

interface Props {
  people: UnifiedPerson[]
}

export default function UnifiedPeopleTable({ people }: Props) {
  if (people.length === 0) {
    return <p className="text-white/35 text-sm italic">Sin gente todavía.</p>
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Persona</th>
            <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Vínculo</th>
            <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider hidden lg:table-cell">Cursos</th>
            <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Última actividad</th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.email} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
              <td className="px-4 py-3 text-white/80">
                <div>
                  <span>{p.nombre || <span className="text-white/25">—</span>}</span>
                  <p className="text-dorado/80 text-xs mt-0.5">
                    <a href={`mailto:${p.email}`} className="hover:underline">{p.email}</a>
                  </p>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {p.isInscripto && (
                    <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 rounded-full px-2 py-0.5">
                      <GraduationCap size={10} /> Inscripto
                    </span>
                  )}
                  {p.isSuscriptor && (
                    <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold tracking-wider uppercase text-sky-400 bg-sky-500/10 rounded-full px-2 py-0.5">
                      <Mail size={10} /> Newsletter
                    </span>
                  )}
                  {p.isInscripto && p.isSuscriptor && (
                    <span className="inline-flex items-center gap-1 text-[0.62rem] font-bold tracking-wider uppercase text-dorado bg-dorado/15 rounded-full px-2 py-0.5">
                      <Users size={10} /> Ambos
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-white/55 text-xs hidden lg:table-cell">
                {p.cursos.length === 0 ? <span className="text-white/25">—</span> : p.cursos.join(', ')}
              </td>
              <td className="px-4 py-3 text-white/35 text-xs whitespace-nowrap hidden md:table-cell">
                {formatDate(p.lastSeen)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
