from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Workflow, WorkflowRun
from .serializers import WorkflowSerializer, WorkflowRunSerializer
from .engine import WorkflowExecutionEngine

class WorkflowViewSet(viewsets.ModelViewSet):
    serializer_class = WorkflowSerializer

    def get_queryset(self):
        return Workflow.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def run(self, request, pk=None):
        workflow = self.get_object()
        payload = request.data.get('payload', {})
        engine = WorkflowExecutionEngine(workflow, payload)
        run = engine.execute()
        return Response(WorkflowRunSerializer(run).data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def runs(self, request, pk=None):
        workflow = self.get_object()
        runs = workflow.runs.all()
        return Response(WorkflowRunSerializer(runs, many=True).data)
