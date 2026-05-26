import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface ClientDraft {
  name: string
  email: string
  phone: string
  company: string
  notes: string
}

export default function ClientFormPage() {
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<ClientDraft>({ name: '', email: '', phone: '', company: '', notes: '' })

  const set = (key: keyof ClientDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    const { data, error } = await supabase.from('clients').insert(form).select().single()
    if (error) {
      setError('Error al guardar el cliente. Intenta nuevamente.')
      setSaving(false)
    } else {
      navigate(`/admin/clients/${data.id}`)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <Link
        to="/admin/clients"
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Volver a clientes
      </Link>

      <h2 className="text-2xl font-bold text-white mb-6">Nuevo cliente</h2>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Nombre *</label>
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={set('email')}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Teléfono</label>
            <input
              type="text"
              value={form.phone}
              onChange={set('phone')}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Empresa</label>
          <input
            type="text"
            value={form.company}
            onChange={set('company')}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Notas internas</label>
          <textarea
            value={form.notes}
            onChange={set('notes')}
            rows={3}
            placeholder="Contexto del cliente, tipo de proyecto, etc."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-2.5">{error}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          {saving ? 'Guardando...' : 'Crear cliente'}
        </button>
      </form>
    </div>
  )
}
