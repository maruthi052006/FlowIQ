import apiClient from './client'
import type { Workflow, WorkflowRun, WorkflowStepLog } from '@/types/workflow.types'

export const workflowAPI = {
  list: (params?: Record<string, any>): Promise<Workflow[]> =>
    apiClient.get('/workflows/', { params }),

  create: (data: Partial<Workflow>): Promise<Workflow> =>
    apiClient.post('/workflows/', data),

  get: (id: string): Promise<Workflow> =>
    apiClient.get(`/workflows/${id}/`),

  update: (id: string, data: Partial<Workflow>): Promise<Workflow> =>
    apiClient.patch(`/workflows/${id}/`, data),

  delete: (id: string): Promise<void> =>
    apiClient.delete(`/workflows/${id}/`),

  activate: (id: string): Promise<Workflow> =>
    apiClient.post(`/workflows/${id}/activate/`),

  pause: (id: string): Promise<Workflow> =>
    apiClient.post(`/workflows/${id}/pause/`),

  run: (id: string, payload?: Record<string, any>): Promise<WorkflowRun> =>
    apiClient.post(`/workflows/${id}/run/`, payload),

  getRuns: (id: string, params?: Record<string, any>): Promise<WorkflowRun[]> =>
    apiClient.get(`/workflows/${id}/runs/`, { params }),

  getRunDetail: (id: string, runId: string): Promise<WorkflowRun> =>
    apiClient.get(`/workflows/${id}/runs/${runId}/`),

  getRunLogs: (id: string, runId: string): Promise<WorkflowStepLog[]> =>
    apiClient.get(`/workflows/${id}/runs/${runId}/logs/`),

  duplicate: (id: string): Promise<Workflow> =>
    apiClient.post(`/workflows/${id}/duplicate/`),

  getVersions: (id: string) =>
    apiClient.get(`/workflows/${id}/versions/`),

  restoreVersion: (id: string, version: number) =>
    apiClient.post(`/workflows/${id}/versions/${version}/restore/`),
}
