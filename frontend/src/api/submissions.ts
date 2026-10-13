import apiClient from './client'
import type { Submission } from '@/types/submission.types'
import type { AnalyticsSummary } from '@/types/submission.types'

export const submissionAPI = {
  list: (params?: Record<string, any>): Promise<Submission[]> =>
    apiClient.get('/submissions/', { params }),

  get: (id: string): Promise<Submission> =>
    apiClient.get(`/submissions/${id}/`),

  export: (format: 'csv' | 'json' | 'excel', params?: Record<string, any>) =>
    apiClient.get(`/submissions/export/?format=${format}`, { params, responseType: 'blob' }),
}

export const analyticsAPI = {
  getSummary: (): Promise<AnalyticsSummary> =>
    apiClient.get('/analytics/summary/'),
}
