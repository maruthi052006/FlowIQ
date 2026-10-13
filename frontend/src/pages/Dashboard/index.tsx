import React from 'react'
import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from '@/components/layout/BentoGrid'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DashboardChart3D } from '@/components/three/DashboardChart3D'
import {
  GitFork,
  Inbox,
  CheckSquare,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Play,
  Plus,
  ArrowUpRight,
  Clock,
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

const chartData = [
  { time: '09:00', submissions: 12, executions: 45 },
  { time: '11:00', submissions: 28, executions: 89 },
  { time: '13:00', submissions: 45, executions: 140 },
  { time: '15:00', submissions: 32, executions: 98 },
  { time: '17:00', submissions: 64, executions: 180 },
  { time: '19:00', submissions: 50, executions: 155 },
]

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-violet-900 via-indigo-900 to-stone-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <Badge variant="teal" dot className="bg-teal-500/20 text-teal-300 border-teal-500/40">
            Enterprise Tenant #4092
          </Badge>
          <h1 className="text-3xl font-extrabold font-heading tracking-tight">
            Welcome back, Operational Director
          </h1>
          <p className="text-stone-300 text-xs max-w-lg">
            System status is 100% operational across 14 workflow engines. 4 approvals pending review.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10">
          <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Form
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Play className="w-4 h-4" />}>
            Trigger Workflow
          </Button>
        </div>

        {/* Ambient glow */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-violet-600/30 rounded-full blur-3xl" />
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Active Workflows
            </p>
            <h3 className="text-3xl font-extrabold font-heading text-stone-900">
              24
            </h3>
            <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14% this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center">
            <GitFork className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Submissions Today
            </p>
            <h3 className="text-3xl font-extrabold font-heading text-stone-900">
              1,420
            </h3>
            <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +28% vs yesterday
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Pending Approvals
            </p>
            <h3 className="text-3xl font-extrabold font-heading text-stone-900">
              4
            </h3>
            <span className="text-xs font-semibold text-amber-600">Requires Action</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
        </Card>

        <Card className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Data Quality Score
            </p>
            <h3 className="text-3xl font-extrabold font-heading text-stone-900">
              99.4%
            </h3>
            <span className="text-xs font-semibold text-teal-600">AI Validated</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Bento Main Grid */}
      <BentoGrid>
        {/* Main Chart */}
        <BentoCard colSpan={2} rowSpan={2}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold font-heading text-stone-900">
                System Execution Velocity
              </h3>
              <p className="text-xs text-stone-500">Real-time workflow execution & submission velocity</p>
            </div>
            <Badge variant="violet">Live Stream</Badge>
          </div>
          <div className="w-full flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorExec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#A8A29E" fontSize={11} tickLine={false} />
                <YAxis stroke="#A8A29E" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    border: '1px solid #E7E5E0',
                  }}
                />
                <Area type="monotone" dataKey="executions" stroke="#6D28D9" strokeWidth={3} fillOpacity={1} fill="url(#colorExec)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* 3D Visual Widget */}
        <BentoCard colSpan={1} rowSpan={1} className="bg-stone-900 text-white border-stone-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold font-heading">3D Node Metrics</h4>
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          <DashboardChart3D />
        </BentoCard>

        {/* AI Insight Card */}
        <BentoCard colSpan={1} rowSpan={1} className="bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-200">
          <div className="flex items-center gap-2 text-violet-700">
            <Sparkles className="w-5 h-5" />
            <h4 className="text-sm font-bold font-heading">AI Operational Insight</h4>
          </div>
          <p className="text-xs text-stone-700 leading-relaxed mt-2">
            Workflow <span className="font-bold text-violet-900">#WF-902 (Invoice Extract)</span> processed 420 documents with zero anomalies today. Efficiency improved by 18%.
          </p>
          <div className="flex justify-end mt-2">
            <button className="text-xs font-bold text-violet-700 hover:underline flex items-center gap-1">
              View Log <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  )
}
