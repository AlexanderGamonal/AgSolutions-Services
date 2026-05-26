import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, ExternalLink, Copy, Check, FileText } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import type { Client, Form, FormField, FormResponse } from '../../types'

const statusConfig = {
  draft: { label: 'Borrador', className: 'bg-gray-700 text-gray-400' },
  sent: { label: 'Enviado', className: 'bg-yellow-400/10 text-yellow-400' },
  completed: { label: 'Completado', className: 'bg-emerald-400/10 text-emerald-400' },
}

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [client, setClient] = useState<Client | null>(null)
  const [forms, setForms] = useState<Form[]>([])
  const [responses, setResponses] = useState<Record<string, FormResponse[]>>({})
  const [loading, setLoading] = useState(true)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [expandedForm, setExpandedForm] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('clients').select('*').eq('id', id).single(),
      supabase.from('forms').select('*').eq('client_id', id).order('created_at', { ascending: false }),
    ]).then(([{ data: clientData }, { data: formsData }]) => {
      setClient(clientData as Client)
      setForms((formsData as Form[]) || [])
      setLoading(false)
    })
  }, [id])

  const loadResponses = async (formId: string) => {
    if (responses[formId]) {
      setExpandedForm(expandedForm === formId ? null : formId)
      return
    }
    const { data } = await supabase
      .from('form_responses')
      .select('*')
      .eq('form_id', formId)
      .order('submitted_at', { ascending: false })
    setResponses(r => ({ ...r, [formId]: (data as FormResponse[]) || [] }))
    setExpandedForm(formId)
  }

  const copyLink = async (token: string) => {
    await navigator.clipboard.writeText(`${window.location.origin}/form/${token}`)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const markAsSent = async (formId: string) => {
    await supabase.from('forms').update({ status: 'sent' }).eq('id', formId)
    setForms(fs => fs.map(f => f.id === formId ? { ...f, status: 'sent' } : f))
  }

  if (loading) return (
    <div className="p-8 flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
    </div>
  )

  if (!client) return (
    <div className="p-8">
      <p className="text-gray-400">Cliente no encontrado.</p>
    </div>
  )

  return (
    <div className="p-8 max-w-4xl">
      <Link
        to="/admin/clients"
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Volver a clientes
      </Link>

      {/* Client info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
              <span className="text-blue-400 font-bold text-lg">{client.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{client.name}</h2>
              {client.company && <p className="text-gray-400 text-sm">{client.company}</p>}
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full ${
            client.status === 'active' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-gray-700 text-gray-400'
          }`}>
            {client.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
          {client.email && <span>✉ {client.email}</span>}
          {client.phone && <span>📞 {client.phone}</span>}
        </div>
        {client.notes && (
          <p className="mt-3 text-gray-500 text-sm border-t border-gray-800 pt-3">{client.notes}</p>
        )}
      </div>

      {/* Forms */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Formularios ({forms.length})</h3>
        <Link
          to={`/admin/forms/new?clientId=${client.id}`}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          <Plus size={14} />
          Nuevo formulario
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="text-center py-12 bg-gray-900 border border-gray-800 rounded-xl">
          <FileText size={36} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Aún no hay formularios para este cliente.</p>
          <Link
            to={`/admin/forms/new?clientId=${client.id}`}
            className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
          >
            Crear el primero
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {forms.map(f => {
            const st = statusConfig[f.status] || statusConfig.draft
            const isExpanded = expandedForm === f.id
            const formResponses = responses[f.id] || []

            return (
              <div key={f.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-medium truncate">{f.title}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${st.className}`}>
                          {st.label}
                        </span>
                      </div>
                      {f.description && (
                        <p className="text-gray-500 text-sm truncate">{f.description}</p>
                      )}
                      <p className="text-gray-600 text-xs mt-1">
                        {(f.fields as unknown as FormField[]).length} campos
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                      {f.status === 'draft' && (
                        <button
                          onClick={() => markAsSent(f.id)}
                          className="text-xs text-yellow-400 hover:text-yellow-300 bg-yellow-400/10 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          Marcar enviado
                        </button>
                      )}
                      <button
                        onClick={() => copyLink(f.token)}
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        {copiedToken === f.token ? <Check size={12} /> : <Copy size={12} />}
                        {copiedToken === f.token ? 'Copiado' : 'Copiar link'}
                      </button>
                      <Link
                        to={`/admin/forms/${f.id}`}
                        className="text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink size={12} />
                        Editar
                      </Link>
                      {f.status === 'completed' && (
                        <button
                          onClick={() => loadResponses(f.id)}
                          className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-400/10 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          {isExpanded ? 'Ocultar' : 'Ver respuesta'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Responses panel */}
                {isExpanded && formResponses.length > 0 && (
                  <div className="border-t border-gray-800 p-4 bg-gray-950">
                    {formResponses.map(resp => (
                      <div key={resp.id}>
                        <p className="text-gray-500 text-xs mb-3">
                          Enviado: {new Date(resp.submitted_at).toLocaleString('es-PE')}
                        </p>
                        <div className="space-y-3">
                          {(f.fields as unknown as FormField[]).map(field => {
                            const val = (resp.responses as Record<string, string | string[]>)[field.id]
                            if (!val || (Array.isArray(val) && val.length === 0)) return null
                            return (
                              <div key={field.id}>
                                <p className="text-gray-400 text-xs mb-0.5">{field.label}</p>
                                <p className="text-white text-sm bg-gray-800 rounded-lg px-3 py-2">
                                  {Array.isArray(val) ? val.join(', ') : val}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
