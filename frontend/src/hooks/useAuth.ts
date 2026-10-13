import { useMutation, useQuery } from '@tanstack/react-query'
import { authAPI } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/store/uiStore'

export const useAuth = () => {
  const { user, isAuthenticated, setTokens, setUser, logout } = useAuthStore()
  const toast = useToast()

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (res) => {
      const data = res.data || res
      setTokens(data.access, data.refresh)
      setUser(data.user)
      toast.success('Welcome back!', `Signed in as ${data.user.email}`)
    },
    onError: (err: any) => {
      toast.error('Authentication failed', err?.message || 'Invalid credentials')
    },
  })

  const registerMutation = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (res) => {
      const data = res.data || res
      setTokens(data.access, data.refresh)
      setUser(data.user)
      toast.success('Account created!', 'Welcome to FlowIQ')
    },
    onError: (err: any) => {
      toast.error('Registration failed', err?.message || 'Failed to create account')
    },
  })

  const profileQuery = useQuery({
    queryKey: ['user-profile'],
    queryFn: authAPI.getProfile,
    enabled: isAuthenticated,
  })

  return {
    user: user || profileQuery.data,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  }
}
