import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ArticulosSection from '@/components/ArticulosSection'
import NosotrosSection from '@/components/NosotrosSection'
import SumateSection from '@/components/SumateSection'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import RevealObserver from '@/components/RevealObserver'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ArticulosSection />
        <NosotrosSection />
        <SumateSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
    </>
  )
}
