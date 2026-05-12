import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const allLinks = [...site.nav.links, site.nav.cta]

  return (
    <footer className="bg-crema border-t border-black/8 py-12 md:py-14">
      <div className="max-w-6xl mx-auto px-5 md:px-6">
        <div className="border-b border-black/8 pb-10 mb-10">
          <p className="font-title font-black text-azul-dark text-2xl md:text-4xl leading-[1.1] tracking-tight max-w-3xl">
            Esto es público.{' '}<span className="text-dorado">Usalo, citalo, mejoralo.</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-sm">
            <Link href="/" aria-label={`${site.name} — inicio`}>
              <Image
                src="/assets/logo-involucrarnos.png"
                alt={site.name}
                width={120}
                height={30}
                className="h-7 w-auto object-contain mb-4 opacity-70 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-texto/45 text-xs leading-relaxed">
              {site.footer.tagline}
            </p>
          </div>

          <nav aria-label="Navegación del pie">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {allLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-texto/50 hover:text-azul-dark text-sm transition-colors font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-black/8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-texto/35 text-xs">
            © {year} {site.name}. {site.footer.rights}
          </p>
          <p className="text-texto/30 text-xs">{site.location}</p>
        </div>
      </div>
    </footer>
  )
}
