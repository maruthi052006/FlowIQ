export type NodeType = 
  | 'trigger_form' | 'trigger_schedule' | 'trigger_webhook' | 'trigger_api' | 'trigger_manual'
  | 'action_email' | 'action_sms' | 'action_slack' | 'action_http' | 'action_db'
  | 'logic_condition' | 'logic_switch' | 'logic_loop' | 'logic_delay'
  | 'ai_ocr' | 'ai_nlp' | 'ai_anomaly' | 'ai_categorize'
  | 'data_transform' | 'data_filter' | 'data_aggregate'

export interface WorkflowNodeData {
  label: string
  subtitle?: string
  nodeType: NodeType
  category: 'trigger' | 'action' | 'logic' | 'ai' | 'data'
  config: Record<string, any>
  status?: 'idle' | 'running' | 'completed' | 'error'
}

export interface WorkflowNode {
  id: string
  type: string
  position: { x: number; y: number }
  data: WorkflowNodeData
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  animated?: boolean
  style?: Record<string, any>
}

export interface Workflow {
  id: string
  name: string
  description?: string
  is_active: boolean
  trigger_type: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  created_at: string
  updated_at: string
  version: number
  runs_count?: number
}

export interface WorkflowRun {
  id: string
  workflow: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  started_at: string
  completed_at?: string
  execution_time_ms?: number
  logs: WorkflowStepLog[]
}

export interface WorkflowStepLog {
  id: string
  node_id: string
  node_name: string
  status: 'running' | 'completed' | 'failed'
  input_data?: any
  output_data?: any
  error_message?: string
  timestamp: string
}
