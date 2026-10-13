import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'

export default function ApprovalsPage() {
  const approvalItems = [
    { id: '1', title: 'Invoice #INV-8902 ($45,000)', requestedBy: 'finance_bot@acme.com', urgency: 'high', date: '10m ago' },
    { id: '2', title: 'Partner Agreement (Globex Corp)', requestedBy: 'legal@flowiq.io', urgency: 'medium', date: '1h ago' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-stone-900">Approvals Queue</h1>
          <p className="text-xs text-stone-500">Multi-stage human-in-the-loop decision tasks</p>
        </div>
        <Badge variant="amber">4 Action Required</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {approvalItems.map((item) => (
          <Card key={item.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant={item.urgency === 'high' ? 'rose' : 'amber'} dot className="mb-2">
                  {item.urgency} priority
                </Badge>
                <h3 className="text-base font-bold font-heading text-stone-900">{item.title}</h3>
                <p className="text-xs text-stone-500">Requested by {item.requestedBy}</p>
              </div>
              <span className="text-[11px] text-stone-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" /> {item.date}
              </span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button variant="primary" size="sm" className="flex-1" leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                Approve Task
              </Button>
              <Button variant="danger" size="sm" className="flex-1" leftIcon={<XCircle className="w-4 h-4" />}>
                Reject
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
