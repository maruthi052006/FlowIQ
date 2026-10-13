export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'builder' | 'viewer' | 'approver'
  avatar?: string
  is_active: boolean
  created_at: string
}

export interface LoginRequest {
  email:        string
  password:     string
}

export interface LoginResponse {
  success: boolean
  data: {
    user: UserProfile
    access: string
    refresh: string
  }
}

export interface RegisterRequest {
  first_name:   string
  last_name:    string
  email:        string
  password:     string
  role?:        string
}

export interface RegisterResponse {
  success: boolean
  data: {
    user: UserProfile
    access: string
    refresh: string
  }
}
