export const WHATSAPP_NUMBER = '51942137116'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const EMAIL = 'agsolutionsandservices@gmail.com'

/** Link de WhatsApp con un mensaje ya escrito, para saber de qué sección viene el cliente. */
export const whatsappLink = (message: string) =>
  `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`

export const DIAGNOSTIC_MESSAGE =
  'Hola AG Solutions, quiero agendar mi diagnóstico gratuito de 20 minutos. Mi negocio es: '

/**
 * Precios "desde" de cada paquete (en soles).
 * Déjalos en null mientras no los definas: la web mostrará "Cotización gratis en 24h".
 * Ejemplo: priceFrom: 'S/ 800'
 */
export const PRICING: Record<'web' | 'automation' | 'ai' | 'maintenance', string | null> = {
  web: null,
  automation: null,
  ai: null,
  maintenance: null,
}
