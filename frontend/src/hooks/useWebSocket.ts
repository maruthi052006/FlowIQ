import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/authStore'

const WS_BASE = import.meta.env.VITE_WS_URL || 'ws://localhost:8000'

export const useWorkflowRunSocket = (
  runId: string,
  onStepUpdate: (payload: any) => void,
  onComplete: (payload: any) => void
) => {
  const socket = useRef<WebSocket | null>(null)
  const token = useAuthStore((s) => s.accessToken)

  useEffect(() => {
    if (!runId || !token) return

    socket.current = new WebSocket(
      `${WS_BASE}/ws/workflow-runs/${runId}/?token=${token}`
    )

    socket.current.onopen = () => {
      console.log(`[WS] Connected to workflow run ${runId}`)
    }

    socket.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === 'step_update') onStepUpdate(msg.payload)
        if (msg.type === 'run_complete') onComplete(msg.payload)
      } catch (err) {
        console.error('[WS] Parse error:', err)
      }
    }

    socket.current.onerror = (e) => {
      console.error('[WS] Connection error:', e)
    }

    return () => {
      socket.current?.close()
    }
  }, [runId, token, onStepUpdate, onComplete])
}

export const useNotificationSocket = (
  onNotification: (payload: any) => void
) => {
  const socket = useRef<WebSocket | null>(null)
  const token = useAuthStore((s) => s.accessToken)

  useEffect(() => {
    if (!token) return
    socket.current = new WebSocket(
      `${WS_BASE}/ws/notifications/?token=${token}`
    )
    socket.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === 'notification') onNotification(msg.payload)
      } catch (err) {
        console.error('[WS] Notification parse error:', err)
      }
    }
    return () => {
      socket.current?.close()
    }
  }, [token, onNotification])
}
