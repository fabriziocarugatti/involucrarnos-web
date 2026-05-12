import AnnouncementBanner from '@/components/AnnouncementBanner'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ContenidosSection from '@/components/ContenidosSection'
import CursosSection from '@/components/CursosSection'
import EstudiosSection from '@/components/EstudiosSection'
import ProyectosSection from '@/components/ProyectosSection'
import HubSection from '@/components/HubSection'
import NosotrosSection from '@/components/NosotrosSection'
import SumateSection from '@/components/SumateSection'
import Footer from '@/components/Footer'
import ChatAssistant from '@/components/ChatAssistant'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <Hero />
        <HubSection />
        <EstudiosSection />
        <ProyectosSection />
        <ContenidosSection />
        <CursosSection />
        <NosotrosSection />
        <SumateSection />
      </main>
      <Footer />
      <ChatAssistant />
      <RevealObserver />
    </>
  )
}
