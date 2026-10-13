import { create } from 'zustand'
import { WorkflowNode, WorkflowEdge } from '@/types/workflow.types'

interface WorkflowCanvasState {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNodeId: string | null
  workflowId: string | null
  workflowName: string
  isDirty: boolean

  setNodes: (nodes: WorkflowNode[]) => void
  setEdges: (edges: WorkflowEdge[]) => void
  setSelectedNodeId: (id: string | null) => void
  setWorkflowId: (id: string | null) => void
  setWorkflowName: (name: string) => void
  addNode: (node: WorkflowNode) => void
  updateNodeData: (id: string, data: Partial<WorkflowNode['data']>) => void
  deleteNode: (id: string) => void
}

export const useWorkflowStore = create<WorkflowCanvasState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  workflowId: null,
  workflowName: 'Untitled Workflow',
  isDirty: false,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setWorkflowId: (workflowId) => set({ workflowId }),
  setWorkflowName: (workflowName) => set({ workflowName, isDirty: true }),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
      isDirty: true,
    })),

  updateNodeData: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...data } }
          : node
      ),
      isDirty: true,
    })),

  deleteNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
      isDirty: true,
    })),
}))
