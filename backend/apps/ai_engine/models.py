import uuid
from django.db import models

class AIProcessingJob(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job_type = models.CharField(max_length=50) # ocr, nlp, anomaly
    status = models.CharField(max_length=20, default='pending')
    input_payload = models.JSONField(default=dict)
    output_result = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
