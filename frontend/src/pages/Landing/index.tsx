import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeroScene } from '@/components/three/HeroScene'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  Zap,
  GitFork,
  FileSpreadsheet,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-primary text-stone-900 overflow-x-hidden selection:bg-violet-600 selection:text-white">
      {/* Floating Island Navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
        <nav className="glass-nav rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white shadow-violet">
              <Zap className="w-4 h-4" />
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight">
              Flow<span className="text-violet-600">IQ</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-stone-600">
            <a href="#features" className="hover:text-violet-700 transition-colors">Features</a>
            <a href="#workflow" className="hover:text-violet-700 transition-colors">Workflow Builder</a>
            <a href="#pricing" className="hover:text-violet-700 transition-colors">Pricing</a>
            <a href="#security" className="hover:text-violet-700 transition-colors">Enterprise</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 text-left z-10">
          <Badge variant="violet" dot className="px-4 py-1">
            FlowIQ 3.0 Platform Live
          </Badge>

          <h1 className="text-5xl md:text-7xl font-extrabold font-heading tracking-tight leading-[1.08] text-stone-900">
            Intelligent <br />
            <span className="bg-gradient-to-r from-violet-700 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Workflow Automation
            </span> <br />
            For Enterprise Teams.
          </h1>

          <p className="text-lg text-stone-600 max-w-xl leading-relaxed">
            Engineered for high-scale enterprise operations. Build complex data pipelines, multi-step approval flows, and dynamic smart forms with real-time 3D visualization.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link to="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Free Trial
              </Button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Demo Workspace
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2 shrink-0">
              {['#6D28D9', '#0D9488', '#D97706', '#2563EB'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-xs shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs font-semibold text-stone-500">
              Trusted by 2,500+ operations engineering teams globally
            </p>
          </div>
        </div>

        {/* 3D Scene Hero */}
        <div className="flex-1 w-full h-[520px] rounded-3xl glass-panel relative overflow-hidden shadow-2xl border border-white">
          <HeroScene />
        </div>
      </section>

      {/* Features Bento Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="teal">Architectural Capabilities</Badge>
          <h2 className="text-4xl font-extrabold font-heading text-stone-900 tracking-tight">
            Everything you need to automate enterprise data
          </h2>
          <p className="text-stone-600 text-base">
            Better than Linear, Stripe, Notion, and Vercel combined. Designed with meticulous precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 space-y-4 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <GitFork className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading">Visual React Flow Canvas</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Drag-and-drop triggers, actions, AI filters, and branching logic. Real-time WebSocket streaming logs for step-by-step execution feedback.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading">Smart Form Engine</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Dynamic visibility conditions, signature fields, rating scales, and AI document OCR extraction built in.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading">AI Quality Processor</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Automatic anomaly detection, text classification, and data quality scoring on incoming submissions.
            </p>
          </div>

          <div className="glass-card p-8 space-y-4 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold font-heading">SOC2 & Enterprise RBAC</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Granular role permissions, encrypted payload storage, full compliance audit trail, and zero-trust API architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-violet-600" />
          <span className="font-bold text-stone-800">FlowIQ Platform Inc.</span>
          <span>© 2026. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-stone-800">Privacy Policy</a>
          <a href="#" className="hover:text-stone-800">Terms of Service</a>
          <a href="#" className="hover:text-stone-800">Security</a>
        </div>
      </footer>
    </div>
  )
}
