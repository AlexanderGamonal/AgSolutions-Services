import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { whatsappLink, DIAGNOSTIC_MESSAGE } from '../config'

const steps = [
  {
    emoji: '💬',
    title: 'Diagnóstico gratis',
    description:
      'En 20 minutos me cuentas cómo trabajas hoy y detectamos qué tarea te conviene automatizar primero.',
  },
  {
    emoji: '🎨',
    title: 'Propuesta en 24h',
    description:
      'Te enviamos qué haremos, en cuánto tiempo y a qué precio. Sin letra pequeña.',
  },
  {
    emoji: '🚀',
    title: 'Lanzamos',
    description:
      'Construimos con tu marca y tus datos reales, te capacitamos y te acompañamos después de entregar.',
  },
]

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-50 text-accent font-semibold text-sm px-4 py-2 rounded-full mb-4 border border-emerald-100">
            Cómo trabajamos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Sin reuniones interminables ni contratos complicados. Tres pasos y tu negocio empieza a ahorrar tiempo.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`text-center animate-on-scroll ${
                isVisible ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-blue-700 rounded-2xl shadow-lg shadow-blue-500/25 mb-6 text-5xl">
                {step.emoji}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-white text-sm font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={whatsappLink(DIAGNOSTIC_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
          >
            Agendar diagnóstico gratis
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
