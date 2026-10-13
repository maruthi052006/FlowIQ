from rest_framework import serializers
from .models import Workflow, WorkflowRun, WorkflowStepLog

class WorkflowStepLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkflowStepLog
        fields = '__all__'

class WorkflowRunSerializer(serializers.ModelSerializer):
    logs = WorkflowStepLogSerializer(many=True, read_only=True)

    class Meta:
        model = WorkflowRun
        fields = '__all__'

class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workflow
        fields = ('id', 'name', 'description', 'is_active', 'trigger_type', 'nodes', 'edges', 'version', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
