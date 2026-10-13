import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', submissions: 120, executions: 340 },
  { name: 'Tue', submissions: 210, executions: 520 },
  { name: 'Wed', submissions: 180, executions: 490 },
  { name: 'Thu', submissions: 300, executions: 810 },
  { name: 'Fri', submissions: 250, executions: 670 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-stone-900">Analytics & Intelligence</h1>
          <p className="text-xs text-stone-500">System throughput & process performance metrics</p>
        </div>
        <Badge variant="violet">30-Day Window</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="text-sm font-bold font-heading">Weekly Submission Velocity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#A8A29E" fontSize={11} />
                <YAxis stroke="#A8A29E" fontSize={11} />
                <Tooltip />
                <Bar dataKey="submissions" fill="#6D28D9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="executions" fill="#14B8A6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-sm font-bold font-heading">AI Quality Index Breakdown</h3>
          <div className="space-y-4 pt-4">
            {[
              { label: 'Passed Schema Validation', pct: '98.2%', color: 'bg-teal-500' },
              { label: 'OCR Text Extracted', pct: '94.5%', color: 'bg-violet-500' },
              { label: 'Anomalies Flagged', pct: '1.8%', color: 'bg-rose-500' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span>{item.label}</span>
                  <span>{item.pct}</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
