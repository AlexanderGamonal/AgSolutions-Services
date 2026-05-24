import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { WHATSAPP_URL } from '../config'

const steps = [
  {
    emoji: '💬',
    title: 'Conversamos',
    description:
      'Me cuentas tu problema o proceso a digitalizar. Sin tecnicismos, en tu idioma, sin compromiso.',
  },
  {
    emoji: '🎨',
    title: 'Adaptamos',
    description:
      'Personalizamos la solución con tu marca, colores y datos reales de tu negocio.',
  },
  {
    emoji: '🚀',
    title: 'Lanzamos',
    description:
      'Tu app lista y funcionando en pocos días. Con capacitación y soporte incluido.',
  },
]

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="como-funciona" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-emerald-50 text-accent font-semibold text-sm px-4 py-2 rounded-full mb-4 border border-emerald-100">
            Proceso simple
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Sin reuniones interminables ni contratos complicados. Tres pasos y listo.
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
          >
            Empezar ahora
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
