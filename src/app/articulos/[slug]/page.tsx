import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import { articulos, getArticulo } from '@/data/articulos'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return articulos
    .filter((a) => a.published)
    .map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const art = getArticulo(params.slug)
  if (!art) return {}
  return {
    title: `${art.title} — Involucrarnos`,
    description: art.bajada,
    openGraph: {
      title: art.title,
      description: art.bajada,
      locale: 'es_AR',
      type: 'article',
    },
  }
}

export default function ArticuloPage({ params }: Props) {
  const art = getArticulo(params.slug)
  if (!art || !art.published) notFound()

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <header className="bg-azul py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/#articulos"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/80
                         text-sm transition-colors mb-10"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path
                  d="M12.5 7.5h-10M6 3.5l-4 4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Volver a artículos
            </Link>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-3xl">{art.emoji}</span>
              <span className="text-xs font-bold tracking-widest uppercase text-dorado">
                {art.category}
              </span>
            </div>

            <h1 className="font-title font-black text-white text-3xl md:text-5xl leading-tight tracking-tight mb-6">
              {art.title}
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-2xl">
              {art.bajada}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <Image
                src="/assets/logo-exequiel.png"
                alt={art.author}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover ring-1 ring-dorado/30"
              />
              <div>
                <p className="text-white font-medium text-sm">{art.author}</p>
                <p className="text-white/40 text-xs">{art.authorRole}</p>
              </div>
              <span className="ml-auto text-white/30 text-xs">{art.date}</span>
            </div>
          </div>
        </header>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 prose-article font-article text-texto">
          {art.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2 key={i}>{block.text}</h2>
              )
            }
            if (block.type === 'blockquote') {
              return (
                <blockquote key={i}>
                  <p>{block.text}</p>
                </blockquote>
              )
            }
            return <p key={i}>{block.text}</p>
          })}
        </article>

        {/* CTA */}
        <div className="max-w-3xl mx-auto px-6 pb-20">
          <div className="bg-crema rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <p className="font-title font-800 text-azul-dark text-lg mb-1">
                ¿Te gustó este artículo?
              </p>
              <p className="text-texto/50 text-sm">
                Sumate a la comunidad y recibí el próximo análisis directo en tu mail.
              </p>
            </div>
            <Link
              href="/#sumate"
              className="inline-flex items-center gap-2 bg-azul text-white font-bold
                         px-6 py-3 rounded-xl hover:bg-azul-dark transition-colors text-sm whitespace-nowrap"
            >
              Suscribirme
              <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path
                  d="M2.5 7.5h10M9 3.5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
