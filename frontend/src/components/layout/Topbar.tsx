import React from 'react'
import { Search, Bell, Sparkles } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { Badge } from '@/components/ui/Badge'

export const Topbar: React.FC = () => {
  const { setCommandPaletteOpen } = useUIStore()

  return (
    <header className="h-16 border-b border-stone-200/80 bg-white/70 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-stone-400">FlowIQ</span>
        <span className="text-xs text-stone-300">/</span>
        <span className="text-xs font-bold text-stone-800">Workspace Overview</span>
        <Badge variant="teal" className="ml-2">Live Sync</Badge>
      </div>

      {/* Center Search / Cmd+K */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-3 bg-stone-100 hover:bg-stone-200/70 text-stone-500 hover:text-stone-800 px-4 py-2 rounded-2xl text-xs w-72 transition-all border border-stone-200/60 shadow-xs"
      >
        <Search className="w-4 h-4 text-stone-400" />
        <span className="flex-1 text-left">Search workflows, forms...</span>
        <kbd className="bg-white px-1.5 py-0.5 rounded text-[10px] font-mono text-stone-400 border border-stone-200 shadow-xs">
          ⌘K
        </kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 text-xs font-semibold hover:bg-violet-100 transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Copilot</span>
        </button>

        <button className="relative p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-violet-600 ring-2 ring-white" />
        </button>
      </div>
    </header>
  )
}
