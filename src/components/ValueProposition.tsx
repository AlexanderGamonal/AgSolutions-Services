import { useScrollAnimation } from '../hooks/useScrollAnimation'

const values = [
  {
    icon: '⚡',
    title: 'Listo en días, no en meses',
    description:
      'Implementación rápida y sin burocracia. Tu solución funcionando en tiempo récord, sin reuniones interminables.',
  },
  {
    icon: '🎨',
    title: '100% a tu marca',
    description:
      'Logo, colores y nombre de tu negocio. Tu cliente nunca sabrá que usaste una solución lista — porque parece hecha solo para ti.',
  },
  {
    icon: '📈',
    title: 'Crece contigo',
    description:
      'Escalable según las necesidades de tu empresa. Empezamos simple y crecemos juntos sin cambiar de sistema.',
  },
]

export default function ValueProposition() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <div
              key={value.title}
              className={`text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 group animate-on-scroll ${
                isVisible ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{value.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
