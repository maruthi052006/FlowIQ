import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'glass' | 'solid' | 'outline'
  hoverLift?: boolean
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'glass',
  hoverLift = true,
  children,
  ...props
}) => {
  const base = 'rounded-2xl p-6 transition-all duration-300 relative overflow-hidden'

  const variants = {
    glass: 'glass-card',
    solid: 'bg-white border border-stone-200 shadow-md',
    outline: 'bg-stone-50/50 border border-stone-300/80',
  }

  return (
    <motion.div
      className={cn(base, variants[variant], !hoverLift && 'hover:transform-none', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
