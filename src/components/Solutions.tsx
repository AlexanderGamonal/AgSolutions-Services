import type { ReactNode } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface SolutionCard {
  icon: ReactNode
  name: string
  category: string
  benefit: string
  features: string[]
  demo: string
  gradient: string
}

const solutions: SolutionCard[] = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    name: 'VitalStock',
    category: 'Control de Inventario para Puntos de Venta',
    benefit: 'Nunca más pierdas ventas por no saber qué tienes en stock',
    features: [
      'Control de stock en tiempo real desde tu celular',
      'Ideal para ferias, tiendas y comercios',
      'Adaptable a cualquier tipo de producto y marca',
    ],
    demo: 'https://vitalstock.vercel.app',
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    name: 'Control HHEE',
    category: 'Verificador de Horas Extras',
    benefit: 'Asegúrate de que te paguen exactamente lo que te deben',
    features: [
      'Calcula tus horas extras según ley peruana',
      'Registro por período con historial completo',
      'Exporta a Google Sheets o CSV como evidencia',
    ],
    demo: 'https://alexandergamonal.github.io/Control-HHEE/index.html',
    gradient: 'from-emerald-600 to-emerald-800',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    name: 'CheckList Digital',
    category: 'Auditorías y Mantenimiento sin Papel',
    benefit: 'Elimina el papeleo — auditorías y checklists desde el celular',
    features: [
      'Reemplaza planillas Excel y formularios impresos',
      'Registro digital con fecha, hora y responsable',
      'Disponible offline, funciona en campo',
    ],
    demo: 'https://check-list-preventivo.vercel.app',
    gradient: 'from-violet-600 to-violet-800',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    name: 'Cotizador Automático',
    category: 'Presupuestos Profesionales al Instante',
    benefit: 'Genera cotizaciones profesionales en segundos, sin errores',
    features: [
      'Calcula precios automáticamente según tus productos/servicios',
      'Presentación profesional lista para enviar al cliente',
      'Adaptable a cualquier rubro comercial',
    ],
    demo: 'https://cotizador-automatico.vercel.app',
    gradient: 'from-orange-500 to-orange-700',
  },
]

export default function Solutions() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="soluciones" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4 border border-blue-100">
            Soluciones listas para usar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
            Herramientas que ya funcionan
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Cada solución está probada en el mercado y se adapta 100% a tu negocio en días.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {solutions.map((solution, i) => (
            <div
              key={solution.name}
              className={`bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col animate-on-scroll ${
                isVisible ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${solution.gradient} p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    {solution.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/20 border border-white/30">
                    Adaptable a tu negocio
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{solution.name}</h3>
                <p className="text-white/75 text-sm mt-1">{solution.category}</p>
              </div>

              {/* Card body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-800 font-semibold text-base mb-6 leading-snug">
                  &ldquo;{solution.benefit}&rdquo;
                </p>

                <ul className="space-y-3 mb-6 flex-1">
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-accent flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={solution.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 group"
                >
                  <svg
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Ver demo en vivo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
