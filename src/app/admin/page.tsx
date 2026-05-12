import { createClient } from '@supabase/supabase-js'
import { Users, GraduationCap, Mail, Calendar } from 'lucide-react'

async function getData() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  )

  const [{ data: inscripciones }, { data: suscriptores }] = await Promise.all([
    supabase.from('inscripciones').select('*').order('created_at', { ascending: false }),
    supabase.from('suscriptores').select('*').order('created_at', { ascending: false }),
  ])

  return {
    inscripciones: inscripciones ?? [],
    suscriptores: suscriptores ?? [],
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default async function AdminPage() {
  const { inscripciones, suscriptores } = await getData()

  return (
    <main className="min-h-screen bg-[#0f1123] text-white px-5 py-10 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-dorado mb-1">Panel interno</p>
          <h1 className="font-title font-black text-3xl md:text-4xl text-white">Involucrarnos · Admin</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Inscriptos', value: inscripciones.length, icon: GraduationCap },
            { label: 'Suscriptores', value: suscriptores.length, icon: Users },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-dorado/15 flex items-center justify-center flex-shrink-0">
                <Icon size={18} strokeWidth={1.8} className="text-dorado" />
              </div>
              <div>
                <p className="text-2xl font-black font-title text-white">{value}</p>
                <p className="text-white/45 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inscripciones */}
        <section className="mb-12">
          <h2 className="font-title font-black text-xl text-white mb-4 flex items-center gap-2">
            <GraduationCap size={18} className="text-dorado" />
            Inscriptos a cursos
          </h2>
          {inscripciones.length === 0 ? (
            <p className="text-white/35 text-sm italic">Sin inscripciones todavía.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Nombre</th>
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Curso</th>
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {inscripciones.map((row: Record<string, string>) => (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3 text-white/80">{row.nombre || <span className="text-white/25">—</span>}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${row.email}`} className="text-dorado hover:underline">{row.email}</a>
                      </td>
                      <td className="px-4 py-3 text-white/70">{row.curso}</td>
                      <td className="px-4 py-3 text-white/35 text-xs whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {formatDate(row.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Suscriptores */}
        <section>
          <h2 className="font-title font-black text-xl text-white mb-4 flex items-center gap-2">
            <Mail size={18} className="text-dorado" />
            Suscriptores newsletter
          </h2>
          {suscriptores.length === 0 ? (
            <p className="text-white/35 text-sm italic">Sin suscriptores todavía.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Nombre</th>
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-white/50 font-semibold text-xs uppercase tracking-wider">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {suscriptores.map((row: Record<string, string>) => (
                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3 text-white/80">{row.nombre || <span className="text-white/25">—</span>}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${row.email}`} className="text-dorado hover:underline">{row.email}</a>
                      </td>
                      <td className="px-4 py-3 text-white/35 text-xs whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {formatDate(row.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
