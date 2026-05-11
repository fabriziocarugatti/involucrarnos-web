import Link from 'next/link'
import { articulos } from '@/data/articulos'

export default function ArticulosSection() {
  const published = articulos.filter((a) => a.published)
  const upcoming = articulos.filter((a) => !a.published)

  return (
    <section id="articulos" className="bg-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 reveal">
          <span className="inline-flex items-center gap-3 text-dorado text-xs font-bold tracking-widest uppercase mb-5">
            <span className="block w-7 h-0.5 bg-dorado rounded" />
            Artículos
          </span>
          <h2 className="font-title font-black text-azul-dark text-4xl md:text-5xl leading-tight tracking-tight">
            Análisis y reflexión política
          </h2>
        </div>

        {published.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 stagger">
            {published.map((art) => (
              <Link
                key={art.slug}
                href={`/articulos/${art.slug}`}
                className="group flex flex-col bg-crema rounded-2xl overflow-hidden
                           border border-transparent hover:border-dorado/30
                           hover:shadow-[0_8px_32px_rgba(42,47,118,0.09)]
                           transition-all duration-300 reveal"
              >
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">{art.emoji}</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-dorado">
                      {art.category}
                    </span>
                  </div>
                  <h3
                    className="font-title font-800 text-azul-dark text-xl leading-snug mb-3
                               group-hover:text-azul transition-colors"
                  >
                    {art.title}
                  </h3>
                  <p className="text-texto/60 text-sm leading-relaxed flex-1 line-clamp-3">
                    {art.bajada}
                  </p>
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-black/8">
                    <span className="text-xs text-texto/40">{art.date}</span>
                    <span
                      className="text-xs font-bold text-azul group-hover:text-dorado transition-colors
                                 flex items-center gap-1"
                    >
                      Leer
                      <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden>
                        <path
                          d="M2.5 7.5h10M9 3.5l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {upcoming.length > 0 && (
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-texto/30 mb-5">
              Próximamente
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
              {upcoming.map((art) => (
                <div
                  key={art.slug}
                  className="flex items-center gap-4 bg-crema/50 border border-dashed border-black/10
                             rounded-xl p-5 reveal"
                >
                  <span className="text-2xl opacity-50">{art.emoji}</span>
                  <div>
                    <span className="text-xs font-bold tracking-wide uppercase text-dorado/60 block mb-1">
                      {art.category}
                    </span>
                    <p className="font-title font-800 text-azul-dark/50 text-sm leading-snug">
                      {art.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
