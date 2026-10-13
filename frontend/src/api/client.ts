import axios, { AxiosInstance } from 'axios'
import { useAuthStore } from '@/store/authStore'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const apiClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
})

// Request interceptor — attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle 401, refresh token automatically
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) {
          useAuthStore.getState().logout()
          return Promise.reject(error.response?.data || error)
        }
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/auth/token/refresh/`,
          { refresh: refreshToken }
        )
        const newAccess = data.data?.access || data.access
        const newRefresh = data.data?.refresh || refreshToken
        useAuthStore.getState().setTokens(newAccess, newRefresh)
        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return apiClient(originalRequest)
      } catch (refreshErr) {
        useAuthStore.getState().logout()
        window.location.href = '/auth/login'
        return Promise.reject(refreshErr)
      }
    }
    return Promise.reject(error.response?.data || error)
  }
)

export default apiClient
