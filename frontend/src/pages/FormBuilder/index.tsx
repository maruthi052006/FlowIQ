import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/store/uiStore'
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  CheckSquare,
  Type,
  ListFilter,
  Star,
  FileUp,
  Sparkles,
} from 'lucide-react'

interface FormFieldItem {
  id: string
  label: string
  type: string
  placeholder: string
  required: boolean
}

export default function FormBuilder() {
  const [fields, setFields] = useState<FormFieldItem[]>([
    { id: '1', label: 'Company Name', type: 'text', placeholder: 'Acme Corp', required: true },
    { id: '2', label: 'Work Email', type: 'email', placeholder: 'john@acme.com', required: true },
    { id: '3', label: 'Annual Revenue', type: 'number', placeholder: '1,000,000', required: false },
  ])
  const [selectedField, setSelectedField] = useState<FormFieldItem | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const toast = useToast()

  const addField = (label: string, type: string) => {
    const newField: FormFieldItem = {
      id: Math.random().toString(36).substring(2, 9),
      label,
      type,
      placeholder: 'Enter response...',
      required: false,
    }
    setFields([...fields, newField])
    toast.success('Field Added', `Added ${label} field`)
  }

  const removeField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id))
    if (selectedField?.id === id) setSelectedField(null)
    toast.success('Field Removed')
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-900 text-white overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 bg-stone-950/90 border-b border-stone-800 px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-heading">Vendor Onboarding Questionnaire</h2>
              <Badge variant="violet">Draft</Badge>
            </div>
            <p className="text-[11px] text-stone-400">3 fields configured • Conditional logic active</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-stone-300 hover:bg-stone-800"
            onClick={() => setPreviewMode(!previewMode)}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            {previewMode ? 'Edit Mode' : 'Preview Form'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => toast.success('Form Published!', 'Form URL is live')}
            leftIcon={<Save className="w-4 h-4" />}
          >
            Publish Form
          </Button>
        </div>
      </header>

      {/* Main Form Builder Body */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Left Field Palette */}
        {!previewMode && (
          <aside className="w-64 bg-stone-950/90 border-r border-stone-800 p-4 space-y-4 overflow-y-auto z-20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Field Elements
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => addField('Text Input', 'text')}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold text-stone-200"
              >
                <Type className="w-4 h-4 text-violet-400" />
                <span>Text Input</span>
              </button>

              <button
                onClick={() => addField('Dropdown Select', 'select')}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold text-stone-200"
              >
                <ListFilter className="w-4 h-4 text-teal-400" />
                <span>Dropdown Select</span>
              </button>

              <button
                onClick={() => addField('Rating Scale', 'rating')}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold text-stone-200"
              >
                <Star className="w-4 h-4 text-amber-400" />
                <span>Rating Scale</span>
              </button>

              <button
                onClick={() => addField('File Attachment', 'file')}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold text-stone-200"
              >
                <FileUp className="w-4 h-4 text-rose-400" />
                <span>File Upload</span>
              </button>
            </div>
          </aside>
        )}

        {/* Center Canvas / Preview */}
        <div className="flex-1 bg-stone-900 p-8 overflow-y-auto flex justify-center">
          <div className="w-full max-w-2xl bg-white text-stone-900 rounded-3xl p-8 shadow-2xl space-y-6 h-fit border border-stone-200">
            <div className="space-y-2 border-b border-stone-200 pb-6">
              <h1 className="text-2xl font-extrabold font-heading text-stone-900">
                Vendor Onboarding Questionnaire
              </h1>
              <p className="text-xs text-stone-500">
                Please complete all required fields for security compliance verification.
              </p>
            </div>

            {fields.map((field) => (
              <div
                key={field.id}
                onClick={() => !previewMode && setSelectedField(field)}
                className={`p-4 rounded-2xl border transition-all ${
                  selectedField?.id === field.id && !previewMode
                    ? 'border-violet-600 ring-2 ring-violet-500/20 bg-violet-50/20'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>
                  {!previewMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeField(field.id)
                      }}
                      className="text-stone-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Input placeholder={field.placeholder} disabled={!previewMode} />
              </div>
            ))}

            {previewMode && (
              <Button size="lg" className="w-full mt-4">
                Submit Responses
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
