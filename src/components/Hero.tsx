import Link from 'next/link'

export default function Hero() {
  return (
    <section
      className="relative bg-azul min-h-[90vh] flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 90% at 75% 50%, rgba(200,169,106,0.13) 0%, transparent 65%), radial-gradient(ellipse 35% 55% at 15% 85%, rgba(255,255,255,0.04) 0%, transparent 55%)',
        }}
      />
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{ background: 'linear-gradient(90deg, #C8A96A 0%, transparent 60%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-3 text-dorado text-xs font-bold tracking-widest uppercase mb-7">
            <span className="block w-7 h-0.5 bg-dorado rounded" />
            Comunicación política con propósito
          </span>

          <h1
            id="hero-heading"
            className="font-title font-black text-white leading-[1.07] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.9rem)' }}
          >
            Política que se entiende,{' '}
            <em className="not-italic text-dorado">comunidad que se construye</em>
          </h1>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
            Un espacio para pensar la política en serio. Análisis, gestión pública
            y desarrollo territorial para el NOA.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/#articulos"
              className="inline-flex items-center gap-2 bg-dorado text-azul-dark font-bold
                         px-7 py-3.5 rounded-xl hover:-translate-y-0.5 transition-transform
                         hover:shadow-[0_6px_22px_rgba(200,169,106,0.45)]"
            >
              Leer artículos
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/#sumate"
              className="inline-flex items-center gap-2 bg-transparent text-white/85 font-medium
                         px-7 py-3.5 rounded-xl border border-white/25
                         hover:border-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              Unirme a la comunidad
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
