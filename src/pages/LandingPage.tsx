import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Problems from '../components/Problems'
import Services from '../components/Services'
import Cases from '../components/Cases'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import CTAFinal from '../components/CTAFinal'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Problems />
      <Services />
      <Cases />
      <HowItWorks />
      <FAQ />
      <CTAFinal />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
