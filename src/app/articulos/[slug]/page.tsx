import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatAssistant from '@/components/ChatAssistant'
import ArticleSummary from '@/components/ArticleSummary'
import { getAllArticulos, getArticuloBySlug } from '@/sanity/queries'
import { articulos } from '@/data/articulos'
import { site } from '@/data/site'
import { ArrowRight } from 'lucide-react'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  const all = await getAllArticulos()
  return all.filter((a) => a.published).map((a) => ({ slug: a.slug }))
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const art = await getArticuloBySlug(params.slug)
  if (!art) return {}
  return {
    title: `${art.title} — ${site.name}`,
    description: art.bajada,
    openGraph: {
      title: art.title,
      description: art.bajada,
      images: art.coverImage ? [art.coverImage] : ['/assets/logo-involucrarnos.png'],
      locale: 'es_AR',
      type: 'article',
    },
  }
}

function readingTime(content: { type: string; text: string }[]): number {
  const words = content.reduce((acc, b) => acc + b.text.split(/\s+/).length, 0)
  return Math.max(1, Math.ceil(words / 220))
}

export default async function ArticuloPage({ params }: Props) {
  const art = await getArticuloBySlug(params.slug)
  if (!art || !art.published) notFound()
  const cta = site.articleCta
  const tipoLabel = site.tipos[art.tipo].label
  const mins = readingTime(art.content)

  // Related articles: same category, published, exclude self, up to 3
  const related = articulos
    .filter((a) => a.published && a.tipo === 'articulo' && a.slug !== art.slug && a.category === art.category)
    .slice(0, 3)
  const fallbackRelated = related.length < 2
    ? articulos.filter((a) => a.published && a.tipo === 'articulo' && a.slug !== art.slug).slice(0, 3 - related.length)
    : []
  const allRelated = [...related, ...fallbackRelated].slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        <header className="bg-azul-dark relative grain py-12 md:py-16 overflow-hidden">
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
              <span className="text-xs text-white/30">· {mins} min de lectura</span>
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
                className="w-12 h-12 rounded-full object-cover object-top ring-1 ring-dorado/40"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{art.author}</p>
                <p className="text-white/40 text-xs truncate">{art.authorRole}</p>
              </div>
            </div>
          </div>
        </header>

        <ArticleSummary slug={art.slug} />

        <article className="max-w-3xl mx-auto px-5 md:px-6 pt-2 pb-14 md:pb-20 prose-article font-article text-texto text-[1.05rem] leading-[1.75]">
          {art.content.map((block, i) => {
            if (block.type === 'heading') return <h2 key={i}>{block.text}</h2>
            if (block.type === 'blockquote') return (
              <blockquote
                key={i}
                className="not-italic my-8 pl-6 border-l-4 border-dorado relative"
              >
                <span
                  className="absolute -top-2 left-4 font-title font-black text-dorado text-5xl leading-none select-none"
                  aria-hidden
                >
                  «
                </span>
                <p className="font-title font-black text-azul-dark text-xl md:text-2xl italic leading-snug">
                  {block.text}
                </p>
              </blockquote>
            )
            return <p key={i}>{block.text}</p>
          })}
        </article>

        {/* CTA dorado */}
        <div className="max-w-3xl mx-auto px-5 md:px-6 pb-14">
          <div className="bg-crema rounded-2xl p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6">
            <div className="flex-1">
              <p className="font-title font-800 text-azul-dark text-lg mb-1">{cta.title}</p>
              <p className="text-texto/55 text-sm">{cta.body}</p>
            </div>
            <Link
              href="/#sumate"
              className="inline-flex items-center gap-2 bg-dorado text-azul-dark font-bold
                         px-6 py-3 rounded-xl hover:bg-dorado-soft transition-colors text-sm
                         whitespace-nowrap shadow-[0_4px_16px_rgba(200,169,106,0.3)]"
            >
              {cta.label}
              <ArrowRight size={13} strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        {/* Seguí leyendo */}
        {allRelated.length > 0 && (
          <section className="max-w-3xl mx-auto px-5 md:px-6 pb-20">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[0.7rem] font-bold tracking-[0.18em] uppercase text-texto/40">Seguí leyendo</span>
              <span className="flex-1 h-px bg-black/8" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allRelated.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/articulos/${rel.slug}`}
                  className="group flex flex-col gap-2 bg-white border border-black/8 rounded-xl p-4
                             hover:border-dorado/40 hover:shadow-[0_8px_24px_rgba(42,47,118,0.10)]
                             transition-all duration-300"
                >
                  <span className="text-[0.6rem] font-bold tracking-widest uppercase text-dorado-deep/70">
                    {rel.category}
                  </span>
                  <p className="font-title font-800 text-azul-dark text-sm leading-snug line-clamp-3 group-hover:text-azul transition-colors">
                    {rel.title}
                  </p>
                  <span className="mt-auto text-[0.72rem] font-bold text-azul/60 group-hover:text-dorado-deep transition-colors flex items-center gap-1">
                    Leer
                    <ArrowRight size={11} strokeWidth={2.4} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
      <ChatAssistant />
    </>
  )
}
