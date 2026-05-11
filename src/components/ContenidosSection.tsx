import Link from 'next/link'
import { articulos, type Article } from '@/data/articulos'
import { site, type TipoContenido } from '@/data/site'

function tipoLabel(tipo: TipoContenido) {
  return site.tipos[tipo].label
}

function CardPublicado({ a }: { a: Article }) {
  return (
    <Link
      href={`/articulos/${a.slug}`}
      className="group flex flex-col bg-crema rounded-2xl overflow-hidden
                 border border-black/5 hover:border-dorado/40
                 hover:shadow-[0_10px_38px_rgba(42,47,118,0.10)]
                 transition-all duration-300 reveal"
    >
      <div className="p-7 md:p-8 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado-deep bg-dorado/15 rounded-full px-3 py-1">
            {tipoLabel(a.tipo)}
          </span>
          <span className="text-xs text-texto/40">{a.date}</span>
        </div>
        <h3 className="font-title font-800 text-azul-dark text-xl md:text-[1.35rem] leading-snug mb-3
                       group-hover:text-azul transition-colors">
          {a.title}
        </h3>
        <p className="font-article text-texto/65 text-[0.95rem] leading-relaxed flex-1 line-clamp-3">
          {a.bajada}
        </p>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/8">
          <span className="text-xs text-texto/50">{a.category}</span>
          <span className="text-xs font-bold text-azul group-hover:text-dorado-deep transition-colors flex items-center gap-1">
            Leer
            <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden>
              <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

function CardProximo({ a }: { a: Article }) {
  return (
    <div className="flex flex-col gap-3 bg-white border border-dashed border-black/12
                    rounded-xl p-5 md:p-6 reveal">
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado-deep/70">
          {tipoLabel(a.tipo)}
        </span>
        <span className="text-[0.65rem] text-texto/35 tracking-wide">{a.date}</span>
      </div>
      <p className="font-title font-800 text-azul-dark/65 text-[0.95rem] leading-snug">
        {a.title}
      </p>
      <p className="text-texto/40 text-xs leading-relaxed line-clamp-2">
        {a.bajada}
      </p>
    </div>
  )
}

export default function ContenidosSection() {
  const c = site.contenidos
  const publicados = articulos.filter((a) => a.published)
  const proximos = articulos.filter((a) => !a.published)

  return (
    <section id="contenidos" className="bg-white py-20 md:py-28 lg:py-32 relative">
      {/* subtle top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-dorado/40" />

      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="mb-12 md:mb-14 reveal max-w-2xl">
          <span className="eyebrow mb-5">{c.eyebrow}</span>
          <h2 className="font-title font-black text-azul-dark text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-texto/55 text-base md:text-lg leading-relaxed">{c.subtitle}</p>
        </div>

        {/* published */}
        {publicados.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-14 md:mb-16 stagger">
            {publicados.map((a) => <CardPublicado key={a.slug} a={a} />)}
          </div>
        )}

        {/* upcoming */}
        {proximos.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/35">
                {c.upcomingLabel}
              </span>
              <span className="flex-1 h-px bg-black/8" />
              <span className="text-xs text-texto/30">{proximos.length}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
              {proximos.map((a) => <CardProximo key={a.slug} a={a} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
