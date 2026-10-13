import React, { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Download, Filter, Eye, CheckCircle, ShieldAlert } from 'lucide-react'

interface SubmissionRow {
  id: string
  ref: string
  form: string
  submittedBy: string
  status: 'verified' | 'flagged' | 'pending'
  score: number
  date: string
}

const mockSubmissions: SubmissionRow[] = [
  { id: '1', ref: 'SUB-9401', form: 'Vendor Security Audit', submittedBy: 'alex@acme.com', status: 'verified', score: 98, date: '2026-08-04 14:20' },
  { id: '2', ref: 'SUB-9402', form: 'Invoice Extraction', submittedBy: 'system_ocr@flowiq.io', status: 'flagged', score: 64, date: '2026-08-04 14:15' },
  { id: '3', ref: 'SUB-9403', form: 'Employee Feedback', submittedBy: 'anonymous', status: 'verified', score: 100, date: '2026-08-04 13:50' },
  { id: '4', ref: 'SUB-9404', form: 'Partner Onboarding', submittedBy: 'contact@globex.com', status: 'pending', score: 85, date: '2026-08-04 12:10' },
]

export default function SubmissionsPage() {
  const [query, setQuery] = useState('')

  const filtered = mockSubmissions.filter((s) =>
    s.ref.toLowerCase().includes(query.toLowerCase()) ||
    s.form.toLowerCase().includes(query.toLowerCase()) ||
    s.submittedBy.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-stone-900">Submissions Data Center</h1>
          <p className="text-xs text-stone-500">Real-time incoming form entries & AI validation scores</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export CSV
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
            Filter View
          </Button>
        </div>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search by reference, form name, or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="max-w-md"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-stone-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/80 text-stone-600 font-bold uppercase tracking-wider border-b border-stone-200">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Form</th>
                <th className="p-4">Submitted By</th>
                <th className="p-4">Quality Score</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted At</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/80 bg-white">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-violet-800">{row.ref}</td>
                  <td className="p-4 font-semibold text-stone-900">{row.form}</td>
                  <td className="p-4 text-stone-600">{row.submittedBy}</td>
                  <td className="p-4">
                    <span className={`font-bold ${row.score > 90 ? 'text-teal-600' : 'text-rose-600'}`}>
                      {row.score}%
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={row.status === 'verified' ? 'teal' : row.status === 'flagged' ? 'rose' : 'amber'} dot>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-stone-500 font-mono">{row.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
