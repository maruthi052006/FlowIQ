import random
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Submission
from .serializers import SubmissionSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer

    def get_queryset(self):
        return Submission.objects.select_related('form').all()

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()

    def perform_create(self, serializer):
        ref_num = f"SUB-{random.randint(1000, 9999)}"
        serializer.save(reference_number=ref_num)
