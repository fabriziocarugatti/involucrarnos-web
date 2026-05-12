import AnnouncementBanner from '@/components/AnnouncementBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContenidosSection from '@/components/ContenidosSection'
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
        <NosotrosSection />
        <SumateSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  )
}
