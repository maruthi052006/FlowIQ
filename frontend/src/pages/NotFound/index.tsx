import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen bg-stone-900 text-white flex flex-col items-center justify-center space-y-4 p-6">
      <h1 className="text-8xl font-black font-heading text-violet-500">404</h1>
      <h2 className="text-2xl font-bold font-heading">Page Not Found</h2>
      <p className="text-xs text-stone-400 max-w-sm text-center">
        The requested workflow page or canvas endpoint does not exist or has been deleted.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Dashboard
        </Button>
      </Link>
    </div>
  )
}
