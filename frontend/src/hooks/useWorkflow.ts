import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { workflowAPI } from '@/api/workflows'
import { useToast } from '@/store/uiStore'

export const useWorkflows = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['workflows', params],
    queryFn: () => workflowAPI.list(params),
    staleTime: 30_000,
  })
}

export const useWorkflow = (id: string) => {
  return useQuery({
    queryKey: ['workflow', id],
    queryFn: () => workflowAPI.get(id),
    enabled: !!id,
  })
}

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationFn: workflowAPI.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] })
      toast.success('Workflow created successfully')
      return data
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create workflow')
    },
  })
}

export const useRunWorkflow = (workflowId: string) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  return useMutation({
    mutationFn: (payload?: Record<string, any>) =>
      workflowAPI.run(workflowId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] })
      toast.success('Workflow triggered successfully')
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to trigger workflow')
    },
  })
}
