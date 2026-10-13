import apiClient from './client'
import type {
  LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse,
  UserProfile,
} from '@/types/auth.types'

export const authAPI = {
  login: (data: LoginRequest): Promise<LoginResponse> =>
    apiClient.post('/auth/login/', data),

  register: (data: RegisterRequest): Promise<RegisterResponse> =>
    apiClient.post('/auth/register/', data),

  logout: (refreshToken: string): Promise<void> =>
    apiClient.post('/auth/logout/', { refresh: refreshToken }),

  refreshToken: (refresh: string) =>
    apiClient.post('/auth/token/refresh/', { refresh }),

  getProfile: (): Promise<UserProfile> =>
    apiClient.get('/users/me/'),

  updateProfile: (data: Partial<UserProfile>): Promise<UserProfile> =>
    apiClient.patch('/users/me/', data),
}
