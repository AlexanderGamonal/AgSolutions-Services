import { Trash2, ChevronUp, ChevronDown, Plus, X } from 'lucide-react'
import type { FormField, FieldType } from '../../types'

interface FieldEditorProps {
  field: FormField
  index: number
  total: number
  onChange: (field: FormField) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Texto corto' },
  { value: 'textarea', label: 'Texto largo' },
  { value: 'number', label: 'Número' },
  { value: 'email', label: 'Email' },
  { value: 'tel', label: 'Teléfono' },
  { value: 'date', label: 'Fecha' },
  { value: 'select', label: 'Selección única (desplegable)' },
  { value: 'radio', label: 'Selección única (radio)' },
  { value: 'checkbox', label: 'Selección múltiple (lista)' },
  { value: 'checkbox_group', label: 'Selección múltiple (cuadrícula)' },
  { value: 'section', label: '── Sección / Separador' },
]

export function FieldEditor({ field, index, total, onChange, onDelete, onMoveUp, onMoveDown }: FieldEditorProps) {
  const isSection = field.type === 'section'
  const showOptions = ['select', 'radio', 'checkbox', 'checkbox_group'].includes(field.type)

  const addOption = () => {
    onChange({ ...field, options: [...(field.options || []), ''] })
  }

  const updateOption = (i: number, value: string) => {
    const opts = [...(field.options || [])]
    opts[i] = value
    onChange({ ...field, options: opts })
  }

  const removeOption = (i: number) => {
    onChange({ ...field, options: (field.options || []).filter((_, idx) => idx !== i) })
  }

  return (
    <div className={`border rounded-xl p-4 ${isSection ? 'bg-gray-900 border-blue-500/30' : 'bg-gray-800 border-gray-700'}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-xs font-medium">
          {isSection ? 'Sección' : `Campo ${index + 1}`}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onMoveUp} disabled={index === 0}
            className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30 transition-colors">
            <ChevronUp size={14} />
          </button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1}
            className="p-1 text-gray-500 hover:text-gray-300 disabled:opacity-30 transition-colors">
            <ChevronDown size={14} />
          </button>
          <button type="button" onClick={onDelete}
            className="p-1 text-gray-500 hover:text-red-400 transition-colors ml-1">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className={`grid gap-3 mb-3 ${isSection ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Tipo de campo</label>
          <select
            value={field.type}
            onChange={e => onChange({ ...field, type: e.target.value as FieldType, options: [] })}
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-2 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500"
          >
            {fieldTypes.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        {!isSection && (
          <div className="flex items-end pb-0.5">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={field.required}
                onChange={e => onChange({ ...field, required: e.target.checked })}
                className="w-4 h-4 accent-blue-600"
              />
              Obligatorio
            </label>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1">
          {isSection ? 'Título de la sección' : 'Pregunta / Etiqueta'}
        </label>
        <input
          type="text"
          value={field.label}
          onChange={e => onChange({ ...field, label: e.target.value })}
          placeholder={isSection ? 'Ej: 1. Datos del negocio' : 'Ej: ¿Cuál es el nombre de tu negocio?'}
          className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {isSection && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Descripción de la sección (opcional)</label>
          <input
            type="text"
            value={field.description || ''}
            onChange={e => onChange({ ...field, description: e.target.value })}
            placeholder="Breve explicación de esta sección"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      )}

      {!isSection && !showOptions && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Placeholder (opcional)</label>
          <input
            type="text"
            value={field.placeholder || ''}
            onChange={e => onChange({ ...field, placeholder: e.target.value })}
            placeholder="Texto de ayuda dentro del campo"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      )}

      {showOptions && (
        <div>
          <label className="block text-xs text-gray-500 mb-1">Opciones</label>
          <div className="space-y-1.5">
            {(field.options || []).map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={opt}
                  onChange={e => updateOption(i, e.target.value)}
                  placeholder={`Opción ${i + 1}`}
                  className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button type="button" onClick={() => removeOption(i)}
                  className="text-gray-500 hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addOption}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors mt-1">
              <Plus size={12} />
              Agregar opción
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
