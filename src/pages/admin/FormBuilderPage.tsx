import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Copy, Check, Eye, EyeOff, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { FieldEditor } from '../../components/admin/FieldEditor'
import type { FormField, FieldType } from '../../types'

function generateId() {
  return `f_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

function createBlankField(): FormField {
  return { id: generateId(), type: 'text' as FieldType, label: '', placeholder: '', required: false }
}

export default function FormBuilderPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const clientIdParam = searchParams.get('clientId')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState<FormField[]>([createBlankField()])
  const [savedToken, setSavedToken] = useState<string | null>(null)
  const [formId, setFormId] = useState<string | null>(id || null)
  const [saving, setSaving] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [clientName, setClientName] = useState('')
  const [clientId, setClientId] = useState<string | null>(clientIdParam)

  useEffect(() => {
    if (!id) return
    supabase
      .from('forms')
      .select('*, clients(name)')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (!data) return
        setTitle(data.title)
        setDescription(data.description || '')
        setFields(data.fields as FormField[])
        setSavedToken(data.token)
        setClientId(data.client_id)
        const c = data.clients as { name: string } | null
        if (c) setClientName(c.name)
      })
  }, [id])

  useEffect(() => {
    if (!clientIdParam || id) return
    supabase
      .from('clients')
      .select('name')
      .eq('id', clientIdParam)
      .single()
      .then(({ data }) => {
        if (data) setClientName(data.name)
      })
  }, [clientIdParam, id])

  const updateField = (index: number, field: FormField) =>
    setFields(fs => fs.map((f, i) => (i === index ? field : f)))

  const deleteField = (index: number) =>
    setFields(fs => fs.filter((_, i) => i !== index))

  const moveField = (index: number, dir: 'up' | 'down') => {
    setFields(fs => {
      const next = [...fs]
      const swap = dir === 'up' ? index - 1 : index + 1
      ;[next[index], next[swap]] = [next[swap], next[index]]
      return next
    })
  }

  const save = async () => {
    if (!title.trim()) return
    setSaving(true)
    const payload = { title, description, fields, client_id: clientId }

    if (formId) {
      await supabase.from('forms').update(payload).eq('id', formId)
    } else {
      const { data } = await supabase.from('forms').insert(payload).select().single()
      if (data) {
        setFormId(data.id)
        setSavedToken(data.token)
      }
    }
    setSaving(false)
  }

  const copyLink = async () => {
    if (!savedToken) return
    await navigator.clipboard.writeText(`${window.location.origin}/form/${savedToken}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const backLink = clientId ? `/admin/clients/${clientId}` : '/admin/clients'

  return (
    <div className="p-8">
      <Link
        to={backLink}
        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        {clientName ? `Volver a ${clientName}` : 'Volver'}
      </Link>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {id ? 'Editar formulario' : 'Nuevo formulario'}
          </h2>
          {clientName && <p className="text-gray-400 text-sm mt-1">Para: {clientName}</p>}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(p => !p)}
            className="flex items-center gap-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg text-sm transition-colors"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Editar' : 'Vista previa'}
          </button>
          <button
            onClick={save}
            disabled={saving || !title.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Save size={16} />
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>

      {/* Shareable link banner */}
      {savedToken && (
        <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4 mb-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <p className="text-emerald-400 text-sm font-medium mb-0.5">Formulario guardado · Link para el cliente</p>
            <p className="text-gray-400 text-xs font-mono truncate">
              {window.location.origin}/form/{savedToken}
            </p>
          </div>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm shrink-0 transition-colors"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar link'}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor column */}
        <div className={showPreview ? 'hidden lg:block' : ''}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Título del formulario *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ej: Solicitud de proyecto — E-commerce"
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Descripción (visible para el cliente)</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe brevemente el propósito de este formulario..."
                rows={2}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {fields.map((field, i) => (
              <FieldEditor
                key={field.id}
                field={field}
                index={i}
                total={fields.length}
                onChange={f => updateField(i, f)}
                onDelete={() => deleteField(i)}
                onMoveUp={() => moveField(i, 'up')}
                onMoveDown={() => moveField(i, 'down')}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setFields(fs => [...fs, createBlankField()])}
            className="mt-4 w-full flex items-center justify-center gap-2 border border-dashed border-gray-700 hover:border-blue-500 text-gray-400 hover:text-blue-400 py-3 rounded-xl text-sm transition-colors"
          >
            <Plus size={16} />
            Agregar campo
          </button>
        </div>

        {/* Preview column */}
        <div className={!showPreview ? 'hidden lg:block' : ''}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Vista previa del cliente</p>

            {title ? (
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            ) : (
              <h3 className="text-lg font-bold text-gray-600 mb-2">Sin título</h3>
            )}
            {description && <p className="text-gray-400 text-sm mb-6">{description}</p>}

            <div className="space-y-4">
              {fields.filter(f => f.label).map(field => (
                <div key={field.id}>
                  <label className="block text-sm text-gray-300 mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      disabled
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-500 text-sm resize-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      disabled
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-500 text-sm"
                    >
                      <option>Seleccionar...</option>
                      {(field.options || []).map((o, i) => <option key={i}>{o}</option>)}
                    </select>
                  ) : field.type === 'checkbox' ? (
                    <div className="space-y-1.5">
                      {(field.options || []).map((o, i) => (
                        <label key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <input type="checkbox" disabled className="w-4 h-4" />
                          {o}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      disabled
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-500 text-sm"
                    />
                  )}
                </div>
              ))}

              {fields.filter(f => f.label).length === 0 && (
                <p className="text-gray-600 text-sm text-center py-6">
                  Agrega campos para ver la vista previa
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
