from django.urls import re_path
from .consumers import WorkflowRunConsumer, NotificationConsumer

websocket_urlpatterns = [
    re_path(r'ws/workflow-runs/(?P<run_id>[^/]+)/$', WorkflowRunConsumer.as_asgi()),
    re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
]
