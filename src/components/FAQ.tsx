import { useState } from 'react'

const faqs = [
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende de lo que necesites automatizar. En el diagnóstico gratuito revisamos tu caso y en 24 horas te enviamos una propuesta con precio cerrado, sin sorpresas.',
  },
  {
    q: '¿Cuánto tiempo tarda?',
    a: 'Una web o una adaptación de nuestras apps puede estar lista en días. Proyectos a medida más grandes se entregan por etapas, para que empieces a usar lo primero cuanto antes.',
  },
  {
    q: 'No sé nada de tecnología, ¿igual puedo usarlo?',
    a: 'Sí. Diseñamos todo para usarse desde el celular, tan fácil como WhatsApp, y te capacitamos a ti y a tu equipo antes de entregar.',
  },
  {
    q: '¿Necesito inteligencia artificial?',
    a: 'No siempre. Muchas tareas se resuelven con una automatización simple, que es más barata y confiable. Te recomendamos IA solo cuando de verdad te ahorra tiempo o dinero.',
  },
  {
    q: '¿Qué pasa después de la entrega?',
    a: 'Incluimos un periodo de soporte para ajustes. Después puedes contratar el plan de mantenimiento mensual para mejoras, soporte y copias de seguridad.',
  },
  {
    q: '¿Mis datos están seguros?',
    a: 'Tus datos son tuyos. Usamos servicios en la nube reconocidos, con acceso protegido por usuario y contraseña, y no compartimos tu información con terceros.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="preguntas" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-50 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4 border border-blue-100">
            Preguntas frecuentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary">Resolvemos tus dudas</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="bg-white rounded-xl border border-gray-100">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-semibold text-secondary"
              >
                {faq.q}
                <svg
                  className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${open === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === i && <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
