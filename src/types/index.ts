export type FieldType = 'text' | 'textarea' | 'select' | 'checkbox' | 'number'

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  notes?: string
  status: 'active' | 'inactive'
  created_at: string
}

export interface Form {
  id: string
  client_id: string
  title: string
  description?: string
  fields: FormField[]
  token: string
  status: 'draft' | 'sent' | 'completed'
  created_at: string
  expires_at?: string
  clients?: Client
}

export interface FormResponse {
  id: string
  form_id: string
  responses: Record<string, string | string[]>
  respondent_name?: string
  respondent_email?: string
  submitted_at: string
  forms?: Form
}
