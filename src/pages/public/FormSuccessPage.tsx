import { CheckCircle } from 'lucide-react'

export default function FormSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">¡Gracias por tu respuesta!</h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Hemos recibido tu información correctamente. Nos pondremos en contacto contigo a la brevedad para continuar con el proceso.
        </p>
        <p className="text-gray-600 text-xs mt-6">— AG Solutions &amp; Services</p>
      </div>
    </div>
  )
}
