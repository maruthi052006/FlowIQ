from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import FormSchema
from .serializers import FormSchemaSerializer

class FormSchemaViewSet(viewsets.ModelViewSet):
    serializer_class = FormSchemaSerializer

    def get_queryset(self):
        return FormSchema.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def publish(self, request, pk=None):
        form = self.get_object()
        form.is_published = True
        form.save()
        return Response(FormSchemaSerializer(form).data, status=status.HTTP_200_OK)
