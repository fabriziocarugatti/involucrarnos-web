import type { Metadata } from 'next'
import { Nunito, Inter, Lora } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Involucrarnos — Política que se entiende, comunidad que se construye',
  description: 'Comunicación política clara, honesta y útil para la ciudadanía del NOA.',
  openGraph: {
    title: 'Involucrarnos',
    description: 'Política que se entiende, comunidad que se construye.',
    images: ['/assets/logo-involucrarnos.png'],
    locale: 'es_AR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${nunito.variable} ${inter.variable} ${lora.variable}`}>
      <body className="font-body text-texto bg-white antialiased">
        {children}
      </body>
    </html>
  )
}
