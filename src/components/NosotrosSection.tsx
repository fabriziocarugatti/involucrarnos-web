import Image from 'next/image'

export default function NosotrosSection() {
  return (
    <section id="nosotros" className="bg-azul py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="reveal">
            <span className="inline-flex items-center gap-3 text-dorado text-xs font-bold tracking-widest uppercase mb-6">
              <span className="block w-7 h-0.5 bg-dorado rounded" />
              Nosotros
            </span>
            <h2 className="font-title font-black text-white text-4xl md:text-5xl leading-tight tracking-tight mb-7">
              Política con rigor.{' '}
              <em className="not-italic text-dorado">Gestión con propósito.</em>
            </h2>
            <p className="text-white/70 leading-relaxed mb-5">
              Involucrarnos nació de la convicción de que la política puede ejercerse con
              inteligencia, evidencia y vocación real de servicio.
            </p>
            <p className="text-white/70 leading-relaxed mb-5">
              Somos un espacio de pensamiento y acción política para el NOA. Creemos en la
              reforma del Estado — no en su destrucción — y en una generación que quiere hacer
              las cosas bien, no solo hacerlas diferente.
            </p>
            <p className="text-white/70 leading-relaxed">
              Desde Tucumán, conectamos análisis, gestión pública y desarrollo territorial con
              una comunidad que exige más.
            </p>
          </div>

          {/* Card */}
          <div className="reveal">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src="/assets/logo-exequiel.png"
                  alt="Exequiel Soria Arruñada"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-dorado/40"
                />
                <div>
                  <p className="font-title font-800 text-white text-lg leading-snug">
                    Exequiel Soria Arruñada
                  </p>
                  <p className="text-dorado text-xs font-medium leading-snug mt-1">
                    Fundador
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Magíster en Políticas Públicas. Estudiante del Máster en Gobernanza y Derechos
                Humanos, Universidad Autónoma de Madrid. Tucumano. Convencido de que el NOA
                puede construir instituciones que funcionen.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Políticas Públicas', 'Gestión Estatal', 'Desarrollo Territorial', 'NOA'].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-dorado/80 bg-dorado/10 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
