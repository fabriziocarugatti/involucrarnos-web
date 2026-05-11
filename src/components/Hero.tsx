import Link from 'next/link'
import { site } from '@/data/site'
import Particles from './Particles'

export default function Hero() {
  const h = site.hero

  return (
    <section
      className="relative bg-azul-dark min-h-[92vh] flex items-center overflow-hidden pt-20 grain"
      aria-labelledby="hero-heading"
    >
      {/* animated mesh gradient blobs */}
      <div className="blob-field">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* drifting particles */}
      <Particles count={22} />

      {/* base atmospheric tint */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 90% 50% at 50% 0%, rgba(22,26,76,0.7) 0%, transparent 70%)',
        }}
      />

      {/* hairline bottom accent */}
      <div
        className="absolute bottom-0 left-0 w-full h-px z-[2]"
        style={{
          background:
            'linear-gradient(90deg, rgba(200,169,106,0.6) 0%, rgba(200,169,106,0) 70%)',
        }}
      />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6 py-20 md:py-28 lg:py-32 w-full">
        <div className="max-w-3xl">
          <span className="eyebrow mb-6 md:mb-7">{h.eyebrow}</span>

          <h1
            id="hero-heading"
            className="font-title font-black text-white leading-[1.05] tracking-tight mb-6 md:mb-7"
            style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.1rem)' }}
          >
            {h.titleStart}{' '}
            <em className="not-italic text-dorado accent-underline">
              {h.titleAccent}
            </em>
          </h1>

          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl">
            {h.subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
            <Link
              href={h.ctaPrimary.href}
              className="group inline-flex items-center gap-2 bg-dorado text-azul-dark font-bold
                         px-6 md:px-7 py-3 md:py-3.5 rounded-xl
                         hover:-translate-y-0.5 hover:bg-dorado-soft
                         hover:shadow-[0_10px_32px_rgba(200,169,106,0.5)]
                         transition-all duration-300 text-sm md:text-base"
            >
              {h.ctaPrimary.label}
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none"
                   className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={h.ctaSecondary.href}
              className="inline-flex items-center gap-2 bg-transparent text-white/85 font-medium
                         px-6 md:px-7 py-3 md:py-3.5 rounded-xl border border-white/25
                         hover:border-white/55 hover:text-white hover:bg-white/5
                         transition-all duration-300 text-sm md:text-base"
            >
              {h.ctaSecondary.label}
            </Link>
          </div>

          {/* content type pills */}
          <ul className="flex flex-wrap gap-2 text-xs text-white/50">
            {h.pills.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/20">·</span>}
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2 text-white/35"
        aria-hidden
      >
        <span className="text-[0.65rem] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
