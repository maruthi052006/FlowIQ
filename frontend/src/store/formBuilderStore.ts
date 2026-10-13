import { create } from 'zustand'
import { FormField, FormSchema } from '@/types/form.types'

interface FormBuilderState {
  formId: string | null
  title: string
  description: string
  fields: FormField[]
  selectedFieldId: string | null
  isPreviewMode: boolean

  setForm: (form: FormSchema) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setSelectedFieldId: (id: string | null) => void
  setIsPreviewMode: (preview: boolean) => void
  addField: (field: FormField) => void
  updateField: (id: string, updates: Partial<FormField>) => void
  deleteField: (id: string) => void
  reorderFields: (startIndex: number, endIndex: number) => void
}

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  formId: null,
  title: 'Untitled Form',
  description: '',
  fields: [],
  selectedFieldId: null,
  isPreviewMode: false,

  setForm: (form) =>
    set({
      formId: form.id,
      title: form.title,
      description: form.description || '',
      fields: form.fields || [],
    }),

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setSelectedFieldId: (selectedFieldId) => set({ selectedFieldId }),
  setIsPreviewMode: (isPreviewMode) => set({ isPreviewMode }),

  addField: (field) =>
    set((state) => ({
      fields: [...state.fields, field],
      selectedFieldId: field.id,
    })),

  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),

  deleteField: (id) =>
    set((state) => ({
      fields: state.fields.filter((f) => f.id !== id),
      selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
    })),

  reorderFields: (startIndex, endIndex) =>
    set((state) => {
      const result = Array.from(state.fields)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return { fields: result }
    }),
}))
