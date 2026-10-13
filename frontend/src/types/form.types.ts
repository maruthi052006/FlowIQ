export type FieldType = 
  | 'text' | 'textarea' | 'number' | 'email' 
  | 'select' | 'radio' | 'checkbox' | 'date' 
  | 'file' | 'signature' | 'rating' | 'ai_input'

export interface FormFieldValidation {
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  errorMessage?: string
}

export interface FormFieldCondition {
  fieldId: string
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than'
  value: any
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  description?: string
  width: 'full' | 'half' | 'third'
  validation?: FormFieldValidation
  conditions?: FormFieldCondition[]
  options?: Array<{ label: string; value: string }>
}

export interface FormSchema {
  id: string
  title: string
  description?: string
  is_published: boolean
  fields: FormField[]
  created_at: string
  updated_at: string
}
