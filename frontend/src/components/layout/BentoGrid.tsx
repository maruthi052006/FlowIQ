import React from 'react'
import { cn } from '@/utils/cn'

export interface BentoGridProps {
  className?: string
  children: React.ReactNode
}

export const BentoGrid: React.FC<BentoGridProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[220px]',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface BentoCardProps {
  className?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2 | 3
  children: React.ReactNode
}

export const BentoCard: React.FC<BentoCardProps> = ({
  className,
  colSpan = 1,
  rowSpan = 1,
  children,
}) => {
  const colSpans = {
    1: 'col-span-1',
    2: 'col-span-1 md:col-span-2',
    3: 'col-span-1 md:col-span-3',
  }

  const rowSpans = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
  }

  return (
    <div
      className={cn(
        'glass-card relative overflow-hidden flex flex-col justify-between p-6',
        colSpans[colSpan],
        rowSpans[rowSpan],
        className
      )}
    >
      {children}
    </div>
  )
}
