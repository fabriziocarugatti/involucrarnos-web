import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ChatAssistant from '@/components/ChatAssistant'
import { articulos, getArticulo } from '@/data/articulos'
import { site } from '@/data/site'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return articulos.filter((a) => a.published).map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const art = getArticulo(params.slug)
  if (!art) return {}
  return {
    title: `${art.title} — ${site.name}`,
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
  const cta = site.articleCta
  const tipoLabel = site.tipos[art.tipo].label

  return (
    <>
      <Navbar />
      <main>
        <header className="bg-azul-dark relative grain py-16 md:py-24 lg:py-28 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 75% 40%, rgba(200,169,106,0.10) 0%, transparent 60%)',
            }}
          />
          <div className="relative max-w-3xl mx-auto px-5 md:px-6">
            <Link
              href="/#contenidos"
              className="inline-flex items-center gap-2 text-white/45 hover:text-white/85
                         text-sm transition-colors mb-8 md:mb-10"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path d="M12.5 7.5h-10M6 3.5l-4 4 4 4" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Volver a contenidos
            </Link>

            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-dorado bg-dorado/15 rounded-full px-3 py-1">
                {tipoLabel}
              </span>
              <span className="text-xs font-medium text-white/45">{art.category}</span>
              <span className="text-xs text-white/35">· {art.date}</span>
            </div>

            <h1 className="font-title font-black text-white text-3xl md:text-4xl lg:text-[3rem] leading-[1.1] tracking-tight mb-6">
              {art.title}
            </h1>

            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-2xl">
              {art.bajada}
            </p>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <Image
                src={art.authorPhoto || '/assets/exequiel.jpg'}
                alt={art.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover ring-1 ring-dorado/40"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{art.author}</p>
                <p className="text-white/40 text-xs truncate">{art.authorRole}</p>
              </div>
            </div>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-5 md:px-6 py-14 md:py-20 prose-article font-article text-texto text-[1.05rem] leading-[1.75]">
          {art.content.map((block, i) => {
            if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>
            if (block.type === 'blockquote') return <blockquote key={i}><p>{block.text}</p></blockquote>
            return <p key={i}>{block.text}</p>
          })}
        </article>

        <div className="max-w-3xl mx-auto px-5 md:px-6 pb-20">
          <div className="bg-crema rounded-2xl p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6">
            <div className="flex-1">
              <p className="font-title font-800 text-azul-dark text-lg mb-1">{cta.title}</p>
              <p className="text-texto/55 text-sm">{cta.body}</p>
            </div>
            <Link
              href="/#sumate"
              className="inline-flex items-center gap-2 bg-azul text-white font-bold
                         px-6 py-3 rounded-xl hover:bg-azul-dark transition-colors text-sm whitespace-nowrap"
            >
              {cta.label}
              <svg width="13" height="13" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path d="M2.5 7.5h10M9 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatAssistant />
    </>
  )
}
