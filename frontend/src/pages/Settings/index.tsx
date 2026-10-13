import React from 'react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/store/uiStore'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const toast = useToast()

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-stone-900">Account & Workspace Settings</h1>
        <p className="text-xs text-stone-500">Manage security settings, personal profile, and API credentials</p>
      </div>

      <Card className="space-y-4">
        <h3 className="text-base font-bold font-heading">Personal Profile</h3>
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" defaultValue={user?.first_name || 'Admin'} />
          <Input label="Last Name" defaultValue={user?.last_name || 'User'} />
        </div>
        <Input label="Email Address" defaultValue={user?.email || 'admin@flowiq.io'} disabled />
        <Button size="sm" onClick={() => toast.success('Profile Saved')}>Save Changes</Button>
      </Card>

      <Card className="space-y-4">
        <h3 className="text-base font-bold font-heading text-rose-600">Danger Zone</h3>
        <p className="text-xs text-stone-500">Permanently delete workspace and revoke all active API keys.</p>
        <Button variant="danger" size="sm">Purge Workspace Data</Button>
      </Card>
    </div>
  )
}
