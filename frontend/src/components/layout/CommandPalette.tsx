import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, GitFork, FileSpreadsheet, Inbox, Settings, X, ArrowRight } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useNavigate } from 'react-router-dom'

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  const items = [
    { title: 'Create Workflow', icon: GitFork, path: '/workflow/new/edit', category: 'Actions' },
    { title: 'Build Form', icon: FileSpreadsheet, path: '/form/new/edit', category: 'Actions' },
    { title: 'View Submissions', icon: Inbox, path: '/submissions', category: 'Navigation' },
    { title: 'System Settings', icon: Settings, path: '/settings', category: 'Navigation' },
  ]

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (path: string) => {
    navigate(path)
    setCommandPaletteOpen(false)
    setQuery('')
  }

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative w-full max-w-xl glass-panel rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/80"
          >
            <div className="flex items-center px-4 py-3.5 border-b border-stone-200/80 gap-3">
              <Search className="w-5 h-5 text-stone-400 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-violet-100/60 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white text-violet-700 shadow-xs group-hover:bg-violet-600 group-hover:text-white transition-colors">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900 group-hover:text-violet-900">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
