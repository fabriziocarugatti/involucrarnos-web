import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex items-center justify-center px-5">
        <div className="max-w-lg w-full text-center">
          {/* Número grande */}
          <p
            className="font-title font-black text-[8rem] md:text-[10rem] leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #161a4c 0%, #C8A96A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            aria-hidden
          >
            404
          </p>

          <h1 className="font-title font-black text-azul-dark text-2xl md:text-3xl mb-3 -mt-2">
            Esta página no existe
          </h1>
          <p className="text-texto/55 text-base mb-10 leading-relaxed">
            Puede que la URL esté mal escrita, o que el contenido haya sido movido.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-azul-dark text-white
                         font-bold px-6 py-3 rounded-xl hover:bg-azul transition-colors text-sm"
            >
              ← Volver al inicio
            </Link>
            <Link
              href="/#estudios"
              className="inline-flex items-center justify-center gap-2 border border-dorado/40
                         text-azul-dark font-bold px-6 py-3 rounded-xl hover:bg-dorado/8
                         hover:border-dorado/70 transition-colors text-sm"
            >
              Ver estudios
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
