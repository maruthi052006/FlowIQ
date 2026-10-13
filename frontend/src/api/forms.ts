import apiClient from './client'
import type { FormSchema } from '@/types/form.types'

export const formAPI = {
  list: (params?: Record<string, any>): Promise<FormSchema[]> =>
    apiClient.get('/forms/', { params }),

  create: (data: Partial<FormSchema>): Promise<FormSchema> =>
    apiClient.post('/forms/', data),

  get: (id: string): Promise<FormSchema> =>
    apiClient.get(`/forms/${id}/`),

  update: (id: string, data: Partial<FormSchema>): Promise<FormSchema> =>
    apiClient.patch(`/forms/${id}/`, data),

  delete: (id: string): Promise<void> =>
    apiClient.delete(`/forms/${id}/`),

  publish: (id: string): Promise<FormSchema> =>
    apiClient.post(`/forms/${id}/publish/`),
}
