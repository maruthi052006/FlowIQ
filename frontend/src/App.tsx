import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { ProtectedRoute } from '@/components/shared/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoadingScene } from '@/components/three/LoadingScene'

const Landing = lazy(() => import('@/pages/Landing'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const Register = lazy(() => import('@/pages/Auth/Register'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const WorkflowBuilder = lazy(() => import('@/pages/WorkflowBuilder'))
const FormBuilder = lazy(() => import('@/pages/FormBuilder'))
const Submissions = lazy(() => import('@/pages/Submissions'))
const Analytics = lazy(() => import('@/pages/Analytics'))
const Approvals = lazy(() => import('@/pages/Approvals'))
const Integrations = lazy(() => import('@/pages/Integrations'))
const Settings = lazy(() => import('@/pages/Settings'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingScene />}>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />

              {/* Protected App Routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/submissions" element={<Submissions />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/approvals" element={<Approvals />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="/workflow/:id/edit" element={<WorkflowBuilder />} />
                <Route path="/form/:id/edit" element={<FormBuilder />} />
              </Route>

              {/* Fallback 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
