import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatAssistant from '@/components/ChatAssistant'
import ProyectosSection from '@/components/ProyectosSection'

export const metadata: Metadata = {
  title: 'Proyectos | Involucrarnos',
  description: 'Herramientas, dashboards, programas e iniciativas abiertas de Involucrarnos para pensar y construir mejor lo público.',
  openGraph: {
    title: 'Proyectos de Involucrarnos',
    description: 'Herramientas, dashboards, programas e iniciativas abiertas para pensar y construir mejor lo público.',
    locale: 'es_AR',
    type: 'website',
  },
}

export default function ProyectosPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-azul-deep pt-24 pb-2 px-5 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Volver al inicio
            </Link>
          </div>
        </div>
        <ProyectosSection />
      </main>
      <Footer />
      <ChatAssistant />
    </>
  )
}
