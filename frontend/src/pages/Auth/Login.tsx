import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Zap, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('admin@flowiq.io')
  const [password, setPassword] = useState('password123')
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen w-screen flex bg-primary text-stone-900 overflow-hidden">
      {/* Left visual panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-stone-900 via-violet-950 to-stone-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-violet">
            <Zap className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight">
            Flow<span className="text-violet-400">IQ</span>
          </span>
        </div>

        <div className="space-y-6 max-w-lg z-10">
          <h2 className="text-4xl font-extrabold font-heading leading-tight">
            Enterprise Low-Code Automation Engine
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            Sign in to manage workflows, view real-time submission metrics, and execute intelligent data processing pipelines.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-mono">
          FLOWIQ PLATFORM v3.0.4 — SECURE TLS 1.3
        </div>
      </div>

      {/* Right Form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 glass-panel p-8 rounded-3xl shadow-xl border border-white"
        >
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold font-heading text-stone-900">
              Welcome Back
            </h3>
            <p className="text-xs text-stone-500">
              Enter your credentials to access your FlowIQ workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Workspace
            </Button>
          </form>

          <p className="text-center text-xs text-stone-500">
            Don’t have an account?{' '}
            <Link to="/auth/register" className="font-bold text-violet-700 hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
