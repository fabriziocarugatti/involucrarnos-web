import AnnouncementBanner from '@/components/AnnouncementBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContenidosSection from '@/components/ContenidosSection'
import CursosSection from '@/components/CursosSection'
import EstudiosSection from '@/components/EstudiosSection'
import NosotrosSection from '@/components/NosotrosSection'
import SumateSection from '@/components/SumateSection'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <ContenidosSection />
        <CursosSection />
        <EstudiosSection />
        <NosotrosSection />
        <SumateSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  )
}
