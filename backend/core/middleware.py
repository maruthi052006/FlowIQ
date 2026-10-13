import time
import logging

logger = logging.getLogger('flowiq.audit')

class AuditLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time

        if request.path.startswith('/api/'):
            user = getattr(request, 'user', None)
            user_id = str(user.id) if user and user.is_authenticated else 'anonymous'
            logger.info(
                f"[AUDIT] {request.method} {request.path} - User: {user_id} - Status: {response.status_code} - {duration:.3f}s"
            )

        return response
