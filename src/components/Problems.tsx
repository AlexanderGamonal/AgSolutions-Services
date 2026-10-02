import { useScrollAnimation } from '../hooks/useScrollAnimation'

const problems = [
  {
    emoji: '📒',
    text: '¿Llevas el inventario en cuaderno o Excel y nunca cuadra?',
  },
  {
    emoji: '🧮',
    text: '¿Armas cada cotización a mano y a veces calculas mal el IGV?',
  },
  {
    emoji: '💬',
    text: '¿Respondes las mismas preguntas por WhatsApp todo el día?',
  },
  {
    emoji: '📄',
    text: '¿Tus reportes o checklists en papel se pierden cuando más los necesitas?',
  },
  {
    emoji: '⏰',
    text: '¿Pierdes horas copiando datos de un lado a otro?',
  },
  {
    emoji: '🌐',
    text: '¿Tus clientes te buscan en internet y no te encuentran?',
  },
]

export default function Problems() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
            ¿Te suena familiar?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Si respondiste que sí a alguna, hay una tarea en tu negocio que se puede automatizar.
          </p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <div
              key={problem.text}
              className={`flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 animate-on-scroll ${
                isVisible ? 'visible' : ''
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl flex-shrink-0">{problem.emoji}</span>
              <p className="text-gray-700 font-medium leading-snug">{problem.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
