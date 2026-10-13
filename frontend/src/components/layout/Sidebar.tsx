import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'
import { useAuthStore } from '@/store/authStore'
import {
  LayoutDashboard,
  GitFork,
  FileSpreadsheet,
  Inbox,
  BarChart3,
  CheckSquare,
  Layers,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
} from 'lucide-react'
import { cn } from '@/utils/cn'

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user, logout } = useAuthStore()

  const navSections = [
    {
      title: 'Main',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Workflows', icon: GitFork, path: '/workflow/new/edit' },
        { label: 'Form Builder', icon: FileSpreadsheet, path: '/form/new/edit' },
      ],
    },
    {
      title: 'Data & Approvals',
      items: [
        { label: 'Submissions', icon: Inbox, path: '/submissions', badge: '12' },
        { label: 'Analytics', icon: BarChart3, path: '/analytics' },
        { label: 'Approvals', icon: CheckSquare, path: '/approvals', badge: '3' },
      ],
    },
    {
      title: 'System',
      items: [
        { label: 'Integrations', icon: Layers, path: '/integrations' },
        { label: 'Settings', icon: Settings, path: '/settings' },
      ],
    },
  ]

  return (
    <aside
      className={cn(
        'relative h-screen bg-stone-100/90 border-r border-stone-200/80 transition-all duration-300 flex flex-col z-30 select-none',
        sidebarCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Top Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-stone-200/80">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white shadow-violet shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          {!sidebarCollapsed && (
            <span className="font-heading font-extrabold text-lg text-stone-900 tracking-tight whitespace-nowrap">
              Flow<span className="text-violet-600">IQ</span>
            </span>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-6">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative',
                    isActive
                      ? 'bg-violet-100/80 text-violet-800 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-violet-600 rounded-r-full"
                      />
                    )}
                    <item.icon
                      className={cn(
                        'w-5 h-5 shrink-0 transition-colors',
                        isActive ? 'text-violet-700' : 'text-stone-400 group-hover:text-stone-700'
                      )}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!sidebarCollapsed && item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-200 text-violet-800">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      {/* Footer User Profile */}
      <div className="p-3 border-t border-stone-200/80">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-200/50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
            {user?.first_name?.[0] || 'U'}
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-stone-900 truncate">
                {user?.first_name ? `${user.first_name} ${user.last_name}` : 'Enterprise Admin'}
              </p>
              <p className="text-[11px] text-stone-500 truncate">
                {user?.email || 'admin@flowiq.io'}
              </p>
            </div>
          )}
          {!sidebarCollapsed && (
            <button
              onClick={logout}
              title="Logout"
              className="text-stone-400 hover:text-rose-600 p-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
