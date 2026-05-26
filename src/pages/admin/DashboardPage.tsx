import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, FileText, CheckCircle, Clock, Plus } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { StatsCard } from '../../components/admin/StatsCard'

interface Stats {
  totalClients: number
  draftForms: number
  sentForms: number
  completedForms: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ totalClients: 0, draftForms: 0, sentForms: 0, completedForms: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      const [{ count: clients }, { data: forms }] = await Promise.all([
        supabase.from('clients').select('*', { count: 'exact', head: true }),
        supabase.from('forms').select('status'),
      ])

      const byStatus = (forms || []).reduce<Record<string, number>>((acc, f) => {
        acc[f.status] = (acc[f.status] || 0) + 1
        return acc
      }, {})

      setStats({
        totalClients: clients || 0,
        draftForms: byStatus['draft'] || 0,
        sentForms: byStatus['sent'] || 0,
        completedForms: byStatus['completed'] || 0,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400 mt-1 text-sm">Bienvenido al panel de AG Solutions</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatsCard title="Clientes" value={stats.totalClients} icon={Users} color="blue" />
          <StatsCard title="Formularios borrador" value={stats.draftForms} icon={FileText} color="gray" />
          <StatsCard title="Formularios enviados" value={stats.sentForms} icon={Clock} color="yellow" />
          <StatsCard title="Formularios completados" value={stats.completedForms} icon={CheckCircle} color="green" />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          to="/admin/clients"
          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2.5 rounded-lg text-sm transition-colors"
        >
          <Users size={16} />
          Ver todos los clientes
        </Link>
        <Link
          to="/admin/clients/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} />
          Nuevo cliente
        </Link>
      </div>
    </div>
  )
}
