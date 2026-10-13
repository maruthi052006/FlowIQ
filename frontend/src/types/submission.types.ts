export interface Submission {
  id: string
  reference_number: string
  form_id: string
  form_title: string
  submitted_by?: string
  status: 'pending' | 'verified' | 'flagged' | 'rejected'
  quality_score: number
  data: Record<string, any>
  submitted_at: string
}

export interface AnalyticsSummary {
  active_workflows: number
  submissions_today: number
  pending_approvals: number
  quality_score_avg: number
  submissions_trend: Array<{ date: string; value: number }>
  workflow_executions: Array<{ name: string; count: number }>
  status_breakdown: Array<{ status: string; count: number }>
}
