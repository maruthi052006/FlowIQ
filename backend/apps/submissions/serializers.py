from rest_framework import serializers
from .models import Submission

class SubmissionSerializer(serializers.ModelSerializer):
    form_title = serializers.ReadOnlyField(source='form.title')

    class Meta:
        model = Submission
        fields = ('id', 'reference_number', 'form', 'form_title', 'submitted_by', 'status', 'quality_score', 'data', 'submitted_at')
        read_only_fields = ('id', 'reference_number', 'submitted_at')
