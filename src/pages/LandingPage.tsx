import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ValueProposition from '../components/ValueProposition'
import Solutions from '../components/Solutions'
import HowItWorks from '../components/HowItWorks'
import UseCases from '../components/UseCases'
import CTAFinal from '../components/CTAFinal'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ValueProposition />
      <Solutions />
      <HowItWorks />
      <UseCases />
      <CTAFinal />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
