import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Form, FormField } from '../../types'

export default function FormFillPage() {
  const { token } = useParams<{ token: string }>()
  const navigate = useNavigate()
  const [form, setForm] = useState<Form | null>(null)
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState<Record<string, string | string[]>>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!token) return
    supabase
      .from('forms')
      .select('*')
      .eq('token', token)
      .single()
      .then(({ data }) => {
        if (data) {
          setForm(data as Form)
          const init: Record<string, string | string[]> = {}
          ;(data.fields as FormField[]).forEach(f => {
            if (f.type === 'section') return
            init[f.id] = (f.type === 'checkbox' || f.type === 'checkbox_group') ? [] : ''
          })
          setValues(init)
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
  }, [token])

  const setValue = (fieldId: string, value: string) => {
    setValues(v => ({ ...v, [fieldId]: value }))
  }

  const toggleCheckbox = (fieldId: string, option: string) => {
    setValues(v => {
      const current = (v[fieldId] as string[]) || []
      return {
        ...v,
        [fieldId]: current.includes(option)
          ? current.filter(o => o !== option)
          : [...current, option],
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return

    const missing = (form.fields as FormField[]).filter(f => {
      if (f.type === 'section' || !f.required) return false
      const val = values[f.id]
      if (Array.isArray(val)) return val.length === 0
      return !val || String(val).trim() === ''
    })

    if (missing.length > 0) {
      setError(`Completa los campos obligatorios: ${missing.map(f => f.label).join(', ')}`)
      return
    }

    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase.from('form_responses').insert({
      form_id: form.id,
      responses: values,
    })

    if (insertError) {
      setError('Error al enviar. Por favor intenta nuevamente.')
      setSubmitting(false)
      return
    }

    await supabase.from('forms').update({ status: 'completed' }).eq('id', form.id)
    navigate(`/form/${token}/success`)
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
    </div>
  )

  if (notFound) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-4xl text-gray-700 mb-4">404</p>
        <p className="text-gray-400">Este formulario no existe o ya no está disponible.</p>
      </div>
    </div>
  )

  const formFields = form!.fields as FormField[]

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-blue-400 text-sm font-medium mb-3">AG Solutions &amp; Services</p>
          <h1 className="text-2xl font-bold text-white">{form!.title}</h1>
          {form!.description && (
            <p className="text-gray-400 mt-3 text-sm leading-relaxed">{form!.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {formFields.map(field => {
            if (field.type === 'section') {
              return (
                <div key={field.id} className="pt-4 pb-1">
                  <h2 className="text-white font-semibold text-base border-l-2 border-blue-500 pl-3">
                    {field.label}
                  </h2>
                  {field.description && (
                    <p className="text-gray-500 text-xs mt-1 pl-3">{field.description}</p>
                  )}
                </div>
              )
            }

            const isArrayType = field.type === 'checkbox' || field.type === 'checkbox_group'

            return (
              <div key={field.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <label className="block text-sm text-gray-200 mb-2 font-medium">
                  {field.label}
                  {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    value={values[field.id] as string}
                    onChange={e => setValue(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    required={field.required}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={values[field.id] as string}
                    onChange={e => setValue(field.id, e.target.value)}
                    required={field.required}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Seleccionar...</option>
                    {(field.options || []).map((o, i) => (
                      <option key={i} value={o}>{o}</option>
                    ))}
                  </select>
                ) : field.type === 'radio' ? (
                  <div className="space-y-2">
                    {(field.options || []).map((o, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name={field.id}
                          value={o}
                          checked={values[field.id] === o}
                          onChange={() => setValue(field.id, o)}
                          className="w-4 h-4 accent-blue-600 shrink-0"
                        />
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{o}</span>
                      </label>
                    ))}
                  </div>
                ) : isArrayType ? (
                  <div className="grid grid-cols-2 gap-2">
                    {(field.options || []).map((o, i) => {
                      const selected = (values[field.id] as string[]) || []
                      return (
                        <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selected.includes(o)}
                            onChange={() => toggleCheckbox(field.id, o)}
                            className="w-4 h-4 accent-blue-600 shrink-0"
                          />
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{o}</span>
                        </label>
                      )
                    })}
                  </div>
                ) : (
                  <input
                    type={field.type}
                    value={values[field.id] as string}
                    onChange={e => setValue(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                )}
              </div>
            )
          })}

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg p-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg text-sm font-medium transition-colors"
          >
            {submitting ? 'Enviando...' : 'Enviar formulario'}
          </button>

          <p className="text-center text-gray-600 text-xs pb-8">
            Tu información será usada para preparar una propuesta personalizada.
          </p>
        </form>
      </div>
    </div>
  )
}
