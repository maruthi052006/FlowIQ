from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from apps.analytics.views import AnalyticsSummaryView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('apps.accounts.urls')),
    path('api/v1/', include('apps.workflows.urls')),
    path('api/v1/', include('apps.forms_builder.urls')),
    path('api/v1/', include('apps.submissions.urls')),
    path('api/v1/analytics/summary/', AnalyticsSummaryView.as_view(), name='analytics_summary'),
    
    # OpenAPI Schema & Swagger UI
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
