import Image from 'next/image'
import { site } from '@/data/site'
import Particles from './Particles'

export default function NosotrosSection() {
  const n = site.nosotros

  return (
    <section id="nosotros" className="relative bg-azul-dark py-20 md:py-28 lg:py-32 overflow-hidden grain">
      {/* slow-drifting azul blobs */}
      <div className="blob-field">
        <div
          className="blob"
          style={{
            width: '600px',
            height: '600px',
            background: 'rgba(42,47,118,0.6)',
            top: '-15%',
            left: '-10%',
            animationDuration: '34s',
            animationName: 'drift3',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
        <div
          className="blob"
          style={{
            width: '450px',
            height: '450px',
            background: 'rgba(22,26,76,0.65)',
            bottom: '-20%',
            right: '5%',
            animationDuration: '30s',
            animationName: 'drift2',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        />
      </div>
      <Particles count={12} />

      <div className="relative z-[3] max-w-6xl mx-auto px-5 md:px-6">
        {/* heading */}
        <div className="max-w-2xl mb-14 md:mb-16 reveal">
          <span className="eyebrow mb-5">{n.eyebrow}</span>
          <h2 className="font-title font-black text-white text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight">
            {n.titleStart}{' '}
            <em className="not-italic text-dorado">
              {n.titleAccent}
            </em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* manifesto column */}
          <div className="lg:col-span-7 space-y-5 reveal">
            {n.paragraphs.map((p, i) => (
              <p key={i} className="text-white/70 text-base md:text-lg leading-relaxed">
                {p}
              </p>
            ))}

            {/* valores list */}
            <ul className="mt-8 md:mt-10 grid sm:grid-cols-3 gap-4 pt-8 border-t border-white/8">
              {n.valores.map((v) => (
                <li key={v.titulo} className="flex flex-col gap-1.5">
                  <span className="text-dorado text-xs font-bold tracking-widest uppercase">
                    {v.titulo}
                  </span>
                  <span className="text-white/50 text-[0.82rem] leading-snug">
                    {v.detalle}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* founder card */}
          <aside className="lg:col-span-5 reveal">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-7 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-5">
                <Image
                  src="/assets/logo-exequiel.png"
                  alt={n.founderName}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-dorado/40"
                />
                <div>
                  <p className="font-title font-800 text-white text-base md:text-lg leading-snug">
                    {n.founderName}
                  </p>
                  <p className="text-dorado text-xs font-medium leading-snug mt-0.5">
                    {n.founderRole}
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                {n.founderBio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {n.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-medium text-dorado/85 bg-dorado/10 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
