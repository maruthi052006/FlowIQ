import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authAPI } from '@/api/auth'

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, setUser } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      authAPI.getProfile().then(setUser).catch(() => {})
    }
  }, [isAuthenticated, setUser])

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return <Outlet />
}
