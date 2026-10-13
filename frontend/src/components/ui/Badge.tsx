import React from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'violet' | 'teal' | 'amber' | 'rose' | 'gray'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'violet',
  dot = false,
  children,
  ...props
}) => {
  const styles = {
    violet: 'bg-violet-100 text-violet-800 border-violet-200',
    teal: 'bg-teal-100 text-teal-800 border-teal-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    rose: 'bg-rose-100 text-rose-800 border-rose-200',
    gray: 'bg-stone-100 text-stone-700 border-stone-200',
  }

  const dotColors = {
    violet: 'bg-violet-600',
    teal: 'bg-teal-600',
    amber: 'bg-amber-600',
    rose: 'bg-rose-600',
    gray: 'bg-stone-500',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        styles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full animate-pulse', dotColors[variant])}
        />
      )}
      {children}
    </span>
  )
}
