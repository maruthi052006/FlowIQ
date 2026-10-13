import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Zap, Mail, Lock, User, ArrowRight } from 'lucide-react'

export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      navigate('/dashboard')
    } catch (err) {
      console.error('Registration error:', err)
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
            Build Intelligent Workflows in Minutes
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            Join thousands of operations engineers creating scalable low-code automation systems with high visual polish.
          </p>
        </div>

        <div className="text-xs text-stone-500 font-mono">
          ENTERPRISE COMPLIANT — SOC2 TYPE II READY
        </div>
      </div>

      {/* Right Form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6 glass-panel p-8 rounded-3xl shadow-xl border border-white"
        >
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-2xl font-bold font-heading text-stone-900">
              Create Enterprise Account
            </h3>
            <p className="text-xs text-stone-500">
              Set up your account to start building workflows.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Sarah"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
                required
              />
              <Input
                label="Last Name"
                placeholder="Connor"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Input
              label="Work Email"
              type="email"
              placeholder="sarah@enterprise.com"
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
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-stone-500">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-bold text-violet-700 hover:underline">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
