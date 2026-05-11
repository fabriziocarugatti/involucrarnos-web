import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-azul-dark border-t border-white/8 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" aria-label="Involucrarnos — inicio">
              <Image
                src="/assets/logo-involucrarnos.png"
                alt="Involucrarnos"
                width={120}
                height={30}
                className="h-7 w-auto object-contain mb-3 opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-white/30 text-xs leading-relaxed max-w-xs">
              Comunicación política con propósito. Análisis, gestión pública y desarrollo
              territorial para el NOA.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { href: '/#articulos', label: 'Artículos' },
                { href: '/#nosotros', label: 'Nosotros' },
                { href: '/#sumate', label: 'Sumate' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © {year} Involucrarnos. Todos los derechos reservados.
          </p>
          <p className="text-white/15 text-xs">Tucumán, Argentina</p>
        </div>
      </div>
    </footer>
  )
}
