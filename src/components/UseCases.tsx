import { useScrollAnimation } from '../hooks/useScrollAnimation'

const cases = [
  {
    emoji: '🏪',
    title: 'Emprendedores y ferias',
    description:
      'Control de stock y ventas en tiempo real desde tu celular, sin complicaciones ni costos de implementación elevados.',
    tags: ['Inventario', 'Ventas'],
  },
  {
    emoji: '🏢',
    title: 'Empresas medianas',
    description:
      'Digitalización de procesos internos: checklists, auditorías, gestión de personal y más, todo desde un solo lugar.',
    tags: ['Procesos', 'Auditorías'],
  },
  {
    emoji: '👷',
    title: 'Trabajadores dependientes',
    description:
      'Verificación de beneficios laborales según ley peruana. Conoce exactamente lo que te corresponde cobrar.',
    tags: ['Horas extras', 'Beneficios'],
  },
  {
    emoji: '🛒',
    title: 'Comercios y tiendas',
    description:
      'Cotizaciones profesionales al instante y gestión de productos adaptados a tu rubro y forma de trabajar.',
    tags: ['Cotizaciones', 'Productos'],
  },
]

export default function UseCases() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4 border border-blue-100">
            Para quién es
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
            ¿Tu negocio está aquí?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Trabajo con emprendedores, empresas y profesionales de todos los rubros en Perú.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 gap-6">
          {cases.map((useCase, i) => (
            <div
              key={useCase.title}
              className={`bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 animate-on-scroll ${
                isVisible ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-5">
                <div className="text-4xl flex-shrink-0">{useCase.emoji}</div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{useCase.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-50 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-blue-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
