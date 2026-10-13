import React from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Layers, Slack, Globe, Database, Check } from 'lucide-react'

export default function IntegrationsPage() {
  const integrations = [
    { title: 'Slack Webhooks', desc: 'Post real-time notifications to team channels', connected: true, icon: Slack },
    { title: 'Custom HTTP Webhook', desc: 'Trigger external REST APIs on event dispatch', connected: true, icon: Globe },
    { title: 'PostgreSQL Database', desc: 'Sync form data directly to custom SQL tables', connected: false, icon: Database },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-stone-900">Integration Ecosystem</h1>
        <p className="text-xs text-stone-500">Connect FlowIQ workflows with your enterprise infrastructure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((item, idx) => (
          <Card key={idx} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-violet-100 text-violet-700">
                <item.icon className="w-6 h-6" />
              </div>
              <Badge variant={item.connected ? 'teal' : 'gray'}>
                {item.connected ? 'Connected' : 'Available'}
              </Badge>
            </div>
            <div>
              <h3 className="text-base font-bold font-heading">{item.title}</h3>
              <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
            </div>
            <Button variant={item.connected ? 'outline' : 'primary'} size="sm" className="w-full">
              {item.connected ? 'Configure' : 'Connect'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
