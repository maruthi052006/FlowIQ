from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class AnalyticsSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'active_workflows': 24,
            'submissions_today': 1420,
            'pending_approvals': 4,
            'quality_score_avg': 99.4,
            'submissions_trend': [
                {'date': 'Mon', 'value': 120},
                {'date': 'Tue', 'value': 210},
                {'date': 'Wed', 'value': 180},
                {'date': 'Thu', 'value': 300},
                {'date': 'Fri', 'value': 250},
            ],
            'workflow_executions': [
                {'name': 'Invoice Processing', 'count': 450},
                {'name': 'Vendor Audit', 'count': 220},
            ],
            'status_breakdown': [
                {'status': 'Verified', 'count': 1200},
                {'status': 'Flagged', 'count': 180},
            ]
        })
