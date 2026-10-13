from rest_framework import serializers, viewsets
from .models import FormSchema

class FormSchemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSchema
        fields = ('id', 'title', 'description', 'is_published', 'fields', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

class FormSchemaViewSet(viewsets.ModelViewSet):
    serializer_class = FormSchemaSerializer

    def get_queryset(self):
        return FormSchema.objects.filter(created_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
