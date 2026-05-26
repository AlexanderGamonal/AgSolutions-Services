import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ChevronRight, Building2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Client } from '../../types'

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setClients((data as Client[]) || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Clientes</h2>
          <p className="text-gray-400 mt-1 text-sm">{clients.length} clientes registrados</p>
        </div>
        <Link
          to="/admin/clients/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} />
          Nuevo cliente
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
        </div>
      ) : clients.length === 0 ? (
        <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-xl">
          <Building2 size={40} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Aún no tienes clientes registrados.</p>
          <Link to="/admin/clients/new" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">
            Agregar el primero
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {clients.map(client => (
            <Link
              key={client.id}
              to={`/admin/clients/${client.id}`}
              className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                  <span className="text-blue-400 font-semibold text-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{client.name}</p>
                  <p className="text-gray-500 text-sm">{client.company || client.email || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  client.status === 'active'
                    ? 'bg-emerald-400/10 text-emerald-400'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {client.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
                <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
