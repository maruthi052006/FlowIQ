import React, { useState, useCallback } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useToast } from '@/store/uiStore'
import {
  ArrowLeft,
  Save,
  Play,
  Share2,
  Plus,
  GitFork,
  CheckCircle2,
  AlertCircle,
  FileText,
  Mail,
  Cpu,
  Clock,
  Trash2,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 100 },
    data: { label: '⚡ Form Submit Trigger' },
    style: {
      background: '#ffffff',
      border: '2px solid #6D28D9',
      borderRadius: '16px',
      padding: '12px 20px',
      fontSize: '13px',
      fontWeight: 'bold',
      boxShadow: '0 10px 25px rgba(109,40,217,0.15)',
    },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 250, y: 260 },
    data: { label: '🤖 AI OCR Invoice Extraction' },
    style: {
      background: '#ffffff',
      border: '2px solid #14B8A6',
      borderRadius: '16px',
      padding: '12px 20px',
      fontSize: '13px',
      fontWeight: 'bold',
      boxShadow: '0 10px 25px rgba(20,184,166,0.15)',
    },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 250, y: 420 },
    data: { label: '📧 Send Slack & Email Notice' },
    style: {
      background: '#ffffff',
      border: '2px solid #F59E0B',
      borderRadius: '16px',
      padding: '12px 20px',
      fontSize: '13px',
      fontWeight: 'bold',
      boxShadow: '0 10px 25px rgba(245,158,11,0.15)',
    },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6D28D9', strokeWidth: 3 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#14B8A6', strokeWidth: 3 } },
]

export default function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const toast = useToast()

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: '#6D28D9', strokeWidth: 3 } },
          eds
        )
      ),
    [setEdges]
  )

  const handleNodeClick = (_: any, node: Node) => {
    setSelectedNode(node)
  }

  const handleAddNode = (label: string, borderColor: string) => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'default',
      position: { x: 250 + Math.random() * 40, y: 150 + nodes.length * 90 },
      data: { label },
      style: {
        background: '#ffffff',
        border: `2px solid ${borderColor}`,
        borderRadius: '16px',
        padding: '12px 20px',
        fontSize: '13px',
        fontWeight: 'bold',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      },
    }
    setNodes((nds) => [...nds, newNode])
    toast.success('Node Added', `Added "${label}" to canvas`)
  }

  const handleRunWorkflow = () => {
    setIsRunning(true)
    toast.info('Workflow Triggered', 'Executing node pipeline step-by-step...')
    setTimeout(() => {
      setIsRunning(false)
      toast.success('Execution Complete', 'All 3 steps executed successfully in 142ms')
    }, 2000)
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-900 text-white overflow-hidden">
      {/* Top Toolbar */}
      <header className="h-16 bg-stone-950/80 border-b border-stone-800 px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-heading">Invoice Processing Pipeline</h2>
              <Badge variant="teal">Active v1.4</Badge>
            </div>
            <p className="text-[11px] text-stone-400">Trigger: Form Submission • Last edited 2m ago</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-stone-300 hover:bg-stone-800" leftIcon={<Save className="w-4 h-4" />}>
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            isLoading={isRunning}
            onClick={handleRunWorkflow}
            leftIcon={<Play className="w-4 h-4" />}
          >
            Test Execution
          </Button>
        </div>
      </header>

      {/* Main Builder Body */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Left Node Palette */}
        <aside className="w-64 bg-stone-950/90 border-r border-stone-800 p-4 space-y-4 overflow-y-auto z-20">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Node Library
          </h3>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-500 uppercase">Triggers</p>
            <button
              onClick={() => handleAddNode('⚡ Webhook Listener', '#6D28D9')}
              className="w-full text-left p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold"
            >
              <FileText className="w-4 h-4 text-violet-400" />
              <span>Webhook Trigger</span>
            </button>

            <p className="text-[10px] font-bold text-stone-500 uppercase pt-2">AI Processors</p>
            <button
              onClick={() => handleAddNode('🤖 AI Anomaly Detector', '#14B8A6')}
              className="w-full text-left p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold"
            >
              <Cpu className="w-4 h-4 text-teal-400" />
              <span>AI Anomaly Check</span>
            </button>

            <p className="text-[10px] font-bold text-stone-500 uppercase pt-2">Actions</p>
            <button
              onClick={() => handleAddNode('📧 Send Email Alert', '#F59E0B')}
              className="w-full text-left p-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 flex items-center gap-3 text-xs font-semibold"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Send Notification</span>
            </button>
          </div>
        </aside>

        {/* React Flow Canvas */}
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Controls className="bg-stone-900 border-stone-800 text-white fill-white" />
            <MiniMap className="bg-stone-950 border-stone-800 rounded-xl" nodeColor="#6D28D9" />
            <Background color="#334155" variant={BackgroundVariant.Dots} gap={24} size={2} />
          </ReactFlow>
        </div>

        {/* Right Inspector Drawer */}
        {selectedNode && (
          <aside className="w-80 bg-stone-950/95 border-l border-stone-800 p-6 space-y-6 z-20">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-sm font-bold font-heading">Node Inspector</h3>
              <button onClick={() => setSelectedNode(null)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-400">Node ID</label>
                <p className="text-xs font-mono text-stone-200 mt-1">{selectedNode.id}</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400">Label</label>
                <input
                  value={selectedNode.data.label as string}
                  onChange={(e) => {
                    const newLabel = e.target.value
                    setNodes((nds) =>
                      nds.map((n) =>
                        n.id === selectedNode.id
                          ? { ...n, data: { ...n.data, label: newLabel } }
                          : n
                      )
                    )
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: newLabel } })
                  }}
                  className="w-full mt-1 bg-stone-900 border border-stone-800 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="pt-4 border-t border-stone-800">
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full"
                  leftIcon={<Trash2 className="w-4 h-4" />}
                  onClick={() => {
                    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id))
                    setSelectedNode(null)
                    toast.success('Node Removed')
                  }}
                >
                  Remove Node
                </Button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
