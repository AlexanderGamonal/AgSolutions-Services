import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { PRICING, whatsappLink } from '../config'

interface Service {
  key: keyof typeof PRICING
  emoji: string
  name: string
  tagline: string
  includes: string[]
  idealFor: string
  highlighted?: boolean
  badge?: string
}

const services: Service[] = [
  {
    key: 'web',
    emoji: '🌐',
    name: 'Web para tu negocio',
    tagline: 'Que tus clientes te encuentren y te escriban.',
    includes: [
      'Página profesional con tu marca, adaptada a celular',
      'Botón de WhatsApp y formulario de contacto',
      'Catálogo o lista de servicios',
      'Configuración básica para aparecer en Google',
    ],
    idealFor: 'Emprendedores que empiezan a vender en internet',
  },
  {
    key: 'automation',
    emoji: '⚙️',
    name: 'Automatización de procesos',
    tagline: 'Tu operación diaria, sin papel ni errores.',
    includes: [
      'Inventario, cotizaciones, checklists o registros a medida',
      'Reportes en PDF enviados solos al correo',
      'Conexión con WhatsApp, Google Sheets y correo',
      'Panel para ver tu negocio en tiempo real',
    ],
    idealFor: 'Pymes que pierden horas en Excel, papel o tareas repetidas',
    highlighted: true,
    badge: 'Más solicitado',
  },
  {
    key: 'ai',
    emoji: '🤖',
    name: 'Automatización con IA',
    tagline: 'Un asistente que trabaja mientras tú atiendes.',
    includes: [
      'Asistente que responde preguntas frecuentes de tus clientes',
      'Lectura de facturas o documentos y paso de datos a Excel',
      'Resúmenes automáticos de ventas, pedidos o reportes',
      'Siempre con revisión humana en lo importante',
    ],
    idealFor: 'Negocios con muchas consultas o mucho papeleo',
    badge: 'Nuevo',
  },
]

const guarantees = [
  { emoji: '⚡', title: 'Listo en días', text: 'Empezamos por lo que más te duele y lo lanzamos rápido.' },
  { emoji: '🎨', title: '100% a tu marca', text: 'Tu logo, tus colores y tu forma de trabajar.' },
  { emoji: '📈', title: 'Crece contigo', text: 'Empezamos simple y sumamos funciones cuando las necesites.' },
]

const priceLabel = (price: string | null) => (price ? `Desde ${price}` : 'Cotización gratis en 24h')

export default function Services() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="servicios" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-50 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-4 border border-blue-100">
            Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary mb-4">
            Elige por dónde empezar
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Tres formas de digitalizar tu negocio, con o sin inteligencia artificial. Si no sabes cuál elegir,
            el diagnóstico gratuito te lo dice.
          </p>
        </div>

        <div ref={ref} className="grid lg:grid-cols-3 gap-8 mb-10">
          {services.map((service, i) => (
            <div
              key={service.key}
              className={`relative bg-white rounded-2xl p-8 flex flex-col transition-all duration-500 animate-on-scroll ${
                service.highlighted
                  ? 'border-2 border-primary shadow-2xl shadow-blue-500/10 lg:-translate-y-2'
                  : 'border border-gray-100 hover:shadow-xl'
              } ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {service.badge && (
                <span
                  className={`absolute -top-3 left-8 text-xs font-bold px-3 py-1 rounded-full ${
                    service.highlighted ? 'bg-primary text-white' : 'bg-accent text-white'
                  }`}
                >
                  {service.badge}
                </span>
              )}
              <div className="text-4xl mb-4">{service.emoji}</div>
              <h3 className="text-xl font-bold text-secondary mb-1">{service.name}</h3>
              <p className="text-gray-500 text-sm mb-5">{service.tagline}</p>
              <p className="text-2xl font-extrabold text-secondary mb-6">{priceLabel(PRICING[service.key])}</p>

              <ul className="space-y-3 mb-6 flex-1">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 mb-5">
                <span className="font-semibold uppercase tracking-wide">Ideal para:</span> {service.idealFor}
              </p>

              <a
                href={whatsappLink(`Hola AG Solutions, me interesa el servicio "${service.name}". Mi negocio es: `)}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-center font-semibold py-3 px-6 rounded-xl transition-all duration-200 ${
                  service.highlighted
                    ? 'bg-primary hover:bg-blue-700 text-white'
                    : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                Quiero este servicio
              </a>
            </div>
          ))}
        </div>

        <div className="bg-secondary rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">🛠️ Plan de mantenimiento mensual</h3>
            <p className="text-gray-300 text-sm max-w-2xl">
              Soporte, copias de seguridad, ajustes y mejoras continuas para que tu sistema nunca se detenga.
              Disponible para cualquier servicio.
            </p>
          </div>
          <p className="text-white text-lg font-bold whitespace-nowrap">
            {PRICING.maintenance ? `Desde ${PRICING.maintenance}/mes` : 'Consúltanos'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {guarantees.map((g) => (
            <div key={g.title} className="flex items-start gap-4">
              <span className="text-3xl">{g.emoji}</span>
              <div>
                <h4 className="font-bold text-secondary">{g.title}</h4>
                <p className="text-gray-500 text-sm">{g.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
