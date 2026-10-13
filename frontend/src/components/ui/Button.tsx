import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      primary:
        'bg-violet-700 hover:bg-violet-800 text-white shadow-md hover:shadow-violet hover:-translate-y-0.5 active:translate-y-0',
      secondary:
        'bg-stone-200 hover:bg-stone-300 text-stone-900 border border-stone-300/80 shadow-xs hover:-translate-y-0.5 active:translate-y-0',
      outline:
        'border border-stone-300 hover:border-violet-600 bg-white/80 hover:bg-violet-50/50 text-stone-800 hover:text-violet-700 shadow-xs',
      ghost:
        'bg-transparent hover:bg-stone-200/60 text-stone-700 hover:text-stone-900',
      danger:
        'bg-rose-600 hover:bg-rose-700 text-white shadow-md hover:shadow-rose-500/20 hover:-translate-y-0.5 active:translate-y-0',
    }

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5 rounded-2xl',
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'
