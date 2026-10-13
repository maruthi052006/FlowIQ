import React from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export const LoadingScene: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900 flex flex-col items-center justify-center text-white">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-teal-400 flex items-center justify-center shadow-glow mb-6"
      >
        <Zap className="w-8 h-8 text-white" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold font-heading tracking-tight"
      >
        Flow<span className="text-violet-400">IQ</span>
      </motion.h2>
      <p className="text-xs text-stone-400 mt-2 font-mono uppercase tracking-widest">
        Initializing Engine...
      </p>
    </div>
  )
}
