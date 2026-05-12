import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatAssistant from '@/components/ChatAssistant'
import Chart from '@/components/charts/Chart'
import StatCard from '@/components/charts/StatCard'
import HeadlineStat from '@/components/charts/HeadlineStat'
import StudySummary from '@/components/StudySummary'
import { estudios, getStudy } from '@/data/estudios'
import { site } from '@/data/site'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return estudios.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getStudy(params.slug)
  if (!s) return {}
  return {
    title: `${s.title} — Estudio · ${site.name}`,
    description: s.bajada,
    openGraph: {
      title: s.title,
      description: s.bajada,
      locale: 'es_AR',
      type: 'article',
    },
  }
}

export default function EstudioPage({ params }: Props) {
  const s = getStudy(params.slug)
  if (!s) notFound()

  const e = site.estudios
  const statusLabel =
    s.status === 'publicado' ? 'Publicado' : s.status === 'en_curso' ? 'En curso' : 'Preliminar'
  const statusStyle =
    s.status === 'publicado'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : s.status === 'en_curso'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : 'bg-azul/8 text-azul-dark border-azul/15'

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <header className="relative bg-azul-deep py-16 md:py-20 lg:py-24 overflow-hidden grain">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 75% 30%, rgba(200,169,106,0.14) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-4xl mx-auto px-5 md:px-6">
            <Link
              href="/#estudios"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/90
                         text-sm transition-colors mb-8"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              Volver a Estudios
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className={`inline-flex items-center text-[0.62rem] font-bold tracking-widest uppercase border rounded-full px-2.5 py-0.5 ${statusStyle}`}>
                {statusLabel}
              </span>
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado">
                {s.category}
              </span>
              <span className="text-xs text-white/45">· {s.date}</span>
              <span className="text-xs text-white/30">· Período: {s.period}</span>
            </div>

            <h1 className="font-title font-black text-white text-3xl md:text-4xl lg:text-[3rem] leading-[1.1] tracking-tight mb-6">
              {s.title}
            </h1>

            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {s.bajada}
            </p>

            <div className="flex items-center gap-3 pt-6 border-t border-white/10">
              <div className="flex -space-x-2">
                {s.authors.map((a, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-dorado/20 ring-2 ring-azul-deep text-[0.7rem] font-bold text-dorado"
                  >
                    {a
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                ))}
              </div>
              <div className="text-xs text-white/55">
                <p className="text-white/85 font-medium text-sm">{s.authors.join(', ')}</p>
                <p>Equipo Involucrarnos</p>
              </div>
            </div>
          </div>
        </header>

        <StudySummary slug={s.slug} />

        {/* Body */}
        <article className="bg-crema/40 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-5 md:px-6 space-y-12">
            {/* Headline stat */}
            {s.stats[0] && <HeadlineStat stat={s.stats[0]} />}

            {/* Other stats */}
            {s.stats.length > 1 && (
              <section>
                <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/45 mb-4">
                  Datos destacados
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {s.stats.slice(1).map((st, i) => (
                    <StatCard key={i} stat={st} index={i} />
                  ))}
                </div>
              </section>
            )}

            {/* Findings */}
            <section>
              <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/45 mb-4">
                {e.findingsLabel}
              </p>
              <ul className="space-y-3 bg-white border border-black/8 rounded-2xl p-6 md:p-7">
                {s.findings.map((f, i) => (
                  <li key={i} className="flex gap-3 text-[0.97rem] text-texto/85 leading-relaxed">
                    <span className="flex-shrink-0 mt-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-dorado/15 text-dorado-deep text-[0.7rem] font-bold tabular-nums">
                      {i + 1}
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Charts */}
            {s.charts.length > 0 && (
              <section>
                <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/45 mb-4">
                  Visualizaciones
                </p>
                <div className="space-y-5">
                  {s.charts.map((c, i) => (
                    <div
                      key={i}
                      className="bg-white border border-black/8 rounded-2xl p-6 md:p-7 shadow-[0_2px_18px_rgba(42,47,118,0.05)]"
                    >
                      <Chart data={c} />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Methodology */}
            <section className="bg-white border border-black/8 rounded-2xl p-6 md:p-7">
              <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/45 mb-3">
                {e.methodLabel}
              </p>
              <p className="text-[0.95rem] text-texto/80 leading-relaxed">{s.methodology}</p>
            </section>

            {/* Sources */}
            {s.sources && s.sources.length > 0 && (
              <section>
                <p className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/45 mb-4">
                  Fuentes
                </p>
                <ul className="space-y-2 bg-white border border-black/8 rounded-2xl p-6 md:p-7">
                  {s.sources.map((src, i) => (
                    <li key={i} className="text-sm">
                      {src.url ? (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-azul-dark hover:text-dorado-deep transition-colors"
                        >
                          {src.name}
                          <ExternalLink size={12} className="opacity-60" />
                        </a>
                      ) : (
                        <span className="text-texto/65">{src.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* CTA */}
            <section className="bg-gradient-to-br from-azul-deep via-azul-dark to-azul rounded-2xl p-7 md:p-9 text-center text-white grain overflow-hidden relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(200,169,106,0.2) 0%, transparent 60%)',
                }}
              />
              <div className="relative">
                <p className="font-title font-black text-2xl md:text-3xl mb-3">
                  ¿Te interesa este tipo de análisis?
                </p>
                <p className="text-white/65 text-sm md:text-base mb-6 max-w-md mx-auto">
                  Sumate a la comunidad y recibí los próximos estudios directo en tu mail.
                </p>
                <Link
                  href="/#sumate"
                  className="inline-flex items-center gap-2 bg-dorado text-azul-dark font-bold px-6 py-3 rounded-xl hover:bg-dorado-soft transition-colors text-sm"
                >
                  Sumarme gratis
                </Link>
              </div>
            </section>
          </div>
        </article>
      </main>
      <Footer />
      <ChatAssistant />
    </>
  )
}
