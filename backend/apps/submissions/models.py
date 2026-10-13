import uuid
from django.db import models
from apps.forms_builder.models import FormSchema

class Submission(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Review'),
        ('verified', 'Verified'),
        ('flagged', 'Flagged Anomaly'),
        ('rejected', 'Rejected'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_number = models.CharField(max_length=50, unique=True)
    form = models.ForeignKey(FormSchema, on_delete=models.CASCADE, related_name='submissions')
    submitted_by = models.EmailField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    quality_score = models.IntegerField(default=100)
    data = models.JSONField(default=dict)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.reference_number} ({self.form.title})"
